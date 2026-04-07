// Poland Tax Rules - 2025
import { CountryTaxRules } from './types';

const pl: CountryTaxRules = {
  code: 'PL',
  name: 'Poland',
  flag: '🇵🇱',
  currency: 'PLN',
  currencySymbol: 'zł',

  vat: {
    standardRate: 0.23,
    reducedRates: [
      { rate: 0.08, appliesTo: ['Food', 'Books', 'Medicine', 'Public transport'] },
      { rate: 0.05, appliesTo: ['Basic food', 'Books', 'Agricultural products'] },
    ],
    threshold: 200000,
    specialRegimes: ['VAT exemption for small taxpayers', 'Flat-rate farming'],
  },

  incomeTax: {
    // 2025 Polish tax brackets (annual)
    brackets: [
      { min: 0, max: 120000, rate: 0.12 },
      { min: 120000, max: null, rate: 0.32 },
    ],
    personalAllowance: 30000,
    deductions: [
      {
        name: 'Tax-free allowance',
        type: 'fixed',
        value: 30000,
        description: 'Annual tax-free allowance',
      },
      {
        name: 'Health insurance',
        type: 'percentage',
        value: 0.09,
        description: 'Health insurance contribution',
      },
    ],
    marriedFilingOptions: true,
  },

  corporateTax: {
    standardRate: 0.19,
    smallBusinessRate: {
      rate: 0.09,
      threshold: 2000000,
    },
    deductions: [],
    withholdingTax: 0.19,
    capitalGainsRate: 0.19,
  },

  socialContributions: {
    employee: {
      pension: 0.0976,
      health: 0.0245,
      unemployment: 0,
      other: 0,
    },
    employer: {
      pension: 0.0976,
      health: 0.0475,
      unemployment: 0.0245,
      other: 0.067,
    },
    caps: {
      pension: 184380, // 2025 annual ceiling
    },
  },
};

export default pl;