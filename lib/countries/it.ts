// Italy Tax Rules - 2025
import { CountryTaxRules } from './types';

const it: CountryTaxRules = {
  code: 'IT',
  name: 'Italy',
  flag: '🇮🇹',
  currency: 'EUR',
  currencySymbol: '€',

  vat: {
    standardRate: 0.22,
    reducedRates: [
      { rate: 0.10, appliesTo: ['Hotels', 'Restaurants', 'Public transport', 'Medical services'] },
      { rate: 0.05, appliesTo: ['Basic necessities', 'Social housing'] },
      { rate: 0.04, appliesTo: ['Food', 'Books', 'Newspapers'] },
    ],
    threshold: 70000,
    specialRegimes: ['Regime forfettario', 'Regime dei minimi'],
  },

  incomeTax: {
    // IRPEF 2025
    brackets: [
      { min: 0, max: 29000, rate: 0.23 },
      { min: 29000, max: 50000, rate: 0.35 },
      { min: 50000, max: null, rate: 0.43 },
    ],
    personalAllowance: 0,
    deductions: [
      {
        name: 'Lavoro dipendente',
        type: 'fixed',
        value: 1910,
        description: 'Tax credit for employment income',
      },
      {
        name: 'Detrazione familiari a carico',
        type: 'fixed',
        value: 800,
        description: 'Tax credit for dependent family members',
      },
    ],
    marriedFilingOptions: false,
  },

  corporateTax: {
    standardRate: 0.24, // IRES
    smallBusinessRate: undefined,
    deductions: [],
    withholdingTax: 0.26,
    capitalGainsRate: 0.26,
  },

  socialContributions: {
    employee: {
      pension: 0.0919,
      health: 0,
      unemployment: 0.00307,
      other: 0,
    },
    employer: {
      pension: 0.2381,
      health: 0,
      unemployment: 0,
      other: 0.0756,
    },
    caps: {
      pension: 118440, // 2025 annual ceiling
    },
  },
};

export default it;