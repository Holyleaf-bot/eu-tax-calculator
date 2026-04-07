'use client';

import { IncomeTaxResult } from '@/lib/countries/types';
import { Card, CardBody, Tooltip as TooltipUI } from '@/components/ui';
import { formatCurrency, formatPercent, formatNumber } from '@/lib/utils/format';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';

// Tax term tooltips
const taxTooltips: Record<string, string> = {
  'Gross Salary': 'Total salary before any deductions are taken.',
  'Net Salary': 'Your take-home pay after all taxes and contributions are deducted.',
  'Income Tax': 'Tax on your earnings, calculated using progressive brackets.',
  'Social Contrib.': 'Mandatory payments for pension, health insurance, and unemployment benefits.',
  'Effective Tax Rate': 'The actual percentage of income paid in taxes (total taxes ÷ gross income).',
  'Taxable Income': 'Income after subtracting allowances and deductions.',
  'Personal Allowance': 'Amount you can earn tax-free.',
};

interface IncomeResultDisplayProps {
  result: IncomeTaxResult;
  currency: string;
  currencySymbol: string;
}

export function IncomeResultDisplay({
  result,
  currency,
  currencySymbol,
}: IncomeResultDisplayProps) {
  const {
    grossSalary,
    personalAllowance,
    taxableIncome,
    incomeTax,
    socialContributionsEmployee,
    netSalary,
    effectiveTaxRate,
    bracketBreakdown,
    deductionsApplied,
  } = result;

  // Pie chart data
  const pieData = [
    { name: 'Net Salary', value: netSalary, color: '#10B981' },
    { name: 'Income Tax', value: incomeTax, color: '#EF4444' },
    { name: 'Social Contributions', value: socialContributionsEmployee, color: '#6366F1' },
  ].filter((item) => item.value > 0);

  // Bar chart data for bracket breakdown
  const barData = bracketBreakdown.map((b, i) => ({
    name: `${formatPercent(b.bracket.rate)}`,
    amount: b.amount,
    tax: b.tax,
  }));

  return (
    <Card variant="bordered" className="mt-6">
      <CardBody>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Income Tax Results
        </h3>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <TooltipUI content={taxTooltips['Gross Salary'] || ''}>
              <p className="text-sm text-gray-500 dark:text-gray-400 cursor-help underline decoration-dotted underline-offset-2">Gross Salary</p>
            </TooltipUI>
            <p className="text-xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(grossSalary, currency)}
            </p>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
            <TooltipUI content={taxTooltips['Income Tax'] || ''}>
              <p className="text-sm text-red-600 dark:text-red-400 cursor-help underline decoration-dotted underline-offset-2">Income Tax</p>
            </TooltipUI>
            <p className="text-xl font-bold text-red-600 dark:text-red-400">
              {formatCurrency(incomeTax, currency)}
            </p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <TooltipUI content={taxTooltips['Social Contrib.'] || ''}>
              <p className="text-sm text-blue-600 dark:text-blue-400 cursor-help underline decoration-dotted underline-offset-2">Social Contrib.</p>
            </TooltipUI>
            <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
              {formatCurrency(socialContributionsEmployee, currency)}
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <TooltipUI content={taxTooltips['Net Salary'] || ''}>
              <p className="text-sm text-green-600 dark:text-green-400 cursor-help underline decoration-dotted underline-offset-2">Net Salary</p>
            </TooltipUI>
            <p className="text-xl font-bold text-green-600 dark:text-green-400">
              {formatCurrency(netSalary, currency)}
            </p>
          </div>
        </div>

        {/* Effective Tax Rate */}
        <div className="text-center mb-6">
          <TooltipUI content={taxTooltips['Effective Tax Rate'] || ''}>
            <span className="text-sm text-gray-500 dark:text-gray-400 cursor-help underline decoration-dotted underline-offset-2">Effective Tax Rate: </span>
          </TooltipUI>
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatPercent(effectiveTaxRate)}
          </span>
        </div>

        {/* Monthly/Weekly Breakdown */}
        <div className="bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-700/50 rounded-xl p-4 mb-6">
          <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
            Period Breakdown
          </h4>
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Annual</p>
              <p className="text-lg font-bold text-slate-900 dark:text-white">{formatCurrency(grossSalary, currency)}</p>
              <p className="text-sm text-green-600 dark:text-green-400">{formatCurrency(netSalary, currency)} net</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Monthly</p>
              <p className="text-lg font-bold text-slate-900 dark:text-white">{formatCurrency(grossSalary / 12, currency)}</p>
              <p className="text-sm text-green-600 dark:text-green-400">{formatCurrency(netSalary / 12, currency)} net</p>
            </div>
            <div className="text-center">
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">Weekly</p>
              <p className="text-lg font-bold text-slate-900 dark:text-white">{formatCurrency(grossSalary / 52, currency)}</p>
              <p className="text-sm text-green-600 dark:text-green-400">{formatCurrency(netSalary / 52, currency)} net</p>
            </div>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Pie Chart */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Salary Breakdown
            </h4>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) => `${name}: ${((percent ?? 0) * 100).toFixed(1)}%`}
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value) => formatCurrency(Number(value), currency)}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Tax by Bracket
            </h4>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`} />
                <YAxis type="category" dataKey="name" width={60} />
                <Tooltip
                  formatter={(value) => formatCurrency(Number(value), currency)}
                />
                <Bar dataKey="tax" fill="#EF4444" name="Tax" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Calculation Details
          </h4>

          <div className="space-y-3">
            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="text-gray-600 dark:text-gray-400">Gross Salary:</span>
              <span className="font-mono text-right">{formatCurrency(grossSalary, currency)}</span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="text-gray-600 dark:text-gray-400">Personal Allowance:</span>
              <span className="font-mono text-right">-{formatCurrency(personalAllowance, currency)}</span>
            </div>

            {deductionsApplied.length > 0 && deductionsApplied.map((d) => (
              <div key={d.name} className="grid grid-cols-2 gap-2 text-sm">
                <span className="text-gray-600 dark:text-gray-400">{d.name}:</span>
                <span className="font-mono text-right">-{formatCurrency(d.amount, currency)}</span>
              </div>
            ))}

            <div className="grid grid-cols-2 gap-2 text-sm font-medium border-t border-gray-200 dark:border-gray-600 pt-2">
              <span className="text-gray-900 dark:text-white">Taxable Income:</span>
              <span className="font-mono text-right">{formatCurrency(taxableIncome, currency)}</span>
            </div>

            <div className="mt-4">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Tax Brackets Applied:</p>
              {bracketBreakdown.map((b, i) => (
                <div key={i} className="grid grid-cols-3 gap-2 text-sm py-1">
                  <span>{formatPercent(b.bracket.rate)} rate:</span>
                  <span className="font-mono text-center">{formatCurrency(b.amount, currency)}</span>
                  <span className="font-mono text-right">= {formatCurrency(b.tax, currency)}</span>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm pt-3 border-t border-gray-200 dark:border-gray-600">
              <span className="text-gray-600 dark:text-gray-400">Income Tax:</span>
              <span className="font-mono text-right text-red-600 dark:text-red-400">
                -{formatCurrency(incomeTax, currency)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm">
              <span className="text-gray-600 dark:text-gray-400">Social Contributions:</span>
              <span className="font-mono text-right text-blue-600 dark:text-blue-400">
                -{formatCurrency(socialContributionsEmployee, currency)}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm font-bold border-t border-gray-200 dark:border-gray-600 pt-2">
              <span className="text-gray-900 dark:text-white">Net Salary:</span>
              <span className="font-mono text-right text-green-600 dark:text-green-400">
                {formatCurrency(netSalary, currency)}
              </span>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}