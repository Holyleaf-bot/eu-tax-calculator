// Greece Tax Rules - 2025
import { CountryTaxRules } from './types';

const gr: CountryTaxRules = {
  code: 'GR',
  name: 'Greece',
  flag: '🇬🇷',
  currency: 'EUR',
  currencySymbol: '€',

  vat: {
    standardRate: 0.24,
    reducedRates: [
      { rate: 0.13, appliesTo: ['Food', 'Restaurants', 'Hotels', 'Transport'] },
      { rate: 0.06, appliesTo: ['Books', 'Medicine', 'Medical services'] },
    ],
    threshold: 10000,
    specialRegimes: ['Small business exemption', 'Agricultural flat rate'],
  },

  incomeTax: {
    // 2025 Greek tax brackets (annual)
    brackets: [
      { min: 0, max: 10000, rate: 0 },
      { min: 10000, max: 21000, rate: 0.15 },
      { min: 21000, max: 31000, rate: 0.25 },
      { min: 31000, max: 42000, rate: 0.30 },
      { min: 42000, max: null, rate: 0.35 },
    ],
    personalAllowance: 10000,
    deductions: [
      {
        name: 'Tax-free allowance',
        type: 'fixed',
        value: 10000,
        description: 'Tax-free allowance',
      },
    ],
    marriedFilingOptions: true,
  },

  corporateTax: {
    standardRate: 0.22,
    smallBusinessRate: undefined,
    deductions: [],
    withholdingTax: 0.15,
    capitalGainsRate: 0.15,
  },

  socialContributions: {
    employee: {
      pension: 0.0667,
      health: 0.0322,
      unemployment: 0.01,
      other: 0.0069,
    },
    employer: {
      pension: 0.1767,
      health: 0.051,
      unemployment: 0.0093,
      other: 0.0076,
    },
    caps: {},
  },
};

export default gr;