import type { CompanyConfig } from '../config/company';
import { brandsSectionConfig } from '../config/sections';

interface BrandsSectionProps {
  company: CompanyConfig;
}

export function BrandsSection({ company }: BrandsSectionProps) {
  if (company.brands.length === 0) {
    return null;
  }

  return (
    <section id="marcas" className="scroll-mt-20 py-14 lg:py-20 bg-surface">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="text-center max-w-2xl mx-auto">
          <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
            {brandsSectionConfig.eyebrow}
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-extrabold uppercase text-dark tracking-tight leading-[0.96] mt-2">
            {brandsSectionConfig.title}
          </h2>
          <p className="text-xs sm:text-sm text-muted mt-2.5 leading-relaxed">
            {brandsSectionConfig.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3.5 mt-8">
          {company.brands.map((brand) => (
            <div
              key={brand.name}
              className="bg-white border border-line rounded-[12px] px-4 py-5 flex flex-col items-center justify-center text-center"
            >
              <span className="font-display text-xl font-extrabold tracking-wide uppercase text-dark">
                {brand.name}
              </span>
              <span className="text-[11px] text-muted mt-1 leading-tight">
                {brand.focus}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
