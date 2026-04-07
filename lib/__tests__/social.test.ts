import { calculateSocialContributionsFull, calculateSocialBurden } from '../calculators/social';
import { SocialContributions } from '../countries/types';

describe('Social Contributions Calculator', () => {
  const mockSocialContributions: SocialContributions = {
    employee: {
      pension: 0.10,
      health: 0.05,
      unemployment: 0.02,
      other: 0.01,
    },
    employer: {
      pension: 0.15,
      health: 0.08,
      unemployment: 0.03,
      other: 0.02,
    },
    caps: {
      pension: 100000,
    },
  };

  describe('calculateSocialContributionsFull', () => {
    it('should calculate employee and employer contributions correctly', () => {
      const result = calculateSocialContributionsFull({
        grossSalary: 50000,
        socialContributions: mockSocialContributions,
      });

      // Employee: 50000 * (0.10 + 0.05 + 0.02 + 0.01) = 50000 * 0.18 = 9000
      // Employer: 50000 * (0.15 + 0.08 + 0.03 + 0.02) = 50000 * 0.28 = 14000

      expect(result.employeeContributions.total).toBe(9000);
      expect(result.employerContributions.total).toBe(14000);
      expect(result.employeeContributions.pension).toBe(5000);
      expect(result.employeeContributions.health).toBe(2500);
      expect(result.employeeContributions.unemployment).toBe(1000);
      expect(result.employeeContributions.other).toBe(500);
    });

    it('should apply caps correctly', () => {
      const result = calculateSocialContributionsFull({
        grossSalary: 150000, // Above pension cap
        socialContributions: mockSocialContributions,
      });

      // Pension cap is 100000
      // Pension contributions should be capped

      expect(result.employeeContributions.pension).toBe(10000); // 100000 * 0.10
      expect(result.employerContributions.pension).toBe(15000); // 100000 * 0.15

      // Other contributions on full salary (not capped)
      expect(result.employeeContributions.health).toBe(7500); // 150000 * 0.05
      expect(result.employerContributions.health).toBe(12000); // 150000 * 0.08
    });

    it('should handle zero salary', () => {
      const result = calculateSocialContributionsFull({
        grossSalary: 0,
        socialContributions: mockSocialContributions,
      });

      expect(result.employeeContributions.total).toBe(0);
      expect(result.employerContributions.total).toBe(0);
      expect(result.netSalary).toBe(0);
    });
  });

  describe('calculateSocialBurden', () => {
    it('should calculate contribution rates correctly', () => {
      const result = calculateSocialBurden(50000, mockSocialContributions);

      // Employee rate: 18%
      // Employer rate: 28%
      // Total: 46%

      expect(result.employeeRate).toBeCloseTo(0.18, 2);
      expect(result.employerRate).toBeCloseTo(0.28, 2);
      expect(result.totalRate).toBeCloseTo(0.46, 2);
    });

    it('should handle salary with caps', () => {
      const result = calculateSocialBurden(150000, mockSocialContributions);

      // With caps, effective rate should be slightly lower due to pension cap
      expect(result.employeeRate).toBeGreaterThan(0);
      expect(result.employerRate).toBeGreaterThan(0);
    });
  });
});