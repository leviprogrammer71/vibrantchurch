import { motion } from 'framer-motion';
import { Calendar, ExternalLink, Clock, Repeat, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const CHURCH_CENTER_URL = 'https://vibrant-church-506100.churchcenter.com/calendar?view=list';

// Real events from the Church Center calendar
const calendarEvents = [
  {
    id: 1,
    title: 'Youth Group Meeting',
    date: 'Mar 27, 2026',
    recurring: true,
    featured: true,
  },
  {
    id: 2,
    title: 'Day of Prayer and Fast',
    date: 'Mar 28, 2026',
    recurring: false,
    featured: true,
  },
  {
    id: 3,
    title: 'Prayer & Worship Sunday & Communion',
    date: 'Mar 29, 2026',
    recurring: true,
    featured: true,
  },
  {
    id: 4,
    title: 'Sunday Celebration Service',
    date: 'Mar 29, 2026',
    recurring: true,
    featured: true,
  },
  {
    id: 5,
    title: 'Communion Sunday',
    date: 'Mar 29, 2026',
    recurring: false,
    featured: true,
  },
  {
    id: 6,
    title: 'Strick & Elizabeth Life Group',
    date: 'Apr 1, 2026',
    recurring: true,
    featured: true,
  },
  {
    id: 7,
    title: 'Craig & Denise Life Group',
    date: 'Apr 1, 2026',
    recurring: true,
    featured: true,
  },
  {
    id: 8,
    title: 'Junior & Lisa Life Group Meeting',
    date: 'Apr 1, 2026',
    recurring: true,
    featured: true,
  },
  {
    id: 9,
    title: 'Seder Meal',
    date: 'Apr 3, 2026',
    recurring: false,
    featured: true,
  },
  {
    id: 10,
    title: 'Samy Kengela Preacher',
    date: 'Apr 5, 2026',
    recurring: false,
    featured: true,
  },
  {
    id: 11,
    title: 'Nelson & Sue Life Group',
    date: 'Apr 7, 2026',
    recurring: true,
    featured: true,
  },
];

export function ChurchCenterCalendar() {
  return (
    <section className="py-20 lg:py-28 bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <Calendar className="w-12 h-12 text-secondary mx-auto mb-6" />
          <h2 className="font-[Playfair_Display] text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Upcoming Events
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join us for worship, life groups, and community events
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {/* Event cards grid */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-10">
            {calendarEvents.slice(0, 6).map((event, idx) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * idx }}
              >
                <Card className="h-full bg-background border border-border shadow-md hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-3">
                      {event.recurring ? (
                        <Repeat className="w-5 h-5 text-secondary" />
                      ) : (
                        <Calendar className="w-5 h-5 text-secondary" />
                      )}
                      {event.recurring && (
                        <span className="text-xs bg-secondary/10 text-secondary px-2 py-0.5 rounded-full font-medium">
                          Recurring
                        </span>
                      )}
                      {event.featured && (
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{event.title}</h3>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="w-4 h-4 flex-shrink-0" />
                      {event.date}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* More events list */}
          {calendarEvents.length > 6 && (
            <div className="mb-10 rounded-xl border border-border bg-background shadow-md overflow-hidden">
              <div className="px-6 py-4 bg-muted/50 border-b border-border">
                <h3 className="font-semibold text-foreground">More Upcoming Events</h3>
              </div>
              <div className="divide-y divide-border">
                {calendarEvents.slice(6).map((event) => (
                  <div key={event.id} className="px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {event.recurring ? (
                        <Repeat className="w-4 h-4 text-secondary flex-shrink-0" />
                      ) : (
                        <Calendar className="w-4 h-4 text-secondary flex-shrink-0" />
                      )}
                      <span className="font-medium text-foreground">{event.title}</span>
                    </div>
                    <span className="text-sm text-muted-foreground whitespace-nowrap ml-4">{event.date}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Link to full calendar */}
          <div className="text-center rounded-xl border border-border bg-background p-8 shadow-md">
            <Calendar className="w-10 h-10 text-secondary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              View Our Full Calendar
            </h3>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              See all upcoming services, life groups, community events, and special programs on our Church Center calendar.
            </p>
            <a href={CHURCH_CENTER_URL} target="_blank" rel="noopener noreferrer">
              <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90">
                <ExternalLink className="w-5 h-5 mr-2" />
                Open Events Calendar
              </Button>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
