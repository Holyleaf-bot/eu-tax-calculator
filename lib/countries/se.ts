// Sweden Tax Rules - 2025
import { CountryTaxRules } from './types';

const se: CountryTaxRules = {
  code: 'SE',
  name: 'Sweden',
  flag: '🇸🇪',
  currency: 'SEK',
  currencySymbol: 'kr',

  vat: {
    standardRate: 0.25,
    reducedRates: [
      { rate: 0.12, appliesTo: ['Food', 'Hotels', 'Restaurants', 'Camping'] },
      { rate: 0.06, appliesTo: ['Books', 'Newspapers', 'Public transport', 'Cultural events'] },
    ],
    threshold: 80000,
    specialRegimes: ['Small business exemption', 'Agricultural flat rate'],
  },

  incomeTax: {
    // 2025 Swedish tax - municipal tax (~32%) + state tax
    // Municipal tax varies by municipality, average ~32%
    // State tax: 20% above 598,300 kr, additional 5% above 744,200 kr
    brackets: [
      { min: 0, max: 598300, rate: 0.32 }, // Municipal only (average)
      { min: 598300, max: 744200, rate: 0.52 }, // Municipal + 20% state tax
      { min: 744200, max: null, rate: 0.57 }, // Municipal + 25% state tax
    ],
    personalAllowance: 0,
    deductions: [
      {
        name: 'Basic allowance (grundavdrag)',
        type: 'fixed',
        value: 50000, // Approximate, varies based on income
        description: 'Basic tax allowance varies by income level',
      },
      {
        name: 'Work tax credit (jobbskatteavdrag)',
        type: 'percentage',
        value: 0.05,
        description: 'Tax credit for working individuals',
      },
    ],
    marriedFilingOptions: false,
  },

  corporateTax: {
    standardRate: 0.206,
    smallBusinessRate: undefined,
    deductions: [],
    withholdingTax: 0.30,
    capitalGainsRate: 0.30,
  },

  socialContributions: {
    employee: {
      pension: 0.07, // Public pension (avgift)
      health: 0, // Included in municipal tax
      unemployment: 0.029, // A-kasseavgift (voluntary)
      other: 0,
    },
    employer: {
      pension: 0.0472, // Avgift för allmän löneavgift
      health: 0.0414, // Sjukförsäkring
      unemployment: 0.0264, // Arbetslöshetsförsäkring
      other: 0.103, // Föräldraförsäkring, m.m.
    },
    caps: {
      pension: 523200, // 2025 annual ceiling (8.07 × price base amount)
    },
  },
};

export default se;