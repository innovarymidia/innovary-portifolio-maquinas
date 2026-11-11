import { useState } from 'react';
import { Menu, MessageSquare, Phone, X } from 'lucide-react';
import { companyConfig } from '../config/company';
import { trackEvent } from '../lib/analytics';
import { buildWhatsAppUrl } from '../lib/quote';
import { BrandLogo } from './BrandLogo';

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const quickWhatsAppUrl = buildWhatsAppUrl(
    companyConfig.contact.whatsappDigits,
    companyConfig.contact.whatsappDefaultMessage
  );

  return (
    <header className="sticky top-0 z-40 bg-[#F2F3F5]/95 backdrop-blur-sm border-b border-[#D6D9DE]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">
        <BrandLogo />

        <nav className="hidden lg:flex items-center gap-6" aria-label="Navegação principal">
          {companyConfig.navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[#25272B] hover:text-[#656B73] transition-colors py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F3B51B] rounded"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2.5">
          <a
            href={quickWhatsAppUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackEvent('whatsapp_click', { location: 'header' })}
            className="hidden sm:inline-flex items-center gap-2.5 min-h-[48px] px-4 rounded-full bg-white border border-[#D6D9DE] hover:border-[#25272B] text-sm font-semibold text-[#25272B] transition-colors cursor-pointer"
          >
            <span className="w-7 h-7 rounded-full bg-[#F3B51B] text-[#25272B] flex items-center justify-center">
              <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
            </span>
            <span>WhatsApp</span>
          </a>

          <a
            href="#orcamento"
            onClick={() => trackEvent('cta_click', { location: 'header' })}
            className="hidden md:inline-flex items-center justify-center min-h-[48px] px-5 rounded-[10px] bg-[#F3B51B] hover:bg-[#E0A310] text-[#25272B] text-sm font-semibold transition-colors cursor-pointer"
          >
            Solicitar orçamento
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="lg:hidden inline-flex items-center justify-center w-12 h-12 rounded-[10px] bg-white border border-[#D6D9DE] text-[#25272B] hover:border-[#25272B] transition-colors cursor-pointer"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            aria-label={menuOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {menuOpen && (
        <div
          id="mobile-navigation"
          className="lg:hidden bg-white border-t border-[#D6D9DE] px-4 sm:px-6 py-5"
        >
          <nav className="flex flex-col gap-1" aria-label="Menu móvel">
            {companyConfig.navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="min-h-[48px] px-3 flex items-center text-base font-medium text-[#25272B] hover:bg-[#F2F3F5] rounded-[8px]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="mt-4 pt-4 border-t border-[#D6D9DE] flex flex-col gap-2.5">
            <a
              href={companyConfig.contact.phoneHref}
              onClick={() => trackEvent('phone_click', { location: 'mobile_menu' })}
              className="min-h-[48px] px-4 rounded-[10px] border border-[#D6D9DE] text-[#25272B] font-semibold text-sm flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              <span>{companyConfig.contact.phoneDisplay}</span>
            </a>

            <a
              href={quickWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackEvent('whatsapp_click', { location: 'mobile_menu' });
                setMenuOpen(false);
              }}
              className="min-h-[48px] px-4 rounded-[10px] bg-[#F3B51B] text-[#25272B] font-semibold text-sm flex items-center justify-center gap-2"
            >
              <MessageSquare className="w-4 h-4" aria-hidden="true" />
              <span>Chamar no WhatsApp</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
