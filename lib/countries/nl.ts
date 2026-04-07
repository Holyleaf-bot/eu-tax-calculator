// Netherlands Tax Rules - 2025
import { CountryTaxRules } from './types';

const nl: CountryTaxRules = {
  code: 'NL',
  name: 'Netherlands',
  flag: '🇳🇱',
  currency: 'EUR',
  currencySymbol: '€',

  vat: {
    standardRate: 0.21,
    reducedRates: [
      { rate: 0.09, appliesTo: ['Food', 'Books', 'Medicine', 'Public transport'] },
    ],
    threshold: 25000,
    specialRegimes: ['KOR (Kleineondernemersregeling)'],
  },

  incomeTax: {
    // 2025 Dutch tax - Box 1 income (work and housing)
    brackets: [
      { min: 0, max: 38444, rate: 0.0932 },
      { min: 38444, max: 77041, rate: 0.3693 },
      { min: 77041, max: null, rate: 0.4950 },
    ],
    personalAllowance: 0,
    deductions: [
      {
        name: 'Arbeidskorting (Employment tax credit)',
        type: 'fixed',
        value: 5712,
        description: 'Tax credit for employed individuals',
      },
      {
        name: 'Algemene heffingskorting (General tax credit)',
        type: 'fixed',
        value: 3300,
        description: 'General tax credit for all taxpayers',
      },
    ],
    marriedFilingOptions: false,
  },

  corporateTax: {
    standardRate: 0.258,
    smallBusinessRate: {
      rate: 0.19,
      threshold: 200000,
    },
    deductions: [],
    withholdingTax: 0.152,
    capitalGainsRate: 0.08,
  },

  socialContributions: {
    employee: {
      pension: 0.178,
      health: 0.0543,
      unemployment: 0,
      other: 0,
    },
    employer: {
      pension: 0,
      health: 0.0668,
      unemployment: 0.0264,
      other: 0.0661,
    },
    caps: {
      pension: 73332, // 2025 premium limit
    },
  },
};

export default nl;