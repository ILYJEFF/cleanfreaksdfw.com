import { NextRequest, NextResponse } from 'next/server';
import { SITE_NAME } from '@/lib/brand';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, phone, email, message, propertyType, city } = body;

    if (!firstName || !lastName || !phone || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const text = [
      `New quote request from ${SITE_NAME}`,
      '',
      `Name: ${firstName} ${lastName}`,
      `Phone: ${phone}`,
      `Email: ${email}`,
      `Property type: ${propertyType || 'n/a'}`,
      `City: ${city || 'n/a'}`,
      '',
      'Message:',
      message,
    ].join('\n');

    // Wire Resend/SendGrid here when ready.
    console.log('Quote request:', text);

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
