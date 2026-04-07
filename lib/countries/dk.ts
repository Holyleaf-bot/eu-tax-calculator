// Denmark Tax Rules - 2025
import { CountryTaxRules } from './types';

const dk: CountryTaxRules = {
  code: 'DK',
  name: 'Denmark',
  flag: '🇩🇰',
  currency: 'DKK',
  currencySymbol: 'kr',

  vat: {
    standardRate: 0.25,
    reducedRates: [
      { rate: 0.0, appliesTo: ['Newspapers', 'Magazines'] },
    ],
    threshold: 50000,
    specialRegimes: ['Small business exemption'],
  },

  incomeTax: {
    // 2025 Danish tax brackets (annual)
    brackets: [
      { min: 0, max: 598100, rate: 0.3776 },
      { min: 598100, max: null, rate: 0.5276 },
    ],
    personalAllowance: 51000,
    deductions: [
      {
        name: 'Personal allowance',
        type: 'fixed',
        value: 51000,
        description: 'Standard personal allowance',
      },
      {
        name: 'Employment allowance',
        type: 'percentage',
        value: 0.104,
        maxAmount: 31000,
        description: 'Arbejdsmarkedsfradrag',
      },
    ],
    marriedFilingOptions: false,
  },

  corporateTax: {
    standardRate: 0.22,
    smallBusinessRate: undefined,
    deductions: [],
    withholdingTax: 0.27,
    capitalGainsRate: 0.42,
  },

  socialContributions: {
    employee: {
      pension: 0,
      health: 0,
      unemployment: 0.08,
      other: 0,
    },
    employer: {
      pension: 0,
      health: 0,
      unemployment: 0,
      other: 0.0135,
    },
    caps: {},
  },
};

export default dk;