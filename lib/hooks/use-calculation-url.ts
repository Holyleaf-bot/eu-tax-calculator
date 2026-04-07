'use client';

import { useSearchParams, usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';

/**
 * Hook for syncing calculator state with URL parameters
 * This allows sharing and bookmarking calculations
 */
export function useCalculationUrl<T extends Record<string, string | number>>(defaults: T) {
  const searchParams = useSearchParams();
  const pathname = usePathname();

  // Get initial values from URL or defaults
  const getInitialValues = useCallback((): T => {
    const values = { ...defaults } as T;
    for (const key of Object.keys(defaults)) {
      const param = searchParams.get(key);
      if (param !== null) {
        const defaultValue = defaults[key];
        if (typeof defaultValue === 'number') {
          const parsed = parseFloat(param);
          if (!isNaN(parsed)) {
            (values as Record<string, string | number>)[key] = parsed;
          }
        } else {
          (values as Record<string, string | number>)[key] = param;
        }
      }
    }
    return values;
  }, [searchParams, defaults]);

  const [values, setValues] = useState<T>(getInitialValues);

  // Update URL when values change
  const updateUrl = useCallback((newValues: T) => {
    const params = new URLSearchParams();
    for (const [key, value] of Object.entries(newValues)) {
      if (value !== undefined && value !== '' && value !== defaults[key]) {
        params.set(key, String(value));
      }
    }

    const urlString = params.toString();
    const newUrl = urlString ? `${pathname}?${urlString}` : pathname;

    // Use replaceState to avoid adding history entries for every change
    window.history.replaceState(null, '', newUrl);
  }, [pathname, defaults]);

  // Sync URL on value change (debounced)
  const [debouncedValues, setDebouncedValues] = useState<T>(values);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValues(values);
    }, 500);
    return () => clearTimeout(timer);
  }, [values]);

  useEffect(() => {
    updateUrl(debouncedValues);
  }, [debouncedValues, updateUrl]);

  return {
    values,
    setValues,
    setFieldValue: <K extends keyof T>(key: K, value: T[K]) => {
      setValues(prev => ({ ...prev, [key]: value }));
    },
    resetToDefaults: () => {
      setValues(defaults);
    },
    shareUrl: typeof window !== 'undefined' ? window.location.href : '',
  };
}