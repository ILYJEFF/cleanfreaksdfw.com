import { NextRequest, NextResponse } from "next/server";
import {
  isSmtpConfigured,
  sendQuoteEmails,
} from "@/lib/mail";
import { composeMessageFromDetails } from "@/lib/quote-form";
import { markQuoteEmailSent, saveQuoteRequest } from "@/lib/quotes";
import { isSupabaseConfigured } from "@/lib/supabase/admin";

const ALLOWED_TYPES = new Set(["commercial", "airbnb", "residential"]);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      firstName,
      lastName,
      phone,
      email,
      message,
      propertyType,
      city,
      details,
    } = body;

    if (!firstName || !lastName || !phone || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    if (!propertyType || !ALLOWED_TYPES.has(String(propertyType))) {
      return NextResponse.json(
        { error: "Select a valid property type" },
        { status: 400 },
      );
    }

    const detailObj =
      details && typeof details === "object" && !Array.isArray(details)
        ? (details as Record<string, unknown>)
        : undefined;

    const composedMessage = composeMessageFromDetails(
      detailObj,
      message ? String(message) : undefined,
    );

    const payload = {
      firstName: String(firstName),
      lastName: String(lastName),
      phone: String(phone),
      email: String(email),
      message: composedMessage,
      propertyType: String(propertyType),
      city: city ? String(city) : undefined,
      details: detailObj,
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
      // Lead to sales@ first. Confirmation to the filler is best-effort
      // (PrivateMail may rate-limit after many sends in one hour).
      await sendQuoteEmails(payload);
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
