import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const res = await fetch('https://haveibeenpwned.com/api/v3/breaches', {
      headers: {
        'User-Agent': 'pwned-proxy-frontend',
      },
    });
    if (!res.ok) {
      return NextResponse.json(
        { error: `Failed to fetch breaches: ${res.status}` },
        { status: res.status }
      );
    }

    const breaches = await res.json();
    const totalWebsites = breaches.length;
    const totalAccounts = breaches.reduce(
      (sum: number, b: { PwnCount?: number }) => sum + (b.PwnCount || 0),
      0
    );

    return NextResponse.json({ totalWebsites, totalAccounts });
  } catch (err) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
