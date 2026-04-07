// Malta Tax Rules - 2025
import { CountryTaxRules } from './types';

const mt: CountryTaxRules = {
  code: 'MT',
  name: 'Malta',
  flag: '🇲🇹',
  currency: 'EUR',
  currencySymbol: '€',

  vat: {
    standardRate: 0.18,
    reducedRates: [
      { rate: 0.07, appliesTo: ['Hotels', 'Tourist services'] },
      { rate: 0.05, appliesTo: ['Books', 'Newspapers', 'Medical equipment', 'Art'] },
      { rate: 0.0, appliesTo: ['Food', 'Medicine', 'Medical services'] },
    ],
    threshold: 20000,
    specialRegimes: ['Small business exemption', 'Flat-rate farmers'],
  },

  incomeTax: {
    // 2025 Maltese tax brackets (annual)
    brackets: [
      { min: 0, max: 9100, rate: 0 },
      { min: 9100, max: 14500, rate: 0.20 },
      { min: 14500, max: 19500, rate: 0.25 },
      { min: 19500, max: 60500, rate: 0.30 },
      { min: 60500, max: null, rate: 0.35 },
    ],
    personalAllowance: 9100,
    deductions: [],
    marriedFilingOptions: true,
  },

  corporateTax: {
    standardRate: 0.35,
    smallBusinessRate: undefined,
    deductions: [],
    withholdingTax: 0.35,
    capitalGainsRate: 0.35,
  },

  socialContributions: {
    employee: {
      pension: 0.10,
      health: 0,
      unemployment: 0,
      other: 0,
    },
    employer: {
      pension: 0.10,
      health: 0,
      unemployment: 0,
      other: 0.005,
    },
    caps: {
      pension: 25680,
    },
  },
};

export default mt;