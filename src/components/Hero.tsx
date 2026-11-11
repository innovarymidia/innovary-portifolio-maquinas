import { ArrowRight, ChevronRight, Layers, Search } from 'lucide-react';
import { categoryLibrary, type CategoryId } from '../config/catalog';
import { heroConfig } from '../config/sections';
import { templateConfig } from '../config/template';
import { trackEvent } from '../lib/analytics';
import { DustCloudEffect } from './DustCloudEffect';

interface HeroProps {
  onQuickCategorySelect: (categoryId: CategoryId) => void;
  onFocusCatalogSearch: () => void;
}

export function Hero({ onQuickCategorySelect, onFocusCatalogSearch }: HeroProps) {
  const quickCategories = categoryLibrary
    .filter((cat) => templateConfig.enabledCategoryIds.includes(cat.id))
    .slice(0, 6);

  return (
    <section
      id="topo"
      className="relative overflow-hidden bg-[#F2F3F5] pt-8 sm:pt-12 pb-12 lg:pb-16 border-b border-[#D6D9DE]"
    >
      {/* Textura sutil de canteiro real mantendo contraste editorial */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        aria-hidden="true"
      >
        <img
          src={heroConfig.backgroundSceneImage}
          alt=""
          className="w-full h-full object-cover object-center grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F2F3F5] via-[#F2F3F5]/45 to-[#F2F3F5]" />
      </div>

      {/* Linhas arquitetonicas discretas */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 bottom-0 max-w-[1200px] mx-auto border-x border-[#D6D9DE]/60"
        aria-hidden="true"
      >
        <div className="hidden lg:block absolute inset-x-0 top-[52%] border-t border-dashed border-[#D6D9DE]" />
        <div className="hidden lg:block absolute inset-y-0 left-1/2 border-l border-[#D6D9DE]/50" />
      </div>

      {/* Poeira sutil de obra */}
      <DustCloudEffect />

      <div className="relative z-20 max-w-[1200px] mx-auto px-4 sm:px-6 animate-fade-up">
        <div className="grid grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Coluna Esquerda: Posicionamento + Headline + CTAs + Atalhos */}
          <div className="col-span-12 lg:col-span-6">
            <span className="inline-flex items-center px-3 py-1 rounded-md bg-[#F3B51B] text-[#25272B] text-[11px] font-bold uppercase tracking-[0.12em]">
              {heroConfig.eyebrow}
            </span>

            <h1 className="font-display font-extrabold uppercase text-[#25272B] tracking-[-0.02em] leading-[0.88] text-[clamp(2.85rem,5.4vw,4.9rem)] mt-4">
              {heroConfig.headlineLine1}
              <br />
              {heroConfig.headlineLine2}
              <br />
              {heroConfig.headlineLine3}
            </h1>

            <p className="text-sm sm:text-base text-[#656B73] leading-relaxed mt-4 max-w-[460px]">
              {heroConfig.description}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => {
                  trackEvent('cta_click', { location: 'hero_find_equipment' });
                  onFocusCatalogSearch();
                }}
                className="min-h-[48px] px-6 rounded-[10px] bg-[#F3B51B] hover:bg-[#E0A310] text-[#25272B] font-semibold text-sm inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <Search className="w-4 h-4" aria-hidden="true" />
                <span>{heroConfig.primaryCtaLabel}</span>
              </button>

              <a
                href="#orcamento"
                onClick={() => trackEvent('cta_click', { location: 'hero_quote' })}
                className="min-h-[48px] px-6 rounded-[10px] bg-white border border-[#D6D9DE] hover:border-[#25272B] text-[#25272B] font-semibold text-sm inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>{heroConfig.secondaryCtaLabel}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>

            {/* Atalhos rapidos de categorias */}
            <div className="mt-6 pt-5 border-t border-[#D6D9DE]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#656B73] mb-2.5">
                Acesso rápido por linha
              </p>
              <div className="flex flex-wrap gap-2">
                {quickCategories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => onQuickCategorySelect(cat.id)}
                    className="min-h-[36px] px-3 rounded-[8px] bg-white border border-[#D6D9DE] hover:border-[#25272B] text-xs font-medium text-[#25272B] transition-colors cursor-pointer"
                  >
                    {cat.shortTitle}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Coluna Direita: Composicao multi-equipamentos + Card tecnico */}
          <div className="col-span-12 lg:col-span-6 flex flex-col items-center lg:items-end">
            <div className="w-full max-w-[590px]">
              <img
                src={heroConfig.centerpieceImage}
                alt={heroConfig.centerpieceAlt}
                className="w-full h-auto object-contain select-none"
                fetchPriority="high"
              />
            </div>

            <div className="mt-4 bg-white border border-[#D6D9DE] rounded-[12px] p-4 max-w-[390px] w-full">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#25272B]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F3B51B]" aria-hidden="true" />
                <Layers className="w-4 h-4 text-[#25272B]" aria-hidden="true" />
                <span>{heroConfig.calloutTitle}</span>
              </div>
              <p className="text-xs text-[#656B73] leading-relaxed mt-1.5">
                {heroConfig.calloutText}
              </p>
            </div>
          </div>
        </div>

        {/* Barra inferior tecnica */}
        <div className="mt-8 pt-5 border-t border-[#D6D9DE] grid grid-cols-12 gap-4 items-center">
          <div className="col-span-6 sm:col-span-4 flex items-center gap-3">
            <span className="font-display text-2xl sm:text-3xl font-extrabold text-[#25272B] leading-none">
              {heroConfig.bottomLeftMetric}
            </span>
            <span className="text-xs text-[#656B73] leading-tight max-w-[130px]">
              {heroConfig.bottomLeftSub}
            </span>
            <span className="hidden sm:inline-flex items-center text-[#F3B51B]" aria-hidden="true">
              <ChevronRight className="w-4 h-4 -mr-2" />
              <ChevronRight className="w-4 h-4 -mr-2 opacity-80" />
              <ChevronRight className="w-4 h-4 opacity-50" />
            </span>
          </div>

          <div className="col-span-12 sm:col-span-4 order-3 sm:order-2 flex justify-start sm:justify-center">
            <a
              href="#catalogo"
              className="inline-flex items-center gap-2.5 bg-white border border-[#D6D9DE] hover:border-[#25272B] rounded-[10px] px-4 py-2 text-xs font-semibold text-[#25272B] transition-colors cursor-pointer"
            >
              <Search className="w-3.5 h-3.5 text-[#25272B]" aria-hidden="true" />
              <span>Buscar no catálogo completo</span>
            </a>
          </div>

          <div className="col-span-6 sm:col-span-4 order-2 sm:order-3 text-right">
            <p className="font-display text-xl sm:text-2xl font-extrabold uppercase text-[#25272B] leading-none">
              {heroConfig.bottomRightValue}
            </p>
            <p className="text-xs text-[#656B73] mt-1">{heroConfig.bottomRightSub}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
