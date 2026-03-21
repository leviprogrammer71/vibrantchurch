import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Megaphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAnnouncement } from '@/hooks/usePageContent';
import { useState } from 'react';

export function AnnouncementBar() {
  const { announcement, isActive, isLoading } = useAnnouncement();
  const [isDismissed, setIsDismissed] = useState(false);

  // Don't render if not active, loading, or dismissed
  if (isLoading || !isActive || isDismissed || !announcement.message) {
    return null;
  }

  const colorThemeClasses = {
    primary: 'bg-primary text-primary-foreground',
    secondary: 'bg-secondary text-secondary-foreground',
    accent: 'bg-accent text-accent-foreground',
  };

  const themeClass = colorThemeClasses[announcement.colorTheme] || colorThemeClasses.secondary;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: 'auto', opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className={`${themeClass} relative z-50`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-center gap-4">
            <Megaphone className="w-5 h-5 shrink-0 hidden sm:block" />
            <p className="text-sm font-medium text-center">
              {announcement.message}
            </p>
            {announcement.buttonText && announcement.buttonLink && (
              <Link to={announcement.buttonLink}>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-current text-current hover:bg-current/10 shrink-0"
                >
                  {announcement.buttonText}
                </Button>
              </Link>
            )}
            <button
              onClick={() => setIsDismissed(true)}
              className="p-1 rounded-full hover:bg-current/10 transition-colors shrink-0 ml-2"
              aria-label="Dismiss announcement"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
