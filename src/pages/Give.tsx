import { motion } from 'framer-motion';
import { Heart, CreditCard, Calendar, Gift, Shield, HelpCircle, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { usePageContent } from '@/hooks/usePageContent';
import { PayPalHostedButton } from '@/components/giving/PayPalHostedButton';

// Default content from siteContent.ts
import { givePageContent as defaultGiveContent, churchInfo as defaultChurchInfo } from '@/data/siteContent';

const givingIcons = [CreditCard, Calendar, Gift];

// PayPal giving link for QR code
const PAYPAL_GIVING_URL = 'https://www.paypal.com/donate/?hosted_button_id=4GTZXSK6DTAGC';

// Mailing address for donations
const MAILING_ADDRESS = {
  line1: 'P.O. Box 649',
  line2: 'Terre Hill, PA 17581',
};

interface GivePageContent {
  hero: { title: string; description: string };
  givingOptions: Array<{ title: string; description: string }>;
  secureGiving: { headline: string; description: string; instructions: string; giveNowButtonText: string; securityNote: string; recurringButtonText: string; specialGiftButtonText: string };
  otherWaysToGive: { headline: string; inPerson: string; byMail: string; textToGive: string };
  giftImpact: { headline: string; description: string; areas: Array<{ title: string; description: string }>; thankYouMessage: string };
  faq: { headline: string; questions: Array<{ question: string; answer: string }> };
  scripture: { verse: string; reference: string };
  // Admin-controlled fields
  hostedButtonId?: string;
  showQrCode?: boolean;
}

interface ChurchInfoContent {
  fullAddress: string;
}

// GivingQRCode component

// QR Code Component with Download
function GivingQRCode() {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/images/giving-qr-code.jpeg';
    link.download = 'vibrant-church-giving-qr.jpeg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="bg-card border-2 border-secondary/30">
      <CardContent className="p-8 text-center">
        <h3 className="text-xl font-semibold text-foreground mb-4">Give by QR Code</h3>
        <p className="text-muted-foreground mb-6">
          Scan to give with your phone.
        </p>
        <a 
          href={PAYPAL_GIVING_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mb-6 hover:opacity-90 transition-opacity"
        >
          <img 
            src="/images/giving-qr-code.jpeg"
            alt="Scan to give to Vibrant Church"
            className="w-48 h-48 mx-auto rounded-lg shadow-md bg-white p-2"
          />
        </a>
        <div>
          <Button 
            variant="outline" 
            onClick={handleDownload}
            className="gap-2"
          >
            <Download className="w-4 h-4" />
            Download QR Code
          </Button>
          <p className="text-xs text-muted-foreground mt-2">
            Print and share at events or in bulletins
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Give() {
  const { content } = usePageContent<GivePageContent>('give', defaultGiveContent as GivePageContent);
  const { content: churchInfo } = usePageContent<ChurchInfoContent>('churchInfo', { fullAddress: defaultChurchInfo.fullAddress });
  
  const { hero, givingOptions, secureGiving, otherWaysToGive, giftImpact, faq, scripture, hostedButtonId, showQrCode = true } = content;

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
            <Heart className="w-12 h-12 text-secondary mb-6" />
            <h1 className="font-[Playfair_Display] text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              {hero.title}
            </h1>
            <p className="text-xl text-white/90 leading-relaxed">
              {hero.description}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Giving Options Cards */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 -mt-20 relative z-20">
            {givingOptions.map((option, index) => {
              const Icon = givingIcons[index];
              return (
                <motion.div
                  key={option.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                >
                  <Card className="h-full bg-card border-none shadow-xl text-center hover:shadow-2xl transition-shadow">
                    <CardContent className="p-8">
                      <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-8 h-8 text-secondary" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">{option.title}</h3>
                      <p className="text-muted-foreground">{option.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Give Online Section with PayPal */}
      <section className="py-12 sm:py-16 lg:py-20 bg-card">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="overflow-hidden border-2 border-secondary/30 shadow-2xl">
              <div className="bg-primary text-primary-foreground px-4 py-6 sm:p-8 text-center">
                <Heart className="w-8 h-8 sm:w-10 sm:h-10 text-secondary mx-auto mb-3 sm:mb-4" />
                <h2 className="font-[Playfair_Display] text-xl sm:text-2xl md:text-3xl font-bold mb-2 whitespace-nowrap">
                  Give Online
                </h2>
                <p className="text-sm sm:text-base text-primary-foreground/80 max-w-md mx-auto">
                  {secureGiving.description}
                </p>
              </div>
              <CardContent className="p-4 sm:p-6 lg:p-8 space-y-6 sm:space-y-8">
                <div className="text-center">
                  <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2">
                    Support Our Ministry
                  </h3>
                  <p className="text-sm sm:text-base text-muted-foreground mb-6">
                    Your generous giving helps us spread the Gospel and serve our community
                  </p>
                  
                  {/* PayPal Hosted Button */}
                  <PayPalHostedButton className="max-w-sm mx-auto" />
                </div>

                <div className="border-t border-border pt-6 sm:pt-8">
                  <div className="flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm text-muted-foreground mb-4">
                    <Shield className="w-4 h-4 text-secondary flex-shrink-0" />
                    <span className="text-center">{secureGiving.securityNote}</span>
                  </div>
                </div>

                <div className="bg-muted rounded-lg p-4 sm:p-6">
                  <h4 className="font-semibold text-foreground mb-3 text-sm sm:text-base">{otherWaysToGive.headline}</h4>
                  <ul className="space-y-3 text-xs sm:text-sm text-muted-foreground">
                    <li className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-0">
                      <span className="font-semibold text-foreground">In Person:</span>
                      <span className="sm:ml-1">{otherWaysToGive.inPerson}</span>
                    </li>
                    <li className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-0">
                      <span className="font-semibold text-foreground">By Mail:</span>
                      <span className="sm:ml-1">{otherWaysToGive.byMail} {MAILING_ADDRESS.line1}, {MAILING_ADDRESS.line2}</span>
                    </li>
                    <li className="flex flex-col sm:flex-row sm:items-start gap-1 sm:gap-0">
                      <span className="font-semibold text-foreground">Text to Give:</span>
                      <span className="sm:ml-1">{otherWaysToGive.textToGive}</span>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* QR Code Section - conditionally rendered */}
      {showQrCode && (
        <section className="py-16 bg-muted">
          <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <GivingQRCode />
            </motion.div>
          </div>
        </section>
      )}

      {/* Where Your Gift Goes Section */}
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
              {giftImpact.headline}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-4">
              {giftImpact.description}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {giftImpact.areas.map((area, index) => (
              <motion.div
                key={area.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full bg-muted border-none shadow-lg text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4">
                      <Heart className="w-6 h-6 text-secondary" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{area.title}</h3>
                    <p className="text-sm text-muted-foreground">{area.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <p className="text-lg text-muted-foreground font-medium">
              {giftImpact.thankYouMessage}
            </p>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-28 bg-muted">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <HelpCircle className="w-10 h-10 text-secondary mx-auto mb-4" />
            <h2 className="font-[Playfair_Display] text-3xl font-bold text-foreground mb-4">
              {faq.headline}
            </h2>
          </motion.div>

          <div className="space-y-6">
            {faq.questions.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              >
                <Card className="bg-card border-none">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-foreground mb-2">{item.question}</h3>
                    <p className="text-muted-foreground">{item.answer}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Scripture Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xl sm:text-2xl text-primary-foreground/90 italic mb-6">
              "{scripture.verse}"
            </p>
            <p className="text-secondary font-semibold">— {scripture.reference}</p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
