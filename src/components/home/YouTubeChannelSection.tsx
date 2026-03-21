import { useState } from 'react';
import { motion } from 'framer-motion';
import { Youtube, Loader2, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const YOUTUBE_CHANNEL_URL = 'https://youtube.com/@vibrantchurchterrehill7120';
const YOUTUBE_CHANNEL_ID = 'UCzWxTItXMHZMS75vl0tJybw';

// Use the channel's uploads playlist (replace "UC" prefix with "UU" to get uploads playlist)
const UPLOADS_PLAYLIST_ID = `UU${YOUTUBE_CHANNEL_ID.slice(2)}`;

export function YouTubeChannelSection() {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);

  // Embed the channel's latest uploads playlist directly — no API key or Supabase needed
  const embedUrl = `https://www.youtube.com/embed/videoseries?list=${UPLOADS_PLAYLIST_ID}`;

  return (
    <section className="py-20 lg:py-28 bg-muted">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Youtube className="w-12 h-12 text-secondary mx-auto mb-6" />
          <h2 className="font-[Playfair_Display] text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Watch Our Messages
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Watch our recent services, worship, and messages from Vibrant Church.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Video embed */}
          <div className="rounded-xl overflow-hidden shadow-2xl border border-border bg-background relative">
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              {/* Loading state */}
              {!iframeLoaded && !iframeError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted/50 z-10">
                  <Loader2 className="w-8 h-8 text-secondary animate-spin mb-3" />
                  <p className="text-sm text-muted-foreground">Loading latest message…</p>
                </div>
              )}

              {/* Error / fallback state */}
              {iframeError && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted z-10">
                  <Youtube className="w-12 h-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground mb-4">Videos are updating — please check back soon.</p>
                  <a href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="gap-2">
                      <ExternalLink className="w-4 h-4" />
                      Visit Our YouTube Channel
                    </Button>
                  </a>
                </div>
              )}

              {!iframeError && (
                <iframe
                  src={embedUrl}
                  title="Latest sermon from Vibrant Church"
                  className={`absolute inset-0 w-full h-full border-0 transition-opacity duration-500 ${iframeLoaded ? 'opacity-100' : 'opacity-0'}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  onLoad={() => setIframeLoaded(true)}
                  onError={() => setIframeError(true)}
                />
              )}
            </div>
          </div>

          {/* Subscribe Button */}
          <div className="text-center mt-10">
            <a href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-[hsl(0_100%_40%)] hover:bg-[hsl(0_100%_35%)] text-white gap-2 text-lg px-8 py-6">
                <Youtube className="w-6 h-6" />
                Subscribe to Our YouTube Channel
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
