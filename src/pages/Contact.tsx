import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { GoogleMap } from '@/components/GoogleMap';
import { usePageContent } from '@/hooks/usePageContent';
import { supabase } from '@/integrations/supabase/client';

// Default content from siteContent.ts
import { contactPageContent as defaultContactContent, churchInfo as defaultChurchInfo } from '@/data/siteContent';

interface ContactPageContent {
  hero: { title: string; description: string; subtext: string };
  contactInfo: { addressTitle: string; phoneTitle: string; emailTitle: string; serviceTimesTitle: string };
  contactForm: { headline: string; description: string; namePlaceholder: string; emailPlaceholder: string; phonePlaceholder: string; subjectPlaceholder: string; messagePlaceholder: string; submitButtonText: string; submittingText: string; successTitle: string; successDescription: string };
  officeHours: { headline: string; hours: Array<{ day: string; time: string }> };
  prayerRequest: { headline: string; description: string; footnote: string };
}

interface ChurchInfoContent {
  fullAddress: string;
  phone: string;
  email: string;
  serviceTime: string;
}

type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export default function Contact() {
  const [formStatus, setFormStatus] = useState<FormStatus>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const { content } = usePageContent<ContactPageContent>('contact', defaultContactContent as ContactPageContent);
  const { content: churchInfo } = usePageContent<ChurchInfoContent>('churchInfo', {
    fullAddress: defaultChurchInfo.fullAddress,
    phone: defaultChurchInfo.phone,
    email: defaultChurchInfo.email,
    serviceTime: defaultChurchInfo.serviceTime,
  });

  const { hero, contactInfo, contactForm, officeHours, prayerRequest } = content;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    setErrorMessage('');
    
    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: formData,
      });

      if (error) {
        throw error;
      }

      if (!data?.success) {
        throw new Error(data?.error || 'Failed to send message');
      }

      setFormStatus('success');
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      
      // Reset success message after 10 seconds
      setTimeout(() => {
        setFormStatus('idle');
      }, 10000);
    } catch (error) {
      console.error('Contact form error:', error);
      setFormStatus('error');
      setErrorMessage('Something went wrong. Please email us directly at hello@vibranttchurch.org');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const contactCards = [
    { icon: MapPin, title: contactInfo.addressTitle, content: churchInfo.fullAddress },
    { icon: Phone, title: contactInfo.phoneTitle, content: churchInfo.phone, link: `tel:${churchInfo.phone}` },
    { icon: Mail, title: contactInfo.emailTitle, content: churchInfo.email, link: `mailto:${churchInfo.email}` },
    { icon: Clock, title: contactInfo.serviceTimesTitle, content: churchInfo.serviceTime },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-primary to-primary/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <MessageCircle className="w-12 h-12 text-secondary mb-6" />
            <h1 className="font-[Playfair_Display] text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              {hero.title}
            </h1>
            <p className="text-xl text-white/90 leading-relaxed mb-4">
              {hero.description}
            </p>
            <p className="text-lg text-white/80">
              {hero.subtext}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 -mt-20 relative z-20">
            {contactCards.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
              >
                <Card className="h-full bg-card border-none shadow-xl text-center">
                  <CardContent className="p-6">
                    <div className="w-14 h-14 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                      <item.icon className="w-7 h-7 text-secondary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                    {item.link ? (
                      <a href={item.link} className="text-muted-foreground hover:text-primary transition-colors">
                        {item.content}
                      </a>
                    ) : (
                      <p className="text-muted-foreground">{item.content}</p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 lg:py-28 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="font-[Playfair_Display] text-3xl sm:text-4xl font-bold text-foreground mb-6">
                {contactForm.headline}
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                {contactForm.description}
              </p>

              <Card className="bg-card border-none shadow-lg">
                <CardContent className="p-8">
                  {/* Success State */}
                  {formStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                    >
                      <CheckCircle2 className="w-16 h-16 text-green-600 mx-auto mb-4" />
                      <h3 className="text-2xl font-semibold text-foreground mb-2">Message sent!</h3>
                      <p className="text-muted-foreground">We'll get back to you soon.</p>
                    </motion.div>
                  )}

                  {/* Error State */}
                  {formStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-8"
                    >
                      <AlertCircle className="w-16 h-16 text-destructive mx-auto mb-4" />
                      <h3 className="text-2xl font-semibold text-foreground mb-2">Something went wrong</h3>
                      <p className="text-muted-foreground mb-4">{errorMessage}</p>
                      <Button 
                        variant="outline" 
                        onClick={() => setFormStatus('idle')}
                      >
                        Try Again
                      </Button>
                    </motion.div>
                  )}

                  {/* Form */}
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
                            placeholder={contactForm.namePlaceholder} 
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
                            placeholder={contactForm.emailPlaceholder} 
                            disabled={formStatus === 'submitting'}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <Label htmlFor="phone">Phone</Label>
                          <Input 
                            id="phone" 
                            name="phone" 
                            type="tel" 
                            value={formData.phone} 
                            onChange={handleChange} 
                            maxLength={20}
                            placeholder={contactForm.phonePlaceholder} 
                            disabled={formStatus === 'submitting'}
                          />
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
                            placeholder={contactForm.subjectPlaceholder} 
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
                          placeholder={contactForm.messagePlaceholder} 
                          rows={6} 
                          disabled={formStatus === 'submitting'}
                        />
                      </div>
                      <Button 
                        type="submit" 
                        size="lg" 
                        className="w-full bg-primary text-primary-foreground" 
                        disabled={formStatus === 'submitting'}
                      >
                        {formStatus === 'submitting' ? contactForm.submittingText : (
                          <>
                            <Send className="w-5 h-5 mr-2" />
                            {contactForm.submitButtonText}
                          </>
                        )}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="lg:sticky lg:top-24 space-y-8"
            >
              {/* Google Maps */}
              <GoogleMap height="300px" />

              {/* Office Hours */}
              <Card className="bg-primary text-primary-foreground border-none">
                <CardContent className="p-8">
                  <h3 className="font-[Playfair_Display] text-2xl font-bold mb-6">
                    {officeHours.headline}
                  </h3>
                  <ul className="space-y-3">
                    {officeHours.hours.map((item, index) => (
                      <li key={index} className="flex justify-between">
                        <span className="text-primary-foreground/80">{item.day}</span>
                        <span>{item.time}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Prayer Request Section */}
      <section className="py-20 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-[Playfair_Display] text-3xl sm:text-4xl font-bold text-foreground mb-6">
              {prayerRequest.headline}
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              {prayerRequest.description}
            </p>
            <p className="text-muted-foreground">
              {prayerRequest.footnote}{' '}
              <a href={`tel:${churchInfo.phone}`} className="text-primary font-medium hover:underline">
                {churchInfo.phone}
              </a>
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
