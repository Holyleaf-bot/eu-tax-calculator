// Latvia Tax Rules - 2025
import { CountryTaxRules } from './types';

const lv: CountryTaxRules = {
  code: 'LV',
  name: 'Latvia',
  flag: '🇱🇻',
  currency: 'EUR',
  currencySymbol: '€',

  vat: {
    standardRate: 0.21,
    reducedRates: [
      { rate: 0.12, appliesTo: ['Books', 'Public transport', 'Hotels'] },
      { rate: 0.05, appliesTo: ['Medicine', 'Medical services'] },
    ],
    threshold: 40000,
    specialRegimes: ['Small business exemption'],
  },

  incomeTax: {
    // 2025 Latvian tax brackets (annual)
    brackets: [
      { min: 0, max: 20004, rate: 0.20 },
      { min: 20004, max: 78100, rate: 0.23 },
      { min: 78100, max: null, rate: 0.31 },
    ],
    personalAllowance: 4800,
    deductions: [
      {
        name: 'Differentiated non-taxable minimum',
        type: 'fixed',
        value: 4800,
        description: 'Annual non-taxable minimum',
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
      pension: 0.0758,
      health: 0.0885,
      unemployment: 0.0045,
      other: 0,
    },
    employer: {
      pension: 0.2245,
      health: 0.092,
      unemployment: 0.0045,
      other: 0,
    },
    caps: {
      pension: 90000,
    },
  },
};

export default lv;