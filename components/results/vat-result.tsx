'use client';

import { useState } from 'react';
import { VatResult } from '@/lib/countries/types';
import { VatCalculationMode } from '@/lib/calculators';
import { Card, CardBody } from '@/components/ui';
import { formatCurrency, formatPercent, formatNumber } from '@/lib/utils/format';
import { generateTextSummary, copyToClipboard, downloadAsText } from '@/lib/utils/export';

interface VatResultDisplayProps {
  result: VatResult;
  currency: string;
  mode: VatCalculationMode;
  country?: string;
}

export function VatResultDisplay({ result, currency, mode, country = 'EU' }: VatResultDisplayProps) {
  const { netAmount, vatAmount, grossAmount, rate } = result;
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    const summary = generateTextSummary('vat', result, country, currency);
    const success = await copyToClipboard(summary);
    if (success) {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleDownload = () => {
    const summary = generateTextSummary('vat', result, country, currency);
    downloadAsText(`vat-calculation-${new Date().toISOString().split('T')[0]}`, summary);
  };

  return (
    <Card variant="bordered" className="mt-6 animate-fade-in">
      <CardBody>
        {/* Header with Export */}
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white flex items-center gap-2">
            <span className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white text-sm">
              ✓
            </span>
            Results
          </h3>
          <div className="flex gap-2">
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1"
            >
              {copied ? (
                <>
                  <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Copied!
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                  </svg>
                  Copy
                </>
              )}
            </button>
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 text-sm font-medium text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-700 rounded-lg transition-colors flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export
            </button>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 p-4 border border-green-200/50 dark:border-green-800/50">
            <div className="absolute inset-0 bg-green-500/5" />
            <p className="text-sm text-green-600 dark:text-green-400 relative">
              {mode === 'add' ? 'Net Amount' : 'Net (Extracted)'}
            </p>
            <p className="text-2xl font-bold text-green-700 dark:text-green-300 relative">
              {formatCurrency(netAmount, currency)}
            </p>
          </div>

          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 border border-blue-200/50 dark:border-blue-800/50">
            <div className="absolute inset-0 bg-blue-500/5" />
            <p className="text-sm text-blue-600 dark:text-blue-400 relative">
              VAT ({formatPercent(rate)})
            </p>
            <p className="text-2xl font-bold text-blue-700 dark:text-blue-300 relative">
              {formatCurrency(vatAmount, currency)}
            </p>
          </div>

          <div className="relative overflow-hidden rounded-xl bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-800/50 dark:to-slate-700/50 p-4 border border-slate-200/50 dark:border-slate-700/50">
            <p className="text-sm text-slate-600 dark:text-slate-400 relative">
              {mode === 'add' ? 'Gross Amount' : 'Gross (Entered)'}
            </p>
            <p className="text-2xl font-bold text-slate-900 dark:text-white relative">
              {formatCurrency(grossAmount, currency)}
            </p>
          </div>
        </div>

        {/* Breakdown */}
        <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
          <h4 className="text-sm font-medium text-slate-700 dark:text-slate-300 mb-3 flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 13h.01M9 9h.01M15 9h.01M5 17h.01M5 13h.01M5 9h.01" />
            </svg>
            Calculation Breakdown
          </h4>
          <div className="space-y-2 text-sm bg-slate-50 dark:bg-slate-800/50 rounded-xl p-4">
            {mode === 'add' ? (
              <>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Net Amount:</span>
                  <span className="font-mono text-slate-900 dark:text-white">{formatNumber(netAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">VAT Rate:</span>
                  <span className="font-mono text-slate-900 dark:text-white">{formatPercent(rate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">VAT Amount:</span>
                  <span className="font-mono text-slate-900 dark:text-white">{formatNumber(netAmount)} × {formatPercent(rate)} = {formatNumber(vatAmount)}</span>
                </div>
                <div className="flex justify-between font-semibold border-t border-slate-200 dark:border-slate-600 pt-2 mt-2">
                  <span className="text-slate-900 dark:text-white">Gross Amount:</span>
                  <span className="font-mono text-green-600 dark:text-green-400">{formatNumber(netAmount)} + {formatNumber(vatAmount)} = {formatNumber(grossAmount)}</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Gross Amount:</span>
                  <span className="font-mono text-slate-900 dark:text-white">{formatNumber(grossAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">VAT Rate:</span>
                  <span className="font-mono text-slate-900 dark:text-white">{formatPercent(rate)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600 dark:text-slate-400">Net Amount:</span>
                  <span className="font-mono text-slate-900 dark:text-white">{formatNumber(grossAmount)} ÷ {formatNumber(1 + rate)} = {formatNumber(netAmount)}</span>
                </div>
                <div className="flex justify-between font-semibold border-t border-slate-200 dark:border-slate-600 pt-2 mt-2">
                  <span className="text-slate-900 dark:text-white">VAT Extracted:</span>
                  <span className="font-mono text-green-600 dark:text-green-400">{formatNumber(grossAmount)} - {formatNumber(netAmount)} = {formatNumber(vatAmount)}</span>
                </div>
              </>
            )}
          </div>
        </div>
      </CardBody>
    </Card>
  );
}