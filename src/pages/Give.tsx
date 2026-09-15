import { type ComponentType, type SVGProps } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { SEO } from '@/components/SEO';
import { churchInfo, givePage } from '@/data/church';
import {
  IconHeart, IconCommunity, IconCross, IconCalendar, IconLocation,
  IconSpeechBubble, IconQuoteOpen, IconDividerLeafy,
} from '@/icons';

type SvgIcon = ComponentType<SVGProps<SVGSVGElement>>;

// =====================================================
// Static assets
// =====================================================
const images = {
  heroBg: '/images/elements/bg5.png',
  thankYouBg: '/images/elements/12.png',
  worship: '/images/photos/worship.jpg',
  service: '/images/photos/service.jpg',
  hangout: '/images/photos/hangout.jpg',
};

const bgElements = {
  leaves: '/images/elements/bg10.png',
  goldFrame: '/images/elements/bg12.png',
  lushBotanicals: '/images/elements/bg14.png',
  dramaticClouds: '/images/elements/bg33.png',
};

const GIVING_URL = churchInfo?.links?.giving ?? 'https://vibrant-church-506100.churchcenter.com/giving';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: 'easeOut' as const },
};

// =====================================================
// Data
// =====================================================
const whyGiveCards: { Icon: SvgIcon; title: string; description: string; photo: string }[] = [
  {
    Icon: IconHeart,
    title: 'Fund the Mission',
    description: 'Your gifts power community outreach, kids ministry, and youth programs that change lives.',
    photo: images.service,
  },
  {
    Icon: IconCommunity,
    title: 'Build Community',
    description: 'Generosity keeps worship gatherings, small groups, and church events thriving for everyone.',
    photo: images.worship,
  },
  {
    Icon: IconCross,
    title: 'Make an Impact',
    description: 'Every gift helps us serve Terre Hill and reach beyond our community with the love of Jesus.',
    photo: images.hangout,
  },
];

const waysToGive: { Icon: SvgIcon; title: string; description: string; action: { label: string; href: string; external: boolean } | null }[] = [
  {
    Icon: IconCalendar,
    title: 'Give Online',
    description: 'Give quickly and securely anytime through our Church Center giving portal.',
    action: { label: 'Give Online', href: GIVING_URL, external: true },
  },
  {
    Icon: IconLocation,
    title: 'Give In Person',
    description: 'Join us Sunday mornings and give during the offering as part of our worship gathering.',
    action: null,
  },
  {
    Icon: IconSpeechBubble,
    title: 'Mail a Check',
    description: `Make checks payable to Vibrant Church and mail to ${churchInfo?.fullAddress ?? '113 Conestoga Street, Terre Hill, PA 17581'}.`,
    action: null,
  },
];

export default function Give() {
  return (
    <div className="min-h-screen bg-brand-cream">
      <SEO
        title="Give — Support the Mission of Vibrant Church"
        description="Give online to Vibrant Church in Terre Hill, PA. Your generosity supports community outreach, kids and youth ministry, worship, and missions in Lancaster County. Give securely through Church Center, in person, or by mail."
        path="/give"
      />
      {/* ============================================================
          HERO
      ============================================================ */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-brand-navy">
        <div className="absolute inset-0">
          <img src={images.heroBg} alt="" className="w-full h-full object-cover opacity-50" />
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
              Give
            </span>
            <h1 className="font-[Playfair_Display] text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              The gift of <em className="italic text-brand-gold font-normal">generosity.</em>
            </h1>
            <p className="text-lg text-white/80 leading-relaxed mb-10 max-w-xl">
              Your generosity fuels the mission of Vibrant Church — reaching people, growing disciples, and
              serving our community.
            </p>
            <a href={GIVING_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-brand-gold text-brand-navy hover:bg-brand-gold/90 font-semibold">
                Give Now
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          WHY GIVE
      ============================================================ */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        {/* Lush botanicals — bottom-right accent */}
        <div
          className="absolute bottom-0 right-0 w-[400px] h-[300px] bg-cover bg-right-bottom opacity-[0.05] pointer-events-none"
          style={{ backgroundImage: `url('${bgElements.lushBotanicals}')` }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-16">
            <span className="block text-sm font-semibold uppercase tracking-widest text-brand-gold mb-4">
              Why Give
            </span>
            <h2 className="font-[Playfair_Display] text-3xl sm:text-4xl font-bold text-brand-navy leading-tight">
              Generosity changes everything.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {whyGiveCards.map((card, index) => (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.12 }}
                  className="rounded-2xl overflow-hidden shadow-xl bg-white"
                >
                  <div className="relative h-44">
                    <img src={card.photo} alt={card.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/60 via-transparent to-transparent" />
                    <div className="absolute -bottom-6 left-6 w-14 h-14 rounded-full bg-brand-gold flex items-center justify-center shadow-lg">
                      <card.Icon className="w-9 h-9" />
                    </div>
                  </div>
                  <div className="p-6 pt-10">
                    <h3 className="font-[Playfair_Display] text-xl font-semibold text-brand-navy mb-2">
                      {card.title}
                    </h3>
                    <p className="text-brand-navy/70 leading-relaxed">{card.description}</p>
                  </div>
                </motion.div>
              ))}
          </div>
        </div>
      </section>

      {/* ============================================================
          WAYS TO GIVE
      ============================================================ */}
      <section className="relative py-20 lg:py-28 bg-brand-navy overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
          style={{ backgroundImage: `url('${bgElements.leaves}')` }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-16">
            <span className="block text-sm font-semibold uppercase tracking-widest text-brand-gold mb-4">
              Ways to Give
            </span>
            <h2 className="font-[Playfair_Display] text-3xl sm:text-4xl font-bold text-white leading-tight">
              Give in the way that works for you.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {waysToGive.map((way, index) => (
                <motion.div
                  key={way.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.12 }}
                  className="rounded-2xl bg-white/5 border border-brand-gold/30 p-8 text-center flex flex-col items-center"
                >
                  <div className="w-16 h-16 rounded-full bg-white/10 border border-brand-gold/40 flex items-center justify-center mb-5">
                    <way.Icon className="w-8 h-8" />
                  </div>
                  <h3 className="font-[Playfair_Display] text-xl font-semibold text-white mb-3">{way.title}</h3>
                  <p className="text-white/70 leading-relaxed mb-6">{way.description}</p>
                  {way.action && (
                    <a
                      href={way.action.href}
                      target={way.action.external ? '_blank' : undefined}
                      rel={way.action.external ? 'noopener noreferrer' : undefined}
                      className="mt-auto"
                    >
                      <Button className="bg-brand-gold text-brand-navy hover:bg-brand-gold/90 font-semibold">
                        {way.action.label}
                      </Button>
                    </a>
                  )}
                </motion.div>
              ))}
          </div>

          <motion.div {...fadeUp} className="max-w-3xl mx-auto text-center">
            <IconQuoteOpen className="w-10 h-10 mx-auto mb-3 opacity-40" />
            <p className="font-[Caveat] text-3xl sm:text-4xl text-brand-gold leading-snug">
              &ldquo;Each of you should give what you have decided in your heart to give, not reluctantly or
              under compulsion, for God loves a cheerful giver.&rdquo;
            </p>
            <p className="font-[Caveat] text-2xl text-white/70 mt-3">— 2 Corinthians 9:7</p>
            <IconDividerLeafy className="w-32 mx-auto mt-6 opacity-30" />
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          THANK YOU
      ============================================================ */}
      <section className="relative py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img src={images.thankYouBg} alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-brand-cream/80" />
        </div>
        {/* Gold frame accent — top-left corner */}
        <div
          className="absolute top-0 left-0 w-[350px] h-[250px] bg-cover bg-left-top opacity-[0.06] pointer-events-none"
          style={{ backgroundImage: `url('${bgElements.goldFrame}')` }}
        />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div {...fadeUp}>
            <IconCross className="w-10 h-10 mx-auto mb-4 opacity-60" />
            <span className="block text-sm font-semibold uppercase tracking-widest text-brand-gold mb-4">
              Thank You
            </span>
            <p className="font-[Caveat] text-4xl sm:text-5xl text-brand-navy leading-snug mb-8">
              Thank you for being part of our church family.
            </p>
            <p className="text-lg text-brand-navy/70 leading-relaxed max-w-2xl mx-auto">
              &ldquo;The Lord bless you and keep you; the Lord make his face shine on you and be gracious to
              you; the Lord turn his face toward you and give you peace.&rdquo;
            </p>
            <p className="text-brand-navy/50 mt-3">Numbers 6:24-26</p>
            <p className="text-brand-navy/60 mt-8 max-w-xl mx-auto">{givePage?.thanks}</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
