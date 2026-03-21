import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube, MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

// =====================================================
// 📝 EDITABLE CONTENT - All text comes from siteContent.ts
// To edit footer content: Open src/data/siteContent.ts → footerContent
// =====================================================
import { footerContent, navigationLinks } from '@/data/siteContent';

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer - LAYOUT LOCKED */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Church Info */}
          <div className="lg:col-span-1">
            <h3 className="font-[Playfair_Display] text-2xl font-bold mb-4">
              {footerContent.churchName}
            </h3>
            <p className="text-primary-foreground/80 mb-6">
              {footerContent.missionStatement}
            </p>
            <div className="flex gap-4">
              <a 
                href={footerContent.socialLinks.facebook} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a 
                href={footerContent.socialLinks.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href={footerContent.socialLinks.youtube} 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links - NAVIGATION LOCKED */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {navigationLinks.slice(0, 5).map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path}
                    className="text-primary-foreground/80 hover:text-primary-foreground transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Times & Location */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Join Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Clock className="w-5 h-5 mt-0.5 text-secondary" />
                <div>
                  <p className="font-medium">{footerContent.serviceTimeLabel}</p>
                  <p className="text-primary-foreground/80">{footerContent.serviceTime}</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 text-secondary" />
                <div>
                  <p className="font-medium">{footerContent.locationLabel}</p>
                  <p className="text-primary-foreground/80">{footerContent.streetAddress}</p>
                  <p className="text-primary-foreground/80">{footerContent.cityStateZip}</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Contact & Give */}
          <div>
            <h4 className="font-semibold text-lg mb-4">{footerContent.contactLabel}</h4>
            <ul className="space-y-3 mb-6">
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-secondary" />
                <a href={`tel:${footerContent.phone}`} className="text-primary-foreground/80 hover:text-primary-foreground">
                  {footerContent.phone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-secondary" />
                <a href={`mailto:${footerContent.email}`} className="text-primary-foreground/80 hover:text-primary-foreground">
                  {footerContent.email}
                </a>
              </li>
            </ul>
            <Link to="/give">
              <Button className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold">
                Give Online
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar - LAYOUT LOCKED */}
      <div className="border-t border-primary-foreground/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <p className="text-sm text-primary-foreground/80 mb-1">{footerContent.tagline}</p>
              <p className="text-sm text-primary-foreground/60">
                © {new Date().getFullYear()} {footerContent.churchName}. {footerContent.copyrightText}
              </p>
            </div>
            <div className="flex items-center gap-6 text-sm text-primary-foreground/60">
              <Link to="/contact" className="hover:text-primary-foreground transition-colors">
                Contact
              </Link>
              <Link to="/visit" className="hover:text-primary-foreground transition-colors">
                Visit
              </Link>
              <Link to="/staff" className="hover:text-primary-foreground transition-colors">
                Admin
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
