import { MetadataRoute } from 'next';
import { countryList } from '@/lib/countries';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://eu-tax-calculator.vercel.app';

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ];

  // Dynamic country pages
  const countryPages: MetadataRoute.Sitemap = countryList.map((country) => ({
    url: `${baseUrl}/${country.code.toLowerCase()}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  return [...staticPages, ...countryPages];
}