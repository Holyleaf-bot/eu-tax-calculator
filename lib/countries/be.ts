// Belgium Tax Rules - 2025
import { CountryTaxRules } from './types';

const be: CountryTaxRules = {
  code: 'BE',
  name: 'Belgium',
  flag: '🇧🇪',
  currency: 'EUR',
  currencySymbol: '€',

  vat: {
    standardRate: 0.21,
    reducedRates: [
      { rate: 0.12, appliesTo: ['Food', 'Hotels', 'Social housing'] },
      { rate: 0.06, appliesTo: ['Books', 'Newspapers', 'Public transport', 'Medicine'] },
    ],
    threshold: 25000,
    specialRegimes: ['Franchise scheme', 'Lump-sum farmers'],
  },

  incomeTax: {
    // 2025 Belgian tax brackets
    brackets: [
      { min: 0, max: 15700, rate: 0.25 },
      { min: 15700, max: 27920, rate: 0.40 },
      { min: 27920, max: 48780, rate: 0.45 },
      { min: 48780, max: null, rate: 0.50 },
    ],
    personalAllowance: 0,
    deductions: [
      {
        name: 'Tax-free allowance',
        type: 'fixed',
        value: 10390,
        description: 'Tax-free allowance for all taxpayers',
      },
      {
        name: 'Professional expenses',
        type: 'fixed',
        value: 5800,
        description: 'Forfaitary deduction',
      },
    ],
    marriedFilingOptions: true,
  },

  corporateTax: {
    standardRate: 0.25,
    smallBusinessRate: {
      rate: 0.20,
      threshold: 100000,
    },
    deductions: [],
    withholdingTax: 0.30,
    capitalGainsRate: 0.30,
  },

  socialContributions: {
    employee: {
      pension: 0.1350,
      health: 0.0135,
      unemployment: 0.0087,
      other: 0,
    },
    employer: {
      pension: 0.0886,
      health: 0.2468,
      unemployment: 0.0131,
      other: 0.0625,
    },
    caps: {
      pension: 55296,
    },
  },
};

export default be;