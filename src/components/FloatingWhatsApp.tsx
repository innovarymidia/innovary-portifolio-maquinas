import { MessageSquare } from 'lucide-react';
import { fleetEquipments } from '../config/catalog';
import { companyConfig } from '../config/company';
import { buildQuoteMessage, buildWhatsAppUrl } from '../lib/quote';
import { trackEvent } from '../lib/analytics';

interface FloatingWhatsAppProps {
  selectedEquipmentId: string;
}

export function FloatingWhatsApp({ selectedEquipmentId }: FloatingWhatsAppProps) {
  const selected = fleetEquipments.find((item) => item.id === selectedEquipmentId);
  const message = selected
    ? buildQuoteMessage({
        equipmentLabel: selected.name,
        equipmentCode: selected.code,
      })
    : companyConfig.contact.whatsappDefaultMessage;

  const url = buildWhatsAppUrl(companyConfig.contact.whatsappDigits, message);

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
      className="fixed bottom-5 right-5 z-40 min-h-[48px] px-4 sm:px-5 rounded-full bg-[#25272B] hover:bg-[#F3B51B] text-white hover:text-[#25272B] border border-[#D6D9DE]/30 shadow-sm inline-flex items-center gap-2.5 text-sm font-semibold transition-colors cursor-pointer"
    >
      <span className="w-7 h-7 rounded-full bg-[#F3B51B] text-[#25272B] flex items-center justify-center shrink-0">
        <MessageSquare className="w-4 h-4" aria-hidden="true" />
      </span>
      <span className="hidden sm:inline">Orçamento WhatsApp</span>
    </a>
  );
}

