// Slovenia Tax Rules - 2025
import { CountryTaxRules } from './types';

const si: CountryTaxRules = {
  code: 'SI',
  name: 'Slovenia',
  flag: '🇸🇮',
  currency: 'EUR',
  currencySymbol: '€',

  vat: {
    standardRate: 0.22,
    reducedRates: [
      { rate: 0.095, appliesTo: ['Food', 'Books', 'Hotels', 'Restaurants', 'Public transport'] },
      { rate: 0.05, appliesTo: ['Medicine', 'Medical services', 'Books', 'Newspapers'] },
    ],
    threshold: 50000,
    specialRegimes: ['Small business exemption', 'Flat-rate farmers'],
  },

  incomeTax: {
    // 2025 Slovenian tax brackets (annual)
    brackets: [
      { min: 0, max: 8750, rate: 0 },
      { min: 8750, max: 26000, rate: 0.16 },
      { min: 26000, max: 52000, rate: 0.26 },
      { min: 52000, max: null, rate: 0.39 },
    ],
    personalAllowance: 5200,
    deductions: [
      {
        name: 'General allowance',
        type: 'fixed',
        value: 5200,
        description: 'Splošna olajšava',
      },
      {
        name: 'Additional allowance for dependent',
        type: 'fixed',
        value: 5900,
        description: 'Per dependent child',
      },
    ],
    marriedFilingOptions: false,
  },

  corporateTax: {
    standardRate: 0.19,
    smallBusinessRate: undefined,
    deductions: [],
    withholdingTax: 0.15,
    capitalGainsRate: 0.25,
  },

  socialContributions: {
    employee: {
      pension: 0.1535,
      health: 0.0636,
      unemployment: 0.0014,
      other: 0,
    },
    employer: {
      pension: 0.1035,
      health: 0.0736,
      unemployment: 0.0014,
      other: 0.0053,
    },
    caps: {},
  },
};

export default si;