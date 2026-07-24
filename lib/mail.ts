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

  const rowBorder = "border-bottom:1px solid #e4e8df;";
  const labelCell = `padding:10px 0;color:#5a6570;width:140px;vertical-align:top;${rowBorder}`;
  const valueCell = `padding:10px 0;vertical-align:top;${rowBorder}`;

  const detailRows = detailLines.length
    ? detailLines
        .map((line, i) => {
          const idx = line.indexOf(": ");
          const label = idx >= 0 ? line.slice(0, idx) : "Detail";
          const value = idx >= 0 ? line.slice(idx + 2) : line;
          const last = i === detailLines.length - 1;
          const lb = last ? labelCell.replace(rowBorder, "border-bottom:none;") : labelCell;
          const vb = last ? valueCell.replace(rowBorder, "border-bottom:none;") : valueCell;
          return `<tr><td style="${lb}">${escapeHtml(label)}</td><td style="${vb}">${escapeHtml(value)}</td></tr>`;
        })
        .join("")
    : `<tr><td colspan="2" style="padding:10px 0;">${escapeHtml(payload.message || "n/a")}</td></tr>`;

  const summaryRows = [
    [
      "Phone",
      `<a href="tel:${escapeHtml(payload.phone)}" style="color:#0b0d0c;text-decoration:none;">${escapeHtml(payload.phone)}</a>`,
    ],
    [
      "Email",
      `<a href="mailto:${escapeHtml(payload.email)}" style="color:#0b0d0c;text-decoration:none;">${escapeHtml(payload.email)}</a>`,
    ],
    ["Property", escapeHtml(propertyType)],
    ["Location", escapeHtml(locationLine || city)],
  ]
    .map(([label, value], i, arr) => {
      const last = i === arr.length - 1;
      const lb = last ? labelCell.replace(rowBorder, "border-bottom:none;") : labelCell;
      const vb = last ? valueCell.replace(rowBorder, "border-bottom:none;") : valueCell;
      return `<tr><td style="${lb}">${label}</td><td style="${vb}">${value}</td></tr>`;
    })
    .join("");

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
          <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;line-height:1.55;margin-bottom:8px;">
            ${summaryRows}
          </table>
          <div style="margin-top:16px;padding-top:16px;border-top:1px solid #d7ddd2;">
            <div style="font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#5a6570;font-weight:700;margin-bottom:10px;">Assessment</div>
            <table width="100%" cellpadding="0" cellspacing="0" style="font-size:14px;line-height:1.55;">
              ${detailRows}
            </table>
          </div>
        </td></tr>
        <tr><td style="padding:14px 24px;border-top:1px solid #d7ddd2;">
          <p style="margin:0;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#8a93a3;">Internal lead · cleanfreaksdfw.com</p>
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
 * Lead scrape to sales@ (QUOTE_NOTIFY_EMAIL).
 * Never uses the form submitter as the To address.
 */
export async function sendQuoteNotification(
  payload: QuoteMailPayload,
  mail = createTransporter(),
) {
  const { transporter, fromName, fromEmail, smtpUser } = mail;
  const { text, html } = buildQuoteBodies(payload);
  const recipients = notifyRecipients();
  const typeLabel = propertyLabel(payload.propertyType);
  const name = `${payload.firstName} ${payload.lastName}`.trim();
  const subject = `NEW LEAD · ${typeLabel}: ${name}${
    payload.city ? ` · ${payload.city}` : ""
  }`;

  if (!recipients.length) {
    throw new Error("QUOTE_NOTIFY_EMAIL is empty");
  }

  // Hard guard: never send the lead email to the form submitter.
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
    subject,
    text,
    html,
    priority: "high",
    headers: {
      "X-CleanFreaks-Lead": "quote",
      "X-Auto-Response-Suppress": "All",
      Importance: "high",
      "X-Priority": "1",
      "X-MSMail-Priority": "High",
    },
  });

  console.info("[mail] lead sent to", to, info.messageId, info.response);
  return info;
}

/** Short confirmation to the person who submitted the form. */
export async function sendQuoteConfirmation(
  payload: QuoteMailPayload,
  mail = createTransporter(),
) {
  const { transporter, fromName, fromEmail, smtpUser } = mail;
  const greeting = payload.firstName.trim() || "there";
  const to = payload.email.trim();

  const text = [
    `Hi ${greeting},`,
    "",
    "We have your Clean Freaks DFW quote request and will be in touch shortly.",
    "",
    "A little obsessed. Extremely thorough.",
    "",
    "Clean Freaks DFW",
    "cleanfreaksdfw.com",
  ].join("\n");

  const html = `<!DOCTYPE html>
<html><body style="margin:0;padding:0;background:#f5f7f2;font-family:Arial,Helvetica,sans-serif;color:#0b0d0c;">
  <table width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px;background:#f5f7f2;">
    <tr><td align="center">
      <table width="100%" style="max-width:520px;background:#ffffff;border:2px solid #0b0d0c;" cellpadding="0" cellspacing="0">
        <tr><td style="padding:22px 24px;background:#0b0d0c;color:#c8f000;">
          <div style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;font-weight:700;">Clean Freaks DFW</div>
        </td></tr>
        <tr><td style="padding:28px 24px;">
          <h1 style="margin:0 0 12px;font-size:22px;line-height:1.25;">We have your request.</h1>
          <p style="margin:0 0 14px;font-size:15px;line-height:1.55;">Hi ${escapeHtml(greeting)}, thanks for reaching out. We received your quote details and will be in touch shortly.</p>
          <p style="margin:0;font-size:14px;line-height:1.55;color:#5a6570;">A little obsessed. Extremely thorough.</p>
        </td></tr>
        <tr><td style="padding:14px 24px;border-top:1px solid #d7ddd2;">
          <p style="margin:0;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#8a93a3;">cleanfreaksdfw.com</p>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

  const info = await transporter.sendMail({
    from: `"${fromName}" <${fromEmail}>`,
    sender: smtpUser,
    envelope: {
      from: smtpUser,
      to: [to],
    },
    to,
    subject: "We have your Clean Freaks DFW quote request",
    text,
    html,
  });

  console.info("[mail] confirmation sent to", to, info.messageId);
  return info;
}

export function isSmtpRateLimited(err: unknown): boolean {
  const msg =
    err instanceof Error
      ? err.message
      : typeof err === "object" && err && "response" in err
        ? String((err as { response?: string }).response || "")
        : String(err);
  return /too many messages|rate.?limit|554 5\.7\.1/i.test(msg);
}

/**
 * Lead first (required), then customer confirmation (best-effort).
 * PrivateMail caps outbound volume per hour; confirmation may be skipped when capped.
 */
export async function sendQuoteEmails(payload: QuoteMailPayload) {
  const mail = createTransporter();
  await sendQuoteNotification(payload, mail);

  let confirmationSent = false;
  try {
    await sendQuoteConfirmation(payload, mail);
    confirmationSent = true;
  } catch (err) {
    if (isSmtpRateLimited(err)) {
      console.warn(
        "[mail] confirmation skipped: PrivateMail hourly send limit. Lead was still delivered.",
      );
    } else {
      console.warn("[mail] confirmation failed:", err);
    }
  }

  try {
    mail.transporter.close();
  } catch {
    // ignore
  }

  return { confirmationSent };
}
