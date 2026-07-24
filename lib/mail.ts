import nodemailer from "nodemailer";

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
      auth: { user, pass },
    }),
    fromName: process.env.SMTP_FROM_NAME?.trim() || "Clean Freaks DFW",
    fromEmail: process.env.SMTP_FROM_EMAIL?.trim() || user,
  };
}

export type QuoteMailPayload = {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  propertyType?: string;
  city?: string;
  message: string;
};

function buildQuoteBodies(payload: QuoteMailPayload) {
  const name = `${payload.firstName} ${payload.lastName}`.trim();
  const propertyType = payload.propertyType || "n/a";
  const city = payload.city || "n/a";

  const text = [
    "New quote request from Clean Freaks DFW",
    "",
    `Name: ${name}`,
    `Phone: ${payload.phone}`,
    `Email: ${payload.email}`,
    `Property type: ${propertyType}`,
    `City: ${city}`,
    "",
    "Message:",
    payload.message,
  ].join("\n");

  const html = `<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#f5f7f2;font-family:Arial,Helvetica,sans-serif;color:#0b0d0c;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;background:#f5f7f2;">
    <tr><td align="center">
      <table width="100%" style="max-width:560px;background:#ffffff;border:2px solid #0b0d0c;" cellpadding="0" cellspacing="0">
        <tr><td style="padding:22px 24px;background:#0b0d0c;color:#c8f000;">
          <div style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;font-weight:700;">Clean Freaks DFW</div>
          <div style="margin-top:8px;font-size:22px;font-weight:700;color:#ffffff;">New quote request</div>
        </td></tr>
        <tr><td style="padding:24px;">
          <p style="margin:0 0 16px;font-size:15px;line-height:1.5;"><strong>${escapeHtml(name)}</strong> wants a quote.</p>
          <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;line-height:1.6;">
            <tr><td style="padding:4px 0;color:#5a6570;width:120px;">Phone</td><td style="padding:4px 0;">${escapeHtml(payload.phone)}</td></tr>
            <tr><td style="padding:4px 0;color:#5a6570;">Email</td><td style="padding:4px 0;"><a href="mailto:${escapeHtml(payload.email)}" style="color:#0b0d0c;">${escapeHtml(payload.email)}</a></td></tr>
            <tr><td style="padding:4px 0;color:#5a6570;">Property</td><td style="padding:4px 0;">${escapeHtml(propertyType)}</td></tr>
            <tr><td style="padding:4px 0;color:#5a6570;">City</td><td style="padding:4px 0;">${escapeHtml(city)}</td></tr>
          </table>
          <div style="margin-top:20px;padding:16px;background:#f5f7f2;border:1px solid #d7ddd2;font-size:14px;line-height:1.55;white-space:pre-wrap;">${escapeHtml(payload.message)}</div>
        </td></tr>
        <tr><td style="padding:14px 24px;border-top:1px solid #d7ddd2;">
          <p style="margin:0;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#8a93a3;">cleanfreaksdfw.com</p>
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

/** Notify the business inbox about a new quote. */
export async function sendQuoteNotification(payload: QuoteMailPayload) {
  const { transporter, fromName, fromEmail } = createTransporter();
  const { text, html, name } = buildQuoteBodies(payload);
  const to =
    process.env.QUOTE_NOTIFY_EMAIL?.trim() ||
    process.env.SMTP_FROM_EMAIL?.trim() ||
    process.env.SMTP_USER!.trim();

  await transporter.sendMail({
    from: `"${fromName}" <${fromEmail}>`,
    to,
    replyTo: `"${name}" <${payload.email}>`,
    subject: `Quote request: ${name}${payload.city ? ` · ${payload.city}` : ""}`,
    text,
    html,
  });
}

/** Optional confirmation to the person who submitted the form. */
export async function sendQuoteConfirmation(payload: QuoteMailPayload) {
  const { transporter, fromName, fromEmail } = createTransporter();
  const greeting = payload.firstName.trim() || "there";

  await transporter.sendMail({
    from: `"${fromName}" <${fromEmail}>`,
    to: payload.email,
    subject: "We got your Clean Freaks DFW quote request",
    text: `Hi ${greeting},\n\nThanks for reaching out to Clean Freaks DFW. We got your details and will follow up soon.\n\nA little obsessed. Extremely thorough.\n`,
    html: `<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#f5f7f2;font-family:Arial,Helvetica,sans-serif;color:#0b0d0c;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;">
    <tr><td align="center">
      <table width="100%" style="max-width:520px;background:#ffffff;border:2px solid #0b0d0c;" cellpadding="0" cellspacing="0">
        <tr><td style="padding:22px 24px;background:#0b0d0c;color:#c8f000;">
          <div style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;font-weight:700;">Clean Freaks DFW</div>
        </td></tr>
        <tr><td style="padding:24px;">
          <h1 style="margin:0 0 12px;font-size:22px;">We got it.</h1>
          <p style="margin:0;font-size:15px;line-height:1.55;">Hi ${escapeHtml(greeting)}, thanks for reaching out. We will follow up soon about your clean.</p>
          <p style="margin:20px 0 0;font-size:13px;color:#5a6570;">A little obsessed. Extremely thorough.</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`,
  });
}
