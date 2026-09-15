import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { SEO } from '@/components/SEO';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { churchInfo, contactPage } from '@/data/church';
import { submitToGoogleSheet } from '@/lib/google-sheet';

// =====================================================
// Static assets
// =====================================================
const images = {
  heroBg: '/images/photos/hangout1.jpg',
};

const bgElements = {
  leaves: '/images/elements/bg2.png',
  pressedFlowers: '/images/elements/bg35.png',
  goldFrame: '/images/elements/bg12.png',
  lushBotanicals: '/images/elements/bg14.png',
  churchSteeple: '/images/elements/bg32.png',
};

const GOOGLE_MAPS_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyDSFKlhsyA_h1emaaxDUXjE5Vio2y27q4U';
const LS_MESSAGES_KEY = 'vc_contact_messages';

const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.7, ease: 'easeOut' as const },
};

const contactInfo = [
  {
    iconSrc: '/images/elements/icons/location-circle.png',
    title: 'Address',
    lines: [churchInfo?.fullAddress ?? '113 Conestoga Street, Terre Hill, PA 17581'],
  },
  {
    iconSrc: '/images/elements/icons/speech-bubble.png',
    title: 'Phone',
    lines: [churchInfo?.phone ?? '(717) 445-0879'],
    href: `tel:${churchInfo?.phone ?? ''}`,
  },
  {
    iconSrc: '/images/elements/icons/heart.png',
    title: 'Email',
    lines: [churchInfo?.email ?? 'hello@vibrantchurchterrehill.org'],
    href: `mailto:${churchInfo?.email ?? ''}`,
  },
  {
    iconSrc: '/images/elements/icons/clock-circle.png',
    title: 'Office Hours',
    lines: ['Mon–Thu: 8:30 AM – 4:30 PM', 'Friday: 8:30 AM – 12:00 PM'],
  },
];

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const newMessage = {
        id: crypto.randomUUID(),
        ...formData,
        status: 'new',
        created_at: new Date().toISOString(),
        read_at: null,
      };
      const existing = JSON.parse(localStorage.getItem(LS_MESSAGES_KEY) || '[]');
      existing.push(newMessage);
      localStorage.setItem(LS_MESSAGES_KEY, JSON.stringify(existing));

      // Submit to Google Sheet (fire-and-forget)
      submitToGoogleSheet({
        form: 'Contact',
        name: formData.name,
        email: formData.email,
        subject: formData.subject,
        message: formData.message,
      });

      try {
        const res = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const result = await res.json();
        if (!result.success) console.warn('Email notification failed');
      } catch (emailErr) {
        console.warn('Email notification failed:', emailErr);
      }

      toast({ title: 'Message sent!', description: "We'll get back to you soon." });
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      toast({ title: 'Error', description: 'Something went wrong. Please try again.', variant: 'destructive' });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream">
      <SEO
        title="Contact Vibrant Church — Terre Hill, PA"
        description="Get in touch with Vibrant Church at 113 Conestoga Street, Terre Hill, PA 17581. Call (717) 445-0879, email hello@vibrantchurchterrehill.org, or send a message. We'd love to hear from you — prayer requests welcome."
        path="/contact"
      />
      {/* ============================================================
          HERO
      ============================================================ */}
      <section className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 overflow-hidden bg-brand-navy">
        <div className="absolute inset-0">
          <img src={images.heroBg} alt="" className="w-full h-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-navy via-brand-navy/90 to-brand-navy/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-transparent to-brand-navy/40" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl"
          >
            <span className="block text-sm font-semibold uppercase tracking-widest text-brand-gold mb-4">
              Contact Us
            </span>
            <h1 className="font-[Playfair_Display] text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              We'd love to hear from <em className="italic text-brand-gold font-normal">you.</em>
            </h1>
            <p className="text-lg text-white/80 leading-relaxed max-w-xl">
              {contactPage?.subtext ?? "Have a question before your visit? We're here to help!"}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ============================================================
          CONTACT INFO + FORM
      ============================================================ */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-[0.06] pointer-events-none"
          style={{ backgroundImage: `url('${bgElements.leaves}')` }}
        />
        {/* Church steeple — right-side accent */}
        <div
          className="absolute top-0 right-0 w-[300px] h-[400px] bg-cover bg-right-top opacity-[0.05] pointer-events-none hidden lg:block"
          style={{ backgroundImage: `url('${bgElements.churchSteeple}')` }}
        />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
            {/* LEFT — Contact Info */}
            <motion.div {...fadeUp}>
              <span className="block text-sm font-semibold uppercase tracking-widest text-brand-gold mb-4">
                Get in Touch
              </span>
              <h2 className="font-[Playfair_Display] text-3xl sm:text-4xl font-bold text-brand-navy leading-tight mb-6">
                {contactPage?.title ?? 'Get in Touch'}
              </h2>
              <p className="text-lg text-brand-navy/70 leading-relaxed mb-10">
                {contactPage?.description ?? "We'd love to hear from you."}
              </p>

              <div className="space-y-6">
                {contactInfo.map((item, index) => {
                  const body = (
                    <div>
                      <h3 className="font-semibold text-brand-navy mb-1">{item.title}</h3>
                      {item.lines.map((line) => (
                        <p key={line} className="text-brand-navy/70">
                          {line}
                        </p>
                      ))}
                    </div>
                  );
                  return (
                    <motion.div
                      key={item.title}
                      initial={{ opacity: 0, x: -15 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-start gap-4"
                    >
                      <div className="shrink-0 w-12 h-12 rounded-full bg-brand-navy/5 flex items-center justify-center">
                        <img src={item.iconSrc} alt="" className="w-7 h-7 object-contain" />
                      </div>
                      {item.href ? (
                        <a href={item.href} className="hover:text-brand-gold transition-colors">
                          {body}
                        </a>
                      ) : (
                        body
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* RIGHT — Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
              className="bg-white rounded-2xl shadow-xl p-8 sm:p-10"
            >
              <h3 className="font-[Playfair_Display] text-2xl font-bold text-brand-navy mb-6">
                Send Us a Message
              </h3>
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
                      placeholder="Your name"
                      disabled={isSubmitting}
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
                      placeholder="you@example.com"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject *</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    maxLength={200}
                    placeholder="How can we help?"
                    disabled={isSubmitting}
                  />
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
                    placeholder="Share a few details..."
                    rows={6}
                    disabled={isSubmitting}
                  />
                </div>
                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-brand-navy text-white hover:bg-brand-navy/90 font-semibold"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    'Sending...'
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      Send Message
                    </>
                  )}
                </Button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================
          QUICK LINKS
      ============================================================ */}
      <section className="relative py-20 lg:py-28 bg-brand-navy overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10 pointer-events-none"
          style={{ backgroundImage: `url('${bgElements.pressedFlowers}')` }}
        />

        <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 gap-8">
            <motion.div
              {...fadeUp}
              className="rounded-2xl bg-white/5 border border-brand-gold/30 p-8 text-center flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-full bg-white/10 border border-brand-gold/40 flex items-center justify-center mb-5">
                <img src="/images/elements/icons/heart.png" alt="" className="w-8 h-8 object-contain brightness-200" />
              </div>
              <h3 className="font-[Playfair_Display] text-xl font-semibold text-white mb-3">Need Prayer?</h3>
              <p className="text-white/70 leading-relaxed mb-6">
                We'd be honored to pray with you. Reach out anytime at{' '}
                <a
                  href={`mailto:${churchInfo?.emails?.prayer ?? 'prayer@vibrantchurchterrehill.org'}`}
                  className="text-brand-gold hover:underline"
                >
                  {churchInfo?.emails?.prayer ?? 'prayer@vibrantchurchterrehill.org'}
                </a>
                .
              </p>
              <a
                href={`mailto:${churchInfo?.emails?.prayer ?? 'prayer@vibrantchurchterrehill.org'}`}
                className="mt-auto"
              >
                <Button className="bg-brand-gold text-brand-navy hover:bg-brand-gold/90 font-semibold">
                  Submit a Prayer Request
                </Button>
              </a>
            </motion.div>

            <motion.div
              {...fadeUp}
              transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
              className="rounded-2xl bg-white/5 border border-brand-gold/30 p-8 text-center flex flex-col items-center"
            >
              <div className="w-16 h-16 rounded-full bg-white/10 border border-brand-gold/40 flex items-center justify-center mb-5">
                <img src="/images/elements/icons/cross.png" alt="" className="w-8 h-8 object-contain brightness-200" />
              </div>
              <h3 className="font-[Playfair_Display] text-xl font-semibold text-white mb-3">Plan Your Visit</h3>
              <p className="text-white/70 leading-relaxed mb-6">
                New to Vibrant Church? Find everything you need to know before your first Sunday with us.
              </p>
              <Link to="/visit" className="mt-auto">
                <Button className="bg-brand-gold text-brand-navy hover:bg-brand-gold/90 font-semibold">
                  Plan Your Visit
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ============================================================
          MAP
      ============================================================ */}
      <section className="relative py-20 lg:py-28 overflow-hidden">
        {/* Gold frame accent */}
        <div
          className="absolute bottom-0 left-0 w-[350px] h-[250px] bg-cover bg-left-bottom opacity-[0.05] pointer-events-none"
          style={{ backgroundImage: `url('${bgElements.goldFrame}')` }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center max-w-2xl mx-auto mb-10">
            <img src="/images/elements/icons/location.png" alt="" className="w-10 h-10 mx-auto mb-4 opacity-50" />
            <span className="block text-sm font-semibold uppercase tracking-widest text-brand-gold mb-4">
              Find Us
            </span>
            <h2 className="font-[Playfair_Display] text-3xl sm:text-4xl font-bold text-brand-navy leading-tight">
              Come see us in Terre Hill.
            </h2>
          </motion.div>
          <motion.div
            {...fadeUp}
            className="rounded-2xl overflow-hidden shadow-2xl ring-4 ring-white"
            style={{ height: '400px' }}
          >
            <iframe
              src={`https://www.google.com/maps/embed/v1/place?key=${GOOGLE_MAPS_KEY}&q=113+Conestoga+Street,Terre+Hill,PA+17581`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Map showing location of Vibrant Church"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
