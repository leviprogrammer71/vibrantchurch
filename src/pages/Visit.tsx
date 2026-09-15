import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Send,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SEO } from '@/components/SEO';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { usePageContent } from '@/hooks/usePageContent';
import { churchInfo, planYourVisit, whatToExpect } from '@/data/church';
import { submitToGoogleSheet } from '@/lib/google-sheet';

// =====================================================
// Google Maps
// =====================================================
const GOOGLE_MAPS_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyDSFKlhsyA_h1emaaxDUXjE5Vio2y27q4U';

// =====================================================
// Types
// =====================================================
interface HeadingParts {
  pre: string;
  italic: string;
  post?: string;
}

interface VisitPageContent {
  hero: {
    eyebrow: string;
    heading: HeadingParts;
    script: string;
    description: string;
    primaryCta: string;
    secondaryCta: string;
  };
  serviceBar: {
    timeTitle: string;
    timeDescription: string;
    locationTitle: string;
    attireTitle: string;
    attireValue: string;
    attireDescription: string;
  };
  expect: {
    eyebrow: string;
    heading: HeadingParts;
    description: string;
    items: Array<{ title: string; description: string }>;
  };
  directions: {
    eyebrow: string;
    heading: string;
    description: string;
    buttonText: string;
    script: string;
  };
  cta: {
    heading: HeadingParts;
    script: string;
    cardTitle: string;
    cardButtonText: string;
  };
  contact: {
    eyebrow: string;
    heading: string;
    description: string;
    officeHoursTitle: string;
    formHeading: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    messagePlaceholder: string;
    submitButtonText: string;
    submittingText: string;
    prayerTitle: string;
    prayerDescription: string;
    planVisitTitle: string;
    planVisitDescription: string;
  };
}

// =====================================================
// Default content (falls back if admin panel has no overrides)
// =====================================================
const defaultVisitContent: VisitPageContent = {
  hero: {
    eyebrow: 'Visit Vibrant Church',
    heading: { pre: "We'd love to meet you ", italic: 'this Sunday.', post: '' },
    script: 'All generations. Real people. A real welcome.',
    description:
      planYourVisit?.intro ??
      "Whether you've been to church your whole life or you're just checking things out, you are always welcome here.",
    primaryCta: 'Plan Your Visit',
    secondaryCta: 'Watch a Message',
  },
  serviceBar: {
    timeTitle: 'Service Time',
    timeDescription: 'A time of worship, teaching, and encouragement.',
    locationTitle: 'Location',
    attireTitle: 'What to Wear',
    attireValue: 'Come as you are.',
    attireDescription:
      planYourVisit?.whatHappens?.note ?? "You'll see everything from jeans to dress clothes.",
  },
  expect: {
    eyebrow: 'What to Expect',
    heading: { pre: 'A warm welcome. A meaningful time. A place for ', italic: 'you.', post: '' },
    description:
      "From the moment you arrive, you'll be greeted like family. Here's a little of what a Sunday morning looks like.",
    items: [
      { title: 'Friendly Faces', description: 'Warm smiles and genuine hospitality from the moment you arrive.' },
      { title: 'Uplifting Worship', description: 'Music that helps connect your heart to God in a real way.' },
      { title: 'Practical Teaching', description: 'Bible-based messages that speak into everyday life.' },
      { title: 'Kids Are Welcome', description: (planYourVisit?.kids ?? 'A safe, fun, loving environment for children of every age.').slice(0, 120) },
    ],
  },
  directions: {
    eyebrow: 'Directions',
    heading: 'Easy to find. Easy to get to.',
    description:
      "We're located right in the heart of Terre Hill, with plenty of parking close to the front doors.",
    buttonText: 'Get Directions',
    script: "If it's your first time, look for someone wearing a blue lanyard — we're here to help!",
  },
  cta: {
    heading: { pre: 'Come as you are. Leave ', italic: 'encouraged.', post: '' },
    script: "We can't wait to meet you!",
    cardTitle: 'Plan Your Visit',
    cardButtonText: 'Plan Your Visit',
  },
  contact: {
    eyebrow: 'Get in Touch',
    heading: "We'd love to hear from you.",
    description: 'Have a question before your visit? Send us a message and we\'ll get back to you soon.',
    officeHoursTitle: 'Office Hours',
    formHeading: 'Send Us a Message',
    namePlaceholder: 'Your name',
    emailPlaceholder: 'you@example.com',
    messagePlaceholder: 'How can we help?',
    submitButtonText: 'Send Message',
    submittingText: 'Sending...',
    prayerTitle: 'Need Prayer?',
    prayerDescription: "We'd be honored to pray with you. Reach out anytime.",
    planVisitTitle: 'Plan Your Visit',
    planVisitDescription: "Let us know you're coming and we'll be ready to welcome you.",
  },
};

const expectIconImages = [
  '/images/elements/icons/people-circle.png',
  '/images/elements/icons/cross.png',
  '/images/elements/icons/bible.png',
  '/images/elements/icons/heart.png',
];

// Static photo assets
const images = {
  heroBg: '/images/photos/outside.jpg',
  heroFeature: '/images/photos/mothersday.jpg',
  directionsPhotoA: '/images/photos/outside.jpg',
  directionsPhotoB: '/images/photos/hangout1.jpg',
};

const bgElements = {
  leaves: '/images/elements/bg2.png',
  botanical: '/images/elements/bg35.png',
  mountains: '/images/elements/bg4.png',
  lushBotanicals: '/images/elements/bg14.png',
  peachSunset: '/images/elements/bg.png',
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

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function Visit() {
  const { content } = usePageContent<VisitPageContent>('visit', defaultVisitContent);

  // Defensive fallbacks for every section
  const hero = content?.hero ?? defaultVisitContent.hero;
  const serviceBar = content?.serviceBar ?? defaultVisitContent.serviceBar;
  const expect = content?.expect ?? defaultVisitContent.expect;
  const directions = content?.directions ?? defaultVisitContent.directions;
  const cta = content?.cta ?? defaultVisitContent.cta;
  const contact = content?.contact ?? defaultVisitContent.contact;

  const expectItems = expect?.items?.length ? expect.items : defaultVisitContent.expect.items;
  const whatToExpectData = whatToExpect ?? [];

  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const encodedAddress = encodeURIComponent(churchInfo?.fullAddress ?? '113 Conestoga Street, Terre Hill, PA 17581');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setErrorMessage('');

    try {
      // 1. Save to localStorage so admin can see it
      const LS_MESSAGES_KEY = 'vc_contact_messages';
      const existing = JSON.parse(localStorage.getItem(LS_MESSAGES_KEY) || '[]');
      const newMessage = {
        id: crypto.randomUUID(),
        name: formData.name,
        email: formData.email,
        phone: '',
        subject: 'Visit Page Inquiry',
        message: formData.message,
        status: 'new',
        created_at: new Date().toISOString(),
        read_at: null,
      };
      existing.unshift(newMessage);
      localStorage.setItem(LS_MESSAGES_KEY, JSON.stringify(existing));

      // 2. Submit to Google Sheet (fire-and-forget)
      submitToGoogleSheet({
        form: 'Visit',
        name: formData.name,
        email: formData.email,
        subject: 'Visit Page Inquiry',
        message: formData.message,
      });

      // 3. Send email notification via backend API
      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            subject: 'Visit Page Inquiry',
            message: formData.message,
          }),
        });
        const result = await res.json();
        if (!res.ok) console.warn('Email API error:', result.error);
      } catch (emailErr) {
        // Email sending is best-effort — message is already saved locally
        console.warn('Could not send notification email:', emailErr);
      }

      setFormStatus('success');
      setFormData({ name: '', email: '', message: '' });

      setTimeout(() => setFormStatus('idle'), 10000);
    } catch (error) {
      console.error('Contact form error:', error);
      setFormStatus('error');
      setErrorMessage(
        `Something went wrong. Please email us directly at ${churchInfo?.emails?.hello ?? 'hello@vibrantchurchterrehill.org'}`
      );
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream">
      <SEO
        title="Plan Your Visit — What to Expect This Sunday"
        description="Visit Vibrant Church in Terre Hill, PA this Sunday at 10 AM. Warm hospitality, inspiring worship, Bible teaching, kids programs, and a welcoming community. Located at 113 Conestoga Street — easy to find with free parking near New Holland and Ephrata."
        path="/visit"
      />
      {/* ============================================================
          HERO
      ============================================================ */}
      <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-brand-navy">
        <div className="absolute inset-0">
          <img src={images.heroBg} alt="" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy/90 via-brand-navy/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy/70 via-transparent to-brand-navy/20" />
        </div>

        <div
          className="absolute -right-16 top-0 bottom-0 w-64 bg-cover bg-center opacity-10 pointer-events-none hidden lg:block"
          style={{ backgroundImage: `url('${bgElements.mountains}')` }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
              <span className="block text-sm font-semibold uppercase tracking-widest text-brand-gold mb-4">
                {hero.eyebrow ?? 'Visit Vibrant Church'}
              </span>
              <Heading
                parts={hero.heading}
                className="font-[Playfair_Display] text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
              />
              <p className="font-[Caveat] text-3xl sm:text-4xl text-brand-gold mb-6 leading-tight">
                {hero.script ?? ''}
              </p>
              <p className="text-lg text-white/80 leading-relaxed max-w-xl mb-8">{hero.description ?? ''}</p>

              <div className="flex flex-wrap gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-white text-brand-navy hover:bg-white/90 font-semibold"
                >
                  <a href="#contact-form">{hero.primaryCta ?? 'Plan Your Visit'}</a>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="border-2 border-white/60 bg-transparent text-white hover:bg-white/10 hover:text-white font-semibold"
                >
                  <a href="/watch">{hero.secondaryCta ?? 'Watch a Message'}</a>
                </Button>
              </div>
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
              <div className="absolute -bottom-6 -right-6 w-28 h-28 rounded-full bg-brand-gold/20 blur-2xl" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================
          SERVICE INFO BAR
      ============================================================ */}
      <section className="relative py-12 lg:py-16 bg-brand-cream border-b border-brand-navy/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6 text-center">
            <motion.div {...fadeUp} className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-brand-navy/5 flex items-center justify-center mb-4">
                <img src="/images/elements/icons/clock-circle.png" alt="" className="w-10 h-10 object-contain" />
              </div>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-brand-gold mb-2">
                {serviceBar.timeTitle ?? 'Service Time'}
              </h3>
              <p className="font-[Playfair_Display] text-xl font-bold text-brand-navy mb-1">
                {churchInfo?.serviceTime ?? 'Sundays at 10:00 AM'}
              </p>
              <p className="text-brand-navy/70 text-sm max-w-[16rem]">{serviceBar.timeDescription ?? ''}</p>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.1 }} className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-brand-navy/5 flex items-center justify-center mb-4">
                <img src="/images/elements/icons/location.png" alt="" className="w-10 h-10 object-contain" />
              </div>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-brand-gold mb-2">
                {serviceBar.locationTitle ?? 'Location'}
              </h3>
              <p className="font-[Playfair_Display] text-xl font-bold text-brand-navy mb-1">
                {churchInfo?.address ?? '113 Conestoga Street'}
              </p>
              <p className="text-brand-navy/70 text-sm max-w-[16rem]">
                {churchInfo?.city ?? 'Terre Hill'}, {churchInfo?.state ?? 'PA'} {churchInfo?.zip ?? '17581'}
              </p>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.2 }} className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full bg-brand-navy/5 flex items-center justify-center mb-4">
                <img src="/images/elements/icons/people-circle.png" alt="" className="w-10 h-10 object-contain" />
              </div>
              <h3 className="text-sm font-semibold uppercase tracking-widest text-brand-gold mb-2">
                {serviceBar.attireTitle ?? 'What to Wear'}
              </h3>
              <p className="font-[Playfair_Display] text-xl font-bold text-brand-navy mb-1">
                {serviceBar.attireValue ?? 'Come as you are.'}
              </p>
              <p className="text-brand-navy/70 text-sm max-w-[16rem]">{serviceBar.attireDescription ?? ''}</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================
          WHAT TO EXPECT
      ============================================================ */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.06] pointer-events-none"
          style={{ backgroundImage: `url('${bgElements.leaves}')` }}
        />
        {/* Lush botanicals accent — bottom right */}
        <div
          className="absolute -bottom-16 -right-16 w-[400px] h-[400px] bg-contain bg-no-repeat opacity-[0.05] pointer-events-none"
          style={{ backgroundImage: `url('${bgElements.lushBotanicals}')` }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-16">
            <span className="block text-sm font-semibold uppercase tracking-widest text-brand-gold mb-4">
              {expect.eyebrow ?? 'What to Expect'}
            </span>
            <Heading
              parts={expect.heading}
              className="font-[Playfair_Display] text-3xl sm:text-4xl font-bold text-brand-navy leading-tight mb-6"
            />
            <p className="text-lg text-brand-navy/70 leading-relaxed">{expect.description ?? ''}</p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {expectItems.map((item, index) => {
              const iconSrc = expectIconImages[index % expectIconImages.length];
              return (
                <motion.div
                  key={item?.title ?? index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full bg-white border-none shadow-lg text-center">
                    <CardContent className="p-8">
                      <div className="w-18 h-18 rounded-full bg-brand-navy/5 border border-brand-gold/30 flex items-center justify-center mx-auto mb-5 p-3">
                        <img src={iconSrc} alt="" className="w-10 h-10 object-contain" />
                      </div>
                      <h3 className="font-[Playfair_Display] text-xl font-semibold text-brand-navy mb-2">
                        {item?.title ?? ''}
                      </h3>
                      <p className="text-brand-navy/70 leading-relaxed">{item?.description ?? ''}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================================
          DIRECTIONS
      ============================================================ */}
      <section className="relative py-20 lg:py-28 bg-white overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.05] pointer-events-none"
          style={{ backgroundImage: `url('${bgElements.botanical}')` }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            <motion.div {...fadeUp}>
              <span className="block text-sm font-semibold uppercase tracking-widest text-brand-gold mb-4">
                {directions.eyebrow ?? 'Directions'}
              </span>
              <h2 className="font-[Playfair_Display] text-3xl sm:text-4xl font-bold text-brand-navy leading-tight mb-6">
                {directions.heading ?? 'Easy to find. Easy to get to.'}
              </h2>
              <p className="text-lg text-brand-navy/70 leading-relaxed mb-8">{directions.description ?? ''}</p>

              <div className="rounded-2xl overflow-hidden shadow-xl mb-6" style={{ height: '320px' }}>
                <iframe
                  src={`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_KEY}&q=${encodedAddress}&zoom=15`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title={`Map showing location of ${churchInfo?.name ?? 'Vibrant Church'}`}
                />
              </div>

              <Button asChild size="lg" className="bg-brand-navy text-white hover:bg-brand-navy/90 font-semibold">
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodedAddress}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {directions.buttonText ?? 'Get Directions'}
                </a>
              </Button>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
              className="relative"
            >
              <div className="relative h-[24rem] sm:h-[28rem]">
                <div className="absolute left-0 top-0 w-3/4 rotate-2 rounded-xl overflow-hidden shadow-xl">
                  <img
                    src={images.directionsPhotoA}
                    alt="Vibrant Church building"
                    className="w-full h-56 sm:h-64 object-cover"
                  />
                </div>
                <div className="absolute right-0 bottom-0 w-3/5 -rotate-3 rounded-xl overflow-hidden shadow-xl ring-4 ring-brand-cream">
                  <img
                    src={images.directionsPhotoB}
                    alt="Vibrant Church exterior"
                    className="w-full h-48 sm:h-56 object-cover"
                  />
                </div>
              </div>
              <p className="mt-6 font-[Caveat] text-2xl sm:text-3xl text-brand-gold text-center rotate-[-1deg]">
                {directions.script ?? ''}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================
          CTA BANNER
      ============================================================ */}
      <section className="relative py-20 lg:py-28 bg-brand-navy overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
          style={{ backgroundImage: `url('${bgElements.mountains}')` }}
        />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div {...fadeUp}>
              <Heading
                parts={cta.heading}
                className="font-[Playfair_Display] text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6"
              />
              <div className="space-y-2 text-white/80 text-lg mb-4">
                <p className="flex items-center gap-2">
                  <img src="/images/elements/icons/clock-circle.png" alt="" className="w-6 h-6 object-contain brightness-200" />
                  {churchInfo?.serviceTime ?? 'Sundays at 10:00 AM'}
                </p>
                <p className="flex items-center gap-2">
                  <img src="/images/elements/icons/location.png" alt="" className="w-6 h-6 object-contain brightness-200" />
                  {churchInfo?.fullAddress ?? '113 Conestoga Street, Terre Hill, PA 17581'}
                </p>
                <p className="flex items-center gap-2">
                  <img src="/images/elements/icons/speech-bubble.png" alt="" className="w-6 h-6 object-contain brightness-200" />
                  <a href={`tel:${churchInfo?.phone ?? ''}`} className="hover:underline">
                    {churchInfo?.phone ?? '(717) 445-0879'}
                  </a>
                </p>
              </div>
              <p className="font-[Caveat] text-2xl sm:text-3xl text-brand-gold">{cta.script ?? ''}</p>
            </motion.div>

            <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.15 }}>
              <Card className="bg-white border-none shadow-2xl">
                <CardContent className="p-10 text-center">
                  <h3 className="font-[Playfair_Display] text-2xl font-bold text-brand-navy mb-4">
                    {cta.cardTitle ?? 'Plan Your Visit'}
                  </h3>
                  <p className="text-brand-navy/70 mb-6">
                    Let us know you're coming so we can be ready to welcome you personally.
                  </p>
                  <Button asChild size="lg" className="w-full bg-brand-gold text-brand-navy hover:bg-brand-gold/90 font-semibold">
                    <a href="#contact-form">{cta.cardButtonText ?? 'Plan Your Visit'}</a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================
          CONTACT FORM
      ============================================================ */}
      <section id="contact-form" className="relative py-20 lg:py-28 bg-brand-cream scroll-mt-24 overflow-hidden">
        {/* Peach sunset watercolor — subtle corner accent */}
        <div
          className="absolute -top-16 -left-16 w-[350px] h-[350px] bg-contain bg-no-repeat opacity-[0.06] pointer-events-none"
          style={{ backgroundImage: `url('${bgElements.peachSunset}')` }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-14">
            <span className="block text-sm font-semibold uppercase tracking-widest text-brand-gold mb-4">
              {contact.eyebrow ?? 'Get in Touch'}
            </span>
            <h2 className="font-[Playfair_Display] text-3xl sm:text-4xl font-bold text-brand-navy leading-tight mb-6">
              {contact.heading ?? "We'd love to hear from you."}
            </h2>
            <p className="text-lg text-brand-navy/70 leading-relaxed">{contact.description ?? ''}</p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-10 lg:gap-12 items-start">
            {/* Left: contact info + cards */}
            <motion.div {...fadeUp} className="lg:col-span-2 space-y-6">
              <Card className="bg-white border-none shadow-lg">
                <CardContent className="p-8 space-y-5">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 shrink-0 rounded-full bg-brand-navy/5 flex items-center justify-center">
                      <img src="/images/elements/icons/location.png" alt="" className="w-7 h-7 object-contain" />
                    </div>
                    <div>
                      <p className="font-semibold text-brand-navy">Address</p>
                      <p className="text-brand-navy/70">{churchInfo?.fullAddress ?? '113 Conestoga Street, Terre Hill, PA 17581'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 shrink-0 rounded-full bg-brand-navy/5 flex items-center justify-center">
                      <img src="/images/elements/icons/speech-bubble.png" alt="" className="w-7 h-7 object-contain" />
                    </div>
                    <div>
                      <p className="font-semibold text-brand-navy">Phone</p>
                      <a href={`tel:${churchInfo?.phone ?? ''}`} className="text-brand-navy/70 hover:text-brand-navy">
                        {churchInfo?.phone ?? '(717) 445-0879'}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 shrink-0 rounded-full bg-brand-navy/5 flex items-center justify-center">
                      <img src="/images/elements/icons/heart.png" alt="" className="w-7 h-7 object-contain" />
                    </div>
                    <div>
                      <p className="font-semibold text-brand-navy">Email</p>
                      <a
                        href={`mailto:${churchInfo?.emails?.hello ?? 'hello@vibrantchurchterrehill.org'}`}
                        className="text-brand-navy/70 hover:text-brand-navy"
                      >
                        {churchInfo?.emails?.hello ?? 'hello@vibrantchurchterrehill.org'}
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 shrink-0 rounded-full bg-brand-navy/5 flex items-center justify-center">
                      <img src="/images/elements/icons/clock-circle.png" alt="" className="w-7 h-7 object-contain" />
                    </div>
                    <div>
                      <p className="font-semibold text-brand-navy">{contact.officeHoursTitle ?? 'Office Hours'}</p>
                      <p className="text-brand-navy/70">{churchInfo?.officeHours ?? 'Mon–Thu: 8:30 AM – 4:30 PM | Friday: 8:30 AM – 12:00 PM'}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-brand-navy border-none shadow-lg">
                <CardContent className="p-8">
                  <h3 className="font-[Playfair_Display] text-xl font-bold text-white mb-2">
                    {contact.prayerTitle ?? 'Need Prayer?'}
                  </h3>
                  <p className="text-white/70 mb-4">{contact.prayerDescription ?? ''}</p>
                  <a
                    href={`mailto:${churchInfo?.emails?.prayer ?? 'prayer@vibrantchurchterrehill.org'}`}
                    className="text-brand-gold font-semibold hover:underline"
                  >
                    {churchInfo?.emails?.prayer ?? 'prayer@vibrantchurchterrehill.org'}
                  </a>
                </CardContent>
              </Card>

              <Card className="bg-white border-2 border-brand-gold/30 shadow-lg">
                <CardContent className="p-8">
                  <h3 className="font-[Playfair_Display] text-xl font-bold text-brand-navy mb-2">
                    {contact.planVisitTitle ?? 'Plan Your Visit'}
                  </h3>
                  <p className="text-brand-navy/70 mb-4">{contact.planVisitDescription ?? ''}</p>
                  <Button asChild className="bg-brand-gold text-brand-navy hover:bg-brand-gold/90 font-semibold">
                    <a href="#contact-form">{contact.planVisitTitle ?? 'Plan Your Visit'}</a>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            {/* Right: form */}
            <motion.div {...fadeUp} transition={{ duration: 0.7, delay: 0.15 }} className="lg:col-span-3">
              <Card className="bg-white border-none shadow-xl">
                <CardContent className="p-8 sm:p-10">
                  <h3 className="font-[Playfair_Display] text-2xl font-bold text-brand-navy mb-6">
                    {contact.formHeading ?? 'Send Us a Message'}
                  </h3>

                  {formStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                    >
                      <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
                      <h3 className="text-2xl font-semibold text-brand-navy mb-2">Message sent!</h3>
                      <p className="text-brand-navy/70">We'll get back to you soon.</p>
                    </motion.div>
                  )}

                  {formStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                    >
                      <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
                      <h3 className="text-2xl font-semibold text-brand-navy mb-2">Something went wrong</h3>
                      <p className="text-brand-navy/70 mb-4">{errorMessage}</p>
                      <Button variant="outline" onClick={() => setFormStatus('idle')}>
                        Try Again
                      </Button>
                    </motion.div>
                  )}

                  {(formStatus === 'idle' || formStatus === 'submitting') && (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="name">Name *</Label>
                          <Input
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            maxLength={100}
                            placeholder={contact.namePlaceholder ?? 'Your name'}
                            disabled={formStatus === 'submitting'}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="email">Email *</Label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            maxLength={255}
                            placeholder={contact.emailPlaceholder ?? 'you@example.com'}
                            disabled={formStatus === 'submitting'}
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="message">Message *</Label>
                        <Textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          maxLength={5000}
                          placeholder={contact.messagePlaceholder ?? 'How can we help?'}
                          rows={6}
                          disabled={formStatus === 'submitting'}
                        />
                      </div>
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full bg-brand-navy text-white hover:bg-brand-navy/90 font-semibold"
                        disabled={formStatus === 'submitting'}
                      >
                        {formStatus === 'submitting' ? (contact.submittingText ?? 'Sending...') : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
                            {contact.submitButtonText ?? 'Send Message'}
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
