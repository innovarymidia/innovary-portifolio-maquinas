import { useState } from 'react';
import { Menu, MessageSquare, Phone, X } from 'lucide-react';
import type { CompanyConfig } from '../config/company';
import { trackEvent } from '../lib/analytics';
import { buildWhatsAppUrl } from '../lib/quote';
import { BrandLogo } from './BrandLogo';

interface HeaderProps {
  company: CompanyConfig;
}

export function Header({ company }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  const quickWhatsAppUrl = buildWhatsAppUrl(
    company.contact.whatsappDigits,
    company.contact.whatsappDefaultMessage
  );

  return (
    <header className="sticky top-0 z-40 bg-surface/95 backdrop-blur-sm border-b border-line">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between gap-4">
        <BrandLogo company={company} />

        <nav className="hidden lg:flex items-center gap-6" aria-label="Navegação principal">
          {company.navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-dark hover:text-muted transition-colors py-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded"
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
            className="hidden sm:inline-flex items-center gap-2.5 min-h-[48px] px-4 rounded-full bg-white border border-line hover:border-dark text-sm font-semibold text-dark transition-colors cursor-pointer"
          >
            <span className="w-7 h-7 rounded-full bg-accent text-dark flex items-center justify-center">
              <MessageSquare className="w-3.5 h-3.5" aria-hidden="true" />
            </span>
            <span>WhatsApp</span>
          </a>

          <a
            href="#orcamento"
            onClick={() => trackEvent('cta_click', { location: 'header' })}
            className="hidden md:inline-flex items-center justify-center min-h-[48px] px-5 rounded-[10px] bg-accent hover:bg-accent-hover text-dark text-sm font-semibold transition-colors cursor-pointer"
          >
            Solicitar orçamento
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            className="lg:hidden inline-flex items-center justify-center w-12 h-12 rounded-[10px] bg-white border border-line text-dark hover:border-dark transition-colors cursor-pointer"
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
          className="lg:hidden bg-white border-t border-line px-4 sm:px-6 py-5"
        >
          <nav className="flex flex-col gap-1" aria-label="Menu móvel">
            {company.navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMenuOpen(false)}
                className="min-h-[48px] px-3 flex items-center text-base font-medium text-dark hover:bg-surface rounded-[8px]"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="mt-4 pt-4 border-t border-line flex flex-col gap-2.5">
            <a
              href={company.contact.phoneHref}
              onClick={() => trackEvent('phone_click', { location: 'mobile_menu' })}
              className="min-h-[48px] px-4 rounded-[10px] border border-line text-dark font-semibold text-sm flex items-center justify-center gap-2"
            >
              <Phone className="w-4 h-4" aria-hidden="true" />
              <span>{company.contact.phoneDisplay}</span>
            </a>

            <a
              href={quickWhatsAppUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackEvent('whatsapp_click', { location: 'mobile_menu' });
                setMenuOpen(false);
              }}
              className="min-h-[48px] px-4 rounded-[10px] bg-accent text-dark font-semibold text-sm flex items-center justify-center gap-2"
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
