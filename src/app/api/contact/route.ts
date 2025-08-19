import { NextRequest, NextResponse } from 'next/server';

// --- Turnstile verification helper ---
async function verifyTurnstile(token: string, ip: string): Promise<boolean> {
  const isDevelopment = process.env.NEXT_PUBLIC_APP_ENV === 'development';

  if (isDevelopment) {
    console.log('Turnstile verification skipped in development mode');
    return true;
  }

  if (!process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY) {
    console.warn('Cloudflare Turnstile secret key not configured');
    return true;
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
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: formData,
    });

    const result = await response.json();
    console.log('Turnstile verification result:', result);

    return result.success === true;
  } catch (err) {
    console.error('Turnstile verification error:', err);
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    // 🔹 Extract Turnstile token from the form submission
    const turnstileToken = formData.get('cf-turnstile-response')?.toString();
    const ip = req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    // 🔹 Verify Turnstile before hitting Freshdesk
    if (!turnstileToken) {
      return NextResponse.json({ error: 'Verification token is required' }, { status: 400 });
    }

    const isValidTurnstile = await verifyTurnstile(turnstileToken, ip);
    if (!isValidTurnstile) {
      return NextResponse.json({ error: 'Invalid verification token' }, { status: 400 });
    }

    formData.delete('cf-turnstile-response'); // Remove Turnstile token from form data

    // 🔹 Proceed with Freshdesk request if verified
    const apiKey = process.env.FRESHDESK_API_KEY;
    const url = process.env.FRESHDESK_API_URL;

    if (!apiKey || !url) {
      return NextResponse.json({ error: 'Freshdesk API credentials not configured' }, { status: 500 });
    }

    const response = await fetch(url, {
      method: 'POST',
      headers: { Authorization: 'Basic ' + Buffer.from(`${apiKey}:X`).toString('base64') },
      body: formData,
    });

    let data: Record<string, unknown>;
    try {
      data = await response.json();
    } catch (err) {
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
