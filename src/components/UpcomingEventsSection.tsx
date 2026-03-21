import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, RefreshCw, Loader2, ChevronRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCalendarEvents, CalendarEvent } from '@/hooks/useCalendarEvents';
import { format, parseISO } from 'date-fns';

const ICAL_SUBSCRIBE_URL = 'https://calendar.planningcenteronline.com/icals/eJxj4ajmsGLLz2S2qGKy4kotzi8oqWa3YivNZK74F2rFXlbiqcSXmJMTX5KZm1rMZsXmGmLFXZBYlJhbXM0AAPp-Eb0=b48e8d23ef3bd2a71b1591bd7a23bd838c5b0161';

interface UpcomingEventsSectionProps {
  maxEvents?: number;
  showViewAll?: boolean;
  compact?: boolean;
}

function formatEventTime(event: CalendarEvent): string {
  if (event.allDay) return 'All Day';
  const startDate = parseISO(event.startDate);
  const endDate = event.endDate ? parseISO(event.endDate) : null;
  
  if (endDate) {
    return `${format(startDate, 'h:mm a')} - ${format(endDate, 'h:mm a')}`;
  }
  return format(startDate, 'h:mm a');
}

export function UpcomingEventsSection({ maxEvents = 3, showViewAll = true, compact = false }: UpcomingEventsSectionProps) {
  const { data, isLoading, error } = useCalendarEvents();
  const events = data?.events?.slice(0, maxEvents) || [];

  return (
    <section className={`${compact ? 'py-12' : 'py-20 lg:py-28'} bg-card`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          {!compact && (
            <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full mb-6">
              <RefreshCw className="w-5 h-5" />
              <span className="font-medium">Auto-Updated from Church Calendar</span>
            </div>
          )}
          <Calendar className="w-12 h-12 text-secondary mx-auto mb-6" />
          <h2 className="font-[Playfair_Display] text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Upcoming Events
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Stay connected with everything happening at Vibrant Church.
          </p>
        </motion.div>

        {/* Loading State */}
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-16">
            <Loader2 className="w-12 h-12 text-secondary animate-spin mb-4" />
            <p className="text-muted-foreground">Loading events...</p>
          </div>
        )}

        {/* Error/Fallback State - Show service info when calendar unavailable */}
        {error && !isLoading && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Calendar className="w-12 h-12 text-secondary mb-4" />
            <p className="text-lg text-foreground font-medium mb-2">Events are updating—please check back soon</p>
            <p className="text-muted-foreground mb-4">In the meantime, join us for worship:</p>
            <Card className="bg-primary text-primary-foreground border-none max-w-sm">
              <CardContent className="p-6 text-center">
                <p className="text-xl font-bold text-secondary mb-2">Sundays at 10:00 AM</p>
                <p className="text-primary-foreground/80">113 Conestoga Street</p>
                <p className="text-primary-foreground/80">Terre Hill, PA 17581</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && !error && events.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16">
            <Calendar className="w-12 h-12 text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground">No upcoming events scheduled.</p>
          </div>
        )}

        {/* Events Grid */}
        {!isLoading && !error && events.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event, index) => {
              const eventDate = parseISO(event.startDate);
              return (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full border-border hover:border-secondary/50 transition-colors">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="bg-primary text-primary-foreground p-3 rounded-lg text-center min-w-[60px]">
                          <span className="block text-2xl font-bold text-secondary">
                            {format(eventDate, 'd')}
                          </span>
                          <span className="block text-xs uppercase tracking-wider">
                            {format(eventDate, 'MMM')}
                          </span>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground mb-1">{event.title}</h3>
                          <div className="flex items-center gap-1 text-sm text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            {formatEventTime(event)}
                          </div>
                        </div>
                      </div>
                      {event.location && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="w-4 h-4 text-secondary" />
                          {event.location}
                        </div>
                      )}
                      {/* PRIVACY: Description intentionally not displayed to prevent 
                          leakage of private notes or internal details */}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-12"
        >
          {showViewAll && (
            <Link to="/events">
              <Button variant="outline" size="lg">
                View All Events
                <ChevronRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          )}
          <a href={ICAL_SUBSCRIBE_URL} target="_blank" rel="noopener noreferrer">
            <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
              <ExternalLink className="w-5 h-5 mr-2" />
              Subscribe to Calendar
            </Button>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
