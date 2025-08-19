import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const apiKey = process.env.FRESHDESK_API_KEY;
    const url = process.env.FRESHDESK_API_URL; // e.g. "https://yourdomain.freshdesk.com/api/v2/tickets"

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
