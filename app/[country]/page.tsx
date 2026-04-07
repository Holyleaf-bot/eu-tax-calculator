'use client';

import { useParams, useRouter } from 'next/navigation';
import { getCountry, countryList, CountryTaxRules } from '@/lib/countries';
import { VatCalculator, IncomeCalculator, CorporateCalculator, SocialCalculator } from '@/components/calculator';
import { Select, Tooltip } from '@/components/ui';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { notFound } from 'next/navigation';

// Tax term explanations
const taxTerms: Record<string, string> = {
  'progressive tax': 'Tax rate increases as income increases. Higher portions of your income are taxed at higher rates.',
  'personal allowance': 'Amount you can earn before paying any income tax. Also called "tax-free allowance" or "basic allowance".',
  'deductions': 'Amounts subtracted from your taxable income, reducing the amount you pay tax on.',
  'social contributions': 'Mandatory payments for pension, health insurance, and unemployment benefits. Paid by both employer and employee.',
  'brackets': 'Income ranges where different tax rates apply. For example, income in the first bracket may be taxed at 0%, while higher brackets have higher rates.',
  'VAT': 'Value Added Tax - a consumption tax added to most goods and services. The final consumer pays the tax.',
  'corporate tax': 'Tax on company profits. The rate may be lower for small businesses in some countries.',
  'standard rate': 'The default VAT rate applied to most goods and services.',
  'reduced rate': 'Lower VAT rates for specific items like food, books, or medicine.',
  'effective tax rate': 'The actual percentage of your income paid in taxes, calculated as total taxes divided by gross income.',
  'taxable income': 'Your income after subtracting all allowances and deductions. This is the amount actually taxed.',
  'net salary': 'Your take-home pay after all taxes and contributions are deducted from gross salary.',
  'gross salary': 'Total salary before any deductions are taken.',
  'employer contributions': 'Additional social contributions paid by the employer on top of your salary.',
  'employee contributions': 'Social contributions deducted directly from your salary.',
};

function TermWithTooltip({ term, children }: { term: string; children: React.ReactNode }) {
  const explanation = taxTerms[term.toLowerCase()];
  if (!explanation) return <>{children}</>;

  return (
    <Tooltip content={explanation}>
      <span className="underline decoration-dotted decoration-slate-400 underline-offset-2 cursor-help">
        {children}
      </span>
    </Tooltip>
  );
}

export default function CountryPage() {
  const params = useParams();
  const router = useRouter();
  const countryCode = params.country as string;

  const country = getCountry(countryCode);

  if (!country) {
    notFound();
  }

  const handleCountryChange = (code: string) => {
    router.push(`/${code.toLowerCase()}`);
  };

  const countryOptions = countryList.map((c: CountryTaxRules) => ({
    value: c.code,
    label: `${c.flag} ${c.name}`,
  }));

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Country Header */}
      <div className="mb-8 animate-fade-in">
        {/* Country Selector */}
        <div className="glass-card p-4 mb-6">
          <Select
            label="Select Country"
            value={country.code}
            onChange={(e) => handleCountryChange(e.target.value)}
            options={countryOptions}
          />
        </div>

        {/* Country Title */}
        <div className="flex items-center gap-4 mb-6">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center shadow-lg">
            <span className="text-4xl">{country.flag}</span>
          </div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-transparent">
              {country.name}
            </h1>
            <p className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <span className="font-medium">{country.currency}</span>
              <span className="w-1 h-1 bg-slate-300 dark:bg-slate-600 rounded-full" />
              <span>{country.currencySymbol}</span>
            </p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="glass-card p-4 group hover:scale-105 transition-transform" style={{ '--stat-color': '#3B82F6', '--stat-color-end': '#6366F1' } as React.CSSProperties}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <svg className="w-4 h-4 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14l6-6m-5.5.5h.01m4.99 5h.01M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
                </svg>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">VAT Rate</p>
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {(country.vat.standardRate * 100).toFixed(0)}%
            </p>
          </div>

          <div className="glass-card p-4 group hover:scale-105 transition-transform" style={{ '--stat-color': '#EF4444', '--stat-color-end': '#F97316' } as React.CSSProperties}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                <svg className="w-4 h-4 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Income Tax</p>
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {(country.incomeTax.brackets[country.incomeTax.brackets.length - 1]?.rate * 100).toFixed(0)}%
              <span className="text-sm font-normal text-slate-400 ml-1">top</span>
            </p>
          </div>

          <div className="glass-card p-4 group hover:scale-105 transition-transform" style={{ '--stat-color': '#8B5CF6', '--stat-color-end': '#A855F7' } as React.CSSProperties}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                <svg className="w-4 h-4 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Corporate Tax</p>
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {(country.corporateTax.standardRate * 100).toFixed(0)}%
            </p>
          </div>

          <div className="glass-card p-4 group hover:scale-105 transition-transform" style={{ '--stat-color': '#10B981', '--stat-color-end': '#059669' } as React.CSSProperties}>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <p className="text-sm text-slate-500 dark:text-slate-400">Social Contrib.</p>
            </div>
            <p className="text-2xl font-bold text-slate-900 dark:text-white">
              {((country.socialContributions.employee.pension +
                 country.socialContributions.employee.health +
                 country.socialContributions.employee.unemployment) * 100).toFixed(0)}%
              <span className="text-sm font-normal text-slate-400 ml-1">employee</span>
            </p>
          </div>
        </div>
      </div>

      {/* Calculator Tabs */}
      <Tabs defaultValue="income">
        <TabsList className="mb-6">
          <TabsTrigger value="income">💰 Income Tax</TabsTrigger>
          <TabsTrigger value="vat">🧾 VAT</TabsTrigger>
          <TabsTrigger value="corporate">🏢 Corporate</TabsTrigger>
          <TabsTrigger value="social">👥 Social</TabsTrigger>
        </TabsList>

        <TabsContent value="income">
          <IncomeCalculator
            incomeTaxRules={country.incomeTax}
            socialContributions={country.socialContributions}
            currency={country.currency}
            currencySymbol={country.currencySymbol}
          />
        </TabsContent>

        <TabsContent value="vat">
          <VatCalculator
            vatRules={country.vat}
            currency={country.currency}
            currencySymbol={country.currencySymbol}
          />
        </TabsContent>

        <TabsContent value="corporate">
          <CorporateCalculator
            corporateTaxRules={country.corporateTax}
            currency={country.currency}
            currencySymbol={country.currencySymbol}
          />
        </TabsContent>

        <TabsContent value="social">
          <SocialCalculator
            socialContributions={country.socialContributions}
            currency={country.currency}
            currencySymbol={country.currencySymbol}
          />
        </TabsContent>
      </Tabs>

      {/* Tax Information */}
      <div className="mt-8 glass-card p-6 animate-fade-in">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Tax Information for {country.name}
        </h2>

        <div className="space-y-6">
          {/* Income Tax Brackets */}
          <div>
            <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-red-500 rounded-full" />
              <TermWithTooltip term="brackets">Income Tax Brackets</TermWithTooltip>
            </h3>
            <div className="overflow-x-auto rounded-xl border border-slate-200 dark:border-slate-700">
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="bg-slate-50 dark:bg-slate-800/50">
                    <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">From</th>
                    <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">To</th>
                    <th className="text-right py-3 px-4 font-medium text-slate-600 dark:text-slate-400">Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {country.incomeTax.brackets.map((bracket, index) => (
                    <tr key={index} className="border-t border-slate-100 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                      <td className="py-3 px-4 font-mono">{country.currencySymbol}{bracket.min.toLocaleString()}</td>
                      <td className="py-3 px-4 font-mono">{bracket.max ? `${country.currencySymbol}${bracket.max.toLocaleString()}` : '∞'}</td>
                      <td className="py-3 px-4 text-right">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-300 font-medium">
                          {(bracket.rate * 100).toFixed(0)}%
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* VAT Rates */}
          <div>
            <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full" />
              <TermWithTooltip term="VAT">VAT Rates</TermWithTooltip>
            </h3>
            <div className="flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 text-sm font-medium">
                <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                Standard: {(country.vat.standardRate * 100).toFixed(0)}%
              </span>
              {country.vat.reducedRates.map((rate, index) => (
                <span key={index} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200 text-sm font-medium">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                  Reduced: {(rate.rate * 100).toFixed(0)}%
                </span>
              ))}
              {country.vat.superReducedRate && (
                <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 text-sm font-medium">
                  <span className="w-1.5 h-1.5 bg-amber-500 rounded-full" />
                  Super-reduced: {(country.vat.superReducedRate * 100).toFixed(0)}%
                </span>
              )}
            </div>
          </div>

          {/* Deductions */}
          {country.incomeTax.deductions.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                Deductions & Allowances
              </h3>
              <div className="space-y-2">
                {country.incomeTax.deductions.map((deduction, index) => (
                  <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-slate-50 dark:bg-slate-800/30">
                    <div className="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                      <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">{deduction.name}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">{deduction.description}</p>
                      <p className="text-sm font-medium text-green-600 dark:text-green-400 mt-1">
                        {deduction.type === 'fixed' ? `${country.currencySymbol}${deduction.value.toLocaleString()}` : `${(deduction.value * 100).toFixed(1)}%`}
                        {deduction.maxAmount && ` (max: ${country.currencySymbol}${deduction.maxAmount.toLocaleString()})`}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}