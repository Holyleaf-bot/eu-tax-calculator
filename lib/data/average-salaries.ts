// Average gross annual salaries in EUR (2024 data, approximate)
// Source: Eurostat and national statistics offices
export const averageSalaries: Record<string, number> = {
  AT: 52800, // Austria
  BE: 46800, // Belgium
  BG: 15600, // Bulgaria
  CY: 26400, // Cyprus
  CZ: 22800, // Czechia
  DE: 51600, // Germany
  DK: 60000, // Denmark
  EE: 22800, // Estonia
  ES: 30000, // Spain
  FI: 49200, // Finland
  FR: 44400, // France
  GR: 19200, // Greece
  HR: 18000, // Croatia
  HU: 16800, // Hungary
  IE: 54000, // Ireland
  IT: 33600, // Italy
  LT: 21600, // Lithuania
  LU: 73200, // Luxembourg
  LV: 19200, // Latvia
  MT: 26400, // Malta
  NL: 52800, // Netherlands
  PL: 19200, // Poland
  PT: 21600, // Portugal
  RO: 14400, // Romania
  SE: 50400, // Sweden
  SI: 26400, // Slovenia
  SK: 20400, // Slovakia
};

// Median salaries (lower than average, more representative)
export const medianSalaries: Record<string, number> = {
  AT: 48000,
  BE: 42000,
  BG: 13200,
  CY: 24000,
  CZ: 20400,
  DE: 46800,
  DK: 55200,
  EE: 20400,
  ES: 26400,
  FI: 45600,
  FR: 39600,
  GR: 16800,
  HR: 15600,
  HU: 14400,
  IE: 48000,
  IT: 28800,
  LT: 19200,
  LU: 66000,
  LV: 16800,
  MT: 24000,
  NL: 48000,
  PL: 16800,
  PT: 19200,
  RO: 12000,
  SE: 45600,
  SI: 24000,
  SK: 18000,
};

// Get formatted salary display
export function formatSalaryComparison(salary: number, avgSalary: number, currency: string = 'EUR'): {
  status: 'below' | 'average' | 'above';
  percentage: number;
  label: string;
} {
  const percentage = (salary / avgSalary) * 100;

  if (percentage < 80) {
    return {
      status: 'below',
      percentage: 100 - percentage,
      label: `${(100 - percentage).toFixed(0)}% below average`,
    };
  } else if (percentage > 120) {
    return {
      status: 'above',
      percentage: percentage - 100,
      label: `${(percentage - 100).toFixed(0)}% above average`,
    };
  } else {
    return {
      status: 'average',
      percentage,
      label: 'Around average',
    };
  }
}

// Country salary context
export function getSalaryContext(countryCode: string): {
  average: number;
  median: number;
  currency: string;
} | null {
  const avg = averageSalaries[countryCode];
  const med = medianSalaries[countryCode];

  if (!avg || !med) return null;

  return {
    average: avg,
    median: med,
    currency: 'EUR',
  };
}