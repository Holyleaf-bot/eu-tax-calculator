import { calculateCorporateTax, calculateRequiredRevenue } from '../calculators/corporate';
import { CorporateTaxRules } from '../countries/types';

describe('Corporate Tax Calculator', () => {
  const mockCorporateRules: CorporateTaxRules = {
    standardRate: 0.25,
    smallBusinessRate: {
      rate: 0.15,
      threshold: 50000,
    },
    deductions: [],
    withholdingTax: 0.15,
    capitalGainsRate: 0.20,
  };

  describe('calculateCorporateTax', () => {
    it('should calculate tax at standard rate for high profit', () => {
      const result = calculateCorporateTax({
        revenue: 150000,
        expenses: 50000,
        corporateTaxRules: mockCorporateRules,
      });

      // Revenue: 150000, Expenses: 50000
      // Gross profit: 100000 (above small business threshold)
      // Tax rate: 25%
      // Tax: 25000
      // Net profit: 75000

      expect(result.grossProfit).toBe(100000);
      expect(result.effectiveRate).toBe(0.25);
      expect(result.corporateTax).toBe(25000);
      expect(result.netProfit).toBe(75000);
    });

    it('should calculate tax at small business rate for low profit', () => {
      const result = calculateCorporateTax({
        revenue: 80000,
        expenses: 50000,
        corporateTaxRules: mockCorporateRules,
      });

      // Gross profit: 30000 (below small business threshold)
      // Tax rate: 15%
      // Tax: 4500
      // Net profit: 25500

      expect(result.grossProfit).toBe(30000);
      expect(result.effectiveRate).toBe(0.15);
      expect(result.corporateTax).toBe(4500);
      expect(result.netProfit).toBe(25500);
    });

    it('should handle zero profit (revenue = expenses)', () => {
      const result = calculateCorporateTax({
        revenue: 50000,
        expenses: 50000,
        corporateTaxRules: mockCorporateRules,
      });

      expect(result.grossProfit).toBe(0);
      expect(result.corporateTax).toBe(0);
      expect(result.netProfit).toBe(0);
    });

    it('should handle loss (expenses > revenue)', () => {
      const result = calculateCorporateTax({
        revenue: 30000,
        expenses: 50000,
        corporateTaxRules: mockCorporateRules,
      });

      expect(result.grossProfit).toBe(-20000);
      expect(result.corporateTax).toBe(0);
      expect(result.netProfit).toBe(-20000);
    });

    it('should handle profit at exactly the threshold', () => {
      const result = calculateCorporateTax({
        revenue: 100000,
        expenses: 50000,
        corporateTaxRules: mockCorporateRules,
      });

      // Gross profit: 50000 (at threshold)
      // Should use small business rate
      expect(result.effectiveRate).toBe(0.15);
      expect(result.corporateTax).toBe(7500);
    });
  });

  describe('calculateRequiredRevenue', () => {
    it('should calculate required revenue for target profit', () => {
      const targetProfit = 50000;
      const expenseRatio = 0.3; // 30% of revenue is expenses
      const revenue = calculateRequiredRevenue(targetProfit, expenseRatio, mockCorporateRules);

      // Revenue needed should be greater than target profit
      expect(revenue).toBeGreaterThan(targetProfit);

      // Verify by calculating back
      const expenses = revenue * expenseRatio;
      const result = calculateCorporateTax({
        revenue,
        expenses,
        corporateTaxRules: mockCorporateRules,
      });

      // Net profit should be close to target
      expect(result.netProfit).toBeGreaterThanOrEqual(targetProfit * 0.99);
    });

    it('should handle high target profit (standard rate)', () => {
      const targetProfit = 100000;
      const expenseRatio = 0.2;
      const revenue = calculateRequiredRevenue(targetProfit, expenseRatio, mockCorporateRules);

      expect(revenue).toBeGreaterThan(targetProfit);
    });
  });
});