// Cyprus Tax Rules - 2025
import { CountryTaxRules } from './types';

const cy: CountryTaxRules = {
  code: 'CY',
  name: 'Cyprus',
  flag: '🇨🇾',
  currency: 'EUR',
  currencySymbol: '€',

  vat: {
    standardRate: 0.19,
    reducedRates: [
      { rate: 0.09, appliesTo: ['Food', 'Books', 'Restaurants', 'Hotels'] },
      { rate: 0.05, appliesTo: ['Medicine', 'Medical services', 'Funeral services'] },
    ],
    threshold: 15600,
    specialRegimes: ['Small business exemption'],
  },

  incomeTax: {
    // 2025 Cyprus tax brackets (annual)
    brackets: [
      { min: 0, max: 19500, rate: 0 },
      { min: 19500, max: 28500, rate: 0.20 },
      { min: 28500, max: 36300, rate: 0.25 },
      { min: 36300, max: 60000, rate: 0.30 },
      { min: 60000, max: null, rate: 0.35 },
    ],
    personalAllowance: 19500,
    deductions: [
      {
        name: 'Social insurance contribution',
        type: 'percentage',
        value: 0.083,
        description: 'Social insurance deduction',
      },
    ],
    marriedFilingOptions: false,
  },

  corporateTax: {
    standardRate: 0.125,
    smallBusinessRate: undefined,
    deductions: [],
    withholdingTax: 0.17,
    capitalGainsRate: 0.20,
  },

  socialContributions: {
    employee: {
      pension: 0.083,
      health: 0.0225,
      unemployment: 0,
      other: 0,
    },
    employer: {
      pension: 0.083,
      health: 0.029,
      unemployment: 0,
      other: 0.037,
    },
    caps: {},
  },
};

export default cy;