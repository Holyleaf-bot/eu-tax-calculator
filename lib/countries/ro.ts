// Romania Tax Rules - 2025
import { CountryTaxRules } from './types';

const ro: CountryTaxRules = {
  code: 'RO',
  name: 'Romania',
  flag: '🇷🇴',
  currency: 'RON',
  currencySymbol: 'lei',

  vat: {
    standardRate: 0.19,
    reducedRates: [
      { rate: 0.09, appliesTo: ['Food', 'Books', 'Medicine', 'Hotels', 'Public transport'] },
      { rate: 0.05, appliesTo: ['Bread', 'Milk', 'School supplies', 'Funeral services'] },
    ],
    threshold: 300000,
    specialRegimes: ['Small business flat tax', 'IT exemption'],
  },

  incomeTax: {
    brackets: [
      { min: 0, max: null, rate: 0.10 },
    ],
    personalAllowance: 0,
    deductions: [],
    marriedFilingOptions: false,
  },

  corporateTax: {
    standardRate: 0.16,
    smallBusinessRate: {
      rate: 0.01,
      threshold: 1000000,
    },
    deductions: [],
    withholdingTax: 0.05,
    capitalGainsRate: 0.10,
  },

  socialContributions: {
    employee: {
      pension: 0.25,
      health: 0.10,
      unemployment: 0,
      other: 0,
    },
    employer: {
      pension: 0,
      health: 0,
      unemployment: 0.0025,
      other: 0.0225,
    },
    caps: {},
  },
};

export default ro;