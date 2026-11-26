import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { BrandLogo } from './BrandLogo';
import { CRM_PRODUCTS, NAV_ITEMS, SITE_INFO } from '../data/content';

function SocialIcon({ id }: { id: 'linkedin' | 'instagram' | 'youtube' | 'x' }) {
  switch (id) {
    case 'linkedin':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z" />
        </svg>
      );
    case 'instagram':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
          <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
          <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
          <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
        </svg>
      );
    case 'youtube':
      return (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
        </svg>
      );
    case 'x':
      return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
        </svg>
      );
  }
}

export function Footer() {
  return (
    <footer className="border-t border-[#EDE9FE] bg-[#FAF8FF] text-[#475569]">
      <div className="mx-auto max-w-7xl px-4 py-10 sm:py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-12">
          {/* Column 1: Brand & Blurb */}
          <div className="lg:col-span-4 space-y-4">
            <Link to="/" aria-label="bestCRM Home" className="inline-block">
              <BrandLogo />
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-[#475569]">
              {SITE_INFO.blurb}
            </p>
            <div className="flex items-center gap-2.5 pt-1">
              {SITE_INFO.socials.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Follow bestCRM on ${social.name}`}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-[#DDD6FE] bg-white text-[#5B21B6] transition hover:bg-[#5B21B6] hover:text-white"
                >
                  <SocialIcon id={social.id} />
                </a>
              ))}
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2">
            <h2 className="text-sm font-bold text-[#1E1B4B]">Quick Links</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {NAV_ITEMS.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="text-[#475569] hover:text-[#5B21B6] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/download"
                  className="font-medium text-[#5B21B6] hover:text-[#4C1D95] transition-colors"
                >
                  Download App
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Industry CRMs */}
          <div className="lg:col-span-3">
            <h2 className="text-sm font-bold text-[#1E1B4B]">Ready-Made CRMs</h2>
            <ul className="mt-4 space-y-2.5 text-sm">
              {CRM_PRODUCTS.map((crm) => (
                <li key={crm.id}>
                  <Link
                    to={`/crms/${crm.id}`}
                    className="text-[#475569] hover:text-[#5B21B6] transition-colors"
                  >
                    {crm.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Contact Details */}
          <div className="lg:col-span-3">
            <h2 className="text-sm font-bold text-[#1E1B4B]">Contact Details</h2>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-start gap-2.5">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-[#7C3AED]" aria-hidden="true" />
                <a
                  href={SITE_INFO.contact.phoneHref}
                  className="hover:text-[#5B21B6] tabular-nums"
                >
                  {SITE_INFO.contact.phoneDisplay}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[#7C3AED]" aria-hidden="true" />
                <a
                  href={`mailto:${SITE_INFO.contact.email}`}
                  className="hover:text-[#5B21B6]"
                >
                  {SITE_INFO.contact.email}
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#7C3AED]" aria-hidden="true" />
                <span>{SITE_INFO.contact.address}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-[#7C3AED]" aria-hidden="true" />
                <span>{SITE_INFO.contact.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#E9D5FF] pt-7 text-xs text-[#64748B] sm:flex-row">
          <p>{SITE_INFO.copyright}</p>
          <div className="flex items-center gap-6">
            <Link to="/privacy-policy" className="hover:text-[#5B21B6] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-[#5B21B6] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
