import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";


const inquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(200),
  phone: z.string().trim().min(6, "Please enter a valid phone number").max(50),
  email: z
    .string()
    .trim()
    .email("Invalid email address")
    .max(255)
    .optional()
    .or(z.literal("").transform(() => undefined)),
  inquiry_type: z.string().trim().max(100).optional(),
  message: z.string().trim().max(2000).optional(),
});

export type InquiryInput = z.infer<typeof inquirySchema>;

const INTERNAL_RECIPIENT = "info@ardentlivinglagos.com";
// Use real verified mailboxes on the verified ardentlivinglagos.com domain.
// Notification is sent from admin@ to info@ to avoid same-address loops; the
// inquirer's confirmation comes from info@ so replies land in the main inbox.
const FROM_NOTIFICATION = "Ardent Inquiries <admin@ardentlivinglagos.com>";
const FROM_CONFIRMATION = "Ardent Senior Living <info@ardentlivinglagos.com>";

function esc(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function nl2br(s: string): string {
  return esc(s).replace(/\n/g, "<br />");
}

function notificationHtml(d: {
  name: string;
  phone: string;
  email?: string;
  inquiry_type?: string;
  message?: string;
  submittedAt: string;
}): string {
  const row = (label: string, value: string) => `
    <tr>
      <td style="padding:10px 16px;border-bottom:1px solid #eee;font-size:12px;letter-spacing:0.15em;text-transform:uppercase;color:#0F172A99;width:160px;vertical-align:top;font-family:Arial,Helvetica,sans-serif;">${esc(label)}</td>
      <td style="padding:10px 16px;border-bottom:1px solid #eee;font-size:15px;color:#0F172A;font-family:Arial,Helvetica,sans-serif;">${value}</td>
    </tr>`;
  return `<!doctype html><html><body style="margin:0;padding:0;background:#F5F5F4;">
  <div style="max-width:640px;margin:0 auto;padding:32px 16px;">
    <div style="background:#ffffff;border:1px solid #e5e5e5;">
      <div style="padding:28px 32px 0 32px;font-family:Arial,Helvetica,sans-serif;">
        <p style="margin:0 0 8px 0;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:#C5A059;font-weight:bold;">New Inquiry</p>
        <h1 style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:26px;color:#0F172A;font-weight:normal;">${esc(d.name)}</h1>
        <div style="height:2px;width:48px;background:#C5A059;margin:14px 0 20px 0;"></div>
      </div>
      <table role="presentation" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:collapse;">
        ${row("Inquiry Type", esc(d.inquiry_type || "—"))}
        ${row("Phone", `<a href="tel:${esc(d.phone)}" style="color:#0F172A;text-decoration:none;">${esc(d.phone)}</a>`)}
        ${row("Email", d.email ? `<a href="mailto:${esc(d.email)}" style="color:#0F172A;">${esc(d.email)}</a>` : "—")}
        ${row("Submitted", esc(d.submittedAt))}
        ${row("Message", d.message ? nl2br(d.message) : "<em style=\"color:#999;\">No message provided</em>")}
      </table>
      <div style="padding:24px 32px;font-family:Arial,Helvetica,sans-serif;font-size:12px;color:#0F172A99;">
        ${d.email ? `Reply directly to this email to respond to ${esc(d.name)}.` : `No email was provided — follow up by phone or WhatsApp.`}
      </div>
    </div>
    <p style="text-align:center;margin:18px 0 0 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#0F172A66;">Ardent Senior Living · Ikoyi, Lagos</p>
  </div></body></html>`;
}

function confirmationHtml(name: string): string {
  return `<!doctype html><html><body style="margin:0;padding:0;background:#F5F5F4;">
  <div style="max-width:600px;margin:0 auto;padding:32px 16px;">
    <div style="background:#ffffff;border:1px solid #e5e5e5;padding:40px 32px;font-family:Arial,Helvetica,sans-serif;color:#0F172A;">
      <p style="margin:0 0 10px 0;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;color:#C5A059;font-weight:bold;">Thank You</p>
      <h1 style="margin:0 0 14px 0;font-family:Georgia,'Times New Roman',serif;font-size:30px;font-weight:normal;line-height:1.2;">Dear ${esc(name)},</h1>
      <div style="height:2px;width:48px;background:#C5A059;margin:0 0 22px 0;"></div>
      <p style="margin:0 0 16px 0;font-size:16px;line-height:1.65;color:#334155;">Your inquiry has reached us, and we are grateful you considered Ardent Senior Living for your family.</p>
      <p style="margin:0 0 16px 0;font-size:16px;line-height:1.65;color:#334155;">A wellness advisor will personally reach out within one business day to understand your loved one's needs and walk you through next steps.</p>
      <p style="margin:0 0 28px 0;font-size:16px;line-height:1.65;color:#334155;">If your matter is urgent, please feel welcome to call or message us directly:</p>

      <table role="presentation" cellpadding="0" cellspacing="0" style="border-collapse:collapse;margin:0 0 28px 0;">
        <tr>
          <td style="padding:6px 0;font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:#0F172A99;width:110px;">Call</td>
          <td style="padding:6px 0;font-size:15px;"><a href="tel:+2348114018598" style="color:#0F172A;text-decoration:none;font-weight:bold;">+234 811 401 8598</a></td>
        </tr>
        <tr>
          <td style="padding:6px 0;font-size:11px;letter-spacing:0.25em;text-transform:uppercase;color:#0F172A99;">WhatsApp</td>
          <td style="padding:6px 0;font-size:15px;"><a href="https://wa.me/2348114018598" style="color:#0F172A;text-decoration:none;font-weight:bold;">Message us on WhatsApp</a></td>
        </tr>
      </table>

      <p style="margin:0;font-family:Georgia,'Times New Roman',serif;font-size:17px;color:#0F172A;">Warmly,</p>
      <p style="margin:4px 0 0 0;font-family:Georgia,'Times New Roman',serif;font-size:17px;color:#0F172A;">The Ardent Team</p>
    </div>
    <p style="text-align:center;margin:18px 0 0 0;font-family:Arial,Helvetica,sans-serif;font-size:11px;color:#0F172A66;">Ardent Senior Living · Ikoyi, Lagos, Nigeria<br/>This message was sent because you submitted an inquiry on ardentlivinglagos.com.</p>
  </div></body></html>`;
}

async function sendResend(
  label: string,
  payload: {
    from: string;
    to: string;
    subject: string;
    html: string;
    reply_to?: string;
  },
): Promise<{ ok: boolean; status?: number; body?: string; error?: string }> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.warn(`[submitInquiry:${label}] RESEND_API_KEY not configured`);
    return { ok: false, error: "RESEND_API_KEY not configured" };
  }
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify(payload),
    });
    const body = await res.text().catch(() => "");
    if (!res.ok) {
      console.error(`[submitInquiry:${label}] Resend ${res.status}: ${body}`);
      return { ok: false, status: res.status, body };
    }
    console.log(`[submitInquiry:${label}] sent to ${payload.to} → ${body}`);
    return { ok: true, status: res.status, body };
  } catch (err) {
    console.error(`[submitInquiry:${label}] threw`, err);
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}


export const submitInquiry = createServerFn({ method: "POST" })
  .validator((input: unknown) => inquirySchema.parse(input))
  .handler(async ({ data }) => {
    const requestId = `inq_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
    console.log(`[submitInquiry:${requestId}] received from ${data.name}`);

    const submittedAt = new Date().toLocaleString("en-NG", {
      timeZone: "Africa/Lagos",
      dateStyle: "full",
      timeStyle: "short",
    });

    // Notification to Zoho inbox — must succeed, otherwise the inquiry is lost.
    const notification = await sendResend(`${requestId}:notification`, {
      from: FROM_NOTIFICATION,
      to: INTERNAL_RECIPIENT,
      subject: `New inquiry · ${data.inquiry_type || "General"} · ${data.name}`,
      html: notificationHtml({
        name: data.name,
        phone: data.phone,
        email: data.email,
        inquiry_type: data.inquiry_type,
        message: data.message,
        submittedAt,
      }),
      ...(data.email ? { reply_to: data.email } : {}),
    });

    if (!notification.ok) {
      throw new Error(
        "We couldn't submit your inquiry right now. Please WhatsApp or call us at +234 811 401 8598.",
      );
    }

    // Confirmation to inquirer is best-effort.
    if (data.email) {
      await sendResend(`${requestId}:confirmation`, {
        from: FROM_CONFIRMATION,
        to: data.email,
        subject: "We've received your inquiry — Ardent Senior Living",
        html: confirmationHtml(data.name),
        reply_to: INTERNAL_RECIPIENT,
      });
    }

    return { ok: true as const, requestId };
  });

  });
