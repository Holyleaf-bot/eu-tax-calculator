export function StructuredData() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "EU Tax Calculator",
    "description": "Free tax calculator for all 27 EU member states. Calculate VAT, income tax, corporate tax, and social contributions with accurate 2025 rates.",
    "url": "https://eu-tax-calculator.vercel.app",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR"
    },
    "author": {
      "@type": "Organization",
      "name": "EU Tax Calculator"
    },
    "featureList": [
      "VAT Calculator for 27 EU countries",
      "Income Tax Calculator with progressive brackets",
      "Corporate Tax Calculator",
      "Social Contributions Calculator",
      "Net to Gross Salary Calculator",
      "2025 Tax Rates"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}