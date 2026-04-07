// Official tax authority websites for each EU country
export interface TaxAuthority {
  name: string;
  url: string;
  nameLocal?: string;
}

export const taxAuthorities: Record<string, TaxAuthority> = {
  AT: {
    name: 'Federal Ministry of Finance',
    url: 'https://www.bmf.gv.at/',
    nameLocal: 'Bundesministerium für Finanzen',
  },
  BE: {
    name: 'FPS Finance',
    url: 'https://www.fisconet.fgov.be/',
    nameLocal: 'FOD Financiën',
  },
  BG: {
    name: 'National Revenue Agency',
    url: 'https://www.nap.bg/',
    nameLocal: 'Национална агенция по приходите',
  },
  CY: {
    name: 'Tax Department',
    url: 'https://www.mof.gov.cy/tax',
    nameLocal: 'Τμήμα Φορολογίας',
  },
  CZ: {
    name: 'Financial Administration',
    url: 'https://www.financnisprava.cz/',
    nameLocal: 'Finanční správa',
  },
  DE: {
    name: 'Federal Ministry of Finance',
    url: 'https://www.bundesfinanzministerium.de/',
    nameLocal: 'Bundesministerium der Finanzen',
  },
  DK: {
    name: 'Danish Tax Agency',
    url: 'https://skat.dk/',
    nameLocal: 'Skattestyrelsen',
  },
  EE: {
    name: 'Estonian Tax and Customs Board',
    url: 'https://www.emta.ee/',
    nameLocal: 'Maksu- ja Tolliamet',
  },
  ES: {
    name: 'Tax Agency',
    url: 'https://www.agenciatributaria.es/',
    nameLocal: 'Agencia Tributaria',
  },
  FI: {
    name: 'Finnish Tax Administration',
    url: 'https://www.vero.fi/',
    nameLocal: 'Verohallinto',
  },
  FR: {
    name: 'Public Finance Directorate',
    url: 'https://www.impots.gouv.fr/',
    nameLocal: 'Direction Générale des Finances Publiques',
  },
  GR: {
    name: 'Independent Authority for Public Revenue',
    url: 'https://www.aade.gr/',
    nameLocal: 'Ανεξάρτητη Αρχή Δημοσίων Εσόδων',
  },
  HR: {
    name: 'Tax Administration',
    url: 'https://porezna-uprava.gov.hr/',
    nameLocal: 'Porezna uprava',
  },
  HU: {
    name: 'National Tax and Customs Administration',
    url: 'https://www.nav.gov.hu/',
    nameLocal: 'Nemzeti Adó- és Vámhivatal',
  },
  IE: {
    name: 'Revenue Commissioners',
    url: 'https://www.revenue.ie/',
  },
  IT: {
    name: 'Revenue Agency',
    url: 'https://www.agenziaentrate.gov.it/',
    nameLocal: 'Agenzia delle Entrate',
  },
  LT: {
    name: 'State Tax Inspectorate',
    url: 'https://www.vmi.lt/',
    nameLocal: 'Valstybinė mokesčių inspekcija',
  },
  LU: {
    name: 'Administration of Contributions and Direct Taxes',
    url: 'https://impots.public.lu/',
    nameLocal: 'Administration des contributions directes',
  },
  LV: {
    name: 'State Revenue Service',
    url: 'https://www.vid.gov.lv/',
    nameLocal: 'Valsts ieņēmumu dienests',
  },
  MT: {
    name: 'Commissioner for Revenue',
    url: 'https://cfr.gov.mt/',
  },
  NL: {
    name: 'Tax and Customs Administration',
    url: 'https://www.belastingdienst.nl/',
    nameLocal: 'Belastingdienst',
  },
  PL: {
    name: 'Ministry of Finance',
    url: 'https://www.gov.pl/web/finanse',
    nameLocal: 'Ministerstwo Finansów',
  },
  PT: {
    name: 'Tax and Customs Authority',
    url: 'https://www.portaldasfinancas.gov.pt/',
    nameLocal: 'Autoridade Tributária e Aduaneira',
  },
  RO: {
    name: 'National Agency for Fiscal Administration',
    url: 'https://www.anaf.ro/',
    nameLocal: 'Agenția Națională de Administrare Fiscală',
  },
  SE: {
    name: 'Swedish Tax Agency',
    url: 'https://www.skatteverket.se/',
    nameLocal: 'Skatteverket',
  },
  SI: {
    name: 'Financial Administration of the Republic of Slovenia',
    url: 'https://www.fu.gov.si/',
    nameLocal: 'Finančna uprava Republike Slovenije',
  },
  SK: {
    name: 'Financial Directorate',
    url: 'https://www.financnasprava.sk/',
    nameLocal: 'Finančná správa',
  },
};

export function getTaxAuthority(countryCode: string): TaxAuthority | null {
  return taxAuthorities[countryCode] || null;
}