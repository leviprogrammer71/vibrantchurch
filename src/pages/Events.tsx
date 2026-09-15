import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  IconCalendar, IconCommunity, IconCross,
  IconHeart, IconDividerLeafy, IconGlobe,
} from '@/icons';
import { Button } from '@/components/ui/button';
import { SEO } from '@/components/SEO';
import { churchInfo, eventsPage } from '@/data/church';

// =====================================================
// Static assets
// =====================================================
const images = {
  heroBg: '/images/photos/event.jpg',
};

const bgElements = {
  leaves: '/images/elements/bg30.png',
  texture: '/images/elements/bg2.png',
  goldFrame: '/images/elements/bg12.png',
  panoramicMountains: '/images/elements/bg1.png',
  dramaticClouds: '/images/elements/bg33.png',
};

const CALENDAR_URL = churchInfo?.links?.events ?? 'https://vibrant-church-506100.churchcenter.com/calendar';
const CALENDAR_EMBED_SRC = 'https://vibrant-church-506100.churchcenter.com/assets/calendar_embed.js';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: 'easeOut' as const },
};

export default function Events() {
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!calendarRef.current) return;

    // Remove any previously injected script to avoid duplicates on re-mount
    const existing = calendarRef.current.querySelector('script');
    if (existing) existing.remove();

    const script = document.createElement('script');
    script.src = CALENDAR_EMBED_SRC;
    script.setAttribute('data-height', 'auto');
    script.async = true;
    calendarRef.current.appendChild(script);

    return () => {
      if (calendarRef.current) {
        const s = calendarRef.current.querySelector('script');
        if (s) s.remove();
      }
    };
  }, []);

  return (
    <div className="min-h-screen bg-brand-cream">
      <SEO
        title="Events & Gatherings at Vibrant Church"
        description="Upcoming events at Vibrant Church in Terre Hill, PA — Sunday worship, youth nights, Bible studies, community serve days, and more. Get connected with a church family in Lancaster County near New Holland, Ephrata, and East Earl."
        path="/events"
      />
      {/* ============================================================
          HERO
      ============================================================ */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-brand-navy">
        <div className="absolute inset-0">
          <img src={images.heroBg} alt="" className="w-full h-full object-cover opacity-55" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/80 via-brand-navy/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/70 via-transparent to-brand-navy/20" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="block text-sm font-semibold uppercase tracking-widest text-brand-gold mb-4">
              Events &amp; Gatherings
            </span>
            <h1 className="font-[Playfair_Display] text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Life happens <em className="italic text-brand-gold font-normal">together.</em>
            </h1>
            <p className="text-lg text-white/80 leading-relaxed mb-10 max-w-xl">
              {eventsPage?.description ?? 'Stay connected with everything happening at Vibrant Church.'}
            </p>
            <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                className="bg-brand-gold text-brand-navy hover:bg-brand-gold/90 font-semibold rounded-full px-8"
              >
                <IconGlobe className="w-5 h-5 mr-2" />
                View Full Calendar
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          CHURCH CENTER CALENDAR EMBED
      ============================================================ */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.06] pointer-events-none"
          style={{ backgroundImage: `url('${bgElements.texture}')` }}
        />
        <div
          className="absolute bottom-0 left-0 right-0 h-40 bg-cover bg-bottom opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: `url('${bgElements.panoramicMountains}')` }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-14">
            <span className="block text-sm font-semibold uppercase tracking-widest text-brand-gold mb-4">
              Upcoming Events
            </span>
            <h2 className="font-[Playfair_Display] text-3xl sm:text-4xl font-bold text-brand-navy leading-tight mb-4">
              What's happening at <em className="italic text-brand-gold font-normal">Vibrant.</em>
            </h2>
            <p className="text-lg text-brand-navy/60">
              Browse our calendar to find your next step — sign up and RSVP right here.
            </p>
          </motion.div>

          {/* Church Center embedded calendar */}
          <motion.div
            {...fadeUp}
            className="rounded-2xl bg-white shadow-lg p-4 sm:p-8 mb-16 border border-brand-gold/10"
          >
            <div ref={calendarRef} className="min-h-[400px]" />
          </motion.div>

          {/* Full Calendar CTA */}
          <motion.div
            {...fadeUp}
            className="rounded-2xl bg-brand-navy p-10 sm:p-14 text-center shadow-xl"
          >
            <IconCalendar className="w-14 h-14 mx-auto mb-6 opacity-80" />
            <h3 className="font-[Playfair_Display] text-2xl sm:text-3xl font-bold text-white mb-4">
              See the full calendar
            </h3>
            <p className="text-white/70 max-w-xl mx-auto mb-8">
              View, filter, and register for every upcoming event on our Church Center calendar.
            </p>
            <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-brand-gold text-brand-navy hover:bg-brand-gold/90 font-semibold rounded-full px-10">
                <IconGlobe className="w-5 h-5 mr-2" />
                View Our Calendar
              </Button>
            </a>
            <p className="font-[Caveat] text-xl text-white/50 mt-6">
              Sign up and RSVP right from the calendar!
            </p>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          GET INVOLVED CTA
      ============================================================ */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.08] pointer-events-none"
          style={{ backgroundImage: `url('${bgElements.leaves}')` }}
        />
        <div className="absolute inset-0 bg-brand-cream" style={{ zIndex: -1 }} />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeUp}>
            <IconCross className="w-10 h-10 mx-auto mb-4 opacity-50" />
            <span className="block text-sm font-semibold uppercase tracking-widest text-brand-gold mb-4">
              Get Involved
            </span>
            <h2 className="font-[Playfair_Display] text-3xl sm:text-4xl font-bold text-brand-navy leading-tight mb-3">
              There's a place for you.
            </h2>
            <IconDividerLeafy className="w-28 mx-auto mb-6 opacity-40" />
            <p className="text-lg text-brand-navy/70 leading-relaxed mb-10 max-w-2xl mx-auto">
              Whether it's joining a small group, serving on a team, or simply showing up to an event —
              community at Vibrant Church starts with a next step. We'd love to help you find yours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-brand-navy text-white hover:bg-brand-navy/90 font-semibold">
                  <IconCommunity className="w-5 h-5 mr-2" />
                  Get in Touch
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-brand-navy text-brand-navy hover:bg-brand-navy/5 font-semibold"
                >
                  <IconHeart className="w-5 h-5 mr-2" />
                  Find a Way to Serve
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
