import { MessageCircle } from 'lucide-react';
import { SITE_INFO } from '../data/content';

export function FloatingWhatsApp() {
  return (
    <a
      href={SITE_INFO.contact.whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with bestCRM on WhatsApp"
      className="fixed bottom-4 right-4 z-30 inline-flex items-center gap-2 rounded-full bg-[#15803D] px-4 py-2.5 text-xs sm:text-sm font-semibold text-white shadow-[0_12px_28px_-6px_rgba(21,128,61,0.45)] transition hover:bg-[#166534] active:scale-[0.98]"
    >
      <MessageCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span className="hidden sm:inline">WhatsApp Chat</span>
    </a>
  );
}
