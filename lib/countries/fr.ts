// France Tax Rules - 2025
import { CountryTaxRules } from './types';

const fr: CountryTaxRules = {
  code: 'FR',
  name: 'France',
  flag: '🇫🇷',
  currency: 'EUR',
  currencySymbol: '€',

  vat: {
    standardRate: 0.20,
    reducedRates: [
      { rate: 0.10, appliesTo: ['Restaurants', 'Hotels', 'Transport', 'Agricultural products'] },
      { rate: 0.055, appliesTo: ['Books', 'Food', 'Water', 'School supplies'] },
    ],
    superReducedRate: 0.021,
    threshold: 36800,
    specialRegimes: ['Auto-entrepreneur', 'Franchise de TVA'],
  },

  incomeTax: {
    // 2025 French tax brackets (annual)
    brackets: [
      { min: 0, max: 11497, rate: 0 },
      { min: 11497, max: 29287, rate: 0.11 },
      { min: 29287, max: 84241, rate: 0.30 },
      { min: 84241, max: 180577, rate: 0.41 },
      { min: 180577, max: null, rate: 0.45 },
    ],
    personalAllowance: 11497,
    deductions: [
      {
        name: 'Professional expenses (10%)',
        type: 'percentage',
        value: 0.10,
        maxAmount: 14630,
        description: 'Standard deduction for professional expenses',
      },
      {
        name: 'Family quotient',
        type: 'fixed',
        value: 3898,
        description: 'Tax reduction per dependent',
      },
    ],
    marriedFilingOptions: true,
  },

  corporateTax: {
    standardRate: 0.25,
    smallBusinessRate: {
      rate: 0.15,
      threshold: 42500,
    },
    deductions: [],
    withholdingTax: 0.30,
    capitalGainsRate: 0.30,
  },

  socialContributions: {
    employee: {
      pension: 0.0690,
      health: 0.0095,
      unemployment: 0.0095,
      other: 0.0920, // CSG/CRDS
    },
    employer: {
      pension: 0.1690,
      health: 0.07,
      unemployment: 0.0430,
      other: 0.0915,
    },
    caps: {
      pension: 46164, // 2025 PASS × 4
    },
  },
};

export default fr;