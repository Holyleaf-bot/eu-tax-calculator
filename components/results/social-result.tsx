'use client';

import { SocialContributionsResult } from '@/lib/countries/types';
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
  Legend,
} from 'recharts';

interface SocialResultDisplayProps {
  result: SocialContributionsResult;
  currency: string;
  currencySymbol: string;
}

export function SocialResultDisplay({
  result,
  currency,
  currencySymbol,
}: SocialResultDisplayProps) {
  const { grossSalary, employeeContributions, employerContributions, totalCost, netSalary } = result;

  // Pie chart data - breakdown of contributions
  const pieData = [
    { name: 'Net Salary', value: netSalary, color: '#10B981' },
    { name: 'Employee Pension', value: employeeContributions.pension, color: '#6366F1' },
    { name: 'Employee Health', value: employeeContributions.health, color: '#EC4899' },
    { name: 'Employee Unemployment', value: employeeContributions.unemployment, color: '#F59E0B' },
    ...(employeeContributions.other > 0 ? [{ name: 'Employee Other', value: employeeContributions.other, color: '#8B5CF6' }] : []),
  ];

  // Bar chart data - comparing employee vs employer
  const barData = [
    { category: 'Pension', employee: employeeContributions.pension, employer: employerContributions.pension },
    { category: 'Health', employee: employeeContributions.health, employer: employerContributions.health },
    { category: 'Unemployment', employee: employeeContributions.unemployment, employer: employerContributions.unemployment },
  ];

  if (employeeContributions.other > 0 || employerContributions.other > 0) {
    barData.push({ category: 'Other', employee: employeeContributions.other, employer: employerContributions.other });
  }

  return (
    <Card variant="bordered" className="mt-6">
      <CardBody>
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Social Contributions Results
        </h3>

        {/* Summary Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
            <p className="text-sm text-gray-500 dark:text-gray-400">Gross Salary</p>
            <p className="text-xl font-bold text-gray-900 dark:text-white">
              {formatCurrency(grossSalary, currency)}
            </p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4">
            <p className="text-sm text-blue-600 dark:text-blue-400">Employee Pays</p>
            <p className="text-xl font-bold text-blue-600 dark:text-blue-400">
              {formatCurrency(employeeContributions.total, currency)}
            </p>
            <p className="text-xs text-blue-500 dark:text-blue-400">
              ({formatPercent(employeeContributions.total / grossSalary)} of gross)
            </p>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 rounded-lg p-4">
            <p className="text-sm text-purple-600 dark:text-purple-400">Employer Pays</p>
            <p className="text-xl font-bold text-purple-600 dark:text-purple-400">
              {formatCurrency(employerContributions.total, currency)}
            </p>
            <p className="text-xs text-purple-500 dark:text-purple-400">
              ({formatPercent(employerContributions.total / grossSalary)} of gross)
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4">
            <p className="text-sm text-green-600 dark:text-green-400">Total Cost</p>
            <p className="text-xl font-bold text-green-600 dark:text-green-400">
              {formatCurrency(totalCost, currency)}
            </p>
          </div>
        </div>

        {/* Net Salary Highlight */}
        <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-lg p-6 text-center text-white mb-6">
          <p className="text-sm opacity-90">Employee Net Salary</p>
          <p className="text-3xl font-bold">{formatCurrency(netSalary, currency)}</p>
          <p className="text-sm opacity-75 mt-1">
            {formatPercent(netSalary / grossSalary)} of gross salary
          </p>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* Pie Chart - Employee Breakdown */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Employee Salary Breakdown
            </h4>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(Number(value), currency)} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart - Employee vs Employer */}
          <div>
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
              Employee vs Employer Contributions
            </h4>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="category" />
                <YAxis tickFormatter={(v) => `${currencySymbol}${v / 1000}k`} />
                <Tooltip formatter={(value) => formatCurrency(Number(value), currency)} />
                <Legend />
                <Bar dataKey="employee" fill="#6366F1" name="Employee" />
                <Bar dataKey="employer" fill="#A855F7" name="Employer" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Detailed Breakdown */}
        <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
          <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Detailed Breakdown
          </h4>

          {/* Employee Contributions */}
          <div className="mb-4">
            <h5 className="text-sm font-medium text-blue-600 dark:text-blue-400 mb-2">
              Employee Contributions
            </h5>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Pension:</span>
                <span className="font-mono">{formatCurrency(employeeContributions.pension, currency)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Health:</span>
                <span className="font-mono">{formatCurrency(employeeContributions.health, currency)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Unemployment:</span>
                <span className="font-mono">{formatCurrency(employeeContributions.unemployment, currency)}</span>
              </div>
              {employeeContributions.other > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Other:</span>
                  <span className="font-mono">{formatCurrency(employeeContributions.other, currency)}</span>
                </div>
              )}
              <div className="flex justify-between font-semibold border-t border-gray-200 dark:border-gray-600 pt-2">
                <span className="text-gray-900 dark:text-white">Total Employee:</span>
                <span className="font-mono">{formatCurrency(employeeContributions.total, currency)}</span>
              </div>
            </div>
          </div>

          {/* Employer Contributions */}
          <div>
            <h5 className="text-sm font-medium text-purple-600 dark:text-purple-400 mb-2">
              Employer Contributions
            </h5>
            <div className="grid grid-cols-2 gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Pension:</span>
                <span className="font-mono">{formatCurrency(employerContributions.pension, currency)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Health:</span>
                <span className="font-mono">{formatCurrency(employerContributions.health, currency)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600 dark:text-gray-400">Unemployment:</span>
                <span className="font-mono">{formatCurrency(employerContributions.unemployment, currency)}</span>
              </div>
              {employerContributions.other > 0 && (
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Other:</span>
                  <span className="font-mono">{formatCurrency(employerContributions.other, currency)}</span>
                </div>
              )}
              <div className="flex justify-between font-semibold border-t border-gray-200 dark:border-gray-600 pt-2">
                <span className="text-gray-900 dark:text-white">Total Employer:</span>
                <span className="font-mono">{formatCurrency(employerContributions.total, currency)}</span>
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </Card>
  );
}