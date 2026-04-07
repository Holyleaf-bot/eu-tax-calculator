// Sweden Tax Rules - 2025
import { CountryTaxRules } from './types';

const se: CountryTaxRules = {
  code: 'SE',
  name: 'Sweden',
  flag: '🇸🇪',
  currency: 'SEK',
  currencySymbol: 'kr',

  vat: {
    standardRate: 0.25,
    reducedRates: [
      { rate: 0.12, appliesTo: ['Food', 'Hotels', 'Restaurants', 'Camping'] },
      { rate: 0.06, appliesTo: ['Books', 'Newspapers', 'Public transport', 'Cultural events'] },
    ],
    threshold: 80000,
    specialRegimes: ['Small business exemption', 'Agricultural flat rate'],
  },

  incomeTax: {
    // 2025 Swedish tax brackets (annual)
    brackets: [
      { min: 0, max: 605500, rate: 0.20 },
      { min: 605500, max: 753500, rate: 0.50 },
      { min: 753500, max: null, rate: 0.55 },
    ],
    personalAllowance: 0,
    deductions: [
      {
        name: 'Basic allowance',
        type: 'fixed',
        value: 46500,
        description: 'Basic tax allowance',
      },
      {
        name: 'Work tax credit',
        type: 'percentage',
        value: 0.05,
        description: 'Tax credit for working individuals',
      },
    ],
    marriedFilingOptions: false,
  },

  corporateTax: {
    standardRate: 0.206,
    smallBusinessRate: undefined,
    deductions: [],
    withholdingTax: 0.30,
    capitalGainsRate: 0.30,
  },

  socialContributions: {
    employee: {
      pension: 0.07,
      health: 0,
      unemployment: 0.029,
      other: 0,
    },
    employer: {
      pension: 0.0472,
      health: 0.0414,
      unemployment: 0.0264,
      other: 0.103,
    },
    caps: {
      pension: 523200, // 2025 annual ceiling
    },
  },
};

export default se;