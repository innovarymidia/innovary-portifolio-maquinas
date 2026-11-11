import { useMemo } from 'react';
import { ArrowRight, MessageSquare, Search, X } from 'lucide-react';
import {
  categoryLibrary,
  equipmentCatalog,
  type CategoryId,
  type EquipmentItem,
} from '../config/catalog';
import type { CompanyConfig } from '../config/company';
import { catalogSectionConfig } from '../config/sections';
import type { TemplateConfig } from '../config/template';
import { trackEvent } from '../lib/analytics';
import { filterCatalogEquipments } from '../lib/catalogFilter';
import { buildQuoteMessage, buildWhatsAppUrl } from '../lib/quote';

interface CatalogSectionProps {
  company: CompanyConfig;
  template: TemplateConfig;
  activeCategory: CategoryId | 'all';
  onChangeCategory: (categoryId: CategoryId | 'all') => void;
  searchQuery: string;
  onChangeSearchQuery: (query: string) => void;
  selectedEquipmentId: string;
  onSelectEquipment: (item: EquipmentItem) => void;
}

export function CatalogSection({
  company,
  template,
  activeCategory,
  onChangeCategory,
  searchQuery,
  onChangeSearchQuery,
  selectedEquipmentId,
  onSelectEquipment,
}: CatalogSectionProps) {
  const enabledCategories = useMemo(
    () =>
      categoryLibrary.filter((cat) =>
        template.enabledCategoryIds.includes(cat.id)
      ),
    [template.enabledCategoryIds]
  );

  const categoryNameMap = useMemo(
    () => new Map(enabledCategories.map((c) => [c.id, c.shortTitle])),
    [enabledCategories]
  );

  const filteredItems = useMemo(
    () =>
      filterCatalogEquipments({
        items: equipmentCatalog,
        enabledCategoryIds: template.enabledCategoryIds,
        activeCategory,
        searchQuery,
      }),
    [template.enabledCategoryIds, activeCategory, searchQuery]
  );

  const handleRequestQuote = (item: EquipmentItem) => {
    trackEvent('select_equipment', {
      equipment_id: item.id,
      equipment_code: item.code,
      equipment_name: item.name,
    });
    onSelectEquipment(item);
    const quoteSection = document.getElementById('orcamento');
    if (quoteSection) {
      quoteSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section id="catalogo" className="scroll-mt-16 sm:scroll-mt-20 py-12 sm:py-16 lg:py-24 bg-white border-y border-line">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-12 gap-4 sm:gap-6 items-end">
          <div className="col-span-12 lg:col-span-7">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-muted">
              {catalogSectionConfig.eyebrow}
            </p>
            <h2 className="font-display text-3xl sm:text-5xl font-extrabold uppercase text-dark leading-[0.95] tracking-tight mt-2">
              {catalogSectionConfig.title}
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-5">
            <p className="text-sm sm:text-base text-muted leading-relaxed">
              {catalogSectionConfig.subtitle}
            </p>
          </div>
        </div>

        <div className="mt-6 sm:mt-8 bg-surface border border-line rounded-[12px] p-3.5 sm:p-5 space-y-3 sm:space-y-4">
          {template.catalog.allowSearch && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 sm:gap-3">
              <div className="relative flex-1">
                <label htmlFor="catalog-search" className="sr-only">
                  Buscar equipamento por nome, marca ou aplicação
                </label>
                <Search
                  className="w-4 h-4 text-muted absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  id="catalog-search"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => onChangeSearchQuery(e.target.value)}
                  placeholder="Buscar equipamento, marca ou modelo..."
                  className="w-full min-h-[48px] pl-10 pr-10 rounded-[10px] bg-white border border-line text-sm text-dark placeholder:text-muted/80 focus:outline-none focus:border-dark focus:ring-2 focus:ring-accent/50"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => onChangeSearchQuery('')}
                    aria-label="Limpar busca"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-md flex items-center justify-center text-muted hover:text-dark cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <p className="text-xs font-semibold text-muted shrink-0">
                {filteredItems.length}{' '}
                {filteredItems.length === 1 ? 'equipamento encontrado' : 'equipamentos encontrados'}
              </p>
            </div>
          )}

          <div
            className="flex sm:flex-wrap gap-2 overflow-x-auto no-scrollbar pb-0.5 sm:pb-0"
            role="tablist"
            aria-label="Filtrar catálogo por categoria"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeCategory === 'all'}
              onClick={() => onChangeCategory('all')}
              className={`shrink-0 min-h-[44px] sm:min-h-[48px] px-4 rounded-[10px] text-xs sm:text-sm font-medium border transition-colors cursor-pointer inline-flex items-center gap-2 ${
                activeCategory === 'all'
                  ? 'bg-dark text-white border-dark'
                  : 'bg-white text-dark border-line hover:border-dark'
              }`}
            >
              {activeCategory === 'all' && (
                <span className="w-2 h-2 rounded-full bg-accent" aria-hidden="true" />
              )}
              <span>Todos</span>
            </button>

            {enabledCategories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => onChangeCategory(cat.id)}
                  className={`shrink-0 min-h-[44px] sm:min-h-[48px] px-4 rounded-[10px] text-xs sm:text-sm font-medium border transition-colors cursor-pointer inline-flex items-center gap-2 ${
                    isActive
                      ? 'bg-dark text-white border-dark'
                      : 'bg-white text-dark border-line hover:border-dark'
                  }`}
                >
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-accent" aria-hidden="true" />
                  )}
                  <span>{cat.shortTitle}</span>
                </button>
              );
            })}
          </div>
        </div>

        {filteredItems.length === 0 ? (
          <div className="mt-6 sm:mt-8 bg-surface border border-line rounded-[12px] p-6 sm:p-8 text-center">
            <p className="font-display text-2xl font-bold uppercase text-dark">
              NENHUM EQUIPAMENTO ENCONTRADO PARA ESSA BUSCA
            </p>
            <p className="text-sm text-muted mt-2">
              Limpe o filtro ou envie uma solicitação informando o equipamento que sua obra precisa.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  onChangeCategory('all');
                  onChangeSearchQuery('');
                }}
                className="min-h-[48px] px-5 rounded-[10px] bg-white border border-line hover:border-dark text-sm font-semibold text-dark cursor-pointer"
              >
                Mostrar todo o catálogo
              </button>
              <a
                href="#orcamento"
                className="min-h-[48px] px-5 rounded-[10px] bg-accent hover:bg-accent-hover text-sm font-semibold text-dark inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Consultar estoque no orçamento</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-12 gap-4 sm:gap-6 mt-6 sm:mt-8">
            {filteredItems.map((item) => {
              const isSelected = selectedEquipmentId === item.id;
              const autoMessage = buildQuoteMessage({
                equipmentLabel: item.name,
                equipmentCode: item.code,
                brand: item.brand,
              });
              const whatsAppUrl = buildWhatsAppUrl(
                company.contact.whatsappDigits,
                autoMessage
              );

              return (
                <article
                  key={item.id}
                  onClick={() => handleRequestQuote(item)}
                  className={`col-span-12 sm:col-span-6 lg:col-span-4 bg-white rounded-[12px] p-4 sm:p-5 border flex flex-col justify-between transition-colors duration-200 cursor-pointer group ${
                    isSelected
                      ? 'border-accent ring-2 ring-accent'
                      : 'border-line hover:border-dark'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center px-2.5 py-1 rounded bg-surface text-dark text-xs font-semibold">
                        {categoryNameMap.get(item.categoryId) ?? item.categoryId}
                      </span>
                      <span className="text-xs font-mono font-medium text-muted">
                        REF. {item.code}
                      </span>
                    </div>

                    <div className="h-36 sm:h-44 my-3 sm:my-4 flex items-center justify-center bg-white overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.imageAlt}
                        loading="lazy"
                        className="max-h-full w-auto object-contain transition-transform duration-300 group-hover:scale-[1.04]"
                      />
                    </div>

                    <h3 className="font-display text-2xl font-bold uppercase text-dark leading-tight">
                      {item.name}
                    </h3>

                    <dl className="mt-3 sm:mt-4 pt-3 border-t border-line space-y-2 text-xs">
                      <div className="flex items-center justify-between gap-3">
                        <dt className="text-muted shrink-0">Marca</dt>
                        <dd className="font-semibold text-dark text-right">{item.brand}</dd>
                      </div>
                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-0.5 sm:gap-3">
                        <dt className="text-muted shrink-0">Especificação</dt>
                        <dd className="font-semibold text-dark sm:text-right">
                          {item.specification}
                        </dd>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <dt className="text-muted shrink-0">Cobrança</dt>
                        <dd className="font-medium text-dark text-right">{item.billingUnit}</dd>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <dt className="text-muted shrink-0">Disponibilidade</dt>
                        <dd className="font-medium text-dark text-right">{item.availability}</dd>
                      </div>
                      {template.catalog.showOptionalPrice && item.optionalPrice && (
                        <div className="flex items-center justify-between gap-3 pt-1 border-t border-line/60">
                          <dt className="text-muted shrink-0">Referência</dt>
                          <dd className="font-bold text-dark text-right">
                            {item.optionalPrice}
                          </dd>
                        </div>
                      )}
                    </dl>
                  </div>

                  <div
                    className="mt-4 sm:mt-5 grid grid-cols-2 sm:flex sm:flex-row gap-2 sm:gap-2.5"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      onClick={() => handleRequestQuote(item)}
                      className="sm:flex-1 min-h-[48px] px-3 sm:px-4 rounded-[8px] bg-accent hover:bg-accent-hover text-dark font-semibold text-xs sm:text-sm inline-flex items-center justify-center gap-1 sm:gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>{isSelected ? 'Selecionado' : 'Orçar'}</span>
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
                    </button>

                    <a
                      href={whatsAppUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() =>
                        trackEvent('whatsapp_click', {
                          location: 'catalog_card',
                          equipment_code: item.code,
                        })
                      }
                      aria-label={`Solicitar ${item.name} via WhatsApp`}
                      className="min-h-[48px] px-3 sm:px-4 rounded-[8px] border border-line hover:border-dark bg-white text-dark font-medium text-xs sm:text-sm inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </article>
              );
            })}

            {activeCategory === 'all' && !searchQuery.trim() && (
              <div className="col-span-12 sm:col-span-6 lg:col-span-4 bg-dark text-white rounded-[12px] p-5 sm:p-6 border border-dark flex flex-col justify-between">
                <div>
                  <span className="inline-flex items-center px-2.5 py-1 rounded bg-accent text-dark text-xs font-bold uppercase tracking-wider">
                    CATÁLOGO MODULAR
                  </span>
                  <h3 className="font-display text-2xl sm:text-3xl font-extrabold uppercase text-white mt-4 sm:mt-5 leading-[0.98]">
                    OUTROS EQUIPAMENTOS E ACESSÓRIOS
                  </h3>
                  <p className="text-sm text-line mt-2.5 sm:mt-3 leading-relaxed">
                    Procurando serra mármore, lixadeira, vibrador de concreto, escoras específicas ou módulos e containers?
                  </p>
                  <ul className="mt-4 space-y-1.5 text-xs text-line">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
                      <span>Consulta rápida de estoque e voltagem</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
                      <span>Diária, semanal ou mensal sob medida</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" aria-hidden="true" />
                      <span>Atendimento direto pelo WhatsApp</span>
                    </li>
                  </ul>
                </div>

                <a
                  href="#orcamento"
                  onClick={() => trackEvent('cta_click', { location: 'catalog_custom_card' })}
                  className="mt-5 min-h-[48px] px-4 rounded-[8px] bg-accent hover:bg-accent-hover text-dark font-semibold text-sm inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>Consultar disponibilidade</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
