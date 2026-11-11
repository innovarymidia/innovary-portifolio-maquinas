import { CheckCircle2, MessageSquare, ArrowRight } from 'lucide-react';
import {
  equipmentCategories,
  fleetEquipments,
  type CategoryId,
  type EquipmentItem,
} from '../config/catalog';
import { companyConfig } from '../config/company';
import { buildQuoteMessage, buildWhatsAppUrl } from '../lib/quote';
import { trackEvent } from '../lib/analytics';

interface FleetSectionProps {
  activeCategory: CategoryId | 'all';
  onChangeCategory: (categoryId: CategoryId | 'all') => void;
  selectedEquipmentId: string;
  onSelectEquipment: (item: EquipmentItem) => void;
}

export function FleetSection({
  activeCategory,
  onChangeCategory,
  selectedEquipmentId,
  onSelectEquipment,
}: FleetSectionProps) {
  const filteredEquipments =
    activeCategory === 'all'
      ? fleetEquipments
      : fleetEquipments.filter((item) => item.categoryId === activeCategory);

  const categoryMap = new Map(equipmentCategories.map((c) => [c.id, c.shortTitle]));

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
    <section id="frota" className="scroll-mt-20 py-16 lg:py-24 bg-white border-y border-[#D6D9DE]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-12 gap-6 items-end">
          <div className="col-span-12 lg:col-span-7">
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#656B73]">
              CATÁLOGO TÉCNICO DA FROTA
            </p>
            <h2 className="font-display text-4xl sm:text-5xl font-extrabold uppercase text-[#25272B] leading-[0.95] tracking-tight mt-2">
              MÁQUINAS E EQUIPAMENTOS DISPONÍVEIS
            </h2>
          </div>
          <div className="col-span-12 lg:col-span-5">
            <p className="text-sm sm:text-base text-[#656B73] leading-relaxed">
              Clique em qualquer máquina para carregar automaticamente a referência no formulário de orçamento ou iniciar atendimento direto no WhatsApp.
            </p>
          </div>
        </div>

        {/* Barra de filtros por categoria */}
        <div
          className="mt-8 flex flex-wrap gap-2.5"
          role="tablist"
          aria-label="Filtrar frota por categoria"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeCategory === 'all'}
            onClick={() => onChangeCategory('all')}
            className={`min-h-[48px] px-4 rounded-[10px] text-sm font-medium border transition-colors cursor-pointer inline-flex items-center gap-2 ${
              activeCategory === 'all'
                ? 'bg-[#25272B] text-white border-[#25272B]'
                : 'bg-[#F2F3F5] text-[#25272B] border-[#D6D9DE] hover:border-[#25272B]'
            }`}
          >
            {activeCategory === 'all' && (
              <span className="w-2 h-2 rounded-full bg-[#F3B51B]" aria-hidden="true" />
            )}
            <span>Toda a Frota ({fleetEquipments.length})</span>
          </button>

          {equipmentCategories.map((cat) => {
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
                    : 'bg-[#F2F3F5] text-[#25272B] border-[#D6D9DE] hover:border-[#25272B]'
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

        {/* Grid de equipamentos individuais */}
        <div className="grid grid-cols-12 gap-6 mt-8">
          {filteredEquipments.map((item) => {
            const isSelected = selectedEquipmentId === item.id;
            const autoMessage = buildQuoteMessage({
              equipmentLabel: item.name,
              equipmentCode: item.code,
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
                      {categoryMap.get(item.categoryId) ?? item.categoryId}
                    </span>
                    <span className="text-xs font-mono font-medium text-[#656B73]">
                      REF. {item.code}
                    </span>
                  </div>

                  <div className="h-44 sm:h-48 my-4 flex items-center justify-center bg-white overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.imageAlt}
                      loading="lazy"
                      className="max-h-full w-auto object-contain transition-transform duration-300 group-hover:scale-[1.03]"
                    />
                  </div>

                  <h3 className="font-display text-2xl font-bold uppercase text-[#25272B] leading-tight">
                    {item.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#656B73] mt-1 leading-relaxed">
                    {item.subtitle}
                  </p>

                  <dl className="mt-4 pt-3 border-t border-[#D6D9DE] space-y-1.5 text-xs">
                    {item.specs.map((spec) => (
                      <div key={spec.label} className="flex items-center justify-between gap-2">
                        <dt className="text-[#656B73]">{spec.label}</dt>
                        <dd className="font-semibold text-[#25272B] text-right">{spec.value}</dd>
                      </div>
                    ))}
                    <div className="flex items-center justify-between gap-2 pt-1">
                      <dt className="text-[#656B73]">Modalidade</dt>
                      <dd className="font-medium text-[#25272B] inline-flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#25272B]" aria-hidden="true" />
                        <span>{item.modality}</span>
                      </dd>
                    </div>
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
                    <span>{isSelected ? 'Selecionada no Orçamento' : 'Orçar Máquina'}</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </button>

                  <a
                    href={whatsAppUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackEvent('whatsapp_click', {
                        location: 'fleet_card',
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

          {activeCategory === 'all' && (
            <div className="col-span-12 sm:col-span-6 lg:col-span-4 bg-[#25272B] text-white rounded-[12px] p-6 border border-[#25272B] flex flex-col justify-between">
              <div>
                <span className="inline-flex items-center px-2.5 py-1 rounded bg-[#F3B51B] text-[#25272B] text-xs font-bold uppercase tracking-wider">
                  SOB CONSULTA
                </span>
                <h3 className="font-display text-3xl font-extrabold uppercase text-white mt-5 leading-[0.98]">
                  OUTROS PORTES E IMPLEMENTOS ESPECIAIS
                </h3>
                <p className="text-sm text-[#D6D9DE] mt-3 leading-relaxed">
                  Precisa de retroescavadeira, plataforma tesoura, rompedor hidráulico, caminhão pipa ou outra tonelagem específica?
                </p>
                <ul className="mt-5 space-y-2 text-xs text-[#D6D9DE]">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F3B51B]" aria-hidden="true" />
                    <span>Dimensionamento de frota para obras completas</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F3B51B]" aria-hidden="true" />
                    <span>Condições especiais para contratos mensais</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F3B51B]" aria-hidden="true" />
                    <span>Atendimento consultivo direto</span>
                  </li>
                </ul>
              </div>

              <a
                href="#orcamento"
                onClick={() => trackEvent('cta_click', { location: 'fleet_custom_card' })}
                className="mt-6 min-h-[48px] px-4 rounded-[8px] bg-[#F3B51B] hover:bg-[#E0A310] text-[#25272B] font-semibold text-sm inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <span>Solicitar Especificação</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
