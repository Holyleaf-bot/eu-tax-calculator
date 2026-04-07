// VAT Calculator Engine
import { VatRules, VatResult } from '../countries/types';

export type VatRateType = 'standard' | 'reduced' | 'super-reduced';
export type VatCalculationMode = 'add' | 'extract';

interface VatInput {
  amount: number;
  vatRules: VatRules;
  rateType?: VatRateType;
  mode: VatCalculationMode;
}

export function calculateVat(input: VatInput): VatResult {
  const { amount, vatRules, rateType = 'standard', mode } = input;

  // Determine the applicable rate
  let rate: number;
  let appliesTo: string[] = [];

  switch (rateType) {
    case 'standard':
      rate = vatRules.standardRate;
      break;
    case 'reduced':
      rate = vatRules.reducedRates[0]?.rate ?? vatRules.standardRate;
      appliesTo = vatRules.reducedRates[0]?.appliesTo ?? [];
      break;
    case 'super-reduced':
      rate = vatRules.superReducedRate ?? vatRules.reducedRates[0]?.rate ?? vatRules.standardRate;
      break;
    default:
      rate = vatRules.standardRate;
  }

  let netAmount: number;
  let vatAmount: number;
  let grossAmount: number;

  if (mode === 'add') {
    // Add VAT to net amount
    netAmount = amount;
    vatAmount = amount * rate;
    grossAmount = amount * (1 + rate);
  } else {
    // Extract VAT from gross amount
    grossAmount = amount;
    netAmount = amount / (1 + rate);
    vatAmount = amount - netAmount;
  }

  return {
    netAmount: Math.round(netAmount * 100) / 100,
    vatAmount: Math.round(vatAmount * 100) / 100,
    grossAmount: Math.round(grossAmount * 100) / 100,
    rate,
    rateType,
  };
}

export function formatVatRate(rate: number): string {
  return `${(rate * 100).toFixed(0)}%`;
}

export function getVatRateDescription(rateType: VatRateType, vatRules: VatRules): string {
  switch (rateType) {
    case 'standard':
      return `Standard rate: ${formatVatRate(vatRules.standardRate)}`;
    case 'reduced':
      const reduced = vatRules.reducedRates[0];
      return reduced
        ? `Reduced rate: ${formatVatRate(reduced.rate)} (${reduced.appliesTo.slice(0, 3).join(', ')})`
        : 'No reduced rate';
    case 'super-reduced':
      return vatRules.superReducedRate
        ? `Super-reduced rate: ${formatVatRate(vatRules.superReducedRate)}`
        : 'No super-reduced rate';
  }
}

// Check if VAT registration threshold applies
export function checkVatThreshold(annualTurnover: number, vatRules: VatRules): {
  requiresRegistration: boolean;
  threshold: number;
  turnover: number;
} {
  return {
    requiresRegistration: annualTurnover >= vatRules.threshold,
    threshold: vatRules.threshold,
    turnover: annualTurnover,
  };
}