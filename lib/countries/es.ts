// Spain Tax Rules - 2025
import { CountryTaxRules } from './types';

const es: CountryTaxRules = {
  code: 'ES',
  name: 'Spain',
  flag: '🇪🇸',
  currency: 'EUR',
  currencySymbol: '€',

  vat: {
    standardRate: 0.21,
    reducedRates: [
      { rate: 0.10, appliesTo: ['Food', 'Hotels', 'Restaurants', 'Public transport'] },
      { rate: 0.04, appliesTo: ['Basic necessities', 'Books', 'Medicine'] },
    ],
    threshold: 85000,
    specialRegimes: ['REAGYP (agricultural)', 'Simplified regime'],
  },

  incomeTax: {
    // IRPF 2025 - state rates (regional variations apply)
    brackets: [
      { min: 0, max: 12750, rate: 0.19 },
      { min: 12750, max: 20200, rate: 0.24 },
      { min: 20200, max: 35200, rate: 0.30 },
      { min: 35200, max: 60000, rate: 0.37 },
      { min: 60000, max: 300000, rate: 0.45 },
      { min: 300000, max: null, rate: 0.47 },
    ],
    personalAllowance: 5550,
    deductions: [
      {
        name: 'Personal allowance (taxpayer)',
        type: 'fixed',
        value: 5550,
        description: 'Minimum personal allowance',
      },
      {
        name: 'Family allowance (dependent)',
        type: 'fixed',
        value: 2400,
        description: 'Per dependent under 25 or disabled',
      },
    ],
    marriedFilingOptions: true,
  },

  corporateTax: {
    standardRate: 0.25,
    smallBusinessRate: {
      rate: 0.23,
      threshold: 1000000,
    },
    deductions: [],
    withholdingTax: 0.19,
    capitalGainsRate: 0.19,
  },

  socialContributions: {
    employee: {
      pension: 0.047,
      health: 0.0155,
      unemployment: 0.0117,
      other: 0.0001,
    },
    employer: {
      pension: 0.2356,
      health: 0.047,
      unemployment: 0.0635,
      other: 0.002,
    },
    caps: {
      pension: 58680, // 2025 maximum
    },
  },
};

export default es;