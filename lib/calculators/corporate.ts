// Corporate Tax Calculator Engine
import {
  CorporateTaxRules,
  CorporateTaxResult,
  Deduction,
} from '../countries/types';

interface CorporateTaxInput {
  revenue: number;
  expenses: number;
  corporateTaxRules: CorporateTaxRules;
  dividendAmount?: number;
}

export function calculateCorporateTax(input: CorporateTaxInput): CorporateTaxResult {
  const { revenue, expenses, corporateTaxRules, dividendAmount = 0 } = input;

  // Step 1: Calculate gross profit
  const grossProfit = revenue - expenses;

  // Step 2: Apply deductions
  let totalDeductions = 0;
  for (const deduction of corporateTaxRules.deductions) {
    totalDeductions += calculateDeductionAmount(deduction, grossProfit);
  }

  // Step 3: Determine applicable tax rate
  const taxableProfit = Math.max(0, grossProfit - totalDeductions);
  let applicableRate = corporateTaxRules.standardRate;

  // Check if small business rate applies
  if (corporateTaxRules.smallBusinessRate && taxableProfit <= corporateTaxRules.smallBusinessRate.threshold) {
    applicableRate = corporateTaxRules.smallBusinessRate.rate;
  }

  // Step 4: Calculate corporate tax
  const corporateTax = taxableProfit * applicableRate;

  // Step 5: Calculate net profit after tax
  const netProfit = grossProfit - corporateTax;

  // Step 6: Calculate dividend withholding
  const dividendsWithholding = dividendAmount * corporateTaxRules.withholdingTax;
  const netDividends = dividendAmount - dividendsWithholding;

  // Step 7: Calculate effective tax rate
  const effectiveRate = grossProfit > 0 ? corporateTax / grossProfit : 0;

  return {
    revenue: Math.round(revenue * 100) / 100,
    expenses: Math.round(expenses * 100) / 100,
    grossProfit: Math.round(grossProfit * 100) / 100,
    corporateTax: Math.round(corporateTax * 100) / 100,
    netProfit: Math.round(netProfit * 100) / 100,
    effectiveRate: Math.round(effectiveRate * 10000) / 10000,
    dividendsWithholding: Math.round(dividendsWithholding * 100) / 100,
    netDividends: Math.round(netDividends * 100) / 100,
  };
}

function calculateDeductionAmount(deduction: Deduction, profit: number): number {
  let amount: number;

  if (deduction.type === 'fixed') {
    amount = deduction.value;
  } else {
    amount = profit * deduction.value;
  }

  if (deduction.maxAmount !== undefined) {
    amount = Math.min(amount, deduction.maxAmount);
  }

  return amount;
}

// Calculate required revenue for target net profit
export function calculateRequiredRevenue(
  targetNetProfit: number,
  expenseRatio: number,
  corporateTaxRules: CorporateTaxRules
): number {
  // Estimate based on effective tax rate
  const avgTaxRate = corporateTaxRules.standardRate;

  // Net profit = (Revenue - Expenses) × (1 - tax rate)
  // Let's assume expenses are a percentage of revenue
  // Net = Revenue × (1 - expenseRatio) × (1 - taxRate)
  // Revenue = Net / ((1 - expenseRatio) × (1 - taxRate))

  const factor = (1 - expenseRatio) * (1 - avgTaxRate);
  const estimatedRevenue = targetNetProfit / factor;

  // Refine with actual calculation
  let low = targetNetProfit;
  let high = estimatedRevenue * 1.5;
  let iterations = 0;
  const maxIterations = 50;

  while (high - low > 1 && iterations < maxIterations) {
    const mid = (low + high) / 2;
    const expenses = mid * expenseRatio;
    const result = calculateCorporateTax({
      revenue: mid,
      expenses,
      corporateTaxRules,
    });

    if (result.netProfit < targetNetProfit) {
      low = mid;
    } else {
      high = mid;
    }
    iterations++;
  }

  return Math.round(high);
}