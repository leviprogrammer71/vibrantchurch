import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, ExternalLink, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CHURCH_CENTER_URL = 'https://vibrant-church-506100.churchcenter.com/calendar?view=list';

export function ChurchCenterCalendar() {
  const [iframeLoaded, setIframeLoaded] = useState(false);
  const [iframeError, setIframeError] = useState(false);

  return (
    <section className="py-20 lg:py-28 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Calendar className="w-12 h-12 text-secondary mx-auto mb-6" />
          <h2 className="font-[Playfair_Display] text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Upcoming Events
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join us for worship, Bible studies, and community events
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {!iframeError ? (
            <div className="rounded-xl border border-border shadow-lg overflow-hidden bg-background relative">
              {/* Loading skeleton */}
              {!iframeLoaded && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-muted/50 z-10" style={{ minHeight: '700px' }}>
                  <Loader2 className="w-8 h-8 text-secondary animate-spin mb-3" />
                  <p className="text-sm text-muted-foreground">Loading events…</p>
                </div>
              )}
              <iframe
                src={CHURCH_CENTER_URL}
                title="Vibrant Church Events Calendar"
                className={`w-full border-0 transition-opacity duration-500 ${iframeLoaded ? 'opacity-100' : 'opacity-0'}`}
                style={{ minHeight: '700px' }}
                onLoad={() => setIframeLoaded(true)}
                onError={() => setIframeError(true)}
                loading="lazy"
              />
            </div>
          ) : null}

          {/* Always show the fallback link button */}
          <div className="text-center mt-8">
            <a href={CHURCH_CENTER_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                <ExternalLink className="w-5 h-5 mr-2" />
                View Our Events Calendar →
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
