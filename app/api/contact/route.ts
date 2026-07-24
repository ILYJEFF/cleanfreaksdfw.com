import { NextRequest, NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabase/admin';
import { SITE_NAME } from '@/lib/brand';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, phone, email, message, propertyType, city } = body;

    if (!firstName || !lastName || !phone || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const supabase = getSupabaseAdmin();
    
    const { error } = await supabase.from('cleanfreaks_leads').insert({
      first_name: firstName,
      last_name: lastName,
      phone,
      email,
      property_type: propertyType || null,
      city: city || null,
      message,
      source: SITE_NAME,
    });

    if (error) {
      console.error('Supabase insert error:', error);
      return NextResponse.json({ error: 'Failed to save submission' }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('Contact API error:', err);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}
