// Utility functions for formatting

export function formatCurrency(amount: number, currency: string = 'EUR'): string {
  return new Intl.NumberFormat('en-EU', {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(amount);
}

export function formatNumber(amount: number, decimals: number = 2): string {
  return new Intl.NumberFormat('en-EU', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(amount);
}

export function formatPercent(value: number, decimals: number = 1): string {
  return `${(value * 100).toFixed(decimals)}%`;
}

export function parseNumber(input: string): number {
  // Remove currency symbols, spaces, and thousand separators
  const cleaned = input.replace(/[€$£,\s]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

export function formatCountryName(code: string): string {
  const countryNames: Record<string, string> = {
    at: 'Austria',
    be: 'Belgium',
    bg: 'Bulgaria',
    cy: 'Cyprus',
    cz: 'Czechia',
    de: 'Germany',
    dk: 'Denmark',
    ee: 'Estonia',
    es: 'Spain',
    fi: 'Finland',
    fr: 'France',
    gr: 'Greece',
    hr: 'Croatia',
    hu: 'Hungary',
    ie: 'Ireland',
    it: 'Italy',
    lt: 'Lithuania',
    lu: 'Luxembourg',
    lv: 'Latvia',
    mt: 'Malta',
    nl: 'Netherlands',
    pl: 'Poland',
    pt: 'Portugal',
    ro: 'Romania',
    se: 'Sweden',
    si: 'Slovenia',
    sk: 'Slovakia',
  };
  return countryNames[code.toLowerCase()] || code;
}

// Get currency for a country code
export function getCountryCurrency(code: string): { code: string; symbol: string } {
  const currencies: Record<string, { code: string; symbol: string }> = {
    at: { code: 'EUR', symbol: '€' },
    be: { code: 'EUR', symbol: '€' },
    bg: { code: 'BGN', symbol: 'лв' },
    cy: { code: 'EUR', symbol: '€' },
    cz: { code: 'CZK', symbol: 'Kč' },
    de: { code: 'EUR', symbol: '€' },
    dk: { code: 'DKK', symbol: 'kr' },
    ee: { code: 'EUR', symbol: '€' },
    es: { code: 'EUR', symbol: '€' },
    fi: { code: 'EUR', symbol: '€' },
    fr: { code: 'EUR', symbol: '€' },
    gr: { code: 'EUR', symbol: '€' },
    hr: { code: 'EUR', symbol: '€' },
    hu: { code: 'HUF', symbol: 'Ft' },
    ie: { code: 'EUR', symbol: '€' },
    it: { code: 'EUR', symbol: '€' },
    lt: { code: 'EUR', symbol: '€' },
    lu: { code: 'EUR', symbol: '€' },
    lv: { code: 'EUR', symbol: '€' },
    mt: { code: 'EUR', symbol: '€' },
    nl: { code: 'EUR', symbol: '€' },
    pl: { code: 'PLN', symbol: 'zł' },
    pt: { code: 'EUR', symbol: '€' },
    ro: { code: 'RON', symbol: 'lei' },
    se: { code: 'SEK', symbol: 'kr' },
    si: { code: 'EUR', symbol: '€' },
    sk: { code: 'EUR', symbol: '€' },
  };
  return currencies[code.toLowerCase()] || { code: 'EUR', symbol: '€' };
}