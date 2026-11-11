import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  extractPhoneDigits,
  formatBrazilianPhone,
  isValidBrazilianPhone,
} from '../src/lib/phone.ts';
import { buildQuoteMessage, buildWhatsAppUrl } from '../src/lib/quote.ts';
import { validateAnalyticsIds } from '../src/lib/analytics.ts';
import { computeScrollRotationDeg } from '../src/lib/scrollRotation.ts';

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
  it('includes equipment label, code, and request fields in quote message', () => {
    const msg = buildQuoteMessage({
      equipmentLabel: 'Escavadeira Hidráulica 20t',
      equipmentCode: 'ESC-20T',
      period: 'Mensal (30 dias)',
      city: 'Campinas - SP',
      requesterName: 'Eng. Carlos',
      phone: '(19) 99888-7766',
      notes: 'Obra de galpão logístico',
    });

    assert.match(msg, /Escavadeira Hidráulica 20t \(Ref\.: ESC-20T\)/);
    assert.match(msg, /Mensal \(30 dias\)/);
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

describe('hero excavator 360 scroll rotation', () => {
  it('maps vertical scroll smoothly from 0 to 360 degrees and clamps boundaries', () => {
    assert.equal(computeScrollRotationDeg(-40, 500), 0);
    assert.equal(computeScrollRotationDeg(0, 500), 0);
    assert.equal(computeScrollRotationDeg(125, 500), 90);
    assert.equal(computeScrollRotationDeg(250, 500), 180);
    assert.equal(computeScrollRotationDeg(375, 500), 270);
    assert.equal(computeScrollRotationDeg(500, 500), 360);
    assert.equal(computeScrollRotationDeg(900, 500), 360);
  });
});

