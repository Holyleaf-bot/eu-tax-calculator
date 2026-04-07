// Finland Tax Rules - 2025
import { CountryTaxRules } from './types';

const fi: CountryTaxRules = {
  code: 'FI',
  name: 'Finland',
  flag: '🇫🇮',
  currency: 'EUR',
  currencySymbol: '€',

  vat: {
    standardRate: 0.24,
    reducedRates: [
      { rate: 0.14, appliesTo: ['Food', 'Restaurants', 'Hotels'] },
      { rate: 0.10, appliesTo: ['Books', 'Medicine', 'Public transport', 'Cultural events'] },
    ],
    threshold: 15000,
    specialRegimes: ['Small business exemption'],
  },

  incomeTax: {
    // 2025 Finnish tax brackets
    brackets: [
      { min: 0, max: 30800, rate: 0.125 },
      { min: 30800, max: 51800, rate: 0.17 },
      { min: 51800, max: 93600, rate: 0.21 },
      { min: 93600, max: null, rate: 0.31 },
    ],
    personalAllowance: 0,
    deductions: [
      {
        name: 'Work income deduction',
        type: 'percentage',
        value: 0.09,
        maxAmount: 1000,
        description: 'Työtulovähennys',
      },
    ],
    marriedFilingOptions: false,
  },

  corporateTax: {
    standardRate: 0.20,
    smallBusinessRate: undefined,
    deductions: [],
    withholdingTax: 0.20,
    capitalGainsRate: 0.30,
  },

  socialContributions: {
    employee: {
      pension: 0.0715,
      health: 0.0152,
      unemployment: 0.0078,
      other: 0,
    },
    employer: {
      pension: 0.175,
      health: 0.0152,
      unemployment: 0.0065,
      other: 0.0168,
    },
    caps: {},
  },
};

export default fi;