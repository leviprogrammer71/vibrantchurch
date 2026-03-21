import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

// Rate limiting configuration
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_REQUESTS = 10; // 10 requests per minute per IP
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Response caching - explicitly typed to avoid type narrowing issues
interface CacheEntry { data: unknown; timestamp: number }
let cachedResponse: CacheEntry | null = null;
const CACHE_TTL_MS = 5 * 60 * 1000; // 5 minutes cache

// Database cache configuration
const DB_CACHE_KEY = 'calendar_events';
const DB_CACHE_TTL_MS = 15 * 60 * 1000; // 15 minutes
const STALE_CACHE_MAX_AGE_MS = 24 * 60 * 60 * 1000; // 24 hours max stale

// Initialize Supabase client with service role for DB cache access
function getSupabaseClient() {
  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY');
  
  if (!supabaseUrl || !supabaseServiceKey) {
    console.warn('Supabase credentials not available for DB cache');
    return null;
  }
  
  return createClient(supabaseUrl, supabaseServiceKey);
}

// Cache entry interface
interface ApiCacheEntry {
  cached_data: unknown;
  expires_at: string;
  updated_at: string;
}

// Check database cache for valid entry
// deno-lint-ignore no-explicit-any
async function getDbCache(supabase: any): Promise<{ data: unknown; isStale: boolean } | null> {
  try {
    const { data, error } = await supabase
      .from('api_cache')
      .select('cached_data, expires_at, updated_at')
      .eq('cache_key', DB_CACHE_KEY)
      .single();
    
    if (error || !data) {
      console.log('No DB cache entry found for calendar_events');
      return null;
    }
    
    const cacheData = data as ApiCacheEntry;
    const now = new Date();
    const expiresAt = new Date(cacheData.expires_at);
    const updatedAt = new Date(cacheData.updated_at);
    const cacheAge = now.getTime() - updatedAt.getTime();
    
    // Check if cache is fresh
    if (now < expiresAt) {
      console.log('DB cache HIT (fresh) for calendar_events');
      return { data: cacheData.cached_data, isStale: false };
    }
    
    // Check if stale cache is still usable (within 24 hours)
    if (cacheAge < STALE_CACHE_MAX_AGE_MS) {
      console.log('DB cache available (stale) for calendar_events');
      return { data: cacheData.cached_data, isStale: true };
    }
    
    console.log('DB cache too old, will refresh');
    return null;
  } catch (error) {
    console.error('Error reading DB cache:', error);
    return null;
  }
}

// Update database cache with new data
// deno-lint-ignore no-explicit-any
async function setDbCache(supabase: any, responseData: unknown): Promise<void> {
  try {
    const expiresAt = new Date(Date.now() + DB_CACHE_TTL_MS);
    
    const { error } = await supabase
      .from('api_cache')
      .upsert({
        cache_key: DB_CACHE_KEY,
        cached_data: responseData,
        expires_at: expiresAt.toISOString(),
        updated_at: new Date().toISOString(),
      }, { onConflict: 'cache_key' });
    
    if (error) {
      console.error('Error updating DB cache:', error);
    } else {
      console.log('DB cache updated for calendar_events');
    }
  } catch (error) {
    console.error('Error setting DB cache:', error);
  }
}

// Retry fetch with delay
async function fetchWithRetry(url: string, options: RequestInit, retries = 1, delayMs = 500): Promise<Response> {
  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url, options);
      if (response.ok || attempt === retries) {
        return response;
      }
      console.log(`Fetch attempt ${attempt + 1} failed with status ${response.status}, retrying...`);
      await new Promise(resolve => setTimeout(resolve, delayMs));
    } catch (error) {
      if (attempt === retries) throw error;
      console.log(`Fetch attempt ${attempt + 1} failed with error, retrying...`);
      await new Promise(resolve => setTimeout(resolve, delayMs));
    }
  }
  throw new Error('All fetch attempts failed');
}

// Allowed origins for CORS - no wildcard fallback
const ALLOWED_ORIGINS = [
  'https://vibranttchurch.lovable.app',
  'https://id-preview--c82d8e02-301a-4606-bb82-2eb4e9b6cbd1.lovable.app',
  'http://localhost:5173',
  'http://localhost:8080',
];

function getCorsHeaders(req: Request) {
  const origin = req.headers.get('origin') || '';
  // Check if origin matches allowed list or Lovable domain patterns
  const isAllowedOrigin = ALLOWED_ORIGINS.includes(origin) ||
                          origin.endsWith('.lovable.app') || 
                          origin.endsWith('.lovableproject.com') ||
                          origin.includes('localhost');
  // Use explicit origin or default to published domain - never use wildcard
  const corsOrigin = isAllowedOrigin ? origin : ALLOWED_ORIGINS[0];
  return {
    'Access-Control-Allow-Origin': corsOrigin,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
  };
}

// Rate limiting check
function checkRateLimit(ip: string): { allowed: boolean; remaining: number; resetIn: number } {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  // Clean up expired entries periodically
  if (rateLimitMap.size > 1000) {
    for (const [key, value] of rateLimitMap.entries()) {
      if (now > value.resetTime) {
        rateLimitMap.delete(key);
      }
    }
  }

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1, resetIn: RATE_LIMIT_WINDOW_MS };
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, remaining: 0, resetIn: record.resetTime - now };
  }

  record.count++;
  return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - record.count, resetIn: record.resetTime - now };
}

interface CalendarEvent {
  id: string;
  title: string;
  description: string;
  startDate: string;
  endDate: string;
  location: string;
  allDay: boolean;
}

function parseICalDate(dateStr: string): { date: Date; allDay: boolean } {
  // Check if it's an all-day event (YYYYMMDD format)
  if (dateStr.length === 8) {
    const year = parseInt(dateStr.substring(0, 4));
    const month = parseInt(dateStr.substring(4, 6)) - 1;
    const day = parseInt(dateStr.substring(6, 8));
    return { date: new Date(year, month, day), allDay: true };
  }
  
  // Parse datetime format (YYYYMMDDTHHMMSSZ or YYYYMMDDTHHMMSS)
  const hasTimezone = dateStr.endsWith('Z');
  const cleanStr = dateStr.replace('Z', '');
  
  const year = parseInt(cleanStr.substring(0, 4));
  const month = parseInt(cleanStr.substring(4, 6)) - 1;
  const day = parseInt(cleanStr.substring(6, 8));
  const hour = parseInt(cleanStr.substring(9, 11)) || 0;
  const minute = parseInt(cleanStr.substring(11, 13)) || 0;
  const second = parseInt(cleanStr.substring(13, 15)) || 0;
  
  if (hasTimezone) {
    return { date: new Date(Date.UTC(year, month, day, hour, minute, second)), allDay: false };
  }
  return { date: new Date(year, month, day, hour, minute, second), allDay: false };
}

function parseICalFeed(icalData: string): CalendarEvent[] {
  const events: CalendarEvent[] = [];
  const lines = icalData.split(/\r?\n/);
  
  let currentEvent: Partial<CalendarEvent> | null = null;
  let currentKey = '';
  let currentValue = '';
  
  for (const line of lines) {
    // Handle line folding (lines starting with space or tab are continuations)
    if (line.startsWith(' ') || line.startsWith('\t')) {
      currentValue += line.substring(1);
      continue;
    }
    
    // Process the previous key-value pair
    if (currentKey && currentEvent) {
      processProperty(currentEvent, currentKey, currentValue);
    }
    
    // Parse new line
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) {
      currentKey = '';
      currentValue = '';
      continue;
    }
    
    currentKey = line.substring(0, colonIndex);
    currentValue = line.substring(colonIndex + 1);
    
    // Check for event boundaries
    if (line === 'BEGIN:VEVENT') {
      currentEvent = {
        id: '',
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        location: '',
        allDay: false,
      };
      currentKey = '';
      currentValue = '';
    } else if (line === 'END:VEVENT' && currentEvent) {
      if (currentEvent.title && currentEvent.startDate) {
        events.push(currentEvent as CalendarEvent);
      }
      currentEvent = null;
      currentKey = '';
      currentValue = '';
    }
  }
  
  return events;
}

function processProperty(event: Partial<CalendarEvent>, key: string, value: string) {
  // Remove parameters from key (e.g., "DTSTART;VALUE=DATE" -> "DTSTART")
  const cleanKey = key.split(';')[0];
  
  // Unescape common iCal escape sequences
  const unescapedValue = value
    .replace(/\\n/g, '\n')
    .replace(/\\,/g, ',')
    .replace(/\\;/g, ';')
    .replace(/\\\\/g, '\\');
  
  // PRIVACY: Only expose safe public fields
  switch (cleanKey) {
    case 'UID':
      event.id = unescapedValue;
      break;
    case 'SUMMARY':
      // Title is safe to expose
      event.title = unescapedValue;
      break;
    case 'LOCATION':
      // Location is safe to expose (if available)
      event.location = unescapedValue;
      break;
    case 'DTSTART':
      const start = parseICalDate(unescapedValue);
      event.startDate = start.date.toISOString();
      event.allDay = start.allDay;
      break;
    case 'DTEND':
      const end = parseICalDate(unescapedValue);
      event.endDate = end.date.toISOString();
      break;
    // PRIVACY: Intentionally NOT exposing DESCRIPTION to prevent
    // leakage of private notes, internal details, or hidden metadata
    // case 'DESCRIPTION': - REMOVED FOR PRIVACY
  }
}

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);
  
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Get client IP for rate limiting
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                     req.headers.get('x-real-ip') || 
                     'unknown';

    // Check rate limit
    const rateLimit = checkRateLimit(clientIp);
    if (!rateLimit.allowed) {
      console.warn(`Rate limit exceeded for IP: ${clientIp.substring(0, 10)}...`);
      return new Response(JSON.stringify({ 
        error: 'Too many requests. Please try again later.',
        retryAfter: Math.ceil(rateLimit.resetIn / 1000),
      }), {
        status: 429,
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json',
          'Retry-After': String(Math.ceil(rateLimit.resetIn / 1000)),
        },
      });
    }

    // Initialize Supabase client for DB cache
    const supabase = getSupabaseClient();
    
    // Check database cache first (survives cold starts)
    if (supabase) {
      const dbCache = await getDbCache(supabase);
      if (dbCache && !dbCache.isStale) {
        // Fresh cache - return immediately
        return new Response(JSON.stringify(dbCache.data), {
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json',
            'X-Cache': 'DB-HIT',
          },
        });
      }
    }
    
    // Check in-memory cache (for rapid successive requests within same instance)
    const cacheCheckTime = Date.now();
    if (cachedResponse && (cacheCheckTime - cachedResponse.timestamp) < CACHE_TTL_MS) {
      console.log('Returning cached calendar response');
      return new Response(JSON.stringify(cachedResponse.data), {
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json',
          'X-Cache': 'HIT',
        },
      });
    }

    // Get iCal URL from environment variable and convert webcal:// to https://
    let ICAL_URL = Deno.env.get('PLANNING_CENTER_ICAL_URL');
    
    if (!ICAL_URL) {
      console.error('PLANNING_CENTER_ICAL_URL environment variable not set');
      return new Response(JSON.stringify({ 
        error: 'Calendar configuration missing',
        details: 'PLANNING_CENTER_ICAL_URL secret not configured',
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    // Convert webcal:// to https:// (webcal is not supported by fetch)
    ICAL_URL = ICAL_URL.replace(/^webcal:\/\//, 'https://');
    
    console.log('Fetching calendar feed...');
    
    const response = await fetchWithRetry(ICAL_URL, {
      headers: {
        'Accept': 'text/calendar',
      },
    }, 1, 500);
    
    if (!response.ok) {
      console.error('Failed to fetch calendar:', response.status, response.statusText);
      
      // Try to return stale cache on error
      if (supabase) {
        const staleCache = await getDbCache(supabase);
        if (staleCache) {
          console.log('Returning stale cache due to calendar fetch failure');
          return new Response(JSON.stringify({
            ...staleCache.data as object,
            _cacheStatus: 'stale',
            _cacheReason: 'fetch_failed',
          }), {
            headers: { 
              ...corsHeaders, 
              'Content-Type': 'application/json',
              'X-Cache': 'DB-STALE',
            },
          });
        }
      }
      
      throw new Error(`Failed to fetch calendar: ${response.status}`);
    }
    
    const icalData = await response.text();
    console.log('Received iCal data, length:', icalData.length);
    
    const events = parseICalFeed(icalData);
    console.log('Parsed events count:', events.length);
    
    // Filter to only future events and sort by start date
    const currentDate = new Date();
    const futureEvents = events
      .filter(event => new Date(event.startDate) >= currentDate)
      .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
    
    console.log('Returning future events:', futureEvents.length);
    
    // Build response data
    const responseData = { 
      events: futureEvents,
      lastUpdated: new Date().toISOString(),
    };
    
    // Cache the response
    cachedResponse = { data: responseData, timestamp: Date.now() };
    
    // Also cache to database for persistence across cold starts
    if (supabase) {
      await setDbCache(supabase, responseData);
    }
    
    return new Response(JSON.stringify(responseData), {
      headers: { 
        ...corsHeaders, 
        'Content-Type': 'application/json',
        'X-Cache': 'MISS',
      },
    });
  } catch (error) {
    console.error('Error fetching calendar:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    
    // Try to return stale cache on error
    const supabase = getSupabaseClient();
    if (supabase) {
      const staleCache = await getDbCache(supabase);
      if (staleCache) {
        console.log('Returning stale cache due to exception');
        return new Response(JSON.stringify({
          ...staleCache.data as object,
          _cacheStatus: 'stale',
          _cacheReason: 'exception',
        }), {
          headers: { 
            ...corsHeaders, 
            'Content-Type': 'application/json',
            'X-Cache': 'DB-STALE',
          },
        });
      }
    }
    
    return new Response(JSON.stringify({ 
      error: 'Failed to fetch calendar events',
      details: message,
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});