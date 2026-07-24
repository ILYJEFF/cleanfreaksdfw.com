import nodemailer from "nodemailer";
import {
  PROPERTY_TYPE_LABELS,
  detailsToLines,
  type PropertyType,
} from "@/lib/quote-form";

export function isSmtpConfigured(): boolean {
  return Boolean(
    process.env.SMTP_HOST?.trim() &&
      process.env.SMTP_USER?.trim() &&
      process.env.SMTP_PASS?.trim(),
  );
}

function createTransporter() {
  if (!isSmtpConfigured()) {
    throw new Error(
      "SMTP is not configured. Add SMTP_HOST, SMTP_USER, and SMTP_PASS (PrivateMail).",
    );
  }

  const host = process.env.SMTP_HOST!.trim();
  const port = Number(process.env.SMTP_PORT || "465");
  const user = process.env.SMTP_USER!.trim();
  const pass = process.env.SMTP_PASS!.trim();

  return {
    transporter: nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      requireTLS: port === 587,
      auth: { user, pass },
      authMethod: "LOGIN",
      tls: { minVersion: "TLSv1.2" },
    }),
    fromName: process.env.SMTP_FROM_NAME?.trim() || "Clean Freaks DFW",
    fromEmail: process.env.SMTP_FROM_EMAIL?.trim() || user,
    smtpUser: user,
  };
}

/** Only sales@ (or QUOTE_NOTIFY_EMAIL). Never the form submitter. */
function notifyRecipients(): string[] {
  const raw =
    process.env.QUOTE_NOTIFY_EMAIL?.trim() || "sales@cleanfreaksdfw.com";
  const list = raw
    .split(/[,;]+/)
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean);
  return Array.from(new Set(list));
}

export type QuoteMailPayload = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  propertyType?: string;
  city?: string;
  message: string;
  details?: Record<string, unknown>;
};

function propertyLabel(type?: string): string {
  if (type && type in PROPERTY_TYPE_LABELS) {
    return PROPERTY_TYPE_LABELS[type as PropertyType];
  }
  return type || "n/a";
}

function buildQuoteBodies(payload: QuoteMailPayload) {
  const name = `${payload.firstName} ${payload.lastName}`.trim();
  const propertyType = propertyLabel(payload.propertyType);
  const details = payload.details || {};
  const street = String(details.streetAddress || "").trim();
  const city =
    payload.city || String(details.city || "").trim() || "n/a";
  const state = String(details.state || "").trim();
  const zip = String(details.zip || "").trim();
  const locationLine = [
    street,
    [city !== "n/a" ? city : "", state, zip].filter(Boolean).join(", "),
  ]
    .filter(Boolean)
    .join(" · ");
  const detailLines = detailsToLines(payload.details);

  const text = [
    "NEW LEAD · Clean Freaks DFW website form",
    "",
    `Name: ${name}`,
    `Phone: ${payload.phone}`,
    `Email: ${payload.email}`,
    `Property type: ${propertyType}`,
    `Location: ${locationLine || city}`,
    "",
    "Assessment:",
    ...(detailLines.length ? detailLines : [payload.message || "n/a"]),
    "",
    `Contact the lead at: ${payload.email} / ${payload.phone}`,
  ].join("\n");

  const detailRows = detailLines.length
    ? detailLines
        .map((line) => {
          const idx = line.indexOf(": ");
          const label = idx >= 0 ? line.slice(0, idx) : "Detail";
          const value = idx >= 0 ? line.slice(idx + 2) : line;
          return `<tr><td style="padding:6px 0;color:#5a6570;width:140px;vertical-align:top;">${escapeHtml(label)}</td><td style="padding:6px 0;">${escapeHtml(value)}</td></tr>`;
        })
        .join("")
    : `<tr><td colspan="2" style="padding:6px 0;">${escapeHtml(payload.message || "n/a")}</td></tr>`;

  const html = `<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#f5f7f2;font-family:Arial,Helvetica,sans-serif;color:#0b0d0c;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;background:#f5f7f2;">
    <tr><td align="center">
      <table width="100%" style="max-width:600px;background:#ffffff;border:2px solid #0b0d0c;" cellpadding="0" cellspacing="0">
        <tr><td style="padding:22px 24px;background:#0b0d0c;color:#c8f000;">
          <div style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;font-weight:700;">Clean Freaks DFW · Sales lead</div>
          <div style="margin-top:8px;font-size:22px;font-weight:700;color:#ffffff;">Website quote request</div>
          <div style="margin-top:6px;font-size:13px;color:#c8f000;">${escapeHtml(propertyType)} · ${escapeHtml(city)}</div>
        </td></tr>
        <tr><td style="padding:24px;">
          <p style="margin:0 0 16px;font-size:15px;line-height:1.5;"><strong>${escapeHtml(name)}</strong> submitted the quote form.</p>
          <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;line-height:1.6;margin-bottom:8px;">
            <tr><td style="padding:4px 0;color:#5a6570;width:140px;">Phone</td><td style="padding:4px 0;"><a href="tel:${escapeHtml(payload.phone)}" style="color:#0b0d0c;">${escapeHtml(payload.phone)}</a></td></tr>
            <tr><td style="padding:4px 0;color:#5a6570;">Email</td><td style="padding:4px 0;"><a href="mailto:${escapeHtml(payload.email)}" style="color:#0b0d0c;">${escapeHtml(payload.email)}</a></td></tr>
            <tr><td style="padding:4px 0;color:#5a6570;">Property</td><td style="padding:4px 0;">${escapeHtml(propertyType)}</td></tr>
            <tr><td style="padding:4px 0;color:#5a6570;">Location</td><td style="padding:4px 0;">${escapeHtml(locationLine || city)}</td></tr>
          </table>
          <div style="margin-top:16px;padding-top:16px;border-top:1px solid #d7ddd2;">
            <div style="font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#5a6570;font-weight:700;margin-bottom:10px;">Assessment</div>
            <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;line-height:1.55;">
              ${detailRows}
            </table>
          </div>
        </td></tr>
        <tr><td style="padding:14px 24px;border-top:1px solid #d7ddd2;">
          <p style="margin:0;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#8a93a3;">Internal lead · not sent to customer</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

  return { text, html, name };
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/**
 * Lead scrape ONLY to sales@ (QUOTE_NOTIFY_EMAIL).
 * Never emails the person who filled out the form.
 */
export async function sendQuoteNotification(payload: QuoteMailPayload) {
  const { transporter, fromName, fromEmail, smtpUser } = createTransporter();
  const { text, html, name } = buildQuoteBodies(payload);
  const recipients = notifyRecipients();
  const typeLabel = propertyLabel(payload.propertyType);
  const subject = `NEW LEAD · ${typeLabel}: ${name}${
    payload.city ? ` · ${payload.city}` : ""
  }`;

  if (!recipients.length) {
    throw new Error("QUOTE_NOTIFY_EMAIL is empty");
  }

  // Hard guard: never send to the form submitter.
  const leadEmail = payload.email.trim().toLowerCase();
  const to = recipients.filter((addr) => addr !== leadEmail);
  if (!to.length) {
    throw new Error("Lead notify list only contained the customer email");
  }

  const info = await transporter.sendMail({
    from: `"${fromName}" <${fromEmail}>`,
    sender: smtpUser,
    envelope: {
      from: smtpUser,
      to,
    },
    to,
    // Lead contact is in the body. Skip Reply-To to avoid PrivateMail relay quirks.
    subject,
    text,
    html,
    headers: {
      "X-CleanFreaks-Lead": "quote",
      "X-Auto-Response-Suppress": "All",
    },
  });

  console.info("[mail] lead sent to", to, info.messageId, info.response);
  return info;
}
