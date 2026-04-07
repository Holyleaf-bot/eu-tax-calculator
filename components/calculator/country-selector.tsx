'use client';

import { countryList, CountryTaxRules } from '@/lib/countries';
import { Select } from '@/components/ui/select';

interface CountrySelectorProps {
  value: string;
  onChange: (code: string) => void;
  className?: string;
}

export function CountrySelector({ value, onChange, className = '' }: CountrySelectorProps) {
  const options = countryList.map((country: CountryTaxRules) => ({
    value: country.code,
    label: `${country.flag} ${country.name}`,
  }));

  // Sort alphabetically by name
  options.sort((a, b) => a.label.localeCompare(b.label));

  return (
    <Select
      label="Select Country"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      options={options}
      placeholder="Choose a country..."
      className={className}
    />
  );
}