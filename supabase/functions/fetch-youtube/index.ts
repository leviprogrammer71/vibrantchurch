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
const DB_CACHE_KEY = 'youtube_videos';
const DB_CACHE_TTL_MS = 30 * 60 * 1000; // 30 minutes
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
      console.log('No DB cache entry found for youtube_videos');
      return null;
    }
    
    const cacheData = data as ApiCacheEntry;
    const now = new Date();
    const expiresAt = new Date(cacheData.expires_at);
    const updatedAt = new Date(cacheData.updated_at);
    const cacheAge = now.getTime() - updatedAt.getTime();
    
    // Check if cache is fresh
    if (now < expiresAt) {
      console.log('DB cache HIT (fresh) for youtube_videos');
      return { data: cacheData.cached_data, isStale: false };
    }
    
    // Check if stale cache is still usable (within 24 hours)
    if (cacheAge < STALE_CACHE_MAX_AGE_MS) {
      console.log('DB cache available (stale) for youtube_videos');
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
      console.log('DB cache updated for youtube_videos');
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

interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnail: string;
  videoUrl: string;
}

function parseYouTubeFeed(xmlData: string): YouTubeVideo[] {
  const videos: YouTubeVideo[] = [];
  
  // Simple XML parsing for YouTube RSS feed
  const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
  let entryMatch;
  
  while ((entryMatch = entryRegex.exec(xmlData)) !== null) {
    const entryContent = entryMatch[1];
    
    // Extract video ID
    const videoIdMatch = entryContent.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
    const videoId = videoIdMatch ? videoIdMatch[1] : '';
    
    // Extract title
    const titleMatch = entryContent.match(/<title>([^<]+)<\/title>/);
    const title = titleMatch ? titleMatch[1] : '';
    
    // Extract published date
    const publishedMatch = entryContent.match(/<published>([^<]+)<\/published>/);
    const publishedAt = publishedMatch ? publishedMatch[1] : '';
    
    // Extract description (from media:description)
    const descMatch = entryContent.match(/<media:description>([^<]*)<\/media:description>/);
    const description = descMatch ? descMatch[1] : '';
    
    // Extract thumbnail
    const thumbMatch = entryContent.match(/<media:thumbnail[^>]+url="([^"]+)"/);
    const thumbnail = thumbMatch ? thumbMatch[1] : `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
    
    // Extract link
    const linkMatch = entryContent.match(/<link[^>]+href="([^"]+)"/);
    const videoUrl = linkMatch ? linkMatch[1] : `https://www.youtube.com/watch?v=${videoId}`;
    
    if (videoId && title) {
      videos.push({
        id: videoId,
        title: decodeHTMLEntities(title),
        description: decodeHTMLEntities(description),
        publishedAt,
        thumbnail,
        videoUrl,
      });
    }
  }
  
  return videos;
}

function decodeHTMLEntities(text: string): string {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'");
}

// Extract channel ID from YouTube channel page HTML
async function getChannelIdFromHandle(handle: string): Promise<string | null> {
  try {
    const channelUrl = `https://www.youtube.com/${handle}`;
    console.log('Fetching channel page:', channelUrl);
    
    const response = await fetch(channelUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.5',
      },
    });
    
    if (!response.ok) {
      console.error('Failed to fetch channel page:', response.status);
      return null;
    }
    
    const html = await response.text();
    
    // Try to find channel ID in the page HTML
    // Look for patterns like: "channelId":"UCxxxxx" or channel/UCxxxxx
    const patterns = [
      /"channelId":"(UC[a-zA-Z0-9_-]{22})"/,
      /"externalId":"(UC[a-zA-Z0-9_-]{22})"/,
      /channel\/(UC[a-zA-Z0-9_-]{22})/,
      /<link rel="canonical" href="https:\/\/www\.youtube\.com\/channel\/(UC[a-zA-Z0-9_-]{22})"/,
      /browse_id":"(UC[a-zA-Z0-9_-]{22})"/,
    ];
    
    for (const pattern of patterns) {
      const match = html.match(pattern);
      if (match && match[1]) {
        console.log('Found channel ID:', match[1]);
        return match[1];
      }
    }
    
    console.error('Could not find channel ID in page HTML');
    return null;
  } catch (error) {
    console.error('Error fetching channel page:', error);
    return null;
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
      console.log('Returning cached YouTube response');
      return new Response(JSON.stringify(cachedResponse.data), {
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json',
          'X-Cache': 'HIT',
        },
      });
    }

    // VibrantChurch Terre Hill YouTube channel handle
    const channelHandle = '@vibrantchurchterrehill7120';
    
    // Get channel ID from handle with retry
    let channelId: string | null = null;
    try {
      channelId = await getChannelIdFromHandle(channelHandle);
    } catch (error) {
      console.error('Error getting channel ID:', error);
    }
    
    if (!channelId) {
      console.error('Could not resolve channel ID for handle:', channelHandle);
      
      // Try to return stale cache if available
      if (supabase) {
        const staleCache = await getDbCache(supabase);
        if (staleCache) {
          console.log('Returning stale cache due to channel resolution failure');
          return new Response(JSON.stringify({
            ...staleCache.data as object,
            _cacheStatus: 'stale',
            _cacheReason: 'channel_resolution_failed',
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
        videos: [],
        channelHandle,
        message: 'Could not resolve YouTube channel. Please check the channel handle.',
        lastUpdated: new Date().toISOString(),
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    // YouTube RSS feed URL
    const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
    
    console.log('Fetching YouTube feed for channel:', channelId);
    
    const response = await fetchWithRetry(feedUrl, {
      headers: {
        'Accept': 'application/xml',
      },
    }, 1, 500);
    
    if (!response.ok) {
      console.error('Failed to fetch YouTube feed:', response.status, response.statusText);
      
      // Try to return stale cache on error
      if (supabase) {
        const staleCache = await getDbCache(supabase);
        if (staleCache) {
          console.log('Returning stale cache due to feed fetch failure');
          return new Response(JSON.stringify({
            ...staleCache.data as object,
            _cacheStatus: 'stale',
            _cacheReason: 'feed_fetch_failed',
          }), {
            headers: { 
              ...corsHeaders, 
              'Content-Type': 'application/json',
              'X-Cache': 'DB-STALE',
            },
          });
        }
      }
      
      // Return placeholder data if channel not found
      if (response.status === 404) {
        return new Response(JSON.stringify({ 
          videos: [],
          channelId,
          message: 'Channel not found or no videos available.',
          lastUpdated: new Date().toISOString(),
        }), {
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        });
      }
      
      throw new Error(`Failed to fetch YouTube feed: ${response.status}`);
    }
    
    const xmlData = await response.text();
    console.log('Received YouTube feed, length:', xmlData.length);
    
    const videos = parseYouTubeFeed(xmlData);
    console.log('Parsed videos count:', videos.length);
    
    // Return latest 12 videos
    const latestVideos = videos.slice(0, 12);
    
    // Build response data
    const responseData = { 
      videos: latestVideos,
      channelId,
      channelHandle,
      channelUrl: `https://www.youtube.com/${channelHandle}`,
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
    console.error('Error fetching YouTube feed:', error);
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
      error: 'Failed to fetch YouTube videos',
      details: message,
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
