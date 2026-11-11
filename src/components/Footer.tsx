import { Mail, MapPin, MessageSquare, Phone } from 'lucide-react';
import { categoryLibrary, type CategoryId } from '../config/catalog';
import type { CompanyConfig } from '../config/company';
import type { TemplateConfig } from '../config/template';
import { trackEvent } from '../lib/analytics';
import { buildWhatsAppUrl } from '../lib/quote';
import { BrandLogo } from './BrandLogo';

interface FooterProps {
  company: CompanyConfig;
  template: TemplateConfig;
  onSelectCategory: (categoryId: CategoryId) => void;
}

export function Footer({ company, template, onSelectCategory }: FooterProps) {
  const year = new Date().getFullYear();
  const visibleCategories = categoryLibrary.filter((cat) =>
    template.enabledCategoryIds.includes(cat.id)
  );
  const whatsAppUrl = buildWhatsAppUrl(
    company.contact.whatsappDigits,
    company.contact.whatsappDefaultMessage
  );

  const handleCategoryClick = (categoryId: CategoryId) => {
    onSelectCategory(categoryId);
    const catalogEl = document.getElementById('catalogo');
    if (catalogEl) {
      catalogEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="bg-dark text-surface pt-14 pb-8">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-12 gap-8 lg:gap-10">
          <div className="col-span-12 md:col-span-4 space-y-4">
            <BrandLogo company={company} inverted />
            <p className="text-sm text-line leading-relaxed max-w-xs">
              {company.tagline}
            </p>
            <div className="text-xs text-line/80 space-y-1">
              <p>{company.contact.addressLabel}</p>
              <p>{company.contact.cnpjLabel}</p>
            </div>
          </div>

          <div className="col-span-6 md:col-span-2">
            <h3 className="font-display text-lg font-bold uppercase tracking-wide text-white">
              Navegação
            </h3>
            <ul className="mt-3 space-y-2 text-sm text-line">
              {company.navigation.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="hover:text-accent transition-colors inline-block py-0.5"
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
            <ul className="mt-3 space-y-2 text-sm text-line">
              {visibleCategories.slice(0, 6).map((cat) => (
                <li key={cat.id}>
                  <button
                    type="button"
                    onClick={() => handleCategoryClick(cat.id)}
                    className="text-left hover:text-accent transition-colors py-0.5 cursor-pointer"
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
            <ul className="mt-3 space-y-2.5 text-sm text-line">
              <li>
                <a
                  href={company.contact.phoneHref}
                  onClick={() => trackEvent('phone_click', { location: 'footer' })}
                  className="inline-flex items-center gap-2 hover:text-accent transition-colors"
                >
                  <Phone className="w-4 h-4 text-accent" aria-hidden="true" />
                  <span>{company.contact.phoneDisplay}</span>
                </a>
              </li>
              <li>
                <a
                  href={whatsAppUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackEvent('whatsapp_click', { location: 'footer' })}
                  className="inline-flex items-center gap-2 hover:text-accent transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-accent" aria-hidden="true" />
                  <span>Atendimento WhatsApp</span>
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${company.contact.email}`}
                  className="inline-flex items-center gap-2 hover:text-accent transition-colors"
                >
                  <Mail className="w-4 h-4 text-accent" aria-hidden="true" />
                  <span>{company.contact.email}</span>
                </a>
              </li>
              <li className="flex items-start gap-2 text-xs text-line/80 pt-1">
                <MapPin className="w-4 h-4 text-accent shrink-0 mt-0.5" aria-hidden="true" />
                <span>{company.contact.cityRegion}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs text-line/75">
          <p>
            © {year} {company.brandName}. Todos os direitos reservados.
          </p>
          <p>{company.templateCredit}</p>
        </div>
      </div>
    </footer>
  );
}
