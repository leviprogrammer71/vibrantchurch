import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { Resend } from "https://esm.sh/resend@2.0.0";

const allowedOrigins = [
  'https://vibranttchurch.lovable.app',
  'https://id-preview--c82d8e02-301a-4606-bb82-2eb4e9b6cbd1.lovable.app',
  'https://c82d8e02-301a-4606-bb82-2eb4e9b6cbd1.lovableproject.com',
  'http://localhost:5173',
  'http://localhost:3000',
];

// Rate limiting configuration
const RATE_LIMIT_WINDOW_MS = 60 * 60 * 1000; // 1 hour
const RATE_LIMIT_MAX_REQUESTS = 5; // 5 requests per hour per IP
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Input validation limits
const MAX_NAME_LENGTH = 100;
const MAX_EMAIL_LENGTH = 255;
const MAX_PHONE_LENGTH = 20;
const MAX_SUBJECT_LENGTH = 200;
const MAX_MESSAGE_LENGTH = 5000;

function getCorsHeaders(req: Request) {
  const origin = req.headers.get('origin') || '';
  const allowedOrigin = allowedOrigins.includes(origin) ? origin : allowedOrigins[0];
  return {
    'Access-Control-Allow-Origin': allowedOrigin,
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version',
  };
}

// HTML escape function to prevent XSS in emails
function escapeHtml(text: string): string {
  const htmlEntities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#39;',
  };
  return text.replace(/[&<>"']/g, (char) => htmlEntities[char] || char);
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
    // New window
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - 1, resetIn: RATE_LIMIT_WINDOW_MS };
  }

  if (record.count >= RATE_LIMIT_MAX_REQUESTS) {
    return { allowed: false, remaining: 0, resetIn: record.resetTime - now };
  }

  record.count++;
  return { allowed: true, remaining: RATE_LIMIT_MAX_REQUESTS - record.count, resetIn: record.resetTime - now };
}

interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

serve(async (req) => {
  const corsHeaders = getCorsHeaders(req);
  
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Get client IP for rate limiting
    const clientIp = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 
                     req.headers.get('x-real-ip') || 
                     'unknown';

    // Check rate limit
    const rateLimit = checkRateLimit(clientIp);
    if (!rateLimit.allowed) {
      console.warn(`Rate limit exceeded for IP: ${clientIp}`);
      return new Response(JSON.stringify({ 
        success: false,
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

    const formData: ContactFormData = await req.json();
    
    // Validate required fields
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      return new Response(JSON.stringify({ 
        success: false,
        error: 'Missing required fields' 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Validate input lengths
    if (formData.name.length > MAX_NAME_LENGTH) {
      return new Response(JSON.stringify({ 
        success: false,
        error: `Name must be ${MAX_NAME_LENGTH} characters or less` 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (formData.email.length > MAX_EMAIL_LENGTH) {
      return new Response(JSON.stringify({ 
        success: false,
        error: `Email must be ${MAX_EMAIL_LENGTH} characters or less` 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (formData.phone && formData.phone.length > MAX_PHONE_LENGTH) {
      return new Response(JSON.stringify({ 
        success: false,
        error: `Phone must be ${MAX_PHONE_LENGTH} characters or less` 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (formData.subject.length > MAX_SUBJECT_LENGTH) {
      return new Response(JSON.stringify({ 
        success: false,
        error: `Subject must be ${MAX_SUBJECT_LENGTH} characters or less` 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    if (formData.message.length > MAX_MESSAGE_LENGTH) {
      return new Response(JSON.stringify({ 
        success: false,
        error: `Message must be ${MAX_MESSAGE_LENGTH} characters or less` 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      return new Response(JSON.stringify({ 
        success: false,
        error: 'Invalid email format' 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Validate phone format (if provided) - basic alphanumeric with common phone characters
    if (formData.phone && !/^[0-9+\-().\s]+$/.test(formData.phone)) {
      return new Response(JSON.stringify({ 
        success: false,
        error: 'Invalid phone format' 
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Sanitize inputs by trimming whitespace
    const sanitizedData = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      phone: formData.phone?.trim() || null,
      subject: formData.subject.trim(),
      message: formData.message.trim(),
    };

    // Destination email - where contact form submissions go (for reference)
    const DESTINATION_EMAIL = 'hello@vibranttchurch.org';
    
    console.log('Received contact form submission:', {
      name: sanitizedData.name.substring(0, 20) + (sanitizedData.name.length > 20 ? '...' : ''),
      email: sanitizedData.email,
      subject: sanitizedData.subject.substring(0, 30) + (sanitizedData.subject.length > 30 ? '...' : ''),
      hasPhone: !!sanitizedData.phone,
      messageLength: sanitizedData.message.length,
      clientIp: clientIp.substring(0, 10) + '...',
    });

    // Store the contact form submission in the database
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const { error: dbError } = await supabase
      .from('contact_submissions')
      .insert({
        name: sanitizedData.name,
        email: sanitizedData.email,
        phone: sanitizedData.phone,
        subject: sanitizedData.subject,
        message: sanitizedData.message,
        destination_email: DESTINATION_EMAIL,
        status: 'received',
      });

    if (dbError) {
      console.error('Error storing contact submission:', dbError);
      return new Response(JSON.stringify({ 
        success: false,
        error: 'Failed to save your message. Please try again or email us directly at hello@vibranttchurch.org',
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.log('Contact form submission stored successfully');

    // Send email notification via Resend
    const resendApiKey = Deno.env.get('RESEND_API_KEY');
    let emailSent = false;

    if (resendApiKey) {
      try {
        const resend = new Resend(resendApiKey);
        
        // Escape all user-provided content for HTML email
        const escapedName = escapeHtml(sanitizedData.name);
        const escapedEmail = escapeHtml(sanitizedData.email);
        const escapedPhone = sanitizedData.phone ? escapeHtml(sanitizedData.phone) : null;
        const escapedSubject = escapeHtml(sanitizedData.subject);
        const escapedMessage = escapeHtml(sanitizedData.message);
        
        const phoneInfo = escapedPhone ? `<p><strong>Phone:</strong> ${escapedPhone}</p>` : '';
        
        const emailResponse = await resend.emails.send({
          from: 'Vibrant Church Website <noreply@vibranttchurch.org>',
          to: [DESTINATION_EMAIL],
          reply_to: sanitizedData.email,
          subject: `New Contact Form: ${escapedSubject}`,
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h2 style="color: #333; border-bottom: 2px solid #e5e5e5; padding-bottom: 10px;">
                New Contact Form Submission
              </h2>
              <div style="margin: 20px 0;">
                <p><strong>Name:</strong> ${escapedName}</p>
                <p><strong>Email:</strong> <a href="mailto:${escapedEmail}">${escapedEmail}</a></p>
                ${phoneInfo}
                <p><strong>Subject:</strong> ${escapedSubject}</p>
              </div>
              <div style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 20px;">
                <h3 style="margin-top: 0; color: #555;">Message:</h3>
                <p style="white-space: pre-wrap; line-height: 1.6;">${escapedMessage}</p>
              </div>
              <p style="color: #888; font-size: 12px; margin-top: 30px; border-top: 1px solid #e5e5e5; padding-top: 15px;">
                This message was sent from the Vibrant Church website contact form.
                <br>You can reply directly to this email to respond to ${escapedName}.
              </p>
            </div>
          `,
        });

        if (emailResponse.error) {
          console.error('Resend API error:', emailResponse.error);
        } else {
          console.log('Email sent successfully, ID:', emailResponse.data?.id);
          emailSent = true;
        }
      } catch (emailError) {
        console.error('Error sending email:', emailError);
      }
    } else {
      console.warn('RESEND_API_KEY not configured, skipping email notification');
    }

    return new Response(JSON.stringify({ 
      success: true,
      message: 'Your message has been received. We will get back to you soon!',
      emailSent,
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error processing contact form:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return new Response(JSON.stringify({ 
      success: false,
      error: 'Failed to process your message. Please email us directly at hello@vibranttchurch.org',
      details: message,
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
