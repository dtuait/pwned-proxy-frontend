import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const breachesRes = await fetch('https://haveibeenpwned.com/api/v3/breaches', {

      headers: {
        'User-Agent': 'pwned-proxy-frontend',
      },
    });
    if (!breachesRes.ok) {
      return NextResponse.json(
        { error: `Failed to fetch breaches: ${breachesRes.status}` },
        { status: breachesRes.status }
      );
    }

    const [breaches, homeHtml] = await Promise.all([
      breachesRes.json(),
      fetch('https://haveibeenpwned.com/', {
        headers: {
          'User-Agent': 'pwned-proxy-frontend',
        },
      }).then((r) => r.ok ? r.text() : '')
    ]);
    const totalWebsites = breaches.length;
    const totalAccounts = breaches.reduce(
      (sum: number, b: { PwnCount?: number }) => sum + (b.PwnCount || 0),
      0
    );

    // Fetch paste statistics as well
    const pasteRes = await fetch('https://haveibeenpwned.com/api/v3/pastes', {
      headers: {
        'User-Agent': 'pwned-proxy-frontend',
      },
    });
    if (!pasteRes.ok) {
      return NextResponse.json(
        { error: `Failed to fetch pastes: ${pasteRes.status}` },
        { status: pasteRes.status }
      );
    }

    const pastes = await pasteRes.json();
    const totalPastes = Array.isArray(pastes) ? pastes.length : 0;


    return NextResponse.json({ totalWebsites, totalAccounts, totalPastes });
  } catch (err) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
