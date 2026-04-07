// Bulgaria Tax Rules - 2025
import { CountryTaxRules } from './types';

const bg: CountryTaxRules = {
  code: 'BG',
  name: 'Bulgaria',
  flag: '🇧🇬',
  currency: 'BGN',
  currencySymbol: 'лв',

  vat: {
    standardRate: 0.20,
    reducedRates: [
      { rate: 0.09, appliesTo: ['Hotels'] },
      { rate: 0.07, appliesTo: ['Books', 'Medicine', 'Medical services'] },
    ],
    threshold: 100000,
    specialRegimes: ['Small business exemption'],
  },

  incomeTax: {
    brackets: [
      { min: 0, max: null, rate: 0.10 },
    ],
    personalAllowance: 0,
    deductions: [],
    marriedFilingOptions: false,
  },

  corporateTax: {
    standardRate: 0.10,
    smallBusinessRate: undefined,
    deductions: [],
    withholdingTax: 0.05,
    capitalGainsRate: 0.10,
  },

  socialContributions: {
    employee: {
      pension: 0.0555,
      health: 0.018,
      unemployment: 0.006,
      other: 0.006,
    },
    employer: {
      pension: 0.1178,
      health: 0.0475,
      unemployment: 0.006,
      other: 0.048,
    },
    caps: {
      pension: 42000, // 2025 ceiling
    },
  },
};

export default bg;