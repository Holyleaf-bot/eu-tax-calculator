// Portugal Tax Rules - 2025
import { CountryTaxRules } from './types';

const pt: CountryTaxRules = {
  code: 'PT',
  name: 'Portugal',
  flag: '🇵🇹',
  currency: 'EUR',
  currencySymbol: '€',

  vat: {
    standardRate: 0.23,
    reducedRates: [
      { rate: 0.13, appliesTo: ['Food', 'Books', 'Public transport', 'Hotels'] },
      { rate: 0.06, appliesTo: ['Basic necessities', 'Medicine', 'Medical services'] },
    ],
    threshold: 12500,
    specialRegimes: ['Small business exemption', 'Simplified regime'],
  },

  incomeTax: {
    // IRS 2025 brackets (annual)
    brackets: [
      { min: 0, max: 7703, rate: 0.145 },
      { min: 7703, max: 11608, rate: 0.21 },
      { min: 11608, max: 16372, rate: 0.265 },
      { min: 16372, max: 21235, rate: 0.285 },
      { min: 21235, max: 26985, rate: 0.35 },
      { min: 26985, max: 39745, rate: 0.37 },
      { min: 39745, max: 52035, rate: 0.435 },
      { min: 52035, max: 81210, rate: 0.45 },
      { min: 81210, max: null, rate: 0.48 },
    ],
    personalAllowance: 0,
    deductions: [
      {
        name: 'Dedução específica',
        type: 'percentage',
        value: 0.20,
        maxAmount: 8500,
        description: 'Specific deduction for employment income',
      },
    ],
    marriedFilingOptions: true,
  },

  corporateTax: {
    standardRate: 0.21,
    smallBusinessRate: {
      rate: 0.17,
      threshold: 15000,
    },
    deductions: [],
    withholdingTax: 0.25,
    capitalGainsRate: 0.28,
  },

  socialContributions: {
    employee: {
      pension: 0.11,
      health: 0,
      unemployment: 0,
      other: 0,
    },
    employer: {
      pension: 0.2375,
      health: 0,
      unemployment: 0,
      other: 0.1045,
    },
    caps: {},
  },
};

export default pt;