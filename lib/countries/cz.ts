// Czechia Tax Rules - 2025
import { CountryTaxRules } from './types';

const cz: CountryTaxRules = {
  code: 'CZ',
  name: 'Czechia',
  flag: '🇨🇿',
  currency: 'CZK',
  currencySymbol: 'Kč',

  vat: {
    standardRate: 0.21,
    reducedRates: [
      { rate: 0.12, appliesTo: ['Food', 'Books', 'Medicine', 'Public transport'] },
      { rate: 0.05, appliesTo: ['Basic necessities', 'Medical aids'] },
    ],
    threshold: 1200000, // 2025 threshold
    specialRegimes: ['Small business exemption', 'Flat-rate farming'],
  },

  incomeTax: {
    // 2025 Czech tax - flat tax regime or progressive
    brackets: [
      { min: 0, max: null, rate: 0.15 },
    ],
    personalAllowance: 0,
    deductions: [
      {
        name: 'Taxpayer allowance',
        type: 'fixed',
        value: 30840,
        description: 'Basic personal allowance',
      },
      {
        name: 'Student allowance',
        type: 'fixed',
        value: 4020,
        description: 'Tax credit for students',
      },
    ],
    marriedFilingOptions: false,
  },

  corporateTax: {
    standardRate: 0.21,
    smallBusinessRate: undefined,
    deductions: [],
    withholdingTax: 0.15,
    capitalGainsRate: 0.15,
  },

  socialContributions: {
    employee: {
      pension: 0.065,
      health: 0.045,
      unemployment: 0,
      other: 0,
    },
    employer: {
      pension: 0.217,
      health: 0.09,
      unemployment: 0.012,
      other: 0.008,
    },
    caps: {},
  },
};

export default cz;