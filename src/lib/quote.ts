export interface QuotePayload {
  equipmentLabel: string;
  equipmentCode?: string;
  brand?: string;
  requesterName?: string;
  phone?: string;
  period?: string;
  city?: string;
  notes?: string;
}

/**
 * Gera uma mensagem comercial estruturada identificando automaticamente
 * o equipamento selecionado, marca/referencia e os dados da solicitacao.
 */
export function buildQuoteMessage(payload: QuotePayload): string {
  const lines: string[] = [
    'Ola! Gostaria de solicitar um orcamento de locacao.',
  ];

  const metaParts: string[] = [];
  if (payload.brand?.trim()) metaParts.push(payload.brand.trim());
  if (payload.equipmentCode?.trim()) metaParts.push(`Ref.: ${payload.equipmentCode.trim()}`);

  const equipmentText =
    metaParts.length > 0
      ? `${payload.equipmentLabel.trim()} (${metaParts.join(' • ')})`
      : payload.equipmentLabel.trim();

  if (equipmentText) {
    lines.push(`Equipamento: ${equipmentText}`);
  }
  if (payload.period?.trim()) {
    lines.push(`Periodo de locacao: ${payload.period.trim()}`);
  }
  if (payload.city?.trim()) {
    lines.push(`Cidade / Local da obra: ${payload.city.trim()}`);
  }
  if (payload.requesterName?.trim()) {
    lines.push(`Solicitante: ${payload.requesterName.trim()}`);
  }
  if (payload.phone?.trim()) {
    lines.push(`Telefone: ${payload.phone.trim()}`);
  }
  if (payload.notes?.trim()) {
    lines.push(`Observacoes: ${payload.notes.trim()}`);
  }

  return lines.join('\n');
}

/**
 * Gera a URL oficial do WhatsApp (wa.me) com DDI e mensagem codificada com seguranca.
 * Retorna `#orcamento` caso nao haja numero configurado valido.
 */
export function buildWhatsAppUrl(rawPhoneNumber: string, message: string): string {
  const digits = rawPhoneNumber.replace(/\D/g, '');
  if (digits.length < 10) {
    return '#orcamento';
  }
  const normalized = digits.startsWith('55') ? digits : `55${digits}`;
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${normalized}?text=${encoded}`;
}
