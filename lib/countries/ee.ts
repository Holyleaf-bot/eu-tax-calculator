// Estonia Tax Rules - 2025
import { CountryTaxRules } from './types';

const ee: CountryTaxRules = {
  code: 'EE',
  name: 'Estonia',
  flag: '🇪🇪',
  currency: 'EUR',
  currencySymbol: '€',

  vat: {
    standardRate: 0.20,
    reducedRates: [
      { rate: 0.09, appliesTo: ['Books', 'Medicine', 'Medical services'] },
      { rate: 0.05, appliesTo: ['Food', 'Newspapers', 'Public transport'] },
    ],
    threshold: 40000,
    specialRegimes: ['Small business exemption'],
  },

  incomeTax: {
    brackets: [
      { min: 0, max: null, rate: 0.20 },
    ],
    personalAllowance: 7320, // 2025 basic exemption
    deductions: [
      {
        name: 'Basic exemption',
        type: 'fixed',
        value: 7320,
        description: 'Tax-free income threshold',
      },
    ],
    marriedFilingOptions: false,
  },

  corporateTax: {
    standardRate: 0.20,
    smallBusinessRate: undefined,
    deductions: [],
    withholdingTax: 0.20,
    capitalGainsRate: 0.20,
  },

  socialContributions: {
    employee: {
      pension: 0.02,
      health: 0.013,
      unemployment: 0.008,
      other: 0,
    },
    employer: {
      pension: 0.16,
      health: 0.13,
      unemployment: 0.008,
      other: 0,
    },
    caps: {},
  },
};

export default ee;