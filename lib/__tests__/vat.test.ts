import { calculateVat, formatVatRate, checkVatThreshold } from '../calculators/vat';
import { VatRules } from '../countries/types';

describe('VAT Calculator', () => {
  const mockVatRules: VatRules = {
    standardRate: 0.20,
    reducedRates: [
      { rate: 0.10, appliesTo: ['Food', 'Books'] },
    ],
    threshold: 10000,
    specialRegimes: ['Small business exemption'],
  };

  describe('calculateVat', () => {
    it('should calculate VAT correctly when adding VAT', () => {
      const result = calculateVat({
        amount: 1000,
        vatRules: mockVatRules,
        rateType: 'standard',
        mode: 'add',
      });

      expect(result.netAmount).toBe(1000);
      expect(result.vatAmount).toBe(200);
      expect(result.grossAmount).toBe(1200);
      expect(result.rate).toBe(0.20);
    });

    it('should calculate VAT correctly when extracting VAT', () => {
      const result = calculateVat({
        amount: 1200,
        vatRules: mockVatRules,
        rateType: 'standard',
        mode: 'extract',
      });

      expect(result.netAmount).toBeCloseTo(1000, 2);
      expect(result.vatAmount).toBeCloseTo(200, 2);
      expect(result.grossAmount).toBe(1200);
      expect(result.rate).toBe(0.20);
    });

    it('should use reduced rate when specified', () => {
      const result = calculateVat({
        amount: 1000,
        vatRules: mockVatRules,
        rateType: 'reduced',
        mode: 'add',
      });

      expect(result.vatAmount).toBe(100);
      expect(result.grossAmount).toBe(1100);
      expect(result.rate).toBe(0.10);
    });

    it('should handle zero amount', () => {
      const result = calculateVat({
        amount: 0,
        vatRules: mockVatRules,
        rateType: 'standard',
        mode: 'add',
      });

      expect(result.netAmount).toBe(0);
      expect(result.vatAmount).toBe(0);
      expect(result.grossAmount).toBe(0);
    });
  });

  describe('formatVatRate', () => {
    it('should format VAT rate as percentage', () => {
      expect(formatVatRate(0.20)).toBe('20%');
      expect(formatVatRate(0.10)).toBe('10%');
      expect(formatVatRate(0.05)).toBe('5%');
    });
  });

  describe('checkVatThreshold', () => {
    it('should return registration required when turnover exceeds threshold', () => {
      const result = checkVatThreshold(15000, mockVatRules);
      expect(result.requiresRegistration).toBe(true);
      expect(result.threshold).toBe(10000);
      expect(result.turnover).toBe(15000);
    });

    it('should return registration not required when turnover is below threshold', () => {
      const result = checkVatThreshold(5000, mockVatRules);
      expect(result.requiresRegistration).toBe(false);
      expect(result.threshold).toBe(10000);
      expect(result.turnover).toBe(5000);
    });

    it('should return registration required when turnover equals threshold', () => {
      const result = checkVatThreshold(10000, mockVatRules);
      expect(result.requiresRegistration).toBe(true);
      expect(result.threshold).toBe(10000);
      expect(result.turnover).toBe(10000);
    });
  });
});