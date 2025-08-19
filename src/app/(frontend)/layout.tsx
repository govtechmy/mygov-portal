import type { Metadata, Viewport } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { AnalyticsProvider } from '@/globals/AnalyticsProvider';
export const metadata: Metadata = {
  title: 'MyGov Portal - Malaysian Government Services',
  description: 'Official Malaysian government portal providing access to government services and information',
  keywords: ['Malaysia', 'government', 'services', 'portal', 'MyGov'],
  authors: [{ name: 'Malaysian Government' }],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="transition-colors duration-200">
        <AnalyticsProvider>
          <ThemeProvider>{children}</ThemeProvider>
        </AnalyticsProvider>
      </body>
    </html>
  );
}
