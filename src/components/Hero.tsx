import { ArrowRight, ChevronRight, Layers, Search } from 'lucide-react';
import { categoryLibrary, type CategoryId } from '../config/catalog';
import { heroConfig } from '../config/sections';
import type { TemplateConfig } from '../config/template';
import { trackEvent } from '../lib/analytics';
import { DustCloudEffect } from './DustCloudEffect';

interface HeroProps {
  template: TemplateConfig;
  onQuickCategorySelect: (categoryId: CategoryId) => void;
  onFocusCatalogSearch: () => void;
}

export function Hero({
  template,
  onQuickCategorySelect,
  onFocusCatalogSearch,
}: HeroProps) {
  const quickCategories = categoryLibrary
    .filter((cat) => template.enabledCategoryIds.includes(cat.id))
    .slice(0, 6);

  return (
    <section
      id="topo"
      className="scroll-mt-16 sm:scroll-mt-20 relative overflow-hidden bg-surface pt-5 sm:pt-12 pb-8 sm:pb-12 lg:pb-16 border-b border-line"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        aria-hidden="true"
      >
        <img
          src={heroConfig.backgroundSceneImage}
          alt=""
          className="w-full h-full object-cover object-center grayscale"
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, var(--brand-surface), color-mix(in srgb, var(--brand-surface) 45%, transparent), var(--brand-surface))',
          }}
        />
      </div>

      <div
        className="pointer-events-none absolute inset-x-0 top-0 bottom-0 max-w-[1200px] mx-auto border-x border-line/60"
        aria-hidden="true"
      >
        <div className="hidden lg:block absolute inset-x-0 top-[52%] border-t border-dashed border-line" />
        <div className="hidden lg:block absolute inset-y-0 left-1/2 border-l border-line/50" />
      </div>

      <DustCloudEffect />

      <div className="relative z-20 max-w-[1200px] mx-auto px-4 sm:px-6 animate-fade-up">
        <div className="grid grid-cols-12 gap-5 sm:gap-8 lg:gap-10 items-center">
          <div className="col-span-12 lg:col-span-6 min-w-0">
            <span className="inline-flex items-center px-2.5 sm:px-3 py-1 rounded-md bg-accent text-dark text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.08em] sm:tracking-[0.12em]">
              {heroConfig.eyebrow}
            </span>

            <h1 className="font-display font-extrabold uppercase text-dark tracking-[-0.02em] leading-[0.9] text-[clamp(2.35rem,9vw,4.9rem)] mt-3 sm:mt-4">
              {heroConfig.headlineLine1}
              <br />
              {heroConfig.headlineLine2}
              <br />
              {heroConfig.headlineLine3}
            </h1>

            {/* Imagem compacta visivel ja na primeira dobra no mobile */}
            <div className="lg:hidden mt-4 flex justify-center">
              <img
                src={heroConfig.centerpieceImage}
                alt={heroConfig.centerpieceAlt}
                className="w-full max-w-[330px] max-h-[200px] object-contain select-none"
                fetchPriority="high"
              />
            </div>

            <p className="text-sm sm:text-base text-muted leading-relaxed mt-3 sm:mt-4 max-w-[460px]">
              {heroConfig.description}
            </p>

            <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:flex sm:flex-wrap items-center gap-2.5 sm:gap-3">
              <button
                type="button"
                onClick={() => {
                  trackEvent('cta_click', { location: 'hero_find_equipment' });
                  onFocusCatalogSearch();
                }}
                className="w-full sm:w-auto min-h-[48px] px-5 sm:px-6 rounded-[10px] bg-accent hover:bg-accent-hover text-dark font-semibold text-sm inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Search className="w-4 h-4" aria-hidden="true" />
                <span>{heroConfig.primaryCtaLabel}</span>
              </button>

              <a
                href="#orcamento"
                onClick={() => trackEvent('cta_click', { location: 'hero_quote' })}
                className="w-full sm:w-auto min-h-[48px] px-5 sm:px-6 rounded-[10px] bg-white border border-line hover:border-dark text-dark font-semibold text-sm inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>{heroConfig.secondaryCtaLabel}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>

            <div className="mt-5 pt-4 border-t border-line">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted mb-2">
                Acesso rápido por linha
              </p>
              <div className="flex sm:flex-wrap gap-2 overflow-x-auto no-scrollbar pb-1 sm:pb-0">
                {quickCategories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => onQuickCategorySelect(cat.id)}
                    className="shrink-0 min-h-[40px] sm:min-h-[36px] px-3 rounded-[8px] bg-white border border-line hover:border-dark text-xs font-medium text-dark transition-colors cursor-pointer"
                  >
                    {cat.shortTitle}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="hidden lg:flex col-span-12 lg:col-span-6 flex-col items-end">
            <div className="w-full max-w-[590px]">
              <img
                src={heroConfig.centerpieceImage}
                alt={heroConfig.centerpieceAlt}
                className="w-full h-auto object-contain select-none"
                fetchPriority="high"
              />
            </div>

            <div className="mt-4 bg-white border border-line rounded-[12px] p-4 max-w-[390px] w-full">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-dark">
                <span className="w-2.5 h-2.5 rounded-full bg-accent" aria-hidden="true" />
                <Layers className="w-4 h-4 text-dark" aria-hidden="true" />
                <span>{heroConfig.calloutTitle}</span>
              </div>
              <p className="text-xs text-muted leading-relaxed mt-1.5">
                {heroConfig.calloutText}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 pt-4 sm:pt-5 border-t border-line grid grid-cols-12 gap-3 sm:gap-4 items-center">
          <div className="col-span-6 sm:col-span-4 flex items-center gap-2 sm:gap-3">
            <span className="font-display text-xl sm:text-3xl font-extrabold text-dark leading-none">
              {heroConfig.bottomLeftMetric}
            </span>
            <span className="text-[11px] sm:text-xs text-muted leading-tight max-w-[130px]">
              {heroConfig.bottomLeftSub}
            </span>
            <span className="hidden sm:inline-flex items-center text-accent" aria-hidden="true">
              <ChevronRight className="w-4 h-4 -mr-2" />
              <ChevronRight className="w-4 h-4 -mr-2 opacity-80" />
              <ChevronRight className="w-4 h-4 opacity-50" />
            </span>
          </div>

          <div className="hidden sm:flex col-span-4 justify-center">
            <a
              href="#catalogo"
              className="inline-flex items-center gap-2.5 bg-white border border-line hover:border-dark rounded-[10px] px-4 py-2 text-xs font-semibold text-dark transition-colors cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-dark" aria-hidden="true" />
              <span>Buscar no catálogo completo</span>
            </a>
          </div>

          <div className="col-span-6 sm:col-span-4 text-right">
            <p className="font-display text-lg sm:text-2xl font-extrabold uppercase text-dark leading-none">
              {heroConfig.bottomRightValue}
            </p>
            <p className="text-[11px] sm:text-xs text-muted mt-0.5 sm:mt-1">{heroConfig.bottomRightSub}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
