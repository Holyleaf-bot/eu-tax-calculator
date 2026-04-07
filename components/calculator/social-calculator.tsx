'use client';

import { useState } from 'react';
import { SocialContributions } from '@/lib/countries/types';
import { calculateSocialContributionsFull } from '@/lib/calculators';
import { Input, Button, Card, CardHeader, CardBody } from '@/components/ui';
import { SocialResultDisplay } from '@/components/results/social-result';

interface SocialCalculatorProps {
  socialContributions: SocialContributions;
  currency: string;
  currencySymbol: string;
}

export function SocialCalculator({
  socialContributions,
  currency,
  currencySymbol,
}: SocialCalculatorProps) {
  const [grossSalary, setGrossSalary] = useState<string>('50000');
  const [result, setResult] = useState<ReturnType<typeof calculateSocialContributionsFull> | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleCalculate = () => {
    const numAmount = parseFloat(grossSalary);
    if (isNaN(numAmount)) {
      setError('Please enter a valid number');
      return;
    }
    if (numAmount <= 0) {
      setError('Salary must be greater than 0');
      return;
    }

    setError('');
    setLoading(true);

    setTimeout(() => {
      const socialResult = calculateSocialContributionsFull({
        grossSalary: numAmount,
        socialContributions,
      });
      setResult(socialResult);
      setLoading(false);
    }, 200);
  };

  // Calculate total contribution rates
  const totalEmployee = (
    socialContributions.employee.pension +
    socialContributions.employee.health +
    socialContributions.employee.unemployment +
    (socialContributions.employee.other || 0)
  ) * 100;

  const totalEmployer = (
    socialContributions.employer.pension +
    socialContributions.employer.health +
    socialContributions.employer.unemployment +
    (socialContributions.employer.other || 0)
  ) * 100;

  return (
    <Card variant="bordered">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center shadow-lg shadow-green-500/25">
            <span className="text-lg">👥</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              Social Contributions Calculator
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Calculate employee and employer contributions
            </p>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <div className="space-y-5">
          <Input
            label="Annual Gross Salary"
            type="number"
            value={grossSalary}
            onChange={(e) => {
              setGrossSalary(e.target.value);
              setError('');
            }}
            prefix={currencySymbol}
            placeholder="Enter gross salary"
            min={0}
            error={error}
            hint="Your salary before deductions"
          />

          {/* Quick amount buttons */}
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-slate-500 dark:text-slate-400">Quick select:</span>
            {['30000', '50000', '75000', '100000'].map((amount) => (
              <button
                key={amount}
                onClick={() => {
                  setGrossSalary(amount);
                  setError('');
                }}
                className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                  grossSalary === amount
                    ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                }`}
              >
                {currencySymbol}{parseInt(amount) / 1000}k
              </button>
            ))}
          </div>

          {/* Contribution rates info */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800">
              <p className="text-xs text-blue-600 dark:text-blue-400 mb-1">Employee Pays</p>
              <p className="text-lg font-bold text-blue-700 dark:text-blue-300">
                {totalEmployee.toFixed(1)}%
              </p>
            </div>
            <div className="p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20 border border-purple-100 dark:border-purple-800">
              <p className="text-xs text-purple-600 dark:text-purple-400 mb-1">Employer Pays</p>
              <p className="text-lg font-bold text-purple-700 dark:text-purple-300">
                {totalEmployer.toFixed(1)}%
              </p>
            </div>
          </div>

          {socialContributions.caps?.pension && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 text-amber-700 dark:text-amber-300 text-sm">
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Contribution ceiling: {currencySymbol}{socialContributions.caps.pension.toLocaleString()}/year</span>
            </div>
          )}

          <Button onClick={handleCalculate} className="w-full" loading={loading}>
            {loading ? 'Calculating...' : 'Calculate Contributions'}
          </Button>

          {result && (
            <SocialResultDisplay
              result={result}
              currency={currency}
              currencySymbol={currencySymbol}
            />
          )}
        </div>
      </CardBody>
    </Card>
  );
}