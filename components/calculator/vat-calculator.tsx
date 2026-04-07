'use client';

import { useState } from 'react';
import { VatRules } from '@/lib/countries/types';
import { calculateVat, VatRateType, VatCalculationMode } from '@/lib/calculators';
import { Input, Select, Button, Card, CardHeader, CardBody } from '@/components/ui';
import { formatPercent } from '@/lib/utils/format';
import { VatResultDisplay } from '@/components/results/vat-result';

interface VatCalculatorProps {
  vatRules: VatRules;
  currency: string;
  currencySymbol: string;
}

export function VatCalculator({ vatRules, currency, currencySymbol }: VatCalculatorProps) {
  const [amount, setAmount] = useState<string>('1000');
  const [rateType, setRateType] = useState<VatRateType>('standard');
  const [mode, setMode] = useState<VatCalculationMode>('add');
  const [result, setResult] = useState<ReturnType<typeof calculateVat> | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [showExample, setShowExample] = useState(false);

  const handleCalculate = () => {
    // Validation
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount)) {
      setError('Please enter a valid number');
      return;
    }
    if (numAmount <= 0) {
      setError('Amount must be greater than 0');
      return;
    }
    if (numAmount > 999999999999) {
      setError('Amount is too large');
      return;
    }

    setError('');
    setLoading(true);

    // Simulate brief calculation delay for better UX
    setTimeout(() => {
      const vatResult = calculateVat({
        amount: numAmount,
        vatRules,
        rateType,
        mode,
      });
      setResult(vatResult);
      setLoading(false);
    }, 200);
  };

  const rateOptions = [
    { value: 'standard', label: `Standard (${formatPercent(vatRules.standardRate)})` },
    ...(vatRules.reducedRates.length > 0
      ? [{ value: 'reduced', label: `Reduced (${formatPercent(vatRules.reducedRates[0].rate)})` }]
      : []),
    ...(vatRules.superReducedRate
      ? [{ value: 'super-reduced', label: `Super-reduced (${formatPercent(vatRules.superReducedRate)})` }]
      : []),
  ];

  const modeOptions = [
    { value: 'add', label: 'Add VAT (Net → Gross)' },
    { value: 'extract', label: 'Extract VAT (Gross → Net)' },
  ];

  return (
    <Card variant="bordered">
      <CardHeader>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/25">
            <span className="text-lg">🧾</span>
          </div>
          <div>
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">VAT Calculator</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              Calculate VAT for goods and services
            </p>
          </div>
        </div>
      </CardHeader>
      <CardBody>
        <div className="space-y-5">
          <Select
            label="Calculation Mode"
            value={mode}
            onChange={(e) => setMode(e.target.value as VatCalculationMode)}
            options={modeOptions}
          />

          <Select
            label="VAT Rate"
            value={rateType}
            onChange={(e) => setRateType(e.target.value as VatRateType)}
            options={rateOptions}
          />

          <Input
            label={mode === 'add' ? 'Net Amount' : 'Gross Amount'}
            type="number"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
              setError('');
            }}
            prefix={currencySymbol}
            placeholder="Enter amount"
            min={0}
            error={error}
            hint={mode === 'add' ? 'Amount before VAT is added' : 'Amount including VAT'}
          />

          {rateType === 'reduced' && vatRules.reducedRates[0] && (
            <div className="flex items-start gap-2 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-sm">
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Applies to: {vatRules.reducedRates[0].appliesTo.slice(0, 3).join(', ')}{vatRules.reducedRates[0].appliesTo.length > 3 ? '...' : ''}</span>
            </div>
          )}

          <Button onClick={handleCalculate} className="w-full" loading={loading}>
            {loading ? 'Calculating...' : 'Calculate VAT'}
          </Button>

          {!result && !showExample && (
            <button
              onClick={() => {
                setAmount('1000');
                setRateType('standard');
                setShowExample(true);
                setTimeout(() => {
                  const vatResult = calculateVat({
                    amount: 1000,
                    vatRules,
                    rateType: 'standard',
                    mode: 'add',
                  });
                  setResult(vatResult);
                }, 100);
              }}
              className="w-full text-sm text-slate-500 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
            >
              ✨ Show example calculation
            </button>
          )}

          {result && <VatResultDisplay result={result} currency={currency} mode={mode} />}
        </div>
      </CardBody>
    </Card>
  );
}