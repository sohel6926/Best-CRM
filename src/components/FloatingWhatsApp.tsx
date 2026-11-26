import { WhatsAppIcon } from './WhatsAppIcon';
import { SITE_INFO } from '../data/content';

export function FloatingWhatsApp() {
  return (
    <a
      href={SITE_INFO.contact.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with bestCRM on WhatsApp"
      className="fixed bottom-4 right-4 z-30 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2.5 text-xs sm:text-sm font-bold text-white shadow-[0_12px_28px_-6px_rgba(37,211,102,0.45)] transition hover:bg-[#20ba59] active:scale-[0.98]"
    >
      <WhatsAppIcon className="h-5 w-5 shrink-0" />
      <span className="hidden sm:inline">WhatsApp Chat</span>
    </a>
  );
}
