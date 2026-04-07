'use client';

import { useState, useEffect } from 'react';

interface TaxYearProviderProps {
  children: React.ReactNode;
}

interface TaxYearContextValue {
  year: '2024' | '2025';
  setYear: (year: '2024' | '2025') => void;
}

import { createContext, useContext } from 'react';

const TaxYearContext = createContext<TaxYearContextValue | undefined>(undefined);

export function useTaxYear() {
  const context = useContext(TaxYearContext);
  if (!context) {
    throw new Error('useTaxYear must be used within a TaxYearProvider');
  }
  return context;
}

export function TaxYearProvider({ children }: TaxYearProviderProps) {
  const [year, setYear] = useState<'2024' | '2025'>('2024');

  useEffect(() => {
    // Check if we're in 2025 or later
    const currentYear = new Date().getFullYear();
    if (currentYear >= 2025) {
      setYear('2025');
    }
  }, []);

  return (
    <TaxYearContext.Provider value={{ year, setYear }}>
      {children}
    </TaxYearContext.Provider>
  );
}

export function TaxYearToggle() {
  const { year, setYear } = useTaxYear();

  return (
    <div className="inline-flex items-center gap-1 p-1 rounded-lg bg-slate-100 dark:bg-slate-800">
      <button
        onClick={() => setYear('2024')}
        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
          year === '2024'
            ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
        }`}
      >
        2024
      </button>
      <button
        onClick={() => setYear('2025')}
        className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
          year === '2025'
            ? 'bg-white dark:bg-slate-700 text-blue-600 dark:text-blue-400 shadow-sm'
            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
        }`}
      >
        2025
      </button>
    </div>
  );
}