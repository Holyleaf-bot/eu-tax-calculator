'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { countryList, CountryTaxRules } from '@/lib/countries';
import { Card, CardBody } from '@/components/ui';
import { StructuredData } from '@/components/structured-data';

export default function HomePage() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredCountries = countryList.filter((country: CountryTaxRules) =>
    country.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    country.code.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCountrySelect = (code: string) => {
    router.push(`/${code.toLowerCase()}`);
  };

  return (
    <>
      <StructuredData />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Hero Section */}
      <div className="text-center mb-16 animate-fade-in">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
          <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          2025 Tax Rates • All 27 EU Countries
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            EU Tax Calculator
          </span>
        </h1>
        <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto mb-8">
          Calculate <span className="font-semibold text-slate-900 dark:text-white">VAT, income tax, corporate tax</span> and{' '}
          <span className="font-semibold text-slate-900 dark:text-white">social contributions</span> for all EU member states.
          Free, accurate, and easy to use.
        </p>

        {/* Search Bar */}
        <div className="max-w-lg mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search for a country..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-5 py-4 pl-14 rounded-2xl border-2 border-slate-200 dark:border-slate-700 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 transition-all shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50"
            />
            <svg
              className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Country Grid */}
      <div id="countries" className="mb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Select a Country
          </h2>
          <span className="text-sm text-slate-500 dark:text-slate-400">
            {filteredCountries.length} countries
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredCountries.map((country: CountryTaxRules, index: number) => (
            <button
              key={country.code}
              onClick={() => handleCountrySelect(country.code)}
              className="group relative overflow-hidden rounded-2xl bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border border-slate-200/50 dark:border-slate-700/50 p-6 text-center transition-all hover:shadow-xl hover:shadow-blue-500/10 hover:-translate-y-1 hover:border-blue-300 dark:hover:border-blue-600 animate-fade-in"
              style={{ animationDelay: `${index * 20}ms` }}
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />

              <span className="relative text-4xl mb-3 block group-hover:scale-110 transition-transform">
                {country.flag}
              </span>
              <h3 className="relative font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {country.name}
              </h3>
              <p className="relative text-sm text-slate-500 dark:text-slate-400 mt-1">
                {country.currency}
              </p>

              {/* Quick stats on hover */}
              <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-slate-100/80 dark:from-slate-700/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 text-xs font-medium text-slate-600 dark:text-slate-300">
                <span>VAT {(country.vat.standardRate * 100).toFixed(0)}%</span>
                <span className="w-1 h-1 bg-slate-400 rounded-full" />
                <span>Tax {Math.round(Math.max(...country.incomeTax.brackets.map(b => b.rate)) * 100)}%</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        <div className="glass-card p-6 text-center group">
          <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:scale-110 transition-transform">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 13h.01M9 9h.01M15 9h.01M5 17h.01M5 13h.01M5 9h.01" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
            4 Tax Types
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            Calculate VAT, income tax, corporate tax, and social contributions for individuals and businesses.
          </p>
        </div>

        <div className="glass-card p-6 text-center group">
          <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-500/25 group-hover:scale-110 transition-transform">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
            All 27 Countries
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            Complete coverage with country-specific tax rules, rates, and deductions.
          </p>
        </div>

        <div className="glass-card p-6 text-center group">
          <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/25 group-hover:scale-110 transition-transform">
            <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
            Visual Breakdowns
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            Clear charts and detailed step-by-step calculations for every tax type.
          </p>
        </div>
      </div>

      {/* Disclaimer */}
      <div className="glass-card p-6 text-center">
        <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center justify-center gap-2">
          <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          This calculator provides estimates based on publicly available tax rates and rules.
          For accurate tax advice, please consult a qualified tax professional.
        </p>
      </div>
    </div>
    </>
  );
}