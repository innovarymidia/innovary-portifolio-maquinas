import { ArrowRight } from 'lucide-react';
import { processConfig } from '../config/sections';
import { trackEvent } from '../lib/analytics';

export function ProcessSection() {
  return (
    <section id="processo" className="scroll-mt-20 py-16 lg:py-24 bg-white border-y border-[#D6D9DE]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 lg:col-span-7">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#656B73]">
              {processConfig.eyebrow}
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold uppercase text-[#25272B] leading-[0.95] tracking-tight mt-2">
              {processConfig.title}
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-5">
            <p className="text-sm sm:text-base text-[#656B73] leading-relaxed">
              {processConfig.subtitle}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-5 mt-10">
          {processConfig.steps.map((step) => (
            <article
              key={step.number}
              className="col-span-12 sm:col-span-6 lg:col-span-3 bg-[#F2F3F5]/65 border border-[#D6D9DE] rounded-[12px] p-6 flex flex-col justify-between"
            >
              <div>
                <span className="inline-flex w-11 h-11 rounded-[10px] bg-[#F3B51B] text-[#25272B] font-display text-2xl font-extrabold items-center justify-center">
                  {step.number}
                </span>
                <h3 className="font-display text-2xl font-bold uppercase text-[#25272B] mt-5 leading-tight">
                  {step.title}
                </h3>
                <p className="text-sm text-[#656B73] leading-relaxed mt-2">
                  {step.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 bg-[#25272B] text-white rounded-[12px] p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <p className="font-display text-2xl sm:text-3xl font-bold uppercase text-white leading-tight">
              PRECISA VERIFICAR DISPONIBILIDADE PARA RETIRADA OU ENTREGA?
            </p>
            <p className="text-sm text-[#D6D9DE] mt-1.5">
              Envie os equipamentos necessários e receba retorno com opções de diária, semana ou mês.
            </p>
          </div>
          <a
            href="#orcamento"
            onClick={() => trackEvent('cta_click', { location: 'process_banner' })}
            className="min-h-[48px] px-6 rounded-[10px] bg-[#F3B51B] hover:bg-[#E0A310] text-[#25272B] font-semibold text-sm inline-flex items-center justify-center gap-2 shrink-0 transition-colors cursor-pointer"
          >
            <span>Solicitar orçamento</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
