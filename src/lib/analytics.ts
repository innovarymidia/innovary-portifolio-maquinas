import type { AnalyticsConfig } from '../config/analytics';

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

const GA4_PATTERN = /^G-[A-Z0-9]{4,20}$/i;
const GTM_PATTERN = /^GTM-[A-Z0-9]{4,12}$/i;
const META_PIXEL_PATTERN = /^\d{10,20}$/;

export function validateAnalyticsIds(config: AnalyticsConfig): {
  ga4Id: string | null;
  gtmId: string | null;
  metaPixelId: string | null;
} {
  const ga4 = config.ga4MeasurementId.trim();
  const gtm = config.gtmContainerId.trim();
  const pixel = config.metaPixelId.trim();

  return {
    ga4Id: GA4_PATTERN.test(ga4) ? ga4 : null,
    gtmId: GTM_PATTERN.test(gtm) ? gtm : null,
    metaPixelId: META_PIXEL_PATTERN.test(pixel) ? pixel : null,
  };
}

let initialized = false;

/**
 * Injeta scripts de GA4, GTM e Meta Pixel somente quando IDs validos estiverem configurados.
 */
export function initAnalytics(config: AnalyticsConfig): void {
  if (initialized || typeof window === 'undefined' || typeof document === 'undefined') {
    return;
  }
  initialized = true;

  const { ga4Id, gtmId, metaPixelId } = validateAnalyticsIds(config);

  if (gtmId) {
    window.dataLayer = window.dataLayer || [];
    window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`;
    document.head.appendChild(script);
  }

  if (ga4Id) {
    window.dataLayer = window.dataLayer || [];
    window.gtag =
      window.gtag ||
      function gtag(...args: unknown[]) {
        window.dataLayer?.push(args);
      };
    window.gtag('js', new Date());
    window.gtag('config', ga4Id);

    const script = document.createElement('script');
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga4Id)}`;
    document.head.appendChild(script);
  }

  if (metaPixelId) {
    if (!window.fbq) {
      const fbqFn = function fbq(...args: unknown[]) {
        const queue = (fbqFn as unknown as { queue: unknown[] }).queue;
        queue.push(args);
      } as unknown as ((...args: unknown[]) => void) & {
        queue: unknown[];
        loaded: boolean;
        version: string;
      };
      fbqFn.queue = [];
      fbqFn.loaded = true;
      fbqFn.version = '2.0';
      window.fbq = fbqFn;
      window._fbq = fbqFn;

      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://connect.facebook.net/en_US/fbevents.js';
      document.head.appendChild(script);
    }
    window.fbq('init', metaPixelId);
    window.fbq('track', 'PageView');
  }
}

export function trackEvent(
  eventName: string,
  params: Record<string, string | number | boolean> = {}
): void {
  if (typeof window === 'undefined') return;

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({ event: eventName, ...params });
  }
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
  if (typeof window.fbq === 'function') {
    const metaEvent =
      eventName === 'generate_lead'
        ? 'Lead'
        : eventName === 'whatsapp_click'
          ? 'Contact'
          : 'ViewContent';
    window.fbq('track', metaEvent, params);
  }
}

