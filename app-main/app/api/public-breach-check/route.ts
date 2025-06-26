import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    // Server-side call to the Django API without requiring Authorization
    const response = await fetch(
      `https://api.haveibeenpwned.security.ait.dtu.dk/api/v3/breachedaccount/${encodeURIComponent(email)}/`,
      {
        method: 'GET',
        headers: {
          accept: 'application/json',
        },
      }
    );


    console.log('=== SERVER: Backend response ===');
    console.log('Status:', response.status);

    const text = await response.text();

    if (!response.ok) {
      return NextResponse.json(
        { error: `Backend API error: ${response.status}`, details: text },
        { status: response.status }
      );
    }

    return NextResponse.json(JSON.parse(text));
  } catch (err) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}