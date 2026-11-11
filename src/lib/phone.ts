/**
 * Extrai apenas os digitos numericos de uma string de telefone, limitado a 11 digitos (DDD + celular).
 */
export function extractPhoneDigits(value: string): string {
  return value.replace(/\D/g, '').slice(0, 11);
}

/**
 * Aplica mascara brasileira para telefone fixo (10 digitos) ou celular (11 digitos).
 * Exemplos:
 * - "11987654321" -> "(11) 98765-4321"
 * - "1133334444"  -> "(11) 3333-4444"
 */
export function formatBrazilianPhone(value: string): string {
  const digits = extractPhoneDigits(value);
  if (!digits) return '';

  if (digits.length <= 2) {
    return `(${digits}`;
  }

  const ddd = digits.slice(0, 2);
  const rest = digits.slice(2);

  if (digits.length <= 6) {
    return `(${ddd}) ${rest}`;
  }

  if (digits.length <= 10) {
    return `(${ddd}) ${rest.slice(0, 4)}-${rest.slice(4)}`;
  }

  return `(${ddd}) ${rest.slice(0, 5)}-${rest.slice(5)}`;
}

/**
 * Valida se o telefone possui DDD + numero valido (10 ou 11 digitos) e nao e uma sequencia repetida.
 */
export function isValidBrazilianPhone(value: string): boolean {
  const digits = extractPhoneDigits(value);
  if (digits.length !== 10 && digits.length !== 11) {
    return false;
  }
  if (/^(\d)\1+$/.test(digits) || /^(\d)\1+$/.test(digits.slice(2))) {
    return false;
  }
  const ddd = Number(digits.slice(0, 2));
  return ddd >= 11 && ddd <= 99;
}
