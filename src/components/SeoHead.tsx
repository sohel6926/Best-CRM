import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { CRM_PRODUCTS, PAGE_SEO } from '../data/content';

export function SeoHead() {
  const { pathname } = useLocation();

  useEffect(() => {
    let meta = PAGE_SEO[pathname];

    if (!meta && pathname.startsWith('/crms/')) {
      const crmId = pathname.replace('/crms/', '');
      const crm = CRM_PRODUCTS.find((item) => item.id === crmId);
      if (crm) {
        meta = {
          title: `${crm.name} — Dashboard & Features | bestCRM`,
          description: crm.shortDesc,
        };
      }
    }

    if (!meta) {
      meta = {
        title: 'Page Not Found — bestCRM',
        description: 'The requested page could not be found on bestCRM.',
      };
    }

    document.title = meta.title;

    const updateMeta = (selector: string, content: string) => {
      const el = document.querySelector(selector);
      if (el) {
        el.setAttribute('content', content);
      }
    };

    updateMeta('meta[name="description"]', meta.description);
    updateMeta('meta[property="og:title"]', meta.title);
    updateMeta('meta[property="og:description"]', meta.description);
    updateMeta('meta[name="twitter:title"]', meta.title);
    updateMeta('meta[name="twitter:description"]', meta.description);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', window.location.origin + pathname);
  }, [pathname]);

  return null;
}
