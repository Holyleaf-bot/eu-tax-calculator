// Croatia Tax Rules - 2025
import { CountryTaxRules } from './types';

const hr: CountryTaxRules = {
  code: 'HR',
  name: 'Croatia',
  flag: '🇭🇷',
  currency: 'EUR',
  currencySymbol: '€',

  vat: {
    standardRate: 0.25,
    reducedRates: [
      { rate: 0.13, appliesTo: ['Food', 'Newspapers', 'Hotels'] },
      { rate: 0.05, appliesTo: ['Books', 'Medicine', 'Medical services', 'Bread', 'Milk'] },
    ],
    threshold: 40000,
    specialRegimes: ['Small business exemption', 'Flat-rate farming'],
  },

  incomeTax: {
    // 2025 Croatian tax brackets (annual)
    brackets: [
      { min: 0, max: 50000, rate: 0.20 },
      { min: 50000, max: null, rate: 0.30 },
    ],
    personalAllowance: 6000,
    deductions: [
      {
        name: 'Personal allowance',
        type: 'fixed',
        value: 6000,
        description: 'Basic personal allowance',
      },
      {
        name: 'Dependent allowance',
        type: 'fixed',
        value: 4000,
        description: 'Per dependent',
      },
    ],
    marriedFilingOptions: false,
  },

  corporateTax: {
    standardRate: 0.18,
    smallBusinessRate: undefined,
    deductions: [],
    withholdingTax: 0.12,
    capitalGainsRate: 0.12,
  },

  socialContributions: {
    employee: {
      pension: 0.20,
      health: 0.0165,
      unemployment: 0,
      other: 0,
    },
    employer: {
      pension: 0,
      health: 0.0165,
      unemployment: 0,
      other: 0,
    },
    caps: {},
  },
};

export default hr;