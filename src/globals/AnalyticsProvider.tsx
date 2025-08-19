'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function AnalyticsProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    fetch('/api/tinybird', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        event: 'page_view',
        url: window.location.href,
        path: pathname,
      }),
    });
  }, [pathname]);

  return <>{children}</>;
}
