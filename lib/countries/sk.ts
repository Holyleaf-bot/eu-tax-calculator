// Slovakia Tax Rules - 2025
import { CountryTaxRules } from './types';

const sk: CountryTaxRules = {
  code: 'SK',
  name: 'Slovakia',
  flag: '🇸🇰',
  currency: 'EUR',
  currencySymbol: '€',

  vat: {
    standardRate: 0.20,
    reducedRates: [
      { rate: 0.10, appliesTo: ['Food', 'Medicine', 'Medical devices', 'Books', 'Newspapers'] },
    ],
    threshold: 50000,
    specialRegimes: ['Small business exemption', 'Flat-rate farmers'],
  },

  incomeTax: {
    // 2025 Slovak tax brackets (annual)
    brackets: [
      { min: 0, max: 41945, rate: 0.19 },
      { min: 41945, max: null, rate: 0.25 },
    ],
    personalAllowance: 5000,
    deductions: [
      {
        name: 'Non-taxable part of tax base',
        type: 'fixed',
        value: 5000,
        description: 'Basic allowance',
      },
      {
        name: 'Tax bonus for children',
        type: 'fixed',
        value: 147.6 * 12,
        description: 'Per dependent child',
      },
    ],
    marriedFilingOptions: false,
  },

  corporateTax: {
    standardRate: 0.21,
    smallBusinessRate: {
      rate: 0.15,
      threshold: 100000,
    },
    deductions: [],
    withholdingTax: 0.07,
    capitalGainsRate: 0.19,
  },

  socialContributions: {
    employee: {
      pension: 0.04,
      health: 0.04,
      unemployment: 0.01,
      other: 0.014,
    },
    employer: {
      pension: 0.094,
      health: 0.10,
      unemployment: 0.01,
      other: 0.008,
    },
    caps: {
      pension: 80000,
    },
  },
};

export default sk;