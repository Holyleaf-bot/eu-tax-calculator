// Austria Tax Rules - 2025
import { CountryTaxRules } from './types';

const at: CountryTaxRules = {
  code: 'AT',
  name: 'Austria',
  flag: '🇦🇹',
  currency: 'EUR',
  currencySymbol: '€',

  vat: {
    standardRate: 0.20,
    reducedRates: [
      { rate: 0.13, appliesTo: ['Hotels', 'Cultural events', 'Food'] },
      { rate: 0.10, appliesTo: ['Books', 'Newspapers', 'Public transport', 'Rent'] },
    ],
    threshold: 35000,
    specialRegimes: ['Small business regulation', 'Agriculture flat rate'],
  },

  incomeTax: {
    brackets: [
      { min: 0, max: 12316, rate: 0 },
      { min: 12316, max: 20920, rate: 0.20 },
      { min: 20920, max: 34260, rate: 0.30 },
      { min: 34260, max: 61800, rate: 0.40 },
      { min: 61800, max: null, rate: 0.50 },
    ],
    personalAllowance: 12316,
    deductions: [
      {
        name: 'Werbungskosten',
        type: 'fixed',
        value: 135,
        description: 'Work-related expenses standard deduction',
      },
      {
        name: 'Sonderausgaben',
        type: 'fixed',
        value: 36,
        description: 'Special expenses standard deduction',
      },
    ],
    marriedFilingOptions: false,
  },

  corporateTax: {
    standardRate: 0.23,
    smallBusinessRate: undefined,
    deductions: [],
    withholdingTax: 0.25,
    capitalGainsRate: 0.25,
  },

  socialContributions: {
    employee: {
      pension: 0.1000,
      health: 0.0387,
      unemployment: 0.03,
      other: 0.0125,
    },
    employer: {
      pension: 0.1215,
      health: 0.0378,
      unemployment: 0.03,
      other: 0.0713,
    },
    caps: {
      pension: 68340, // 2025 Höchstbeitragsgrundlage
    },
  },
};

export default at;