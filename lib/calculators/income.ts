// Income Tax Calculator Engine
import {
  IncomeTaxRules,
  IncomeTaxResult,
  TaxBracket,
  Deduction,
  SocialContributions,
} from '../countries/types';

interface IncomeTaxInput {
  grossSalary: number; // Annual gross salary
  incomeTaxRules: IncomeTaxRules;
  socialContributions: SocialContributions;
  marriedFiling?: boolean;
  dependents?: number;
  churchTax?: boolean;
}

export function calculateIncomeTax(input: IncomeTaxInput): IncomeTaxResult {
  const {
    grossSalary,
    incomeTaxRules,
    socialContributions,
    marriedFiling = false,
    dependents = 0,
    churchTax = false,
  } = input;

  // Step 1: Apply personal allowance
  const personalAllowance = incomeTaxRules.personalAllowance;

  // Step 2: Calculate deductions
  let totalDeductions = 0;
  const appliedDeductions: Array<{ name: string; amount: number }> = [];

  for (const deduction of incomeTaxRules.deductions) {
    const amount = calculateDeductionAmount(deduction, grossSalary);
    totalDeductions += amount;
    appliedDeductions.push({ name: deduction.name, amount });
  }

  // Step 3: Calculate taxable income
  const taxableIncome = Math.max(0, grossSalary - personalAllowance - totalDeductions);

  // Step 4: Calculate income tax using progressive brackets
  const { tax: incomeTax, breakdown: bracketBreakdown } = calculateProgressiveTax(
    taxableIncome,
    incomeTaxRules.brackets
  );

  // Step 5: Calculate social contributions
  const socialEmployee = calculateSocialContributions(
    grossSalary,
    socialContributions.employee,
    socialContributions.caps
  );

  const socialEmployer = calculateSocialContributions(
    grossSalary,
    socialContributions.employer,
    socialContributions.caps
  );

  // Step 6: Apply solidarity surcharge if applicable
  let solidaritySurcharge = 0;
  if (incomeTaxRules.solidaritySurcharge && taxableIncome >= incomeTaxRules.solidaritySurcharge.threshold) {
    solidaritySurcharge = incomeTax * incomeTaxRules.solidaritySurcharge.rate;
  }

  // Step 7: Apply church tax if applicable
  let churchTaxAmount = 0;
  if (churchTax && incomeTaxRules.churchTax) {
    churchTaxAmount = taxableIncome * incomeTaxRules.churchTax.rate;
  }

  // Step 8: Calculate net salary
  const totalTax = incomeTax + solidaritySurcharge + churchTaxAmount;
  const netSalary = grossSalary - totalTax - socialEmployee;

  // Step 9: Calculate effective tax rate
  const totalDeductionsFromSalary = totalTax + socialEmployee;
  const effectiveTaxRate = grossSalary > 0 ? totalDeductionsFromSalary / grossSalary : 0;

  return {
    grossSalary,
    personalAllowance,
    taxableIncome,
    incomeTax: Math.round(incomeTax * 100) / 100,
    socialContributionsEmployee: Math.round(socialEmployee * 100) / 100,
    socialContributionsEmployer: Math.round(socialEmployer * 100) / 100,
    netSalary: Math.round(netSalary * 100) / 100,
    effectiveTaxRate: Math.round(effectiveTaxRate * 10000) / 10000,
    bracketBreakdown,
    deductionsApplied: appliedDeductions.map((d) => ({
      name: d.name,
      amount: Math.round(d.amount * 100) / 100,
    })),
  };
}

function calculateDeductionAmount(deduction: Deduction, income: number): number {
  let amount: number;

  if (deduction.type === 'fixed') {
    amount = deduction.value;
  } else {
    amount = income * deduction.value;
  }

  // Apply maximum if specified
  if (deduction.maxAmount !== undefined) {
    amount = Math.min(amount, deduction.maxAmount);
  }

  return amount;
}

function calculateProgressiveTax(
  taxableIncome: number,
  brackets: TaxBracket[]
): { tax: number; breakdown: Array<{ bracket: TaxBracket; amount: number; tax: number }> } {
  let totalTax = 0;
  let remainingIncome = taxableIncome;
  const breakdown: Array<{ bracket: TaxBracket; amount: number; tax: number }> = [];

  for (const bracket of brackets) {
    if (remainingIncome <= 0) break;

    const bracketMin = bracket.min;
    const bracketMax = bracket.max ?? Infinity;
    const bracketWidth = bracketMax - bracketMin;

    const taxableInBracket = Math.min(remainingIncome, bracketWidth);
    const taxInBracket = taxableInBracket * bracket.rate;

    totalTax += taxInBracket;
    remainingIncome -= taxableInBracket;

    if (taxableInBracket > 0) {
      breakdown.push({
        bracket,
        amount: Math.round(taxableInBracket * 100) / 100,
        tax: Math.round(taxInBracket * 100) / 100,
      });
    }
  }

  return { tax: totalTax, breakdown };
}

function calculateSocialContributions(
  salary: number,
  rates: { pension: number; health: number; unemployment: number; other?: number },
  caps?: { pension?: number; health?: number; total?: number }
): number {
  // Apply caps if specified
  let pensionBase = salary;
  let healthBase = salary;

  if (caps?.pension && salary > caps.pension) {
    pensionBase = caps.pension;
  }
  if (caps?.health && salary > caps.health) {
    healthBase = caps.health;
  }

  const pension = pensionBase * rates.pension;
  const health = healthBase * rates.health;
  const unemployment = salary * rates.unemployment;
  const other = rates.other ? salary * rates.other : 0;

  return pension + health + unemployment + other;
}

// Reverse calculation: find gross salary for a desired net salary
export function findGrossForNet(
  targetNet: number,
  incomeTaxRules: IncomeTaxRules,
  socialContributions: SocialContributions
): number {
  // Binary search approach
  let low = targetNet;
  let high = targetNet * 3;

  // Ensure we start with a valid range
  const maxIterations = 50;
  let iterations = 0;

  while (high - low > 1 && iterations < maxIterations) {
    const mid = (low + high) / 2;
    const result = calculateIncomeTax({
      grossSalary: mid,
      incomeTaxRules,
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