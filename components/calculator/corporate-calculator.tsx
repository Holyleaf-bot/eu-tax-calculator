'use client';

import { useState } from 'react';
import { CorporateTaxRules } from '@/lib/countries/types';
import { calculateCorporateTax } from '@/lib/calculators';
import { Input, Button, Card, CardHeader, CardBody } from '@/components/ui';
import { CorporateResultDisplay } from '@/components/results/corporate-result';

interface CorporateCalculatorProps {
  corporateTaxRules: CorporateTaxRules;
  currency: string;
  currencySymbol: string;
}

export function CorporateCalculator({
  corporateTaxRules,
  currency,
  currencySymbol,
}: CorporateCalculatorProps) {
  const [revenue, setRevenue] = useState<string>('100000');
  const [expenses, setExpenses] = useState<string>('60000');
  const [dividends, setDividends] = useState<string>('0');
  const [result, setResult] = useState<ReturnType<typeof calculateCorporateTax> | null>(null);
  const [errors, setErrors] = useState<{ revenue?: string; expenses?: string }>({});
  const [loading, setLoading] = useState(false);

  const handleCalculate = () => {
    // Validation
    const newErrors: { revenue?: string; expenses?: string } = {};
    const numRevenue = parseFloat(revenue);
    const numExpenses = parseFloat(expenses);

    if (isNaN(numRevenue) || numRevenue < 0) {
      newErrors.revenue = 'Please enter a valid revenue amount';
    }
    if (isNaN(numExpenses) || numExpenses < 0) {
      newErrors.expenses = 'Please enter a valid expenses amount';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setLoading(true);

    const numDividends = parseFloat(dividends) || 0;

    setTimeout(() => {
      const corpResult = calculateCorporateTax({
        revenue: numRevenue,
        expenses: numExpenses,
        corporateTaxRules,
        dividendAmount: numDividends,
      });
      setResult(corpResult);
      setLoading(false);
    }, 200);
  };

  return (
    <Card variant="bordered">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-violet-600 flex items-center justify-center shadow-lg shadow-purple-500/25">
            <span className="text-lg">🏢</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Corporate Tax Calculator</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Calculate corporate tax and net profit
            </p>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <div className="space-y-5">
          <Input
            label="Annual Revenue"
            type="number"
            value={revenue}
            onChange={(e) => {
              setRevenue(e.target.value);
              setErrors((prev) => ({ ...prev, revenue: undefined }));
            }}
            prefix={currencySymbol}
            placeholder="Enter revenue"
            min={0}
            error={errors.revenue}
            hint="Total company revenue"
          />

          <Input
            label="Annual Expenses"
            type="number"
            value={expenses}
            onChange={(e) => {
              setExpenses(e.target.value);
              setErrors((prev) => ({ ...prev, expenses: undefined }));
            }}
            prefix={currencySymbol}
            placeholder="Enter expenses"
            min={0}
            error={errors.expenses}
            hint="Total deductible expenses"
          />

          <Input
            label="Dividends to Distribute (optional)"
            type="number"
            value={dividends}
            onChange={(e) => setDividends(e.target.value)}
            prefix={currencySymbol}
            placeholder="Enter dividend amount"
            min={0}
            hint="Dividend withholding tax will be calculated"
          />

          {/* Corporate rate info */}
          <div className="flex items-start gap-2 p-3 rounded-lg bg-purple-50 dark:bg-purple-900/20 text-purple-700 dark:text-purple-300 text-sm">
            <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <span className="font-medium">Standard Rate: {(corporateTaxRules.standardRate * 100).toFixed(0)}%</span>
              {corporateTaxRules.smallBusinessRate && (
                <span className="ml-2">
                  • Small Business: {(corporateTaxRules.smallBusinessRate.rate * 100).toFixed(0)}%
                  {corporateTaxRules.smallBusinessRate.threshold && (
                    <span> (up to {currencySymbol}{corporateTaxRules.smallBusinessRate.threshold.toLocaleString()} profit)</span>
                  )}
                </span>
              )}
            </div>
          </div>

          <Button onClick={handleCalculate} className="w-full" loading={loading}>
            {loading ? 'Calculating...' : 'Calculate Corporate Tax'}
          </Button>

          {result && (
            <CorporateResultDisplay
              result={result}
              currency={currency}
              currencySymbol={currencySymbol}
              standardRate={corporateTaxRules.standardRate}
              smallBusinessRate={corporateTaxRules.smallBusinessRate}
            />
          )}
        </div>
      </CardBody>
    </Card>
  );
}