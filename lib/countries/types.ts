// EU Tax Calculator - Shared Types

export type TaxType = 'vat' | 'income' | 'corporate' | 'social';

export type CalculationMode = 'add' | 'extract' | 'gross-to-net' | 'net-to-gross';

export interface Deduction {
  name: string;
  type: 'fixed' | 'percentage';
  value: number;
  maxAmount?: number;
  description: string;
}

export interface TaxBracket {
  min: number;
  max: number | null; // null = unlimited
  rate: number;
}

export interface VatRules {
  standardRate: number;
  reducedRates: Array<{
    rate: number;
    appliesTo: string[];
  }>;
  superReducedRate?: number;
  threshold: number; // Registration threshold in EUR
  specialRegimes?: string[];
}

export interface IncomeTaxRules {
  brackets: TaxBracket[];
  personalAllowance: number;
  deductions: Deduction[];
  marriedFilingOptions?: boolean;
  churchTax?: {
    rate: number;
    applies: string[];
  };
  solidaritySurcharge?: {
    rate: number;
    threshold: number;
  };
}

export interface CorporateTaxRules {
  standardRate: number;
  smallBusinessRate?: {
    rate: number;
    threshold: number;
  };
  deductions: Deduction[];
  withholdingTax: number; // Dividend withholding rate
  capitalGainsRate?: number;
}

export interface SocialContributions {
  employee: {
    pension: number;
    health: number;
    unemployment: number;
    other?: number;
  };
  employer: {
    pension: number;
    health: number;
    unemployment: number;
    other?: number;
  };
  caps?: {
    pension?: number; // Ceiling for contributions
    health?: number;
    total?: number;
  };
}

export interface CountryTaxRules {
  code: string; // ISO 3166-1 alpha-2
  name: string;
  flag: string; // Emoji flag
  currency: string;
  currencySymbol: string;
  vat: VatRules;
  incomeTax: IncomeTaxRules;
  corporateTax: CorporateTaxRules;
  socialContributions: SocialContributions;
}

// Calculation result types

export interface VatResult {
  netAmount: number;
  vatAmount: number;
  grossAmount: number;
  rate: number;
  rateType: 'standard' | 'reduced' | 'super-reduced';
}

export interface IncomeTaxResult {
  grossSalary: number;
  personalAllowance: number;
  taxableIncome: number;
  incomeTax: number;
  socialContributionsEmployee: number;
  socialContributionsEmployer: number;
  netSalary: number;
  effectiveTaxRate: number;
  bracketBreakdown: Array<{
    bracket: TaxBracket;
    amount: number;
    tax: number;
  }>;
  deductionsApplied: Array<{
    name: string;
    amount: number;
  }>;
}

export interface CorporateTaxResult {
  revenue: number;
  expenses: number;
  grossProfit: number;
  corporateTax: number;
  netProfit: number;
  effectiveRate: number;
  dividendsWithholding: number;
  netDividends: number;
}

export interface SocialContributionsResult {
  grossSalary: number;
  employeeContributions: {
    pension: number;
    health: number;
    unemployment: number;
    other: number;
    total: number;
  };
  employerContributions: {
    pension: number;
    health: number;
    unemployment: number;
    other: number;
    total: number;
  };
  totalCost: number;
  netSalary: number;
}