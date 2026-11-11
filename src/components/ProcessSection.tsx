import { ArrowRight } from 'lucide-react';
import { processConfig } from '../config/sections';
import { trackEvent } from '../lib/analytics';

export function ProcessSection() {
  return (
    <section id="processo" className="scroll-mt-16 sm:scroll-mt-20 py-12 sm:py-16 lg:py-24 bg-white border-y border-line">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-12 gap-4 sm:gap-6 items-end">
          <div className="col-span-12 lg:col-span-7">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
              {processConfig.eyebrow}
            </p>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold uppercase text-dark leading-[0.95] tracking-tight mt-2">
              {processConfig.title}
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-5">
            <p className="text-sm sm:text-base text-muted leading-relaxed">
              {processConfig.subtitle}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-3.5 sm:gap-5 mt-8 sm:mt-10">
          {processConfig.steps.map((step) => (
            <article
              key={step.number}
              className="col-span-12 sm:col-span-6 lg:col-span-3 bg-surface/65 border border-line rounded-[12px] p-4 sm:p-6 flex items-start gap-3.5 sm:flex-col sm:justify-between"
            >
              <span className="inline-flex w-10 h-10 sm:w-11 sm:h-11 rounded-[10px] bg-accent text-dark font-display text-xl sm:text-2xl font-extrabold items-center justify-center shrink-0">
                {step.number}
              </span>
              <div>
                <h3 className="font-display text-xl sm:text-2xl font-bold uppercase text-dark sm:mt-4 leading-tight">
                  {step.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted leading-relaxed mt-1 sm:mt-2">
                  {step.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-6 sm:mt-8 bg-dark text-white rounded-[12px] p-5 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-6">
          <div>
            <p className="font-display text-2xl sm:text-3xl font-bold uppercase text-white leading-tight">
              PRECISA VERIFICAR DISPONIBILIDADE PARA RETIRADA OU ENTREGA?
            </p>
            <p className="text-xs sm:text-sm text-line mt-1.5">
              Envie os equipamentos necessários e receba retorno com opções de diária, semana ou mês.
            </p>
          </div>
          <a
            href="#orcamento"
            onClick={() => trackEvent('cta_click', { location: 'process_banner' })}
            className="w-full sm:w-auto min-h-[48px] px-6 rounded-[10px] bg-accent hover:bg-accent-hover text-dark font-semibold text-sm inline-flex items-center justify-center gap-2 shrink-0 transition-colors cursor-pointer"
          >
            <span>Solicitar orçamento</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}
