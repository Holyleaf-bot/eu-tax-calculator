'use client';

import { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { countryList, CountryTaxRules } from '@/lib/countries';
import { calculateIncomeTax } from '@/lib/calculators';
import { Card, CardBody, Button } from '@/components/ui';
import { formatCurrency, formatPercent } from '@/lib/utils/format';

export default function ComparePage() {
  const router = useRouter();
  const [selectedCountries, setSelectedCountries] = useState<string[]>([]);
  const [salary, setSalary] = useState<string>('50000');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCountries = countryList.filter((c: CountryTaxRules) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const toggleCountry = (code: string) => {
    setSelectedCountries(prev =>
      prev.includes(code)
        ? prev.filter(c => c !== code)
        : prev.length < 3
          ? [...prev, code]
          : prev
    );
  };

  const comparisonData = useMemo(() => {
    if (selectedCountries.length === 0 || !salary) return [];

    const numSalary = parseFloat(salary) || 0;
    if (numSalary <= 0) return [];

    return selectedCountries.map(code => {
      const country = countryList.find((c: CountryTaxRules) => c.code === code);
      if (!country) return null;

      const result = calculateIncomeTax({
        grossSalary: numSalary,
        incomeTaxRules: country.incomeTax,
        socialContributions: country.socialContributions,
      });

      const totalEmployeeRate = country.socialContributions.employee.pension +
        country.socialContributions.employee.health +
        country.socialContributions.employee.unemployment +
        (country.socialContributions.employee.other || 0);

      return {
        country,
        result,
        totalEmployeeRate,
      };
    }).filter(Boolean);
  }, [selectedCountries, salary]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-4">
          Compare EU Tax Rates
        </h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
          Select up to 3 countries to compare their income tax, social contributions, and net salary side by side.
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
        </CardBody>
      </Card>

      {/* Country Selection */}
      <Card variant="bordered" className="mb-6">
        <CardBody>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
              Select Countries ({selectedCountries.length}/3)
            </h2>
            {selectedCountries.length > 0 && (
              <button
                onClick={() => setSelectedCountries([])}
                className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
              >
                Clear all
              </button>
            )}
          </div>

          {/* Search */}
          <div className="relative mb-4">
            <input
              type="text"
              placeholder="Search countries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2.5 pl-10 rounded-xl border-2 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500"
            />
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>

          {/* Country Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-64 overflow-y-auto">
            {filteredCountries.map((country: CountryTaxRules) => (
              <button
                key={country.code}
                onClick={() => toggleCountry(country.code)}
                disabled={selectedCountries.length >= 3 && !selectedCountries.includes(country.code)}
                className={`p-3 rounded-xl text-left transition-all ${
                  selectedCountries.includes(country.code)
                    ? 'bg-blue-100 dark:bg-blue-900/30 border-2 border-blue-500'
                    : selectedCountries.length >= 3
                      ? 'bg-slate-50 dark:bg-slate-800/50 opacity-50 cursor-not-allowed border-2 border-transparent'
                      : 'bg-slate-50 dark:bg-slate-800/50 hover:bg-slate-100 dark:hover:bg-slate-700/50 border-2 border-transparent'
                }`}
              >
                <span className="text-2xl">{country.flag}</span>
                <p className="text-sm font-medium text-slate-900 dark:text-white mt-1">{country.name}</p>
              </button>
            ))}
          </div>
        </CardBody>
      </Card>

      {/* Comparison Results */}
      {comparisonData.length > 0 && (
        <Card variant="bordered">
          <CardBody>
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
              Comparison Results
            </h2>

            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700">
                    <th className="text-left py-3 px-4 font-medium text-slate-600 dark:text-slate-400">Country</th>
                    <th className="text-right py-3 px-4 font-medium text-slate-600 dark:text-slate-400">Gross Salary</th>
                    <th className="text-right py-3 px-4 font-medium text-slate-600 dark:text-slate-400">Income Tax</th>
                    <th className="text-right py-3 px-4 font-medium text-slate-600 dark:text-slate-400">Social Contrib.</th>
                    <th className="text-right py-3 px-4 font-medium text-slate-600 dark:text-slate-400">Net Salary</th>
                    <th className="text-right py-3 px-4 font-medium text-slate-600 dark:text-slate-400">Effective Rate</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonData.map((data) => data && (
                    <tr key={data.country.code} className="border-b border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/50">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{data.country.flag}</span>
                          <div>
                            <p className="font-medium text-slate-900 dark:text-white">{data.country.name}</p>
                            <p className="text-xs text-slate-500">{data.country.currency}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4 text-right font-mono text-slate-900 dark:text-white">
                        €{data.result.grossSalary.toLocaleString()}
                      </td>
                      <td className="py-4 px-4 text-right font-mono text-red-600 dark:text-red-400">
                        -€{data.result.incomeTax.toLocaleString()}
                      </td>
                      <td className="py-4 px-4 text-right font-mono text-blue-600 dark:text-blue-400">
                        -€{data.result.socialContributionsEmployee.toLocaleString()}
                      </td>
                      <td className="py-4 px-4 text-right font-mono font-bold text-green-600 dark:text-green-400">
                        €{data.result.netSalary.toLocaleString()}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                          {formatPercent(data.result.effectiveTaxRate)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden space-y-4">
              {comparisonData.map((data) => data && (
                <div key={data.country.code} className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{data.country.flag}</span>
                      <span className="font-medium text-slate-900 dark:text-white">{data.country.name}</span>
                    </div>
                    <span className="text-lg font-bold text-green-600 dark:text-green-400">
                      €{data.result.netSalary.toLocaleString()}
                    </span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div>
                      <span className="text-slate-500">Gross:</span>
                      <span className="ml-1 font-mono text-slate-900 dark:text-white">€{data.result.grossSalary.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Tax:</span>
                      <span className="ml-1 font-mono text-red-600">-€{data.result.incomeTax.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Social:</span>
                      <span className="ml-1 font-mono text-blue-600">-€{data.result.socialContributionsEmployee.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Rate:</span>
                      <span className="ml-1 font-mono text-slate-700 dark:text-slate-300">{formatPercent(data.result.effectiveTaxRate)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Net Salary Ranking */}
            <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-700">
              <h3 className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-3">Net Salary Ranking</h3>
              <div className="flex flex-wrap gap-2">
                {comparisonData
                  .filter(Boolean)
                  .sort((a, b) => (b?.result.netSalary || 0) - (a?.result.netSalary || 0))
                  .map((data, index) => data && (
                    <div
                      key={data.country.code}
                      className={`flex items-center gap-2 px-3 py-2 rounded-lg ${
                        index === 0
                          ? 'bg-green-100 dark:bg-green-900/30 border border-green-300 dark:border-green-700'
                          : 'bg-slate-100 dark:bg-slate-700'
                      }`}
                    >
                      <span className="text-lg">{data.country.flag}</span>
                      <span className="text-sm font-medium text-slate-900 dark:text-white">
                        #{index + 1} {data.country.name}
                      </span>
                      <span className="text-sm font-mono text-green-600 dark:text-green-400">
                        €{data.result.netSalary.toLocaleString()}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </CardBody>
        </Card>
      )}

      {/* Quick Links */}
      <div className="mt-8 text-center">
        <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">Or explore individual countries:</p>
        <div className="flex flex-wrap justify-center gap-2">
          {['de', 'fr', 'nl', 'es', 'it'].map((code) => {
            const country = countryList.find((c: CountryTaxRules) => c.code === code);
            return country ? (
              <button
                key={code}
                onClick={() => router.push(`/${code}`)}
                className="px-4 py-2 text-sm rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
              >
                {country.flag} {country.name}
              </button>
            ) : null;
          })}
        </div>
      </div>
    </div>
  );
}