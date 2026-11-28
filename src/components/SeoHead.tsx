import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CRM_PRODUCTS, PAGE_SEO } from '../data/content';

export function SeoHead() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    // Clean trailing slashes
    const cleanPath = pathname.length > 1 ? pathname.replace(/\/+$/, '') : pathname;

    let meta = PAGE_SEO[cleanPath];

    // 1. Standalone CRM routes check
    if (!meta) {
      if (cleanPath === '/catering-crm') {
        meta = {
          title: 'Catering CRM — Functions, Menu & Plate Schedule | bestCRM',
          description: 'Catering management system for wedding orders, plate counts, muhurtham schedules, menu packages, and client contracts.',
        };
      } else if (cleanPath === '/hostel-crm') {
        meta = {
          title: 'Hostel CRM — Rooms, Beds & Resident Operations | bestCRM',
          description: 'Hostel and PG management workspace for room allocations, bed occupancy, rent collection, and student complaints.',
        };
      } else if (cleanPath === '/hotel-crm') {
        meta = {
          title: 'Hotel CRM — Front Desk, Check-In & Guest Folios | bestCRM',
          description: 'Hotel management software for room inventory, express guest check-ins, tariffs, and restaurant billing.',
        };
      } else if (cleanPath === '/karampodi-crm' || cleanPath === '/karam-podi-crm') {
        meta = {
          title: 'Karam Podi CRM — Roasting Batches & Milling Moisture Log | bestCRM',
          description: 'Artisanal spice and gunpowder podi batch tracking, roasting temperature logs, moisture QA, and distributor orders.',
        };
      } else if (cleanPath === '/picklesales-crm' || cleanPath === '/pickle-sales-crm' || cleanPath === '/pickles-sales-crm') {
        meta = {
          title: 'Pickle Sales CRM — Bharani Jaadi Curing & Fermentation | bestCRM',
          description: 'Traditional Indian pickle manufacturing CRM for ceramic jaadi aging, oil levels, shelf-life pH monitoring, and retail orders.',
        };
      } else if (cleanPath === '/lunchboxes-crm' || cleanPath === '/lunch-boxes-crm' || cleanPath === '/lunch-box-crm') {
        meta = {
          title: 'Lunch Boxes CRM — Kitchen Production Manifest & Routes | bestCRM',
          description: 'Dabba and corporate lunch subscription CRM for automated meal splits, roti counts, dispatch routes, and kitchen manifests.',
        };
      }
    }

    // 2. Admin routes check
    if (!meta && cleanPath.startsWith('/admin')) {
      const searchParams = new URLSearchParams(search);
      const tab = searchParams.get('tab');
      let tabTitle = 'Control Center';
      if (tab === 'targets') tabTitle = 'Targets';
      else if (tab === 'leads') tabTitle = 'Leads';
      else if (tab === 'users') tabTitle = 'Users';
      else if (tab === 'pricing' || tab === 'plans') tabTitle = 'Pricing';
      else if (tab === 'sales' || tab === 'sales-gst') tabTitle = 'Sales';
      else if (tab === 'branches') tabTitle = 'Branches';
      else if (tab === 'app-control' || tab === 'app_control') tabTitle = 'Website Control';
      else if (tab === 'dynamic-pricing' || tab === 'dynamic_pricing') tabTitle = 'Dynamic Pricing';
      else if (tab === 'simulation') tabTitle = 'Price Simulation';
      else if (tab === 'security' || tab === 'settings') tabTitle = 'Security';
      else if (tab === 'support') tabTitle = 'Support Desk';
      else if (tab === 'audit') tabTitle = 'Change History';

      meta = {
        title: `Admin Panel — ${tabTitle} | bestCRM`,
        description: 'Super Admin and Management console for bestCRM accounts, subscriptions, branches, and platform control.',
      };
    }

    // 3. /app/:crmId routes
    if (!meta && cleanPath.startsWith('/app')) {
      const parts = cleanPath.split('/');
      const crmId = parts[2];
      const crm = CRM_PRODUCTS.find((c) => c.id === crmId || c.id === `${crmId}-crm`);
      meta = {
        title: crm ? `${crm.name} — Client Workspace | bestCRM` : 'Client Workspace — bestCRM',
        description: crm ? crm.shortDesc : 'Live client workspace for small business workflows.',
      };
    }

    // 4. /crms/:crmId detail page
    if (!meta && cleanPath.startsWith('/crms/')) {
      const crmId = cleanPath.replace('/crms/', '');
      const crm = CRM_PRODUCTS.find((item) => item.id === crmId);
      if (crm) {
        meta = {
          title: `${crm.name} — Dashboard & Features | bestCRM`,
          description: crm.shortDesc,
        };
      }
    }

    // 5. Fallback for actual 404 pages
    if (!meta) {
      meta = {
        title: 'Page Not Found — bestCRM',
        description: 'The requested page could not be found on bestCRM.',
      };
    }

    // Update document title immediately
    document.title = meta.title;

    const updateMeta = (selector: string, content: string) => {
      let el = document.querySelector(selector);
      if (el) {
        el.setAttribute('content', content);
      } else {
        const match = selector.match(/meta\[(property|name)="([^"]+)"\]/);
        if (match) {
          el = document.createElement('meta');
          el.setAttribute(match[1], match[2]);
          el.setAttribute('content', content);
          document.head.appendChild(el);
        }
      }
    };

    const origin = (typeof window !== 'undefined' && window.location.origin) ? window.location.origin : 'https://bestcrm-blue.vercel.app';
    const fullOgImage = `${origin}/og-image.png`;
    const fullOgLogo = `${origin}/og-logo.png`;
    const canonicalUrl = `${origin}${pathname}`;

    updateMeta('meta[name="title"]', meta.title);
    updateMeta('meta[name="description"]', meta.description);
    updateMeta('meta[property="og:title"]', meta.title);
    updateMeta('meta[property="og:description"]', meta.description);
    updateMeta('meta[property="og:url"]', canonicalUrl);
    updateMeta('meta[property="og:image"]', fullOgImage);
    updateMeta('meta[property="og:image:secure_url"]', fullOgImage);
    updateMeta('meta[name="twitter:title"]', meta.title);
    updateMeta('meta[name="twitter:description"]', meta.description);
    updateMeta('meta[name="twitter:image"]', fullOgImage);

    let imageSrc = document.querySelector('link[rel="image_src"]');
    if (!imageSrc) {
      imageSrc = document.createElement('link');
      imageSrc.setAttribute('rel', 'image_src');
      document.head.appendChild(imageSrc);
    }
    imageSrc.setAttribute('href', fullOgLogo);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);
  }, [pathname, search]);

  return null;
}
