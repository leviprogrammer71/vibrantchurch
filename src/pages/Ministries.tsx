import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { SEO } from '@/components/SEO';
import { churchInfo } from '@/data/church';

const bgElements = {
  crossOrnament: '/images/elements/bg10.png',
  botanicalLeaves: '/images/elements/bg2.png',
  pressedFlowers: '/images/elements/bg35.png',
  goldFrame: '/images/elements/bg12.png',
};

/**
 * Ministries page - redirects users to the About page since
 * ministry info is now consolidated there (groups, leadership, etc.)
 */
export default function Ministries() {
  return (
    <div className="min-h-screen bg-brand-cream">
      <SEO
        title="Ministries & Life Groups — Vibrant Church"
        description="Get involved with ministries and Life Groups at Vibrant Church in Terre Hill, PA. Bible study, prayer, fellowship, and service opportunities in Lancaster County."
        path="/ministries"
      />
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 bg-brand-navy overflow-hidden">
        <div className="absolute inset-0">
          <img src="/images/photos/pray.jpg" alt="" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy to-brand-navy/80" />
        </div>
        {/* Cross ornament — right accent */}
        <div
          className="absolute -right-16 top-0 bottom-0 w-64 bg-cover bg-center opacity-10 pointer-events-none hidden lg:block"
          style={{ backgroundImage: `url('${bgElements.crossOrnament}')` }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="block text-sm font-semibold uppercase tracking-widest text-brand-gold mb-4">
              Ministries
            </span>
            <h1 className="font-[Playfair_Display] text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Get <em className="italic text-brand-gold font-normal">Involved</em>
            </h1>
            <p className="text-lg text-white/80 leading-relaxed mb-8">
              There are many ways to connect, grow, and serve at {churchInfo.name}. From small groups to community outreach, there's a place for you.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/about">
                <Button className="bg-brand-gold text-brand-navy hover:bg-brand-gold/90 rounded-full px-8 font-semibold">
                  <img src="/images/elements/icons/people-circle.png" alt="" className="w-5 h-5 mr-2 object-contain" />
                  Learn About Us
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" className="border-white/40 text-white hover:bg-white/10 rounded-full px-8 font-semibold bg-transparent">
                  <img src="/images/elements/icons/speech-bubble.png" alt="" className="w-5 h-5 mr-2 brightness-200 object-contain" />
                  Contact Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="relative py-20 lg:py-28 overflow-hidden">
        {/* Botanical leaves — background texture */}
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.05] pointer-events-none"
          style={{ backgroundImage: `url('${bgElements.botanicalLeaves}')` }}
        />
        {/* Gold frame — bottom-left accent */}
        <div
          className="absolute bottom-0 left-0 w-[350px] h-[250px] bg-cover bg-left-bottom opacity-[0.05] pointer-events-none"
          style={{ backgroundImage: `url('${bgElements.goldFrame}')` }}
        />
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <img src="/images/elements/icons/bible.png" alt="" className="w-12 h-12 mx-auto mb-4 opacity-60" />
            <h2 className="font-[Playfair_Display] text-3xl font-bold text-brand-navy mb-3">
              Life Groups & Ministries
            </h2>
            <img src="/images/elements/icons/divider-leafy.png" alt="" className="w-28 mx-auto mb-6 opacity-40" />
            <p className="text-lg text-brand-navy/70 mb-8 leading-relaxed">
              Our Life Groups meet throughout the week and are the heart of our church community. Whether you're looking for Bible study, prayer, fellowship, or service opportunities, we'd love to help you find your place.
            </p>
            <p className="text-lg text-brand-navy/70 mb-10 leading-relaxed">
              Contact us at{' '}
              <a href={`mailto:${churchInfo.emails?.groups ?? 'groups@vibrantchurchterrehill.org'}`} className="text-brand-gold font-semibold hover:underline">
                {churchInfo.emails?.groups ?? 'groups@vibrantchurchterrehill.org'}
              </a>
              {' '}to find a group near you.
            </p>
            <Link to="/contact">
              <Button className="bg-brand-navy text-white hover:bg-brand-navy/90 rounded-full px-8 font-semibold">
                <img src="/images/elements/icons/heart.png" alt="" className="w-5 h-5 mr-2 brightness-200 object-contain" />
                Get Connected
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
