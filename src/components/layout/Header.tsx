import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollPosition } from '@/hooks/useScrollPosition';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { navigationLinks, churchInfo } from '@/data/church';
import { cn } from '@/lib/utils';

/**
 * Church header with scroll-aware styling and mobile navigation
 */
export function Header() {
  const location = useLocation();
  const { isScrolled } = useScrollPosition();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const isTransparent = location.pathname === '/' && !isScrolled;

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        isTransparent
          ? 'bg-transparent'
          : 'bg-card/95 backdrop-blur-lg border-b border-border shadow-sm'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2"
          >
            <motion.span
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className={cn(
                'font-[Playfair_Display] text-xl lg:text-2xl font-bold transition-colors duration-300',
                isTransparent
                  ? 'text-white'
                  : 'text-primary'
              )}
            >
              {churchInfo.name}
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navigationLinks.map((link, index) => (
              <motion.div
                key={link.path}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.05 * index }}
              >
                <Link
                  to={link.path}
                  className={cn(
                    'relative text-sm font-medium tracking-wide transition-colors duration-300',
                    isTransparent
                      ? 'text-white/90 hover:text-white'
                      : 'text-foreground/80 hover:text-foreground',
                    location.pathname === link.path && (isTransparent ? 'text-white' : 'text-primary')
                  )}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <motion.div
                      layoutId="activeNav"
                      className={cn(
                        'absolute -bottom-1 left-0 right-0 h-0.5',
                        isTransparent ? 'bg-secondary' : 'bg-primary'
                      )}
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              </motion.div>
            ))}
          </nav>

          {/* Desktop CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="hidden lg:block"
          >
            <Link to="/visit">
              <Button 
                className={cn(
                  'font-semibold transition-all',
                  isTransparent 
                    ? 'bg-secondary text-secondary-foreground hover:bg-secondary/90' 
                    : 'bg-primary text-primary-foreground hover:bg-primary/90'
                )}
              >
                Plan Your Visit
              </Button>
            </Link>
          </motion.div>

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
              <SheetContent side="right" className="w-full sm:w-80 bg-card">
                <div className="flex flex-col h-full">
                  <div className="flex items-center justify-between mb-8">
                    <span className="font-[Playfair_Display] text-xl font-bold text-primary">
                      {churchInfo.name}
                    </span>
                  </div>
                  <nav className="flex flex-col gap-4 flex-1">
                    {navigationLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        onClick={() => setMobileMenuOpen(false)}
                        className={cn(
                          'text-lg font-medium py-2 border-b border-border/50 transition-colors',
                          location.pathname === link.path 
                            ? 'text-primary' 
                            : 'text-foreground/80 hover:text-foreground'
                        )}
                      >
                        {link.name}
                      </Link>
                    ))}
                  </nav>
                  <div className="pt-6 border-t border-border">
                    <Link to="/visit" onClick={() => setMobileMenuOpen(false)}>
                      <Button className="w-full bg-primary text-primary-foreground">
                        Plan Your Visit
                      </Button>
                    </Link>
                    <p className="text-sm text-muted-foreground text-center mt-4">
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
