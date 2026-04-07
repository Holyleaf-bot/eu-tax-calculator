// Social Contributions Calculator Engine
import { SocialContributions, SocialContributionsResult } from '../countries/types';

interface SocialContributionsInput {
  grossSalary: number; // Annual gross salary
  socialContributions: SocialContributions;
}

export function calculateSocialContributionsFull(
  input: SocialContributionsInput
): SocialContributionsResult {
  const { grossSalary, socialContributions } = input;
  const { employee, employer, caps } = socialContributions;

  // Calculate employee contributions with caps
  const employeePension = applyCap(grossSalary * employee.pension, caps?.pension, grossSalary);
  const employeeHealth = applyCap(grossSalary * employee.health, caps?.health, grossSalary);
  const employeeUnemployment = grossSalary * employee.unemployment;
  const employeeOther = employee.other ? grossSalary * employee.other : 0;

  const employeeTotal = employeePension + employeeHealth + employeeUnemployment + employeeOther;

  // Calculate employer contributions with caps
  const employerPension = applyCap(grossSalary * employer.pension, caps?.pension, grossSalary);
  const employerHealth = applyCap(grossSalary * employer.health, caps?.health, grossSalary);
  const employerUnemployment = grossSalary * employer.unemployment;
  const employerOther = employer.other ? grossSalary * employer.other : 0;

  const employerTotal = employerPension + employerHealth + employerUnemployment + employerOther;

  // Total cost to employer
  const totalCost = grossSalary + employerTotal;

  // Net salary after employee contributions
  const netSalary = grossSalary - employeeTotal;

  return {
    grossSalary: Math.round(grossSalary * 100) / 100,
    employeeContributions: {
      pension: Math.round(employeePension * 100) / 100,
      health: Math.round(employeeHealth * 100) / 100,
      unemployment: Math.round(employeeUnemployment * 100) / 100,
      other: Math.round(employeeOther * 100) / 100,
      total: Math.round(employeeTotal * 100) / 100,
    },
    employerContributions: {
      pension: Math.round(employerPension * 100) / 100,
      health: Math.round(employerHealth * 100) / 100,
      unemployment: Math.round(employerUnemployment * 100) / 100,
      other: Math.round(employerOther * 100) / 100,
      total: Math.round(employerTotal * 100) / 100,
    },
    totalCost: Math.round(totalCost * 100) / 100,
    netSalary: Math.round(netSalary * 100) / 100,
  };
}

function applyCap(amount: number, cap: number | undefined, salary: number): number {
  if (cap === undefined) return amount;

  // Cap applies to the contribution base, not the contribution itself
  // If salary exceeds cap, use cap as the base
  const cappedBase = Math.min(salary, cap);
  return cappedBase * (amount / salary); // Maintain the rate
}

// Calculate the social contribution burden as percentage
export function calculateSocialBurden(
  grossSalary: number,
  socialContributions: SocialContributions
): {
  employeeRate: number;
  employerRate: number;
  totalRate: number;
} {
  const result = calculateSocialContributionsFull({ grossSalary, socialContributions });

  return {
    employeeRate: result.employeeContributions.total / grossSalary,
    employerRate: result.employerContributions.total / grossSalary,
    totalRate: (result.employeeContributions.total + result.employerContributions.total) / grossSalary,
  };
}

// Find gross salary that results in a specific net after social contributions
export function findGrossForNetSocial(
  targetNet: number,
  socialContributions: SocialContributions
): number {
  // Calculate approximate employee contribution rate
  const avgEmployeeRate =
    socialContributions.employee.pension +
    socialContributions.employee.health +
    socialContributions.employee.unemployment +
    (socialContributions.employee.other || 0);

  // First estimate
  let estimate = targetNet / (1 - avgEmployeeRate);

  // Refine with binary search if caps might apply
  const cap = socialContributions.caps?.pension || socialContributions.caps?.total;
  if (cap && estimate > cap) {
    // Caps apply, need more precise calculation
    let low = targetNet;
    let high = estimate * 1.2;
    let iterations = 0;

    while (high - low > 1 && iterations < 50) {
      const mid = (low + high) / 2;
      const result = calculateSocialContributionsFull({
        grossSalary: mid,
        socialContributions,
      });

      if (result.netSalary < targetNet) {
        low = mid;
      } else {
        high = mid;
      }
      iterations++;
    }
    return Math.round(high);
  }

  return Math.round(estimate);
}