import { MessageSquare } from 'lucide-react';
import { equipmentCatalog } from '../config/catalog';
import type { CompanyConfig } from '../config/company';
import { trackEvent } from '../lib/analytics';
import { buildQuoteMessage, buildWhatsAppUrl } from '../lib/quote';

interface FloatingWhatsAppProps {
  company: CompanyConfig;
  selectedEquipmentId: string;
}

export function FloatingWhatsApp({
  company,
  selectedEquipmentId,
}: FloatingWhatsAppProps) {
  const selected = equipmentCatalog.find((item) => item.id === selectedEquipmentId);
  const message = selected
    ? buildQuoteMessage({
        equipmentLabel: selected.name,
        equipmentCode: selected.code,
        brand: selected.brand,
      })
    : company.contact.whatsappDefaultMessage;

  const url = buildWhatsAppUrl(company.contact.whatsappDigits, message);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() =>
        trackEvent('whatsapp_click', {
          location: 'floating_button',
          equipment_code: selected?.code ?? 'general',
        })
      }
      aria-label="Solicitar orçamento via WhatsApp"
      className="fixed bottom-5 right-5 z-40 min-h-[48px] px-4 sm:px-5 rounded-full bg-dark hover:bg-accent text-white hover:text-dark border border-line/30 shadow-sm inline-flex items-center gap-2.5 text-sm font-semibold transition-colors cursor-pointer"
    >
      <span className="w-7 h-7 rounded-full bg-accent text-dark flex items-center justify-center shrink-0">
        <MessageSquare className="w-4 h-4" aria-hidden="true" />
      </span>
      <span className="hidden sm:inline">Orçamento WhatsApp</span>
    </a>
  );
}
