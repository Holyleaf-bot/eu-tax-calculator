// Lithuania Tax Rules - 2025
import { CountryTaxRules } from './types';

const lt: CountryTaxRules = {
  code: 'LT',
  name: 'Lithuania',
  flag: '🇱🇹',
  currency: 'EUR',
  currencySymbol: '€',

  vat: {
    standardRate: 0.21,
    reducedRates: [
      { rate: 0.09, appliesTo: ['Books', 'Hotels', 'Restaurants'] },
      { rate: 0.05, appliesTo: ['Food', 'Medicine', 'Medical services', 'Public transport'] },
    ],
    threshold: 40000,
    specialRegimes: ['Small business exemption'],
  },

  incomeTax: {
    // 2025 Lithuanian tax brackets (annual)
    brackets: [
      { min: 0, max: 53400, rate: 0.20 },
      { min: 53400, max: null, rate: 0.32 },
    ],
    personalAllowance: 5500,
    deductions: [
      {
        name: 'Non-taxable income',
        type: 'fixed',
        value: 5500,
        description: 'Annual non-taxable amount',
      },
    ],
    marriedFilingOptions: false,
  },

  corporateTax: {
    standardRate: 0.15,
    smallBusinessRate: {
      rate: 0.05,
      threshold: 300000,
    },
    deductions: [],
    withholdingTax: 0.15,
    capitalGainsRate: 0.15,
  },

  socialContributions: {
    employee: {
      pension: 0.0698,
      health: 0.0698,
      unemployment: 0,
      other: 0,
    },
    employer: {
      pension: 0.0177,
      health: 0,
      unemployment: 0,
      other: 0,
    },
    caps: {},
  },
};

export default lt;