import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, RefreshCw, Loader2, AlertCircle, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { format, parseISO } from 'date-fns';
import { useCalendarEvents, CalendarEvent } from '@/hooks/useCalendarEvents';
import { churchInfo } from '@/data/siteContent';

const ICAL_SUBSCRIBE_URL = 'https://calendar.planningcenteronline.com/icals/eJxj4ajmsGLLz2S2qGKy4kotzi8oqWa3YivNZK74F2rFXlbiqcSXmJMTX5KZm1rMZsXmGmLFXZBYlJhbXM0AAPp-Eb0=b48e8d23ef3bd2a71b1591bd7a23bd838c5b0161';

function formatEventDate(event: CalendarEvent): string {
  const date = parseISO(event.startDate);
  return format(date, 'EEEE, MMMM d, yyyy');
}

function formatEventTime(event: CalendarEvent): string {
  if (event.allDay) {
    return 'All Day';
  }
  const startDate = parseISO(event.startDate);
  const endDate = event.endDate ? parseISO(event.endDate) : null;
  
  if (endDate) {
    return `${format(startDate, 'h:mm a')} - ${format(endDate, 'h:mm a')}`;
  }
  return format(startDate, 'h:mm a');
}

function formatEventDateParts(event: CalendarEvent): { day: string; month: string } {
  const date = parseISO(event.startDate);
  return {
    day: format(date, 'd'),
    month: format(date, 'MMM'),
  };
}

export default function Events() {
  const { data, isLoading, error } = useCalendarEvents();
  const events = data?.events?.slice(0, 30) || []; // Show up to 30 events

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
            <Calendar className="w-12 h-12 text-secondary mb-6" />
            <h1 className="font-[Playfair_Display] text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-6">
              Events & Gatherings
            </h1>
            <p className="text-xl text-white/90 leading-relaxed mb-8">
              Stay connected with everything happening at Vibrant Church! From worship nights and Bible studies to community outreach and special services.
            </p>
            <a href={ICAL_SUBSCRIBE_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                <ExternalLink className="w-5 h-5 mr-2" />
                Subscribe to Calendar
              </Button>
            </a>
          </motion.div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-20 lg:py-28 bg-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full mb-6">
              <RefreshCw className="w-5 h-5" />
              <span className="font-medium">Auto-Updated Every 30 Minutes</span>
            </div>
            <h2 className="font-[Playfair_Display] text-3xl sm:text-4xl font-bold text-foreground mb-4">
              Upcoming Events
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              All our upcoming events and gatherings, synced directly from our church calendar.
            </p>
          </motion.div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex flex-col items-center justify-center py-16">
              <Loader2 className="w-12 h-12 text-secondary animate-spin mb-4" />
              <p className="text-muted-foreground">Loading events...</p>
            </div>
          )}

          {/* Error/Fallback State */}
          {error && !isLoading && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <Calendar className="w-12 h-12 text-secondary mb-4" />
              <p className="text-lg text-foreground font-medium mb-2">Events are updating—please check back soon</p>
              <p className="text-muted-foreground mb-6">
                In the meantime, join us for worship on Sundays at 10:00 AM at Vibrant Church.
              </p>
              <a href={ICAL_SUBSCRIBE_URL} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  <ExternalLink className="w-5 h-5 mr-2" />
                  Subscribe to Calendar
                </Button>
              </a>
            </div>
          )}

          {/* Empty State */}
          {!isLoading && !error && events.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16">
              <Calendar className="w-12 h-12 text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">No upcoming events scheduled.</p>
              <p className="text-sm text-muted-foreground mt-2">Check back soon for new events!</p>
            </div>
          )}

          {/* Events List */}
          {!isLoading && !error && events.length > 0 && (
            <div className="space-y-6">
              {events.map((event, index) => {
                const dateParts = formatEventDateParts(event);
                return (
                  <motion.div
                    key={event.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: Math.min(index * 0.05, 0.5) }}
                  >
                    <Card className="overflow-hidden bg-card border-none shadow-lg hover:shadow-xl transition-shadow">
                      <CardContent className="p-0">
                        <div className="flex flex-col md:flex-row">
                          <div className="bg-primary text-primary-foreground p-6 md:w-48 flex flex-col items-center justify-center text-center">
                            <span className="text-3xl font-bold text-secondary">
                              {dateParts.day}
                            </span>
                            <span className="text-sm uppercase tracking-wider">
                              {dateParts.month}
                            </span>
                          </div>
                          <div className="p-6 flex-1">
                            <h3 className="text-xl font-semibold text-foreground mb-2">{event.title}</h3>
                            <div className="flex flex-wrap gap-4 mb-3">
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Calendar className="w-4 h-4 text-secondary" />
                                {formatEventDate(event)}
                              </div>
                              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Clock className="w-4 h-4 text-secondary" />
                                {formatEventTime(event)}
                              </div>
                              {event.location && (
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                  <MapPin className="w-4 h-4 text-secondary" />
                                  {event.location}
                                </div>
                              )}
                            </div>
                            {event.description && (
                              <p className="text-muted-foreground line-clamp-2">{event.description}</p>
                            )}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Subscribe Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <a href={ICAL_SUBSCRIBE_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                <ExternalLink className="w-5 h-5 mr-2" />
                Subscribe to Calendar
              </Button>
            </a>
          </motion.div>

          {/* Last Updated */}
          {data?.lastUpdated && (
            <p className="text-center text-sm text-muted-foreground mt-8">
              Last updated: {format(parseISO(data.lastUpdated), 'MMM d, yyyy h:mm a')}
            </p>
          )}
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
              Have Questions About an Event?
            </h2>
            <p className="text-xl text-primary-foreground/90 mb-4 max-w-2xl mx-auto">
              We'd love to hear from you! Reach out to learn more about any of our events or gatherings.
            </p>
            <p className="text-lg text-secondary font-semibold mb-8">
              {churchInfo.phone}
            </p>
            <Link to="/contact">
              <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                Contact Us
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
