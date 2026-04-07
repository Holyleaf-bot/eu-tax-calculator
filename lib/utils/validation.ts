// Input validation utilities

export interface ValidationResult {
  valid: boolean;
  error?: string;
}

export function validateAmount(value: string | number, min: number = 0): ValidationResult {
  const num = typeof value === 'string' ? parseFloat(value) : value;

  if (isNaN(num)) {
    return { valid: false, error: 'Please enter a valid number' };
  }

  if (num < min) {
    return { valid: false, error: `Value must be at least ${min}` };
  }

  return { valid: true };
}

export function validatePositiveNumber(value: string | number): ValidationResult {
  return validateAmount(value, 0.01);
}

export function validateCountryCode(code: string): ValidationResult {
  const validCodes = [
    'at', 'be', 'bg', 'cy', 'cz', 'de', 'dk', 'ee', 'es', 'fi',
    'fr', 'gr', 'hr', 'hu', 'ie', 'it', 'lt', 'lu', 'lv', 'mt',
    'nl', 'pl', 'pt', 'ro', 'se', 'si', 'sk'
  ];

  if (!validCodes.includes(code.toLowerCase())) {
    return { valid: false, error: 'Invalid country code' };
  }

  return { valid: true };
}

export function clamp(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}