'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { trackPageView } from '@/lib/analytics';

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Wait for Flock.js to load
    const trackPageViewEvent = () => {
      trackPageView();
    };

    // Try to track immediately if Flock.js is already loaded
    if (typeof window !== 'undefined' && window.tb) {
      trackPageViewEvent();
    } else {
      // Wait for Flock.js to load
      const checkFlock = setInterval(() => {
        if (typeof window !== 'undefined' && window.tb) {
          trackPageViewEvent();
          clearInterval(checkFlock);
        }
      }, 100);
    }
  }, [pathname]);

  return <>{children}</>;
}
