// Export utilities for tax calculations

import { VatResult, IncomeTaxResult, CorporateTaxResult, SocialContributionsResult } from '@/lib/countries/types';
import { formatCurrency, formatPercent } from './format';

// Generate a text summary of results
export function generateTextSummary(
  type: 'vat' | 'income' | 'corporate' | 'social',
  data: VatResult | IncomeTaxResult | CorporateTaxResult | SocialContributionsResult,
  country: string,
  currency: string
): string {
  const lines: string[] = [];
  lines.push(`EU Tax Calculator - ${country}`);
  lines.push(`Generated: ${new Date().toLocaleDateString()}`);
  lines.push(`Currency: ${currency}`);
  lines.push('');

  if (type === 'vat') {
    const vat = data as VatResult;
    lines.push('=== VAT Calculation ===');
    lines.push(`Net Amount: ${formatCurrency(vat.netAmount, currency)}`);
    lines.push(`VAT Amount: ${formatCurrency(vat.vatAmount, currency)}`);
    lines.push(`Gross Amount: ${formatCurrency(vat.grossAmount, currency)}`);
    lines.push(`VAT Rate: ${formatPercent(vat.rate)}`);
  }

  if (type === 'income') {
    const income = data as IncomeTaxResult;
    lines.push('=== Income Tax Calculation ===');
    lines.push(`Gross Salary: ${formatCurrency(income.grossSalary, currency)}`);
    lines.push(`Personal Allowance: ${formatCurrency(income.personalAllowance, currency)}`);
    lines.push(`Taxable Income: ${formatCurrency(income.taxableIncome, currency)}`);
    lines.push('');
    lines.push('Tax Brackets:');
    income.bracketBreakdown.forEach((b) => {
      lines.push(`  ${formatPercent(b.bracket.rate)}: ${formatCurrency(b.amount, currency)} → ${formatCurrency(b.tax, currency)}`);
    });
    lines.push('');
    lines.push(`Income Tax: ${formatCurrency(income.incomeTax, currency)}`);
    lines.push(`Social Contributions (Employee): ${formatCurrency(income.socialContributionsEmployee, currency)}`);
    lines.push(`Net Salary: ${formatCurrency(income.netSalary, currency)}`);
    lines.push(`Effective Tax Rate: ${formatPercent(income.effectiveTaxRate)}`);
  }

  if (type === 'corporate') {
    const corp = data as CorporateTaxResult;
    lines.push('=== Corporate Tax Calculation ===');
    lines.push(`Revenue: ${formatCurrency(corp.revenue, currency)}`);
    lines.push(`Expenses: ${formatCurrency(corp.expenses, currency)}`);
    lines.push(`Gross Profit: ${formatCurrency(corp.grossProfit, currency)}`);
    lines.push(`Corporate Tax: ${formatCurrency(corp.corporateTax, currency)}`);
    lines.push(`Net Profit: ${formatCurrency(corp.netProfit, currency)}`);
    lines.push(`Effective Rate: ${formatPercent(corp.effectiveRate)}`);
  }

  if (type === 'social') {
    const social = data as SocialContributionsResult;
    lines.push('=== Social Contributions ===');
    lines.push(`Gross Salary: ${formatCurrency(social.grossSalary, currency)}`);
    lines.push('');
    lines.push('Employee Contributions:');
    lines.push(`  Pension: ${formatCurrency(social.employeeContributions.pension, currency)}`);
    lines.push(`  Health: ${formatCurrency(social.employeeContributions.health, currency)}`);
    lines.push(`  Unemployment: ${formatCurrency(social.employeeContributions.unemployment, currency)}`);
    lines.push(`  Total: ${formatCurrency(social.employeeContributions.total, currency)}`);
    lines.push('');
    lines.push('Employer Contributions:');
    lines.push(`  Pension: ${formatCurrency(social.employerContributions.pension, currency)}`);
    lines.push(`  Health: ${formatCurrency(social.employerContributions.health, currency)}`);
    lines.push(`  Unemployment: ${formatCurrency(social.employerContributions.unemployment, currency)}`);
    lines.push(`  Total: ${formatCurrency(social.employerContributions.total, currency)}`);
    lines.push('');
    lines.push(`Net Salary: ${formatCurrency(social.netSalary, currency)}`);
    lines.push(`Total Cost to Employer: ${formatCurrency(social.totalCost, currency)}`);
  }

  lines.push('');
  lines.push('---');
  lines.push('This is an estimate. Consult a tax professional for official advice.');

  return lines.join('\n');
}

// Copy to clipboard
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    return false;
  }
}

// Download as text file
export function downloadAsText(filename: string, content: string): void {
  const blob = new Blob([content], { type: 'text/plain' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${filename}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Generate shareable URL (encodes result in URL params)
export function generateShareableUrl(
  type: 'vat' | 'income' | 'corporate' | 'social',
  country: string,
  params: Record<string, string | number>
): string {
  const url = new URL(window.location.href);
  url.searchParams.set('country', country);
  url.searchParams.set('type', type);
  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, String(value));
  });
  return url.toString();
}