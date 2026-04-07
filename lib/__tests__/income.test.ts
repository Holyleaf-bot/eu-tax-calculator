import { calculateIncomeTax, findGrossForNet } from '../calculators/income';
import { IncomeTaxRules, SocialContributions } from '../countries/types';

describe('Income Tax Calculator', () => {
  // Simplified tax brackets: 0% up to 10000, then 20% up to 40000, then 40%
  // But taxable income is after personal allowance
  const mockIncomeTaxRules: IncomeTaxRules = {
    brackets: [
      { min: 0, max: 10000, rate: 0 },      // First 10000 at 0%
      { min: 10000, max: 40000, rate: 0.20 }, // Next 30000 at 20%
      { min: 40000, max: null, rate: 0.40 },  // Above 40000 at 40%
    ],
    personalAllowance: 10000, // Tax-free allowance
    deductions: [],
    marriedFilingOptions: false,
  };

  const mockSocialContributions: SocialContributions = {
    employee: {
      pension: 0.05,
      health: 0.03,
      unemployment: 0.02,
      other: 0,
    },
    employer: {
      pension: 0.10,
      health: 0.05,
      unemployment: 0.03,
      other: 0,
    },
    caps: {},
  };

  describe('calculateIncomeTax', () => {
    it('should calculate tax correctly for low income', () => {
      const result = calculateIncomeTax({
        grossSalary: 15000,
        incomeTaxRules: mockIncomeTaxRules,
        socialContributions: mockSocialContributions,
      });

      // Gross: 15000
      // Personal allowance: 10000
      // Taxable: 5000
      // Bracket 1 (0-10000): 5000 falls in first bracket, 0% rate = 0 tax
      // Social: 15000 * 10% = 1500
      // Net: 15000 - 0 - 1500 = 13500

      expect(result.grossSalary).toBe(15000);
      expect(result.personalAllowance).toBe(10000);
      expect(result.taxableIncome).toBe(5000);
      expect(result.incomeTax).toBe(0); // 0% bracket
      expect(result.socialContributionsEmployee).toBe(1500);
      expect(result.netSalary).toBe(13500);
    });

    it('should calculate tax correctly for income in middle bracket', () => {
      const result = calculateIncomeTax({
        grossSalary: 30000,
        incomeTaxRules: mockIncomeTaxRules,
        socialContributions: mockSocialContributions,
      });

      // Gross: 30000
      // Personal allowance: 10000
      // Taxable: 20000
      // Bracket 1 (0-10000): 10000 * 0% = 0
      // Bracket 2 (10000-40000): 10000 * 20% = 2000
      // Total tax: 2000
      // Social: 30000 * 10% = 3000
      // Net: 30000 - 2000 - 3000 = 25000

      expect(result.taxableIncome).toBe(20000);
      expect(result.incomeTax).toBe(2000);
      expect(result.socialContributionsEmployee).toBe(3000);
      expect(result.netSalary).toBe(25000);
    });

    it('should calculate tax correctly for income in highest bracket', () => {
      const result = calculateIncomeTax({
        grossSalary: 60000,
        incomeTaxRules: mockIncomeTaxRules,
        socialContributions: mockSocialContributions,
      });

      // Gross: 60000
      // Personal allowance: 10000
      // Taxable: 50000
      // Bracket 1 (0-10000): 10000 * 0% = 0
      // Bracket 2 (10000-40000): 30000 * 20% = 6000
      // Bracket 3 (40000+): 10000 * 40% = 4000
      // Total tax: 10000
      // Social: 60000 * 10% = 6000
      // Net: 60000 - 10000 - 6000 = 44000

      expect(result.taxableIncome).toBe(50000);
      expect(result.incomeTax).toBe(10000);
      expect(result.socialContributionsEmployee).toBe(6000);
      expect(result.netSalary).toBe(44000);
    });

    it('should handle zero income', () => {
      const result = calculateIncomeTax({
        grossSalary: 0,
        incomeTaxRules: mockIncomeTaxRules,
        socialContributions: mockSocialContributions,
      });

      expect(result.grossSalary).toBe(0);
      expect(result.incomeTax).toBe(0);
      expect(result.netSalary).toBe(0);
    });

    it('should calculate effective tax rate correctly', () => {
      const result = calculateIncomeTax({
        grossSalary: 30000,
        incomeTaxRules: mockIncomeTaxRules,
        socialContributions: mockSocialContributions,
      });

      // Total deductions: 2000 (income tax) + 3000 (social) = 5000
      // Effective rate: 5000 / 30000 = 16.67%
      expect(result.effectiveTaxRate).toBeCloseTo(0.1667, 2);
    });

    it('should apply deductions correctly', () => {
      const rulesWithDeductions: IncomeTaxRules = {
        ...mockIncomeTaxRules,
        deductions: [
          { name: 'Work expense', type: 'fixed', value: 2000, description: 'Work-related expenses' },
        ],
      };

      const result = calculateIncomeTax({
        grossSalary: 20000,
        incomeTaxRules: rulesWithDeductions,
        socialContributions: mockSocialContributions,
      });

      // Gross: 20000
      // Personal allowance: 10000
      // Deduction: 2000
      // Taxable: 8000

      expect(result.taxableIncome).toBe(8000);
      expect(result.deductionsApplied).toHaveLength(1);
      expect(result.deductionsApplied[0].name).toBe('Work expense');
      expect(result.deductionsApplied[0].amount).toBe(2000);
    });
  });

  describe('findGrossForNet', () => {
    it('should find gross salary for desired net', () => {
      const targetNet = 30000;
      const gross = findGrossForNet(targetNet, mockIncomeTaxRules, mockSocialContributions);

      // Verify by calculating back
      const result = calculateIncomeTax({
        grossSalary: gross,
        incomeTaxRules: mockIncomeTaxRules,
        socialContributions: mockSocialContributions,
      });

      // Net should be close to target (within 1 currency unit)
      expect(Math.abs(result.netSalary - targetNet)).toBeLessThan(1);
    });

    it('should handle high net targets', () => {
      const targetNet = 80000;
      const gross = findGrossForNet(targetNet, mockIncomeTaxRules, mockSocialContributions);

      const result = calculateIncomeTax({
        grossSalary: gross,
        incomeTaxRules: mockIncomeTaxRules,
        socialContributions: mockSocialContributions,
      });

      expect(Math.abs(result.netSalary - targetNet)).toBeLessThan(10);
    });
  });
});