'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { countryList, CountryTaxRules } from '@/lib/countries';
import { calculateIncomeTax } from '@/lib/calculators';
import { Card, CardBody } from '@/components/ui';
import { formatCurrency, formatPercent } from '@/lib/utils/format';

export default function RankingPage() {
  const router = useRouter();
  const [salary, setSalary] = useState<string>('50000');
  const [sortBy, setSortBy] = useState<'net' | 'tax' | 'rate'>('net');

  const rankings = useMemo(() => {
    const numSalary = parseFloat(salary) || 0;
    if (numSalary <= 0) return [];

    return countryList.map((country: CountryTaxRules) => {
      // Convert salary to local currency if needed
      const grossInEUR = numSalary; // Input is in EUR
      const result = calculateIncomeTax({
        grossSalary: grossInEUR,
        incomeTaxRules: country.incomeTax,
        socialContributions: country.socialContributions,
      });

      return {
        country,
        result,
        netInLocalCurrency: result.netSalary, // Keep in EUR for comparison
        totalDeductions: result.incomeTax + result.socialContributionsEmployee,
      };
    }).sort((a, b) => {
      if (sortBy === 'net') return b.result.netSalary - a.result.netSalary;
      if (sortBy === 'tax') return a.result.incomeTax - b.result.incomeTax;
      return a.result.effectiveTaxRate - b.result.effectiveTaxRate;
    });
  }, [salary, sortBy]);

  const topCountry = rankings[0];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
          Where Does Your Salary Go Furthest?
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
          Enter your annual gross salary in EUR and see your net pay across all 27 EU member states.
        </p>
      </div>

      {/* Salary Input */}
      <Card variant="bordered" className="mb-6">
        <CardBody>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1 w-full">
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                Annual Gross Salary (EUR)
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 font-medium">€</span>
                <input
                  type="number"
                  value={salary}
                  onChange={(e) => setSalary(e.target.value)}
                  className="w-full pl-8 pr-4 py-2.5 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500"
                  placeholder="Enter annual salary"
                />
              </div>
            </div>
            <div className="flex gap-2">
              {[30000, 50000, 75000, 100000].map((amount) => (
                <button
                  key={amount}
                  onClick={() => setSalary(amount.toString())}
                  className={`px-3 py-2 text-sm rounded-lg transition-colors ${
                    salary === amount.toString()
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                  }`}
                >
                  €{amount / 1000}k
                </button>
              ))}
            </div>
          </div>

          {/* Sort Options */}
          <div className="flex items-center gap-4 mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            <span className="text-sm text-slate-500 dark:text-slate-300">Sort by:</span>
            <div className="flex gap-2">
              {[
                { value: 'net', label: 'Highest Net' },
                { value: 'tax', label: 'Lowest Tax' },
                { value: 'rate', label: 'Lowest Rate' },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setSortBy(option.value as 'net' | 'tax' | 'rate')}
                  className={`px-3 py-1.5 text-sm rounded-lg transition-colors ${
                    sortBy === option.value
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                  }`}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
        </CardBody>
      </Card>

      {/* Top Result Highlight */}
      {topCountry && (
        <Card variant="bordered" className="mb-6 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border-green-200 dark:border-green-800">
          <CardBody>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="text-5xl">{topCountry.country.flag}</div>
                <div>
                  <p className="text-sm text-green-600 dark:text-green-400 font-medium">
                    🏆 Best for your salary
                  </p>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                    {topCountry.country.name}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Top tax bracket: {formatPercent(topCountry.country.incomeTax.brackets[topCountry.country.incomeTax.brackets.length - 1].rate)}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-slate-500 dark:text-slate-400">Net Salary</p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  €{topCountry.result.netSalary.toLocaleString()}
                </p>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Take home {formatPercent(1 - topCountry.result.effectiveTaxRate)}
                </p>
              </div>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Rankings List */}
      <Card variant="bordered">
        <CardBody className="p-0">
          <div className="divide-y divide-slate-200 dark:divide-slate-700">
            {rankings.map((item, index) => (
              <div
                key={item.country.code}
                className={`p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors ${
                  index === 0 ? 'bg-green-50/50 dark:bg-green-900/10' : ''
                }`}
                onClick={() => router.push(`/${item.country.code.toLowerCase()}`)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl font-bold text-slate-400 w-8">
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : `#${index + 1}`}
                    </span>
                    <span className="text-3xl">{item.country.flag}</span>
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">{item.country.name}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-300">{item.country.currency}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-slate-900 dark:text-white">
                      €{item.result.netSalary.toLocaleString()}
                    </p>
                    <p className="text-sm text-slate-500 dark:text-slate-300">
                      {formatPercent(item.result.effectiveTaxRate)} tax
                    </p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mt-3">
                  <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-green-500 to-emerald-500"
                      style={{ width: `${(item.result.netSalary / item.result.grossSalary) * 100}%` }}
                    />
                  </div>
                  <div className="flex justify-between mt-1 text-xs text-slate-500">
                    <span>Net: €{item.result.netSalary.toLocaleString()}</span>
                    <span>Tax: €{item.totalDeductions.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Comparison Summary */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card variant="bordered">
          <CardBody className="text-center">
            <p className="text-sm text-slate-500 dark:text-slate-300">Highest Net</p>
            <p className="text-2xl font-bold text-green-600 dark:text-green-400">
              {rankings[0] && `€${rankings[0].result.netSalary.toLocaleString()}`}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-300">
              {rankings[0]?.country.name}
            </p>
          </CardBody>
        </Card>
        <Card variant="bordered">
          <CardBody className="text-center">
            <p className="text-sm text-slate-500 dark:text-slate-300">Lowest Net</p>
            <p className="text-2xl font-bold text-red-600 dark:text-red-400">
              {rankings[rankings.length - 1] && `€${rankings[rankings.length - 1].result.netSalary.toLocaleString()}`}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {rankings[rankings.length - 1]?.country.name}
            </p>
          </CardBody>
        </Card>
        <Card variant="bordered">
          <CardBody className="text-center">
            <p className="text-sm text-slate-500 dark:text-slate-300">Difference</p>
            <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {rankings[0] && rankings[rankings.length - 1] &&
                `€${(rankings[0].result.netSalary - rankings[rankings.length - 1].result.netSalary).toLocaleString()}`
              }
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {rankings[0] && rankings[rankings.length - 1] &&
                `${Math.round(((rankings[0].result.netSalary - rankings[rankings.length - 1].result.netSalary) / rankings[rankings.length - 1].result.netSalary) * 100)}% difference`
              }
            </p>
          </CardBody>
        </Card>
      </div>

      {/* Navigation Link */}
      <div className="mt-8 text-center">
        <button
          onClick={() => router.push('/compare')}
          className="text-blue-600 dark:text-blue-400 hover:underline"
        >
          Compare specific countries →
        </button>
      </div>
    </div>
  );
}