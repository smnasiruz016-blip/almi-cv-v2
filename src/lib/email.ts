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
