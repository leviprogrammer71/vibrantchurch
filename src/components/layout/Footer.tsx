import { Link } from 'react-router-dom';
import { Facebook, Instagram, Youtube } from 'lucide-react';
import { churchInfo, navigationLinks, footerTagline } from '@/data/church';

function CrossIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 32" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="10" y="0" width="4" height="32" rx="1" fill="currentColor" />
      <rect x="2" y="8" width="20" height="4" rx="1" fill="currentColor" />
    </svg>
  );
}

export function Footer() {
  const quickLinks = navigationLinks.filter((l) => ['/', '/visit', '/about', '/watch', '/events', '/give', '/contact'].includes(l.path));

  return (
    <footer className="bg-brand-navy text-white">
      {/* Welcome CTA Bar */}
      <div
        className="relative bg-cover bg-center"
        style={{ backgroundImage: "url('/images/elements/bg3.png')" }}
      >
        <div className="bg-brand-cream/90 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <h3 className="font-[Playfair_Display] text-3xl sm:text-4xl font-bold text-brand-navy mb-2">
                  We'd love to welcome you!
                </h3>
                <p className="text-brand-navy/70">{churchInfo.serviceTime}</p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-6 text-center">
                <div className="flex items-start gap-2">
                  <svg className="w-5 h-5 mt-0.5 text-brand-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  <div className="text-left">
                    <p className="font-medium text-brand-navy">{churchInfo.address}</p>
                    <p className="text-brand-navy/70 text-sm">{churchInfo.city}, {churchInfo.state} {churchInfo.zip}</p>
                  </div>
                </div>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(churchInfo.fullAddress)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 border-2 border-brand-navy text-brand-navy rounded-full font-semibold hover:bg-brand-navy hover:text-white transition-colors text-sm"
                >
                  Get Directions
                </a>
              </div>
              <p className="font-[Caveat] text-2xl text-brand-gold italic">
                Come as you are.<br />You belong here.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Church Info */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <CrossIcon className="w-4 h-6 text-brand-gold" />
              <h3 className="font-[Playfair_Display] text-xl font-bold">{churchInfo.name}</h3>
            </div>
            <p className="text-white/60 text-sm uppercase tracking-widest mb-6">
              {footerTagline}
            </p>
            <div className="flex gap-3">
              <a
                href={churchInfo.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={churchInfo.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={churchInfo.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
                aria-label="YouTube"
              >
                <Youtube className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-brand-gold mb-5">
              Quick Links
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-white/70 hover:text-white transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-brand-gold mb-5">
              Connect
            </h4>
            <ul className="space-y-2.5 text-sm text-white/70">
              <li>
                <a href={`tel:${churchInfo.phone}`} className="hover:text-white transition-colors">
                  {churchInfo.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${churchInfo.email}`} className="hover:text-white transition-colors">
                  {churchInfo.email}
                </a>
              </li>
              <li>{churchInfo.address}</li>
              <li>{churchInfo.city}, {churchInfo.state} {churchInfo.zip}</li>
            </ul>
          </div>

          {/* Service Times */}
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-widest text-brand-gold mb-5">
              Join Us
            </h4>
            <p className="text-white/70 text-sm mb-2">{churchInfo.serviceTime}</p>
            <p className="text-white/70 text-sm mb-6">Join us for uplifting worship, practical teaching, and encouraging community.</p>
            <Link
              to="/visit"
              className="inline-flex items-center gap-2 px-5 py-2 bg-brand-gold text-brand-navy rounded-full font-semibold text-sm hover:bg-brand-gold/90 transition-colors"
            >
              Plan Your Visit
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-white/40">
            <p>&copy; {new Date().getFullYear()} {churchInfo.name}. All rights reserved.</p>
            <Link to="/staff" className="hover:text-white/60 transition-colors">
              Staff Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
