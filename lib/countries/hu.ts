// Hungary Tax Rules - 2025
import { CountryTaxRules } from './types';

const hu: CountryTaxRules = {
  code: 'HU',
  name: 'Hungary',
  flag: '🇭🇺',
  currency: 'HUF',
  currencySymbol: 'Ft',

  vat: {
    standardRate: 0.27,
    reducedRates: [
      { rate: 0.18, appliesTo: ['Food', 'Books', 'Hotels', 'Public transport'] },
      { rate: 0.05, appliesTo: ['Medicine', 'Medical services', 'Books', 'Newspapers'] },
    ],
    threshold: 12000000,
    specialRegimes: ['Small business flat tax (KATA)'],
  },

  incomeTax: {
    brackets: [
      { min: 0, max: null, rate: 0.15 },
    ],
    personalAllowance: 0,
    deductions: [
      {
        name: 'Family tax allowance',
        type: 'fixed',
        value: 244400, // Per child per month (annualized)
        description: 'Family tax allowance (családi adókedvezmény)',
      },
    ],
    marriedFilingOptions: false,
  },

  corporateTax: {
    standardRate: 0.09,
    smallBusinessRate: undefined,
    deductions: [],
    withholdingTax: 0.15,
    capitalGainsRate: 0.15,
  },

  socialContributions: {
    employee: {
      pension: 0.10,
      health: 0.07,
      unemployment: 0.015,
      other: 0,
    },
    employer: {
      pension: 0,
      health: 0,
      unemployment: 0,
      other: 0.13,
    },
    caps: {},
  },
};

export default hu;