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
    imageSrc.setAttribute('href', fullOgImage);

    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', canonicalUrl);
  }, [pathname]);

  return null;
}
