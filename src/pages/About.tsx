import { motion } from 'framer-motion';
import { Heart, Users, HandHeart, Star, BookOpen, Crown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { usePageContent } from '@/hooks/usePageContent';
import samyKengelaImage from '@/assets/samy-kengela.png';

// Default content from siteContent.ts
import { aboutPageContent as defaultAboutContent, siteImages } from '@/data/siteContent';

const valueIcons = [Heart, Users, HandHeart, Star, BookOpen];

interface LeaderProfile {
  name: string;
  role: string;
  bio: string;
}

interface AboutPageContent {
  hero: { title: string; description: string };
  whoWeAre: { eyebrowText: string; headline: string; paragraphs: string[] };
  vision: { headline: string; statement: string };
  values: { eyebrowText: string; headline: string; items: Array<{ title: string; description: string }> };
  beliefs: { headline: string; intro: string; items: string[] };
  leadership: {
    eyebrowText: string;
    headline: string;
    description: string;
    seniorPastor?: LeaderProfile;
    overseer?: LeaderProfile;
    team: LeaderProfile[];
  };
}

export default function About() {
  const { content } = usePageContent<AboutPageContent>('about', defaultAboutContent as AboutPageContent);
  
  const { hero, whoWeAre, vision, values, beliefs, leadership } = content;

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src={siteImages.community} 
            alt="Vibrant Church community"
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

      {/* Who We Are Section */}
      <section className="py-20 lg:py-28 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
                {whoWeAre.eyebrowText}
              </span>
              <h2 className="font-[Playfair_Display] text-3xl sm:text-4xl font-bold text-foreground mt-2 mb-6">
                {whoWeAre.headline}
              </h2>
              <div className="prose prose-lg text-muted-foreground">
                {whoWeAre.paragraphs.map((paragraph, index) => (
                  <p key={index} className="mb-4">{paragraph}</p>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <img 
                src={siteImages.prayer} 
                alt="Community at Vibrant Church"
                className="rounded-2xl shadow-2xl w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Heart className="w-12 h-12 text-secondary mx-auto mb-6" />
            <h2 className="font-[Playfair_Display] text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">
              {vision.headline}
            </h2>
            <p className="text-xl sm:text-2xl text-primary-foreground/90 leading-relaxed">
              "{vision.statement}"
            </p>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 lg:py-28 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
              {values.eyebrowText}
            </span>
            <h2 className="font-[Playfair_Display] text-3xl sm:text-4xl font-bold text-foreground mt-2 mb-6">
              {values.headline}
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.items.map((value, index) => {
              const Icon = valueIcons[index % valueIcons.length];
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full bg-card border-none shadow-lg hover:shadow-xl transition-shadow">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-secondary" />
                      </div>
                      <h3 className="text-xl font-semibold text-foreground mb-2">{value.title}</h3>
                      <p className="text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Beliefs Section */}
      <section className="py-20 lg:py-28 bg-card">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <BookOpen className="w-12 h-12 text-secondary mx-auto mb-6" />
            <h2 className="font-[Playfair_Display] text-3xl sm:text-4xl font-bold text-foreground mb-4">
              {beliefs.headline}
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="bg-muted border-none">
              <CardContent className="p-8">
                <p className="text-lg text-foreground mb-6 font-medium">{beliefs.intro}</p>
                <ul className="space-y-4">
                  {beliefs.items.map((belief, index) => (
                    <li key={index} className="flex items-start gap-3 text-muted-foreground">
                      <div className="w-2 h-2 rounded-full bg-secondary mt-2.5 shrink-0" />
                      <span className="text-lg">{belief}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Leadership Section */}
      <section className="py-20 lg:py-28 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
              {leadership.eyebrowText}
            </span>
            <h2 className="font-[Playfair_Display] text-3xl sm:text-4xl font-bold text-foreground mt-2 mb-6">
              {leadership.headline}
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              {leadership.description}
            </p>
          </motion.div>

          {/* Senior Pastor - Featured */}
          {leadership.seniorPastor && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="mb-12"
            >
              <Card className="overflow-hidden bg-card border-2 border-secondary/30 shadow-xl max-w-2xl mx-auto">
                <div className="flex flex-col md:flex-row">
                  <div className="aspect-square md:w-64 overflow-hidden bg-primary/10">
                    <img 
                      src={samyKengelaImage} 
                      alt={leadership.seniorPastor.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-6 flex-1 flex flex-col justify-center">
                    <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm font-medium mb-3 w-fit">
                      <Crown className="w-4 h-4" />
                      {leadership.seniorPastor.role}
                    </div>
                    <h3 className="text-2xl font-semibold text-foreground mb-2">
                      {leadership.seniorPastor.name}
                    </h3>
                    <p className="text-muted-foreground">{leadership.seniorPastor.bio}</p>
                  </CardContent>
                </div>
              </Card>
            </motion.div>
          )}

          {/* Overseer */}
          {leadership.overseer && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-12"
            >
              <Card className="overflow-hidden bg-card border-none shadow-lg max-w-lg mx-auto">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <Users className="w-8 h-8 text-primary/50" />
                  </div>
                  <p className="text-secondary font-medium text-sm mb-1">{leadership.overseer.role}</p>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{leadership.overseer.name}</h3>
                  <p className="text-muted-foreground text-sm">{leadership.overseer.bio}</p>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Leadership Team */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {leadership.team.map((leader, index) => (
              <motion.div
                key={leader.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              >
                <Card className="overflow-hidden bg-card border-none shadow-lg hover:shadow-xl transition-shadow h-full">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center mb-4">
                      <Users className="w-6 h-6 text-secondary" />
                    </div>
                    <h3 className="text-xl font-semibold text-foreground mb-1">{leader.name}</h3>
                    <p className="text-secondary font-medium text-sm mb-3">{leader.role}</p>
                    <p className="text-muted-foreground text-sm">{leader.bio}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
