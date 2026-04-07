// Luxembourg Tax Rules - 2025
import { CountryTaxRules } from './types';

const lu: CountryTaxRules = {
  code: 'LU',
  name: 'Luxembourg',
  flag: '🇱🇺',
  currency: 'EUR',
  currencySymbol: '€',

  vat: {
    standardRate: 0.17,
    reducedRates: [
      { rate: 0.14, appliesTo: ['Wine', 'Advertising'] },
      { rate: 0.08, appliesTo: ['Food', 'Books', 'Newspapers', 'Hotels', 'Restaurants'] },
      { rate: 0.03, appliesTo: ['Medicine', 'Medical services', 'Basic necessities'] },
    ],
    threshold: 35000,
    specialRegimes: ['Small business exemption', 'Flat-rate farmers'],
  },

  incomeTax: {
    // 2025 Luxembourg tax brackets (annual)
    brackets: [
      { min: 0, max: 11910, rate: 0 },
      { min: 11910, max: 13140, rate: 0.08 },
      { min: 13140, max: 15270, rate: 0.10 },
      { min: 15270, max: 17850, rate: 0.12 },
      { min: 17850, max: 21110, rate: 0.14 },
      { min: 21110, max: 25350, rate: 0.16 },
      { min: 25350, max: 30420, rate: 0.18 },
      { min: 30420, max: 36480, rate: 0.20 },
      { min: 36480, max: 43710, rate: 0.22 },
      { min: 43710, max: 52510, rate: 0.24 },
      { min: 52510, max: 63060, rate: 0.26 },
      { min: 63060, max: 75700, rate: 0.28 },
      { min: 75700, max: 90920, rate: 0.30 },
      { min: 90920, max: 109130, rate: 0.32 },
      { min: 109130, max: 130950, rate: 0.34 },
      { min: 130950, max: 157150, rate: 0.36 },
      { min: 157150, max: 188560, rate: 0.38 },
      { min: 188560, max: null, rate: 0.42 },
    ],
    personalAllowance: 11910,
    deductions: [
      {
        name: 'Solidarity surcharge',
        type: 'percentage',
        value: 0.07,
        description: 'Solidarity tax for employment fund',
      },
    ],
    marriedFilingOptions: true,
  },

  corporateTax: {
    standardRate: 0.15,
    smallBusinessRate: undefined,
    deductions: [],
    withholdingTax: 0.15,
    capitalGainsRate: 0.21,
  },

  socialContributions: {
    employee: {
      pension: 0.08,
      health: 0.037,
      unemployment: 0,
      other: 0,
    },
    employer: {
      pension: 0.08,
      health: 0.037,
      unemployment: 0,
      other: 0.0145,
    },
    caps: {
      pension: 136800, // 2025 ceiling
    },
  },
};

export default lu;