import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Clock, Car, Users, Baby, Music, MessageCircle, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { GoogleMap } from '@/components/GoogleMap';
import { usePageContent, useGlobalSettings } from '@/hooks/usePageContent';

// Default content from siteContent.ts
import { visitPageContent as defaultVisitContent, churchInfo as defaultChurchInfo, siteImages } from '@/data/siteContent';

const serviceIcons = [Music, Heart, MessageCircle, Users];

interface VisitPageContent {
  hero: { title: string; description: string };
  serviceInfo: { serviceTimeTitle: string; locationTitle: string; parkingTitle: string; parkingDescription: string };
  findUs: { headline: string };
  whatHappens: { headline: string; description: string; items: Array<{ title: string; description: string }> };
  gettingHere: { headline: string; addressLabel: string; dressCodeLabel: string; dressCodeText: string; arrivalLabel: string; arrivalText: string; buttonText: string };
  kids: { tagText: string; headline: string; description: string; features: string[]; footnote: string };
  cta: { headline: string; description: string; buttonText: string };
}

interface ChurchInfoContent {
  name: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  fullAddress: string;
  phone: string;
  email: string;
  serviceTime: string;
}

export default function Visit() {
  const { content } = usePageContent<VisitPageContent>('visit', defaultVisitContent as VisitPageContent);
  const { content: churchInfo } = usePageContent<ChurchInfoContent>('churchInfo', defaultChurchInfo);
  
  const { hero, serviceInfo, findUs, whatHappens, gettingHere, kids, cta } = content;

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={siteImages.worship} 
            alt="Vibrant Church worship"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 to-primary/70" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="font-[Playfair_Display] text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              {hero.title}
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              {hero.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Service Info Cards */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-24 relative z-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card className="h-full bg-card border-none shadow-xl text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                    <Clock className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{serviceInfo.serviceTimeTitle}</h3>
                  <p className="text-2xl font-bold text-primary">{churchInfo.serviceTime}</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card className="h-full bg-card border-none shadow-xl text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{serviceInfo.locationTitle}</h3>
                  <p className="text-foreground font-medium">{churchInfo.address}</p>
                  <p className="text-muted-foreground">{churchInfo.city}, {churchInfo.state} {churchInfo.zip}</p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card className="h-full bg-card border-none shadow-xl text-center">
                <CardContent className="p-8">
                  <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                    <Car className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{serviceInfo.parkingTitle}</h3>
                  <p className="text-muted-foreground">{serviceInfo.parkingDescription}</p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Google Maps Section */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-8"
          >
            <h2 className="font-[Playfair_Display] text-3xl font-bold text-foreground mb-4">
              {findUs.headline}
            </h2>
            <p className="text-muted-foreground">
              {churchInfo.fullAddress}
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <GoogleMap height="350px" />
          </motion.div>
        </div>
      </section>

      {/* What Happens on Sunday Section */}
      <section className="py-20 lg:py-28 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="font-[Playfair_Display] text-3xl sm:text-4xl font-bold text-foreground mb-4">
              {whatHappens.headline}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {whatHappens.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-6">
              {whatHappens.items.map((item, index) => {
                const Icon = serviceIcons[index];
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="bg-muted border-none shadow-md">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center shrink-0">
                            <Icon className="w-6 h-6 text-secondary" />
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                            <p className="text-muted-foreground">{item.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:sticky lg:top-24"
            >
              <Card className="bg-primary text-primary-foreground overflow-hidden">
                <CardContent className="p-8">
                  <h3 className="font-[Playfair_Display] text-2xl font-bold mb-6">{gettingHere.headline}</h3>
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-secondary mb-2">{gettingHere.addressLabel}</h4>
                      <p className="text-primary-foreground/90">
                        {churchInfo.address}<br />
                        {churchInfo.city}, {churchInfo.state} {churchInfo.zip}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary mb-2">{gettingHere.dressCodeLabel}</h4>
                      <p className="text-primary-foreground/90">
                        {gettingHere.dressCodeText}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-secondary mb-2">{gettingHere.arrivalLabel}</h4>
                      <p className="text-primary-foreground/90">
                        {gettingHere.arrivalText}
                      </p>
                    </div>
                  </div>
                  <a 
                    href={`https://maps.google.com/?q=${encodeURIComponent(churchInfo.fullAddress)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block mt-8"
                  >
                    <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
                      <MapPin className="w-5 h-5 mr-2" />
                      {gettingHere.buttonText}
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Kids Ministry Section */}
      <section className="py-20 lg:py-28 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="order-2 lg:order-1"
            >
              <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full mb-6">
                <Baby className="w-5 h-5" />
                <span className="font-medium">{kids.tagText}</span>
              </div>
              <h2 className="font-[Playfair_Display] text-3xl sm:text-4xl font-bold text-foreground mb-6">
                {kids.headline}
              </h2>
              <p className="text-lg text-muted-foreground mb-6">
                {kids.description}
              </p>
              <ul className="space-y-4 mb-8">
                {kids.features.map((item, index) => (
                  <li key={index} className="flex items-center gap-3 text-foreground">
                    <div className="w-2 h-2 rounded-full bg-secondary" />
                    {item}
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground">
                {kids.footnote}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              <img 
                src={siteImages.youth} 
                alt="Kids activities at Vibrant Church"
                className="rounded-2xl shadow-2xl w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-[Playfair_Display] text-3xl sm:text-4xl font-bold mb-6">
              {cta.headline}
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              {cta.description}
            </p>
            <Link to="/contact">
              <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                {cta.buttonText}
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
