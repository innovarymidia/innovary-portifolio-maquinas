import { useMemo } from 'react';
import { ArrowRight, MessageSquare, Search, X } from 'lucide-react';
import {
  categoryLibrary,
  equipmentCatalog,
  type CategoryId,
  type EquipmentItem,
} from '../config/catalog';
import { companyConfig } from '../config/company';
import { catalogSectionConfig } from '../config/sections';
import { templateConfig } from '../config/template';
import { trackEvent } from '../lib/analytics';
import { filterCatalogEquipments } from '../lib/catalogFilter';
import { buildQuoteMessage, buildWhatsAppUrl } from '../lib/quote';

interface CatalogSectionProps {
  activeCategory: CategoryId | 'all';
  onChangeCategory: (categoryId: CategoryId | 'all') => void;
  searchQuery: string;
  onChangeSearchQuery: (query: string) => void;
  selectedEquipmentId: string;
  onSelectEquipment: (item: EquipmentItem) => void;
}

export function CatalogSection({
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
        templateConfig.enabledCategoryIds.includes(cat.id)
      ),
    []
  );

  const categoryNameMap = useMemo(
    () => new Map(enabledCategories.map((c) => [c.id, c.shortTitle])),
    [enabledCategories]
  );

  const filteredItems = useMemo(
    () =>
      filterCatalogEquipments({
        items: equipmentCatalog,
        enabledCategoryIds: templateConfig.enabledCategoryIds,
        activeCategory,
        searchQuery,
      }),
    [activeCategory, searchQuery]
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
    <section id="catalogo" className="scroll-mt-20 py-16 lg:py-24 bg-white border-y border-[#D6D9DE]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 lg:col-span-7">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#656B73]">
              {catalogSectionConfig.eyebrow}
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold uppercase text-[#25272B] leading-[0.95] tracking-tight mt-2">
              {catalogSectionConfig.title}
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-5">
            <p className="text-sm sm:text-base text-[#656B73] leading-relaxed">
              {catalogSectionConfig.subtitle}
            </p>
          </div>
        </div>

        {/* Busca + Filtros por categoria */}
        <div className="mt-8 bg-[#F2F3F5] border border-[#D6D9DE] rounded-[12px] p-4 sm:p-5 space-y-4">
          {templateConfig.catalog.allowSearch && (
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="relative flex-1">
                <label htmlFor="catalog-search" className="sr-only">
                  Buscar equipamento por nome, marca ou aplicação
                </label>
                <Search
                  className="w-4 h-4 text-[#656B73] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  id="catalog-search"
                  type="search"
                  value={searchQuery}
                  onChange={(e) => onChangeSearchQuery(e.target.value)}
                  placeholder="Buscar por equipamento, marca ou aplicação (ex.: betoneira, martelete, Wacker, 400L)..."
                  className="w-full min-h-[48px] pl-10 pr-10 rounded-[10px] bg-white border border-[#D6D9DE] text-sm text-[#25272B] placeholder:text-[#656B73]/80 focus:outline-none focus:border-[#25272B] focus:ring-2 focus:ring-[#F3B51B]/50"
                />
                {searchQuery && (
                  <button
                    type="button"
                    onClick={() => onChangeSearchQuery('')}
                    aria-label="Limpar busca"
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-md flex items-center justify-center text-[#656B73] hover:text-[#25272B] cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>

              <p className="text-xs font-semibold text-[#656B73] shrink-0">
                {filteredItems.length}{' '}
                {filteredItems.length === 1 ? 'equipamento encontrado' : 'equipamentos encontrados'}
              </p>
            </div>
          )}

          <div
            className="flex flex-wrap gap-2"
            role="tablist"
            aria-label="Filtrar catálogo por categoria"
          >
            <button
              type="button"
              role="tab"
              aria-selected={activeCategory === 'all'}
              onClick={() => onChangeCategory('all')}
              className={`min-h-[48px] px-4 rounded-[10px] text-sm font-medium border transition-colors cursor-pointer inline-flex items-center gap-2 ${
                activeCategory === 'all'
                  ? 'bg-[#25272B] text-white border-[#25272B]'
                  : 'bg-white text-[#25272B] border-[#D6D9DE] hover:border-[#25272B]'
              }`}
            >
              {activeCategory === 'all' && (
                <span className="w-2 h-2 rounded-full bg-[#F3B51B]" aria-hidden="true" />
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
                  className={`min-h-[48px] px-4 rounded-[10px] text-sm font-medium border transition-colors cursor-pointer inline-flex items-center gap-2 ${
                    isActive
                      ? 'bg-[#25272B] text-white border-[#25272B]'
                      : 'bg-white text-[#25272B] border-[#D6D9DE] hover:border-[#25272B]'
                  }`}
                >
                  {isActive && (
                    <span className="w-2 h-2 rounded-full bg-[#F3B51B]" aria-hidden="true" />
                  )}
                  <span>{cat.shortTitle}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Lista de produtos ou estado vazio */}
        {filteredItems.length === 0 ? (
          <div className="mt-8 bg-[#F2F3F5] border border-[#D6D9DE] rounded-[12px] p-8 text-center">
            <p className="font-display text-2xl font-bold uppercase text-[#25272B]">
              NENHUM EQUIPAMENTO ENCONTRADO PARA ESSA BUSCA
            </p>
            <p className="text-sm text-[#656B73] mt-2">
              Limpe o filtro ou envie uma solicitação informando o equipamento que sua obra precisa.
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-3">
              <button
                type="button"
                onClick={() => {
                  onChangeCategory('all');
                  onChangeSearchQuery('');
                }}
                className="min-h-[48px] px-5 rounded-[10px] bg-white border border-[#D6D9DE] hover:border-[#25272B] text-sm font-semibold text-[#25272B] cursor-pointer"
              >
                Mostrar todo o catálogo
              </button>
              <a
                href="#orcamento"
                className="min-h-[48px] px-5 rounded-[10px] bg-[#F3B51B] hover:bg-[#E0A310] text-sm font-semibold text-[#25272B] inline-flex items-center gap-2 cursor-pointer"
              >
                <span>Consultar estoque no orçamento</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-12 gap-6 mt-8">
            {filteredItems.map((item) => {
              const isSelected = selectedEquipmentId === item.id;
              const autoMessage = buildQuoteMessage({
                equipmentLabel: item.name,
                equipmentCode: item.code,
                brand: item.brand,
              });
              const whatsAppUrl = buildWhatsAppUrl(
                companyConfig.contact.whatsappDigits,
                autoMessage
              );

              return (
                <article
                  key={item.id}
                  onClick={() => handleRequestQuote(item)}
                  className={`col-span-12 sm:col-span-6 lg:col-span-4 bg-white rounded-[12px] p-5 border flex flex-col justify-between transition-colors duration-200 cursor-pointer group ${
                    isSelected
                      ? 'border-[#F3B51B] ring-2 ring-[#F3B51B]'
                      : 'border-[#D6D9DE] hover:border-[#25272B]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2">
                      <span className="inline-flex items-center px-2.5 py-1 rounded bg-[#F2F3F5] text-[#25272B] text-xs font-semibold">
                        {categoryNameMap.get(item.categoryId) ?? item.categoryId}
                      </span>
                      <span className="text-xs font-mono font-medium text-[#656B73]">
                        REF. {item.code}
                      </span>
                    </div>

                    <div className="h-44 my-4 flex items-center justify-center bg-white overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.imageAlt}
                        loading="lazy"
                        className="max-h-full w-auto object-contain transition-transform duration-300 group-hover:scale-[1.04]"
                      />
                    </div>

                    <h3 className="font-display text-2xl font-bold uppercase text-[#25272B] leading-tight">
                      {item.name}
                    </h3>

                    <dl className="mt-4 pt-3 border-t border-[#D6D9DE] space-y-1.5 text-xs">
                      <div className="flex items-center justify-between gap-2">
                        <dt className="text-[#656B73]">Marca</dt>
                        <dd className="font-semibold text-[#25272B] text-right">{item.brand}</dd>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <dt className="text-[#656B73]">Especificação</dt>
                        <dd className="font-semibold text-[#25272B] text-right max-w-[65%]">
                          {item.specification}
                        </dd>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <dt className="text-[#656B73]">Cobrança</dt>
                        <dd className="font-medium text-[#25272B] text-right">{item.billingUnit}</dd>
                      </div>
                      <div className="flex items-center justify-between gap-2">
                        <dt className="text-[#656B73]">Disponibilidade</dt>
                        <dd className="font-medium text-[#25272B] text-right">{item.availability}</dd>
                      </div>
                      {templateConfig.catalog.showOptionalPrice && item.optionalPrice && (
                        <div className="flex items-center justify-between gap-2 pt-1 border-t border-[#D6D9DE]/60">
                          <dt className="text-[#656B73]">Referência</dt>
                          <dd className="font-bold text-[#25272B] text-right">
                            {item.optionalPrice}
                          </dd>
                        </div>
                      )}
                    </dl>
                  </div>

                  <div
                    className="mt-5 flex flex-col sm:flex-row gap-2.5"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <button
                      type="button"
                      onClick={() => handleRequestQuote(item)}
                      className="flex-1 min-h-[48px] px-4 rounded-[8px] bg-[#F3B51B] hover:bg-[#E0A310] text-[#25272B] font-semibold text-sm inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>{isSelected ? 'Selecionado' : 'Solicitar locação'}</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
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
                      className="min-h-[48px] px-4 rounded-[8px] border border-[#D6D9DE] hover:border-[#25272B] bg-white text-[#25272B] font-medium text-sm inline-flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <MessageSquare className="w-4 h-4" aria-hidden="true" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </article>
              );
            })}

            {activeCategory === 'all' && !searchQuery.trim() && (
              <div className="col-span-12 sm:col-span-6 lg:col-span-4 bg-[#25272B] text-white rounded-[12px] p-6 border border-[#25272B] flex flex-col justify-between">
                <div>
                  <span className="inline-flex items-center px-2.5 py-1 rounded bg-[#F3B51B] text-[#25272B] text-xs font-bold uppercase tracking-wider">
                    CATÁLOGO MODULAR
                  </span>
                  <h3 className="font-display text-3xl font-extrabold uppercase text-white mt-5 leading-[0.98]">
                    OUTROS EQUIPAMENTOS E ACESSÓRIOS
                  </h3>
                  <p className="text-sm text-[#D6D9DE] mt-3 leading-relaxed">
                    Procurando serra mármore, lixadeira, vibrador de concreto, escoras específicas ou módulos e containers?
                  </p>
                  <ul className="mt-5 space-y-2 text-xs text-[#D6D9DE]">
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F3B51B]" aria-hidden="true" />
                      <span>Consulta rápida de estoque e voltagem</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F3B51B]" aria-hidden="true" />
                      <span>Diária, semanal ou mensal sob medida</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#F3B51B]" aria-hidden="true" />
                      <span>Atendimento direto pelo WhatsApp</span>
                    </li>
                  </ul>
                </div>

                <a
                  href="#orcamento"
                  onClick={() => trackEvent('cta_click', { location: 'catalog_custom_card' })}
                  className="mt-6 min-h-[48px] px-4 rounded-[8px] bg-[#F3B51B] hover:bg-[#E0A310] text-[#25272B] font-semibold text-sm inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
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
