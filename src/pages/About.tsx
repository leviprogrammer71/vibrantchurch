import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SEO } from '@/components/SEO';
import { usePageContent } from '@/hooks/usePageContent';
import {
  churchInfo,
  leadership as defaultLeadership,
  missionPillars as defaultMissionPillars,
  churchValues as defaultChurchValues,
  timeline as defaultTimeline,
  aboutUs,
} from '@/data/church';

// =====================================================
// Types
// =====================================================
interface HeadingParts {
  pre: string;
  italic: string;
  post?: string;
}

interface AboutPageContent {
  hero: {
    eyebrow: string;
    heading: HeadingParts;
    script: string;
    description: string;
  };
  story: {
    eyebrow: string;
    heading: HeadingParts;
    paragraph: string;
  };
  mission: {
    eyebrow: string;
    heading: HeadingParts;
  };
  values: {
    eyebrow: string;
    heading: string;
    script: string;
  };
  leadership: {
    eyebrow: string;
    heading: string;
    description: string;
    ctaLabel: string;
  };
}

// =====================================================
// Default content (falls back if admin panel has no overrides)
// =====================================================
const defaultAboutContent: AboutPageContent = {
  hero: {
    eyebrow: 'About Us',
    heading: { pre: "More than a church. We're a ", italic: 'family', post: '.' },
    script: 'Love God. Love People. Make Disciples.',
    description:
      churchInfo?.heroSubtext ??
      "Welcome to Vibrant Church — a warm, welcoming church family located in the heart of Terre Hill.",
  },
  story: {
    eyebrow: 'Our Story',
    heading: { pre: 'Rooted in Faith. Focused on People. Sent to ', italic: 'Serve', post: '.' },
    paragraph:
      aboutUs?.story ??
      "Vibrant Church began with a simple belief — that the love of Jesus can transform lives and communities. For generations, we've been committed to hearing God's Word, loving our neighbors, and making a lasting impact in Terre Hill and beyond.",
  },
  mission: {
    eyebrow: 'Our Mission',
    heading: {
      pre: 'We exist to ',
      italic: 'glorify God',
      post: ' by making disciples who love God, love people, and serve the world.',
    },
  },
  values: {
    eyebrow: 'Our Values',
    heading: 'What Matters to Us',
    script: 'Doing life together in every season.',
  },
  leadership: {
    eyebrow: 'Leadership',
    heading: 'Led by People Who Care',
    description:
      'Meet the elders who shepherd our church family with wisdom, humility, and steady, faithful love.',
    ctaLabel: 'Meet Our Team',
  },
};

// Watercolor icon images — keyed to the `icon` string stored on each data record
const missionIconImageMap: Record<string, string> = {
  cross: '/images/elements/icons/cross.png',
  people: '/images/elements/icons/people-circle.png',
  globe: '/images/elements/icons/heart.png',
};

const valueIconImages = [
  '/images/elements/icons/bible.png',
  '/images/elements/icons/sparkles.png',
  '/images/elements/icons/people-circle.png',
  '/images/elements/icons/heart.png',
];

// Static decorative/photo assets
const images = {
  heroBg: '/images/photos/outside.jpg',
  heroFeature: '/images/photos/hangout1.jpg',
  storyPhotoA: '/images/photos/inside.jpg',
  storyPhotoB: '/images/photos/inside1.jpg',
  storyPhotoC: '/images/photos/hangout.jpg',
  valuesPhotoA: '/images/photos/hangout1.jpg',
  valuesPhotoB: '/images/photos/worship.jpg',
  valuesPhotoC: '/images/photos/service.jpg',
  prayerPhoto: '/images/photos/pray.jpg',
  elderBoard: '/images/staff/elderboard.jpg',
};

const bgElements = {
  leaves: '/images/elements/bg2.png',
  crossMountains: '/images/elements/bg31.png',
  quoteMarks: '/images/elements/bg6.png',
  pressedFlowers: '/images/elements/bg35.png',
  churchSteeple: '/images/elements/bg32.png',
  lushBotanicals: '/images/elements/bg14.png',
  goldFrame: '/images/elements/bg12.png',
};

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: 'easeOut' as const },
};

function Heading({ parts, className }: { parts?: HeadingParts | null; className?: string }) {
  const safe = parts ?? { pre: '', italic: '', post: '' };
  return (
    <h2 className={className}>
      {safe.pre ?? ''}
      <em className="italic text-brand-gold font-normal">{safe.italic ?? ''}</em>
      {safe.post ?? ''}
    </h2>
  );
}

export default function About() {
  const { content } = usePageContent<AboutPageContent>('about', defaultAboutContent);

  // Defensive fallbacks for every section
  const hero = content?.hero ?? defaultAboutContent.hero;
  const story = content?.story ?? defaultAboutContent.story;
  const mission = content?.mission ?? defaultAboutContent.mission;
  const values = content?.values ?? defaultAboutContent.values;
  const leadershipContent = content?.leadership ?? defaultAboutContent.leadership;

  const leadershipTeam = defaultLeadership ?? [];
  const missionPillars = defaultMissionPillars ?? [];
  const churchValues = defaultChurchValues ?? [];
  const timeline = defaultTimeline ?? [];

  return (
    <div className="min-h-screen bg-brand-cream">
      <SEO
        title="About Us — Our Story, Mission & Leadership"
        description="Learn about Vibrant Church in Terre Hill, PA — our story since 1948, our mission to love God and people, our values, and our elder leadership team. A Lancaster County church family serving Terre Hill, New Holland, Ephrata, and surrounding communities."
        path="/about"
      />
      {/* ============================================================
          HERO
      ============================================================ */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-brand-navy">
        <div className="absolute inset-0">
          <img
            src={images.heroBg}
            alt=""
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/90 via-brand-navy/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/70 via-transparent to-brand-navy/20" />
        </div>

        <div
          className="absolute -left-16 top-0 bottom-0 w-64 bg-cover bg-center opacity-10 pointer-events-none hidden lg:block"
          style={{ backgroundImage: `url('${bgElements.crossMountains}')` }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <span className="block text-sm font-semibold uppercase tracking-widest text-brand-gold mb-4">
                {hero.eyebrow ?? 'About Us'}
              </span>
              <Heading
                parts={hero.heading}
                className="font-[Playfair_Display] text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
              />
              <p className="font-[Caveat] text-3xl sm:text-4xl text-brand-gold mb-6 leading-tight">
                {hero.script ?? ''}
              </p>
              <p className="text-lg text-white/80 leading-relaxed max-w-xl">
                {hero.description ?? ''}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="relative rotate-2 rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white/10">
                <img
                  src={images.heroFeature}
                  alt={churchInfo?.name ?? 'Vibrant Church'}
                  className="w-full h-72 sm:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
              </div>
              <div className="absolute -bottom-6 -left-6 w-28 h-28 rounded-full bg-brand-gold/20 blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================
          OUR STORY
      ============================================================ */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.06] pointer-events-none"
          style={{ backgroundImage: `url('${bgElements.leaves}')` }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <motion.div {...fadeUp}>
              <span className="block text-sm font-semibold uppercase tracking-widest text-brand-gold mb-4">
                {story.eyebrow ?? 'Our Story'}
              </span>
              <Heading
                parts={story.heading}
                className="font-[Playfair_Display] text-3xl sm:text-4xl font-bold text-brand-navy leading-tight mb-6"
              />
              <p className="text-lg text-brand-navy/70 leading-relaxed">
                {story.paragraph ?? ''}
              </p>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
              className="relative"
            >
              {/* Photo collage */}
              <div className="relative h-[22rem] sm:h-[26rem] mb-12">
                <div className="absolute left-0 top-0 w-2/3 -rotate-3 rounded-xl overflow-hidden shadow-xl">
                  <img
                    src={images.storyPhotoA}
                    alt="Vibrant Church gathering"
                    className="w-full h-56 sm:h-64 object-cover"
                  />
                </div>
                <div className="absolute right-0 top-16 sm:top-20 w-1/2 rotate-6 rounded-xl overflow-hidden shadow-xl ring-4 ring-brand-cream">
                  <img
                    src={images.storyPhotoB}
                    alt="Vibrant Church community"
                    className="w-full h-40 sm:h-48 object-cover"
                  />
                </div>
                <div className="absolute left-8 bottom-0 w-1/2 -rotate-2 rounded-xl overflow-hidden shadow-xl ring-4 ring-brand-cream">
                  <img
                    src={images.storyPhotoC}
                    alt="Vibrant Church hangout"
                    className="w-full h-40 sm:h-48 object-cover"
                  />
                </div>
              </div>

              {/* Timeline */}
              <div className="relative pl-6 border-l-2 border-brand-gold/40 space-y-8">
                {timeline.map((entry, index) => (
                  <motion.div
                    key={entry?.year ?? index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative"
                  >
                    <div className="absolute -left-[1.75rem] top-1 w-3 h-3 rounded-full bg-brand-gold" />
                    <p className="font-[Playfair_Display] text-xl font-bold text-brand-navy">
                      {entry?.year ?? ''}
                    </p>
                    <p className="text-brand-navy/70">{entry?.description ?? ''}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================
          OUR MISSION — full-width dark navy
      ============================================================ */}
      <section className="relative py-20 lg:py-28 bg-brand-navy overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
          style={{ backgroundImage: `url('${bgElements.quoteMarks}')` }}
        />
        {/* Gold ornamental frame — subtle bottom accent */}
        <div
          className="absolute bottom-0 left-0 right-0 h-48 bg-cover bg-bottom opacity-[0.06] pointer-events-none"
          style={{ backgroundImage: `url('${bgElements.goldFrame}')` }}
        />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeUp}>
            <span className="block text-sm font-semibold uppercase tracking-widest text-brand-gold mb-4">
              {mission.eyebrow ?? 'Our Mission'}
            </span>
            <Heading
              parts={mission.heading}
              className="font-[Playfair_Display] text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight"
            />
            {/* Leafy divider */}
            <img
              src="/images/elements/icons/divider-leafy.png"
              alt=""
              className="w-44 mx-auto mt-6 opacity-40 brightness-200"
            />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 lg:gap-10 mt-16">
            {missionPillars.map((pillar, index) => {
              const iconSrc = missionIconImageMap[pillar?.icon ?? ''] ?? missionIconImageMap.cross;
              return (
                <motion.div
                  key={pillar?.title ?? index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.12 }}
                  className="flex flex-col items-center text-center"
                >
                  <div className="w-18 h-18 rounded-full bg-white/10 border border-brand-gold/40 flex items-center justify-center mb-5 p-3">
                    <img src={iconSrc} alt="" className="w-10 h-10 object-contain brightness-200" />
                  </div>
                  <h3 className="font-[Playfair_Display] text-xl font-semibold text-white mb-2">
                    {pillar?.title ?? ''}
                  </h3>
                  <p className="text-white/70 leading-relaxed">{pillar?.description ?? ''}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          OUR VALUES
      ============================================================ */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.06] pointer-events-none"
          style={{ backgroundImage: `url('${bgElements.pressedFlowers}')` }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div {...fadeUp}>
              <span className="block text-sm font-semibold uppercase tracking-widest text-brand-gold mb-4">
                {values.eyebrow ?? 'Our Values'}
              </span>
              <h2 className="font-[Playfair_Display] text-3xl sm:text-4xl font-bold text-brand-navy leading-tight mb-10">
                {values.heading ?? 'What Matters to Us'}
              </h2>

              <ul className="space-y-6">
                {churchValues.map((value, index) => {
                  const iconSrc = valueIconImages[index % valueIconImages.length];
                  return (
                    <motion.li
                      key={value?.title ?? index}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div className="shrink-0 w-14 h-14 rounded-full bg-brand-navy/5 flex items-center justify-center">
                        <img src={iconSrc} alt="" className="w-8 h-8 object-contain" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-brand-navy mb-1">
                          {value?.title ?? ''}
                        </h3>
                        <p className="text-brand-navy/70">{value?.description ?? ''}</p>
                      </div>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
              className="relative"
            >
              <div className="relative h-[26rem] sm:h-[30rem]">
                <div className="absolute left-2 top-0 w-3/5 rotate-3 rounded-xl overflow-hidden shadow-xl">
                  <img
                    src={images.valuesPhotoA}
                    alt="Community at Vibrant Church"
                    className="w-full h-52 sm:h-60 object-cover"
                  />
                </div>
                <div className="absolute right-0 top-24 sm:top-28 w-1/2 -rotate-6 rounded-xl overflow-hidden shadow-xl ring-4 ring-brand-cream">
                  <img
                    src={images.valuesPhotoB}
                    alt="Worship at Vibrant Church"
                    className="w-full h-44 sm:h-52 object-cover"
                  />
                </div>
                <div className="absolute left-10 bottom-0 w-1/2 rotate-2 rounded-xl overflow-hidden shadow-xl ring-4 ring-brand-cream">
                  <img
                    src={images.valuesPhotoC}
                    alt="Service at Vibrant Church"
                    className="w-full h-44 sm:h-52 object-cover"
                  />
                </div>
                <p className="absolute -bottom-2 right-0 sm:right-6 font-[Caveat] text-3xl text-brand-gold rotate-[-3deg]">
                  {values.script ?? 'Doing life together in every season.'}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================
          LEADERSHIP
      ============================================================ */}
      <section id="leadership-grid" className="relative py-20 lg:py-28 bg-brand-cream scroll-mt-24 overflow-hidden">
        {/* Church steeple watercolor — subtle right-side accent */}
        <div
          className="absolute -right-20 top-0 w-[350px] h-[350px] bg-contain bg-no-repeat opacity-[0.05] pointer-events-none"
          style={{ backgroundImage: `url('${bgElements.churchSteeple}')` }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-14">
            <span className="block text-sm font-semibold uppercase tracking-widest text-brand-gold mb-4">
              {leadershipContent.eyebrow ?? 'Leadership'}
            </span>
            <h2 className="font-[Playfair_Display] text-3xl sm:text-4xl font-bold text-brand-navy leading-tight mb-6">
              {leadershipContent.heading ?? 'Led by People Who Care'}
            </h2>
            <p className="text-lg text-brand-navy/70 leading-relaxed mb-8">
              {leadershipContent.description ?? ''}
            </p>
            <Button
              asChild
              size="lg"
              className="bg-brand-gold text-brand-navy hover:bg-brand-gold/90 font-semibold"
            >
              <a href="#leadership-grid">{leadershipContent.ctaLabel ?? 'Meet Our Team'}</a>
            </Button>
          </motion.div>

          <motion.div
            {...fadeUp}
            className="rounded-2xl overflow-hidden shadow-xl mb-14 max-w-4xl mx-auto"
          >
            <img
              src={images.elderBoard}
              alt="Vibrant Church elder board"
              className="w-full h-56 sm:h-72 lg:h-80 object-cover object-top"
            />
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {leadershipTeam.map((leader, index) => (
              <motion.div
                key={leader?.name ?? index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="relative w-full aspect-square rounded-xl overflow-hidden shadow-lg mb-4">
                  <img
                    src={leader?.image ?? images.elderBoard}
                    alt={leader?.name ?? 'Vibrant Church leader'}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="font-semibold text-lg text-brand-navy">{leader?.name ?? ''}</h3>
                <p className="text-brand-gold font-medium text-sm uppercase tracking-wide">
                  {leader?.role ?? ''}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
