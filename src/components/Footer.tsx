import { Mail, MapPin, MessageSquare, Phone } from 'lucide-react';
import { equipmentCategories, type CategoryId } from '../config/catalog';
import { companyConfig } from '../config/company';
import { buildWhatsAppUrl } from '../lib/quote';
import { trackEvent } from '../lib/analytics';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  onSelectCategory: (categoryId: CategoryId) => void;
}

export function Footer({ onSelectCategory }: FooterProps) {
  const year = new Date().getFullYear();
  const whatsAppUrl = buildWhatsAppUrl(
    companyConfig.contact.whatsappDigits,
    companyConfig.contact.whatsappDefaultMessage
  );

  const handleCategoryClick = (categoryId: CategoryId) => {
    onSelectCategory(categoryId);
    const fleetEl = document.getElementById('frota');
    if (fleetEl) {
      fleetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="bg-[#25272B] text-[#F2F3F5] pt-14 pb-8">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-12 gap-8 lg:gap-10">
          <div className="col-span-12 md:col-span-4 space-y-4">
            <BrandLogo inverted />
            <p className="text-sm text-[#D6D9DE] leading-relaxed max-w-xs">
              {companyConfig.tagline}
            </p>
            <div className="text-xs text-[#D6D9DE]/80 space-y-1">
              <p>{companyConfig.contact.addressLabel}</p>
              <p>{companyConfig.contact.cnpjLabel}</p>
            </div>
          </div>

          <div className="col-span-6 md:col-span-2">
            <h3 className="font-display text-lg font-bold uppercase tracking-wide text-white">
              Navegação
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-[#D6D9DE]">
              {companyConfig.navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="hover:text-[#F3B51B] transition-colors inline-block py-0.5"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-6 md:col-span-3">
            <h3 className="font-display text-lg font-bold uppercase tracking-wide text-white">
              Categorias
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-[#D6D9DE]">
              {equipmentCategories.map((cat) => (
                <li key={cat.id}>
                  <button
                    type="button"
                    onClick={() => handleCategoryClick(cat.id)}
                    className="text-left hover:text-[#F3B51B] transition-colors py-0.5 cursor-pointer"
                  >
                    {cat.shortTitle}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-12 md:col-span-3">
            <h3 className="font-display text-lg font-bold uppercase tracking-wide text-white">
              Atendimento
            </h3>
            <ul className="mt-3 space-y-2.5 text-sm text-[#D6D9DE]">
              <li>
                <a
                  href={companyConfig.contact.phoneHref}
                  onClick={() => trackEvent('phone_click', { location: 'footer' })}
                  className="inline-flex items-center gap-2 hover:text-[#F3B51B] transition-colors"
                >
                  <Phone className="w-4 h-4 text-[#F3B51B]" aria-hidden="true" />
                  <span>{companyConfig.contact.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('whatsapp_click', { location: 'footer' })}
                  className="inline-flex items-center gap-2 hover:text-[#F3B51B] transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-[#F3B51B]" aria-hidden="true" />
                  <span>Atendimento WhatsApp</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${companyConfig.contact.email}`}
                  className="inline-flex items-center gap-2 hover:text-[#F3B51B] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#F3B51B]" aria-hidden="true" />
                  <span>{companyConfig.contact.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-2 text-xs text-[#D6D9DE]/80 pt-1">
                <MapPin className="w-4 h-4 text-[#F3B51B] shrink-0 mt-0.5" aria-hidden="true" />
                <span>{companyConfig.contact.cityRegion}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-[#D6D9DE]/75">
          <p>
            © {year} {companyConfig.brandName}. Todos os direitos reservados.
          </p>
          <p>{companyConfig.templateCredit}</p>
        </div>
      </div>
    </footer>
  );
}

