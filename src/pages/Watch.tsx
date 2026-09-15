import { useState } from 'react';
import { motion } from 'framer-motion';
import { Youtube, ArrowRight, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SEO } from '@/components/SEO';
import { churchInfo, watchPage } from '@/data/church';

// =====================================================
// YouTube configuration
// =====================================================
const YOUTUBE_CHANNEL_URL = churchInfo.social.youtube;
const YOUTUBE_CHANNEL_ID = 'UCzWxTItXMHZMS75vl0tJybw';
const UPLOADS_PLAYLIST_ID = `UU${YOUTUBE_CHANNEL_ID.slice(2)}`;
const FEATURED_EMBED_URL = `https://www.youtube.com/embed/videoseries?list=${UPLOADS_PLAYLIST_ID}`;

// Static photo / decorative assets
const images = {
  heroBg: '/images/photos/inside1.jpg',
  worship: '/images/photos/worship.jpg',
};

const bgElements = {
  quoteMarks: '/images/elements/bg6.png',
  crossOrnament: '/images/elements/bg10.png',
  sunsetCross: '/images/elements/12.png',
  dramaticClouds: '/images/elements/bg33.png',
  panoramicMountains: '/images/elements/bg1.png',
};

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: 'easeOut' as const },
};

// Split "Grow in faith. Be encouraged." into a plain lead-in and an italic close
const HEADING_ITALIC = 'encouraged.';
const headingLead = watchPage.subtext.replace(HEADING_ITALIC, '').trim();

// =====================================================
// Reusable responsive video embed with a loading state
// =====================================================
function VideoEmbed({ src, title, className = '' }: { src: string; title: string; className?: string }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={`relative w-full overflow-hidden rounded-2xl shadow-xl bg-brand-navy/5 ${className}`}
      style={{ paddingBottom: '56.25%' }}
    >
      {!loaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-brand-navy/5 z-10">
          <Loader2 className="w-8 h-8 text-brand-gold animate-spin" />
        </div>
      )}
      <iframe
        src={src}
        title={title}
        className={`absolute inset-0 w-full h-full border-0 transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

export default function Watch() {
  return (
    <div className="min-h-screen bg-brand-cream">
      <SEO
        title="Watch Sermons & Messages Online"
        description="Watch the latest sermons and Bible teaching from Vibrant Church in Terre Hill, PA. Stream messages on YouTube anytime. Grow in faith, be encouraged, and share with friends in Lancaster County and beyond."
        path="/watch"
      />
      {/* ============================================================
          HERO
      ============================================================ */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-brand-navy">
        <div className="absolute inset-0">
          <img
            src={images.heroBg}
            alt=""
            className="w-full h-full object-cover opacity-50"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-brand-navy/60 via-brand-navy/50 to-brand-navy/90" />
        </div>

        <div
          className="absolute -right-16 top-0 bottom-0 w-64 bg-cover bg-center opacity-10 pointer-events-none hidden lg:block"
          style={{ backgroundImage: `url('${bgElements.crossOrnament}')` }}
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="block text-sm font-semibold uppercase tracking-widest text-brand-gold mb-4">
              Watch &amp; Listen
            </span>
            <h1 className="font-[Playfair_Display] text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              {headingLead}{' '}
              <em className="italic text-brand-gold font-normal">{HEADING_ITALIC}</em>
            </h1>
            <p className="text-lg text-white/80 leading-relaxed max-w-2xl mx-auto mb-8">
              {watchPage.description}
            </p>
            <a href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noopener noreferrer">
              <Button
                size="lg"
                variant="outline"
                className="border-2 border-brand-gold text-brand-gold bg-transparent hover:bg-brand-gold hover:text-brand-navy font-semibold"
              >
                <Youtube className="w-5 h-5 mr-2" />
                Watch on YouTube
              </Button>
            </a>
            <p className="font-[Caveat] text-2xl sm:text-3xl text-white/70 mt-10 leading-snug">
              "Your word is a lamp to my feet and a light to my path." — Psalm 119:105
            </p>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          FEATURED MESSAGE
      ============================================================ */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        {/* Panoramic mountains — subtle bottom accent */}
        <div
          className="absolute bottom-0 left-0 right-0 h-40 bg-cover bg-bottom opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: `url('${bgElements.panoramicMountains}')` }}
        />
        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center mb-12">
            <span className="block text-sm font-semibold uppercase tracking-widest text-brand-gold mb-4">
              Featured Message
            </span>
            <h2 className="font-[Playfair_Display] text-3xl sm:text-4xl font-bold text-brand-navy leading-tight">
              Our Latest Message
            </h2>
          </motion.div>

          <motion.div
            {...fadeUp}
            transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
          >
            <VideoEmbed src={FEATURED_EMBED_URL} title="Featured message from Vibrant Church" />
            <div className="text-center mt-8">
              <a href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-brand-navy text-white hover:bg-brand-navy/90 font-semibold">
                  <img src="/images/elements/icons/play.png" alt="" className="w-5 h-5 mr-2 brightness-200" />
                  Watch Now
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          RECENT MESSAGES
      ============================================================ */}
      <section className="relative py-20 lg:py-28 bg-white/60 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.05] pointer-events-none"
          style={{ backgroundImage: `url('${images.worship}')` }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-14">
            <span className="block text-sm font-semibold uppercase tracking-widest text-brand-gold mb-4">
              Recent Messages
            </span>
            <h2 className="font-[Playfair_Display] text-3xl sm:text-4xl font-bold text-brand-navy leading-tight mb-4">
              Catch Up on Recent Teaching
            </h2>
            <p className="text-lg text-brand-navy/70 leading-relaxed">
              Browse recent messages from our YouTube channel and grow in your walk with Jesus.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[0, 1, 2, 3].map((index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <VideoEmbed
                  src={`https://www.youtube.com/embed/videoseries?list=${UPLOADS_PLAYLIST_ID}&index=${index}`}
                  title={`Vibrant Church message ${index + 1}`}
                />
              </motion.div>
            ))}
          </div>

          <motion.div {...fadeUp} className="text-center mt-12">
            <a
              href={YOUTUBE_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-brand-navy font-semibold hover:text-brand-gold transition-colors group"
            >
              View All Messages
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          SCRIPTURE QUOTE
      ============================================================ */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.07] pointer-events-none"
          style={{ backgroundImage: `url('${bgElements.quoteMarks}')` }}
        />

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeUp}>
            <img src="/images/elements/icons/quote-open.png" alt="" className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="font-[Caveat] text-3xl sm:text-4xl lg:text-5xl text-brand-navy leading-snug mb-4">
              Let the message of Christ dwell among you richly.
            </p>
            <p className="text-brand-gold uppercase tracking-widest text-sm font-semibold mb-10">
              — Colossians 3:16
            </p>
            <p className="font-[Caveat] text-2xl sm:text-3xl text-brand-navy/70 inline-block -rotate-2">
              See you Sunday!
            </p>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          SUBSCRIBE CTA
      ============================================================ */}
      <section className="relative py-20 lg:py-28 bg-brand-navy overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-15 pointer-events-none"
          style={{ backgroundImage: `url('${bgElements.sunsetCross}')` }}
        />
        <div
          className="absolute -left-20 top-0 bottom-0 w-72 bg-cover bg-center opacity-10 pointer-events-none hidden lg:block"
          style={{ backgroundImage: `url('${bgElements.crossOrnament}')` }}
        />
        {/* Dramatic dark clouds — subtle overlay accent */}
        <div
          className="absolute top-0 right-0 w-[500px] h-[300px] bg-cover bg-right-top opacity-[0.08] pointer-events-none"
          style={{ backgroundImage: `url('${bgElements.dramaticClouds}')` }}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div {...fadeUp}>
              <h2 className="font-[Playfair_Display] text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
                Never miss a message.
              </h2>
              <p className="text-lg text-white/80 leading-relaxed mb-8 max-w-lg">
                New messages are added every week. Subscribe on YouTube so you never miss what God is
                teaching us together.
              </p>
              <a href={YOUTUBE_CHANNEL_URL} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-brand-gold text-brand-navy hover:bg-brand-gold/90 font-semibold">
                  <Youtube className="w-5 h-5 mr-2" />
                  Visit Our YouTube Channel
                </Button>
              </a>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
            >
              <div className="bg-white/10 border border-white/15 backdrop-blur-sm rounded-2xl p-8 sm:p-10 text-center">
                <img src="/images/elements/icons/speech-bubble.png" alt="" className="w-12 h-12 mx-auto mb-5 brightness-200 opacity-80" />
                <h3 className="font-[Playfair_Display] text-2xl font-bold text-white mb-3">
                  Get Messages in Your Inbox
                </h3>
                <p className="text-white/70 mb-8">
                  Sign up to be notified by email whenever a new message is posted.
                </p>
                <a href={`mailto:${churchInfo.email}`}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="w-full border-2 border-white/30 text-white bg-transparent hover:bg-white hover:text-brand-navy font-semibold"
                  >
                    Subscribe to Updates
                  </Button>
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
