import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { AnalyticsProvider } from '@/globals/AnalyticsProvider';

export const metadata: Metadata = {
  title: 'MyGOV Malaysia - Aplikasi Pusat Sehenti Digital Perkhidmatan Kerajaan Malaysia',
  description:
    'MyGOV Malaysia adalah aplikasi yang dibangunkan sebagai menyatukan perkhidmatan kerajaan Malaysia dalam satu aplikasi.',
  keywords: ['Malaysia', 'government', 'services', 'portal', 'MyGOV'],
  authors: [{ name: 'Malaysian Government' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="alternate" type="application/rss+xml" title="MyGOV Malaysia Blog RSS" href="/rss.xml" />
        {/* Tinybird Analytics */}
        <script
          defer
          src="https://unpkg.com/@tinybirdco/flock.js"
          data-token={`${process.env.NEXT_PUBLIC_TINYBIRD_TOKEN}`}
          data-host={`${process.env.NEXT_PUBLIC_TINYBIRD_HOST}`}
          data-datasource="mygov_analytics_master"
        />
      </head>
      <body className="transition-colors duration-200">
        <AnalyticsProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </AnalyticsProvider>
      </body>
    </html>
  );
}
