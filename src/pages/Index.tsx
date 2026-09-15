import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronRight, Clock, MapPin, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SEO } from '@/components/SEO';
import { churchInfo, whatToExpect } from '@/data/church';
import { useRef } from 'react';

/* ── animation presets ── */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-60px' },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
});

const fadeIn = (delay = 0) => ({
  initial: { opacity: 0 },
  whileInView: { opacity: 1 },
  viewport: { once: true },
  transition: { duration: 1, delay },
});

const scaleIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.9 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
});

const slideInLeft = (delay = 0) => ({
  initial: { opacity: 0, x: -60 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
});

const slideInRight = (delay = 0) => ({
  initial: { opacity: 0, x: 60 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
});

const YOUTUBE_CHANNEL_ID = 'UCzWxTItXMHZMS75vl0tJybw';
const UPLOADS_PLAYLIST_ID = `UU${YOUTUBE_CHANNEL_ID.slice(2)}`;

const quickCards = [
  {
    title: "I'm New Here",
    description: "We'd love to meet you this Sunday. Learn what to expect on your first visit.",
    cta: "Plan Your Visit",
    path: "/visit",
    image: "/images/photos/hangout.jpg",
    iconSrc: "/images/elements/icons/location.png",
  },
  {
    title: "Watch Messages",
    description: "Missed a Sunday? Catch up on encouraging messages from God's Word anytime.",
    cta: "Watch Now",
    path: "/watch",
    image: "/images/photos/worship.jpg",
    iconSrc: "/images/elements/icons/play.png",
  },
  {
    title: "Find Community",
    description: "Life is better together. Join a group and grow in faith and friendship.",
    cta: "Get Connected",
    path: "/about",
    image: "/images/photos/pray.jpg",
    iconSrc: "/images/elements/icons/heart.png",
  },
];

/* Map whatToExpect icon keys → custom watercolor icon images */
const expectIconMap: Record<string, string> = {
  users: '/images/elements/icons/people-circle.png',
  music: '/images/elements/icons/cross.png',
  book: '/images/elements/icons/bible.png',
  heart: '/images/elements/icons/heart.png',
};

export default function Index() {
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <div className="min-h-screen bg-brand-cream">
      <SEO
        title="Vibrant Church | Terre Hill, PA — A Church That Loves God and People"
        description="Vibrant Church in Terre Hill, PA — a welcoming church family in Lancaster County. Sunday worship at 10 AM. Bible-based teaching, kids programs, youth ministry, and community groups near New Holland, Ephrata, and East Earl."
        path="/"
      />

      {/* ══════════════════════════════════════════════
          HERO — full-bleed parallax with vivid photo
      ══════════════════════════════════════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        {/* Parallax background photo — low overlay so the image shines */}
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <img
            src="/images/photos/service.jpg"
            alt="Vibrant Church worship service"
            className="w-full h-full object-cover scale-110"
          />
        </motion.div>
        {/* Subtle gradient — NOT heavy blanket */}
        <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/80 via-brand-navy/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/70 via-transparent to-brand-navy/20" />

        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-32"
        >
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-2xl"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-block text-sm font-semibold uppercase tracking-[0.25em] text-brand-gold mb-6"
            >
              Welcome to Vibrant Church
            </motion.span>

            <h1 className="font-[Playfair_Display] text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-[1.05] mb-6">
              A church that<br />
              <em className="italic text-brand-gold font-normal">loves God</em>
              <br />and people.
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="font-[Caveat] text-2xl sm:text-3xl text-white/90 mb-10"
            >
              All generations. Real people. A real welcome.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="flex flex-wrap gap-4"
            >
              <Link to="/visit">
                <Button className="bg-brand-gold text-brand-navy hover:bg-brand-gold-hover rounded-full px-8 py-6 text-base font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
                  Plan Your Visit <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link to="/watch">
                <Button className="border-2 border-white/50 text-white hover:bg-white/15 rounded-full px-8 py-6 text-base font-semibold bg-white/5 backdrop-blur-sm transition-all hover:-translate-y-0.5">
                  <img src="/images/elements/icons/play.png" alt="" className="w-5 h-5 mr-2 brightness-200" /> Watch a Message
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Bottom decorative wave strip */}
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-brand-cream to-transparent z-10" />
      </section>

      {/* ══════════════════════════════════════════════
          QUICK ACTION CARDS — overlapping hero
      ══════════════════════════════════════════════ */}
      <section className="relative -mt-16 z-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {quickCards.map((card, i) => {
              return (
                <motion.div key={card.title} {...scaleIn(i * 0.15)}>
                  <Link to={card.path}>
                    <div className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-500 hover:-translate-y-2">
                      <div className="relative h-52 overflow-hidden">
                        <img
                          src={card.image}
                          alt={card.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                        <div className="absolute top-4 left-4 w-12 h-12 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-md">
                          <img src={card.iconSrc} alt="" className="w-8 h-8 object-contain" />
                        </div>
                      </div>
                      <div className="p-6">
                        <h3 className="font-[Playfair_Display] text-xl font-bold text-brand-navy mb-2">
                          {card.title}
                        </h3>
                        <p className="text-brand-navy/60 text-sm leading-relaxed mb-4">
                          {card.description}
                        </p>
                        <span className="inline-flex items-center gap-1 text-brand-gold font-bold text-sm group-hover:gap-2.5 transition-all">
                          {card.cta} <ChevronRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          WELCOME HOME — photo collage + warm copy
      ══════════════════════════════════════════════ */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        {/* Pressed flowers background texture */}
        <div
          className="absolute inset-0 bg-repeat opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: "url('/images/elements/bg35.png')", backgroundSize: '600px' }}
        />
        {/* Collage watercolor accent — top right corner */}
        <div
          className="absolute -top-16 -right-16 w-[450px] h-[450px] bg-contain bg-no-repeat opacity-[0.06] pointer-events-none rotate-12"
          style={{ backgroundImage: "url('/images/elements/bg4.png')" }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Photo Collage */}
            <motion.div {...slideInLeft()} className="relative h-[420px] lg:h-[520px]">
              <motion.div
                {...scaleIn(0.1)}
                className="absolute top-0 right-0 w-[62%] h-[68%] rounded-2xl overflow-hidden shadow-2xl transform rotate-3 z-10"
              >
                <img src="/images/photos/hangout1.jpg" alt="Church community" className="w-full h-full object-cover" />
              </motion.div>
              <motion.div
                {...scaleIn(0.25)}
                className="absolute bottom-0 left-0 w-[55%] h-[58%] rounded-2xl overflow-hidden shadow-xl transform -rotate-3 border-4 border-white z-20"
              >
                <img src="/images/photos/baptism1.jpg" alt="Baptism celebration" className="w-full h-full object-cover" />
              </motion.div>
              <motion.div
                {...scaleIn(0.4)}
                className="absolute top-[20%] left-[8%] w-[32%] h-[32%] rounded-xl overflow-hidden shadow-lg transform rotate-6 border-4 border-white z-30"
              >
                <img src="/images/photos/inside.jpg" alt="Church interior" className="w-full h-full object-cover" />
              </motion.div>
              {/* Decorative watercolor accents */}
              <img
                src="/images/elements/icons/sparkles.png"
                alt=""
                className="absolute -bottom-6 -right-6 w-28 h-28 opacity-40 z-0"
              />
              <img
                src="/images/elements/icons/arrow.png"
                alt=""
                className="absolute -top-4 -left-2 w-20 opacity-25 z-0 -rotate-45"
              />
            </motion.div>

            {/* Copy */}
            <motion.div {...slideInRight(0.1)}>
              <span className="block text-sm font-semibold uppercase tracking-[0.2em] text-brand-gold mb-4">
                Welcome Home
              </span>
              <h2 className="font-[Playfair_Display] text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-navy leading-tight mb-6">
                Where you belong,{' '}
                <em className="italic text-brand-gold font-normal">faith comes alive.</em>
              </h2>
              <p className="text-lg text-brand-navy/70 leading-relaxed mb-6">
                At Vibrant Church, you'll find a place to worship God, build meaningful relationships, and discover your purpose. From inspiring worship to practical teaching and caring groups, our heart is to help people love God and love others.
              </p>
              <p className="text-brand-navy/70 leading-relaxed mb-8">
                Whether you've been following Jesus for years or you're just beginning to explore faith, you are welcome here.
              </p>
              <div className="flex items-center gap-6">
                <Link to="/about">
                  <Button className="bg-brand-navy text-white hover:bg-brand-navy/90 rounded-full px-7 font-semibold transition-all hover:-translate-y-0.5">
                    Learn More <ChevronRight className="w-4 h-4 ml-1" />
                  </Button>
                </Link>
                <p className="font-[Caveat] text-2xl text-brand-gold">
                  We can't wait to meet you!
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          PHOTO STRIP 1 — full-bleed mosaic
      ══════════════════════════════════════════════ */}
      <section className="overflow-hidden">
        <div className="flex h-48 sm:h-56 lg:h-72">
          {[
            '/images/photos/baptiso.jpg',
            '/images/photos/summer_picnic.jpg',
            '/images/photos/mothersday.jpg',
            '/images/photos/event.jpg',
            '/images/photos/worship.jpg',
          ].map((src, i) => (
            <motion.div
              key={src}
              {...fadeIn(i * 0.1)}
              className="flex-1 relative overflow-hidden"
            >
              <img
                src={src}
                alt=""
                className="w-full h-full object-cover hover:scale-110 transition-transform duration-700"
              />
            </motion.div>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          LATEST MESSAGE + UPCOMING EVENTS
      ══════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
        <div
          className="absolute top-0 left-0 right-0 h-40 bg-cover bg-center opacity-[0.05] pointer-events-none"
          style={{ backgroundImage: "url('/images/elements/bg3.png')" }}
        />
        {/* Watercolor panoramic landscape — subtle bottom accent */}
        <div
          className="absolute bottom-0 left-0 right-0 h-48 bg-cover bg-bottom opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: "url('/images/elements/bg1.png')" }}
        />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Latest Message */}
            <motion.div {...fadeUp()}>
              <span className="block text-sm font-semibold uppercase tracking-[0.2em] text-brand-gold mb-3">
                Latest Message
              </span>
              <h2 className="font-[Playfair_Display] text-3xl font-bold text-brand-navy mb-6">
                Grow in faith. Be <em className="italic text-brand-gold font-normal">encouraged.</em>
              </h2>
              <div className="relative rounded-2xl overflow-hidden shadow-2xl bg-black aspect-video group">
                <iframe
                  src={`https://www.youtube.com/embed/videoseries?list=${UPLOADS_PLAYLIST_ID}`}
                  title="Latest sermons from Vibrant Church"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                />
              </div>
              <div className="mt-5 flex items-center gap-4">
                <Link to="/watch">
                  <Button className="bg-brand-navy text-white hover:bg-brand-navy/90 rounded-full font-semibold transition-all hover:-translate-y-0.5">
                    <img src="/images/elements/icons/play.png" alt="" className="w-5 h-5 mr-2 brightness-200" /> All Messages
                  </Button>
                </Link>
                <a
                  href={churchInfo.social?.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-brand-navy/50 hover:text-brand-gold transition-colors"
                >
                  Subscribe on YouTube →
                </a>
              </div>
            </motion.div>

            {/* Upcoming Events */}
            <motion.div {...fadeUp(0.15)}>
              <div className="flex items-center justify-between mb-3">
                <span className="block text-sm font-semibold uppercase tracking-[0.2em] text-brand-gold">
                  Upcoming Events
                </span>
                <Link
                  to="/events"
                  className="text-sm text-brand-gold font-semibold flex items-center gap-1 hover:gap-2.5 transition-all"
                >
                  View All <ChevronRight className="w-4 h-4" />
                </Link>
              </div>
              <h2 className="font-[Playfair_Display] text-3xl font-bold text-brand-navy mb-6">
                What's <em className="italic text-brand-gold font-normal">happening.</em>
              </h2>

              <div className="space-y-0 rounded-2xl overflow-hidden border border-brand-navy/10 bg-white shadow-sm">
                {[
                  { month: 'SUN', day: 'Weekly', title: 'Sunday Worship Service', time: '10:00 AM' },
                  { month: 'WED', day: 'Weekly', title: 'Midweek Prayer & Bible Study', time: '6:30 PM' },
                  { month: 'SAT', day: 'Monthly', title: "Men's Breakfast", time: '8:00 AM' },
                  { month: 'SUN', day: 'Monthly', title: 'Youth Service Project', time: '1:00 PM' },
                ].map((ev, i) => (
                  <motion.div
                    key={ev.title}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: i * 0.1 }}
                    className={`flex items-center gap-5 p-5 hover:bg-brand-cream/60 transition-colors ${i > 0 ? 'border-t border-brand-navy/8' : ''}`}
                  >
                    <div className="shrink-0 w-14 h-14 rounded-xl bg-brand-navy/5 flex flex-col items-center justify-center">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">{ev.month}</span>
                      <span className="text-[11px] font-semibold text-brand-navy">{ev.day}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-semibold text-brand-navy truncate">{ev.title}</h4>
                      <p className="text-sm text-brand-navy/50">
                        <Clock className="w-3.5 h-3.5 inline mr-1 -mt-0.5" />{ev.time}
                      </p>
                    </div>
                    <ChevronRight className="w-4 h-4 text-brand-navy/20 shrink-0" />
                  </motion.div>
                ))}
              </div>

              <div className="mt-4 text-center">
                <a
                  href={churchInfo.links?.events}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-brand-navy/50 hover:text-brand-gold transition-colors"
                >
                  View full calendar on Church Center →
                </a>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          SCRIPTURE QUOTE STRIP — bg element
      ══════════════════════════════════════════════ */}
      <section
        className="relative bg-cover bg-center py-20 lg:py-24"
        style={{ backgroundImage: "url('/images/elements/bg6.png')" }}
      >
        <div className="absolute inset-0 bg-brand-cream/85" />
        <motion.div {...fadeUp()} className="relative max-w-3xl mx-auto px-4 text-center">
          {/* Watercolor quotation marks */}
          <img
            src="/images/elements/icons/quote-open.png"
            alt=""
            className="w-12 h-12 mx-auto mb-4 opacity-50"
          />
          <p className="font-[Playfair_Display] italic text-2xl sm:text-3xl lg:text-4xl text-brand-navy leading-relaxed mb-4">
            Your word is a lamp to my feet and a light to my path.
          </p>
          {/* Leafy divider */}
          <img
            src="/images/elements/icons/divider-leafy.png"
            alt=""
            className="w-48 mx-auto my-4 opacity-60"
          />
          <span className="font-[Caveat] text-xl text-brand-gold">Psalm 119:105</span>
        </motion.div>
      </section>

      {/* ══════════════════════════════════════════════
          WHAT TO EXPECT
      ══════════════════════════════════════════════ */}
      <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
        <div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-contain bg-no-repeat bg-right-bottom opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: "url('/images/elements/bg2.png')" }}
        />
        {/* Abstract gold/navy brush strokes — subtle top-left accent */}
        <div
          className="absolute top-0 left-0 w-[400px] h-[400px] bg-contain bg-no-repeat opacity-[0.04] pointer-events-none"
          style={{ backgroundImage: "url('/images/elements/bg11.png')" }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp()} className="text-center mb-16">
            <span className="block text-sm font-semibold uppercase tracking-[0.2em] text-brand-gold mb-3">
              What to Expect
            </span>
            <h2 className="font-[Playfair_Display] text-3xl sm:text-4xl lg:text-5xl font-bold text-brand-navy mb-4">
              You'll feel right at <em className="italic text-brand-gold font-normal">home.</em>
            </h2>
            <p className="text-lg text-brand-navy/60 max-w-2xl mx-auto">
              Whether it's your first time or your hundredth, here's what Sunday looks like at Vibrant.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {(whatToExpect ?? []).map((item, i) => {
              const iconSrc = expectIconMap[item.icon ?? 'heart'] ?? expectIconMap.heart;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ duration: 0.6, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                  className="group bg-brand-cream/60 rounded-2xl p-7 hover:bg-white hover:shadow-xl transition-all duration-500 hover:-translate-y-1 border border-transparent hover:border-brand-gold/10"
                >
                  <div className="w-16 h-16 rounded-2xl bg-brand-navy/5 group-hover:bg-brand-gold/10 flex items-center justify-center mb-5 transition-colors duration-500">
                    <img src={iconSrc} alt="" className="w-10 h-10 object-contain" />
                  </div>
                  <h3 className="font-[Playfair_Display] text-lg font-bold text-brand-navy mb-2">{item.title}</h3>
                  <p className="text-sm text-brand-navy/60 leading-relaxed">{item.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          PHOTO STRIP 2 — community life
      ══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div className="flex h-56 sm:h-64 lg:h-80">
          {[
            '/images/photos/outside.jpg',
            '/images/photos/baptiso1.jpg',
            '/images/photos/hangout.jpg',
            '/images/photos/inside1.jpg',
          ].map((src, i) => (
            <motion.div
              key={src}
              {...fadeIn(i * 0.1)}
              className="flex-1 relative overflow-hidden"
            >
              <img src={src} alt="" className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
            </motion.div>
          ))}
        </div>
        {/* Overlay text strip */}
        <div className="absolute inset-0 bg-gradient-to-l from-brand-navy/70 via-transparent to-transparent flex items-center justify-end">
          <div className="pr-8 sm:pr-16 text-right">
            <p className="font-[Caveat] text-3xl sm:text-4xl lg:text-5xl text-white leading-tight drop-shadow-lg">
              See you Sunday!
            </p>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════
          WATERCOLOR WAVE TRANSITION
      ══════════════════════════════════════════════ */}
      <div className="relative h-32 sm:h-40 lg:h-48 overflow-hidden">
        <img
          src="/images/elements/bg36.png"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>

      {/* ══════════════════════════════════════════════
          FINAL CTA — with bg element
      ══════════════════════════════════════════════ */}
      <section className="relative overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/elements/bg7.png')" }}
        />
        <div className="absolute inset-0 bg-brand-navy/92" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <motion.div {...fadeUp()} className="text-center max-w-3xl mx-auto">
            {/* Watercolor cross icon */}
            <img
              src="/images/elements/icons/cross.png"
              alt=""
              className="w-16 h-16 mx-auto mb-6 opacity-60 brightness-200"
            />
            <h2 className="font-[Playfair_Display] text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Come as you are. <br />Leave <em className="italic text-brand-gold font-normal">encouraged.</em>
            </h2>
            <p className="text-lg text-white/70 mb-4">
              {churchInfo.serviceTime} · {churchInfo.fullAddress}
            </p>
            <p className="font-[Caveat] text-2xl text-brand-gold mb-4">
              You belong here.
            </p>
            {/* Leafy divider */}
            <img
              src="/images/elements/icons/divider-leafy.png"
              alt=""
              className="w-40 mx-auto mb-8 opacity-40 brightness-200"
            />
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/visit">
                <Button className="bg-brand-gold text-brand-navy hover:bg-brand-gold-hover rounded-full px-10 py-6 text-lg font-bold shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                  Plan Your Visit <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(churchInfo.fullAddress)}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button className="border-2 border-white/30 text-white hover:bg-white/10 rounded-full px-10 py-6 text-lg font-semibold bg-transparent transition-all hover:-translate-y-1">
                  <MapPin className="w-5 h-5 mr-2" /> Get Directions
                </Button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
