export interface QuotePayload {
  equipmentLabel: string;
  equipmentCode?: string;
  requesterName?: string;
  phone?: string;
  period?: string;
  city?: string;
  notes?: string;
}

/**
 * Gera uma mensagem comercial estruturada identificando automaticamente
 * o equipamento selecionado e os dados da solicitacao de orcamento.
 */
export function buildQuoteMessage(payload: QuotePayload): string {
  const lines: string[] = [
    'Ola! Gostaria de solicitar um orcamento de locacao.',
  ];

  const equipmentText = payload.equipmentCode
    ? `${payload.equipmentLabel} (Ref.: ${payload.equipmentCode})`
    : payload.equipmentLabel;

  if (equipmentText.trim()) {
    lines.push(`Equipamento: ${equipmentText.trim()}`);
  }
  if (payload.period?.trim()) {
    lines.push(`Prazo estimado: ${payload.period.trim()}`);
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
    lines.push(`Detalhes da operacao: ${payload.notes.trim()}`);
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

