import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const res = await fetch('https://api.us-east.tinybird.co/v0/events?name=analytics_mygov', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.TB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    let data = {} as Record<string, unknown>;
    try {
      data = await res.json();
    } catch (err) {
      data = { response: 'error' };
    }

    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Failed to send event' }, { status: 500 });
  }
}
