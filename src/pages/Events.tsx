import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ExternalLink, ArrowRight } from 'lucide-react';
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

const CALENDAR_URL = churchInfo?.links?.events ?? 'https://vibrant-church-506100.churchcenter.com/calendar?view=gallery';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: 'easeOut' as const },
};

// Sample events shown as a friendly fallback in case the Church Center
// calendar embed is blocked from loading inside an iframe.
const sampleEvents = [
  {
    title: 'Sunday Worship Gathering',
    day: 'Every Sunday',
    time: '10:00 AM',
    location: '113 Conestoga Street, Terre Hill',
  },
  {
    title: 'Youth Night',
    day: 'Wednesdays',
    time: '6:30 PM',
    location: 'Vibrant Church Youth Room',
  },
  {
    title: "Women's Bible Study",
    day: 'Thursdays',
    time: '9:30 AM',
    location: 'Vibrant Church Fellowship Hall',
  },
  {
    title: 'Community Serve Day',
    day: 'Monthly',
    time: '9:00 AM',
    location: 'Terre Hill & Surrounding Areas',
  },
];

export default function Events() {
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
                <ExternalLink className="w-5 h-5 mr-2" />
                View Full Calendar
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          RECURRING EVENTS
      ============================================================ */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.06] pointer-events-none"
          style={{ backgroundImage: `url('${bgElements.texture}')` }}
        />
        {/* Panoramic mountains — bottom accent */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 bg-cover bg-bottom opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: `url('${bgElements.panoramicMountains}')` }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-14">
            <span className="block text-sm font-semibold uppercase tracking-widest text-brand-gold mb-4">
              Weekly &amp; Monthly
            </span>
            <h2 className="font-[Playfair_Display] text-3xl sm:text-4xl font-bold text-brand-navy leading-tight mb-4">
              What's happening at <em className="italic text-brand-gold font-normal">Vibrant.</em>
            </h2>
            <p className="text-lg text-brand-navy/60">
              Here are some of the ways you can get connected each week.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-8 mb-16">
            {sampleEvents.map((event, index) => (
              <motion.div
                key={event.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group rounded-2xl bg-white shadow-lg hover:shadow-xl p-7 transition-all duration-300 hover:-translate-y-1 border border-transparent hover:border-brand-gold/15"
              >
                <div className="flex items-start gap-5">
                  <div className="shrink-0 w-14 h-14 rounded-xl bg-brand-navy/5 flex flex-col items-center justify-center">
                    <img src="/images/elements/icons/calendar-circle.png" alt="" className="w-8 h-8 object-contain" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-[Playfair_Display] text-xl font-semibold text-brand-navy mb-3">
                      {event.title}
                    </h4>
                    <div className="space-y-1.5 text-sm text-brand-navy/60">
                      <div className="flex items-center gap-2">
                        <img src="/images/elements/icons/clock-circle.png" alt="" className="w-4 h-4 object-contain" />
                        {event.day} · {event.time}
                      </div>
                      <div className="flex items-center gap-2">
                        <img src="/images/elements/icons/location-circle.png" alt="" className="w-4 h-4 object-contain" />
                        {event.location}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Full Calendar CTA */}
          <motion.div
            {...fadeUp}
            className="rounded-2xl bg-brand-navy p-10 sm:p-14 text-center shadow-xl"
          >
            <img src="/images/elements/icons/calendar.png" alt="" className="w-14 h-14 mx-auto mb-6 brightness-200 opacity-80 object-contain" />
            <h3 className="font-[Playfair_Display] text-2xl sm:text-3xl font-bold text-white mb-4">
              See the full calendar
            </h3>
            <p className="text-white/70 max-w-xl mx-auto mb-8">
              View, filter, and register for every upcoming event on our Church Center calendar.
            </p>
            <a href={CALENDAR_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-brand-gold text-brand-navy hover:bg-brand-gold/90 font-semibold rounded-full px-10">
                <ExternalLink className="w-5 h-5 mr-2" />
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
            <img src="/images/elements/icons/cross.png" alt="" className="w-10 h-10 mx-auto mb-4 opacity-50" />
            <span className="block text-sm font-semibold uppercase tracking-widest text-brand-gold mb-4">
              Get Involved
            </span>
            <h2 className="font-[Playfair_Display] text-3xl sm:text-4xl font-bold text-brand-navy leading-tight mb-3">
              There's a place for you.
            </h2>
            <img src="/images/elements/icons/divider-leafy.png" alt="" className="w-28 mx-auto mb-6 opacity-40" />
            <p className="text-lg text-brand-navy/70 leading-relaxed mb-10 max-w-2xl mx-auto">
              Whether it's joining a small group, serving on a team, or simply showing up to an event —
              community at Vibrant Church starts with a next step. We'd love to help you find yours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-brand-navy text-white hover:bg-brand-navy/90 font-semibold">
                  <img src="/images/elements/icons/people-circle.png" alt="" className="w-5 h-5 mr-2 brightness-200 object-contain" />
                  Get in Touch
                </Button>
              </Link>
              <Link to="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-brand-navy text-brand-navy hover:bg-brand-navy/5 font-semibold"
                >
                  <img src="/images/elements/icons/heart.png" alt="" className="w-5 h-5 mr-2 object-contain" />
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
