import { ArrowRight, MapPin } from 'lucide-react';
import { companyConfig } from '../config/company';
import { logisticsImageConfig } from '../config/sections';
import { trackEvent } from '../lib/analytics';

export function CoverageSection() {
  return (
    <section id="atendimento" className="scroll-mt-20 py-16 lg:py-24 bg-[#F2F3F5]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-12 gap-8 lg:gap-10 items-center">
          <div className="col-span-12 lg:col-span-6">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#656B73]">
              {companyConfig.coverage.eyebrow}
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold uppercase text-[#25272B] leading-[0.95] tracking-tight mt-2">
              {companyConfig.coverage.title}
            </h2>
            <p className="text-sm sm:text-base text-[#656B73] leading-relaxed mt-4">
              {companyConfig.coverage.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-7">
              {companyConfig.coverage.regions.map((region) => (
                <div
                  key={region.title}
                  className="bg-white border border-[#D6D9DE] rounded-[12px] p-4"
                >
                  <div className="flex items-start gap-2.5">
                    <span className="w-8 h-8 rounded-[8px] bg-[#F3B51B] text-[#25272B] flex items-center justify-center shrink-0">
                      <MapPin className="w-4 h-4" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-bold uppercase text-[#25272B] leading-tight">
                        {region.title}
                      </h3>
                      <p className="text-xs text-[#656B73] mt-1 leading-relaxed">
                        {region.detail}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-xs text-[#656B73] mt-4">
              {companyConfig.coverage.mobilizationNote}
            </p>
          </div>

          <div className="col-span-12 lg:col-span-6">
            <div className="bg-white border border-[#D6D9DE] rounded-[12px] overflow-hidden">
              <img
                src={logisticsImageConfig.image}
                alt={logisticsImageConfig.alt}
                decoding="async"
                className="w-full h-64 sm:h-80 lg:h-[380px] object-cover"
              />
              <div className="p-5 sm:p-6 border-t border-[#D6D9DE] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-[#656B73]">
                    Área configurável de atendimento
                  </p>
                  <p className="font-display text-2xl font-bold uppercase text-[#25272B] mt-0.5">
                    {companyConfig.contact.cityRegion}
                  </p>
                </div>

                <a
                  href="#orcamento"
                  onClick={() => trackEvent('cta_click', { location: 'coverage_section' })}
                  className="min-h-[48px] px-5 rounded-[10px] bg-[#25272B] hover:bg-[#F3B51B] text-white hover:text-[#25272B] font-semibold text-sm inline-flex items-center justify-center gap-2 shrink-0 transition-colors cursor-pointer"
                >
                  <span>Consultar Frete</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
