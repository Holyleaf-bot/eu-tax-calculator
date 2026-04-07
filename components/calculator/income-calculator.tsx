'use client';

import { useState, useCallback } from 'react';
import { IncomeTaxRules, SocialContributions } from '@/lib/countries/types';
import { calculateIncomeTax, findGrossForNet } from '@/lib/calculators';
import { Input, Button, Card, CardHeader, CardBody, Select } from '@/components/ui';
import { formatCurrency, formatPercent } from '@/lib/utils/format';
import { IncomeResultDisplay } from '@/components/results/income-result';
import { useKeyboardShortcuts } from '@/lib/hooks/use-keyboard-shortcuts';

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
  const [netSalaryInput, setNetSalaryInput] = useState<string>('35000');
  const [mode, setMode] = useState<'gross-to-net' | 'net-to-gross'>('gross-to-net');
  const [result, setResult] = useState<ReturnType<typeof calculateIncomeTax> | null>(null);
  const [grossResult, setGrossResult] = useState<number | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [showExample, setShowExample] = useState(false);

  // Get average salary for the country as an example
  const getExampleSalary = () => {
    const topBracket = incomeTaxRules.brackets[incomeTaxRules.brackets.length - 1];
    const midBracket = incomeTaxRules.brackets[Math.floor(incomeTaxRules.brackets.length / 2)];
    return midBracket?.min || topBracket?.min || 50000;
  };

  const handleCalculate = useCallback(() => {
    // Validation
    const numAmount = parseFloat(mode === 'gross-to-net' ? grossSalary : netSalaryInput);
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
      if (mode === 'gross-to-net') {
        const incomeResult = calculateIncomeTax({
          grossSalary: numAmount,
          incomeTaxRules,
          socialContributions,
        });
        setResult(incomeResult);
        setGrossResult(null);
      } else {
        // Net to gross calculation
        const requiredGross = findGrossForNet(numAmount, incomeTaxRules, socialContributions);
        const incomeResult = calculateIncomeTax({
          grossSalary: requiredGross,
          incomeTaxRules,
          socialContributions,
        });
        setResult(incomeResult);
        setGrossResult(requiredGross);
      }
      setLoading(false);
    }, 200);
  }, [mode, grossSalary, netSalaryInput, incomeTaxRules, socialContributions]);

  // Keyboard shortcuts
  useKeyboardShortcuts([
    { key: 'Enter', handler: handleCalculate },
  ]);

  const modeOptions = [
    { value: 'gross-to-net', label: 'Gross → Net Salary' },
    { value: 'net-to-gross', label: 'Net → Gross Salary' },
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

          {mode === 'gross-to-net' ? (
            <>
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
            </>
          ) : (
            <>
              <Input
                label="Desired Net Salary"
                type="number"
                value={netSalaryInput}
                onChange={(e) => {
                  setNetSalaryInput(e.target.value);
                  setError('');
                }}
                prefix={currencySymbol}
                placeholder="Enter desired net salary"
                min={0}
                error={error}
                hint="Your take-home pay after all deductions"
              />

              {/* Quick amount buttons for net */}
              <div className="flex flex-wrap gap-2">
                <span className="text-sm text-slate-500 dark:text-slate-400">Quick select:</span>
                {['25000', '35000', '50000', '70000'].map((amount) => (
                  <button
                    key={amount}
                    onClick={() => {
                      setNetSalaryInput(amount);
                      setError('');
                    }}
                    className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                      netSalaryInput === amount
                        ? 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600'
                    }`}
                  >
                    {currencySymbol}{parseInt(amount) / 1000}k
                  </button>
                ))}
              </div>
            </>
          )}

          <Button onClick={handleCalculate} className="w-full" loading={loading}>
            {loading ? 'Calculating...' : 'Calculate Income Tax'}
          </Button>

          {!result && !showExample && (
            <button
              onClick={() => {
                const exampleSalary = getExampleSalary();
                setGrossSalary(exampleSalary.toString());
                setShowExample(true);
                setTimeout(() => {
                  const incomeResult = calculateIncomeTax({
                    grossSalary: exampleSalary,
                    incomeTaxRules,
                    socialContributions,
                  });
                  setResult(incomeResult);
                }, 100);
              }}
              className="w-full text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              ✨ Show example calculation
            </button>
          )}

          {result && mode === 'net-to-gross' && grossResult && (
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 border border-green-200 dark:border-green-800 rounded-xl p-4 mb-4">
              <p className="text-sm text-green-600 dark:text-green-400 mb-1">
                To achieve your desired net salary:
              </p>
              <p className="text-2xl font-bold text-green-700 dark:text-green-300">
                Gross salary needed: {currencySymbol}{grossResult.toLocaleString()}
              </p>
            </div>
          )}

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