import { useMemo, useState, type FormEvent } from 'react';
import {
  Check,
  Clock,
  Copy,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
} from 'lucide-react';
import { equipmentCategories, fleetEquipments } from '../config/catalog';
import { companyConfig } from '../config/company';
import { rentalPeriods } from '../config/sections';
import { formatBrazilianPhone, isValidBrazilianPhone } from '../lib/phone';
import { buildQuoteMessage, buildWhatsAppUrl } from '../lib/quote';
import { trackEvent } from '../lib/analytics';

interface QuoteSectionProps {
  selectedEquipmentId: string;
  onChangeSelectedEquipment: (equipmentId: string) => void;
}

export function QuoteSection({
  selectedEquipmentId,
  onChangeSelectedEquipment,
}: QuoteSectionProps) {
  const [requesterName, setRequesterName] = useState('');
  const [phone, setPhone] = useState('');
  const [period, setPeriod] = useState<string>(rentalPeriods[1]);
  const [city, setCity] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<{ name?: string; phone?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const selectedEquipment = useMemo(
    () => fleetEquipments.find((eq) => eq.id === selectedEquipmentId),
    [selectedEquipmentId]
  );

  const selectedCategory = useMemo(
    () =>
      equipmentCategories.find(
        (cat) => `cat:${cat.id}` === selectedEquipmentId
      ),
    [selectedEquipmentId]
  );

  const equipmentLabel = selectedEquipment
    ? selectedEquipment.name
    : selectedCategory
      ? `Categoria: ${selectedCategory.shortTitle}`
      : 'Locação de Equipamento (a definir)';

  const liveMessage = useMemo(
    () =>
      buildQuoteMessage({
        equipmentLabel,
        equipmentCode: selectedEquipment?.code,
        period,
        city,
        requesterName,
        phone,
        notes,
      }),
    [equipmentLabel, selectedEquipment?.code, period, city, requesterName, phone, notes]
  );

  const directWhatsAppUrl = buildWhatsAppUrl(
    companyConfig.contact.whatsappDigits,
    liveMessage
  );

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const nextErrors: { name?: string; phone?: string } = {};

    if (requesterName.trim().length < 2) {
      nextErrors.name = 'Informe seu nome completo ou nome da empresa.';
    }
    if (!isValidBrazilianPhone(phone)) {
      nextErrors.phone = 'Informe um telefone ou WhatsApp válido com DDD.';
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    try {
      if (companyConfig.formWebhookUrl) {
        await fetch(companyConfig.formWebhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            requesterName: requesterName.trim(),
            phone,
            equipmentLabel,
            equipmentCode: selectedEquipment?.code ?? '',
            period,
            city: city.trim(),
            notes: notes.trim(),
            message: liveMessage,
          }),
        });
      }
    } catch {
      // Mantem o fluxo do usuario funcional via handoff direto caso o webhook falhe
    } finally {
      setIsSubmitting(false);
    }

    trackEvent('generate_lead', {
      equipment_id: selectedEquipmentId || 'unspecified',
      equipment_name: equipmentLabel,
      period,
    });
    setSubmittedMessage(liveMessage);
  };

  const handleCopy = async () => {
    if (!submittedMessage || typeof navigator === 'undefined' || !navigator.clipboard) {
      return;
    }
    try {
      await navigator.clipboard.writeText(submittedMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Clipboard indisponivel em contexto nao seguro
    }
  };

  return (
    <section
      id="orcamento"
      className="scroll-mt-20 py-16 lg:py-24 bg-white border-t border-[#D6D9DE]"
    >
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="bg-[#25272B] rounded-[12px] border border-[#25272B] overflow-hidden grid grid-cols-12">
          {/* Coluna Esquerda: CTA Final + Canais Diretos */}
          <div className="col-span-12 lg:col-span-5 p-7 sm:p-10 text-white flex flex-col justify-between gap-8">
            <div>
              <span className="inline-flex items-center px-3 py-1 rounded-md bg-[#F3B51B] text-[#25272B] text-xs font-bold uppercase tracking-[0.12em]">
                ORÇAMENTO COMERCIAL
              </span>
              <h2 className="font-display text-4xl sm:text-5xl font-extrabold uppercase text-white leading-[0.95] tracking-tight mt-4">
                SOLICITE DISPONIBILIDADE PARA SUA OBRA
              </h2>
              <p className="text-sm sm:text-base text-[#D6D9DE] leading-relaxed mt-3">
                Preencha os dados ao lado ou envie sua solicitação diretamente pelo WhatsApp já com a identificação do equipamento selecionado.
              </p>

              <div className="mt-6 rounded-[10px] border border-[#F3B51B]/50 bg-white/5 p-4">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#F3B51B]">
                  Equipamento identificado na solicitação
                </p>
                <p className="font-display text-2xl font-bold uppercase text-white mt-1">
                  {equipmentLabel}
                </p>
                {selectedEquipment && (
                  <p className="text-xs text-[#D6D9DE] mt-0.5">
                    Código de referência: {selectedEquipment.code} • {selectedEquipment.modality}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-4">
              <div className="space-y-2.5 text-sm text-[#D6D9DE]">
                <a
                  href={companyConfig.contact.phoneHref}
                  onClick={() => trackEvent('phone_click', { location: 'quote_panel' })}
                  className="flex items-center gap-3 hover:text-white transition-colors min-h-[40px]"
                >
                  <Phone className="w-4 h-4 text-[#F3B51B] shrink-0" aria-hidden="true" />
                  <span>{companyConfig.contact.phoneDisplay}</span>
                </a>

                <a
                  href={`mailto:${companyConfig.contact.email}`}
                  className="flex items-center gap-3 hover:text-white transition-colors min-h-[40px]"
                >
                  <Mail className="w-4 h-4 text-[#F3B51B] shrink-0" aria-hidden="true" />
                  <span>{companyConfig.contact.email}</span>
                </a>

                <div className="flex items-center gap-3 min-h-[40px]">
                  <MapPin className="w-4 h-4 text-[#F3B51B] shrink-0" aria-hidden="true" />
                  <span>{companyConfig.contact.cityRegion}</span>
                </div>

                <div className="flex items-center gap-3 min-h-[40px]">
                  <Clock className="w-4 h-4 text-[#F3B51B] shrink-0" aria-hidden="true" />
                  <span>{companyConfig.contact.businessHours}</span>
                </div>
              </div>

              <a
                href={directWhatsAppUrl}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() =>
                  trackEvent('whatsapp_click', {
                    location: 'quote_panel',
                    equipment_name: equipmentLabel,
                  })
                }
                className="min-h-[48px] w-full px-5 rounded-[10px] bg-[#F3B51B] hover:bg-[#E0A310] text-[#25272B] font-semibold text-sm inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MessageSquare className="w-4 h-4" aria-hidden="true" />
                <span>Enviar Orçamento via WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Coluna Direita: Formulario Estruturado */}
          <div className="col-span-12 lg:col-span-7 bg-white p-6 sm:p-10 m-2 sm:m-3 rounded-[10px]">
            {submittedMessage ? (
              <div className="h-full flex flex-col justify-between gap-6" role="status" aria-live="polite">
                <div>
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-[#F3B51B] text-[#25272B] text-xs font-bold uppercase tracking-wider">
                    <Check className="w-4 h-4" aria-hidden="true" />
                    Solicitação preparada com sucesso
                  </span>
                  <h3 className="font-display text-3xl font-extrabold uppercase text-[#25272B] mt-4">
                    MENSAGEM DE ORÇAMENTO GERADA
                  </h3>
                  <p className="text-sm text-[#656B73] mt-2 leading-relaxed">
                    Sua solicitação já inclui a identificação técnica do equipamento selecionado. Envie agora pelo WhatsApp ou copie os dados abaixo.
                  </p>

                  <pre className="mt-5 p-4 rounded-[10px] bg-[#F2F3F5] border border-[#D6D9DE] text-xs sm:text-sm text-[#25272B] font-sans whitespace-pre-wrap leading-relaxed">
                    {submittedMessage}
                  </pre>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href={buildWhatsAppUrl(
                      companyConfig.contact.whatsappDigits,
                      submittedMessage
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() =>
                      trackEvent('whatsapp_click', {
                        location: 'quote_submitted',
                        equipment_name: equipmentLabel,
                      })
                    }
                    className="flex-1 min-h-[48px] px-5 rounded-[10px] bg-[#F3B51B] hover:bg-[#E0A310] text-[#25272B] font-semibold text-sm inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <MessageSquare className="w-4 h-4" aria-hidden="true" />
                    <span>Enviar pelo WhatsApp</span>
                  </a>

                  <button
                    type="button"
                    onClick={handleCopy}
                    className="min-h-[48px] px-5 rounded-[10px] border border-[#D6D9DE] hover:border-[#25272B] bg-white text-[#25272B] font-semibold text-sm inline-flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    {copied ? (
                      <>
                        <Check className="w-4 h-4" aria-hidden="true" />
                        <span>Copiado</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4" aria-hidden="true" />
                        <span>Copiar Mensagem</span>
                      </>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setSubmittedMessage(null)}
                    className="min-h-[48px] px-4 rounded-[10px] bg-[#F2F3F5] hover:bg-[#D6D9DE] text-[#25272B] font-medium text-sm cursor-pointer"
                  >
                    Editar
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="quote-name"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#25272B] mb-1.5"
                    >
                      Nome ou Empresa *
                    </label>
                    <input
                      id="quote-name"
                      type="text"
                      required
                      value={requesterName}
                      onChange={(e) => {
                        setRequesterName(e.target.value);
                        if (errors.name) setErrors((prev) => ({ ...prev, name: undefined }));
                      }}
                      placeholder="Ex.: Construtora / Eng. Responsável"
                      className="w-full min-h-[48px] px-3.5 rounded-[8px] border border-[#D6D9DE] bg-white text-sm text-[#25272B] placeholder:text-[#656B73]/70 focus:outline-none focus:border-[#25272B] focus:ring-2 focus:ring-[#F3B51B]/50"
                    />
                    {errors.name && (
                      <p className="text-xs font-medium text-red-700 mt-1" role="alert">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="quote-phone"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#25272B] mb-1.5"
                    >
                      Telefone / WhatsApp *
                    </label>
                    <input
                      id="quote-phone"
                      type="tel"
                      inputMode="tel"
                      required
                      maxLength={15}
                      value={phone}
                      onChange={(e) => {
                        setPhone(formatBrazilianPhone(e.target.value));
                        if (errors.phone) setErrors((prev) => ({ ...prev, phone: undefined }));
                      }}
                      placeholder="(11) 98765-4321"
                      className="w-full min-h-[48px] px-3.5 rounded-[8px] border border-[#D6D9DE] bg-white text-sm text-[#25272B] placeholder:text-[#656B73]/70 focus:outline-none focus:border-[#25272B] focus:ring-2 focus:ring-[#F3B51B]/50"
                    />
                    {errors.phone && (
                      <p className="text-xs font-medium text-red-700 mt-1" role="alert">
                        {errors.phone}
                      </p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="quote-equipment"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#25272B] mb-1.5"
                    >
                      Equipamento Selecionado
                    </label>
                    <select
                      id="quote-equipment"
                      value={selectedEquipmentId}
                      onChange={(e) => onChangeSelectedEquipment(e.target.value)}
                      className="w-full min-h-[48px] px-3.5 rounded-[8px] border border-[#D6D9DE] bg-white text-sm text-[#25272B] focus:outline-none focus:border-[#25272B] focus:ring-2 focus:ring-[#F3B51B]/50 cursor-pointer"
                    >
                      <option value="">Definir com suporte técnico</option>
                      <optgroup label="Equipamentos Individuais">
                        {fleetEquipments.map((item) => (
                          <option key={item.id} value={item.id}>
                            {item.name} ({item.code})
                          </option>
                        ))}
                      </optgroup>
                      <optgroup label="Por Categoria">
                        {equipmentCategories.map((cat) => (
                          <option key={cat.id} value={`cat:${cat.id}`}>
                            {cat.shortTitle}
                          </option>
                        ))}
                      </optgroup>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="quote-period"
                      className="block text-xs font-semibold uppercase tracking-wider text-[#25272B] mb-1.5"
                    >
                      Prazo Estimado
                    </label>
                    <select
                      id="quote-period"
                      value={period}
                      onChange={(e) => setPeriod(e.target.value)}
                      className="w-full min-h-[48px] px-3.5 rounded-[8px] border border-[#D6D9DE] bg-white text-sm text-[#25272B] focus:outline-none focus:border-[#25272B] focus:ring-2 focus:ring-[#F3B51B]/50 cursor-pointer"
                    >
                      {rentalPeriods.map((item) => (
                        <option key={item} value={item}>
                          {item}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="quote-city"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#25272B] mb-1.5"
                  >
                    Cidade / Local da Obra
                  </label>
                  <input
                    id="quote-city"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Informe município, bairro ou rodovia"
                    className="w-full min-h-[48px] px-3.5 rounded-[8px] border border-[#D6D9DE] bg-white text-sm text-[#25272B] placeholder:text-[#656B73]/70 focus:outline-none focus:border-[#25272B] focus:ring-2 focus:ring-[#F3B51B]/50"
                  />
                </div>

                <div>
                  <label
                    htmlFor="quote-notes"
                    className="block text-xs font-semibold uppercase tracking-wider text-[#25272B] mb-1.5"
                  >
                    Detalhes da Operação (Opcional)
                  </label>
                  <textarea
                    id="quote-notes"
                    rows={2}
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Ex.: necessidade de operador, tipo de solo, altura de trabalho ou data prevista"
                    className="w-full px-3.5 py-2.5 rounded-[8px] border border-[#D6D9DE] bg-white text-sm text-[#25272B] placeholder:text-[#656B73]/70 focus:outline-none focus:border-[#25272B] focus:ring-2 focus:ring-[#F3B51B]/50"
                  />
                </div>

                {/* Preview automatico com identificacao do equipamento */}
                <div className="rounded-[8px] bg-[#F2F3F5] border border-[#D6D9DE] p-3.5">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-[#656B73]">
                    Mensagem automática identificada
                  </p>
                  <p className="text-xs text-[#25272B] mt-1 whitespace-pre-line leading-relaxed">
                    {liveMessage}
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="min-h-[48px] w-full px-6 rounded-[10px] bg-[#25272B] hover:bg-[#F3B51B] text-white hover:text-[#25272B] font-semibold text-sm inline-flex items-center justify-center gap-2 transition-colors cursor-pointer disabled:opacity-60"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                  <span>
                    {isSubmitting ? 'Preparando solicitação...' : 'Solicitar Orçamento Técnico'}
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
