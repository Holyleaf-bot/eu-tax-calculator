// Germany Tax Rules - 2025
import { CountryTaxRules } from './types';

const de: CountryTaxRules = {
  code: 'DE',
  name: 'Germany',
  flag: '🇩🇪',
  currency: 'EUR',
  currencySymbol: '€',

  vat: {
    standardRate: 0.19,
    reducedRates: [
      { rate: 0.07, appliesTo: ['Food', 'Books', 'Newspapers', 'Public transport', 'Cultural events'] },
    ],
    threshold: 22500,
    specialRegimes: ['Margin scheme for used goods', 'Flat-rate farming'],
  },

  incomeTax: {
    // 2025 German income tax brackets (annual)
    brackets: [
      { min: 0, max: 12095, rate: 0 },
      { min: 12095, max: 17643, rate: 0.14 },
      { min: 17643, max: 68481, rate: 0.42 },
      { min: 68481, max: 277825, rate: 0.42 },
      { min: 277825, max: null, rate: 0.45 }, // Reichensteuer
    ],
    personalAllowance: 12095, // Grundfreibetrag 2025
    deductions: [
      {
        name: 'Work-related expenses',
        type: 'fixed',
        value: 1285, // Werbungskostenpauschale 2025
        description: 'Standard deduction for work-related expenses',
      },
      {
        name: 'Special expenses',
        type: 'fixed',
        value: 36,
        description: 'Standard deduction for special expenses',
      },
      {
        name: 'Health insurance',
        type: 'percentage',
        value: 0.073,
        maxAmount: 1900,
        description: 'Employee health insurance contribution (deductible portion)',
      },
    ],
    marriedFilingOptions: true,
    solidaritySurcharge: {
      rate: 0.055,
      threshold: 18130,
    },
    churchTax: {
      rate: 0.09,
      applies: ['Catholic', 'Protestant', 'Jewish'],
    },
  },

  corporateTax: {
    standardRate: 0.15,
    smallBusinessRate: undefined,
    deductions: [
      {
        name: 'Trade tax allowance',
        type: 'fixed',
        value: 24500,
        description: 'Gewerbesteuerfreibetrag for trade tax',
      },
    ],
    withholdingTax: 0.25,
    capitalGainsRate: 0.25,
  },

  socialContributions: {
    employee: {
      pension: 0.093,
      health: 0.073,
      unemployment: 0.013,
      other: 0.0165, // Nursing care
    },
    employer: {
      pension: 0.093,
      health: 0.073,
      unemployment: 0.013,
      other: 0.0165,
    },
    caps: {
      pension: 90540, // 2025 ceiling (West)
      health: 62100,
      total: 90540,
    },
  },
};

export default de;