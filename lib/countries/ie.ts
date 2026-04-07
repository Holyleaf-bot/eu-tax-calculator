// Ireland Tax Rules - 2025
import { CountryTaxRules } from './types';

const ie: CountryTaxRules = {
  code: 'IE',
  name: 'Ireland',
  flag: '🇮🇪',
  currency: 'EUR',
  currencySymbol: '€',

  vat: {
    standardRate: 0.23,
    reducedRates: [
      { rate: 0.135, appliesTo: ['Fuel', 'Electricity', 'Restaurants', 'Hotels', 'Hairdressers'] },
      { rate: 0.09, appliesTo: ['Agricultural services', 'Newspapers'] },
      { rate: 0.048, appliesTo: ['Books', 'Childrens clothing', 'Food'] },
    ],
    threshold: 80000,
    specialRegimes: ['Small business exemption', 'Farmer flat rate'],
  },

  incomeTax: {
    // 2025 Irish tax brackets (annual)
    brackets: [
      { min: 0, max: 44000, rate: 0.20 },
      { min: 44000, max: null, rate: 0.40 },
    ],
    personalAllowance: 2100,
    deductions: [
      {
        name: 'Personal tax credit',
        type: 'fixed',
        value: 2100,
        description: 'Personal tax credit',
      },
      {
        name: 'PAYE tax credit',
        type: 'fixed',
        value: 2100,
        description: 'Tax credit for PAYE workers',
      },
    ],
    marriedFilingOptions: true,
  },

  corporateTax: {
    standardRate: 0.125,
    smallBusinessRate: undefined,
    deductions: [],
    withholdingTax: 0.20,
    capitalGainsRate: 0.33,
  },

  socialContributions: {
    employee: {
      pension: 0.04,
      health: 0,
      unemployment: 0,
      other: 0,
    },
    employer: {
      pension: 0.112,
      health: 0,
      unemployment: 0,
      other: 0,
    },
    caps: {},
  },
};

export default ie;