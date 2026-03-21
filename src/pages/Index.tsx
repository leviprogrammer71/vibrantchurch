import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Clock, Users, Play, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { usePageContent, useGlobalSettings } from '@/hooks/usePageContent';
import { ChurchCenterCalendar } from '@/components/home/ChurchCenterCalendar';
import { YouTubeChannelSection } from '@/components/home/YouTubeChannelSection';

// Default content from siteContent.ts
import {
  heroContent as defaultHeroContent,
  missionContent as defaultMissionContent,
  quickActionCards as defaultQuickActionCards,
  beliefsContent as defaultBeliefsContent,
  serviceInfoContent as defaultServiceInfoContent,
  expectationsContent as defaultExpectationsContent,
  eventsContent as defaultEventsContent,
  watchContent as defaultWatchContent,
  ctaContent as defaultCtaContent,
  siteImages,
} from '@/data/siteContent';

// Define the shape of home page content
interface HomePageContent {
  heroHeadline: string;
  heroHeadlineContinued: string;
  heroChurchName: string;
  heroChurchNameSuffix: string;
  heroSubheadline: string;
  heroSubheadlineSecondLine: string;
  heroCtaButtonText: string;
  missionHeadline: string;
  missionHeadlineHighlight: string;
  missionHeadlineContinued: string;
  missionParagraph: string;
  quickActionCards: Array<{ title: string; description: string; buttonText: string }>;
  beliefsEyebrowText: string;
  beliefsHeadline: string;
  beliefsParagraph: string;
  beliefsButtonText: string;
  serviceTime: string;
  serviceSubtext: string;
  serviceStreetAddress: string;
  serviceCityStateZip: string;
  serviceButtonText: string;
  expectationsSectionTitle: string;
  expectationsSectionSubtitle: string;
  expectationsCards: Array<{ title: string; description: string }>;
  eventsSectionTitle: string;
  eventsSectionSubtitle: string;
  eventsViewAllButtonText: string;
  events: Array<{ id: number; title: string; date: string; time: string; description: string }>;
  watchHeadline: string;
  watchDescription: string;
  watchButtonText: string;
  ctaHeadline: string;
  ctaSubheadline: string;
  ctaButtonText: string;
}

// Build default content object from siteContent.ts
const defaultHomeContent: HomePageContent = {
  heroHeadline: defaultHeroContent.headline,
  heroHeadlineContinued: defaultHeroContent.headlineContinued,
  heroChurchName: defaultHeroContent.churchName,
  heroChurchNameSuffix: defaultHeroContent.churchNameSuffix,
  heroSubheadline: defaultHeroContent.subheadline,
  heroSubheadlineSecondLine: defaultHeroContent.subheadlineSecondLine,
  heroCtaButtonText: defaultHeroContent.ctaButtonText,
  missionHeadline: defaultMissionContent.headline,
  missionHeadlineHighlight: defaultMissionContent.headlineHighlight,
  missionHeadlineContinued: defaultMissionContent.headlineContinued,
  missionParagraph: defaultMissionContent.paragraph,
  quickActionCards: defaultQuickActionCards,
  beliefsEyebrowText: defaultBeliefsContent.eyebrowText,
  beliefsHeadline: defaultBeliefsContent.headline,
  beliefsParagraph: defaultBeliefsContent.paragraph,
  beliefsButtonText: defaultBeliefsContent.buttonText,
  serviceTime: defaultServiceInfoContent.serviceTime,
  serviceSubtext: defaultServiceInfoContent.serviceSubtext,
  serviceStreetAddress: defaultServiceInfoContent.streetAddress,
  serviceCityStateZip: defaultServiceInfoContent.cityStateZip,
  serviceButtonText: defaultServiceInfoContent.buttonText,
  expectationsSectionTitle: defaultExpectationsContent.sectionTitle,
  expectationsSectionSubtitle: defaultExpectationsContent.sectionSubtitle,
  expectationsCards: defaultExpectationsContent.cards,
  eventsSectionTitle: defaultEventsContent.sectionTitle,
  eventsSectionSubtitle: defaultEventsContent.sectionSubtitle,
  eventsViewAllButtonText: defaultEventsContent.viewAllButtonText,
  events: defaultEventsContent.events,
  watchHeadline: defaultWatchContent.headline,
  watchDescription: defaultWatchContent.description,
  watchButtonText: defaultWatchContent.buttonText,
  ctaHeadline: defaultCtaContent.headline,
  ctaSubheadline: defaultCtaContent.subheadline,
  ctaButtonText: defaultCtaContent.buttonText,
};

export default function Index() {
  // Fetch content from database, merged with defaults
  const { content } = usePageContent<HomePageContent>('home', defaultHomeContent);
  
  // Quick action card paths (layout - don't edit these)
  const cardPaths = ["/visit", "/contact", "/ministries"];
  const cardImages = [siteImages.community, siteImages.prayer, siteImages.youth];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={siteImages.hero} 
            alt="Vibrant Hill Church worship service" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[hsl(var(--church-navy))]/90 via-[hsl(var(--church-navy))]/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ duration: 0.8, delay: 0.2 }} 
            className="max-w-2xl"
          >
            <h1 className="font-[Playfair_Display] text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-white mb-4 drop-shadow-lg">
              <span className="italic font-light">{content.heroHeadline}</span> {content.heroHeadlineContinued}<br />
              <span className="text-secondary">{content.heroChurchName}</span><br />
              {content.heroChurchNameSuffix}
            </h1>
            <p className="text-lg sm:text-xl text-white/90 mb-8 max-w-lg drop-shadow-md italic">
              {content.heroSubheadline}<br />
              {content.heroSubheadlineSecondLine}
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.6, delay: 0.6 }} 
            className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block"
          >
            <Link to="/visit">
              <div className="w-32 h-32 rounded-full border-2 border-white/80 flex items-center justify-center cursor-pointer hover:bg-white/10 transition-all group">
                <span className="text-white text-center text-sm font-medium whitespace-pre-line">
                  {content.heroCtaButtonText}
                </span>
              </div>
            </Link>
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.6, delay: 0.8 }} 
          className="absolute bottom-8 left-4 right-4 lg:hidden"
        >
          <Link to="/visit"></Link>
        </motion.div>
      </section>

      {/* Mission Section */}
      <section className="py-20 lg:py-28 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-[Playfair_Display] text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
              {content.missionHeadline}<br />
              a church that <span className="text-secondary">{content.missionHeadlineHighlight}</span> {content.missionHeadlineContinued}
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mx-auto">
              {content.missionParagraph}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Quick Action Cards */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {content.quickActionCards.map((action, index) => (
              <motion.div 
                key={action.title} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link to={cardPaths[index]}>
                  <Card className="h-80 overflow-hidden border-none shadow-xl group cursor-pointer relative">
                    <div className="absolute inset-0">
                      <img 
                        src={cardImages[index]} 
                        alt={action.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/50 to-transparent" />
                    </div>
                    <CardContent className="relative h-full flex flex-col justify-end p-6">
                      <h3 className="text-2xl font-bold text-white mb-2">{action.title}</h3>
                      <p className="text-white/80 text-sm mb-4">{action.description}</p>
                      <span className="text-secondary font-semibold text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                        {action.buttonText}
                        <ChevronRight className="w-4 h-4" />
                      </span>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Beliefs Section */}
      <section className="py-20 lg:py-28 bg-[hsl(var(--church-navy))]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.6 }}
            >
              <span className="text-secondary uppercase tracking-wider text-sm font-semibold mb-4 block">
                {content.beliefsEyebrowText}
              </span>
              <h2 className="font-[Playfair_Display] text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 text-slate-500">
                {content.beliefsHeadline}
              </h2>
              <p className="text-lg mb-8 leading-relaxed text-slate-700 whitespace-pre-line">
                {content.beliefsParagraph}
              </p>
              <Link to="/about">
                <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  {content.beliefsButtonText}
                  <ChevronRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }} 
              transition={{ duration: 0.6, delay: 0.2 }} 
              className="relative"
            >
              <img 
                src={siteImages.worship} 
                alt="Community at Vibrant Hill Church" 
                className="rounded-2xl shadow-2xl w-full" 
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Service Info Strip */}
      <section className="py-12 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <Clock className="w-8 h-8 text-secondary-foreground" />
              <div>
                <p className="text-secondary-foreground font-bold text-xl">{content.serviceTime}</p>
                <p className="text-secondary-foreground/80">{content.serviceSubtext}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="w-8 h-8 text-secondary-foreground" />
              <div>
                <p className="text-secondary-foreground font-bold">{content.serviceStreetAddress}</p>
                <p className="text-secondary-foreground/80">{content.serviceCityStateZip}</p>
              </div>
            </div>
            <Link to="/visit">
              <Button size="lg" variant="outline" className="border-secondary-foreground text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary">
                {content.serviceButtonText}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* What to Expect Section */}
      <section className="py-20 lg:py-28 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6 }} 
            className="text-center mb-16"
          >
            <h2 className="font-[Playfair_Display] text-3xl sm:text-4xl font-bold text-foreground mb-4">
              {content.expectationsSectionTitle}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {content.expectationsSectionSubtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {content.expectationsCards.map((item, index) => (
              <motion.div 
                key={item.title} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="h-full bg-card border-none shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                      <Users className="w-6 h-6 text-secondary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events - Church Center Calendar Embed */}
      <ChurchCenterCalendar />

      {/* Watch Our Messages - YouTube Channel Embed */}
      <YouTubeChannelSection />

      {/* Final CTA Section */}
      <section className="relative py-32 lg:py-40">
        <div className="absolute inset-0">
          <img 
            src={siteImages.community} 
            alt="Vibrant Hill Church community" 
            className="w-full h-full object-cover" 
          />
          <div className="absolute inset-0 bg-primary/80" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            whileInView={{ opacity: 1, y: 0 }} 
            viewport={{ once: true }} 
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-[Playfair_Display] text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              {content.ctaHeadline}
            </h2>
            <p className="text-xl text-white/90 mb-10 max-w-2xl mx-auto">
              {content.ctaSubheadline}
            </p>
            <Link to="/visit">
              <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-lg px-10 py-6">
                {content.ctaButtonText}
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
