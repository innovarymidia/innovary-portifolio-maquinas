import { ArrowRight, Headphones, Layers, Wallet, Wrench } from 'lucide-react';
import { differentialsConfig } from '../config/sections';

const iconMap = {
  wrench: Wrench,
  wallet: Wallet,
  layers: Layers,
  headphones: Headphones,
} as const;

export function DifferentialsSection() {
  return (
    <section
      id="diferenciais"
      className="scroll-mt-20 py-16 lg:py-24 bg-surface"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-12 gap-8 lg:gap-10 items-center">
          <div className="col-span-12 lg:col-span-5">
            <span className="inline-flex items-center px-3 py-1 rounded-md bg-accent text-dark text-xs font-bold uppercase tracking-[0.12em]">
              {differentialsConfig.eyebrow}
            </span>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold uppercase text-dark leading-[0.95] tracking-tight mt-4">
              {differentialsConfig.title}
            </h2>
            <p className="text-sm sm:text-base text-muted leading-relaxed mt-4">
              {differentialsConfig.description}
            </p>
            <div className="mt-6">
              <a
                href="#orcamento"
                className="min-h-[48px] px-6 rounded-[10px] bg-dark hover:bg-accent text-white hover:text-dark font-semibold text-sm inline-flex items-center gap-2 transition-colors cursor-pointer"
              >
                <span>Falar com atendimento</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-7">
            <div className="rounded-[12px] overflow-hidden border border-line bg-white">
              <img
                src={differentialsConfig.sceneImage}
                alt={differentialsConfig.sceneImageAlt}
                decoding="async"
                className="w-full h-64 sm:h-80 lg:h-[340px] object-cover"
              />
              <div className="bg-dark text-white px-5 py-3.5 flex items-center justify-between gap-4">
                <span className="text-xs sm:text-sm font-medium text-surface">
                  {differentialsConfig.sceneCaption}
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-accent shrink-0" aria-hidden="true" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-5 mt-10">
          {differentialsConfig.items.map((item) => {
            const Icon = iconMap[item.icon];
            return (
              <article
                key={item.title}
                className="col-span-12 sm:col-span-6 lg:col-span-3 bg-white border border-line rounded-[12px] p-6"
              >
                <div className="w-11 h-11 rounded-[10px] bg-surface border border-line flex items-center justify-center text-dark">
                  <Icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <h3 className="font-display text-2xl font-bold uppercase text-dark mt-4 leading-tight">
                  {item.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed mt-2">
                  {item.description}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
