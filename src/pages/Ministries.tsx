import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ministries } from '@/data/church';
import youthImage from '@/assets/church/youth-group.jpeg';
import prayerImage from '@/assets/church/prayer-group.jpeg';
import worshipImage from '@/assets/church/worship.png';
import outreachImage from '@/assets/church/outreach.jpeg';

const ministryImages: Record<string, string> = {
  'kids': youthImage,
  'youth': youthImage,
  'small-groups': prayerImage,
  'worship': worshipImage,
  'outreach': outreachImage,
};

export default function Ministries() {
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
            <h1 className="font-[Playfair_Display] text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Our Ministries
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              There's a place for everyone at Vibrant Hill Church. Discover how you can grow in faith, 
              build community, and serve others through our various ministries.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Ministries Grid */}
      <section className="py-20 lg:py-28 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {ministries.map((ministry, index) => (
              <motion.div
                key={ministry.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'lg:flex-row-reverse' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'lg:order-2' : ''}>
                  <img 
                    src={ministryImages[ministry.id] || youthImage} 
                    alt={ministry.title}
                    className="rounded-2xl shadow-xl w-full aspect-[4/3] object-cover"
                  />
                </div>
                
                <div className={index % 2 === 1 ? 'lg:order-1' : ''}>
                  <h2 className="font-[Playfair_Display] text-3xl sm:text-4xl font-bold text-foreground mb-4">
                    {ministry.title}
                  </h2>
                  <p className="text-lg text-secondary font-medium mb-4">
                    {ministry.shortDescription}
                  </p>
                  <p className="text-muted-foreground mb-8 leading-relaxed">
                    {ministry.description}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <Link to="/contact">
                      <Button className="bg-primary text-primary-foreground">
                        Get Connected
                        <ChevronRight className="w-5 h-5 ml-2" />
                      </Button>
                    </Link>
                    <a href={`mailto:${ministry.contact}`}>
                      <Button variant="outline">
                        <Mail className="w-5 h-5 mr-2" />
                        {ministry.contact}
                      </Button>
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Get Involved CTA */}
      <section className="py-20 bg-muted">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-[Playfair_Display] text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Ready to Get Involved?
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Whether you want to serve, join a group, or learn more about our ministries, 
              we'd love to help you find your place at Vibrant Hill Church.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button size="lg" className="bg-primary text-primary-foreground">
                  Contact Us
                </Button>
              </Link>
              <Link to="/visit">
                <Button size="lg" variant="outline">
                  Plan Your Visit
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
