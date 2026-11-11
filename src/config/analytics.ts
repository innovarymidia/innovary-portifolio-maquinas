/**
 * Configuracao centralizada de rastreamento e conversao.
 * Defina os IDs via variaveis de ambiente (.env) ou diretamente abaixo
 * ao personalizar o template para cada cliente.
 */
export interface AnalyticsConfig {
  /** Google Analytics 4 Measurement ID (ex: G-XXXXXXXXXX) */
  ga4MeasurementId: string;
  /** Google Tag Manager Container ID (ex: GTM-XXXXXXX) */
  gtmContainerId: string;
  /** Meta Pixel ID numerico (ex: 123456789012345) */
  metaPixelId: string;
}

const env =
  typeof import.meta !== 'undefined' && import.meta.env
    ? (import.meta.env as Record<string, string | undefined>)
    : {};

export const analyticsConfig: AnalyticsConfig = {
  ga4MeasurementId: env.VITE_GA_MEASUREMENT_ID ?? '',
  gtmContainerId: env.VITE_GTM_ID ?? '',
  metaPixelId: env.VITE_META_PIXEL_ID ?? '',
};

