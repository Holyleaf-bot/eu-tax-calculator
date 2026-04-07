'use client';

import { useState } from 'react';
import { IncomeTaxRules, SocialContributions } from '@/lib/countries/types';
import { calculateIncomeTax } from '@/lib/calculators';
import { Input, Button, Card, CardHeader, CardBody, Select } from '@/components/ui';
import { formatCurrency, formatPercent } from '@/lib/utils/format';
import { IncomeResultDisplay } from '@/components/results/income-result';

interface IncomeCalculatorProps {
  incomeTaxRules: IncomeTaxRules;
  socialContributions: SocialContributions;
  currency: string;
  currencySymbol: string;
}

export function IncomeCalculator({
  incomeTaxRules,
  socialContributions,
  currency,
  currencySymbol,
}: IncomeCalculatorProps) {
  const [grossSalary, setGrossSalary] = useState<string>('50000');
  const [mode, setMode] = useState<'gross-to-net' | 'net-to-gross'>('gross-to-net');
  const [result, setResult] = useState<ReturnType<typeof calculateIncomeTax> | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleCalculate = () => {
    // Validation
    const numAmount = parseFloat(grossSalary);
    if (isNaN(numAmount)) {
      setError('Please enter a valid number');
      return;
    }
    if (numAmount <= 0) {
      setError('Salary must be greater than 0');
      return;
    }
    if (numAmount > 999999999999) {
      setError('Amount is too large');
      return;
    }

    setError('');
    setLoading(true);

    setTimeout(() => {
      const incomeResult = calculateIncomeTax({
        grossSalary: numAmount,
        incomeTaxRules,
        socialContributions,
      });
      setResult(incomeResult);
      setLoading(false);
    }, 200);
  };

  const modeOptions = [
    { value: 'gross-to-net', label: 'Gross → Net Salary' },
    { value: 'net-to-gross', label: 'Net → Gross Salary (Coming soon)' },
  ];

  return (
    <Card variant="bordered">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-600 flex items-center justify-center shadow-lg shadow-red-500/25">
            <span className="text-lg">💰</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Income Tax Calculator</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Calculate your net salary after taxes
            </p>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <div className="space-y-5">
          <Select
            label="Calculation Mode"
            value={mode}
            onChange={(e) => setMode(e.target.value as 'gross-to-net' | 'net-to-gross')}
            options={modeOptions}
          />

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
            hint="Your total salary before deductions"
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
                    ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                }`}
              >
                {currencySymbol}{parseInt(amount) / 1000}k
              </button>
            ))}
          </div>

          <Button onClick={handleCalculate} className="w-full" loading={loading}>
            {loading ? 'Calculating...' : 'Calculate Income Tax'}
          </Button>

          {result && (
            <IncomeResultDisplay
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