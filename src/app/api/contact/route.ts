import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const rateLimitStore = new Map<string, { count: number; resetTime: number }>();

// Rate limiting configuration
const RATE_LIMIT_WINDOW = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 3; // 3 submissions per 15 minutes per IP

export async function POST(req: NextRequest) {
  try {
    const headersList = await headers();
    const ip = headersList.get('x-forwarded-for') || headersList.get('x-real-ip') || 'unknown';

    // Rate limiting
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ message: 'Too many requests. Please try again later.' }, { status: 429 });
    }

    const jsonBody = await req.json();
    const { 'cf-turnstile-response': turnstileToken, ...body } = jsonBody;
    const isDevelopment = process.env.APP_ENV === 'development';
    const turnstileSiteKey = process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY;

    if (!isDevelopment && turnstileSiteKey && turnstileSiteKey !== '1x00000000000000000000AA') {
      // Production with Turnstile configured - verification is required
      if (!turnstileToken) {
        return NextResponse.json({ message: 'Verification token is required' }, { status: 400 });
      }

      const isValidTurnstile = await verifyTurnstile(turnstileToken, ip);
      if (!isValidTurnstile) {
        return NextResponse.json({ message: 'Invalid verification token' }, { status: 400 });
      }
    }

    const apiKey = process.env.FRESHDESK_API_KEY;
    const url = process.env.FRESHDESK_API_URL;

    if (!apiKey || !url) {
      return NextResponse.json({ error: 'Freshdesk API credentials not configured' }, { status: 500 });
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: {
        Authorization: 'Basic ' + Buffer.from(`${apiKey}:X`).toString('base64'),
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    let data: Record<string, unknown>;
    try {
      data = await response.json();
    } catch {
      const text = await response.text();
      data = { response: text };
    }

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    const err = error as Error;
    console.error('Freshdesk proxy error:', error);
    return NextResponse.json({ error: err.message ?? 'Unknown error' }, { status: 500 });
  }
}

async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const isDevelopment = process.env.APP_ENV === 'development';

  // Skip verification in development
  if (isDevelopment) {
    console.log('Turnstile verification skipped in development mode');
    return true;
  }

  if (!process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY) {
    console.warn('Cloudflare Turnstile secret key not configured');
    return true; // Skip verification if not configured
  }

  try {
    const formData = new URLSearchParams();
    formData.append('secret', process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY);
    formData.append('response', token);
    if (ip && ip !== 'unknown') {
      formData.append('remoteip', ip);
    }

    const response = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    const result = await response.json();

    // Log the result for debugging
    console.log('Turnstile verification result:', result);

    return result.success === true;
  } catch (error) {
    console.error('Turnstile verification error:', error);
    return false;
  }
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitStore.get(ip);

  if (!record || now > record.resetTime) {
    // Reset or create new record
    rateLimitStore.set(ip, {
      count: 1,
      resetTime: now + RATE_LIMIT_WINDOW,
    });
    return true;
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return false; // Rate limit exceeded
  }

  record.count++;
  return true;
}
