import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  extractPhoneDigits,
  formatBrazilianPhone,
  isValidBrazilianPhone,
} from '../src/lib/phone.ts';
import { buildQuoteMessage, buildWhatsAppUrl } from '../src/lib/quote.ts';
import { validateAnalyticsIds } from '../src/lib/analytics.ts';
import { filterCatalogEquipments } from '../src/lib/catalogFilter.ts';
import { resolveClientId } from '../src/lib/clientProfile.ts';

describe('phone mask and validation', () => {
  it('extracts up to 11 digits cleanly', () => {
    assert.equal(extractPhoneDigits('(11) 98765-432100'), '11987654321');
  });

  it('formats 10-digit landline and 11-digit mobile numbers', () => {
    assert.equal(formatBrazilianPhone('1133334444'), '(11) 3333-4444');
    assert.equal(formatBrazilianPhone('11987654321'), '(11) 98765-4321');
    assert.equal(formatBrazilianPhone('1198'), '(11) 98');
  });

  it('rejects repeated digits, short inputs, and invalid DDDs', () => {
    assert.equal(isValidBrazilianPhone('(11) 98765-4321'), true);
    assert.equal(isValidBrazilianPhone('(11) 3333-4444'), true);
    assert.equal(isValidBrazilianPhone('(11) 99999-9999'), false);
    assert.equal(isValidBrazilianPhone('(00) 98765-4321'), false);
    assert.equal(isValidBrazilianPhone('(11) 9876-543'), false);
  });
});

describe('quote message and WhatsApp URL builder', () => {
  it('includes equipment label, brand, code, and request fields in quote message', () => {
    const msg = buildQuoteMessage({
      equipmentLabel: 'Betoneira 400 Litros Prime',
      equipmentCode: 'CON-400M',
      brand: 'Menegotti',
      period: 'Mensal',
      city: 'Campinas - SP',
      requesterName: 'Eng. Carlos',
      phone: '(19) 99888-7766',
      notes: 'Obra residencial',
    });

    assert.match(msg, /Betoneira 400 Litros Prime \(Menegotti • Ref\.: CON-400M\)/);
    assert.match(msg, /Periodo de locacao: Mensal/);
    assert.match(msg, /Campinas - SP/);
    assert.match(msg, /Eng\. Carlos/);
    assert.match(msg, /\(19\) 99888-7766/);
  });

  it('builds a valid encoded wa.me link and falls back when phone is invalid', () => {
    const url = buildWhatsAppUrl('(11) 98765-4321', 'Ola equipamento');
    assert.equal(url, 'https://wa.me/5511987654321?text=Ola%20equipamento');
    assert.equal(buildWhatsAppUrl('123', 'test'), '#orcamento');
  });
});

describe('modular catalog filtering and search', () => {
  const sample = [
    {
      id: 'b1',
      code: 'CON-400M',
      name: 'Betoneira 400 Litros Prime',
      categoryId: 'concreto' as const,
      brand: 'Menegotti',
      model: 'Conforme equipamento',
      specification: 'Capacidade de 400 L',
      billingUnit: 'Diária',
      availability: 'Sob consulta',
      image: '',
      imageAlt: '',
    },
    {
      id: 'd1',
      code: 'DEM-1600D',
      name: 'Martelo Demolidor 1600W',
      categoryId: 'demolicao' as const,
      brand: 'DeWalt',
      model: 'Conforme equipamento',
      specification: '35 J',
      billingUnit: 'Diária',
      availability: 'Sob consulta',
      image: '',
      imageAlt: '',
    },
    {
      id: 'c1',
      code: 'CNT-600M',
      name: 'Container Modular',
      categoryId: 'containers' as const,
      brand: 'Modular',
      model: 'Conforme equipamento',
      specification: '6 metros',
      billingUnit: 'Mensal',
      availability: 'Sob consulta',
      image: '',
      imageAlt: '',
    },
  ];

  it('excludes categories disabled by client template config', () => {
    const res = filterCatalogEquipments({
      items: sample,
      enabledCategoryIds: ['concreto', 'demolicao'],
      activeCategory: 'all',
      searchQuery: '',
    });
    assert.deepEqual(
      res.map((r) => r.id),
      ['b1', 'd1']
    );
  });

  it('filters by category and matches search across name, brand, specification, and code', () => {
    const bySearch = filterCatalogEquipments({
      items: sample,
      enabledCategoryIds: ['concreto', 'demolicao', 'containers'],
      activeCategory: 'all',
      searchQuery: 'menegotti',
    });
    assert.deepEqual(
      bySearch.map((r) => r.id),
      ['b1']
    );

    const byCatAndCode = filterCatalogEquipments({
      items: sample,
      enabledCategoryIds: ['concreto', 'demolicao'],
      activeCategory: 'demolicao',
      searchQuery: '1600d',
    });
    assert.deepEqual(
      byCatAndCode.map((r) => r.id),
      ['d1']
    );
  });
});

describe('analytics ID validation', () => {
  it('accepts valid GA4, GTM, and Meta Pixel formats and rejects unsafe strings', () => {
    const valid = validateAnalyticsIds({
      ga4MeasurementId: 'G-ABC1234567',
      gtmContainerId: 'GTM-K9X2P1',
      metaPixelId: '123456789012345',
    });
    assert.deepEqual(valid, {
      ga4Id: 'G-ABC1234567',
      gtmId: 'GTM-K9X2P1',
      metaPixelId: '123456789012345',
    });

    const invalid = validateAnalyticsIds({
      ga4MeasurementId: 'invalid<script>',
      gtmContainerId: 'UA-1234',
      metaPixelId: 'abc123',
    });
    assert.deepEqual(invalid, {
      ga4Id: null,
      gtmId: null,
      metaPixelId: null,
    });
  });
});

describe('multi-client route resolution', () => {
  it('resolves moshia via /moshia path, query string, or env default', () => {
    assert.equal(resolveClientId('/moshia', ''), 'moshia');
    assert.equal(resolveClientId('/moshia/', ''), 'moshia');
    assert.equal(resolveClientId('/portifolio-maquinas/moshia', ''), 'moshia');
    assert.equal(resolveClientId('/', '?cliente=moshia'), 'moshia');
    assert.equal(resolveClientId('/', '', 'moshia'), 'moshia');
    assert.equal(resolveClientId('/portifolio-maquinas/', ''), 'default');
  });
});
