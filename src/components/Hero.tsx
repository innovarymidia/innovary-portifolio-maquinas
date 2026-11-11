import { ArrowRight, ChevronRight, ShieldCheck } from 'lucide-react';
import { heroConfig } from '../config/sections';
import { trackEvent } from '../lib/analytics';

export function Hero() {
  return (
    <section
      id="topo"
      className="relative overflow-hidden bg-[#F2F3F5] pt-8 sm:pt-12 pb-12 lg:pb-16 border-b border-[#D6D9DE]"
    >
      {/* Fotografia real de canteiro em textura sutil no fundo mantendo contraste editorial */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        aria-hidden="true"
      >
        <img
          src={heroConfig.backgroundSceneImage}
          alt=""
          className="w-full h-full object-cover object-center grayscale"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#F2F3F5] via-[#F2F3F5]/40 to-[#F2F3F5]" />
      </div>

      {/* Linhas arquitetonicas discretas inspiradas na referencia industrial */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 bottom-0 max-w-[1200px] mx-auto border-x border-[#D6D9DE]/60"
        aria-hidden="true"
      >
        <div className="hidden lg:block absolute inset-x-0 top-[46%] border-t border-dashed border-[#D6D9DE]" />
        <div className="hidden lg:block absolute inset-y-0 left-1/3 border-l border-[#D6D9DE]/50" />
        <div className="hidden lg:block absolute inset-y-0 left-2/3 border-l border-[#D6D9DE]/50" />
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-6 animate-fade-up">
        {/* Linha superior da tipografia monumental */}
        <h1 className="font-display font-extrabold uppercase text-[#25272B] tracking-[-0.02em] leading-[0.88] text-[clamp(2.9rem,8.4vw,6.4rem)] select-none">
          <span className="block">{heroConfig.headlineTop}</span>
          <span className="sr-only">
            {' '}
            {heroConfig.headlineRightTop} {heroConfig.headlineRightBottom}
          </span>
        </h1>

        {/* Grid de 12 colunas: esquerda editorial, centro maquina sobrepondo o titulo, direita especificacoes */}
        <div className="grid grid-cols-12 gap-6 items-start mt-3 lg:mt-0 relative">
          {/* Coluna Esquerda: Descricao + Botoes + Card Tecnico Flutuante */}
          <div className="col-span-12 lg:col-span-4 z-20 pt-2 lg:pt-8 order-2 lg:order-1">
            <p className="text-sm sm:text-base text-[#656B73] leading-relaxed max-w-[330px]">
              {heroConfig.description}
            </p>

            <div className="mt-5 flex flex-wrap items-center gap-3">
              <a
                href="#orcamento"
                onClick={() => trackEvent('cta_click', { location: 'hero_primary' })}
                className="min-h-[48px] px-6 rounded-[10px] bg-[#F3B51B] hover:bg-[#E0A310] text-[#25272B] font-semibold text-sm inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>{heroConfig.primaryCtaLabel}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>

              <a
                href="#frota"
                onClick={() => trackEvent('cta_click', { location: 'hero_secondary' })}
                className="min-h-[48px] px-5 rounded-[10px] bg-white border border-[#D6D9DE] hover:border-[#25272B] text-[#25272B] font-semibold text-sm inline-flex items-center justify-center transition-colors cursor-pointer"
              >
                {heroConfig.secondaryCtaLabel}
              </a>
            </div>

            {/* Card tecnico flutuante estilo especificacao de fabrica */}
            <div className="mt-6 lg:mt-8 bg-white border border-[#D6D9DE] rounded-[12px] p-4 max-w-[300px]">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#25272B]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#F3B51B]" aria-hidden="true" />
                <ShieldCheck className="w-4 h-4 text-[#25272B]" aria-hidden="true" />
                <span>{heroConfig.calloutTitle}</span>
              </div>
              <p className="text-xs text-[#656B73] leading-relaxed mt-1.5">
                {heroConfig.calloutText}
              </p>
            </div>
          </div>

          {/* Coluna Central: Escavadeira em recorte sobrepondo a headline superior */}
          <div className="col-span-12 lg:col-span-5 z-20 order-1 lg:order-2 lg:-mt-16 xl:-mt-20 flex justify-center items-center">
            <img
              src={heroConfig.centerpieceImage}
              alt={heroConfig.centerpieceAlt}
              className="w-full max-w-[460px] lg:max-w-[590px] lg:scale-110 h-auto object-contain select-none"
              fetchPriority="high"
            />
          </div>

          {/* Coluna Direita: Badge operacional + Bloco tipografico "MAQUINAS PESADAS" */}
          <div className="col-span-12 lg:col-span-3 z-20 order-3 text-left lg:text-right flex flex-col justify-between lg:pt-3">
            <div className="hidden lg:block mb-6">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#656B73]">
                {heroConfig.topRightBadgeLabel}
              </p>
              <p className="font-display text-3xl font-extrabold uppercase text-[#25272B] leading-none mt-1">
                {heroConfig.topRightBadgeValue}
              </p>
              <p className="text-xs text-[#656B73] mt-1">
                {heroConfig.topRightBadgeNote}
              </p>
            </div>

            <div aria-hidden="true" className="hidden lg:block">
              <p className="font-display font-extrabold uppercase text-[#25272B] tracking-[-0.02em] leading-[0.86] text-[clamp(2.8rem,5.2vw,4.7rem)]">
                {heroConfig.headlineRightTop}
                <br />
                {heroConfig.headlineRightBottom}
              </p>
              <p className="text-sm font-medium text-[#656B73] mt-3 max-w-[230px] lg:ml-auto leading-snug">
                {heroConfig.regionSubtitle}
              </p>
              <div className="hidden lg:flex justify-end mt-4">
                <span className="inline-block w-24 h-px bg-[#D6D9DE]" />
              </div>
            </div>

            {/* Subheadline mobile */}
            <div className="lg:hidden">
              <p className="font-display font-extrabold uppercase text-[#25272B] text-4xl leading-[0.9]">
                {heroConfig.headlineRightTop} {heroConfig.headlineRightBottom}
              </p>
              <p className="text-sm text-[#656B73] mt-1.5">{heroConfig.regionSubtitle}</p>
            </div>
          </div>
        </div>

        {/* Rodape tecnico do Hero com indicacoes operacionais e preview real de obra */}
        <div className="mt-8 pt-5 border-t border-[#D6D9DE] grid grid-cols-12 gap-4 items-center">
          <div className="col-span-6 sm:col-span-4 flex items-center gap-3">
            <span className="font-display text-2xl sm:text-3xl font-extrabold text-[#25272B] leading-none">
              {heroConfig.bottomLeftMetric}
            </span>
            <span className="text-xs text-[#656B73] leading-tight max-w-[120px]">
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
              href="#diferenciais"
              className="inline-flex items-center gap-3 bg-white border border-[#D6D9DE] hover:border-[#25272B] rounded-[10px] px-3 py-2 transition-colors cursor-pointer"
            >
              <img
                src={heroConfig.backgroundSceneImage}
                alt={heroConfig.backgroundSceneAlt}
                className="w-12 h-8 rounded object-cover shrink-0"
              />
              <span className="text-xs font-medium text-[#25272B] leading-tight">
                Operação real em canteiros civis
              </span>
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
