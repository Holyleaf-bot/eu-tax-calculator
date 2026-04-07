'use client';

import { CorporateTaxResult } from '@/lib/countries/types';
import { Card, CardBody } from '@/components/ui';
import { formatCurrency, formatPercent } from '@/lib/utils/format';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from 'recharts';

interface CorporateResultDisplayProps {
  result: CorporateTaxResult;
  currency: string;
  currencySymbol: string;
  standardRate: number;
  smallBusinessRate?: { rate: number; threshold: number };
}

export function CorporateResultDisplay({
  result,
  currency,
  currencySymbol,
  standardRate,
  smallBusinessRate,
}: CorporateResultDisplayProps) {
  const { revenue, expenses, grossProfit, corporateTax, netProfit, effectiveRate } = result;

  // Check if small business rate applies
  const isSmallBusinessRate = smallBusinessRate && grossProfit <= smallBusinessRate.threshold;
  const applicableRate = isSmallBusinessRate ? smallBusinessRate.rate : standardRate;

  // Pie chart data
  const pieData = [
    { name: 'Net Profit', value: netProfit, color: '#10B981' },
    { name: 'Corporate Tax', value: corporateTax, color: '#EF4444' },
  ].filter((item) => item.value > 0);

  // Bar chart data
  const barData = [
    { name: 'Revenue', value: revenue, color: '#6366F1' },
    { name: 'Expenses', value: expenses, color: '#F59E0B' },
    { name: 'Profit', value: grossProfit, color: '#10B981' },
  ];

  return (
    <Card variant="bordered" className="mt-6">
      <CardBody>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Corporate Tax Results
        </h3>

        {/* Applicable Rate Badge */}
        {isSmallBusinessRate && (
          <div className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm mb-4">
            Small Business Rate: {formatPercent(smallBusinessRate.rate)}
          </div>
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-indigo-50 dark:bg-indigo-900/20 rounded-lg p-4">
            <p className="text-sm text-indigo-600 dark:text-indigo-400">Revenue</p>
            <p className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
              {formatCurrency(revenue, currency)}
            </p>
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/20 rounded-lg p-4">
            <p className="text-sm text-amber-600 dark:text-amber-400">Expenses</p>
            <p className="text-xl font-bold text-amber-600 dark:text-amber-400">
              {formatCurrency(expenses, currency)}
            </p>
          </div>

          <div className="bg-red-50 dark:bg-red-900/20 rounded-lg p-4">
            <p className="text-sm text-red-600 dark:text-red-400">Corporate Tax</p>
            <p className="text-xl font-bold text-red-600 dark:text-red-400">
              {formatCurrency(corporateTax, currency)}
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <p className="text-sm text-green-600 dark:text-green-400">Net Profit</p>
            <p className="text-xl font-bold text-green-600 dark:text-green-400">
              {formatCurrency(netProfit, currency)}
            </p>
          </div>
        </div>

        {/* Effective Tax Rate */}
        <div className="text-center mb-6">
          <span className="text-sm text-gray-500 dark:text-gray-400">Effective Tax Rate: </span>
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            {formatPercent(effectiveRate)}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400"> (Statutory: {formatPercent(applicableRate)})</span>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Pie Chart */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Profit Distribution
            </h4>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={70}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(Number(value), currency)} />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center gap-4 text-sm">
              {pieData.map((item) => (
                <div key={item.name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-gray-600 dark:text-gray-400">{item.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bar Chart */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Financial Overview
            </h4>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(v) => `${currencySymbol || '€'}${v / 1000}k`} />
                <Tooltip formatter={(value) => formatCurrency(Number(value), currency)} />
                <Bar dataKey="value">
                  {barData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Calculation Details */}
        <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Calculation Details
          </h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Revenue:</span>
              <span className="font-mono">{formatCurrency(revenue, currency)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">Less Expenses:</span>
              <span className="font-mono">-{formatCurrency(expenses, currency)}</span>
            </div>
            <div className="flex justify-between font-medium border-t border-gray-200 dark:border-gray-600 pt-2">
              <span className="text-gray-900 dark:text-white">Gross Profit:</span>
              <span className="font-mono">{formatCurrency(grossProfit, currency)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600 dark:text-gray-400">
                Corporate Tax ({formatPercent(applicableRate)}):
              </span>
              <span className="font-mono">-{formatCurrency(corporateTax, currency)}</span>
            </div>
            <div className="flex justify-between font-bold border-t border-gray-200 dark:border-gray-600 pt-2">
              <span className="text-gray-900 dark:text-white">Net Profit:</span>
              <span className="font-mono text-green-600 dark:text-green-400">
                {formatCurrency(netProfit, currency)}
              </span>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}