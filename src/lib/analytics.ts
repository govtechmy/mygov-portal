declare global {
  interface Window {
    tb?: {
      track: (eventName: string, properties: AnalyticsEvent) => void;
    };
  }
}

export interface AnalyticsEvent {
  action: string;
  payload: string;
  session_id: string;
  timestamp: string;
  version: string;
}

export function generateSessionId(): string {
  return `sess_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function trackEvent(eventName: string, customPayload: Record<string, unknown> = {}): void {
  if (typeof window === 'undefined' || !window.tb) {
    console.warn('Flock.js not loaded, cannot track event:', eventName);
    return;
  }

  const event: AnalyticsEvent = {
    action: eventName,
    payload: JSON.stringify({
      'user-agent': navigator.userAgent,
      locale: navigator.language,
      location: window.location.hostname,
      referrer: document.referrer,
      pathname: window.location.pathname,
      href: window.location.href,
      ...customPayload,
    }),
    session_id: generateSessionId(),
    timestamp: new Date().toISOString(),
    version: '1.0.0',
  };

  window.tb.track(eventName, event);
}

export function trackPageView(customPayload: Record<string, unknown> = {}): void {
  trackEvent('page_view', customPayload);
}

export function trackButtonClick(buttonName: string, customPayload: Record<string, unknown> = {}): void {
  trackEvent('button_click', {
    button_name: buttonName,
    ...customPayload,
  });
}

export function trackFormSubmission(formName: string, customPayload: Record<string, unknown> = {}): void {
  trackEvent('form_submission', {
    form_name: formName,
    ...customPayload,
  });
}

export function trackSearch(query: string, customPayload: Record<string, unknown> = {}): void {
  trackEvent('search', {
    search_query: query,
    ...customPayload,
  });
}
