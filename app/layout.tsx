import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Header } from "@/components/header";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: {
    default: "EU Tax Calculator | Calculate Taxes for All 27 EU Countries",
    template: "%s | EU Tax Calculator",
  },
  description: "Free tax calculator for all 27 EU member states. Calculate VAT, income tax, corporate tax, and social contributions with accurate 2025 rates. Features progressive tax brackets, deductions, and employer contributions.",
  keywords: ["EU tax calculator", "VAT calculator", "income tax", "corporate tax", "European Union", "tax rates", "salary calculator", "net salary", "gross salary", "social contributions", "2025 tax rates"],
  authors: [{ name: "EU Tax Calculator" }],
  creator: "EU Tax Calculator",
  publisher: "EU Tax Calculator",
  metadataBase: new URL("https://eu-tax-calculator.vercel.app"),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://eu-tax-calculator.vercel.app",
    siteName: "EU Tax Calculator",
    title: "EU Tax Calculator | Calculate Taxes for All 27 EU Countries",
    description: "Free tax calculator for all 27 EU member states. Calculate VAT, income tax, corporate tax, and social contributions with accurate 2025 rates.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "EU Tax Calculator - Tax calculations for all 27 EU member states",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "EU Tax Calculator | Calculate Taxes for All 27 EU Countries",
    description: "Free tax calculator for all 27 EU member states. Calculate VAT, income tax, corporate tax, and social contributions.",
    images: ["/og-image.png"],
    creator: "@eu_tax_calc",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans min-h-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-indigo-950`}>
        <ThemeProvider>
          {/* Decorative background */}
          <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/20 rounded-full blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-400/10 rounded-full blur-3xl" />
          </div>

          <div className="min-h-screen flex flex-col">
            <Header />

            {/* Main Content */}
            <main id="main-content" className="flex-1" tabIndex={-1}>
              {children}
            </main>

            {/* Footer */}
            <footer className="mt-auto border-t border-slate-200/50 dark:border-slate-700/50 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <span>© {new Date().getFullYear()} EU Tax Calculator</span>
                    <span className="hidden sm:inline">•</span>
                    <span className="hidden sm:inline">Tax calculations for all 27 EU member states</span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                    <span className="flex items-center gap-1">
                      <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                      2025 Tax Rates
                    </span>
                    <span>•</span>
                    <span>For informational purposes only</span>
                  </div>
                </div>
              </div>
            </footer>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}