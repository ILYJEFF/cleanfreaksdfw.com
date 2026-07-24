import { NextRequest, NextResponse } from "next/server";
import {
  isSmtpConfigured,
  sendQuoteConfirmation,
  sendQuoteNotification,
} from "@/lib/mail";
import { markQuoteEmailSent, saveQuoteRequest } from "@/lib/quotes";
import { isSupabaseConfigured } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, phone, email, message, propertyType, city } =
      body;

    if (!firstName || !lastName || !phone || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    const payload = {
      firstName: String(firstName),
      lastName: String(lastName),
      phone: String(phone),
      email: String(email),
      message: String(message),
      propertyType: propertyType ? String(propertyType) : undefined,
      city: city ? String(city) : undefined,
    };

    let quoteId: string | null = null;

    if (isSupabaseConfigured()) {
      const saved = await saveQuoteRequest(payload);
      quoteId = saved.id;
    } else {
      console.warn(
        "[contact] Supabase not configured; quote was not persisted.",
      );
    }

    let emailSent = false;
    if (isSmtpConfigured()) {
      await sendQuoteNotification(payload);
      try {
        await sendQuoteConfirmation(payload);
      } catch (confirmErr) {
        console.warn("[contact] Confirmation email failed:", confirmErr);
      }
      emailSent = true;
      if (quoteId) {
        await markQuoteEmailSent(quoteId, true);
      }
    } else {
      console.warn(
        "[contact] SMTP not configured; quote email was not sent.",
        payload,
      );
    }

    if (!quoteId && !emailSent) {
      return NextResponse.json(
        {
          error:
            "Contact backend is not configured. Set Supabase and/or SMTP env vars.",
        },
        { status: 503 },
      );
    }

    return NextResponse.json({ ok: true, id: quoteId, emailSent });
  } catch (err) {
    console.error("[contact]", err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
