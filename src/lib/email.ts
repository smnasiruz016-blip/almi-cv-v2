import { Resend } from "resend";

let cachedClient: Resend | null = null;

function getResendClient(): Resend {
  if (cachedClient) return cachedClient;
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    throw new Error("RESEND_API_KEY is not configured");
  }
  cachedClient = new Resend(key);
  return cachedClient;
}

function getFromAddress(): string {
  const addr = process.env.EMAIL_FROM;
  if (!addr) {
    throw new Error("EMAIL_FROM is not configured");
  }
  return `AlmiCV <${addr}>`;
}

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function renderPasswordResetHtml(resetUrl: string): string {
  const safeUrl = escapeHtml(resetUrl);
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Reset your AlmiCV password</title>
  </head>
  <body style="margin:0;padding:24px 12px;background-color:#FFFBF5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,sans-serif;color:#2D1B3D;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#FFFBF5;">
      <tr>
        <td align="center">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:560px;background-color:#ffffff;border-radius:8px;padding:32px;">
            <tr>
              <td style="font-size:16px;line-height:1.6;color:#2D1B3D;">
                <p style="margin:0 0 16px 0;">Assalam o alaikum,</p>
                <p style="margin:0 0 16px 0;">Someone (hopefully you) requested a password reset for your AlmiCV account.</p>
                <p style="margin:0 0 8px 0;">To set a new password, click the button below:</p>
                <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:24px 0;">
                  <tr>
                    <td align="center">
                      <a href="${safeUrl}" style="display:inline-block;background-color:#FF7A6B;color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:8px;font-size:16px;font-weight:600;">Reset my password</a>
                    </td>
                  </tr>
                </table>
                <p style="margin:0 0 8px 0;font-size:14px;color:#6B5B7A;">Or copy and paste this link:</p>
                <p style="margin:0 0 16px 0;font-size:14px;color:#6B5B7A;word-break:break-all;"><a href="${safeUrl}" style="color:#6B5B7A;">${safeUrl}</a></p>
                <p style="margin:0 0 16px 0;">This link will expire in 1 hour and can only be used once.</p>
                <p style="margin:0 0 24px 0;">If you didn't request this, you can safely ignore this email — your password won't change.</p>
                <p style="margin:0;color:#6B5B7A;font-size:14px;">— AlmiCV<br /><a href="https://almicv.almiworld.com" style="color:#6B5B7A;">https://almicv.almiworld.com</a></p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function renderPasswordResetText(resetUrl: string): string {
  return `Assalam o alaikum,

Someone (hopefully you) requested a password reset for your AlmiCV account.

To set a new password, click this link:
${resetUrl}

This link will expire in 1 hour and can only be used once.

If you didn't request this, you can safely ignore this email — your password won't change.

— AlmiCV
https://almicv.almiworld.com
`;
}

export async function sendPasswordResetEmail(input: {
  to: string;
  resetUrl: string;
}): Promise<void> {
  const client = getResendClient();
  const result = await client.emails.send({
    from: getFromAddress(),
    to: input.to,
    subject: "Reset your AlmiCV password",
    html: renderPasswordResetHtml(input.resetUrl),
    text: renderPasswordResetText(input.resetUrl),
  });
  if (result.error) {
    throw new Error(`Resend send failed: ${result.error.message}`);
  }
}

// ===================== Shared shell for the newer emails =====================
// (The password-reset renderer above predates this and stays inline.)

const SITE_URL = "https://almicv.almiworld.com";

function shell(title: string, bodyInner: string): string {
  return `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>${escapeHtml(title)}</title>
  </head>
  <body style="margin:0;padding:24px 12px;background-color:#FFFBF5;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen,Ubuntu,sans-serif;color:#2D1B3D;">
    <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="background-color:#FFFBF5;">
      <tr>
        <td align="center">
          <table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="max-width:560px;background-color:#ffffff;border-radius:8px;padding:32px;">
            <tr>
              <td style="font-size:16px;line-height:1.6;color:#2D1B3D;">
                ${bodyInner}
                <p style="margin:24px 0 0 0;color:#6B5B7A;font-size:14px;">— AlmiCV<br /><a href="${SITE_URL}" style="color:#6B5B7A;">${SITE_URL}</a></p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function ctaButton(href: string, label: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" width="100%" style="margin:24px 0;">
    <tr>
      <td align="center">
        <a href="${href}" style="display:inline-block;background-color:#FF7A6B;color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:8px;font-size:16px;font-weight:600;">${label}</a>
      </td>
    </tr>
  </table>`;
}

function greeting(name: string | null | undefined): string {
  const trimmed = name?.trim();
  return trimmed ? `Assalam o alaikum ${escapeHtml(trimmed)},` : "Assalam o alaikum,";
}

// ===================== Welcome (sent once, on signup) =====================

function renderWelcomeHtml(name: string | null | undefined): string {
  const dashboardUrl = `${SITE_URL}/dashboard`;
  return shell(
    "Welcome to AlmiCV",
    `
    <p style="margin:0 0 16px 0;">${greeting(name)}</p>
    <p style="margin:0 0 16px 0;">Your AlmiCV account is ready.</p>
    <p style="margin:0 0 8px 0;">You can start building your CV right away — pick a template, add your details, and download it. Nothing is auto-filled or invented; the CV shows exactly what you enter.</p>
    ${ctaButton(dashboardUrl, "Build my CV")}
    <p style="margin:0 0 8px 0;font-size:14px;color:#6B5B7A;">Or open <a href="${dashboardUrl}" style="color:#6B5B7A;">${dashboardUrl}</a></p>
    <p style="margin:0;">If you have any question, just reply to this email.</p>
  `,
  );
}

function renderWelcomeText(name: string | null | undefined): string {
  const g = name?.trim() ? `Assalam o alaikum ${name.trim()},` : "Assalam o alaikum,";
  return `${g}

Your AlmiCV account is ready.

You can start building your CV right away — pick a template, add your details, and download it. Nothing is auto-filled or invented; the CV shows exactly what you enter.

Build my CV: ${SITE_URL}/dashboard

If you have any question, just reply to this email.

— AlmiCV
${SITE_URL}
`;
}

export async function sendWelcomeEmail(input: {
  to: string;
  name?: string | null;
}): Promise<void> {
  const client = getResendClient();
  const result = await client.emails.send({
    from: getFromAddress(),
    to: input.to,
    subject: "Welcome to AlmiCV",
    html: renderWelcomeHtml(input.name),
    text: renderWelcomeText(input.name),
  });
  if (result.error) {
    throw new Error(`Resend send failed: ${result.error.message}`);
  }
}

// ===================== Subscription confirmation =====================

// Deliberately does NOT restate amounts or act as a receipt — Stripe sends the
// official receipt. This email confirms Pro access and is honest about a trial.
function formatDateUTC(d: Date | null | undefined): string | null {
  if (!d) return null;
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}

function renderSubscriptionHtml(input: {
  name?: string | null;
  isTrial: boolean;
  trialEnd?: Date | null;
  planLabel?: string | null;
}): string {
  const dashboardUrl = `${SITE_URL}/dashboard`;
  const accountUrl = `${SITE_URL}/account`;
  const plan = input.planLabel?.trim()
    ? escapeHtml(input.planLabel.trim())
    : "AlmiCV Pro";
  const trialEndStr = formatDateUTC(input.trialEnd);

  const statusBlock = input.isTrial
    ? `<p style="margin:0 0 16px 0;">Your free trial of ${plan} has started, and you now have full access to every Pro feature.</p>
       ${
         trialEndStr
           ? `<p style="margin:0 0 16px 0;">You will not be charged until <strong>${trialEndStr}</strong>. If AlmiCV Pro isn't right for you, cancel any time before then from your account and you won't pay anything.</p>`
           : `<p style="margin:0 0 16px 0;">You can cancel any time before your trial ends from your account, and you won't be charged.</p>`
       }`
    : `<p style="margin:0 0 16px 0;">Your ${plan} subscription is active, and you now have full access to every Pro feature.</p>`;

  return shell(
    input.isTrial ? "Your AlmiCV trial has started" : "Your AlmiCV Pro is active",
    `
    <p style="margin:0 0 16px 0;">${greeting(input.name)}</p>
    ${statusBlock}
    ${ctaButton(dashboardUrl, "Go to my dashboard")}
    <p style="margin:0 0 8px 0;font-size:14px;color:#6B5B7A;">You can view or manage your subscription any time at <a href="${accountUrl}" style="color:#6B5B7A;">${accountUrl}</a></p>
    <p style="margin:0;">Questions? Just reply to this email.</p>
  `,
  );
}

function renderSubscriptionText(input: {
  name?: string | null;
  isTrial: boolean;
  trialEnd?: Date | null;
  planLabel?: string | null;
}): string {
  const g = input.name?.trim()
    ? `Assalam o alaikum ${input.name.trim()},`
    : "Assalam o alaikum,";
  const plan = input.planLabel?.trim() || "AlmiCV Pro";
  const trialEndStr = formatDateUTC(input.trialEnd);
  const statusBlock = input.isTrial
    ? `Your free trial of ${plan} has started, and you now have full access to every Pro feature.\n\n${
        trialEndStr
          ? `You will not be charged until ${trialEndStr}. If AlmiCV Pro isn't right for you, cancel any time before then from your account and you won't pay anything.`
          : `You can cancel any time before your trial ends from your account, and you won't be charged.`
      }`
    : `Your ${plan} subscription is active, and you now have full access to every Pro feature.`;

  return `${g}

${statusBlock}

Go to my dashboard: ${SITE_URL}/dashboard
Manage your subscription: ${SITE_URL}/account

Questions? Just reply to this email.

— AlmiCV
${SITE_URL}
`;
}

export async function sendSubscriptionConfirmationEmail(input: {
  to: string;
  name?: string | null;
  isTrial: boolean;
  trialEnd?: Date | null;
  planLabel?: string | null;
}): Promise<void> {
  const client = getResendClient();
  const result = await client.emails.send({
    from: getFromAddress(),
    to: input.to,
    subject: input.isTrial
      ? "Your AlmiCV trial has started"
      : "Your AlmiCV Pro subscription is active",
    html: renderSubscriptionHtml(input),
    text: renderSubscriptionText(input),
  });
  if (result.error) {
    throw new Error(`Resend send failed: ${result.error.message}`);
  }
}
