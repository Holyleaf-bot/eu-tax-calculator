// EU Tax Calculator - Country Registry

import { CountryTaxRules } from './types';
import at from './at';
import be from './be';
import bg from './bg';
import cy from './cy';
import cz from './cz';
import de from './de';
import dk from './dk';
import ee from './ee';
import es from './es';
import fi from './fi';
import fr from './fr';
import gr from './gr';
import hr from './hr';
import hu from './hu';
import ie from './ie';
import it from './it';
import lt from './lt';
import lu from './lu';
import lv from './lv';
import mt from './mt';
import nl from './nl';
import pl from './pl';
import pt from './pt';
import ro from './ro';
import se from './se';
import si from './si';
import sk from './sk';

// All 27 EU member states
export const countries: Record<string, CountryTaxRules> = {
  at,
  be,
  bg,
  cy,
  cz,
  de,
  dk,
  ee,
  es,
  fi,
  fr,
  gr,
  hr,
  hu,
  ie,
  it,
  lt,
  lu,
  lv,
  mt,
  nl,
  pl,
  pt,
  ro,
  se,
  si,
  sk,
};

export const countryList = Object.values(countries).sort((a, b) =>
  a.name.localeCompare(b.name)
);

export function getCountry(code: string): CountryTaxRules | undefined {
  return countries[code.toLowerCase()];
}

export function isValidCountry(code: string): boolean {
  return code.toLowerCase() in countries;
}

export type { CountryTaxRules, TaxBracket, Deduction } from './types';