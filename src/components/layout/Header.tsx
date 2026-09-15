import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { navigationLinks, churchInfo } from '@/data/church';
import { cn } from '@/lib/utils';

/** Simple cross icon matching the design's style */
function CrossIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 32" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="0" width="4" height="32" rx="1" fill="currentColor" />
      <rect x="2" y="8" width="20" height="4" rx="1" fill="currentColor" />
    </svg>
  );
}

export function Header() {
  const location = useLocation();
  const { isScrolled } = useScrollPosition();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isTransparent = location.pathname === '/' && !isScrolled;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isTransparent
          ? 'bg-transparent'
          : 'bg-brand-cream/95 backdrop-blur-lg border-b border-brand-gold/20 shadow-sm'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5">
            <CrossIcon
              className={cn(
                'w-5 h-7 transition-colors duration-300',
                isTransparent ? 'text-brand-gold' : 'text-brand-gold'
              )}
            />
            <span
              className={cn(
                'font-[Playfair_Display] text-xl lg:text-2xl font-bold transition-colors duration-300',
                isTransparent ? 'text-white' : 'text-brand-navy'
              )}
            >
              {churchInfo.name}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-7">
            {navigationLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  'relative text-sm font-medium tracking-wide transition-colors duration-300 py-1',
                  isTransparent
                    ? 'text-white/90 hover:text-white'
                    : 'text-brand-navy/70 hover:text-brand-navy',
                  location.pathname === link.path &&
                    (isTransparent ? 'text-white' : 'text-brand-gold')
                )}
              >
                {link.name}
                {location.pathname === link.path && (
                  <motion.div
                    layoutId="activeNav"
                    className={cn(
                      'absolute -bottom-0.5 left-0 right-0 h-0.5 rounded-full',
                      isTransparent ? 'bg-brand-gold' : 'bg-brand-gold'
                    )}
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Link to="/visit">
              <Button
                className={cn(
                  'font-semibold rounded-full px-6 transition-all',
                  isTransparent
                    ? 'bg-brand-navy text-white hover:bg-brand-navy/90 border border-white/20'
                    : 'bg-brand-navy text-white hover:bg-brand-navy/90'
                )}
              >
                Plan Your Visit
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className="lg:hidden">
            <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={cn(
                    'size-10',
                    isTransparent && 'text-white hover:bg-white/10'
                  )}
                  aria-label="Open menu"
                >
                  <Menu className="size-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:w-80 bg-brand-cream">
                <div className="flex flex-col h-full">
                  <div className="flex items-center gap-2.5 mb-8">
                    <CrossIcon className="w-5 h-7 text-brand-gold" />
                    <span className="font-[Playfair_Display] text-xl font-bold text-brand-navy">
                      {churchInfo.name}
                    </span>
                  </div>
                  <nav className="flex flex-col gap-1 flex-1">
                    {navigationLinks.map((link, i) => (
                      <motion.div
                        key={link.path}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3, delay: i * 0.05 }}
                      >
                        <Link
                          to={link.path}
                          onClick={() => setMobileMenuOpen(false)}
                          className={cn(
                            'block text-lg font-medium py-3 px-4 rounded-lg transition-all duration-200',
                            location.pathname === link.path
                              ? 'text-brand-gold bg-brand-navy/5'
                              : 'text-brand-navy/80 hover:text-brand-navy hover:bg-brand-navy/5 hover:translate-x-1'
                          )}
                        >
                          {link.name}
                        </Link>
                      </motion.div>
                    ))}
                  </nav>
                  <div className="pt-6 border-t border-brand-gold/20">
                    <Link to="/visit" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full bg-brand-navy text-white hover:bg-brand-navy/90 rounded-full">
                        Plan Your Visit
                      </Button>
                    </Link>
                    <p className="text-sm text-brand-navy/50 text-center mt-4">
                      {churchInfo.serviceTime}
                    </p>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </motion.header>
  );
}
