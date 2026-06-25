## Goal

When someone submits the inquiry form on `/contact`:
1. Save it to the database (already works).
2. Email **info@ardentlivinglagos.com** (your Zoho inbox) with the inquiry details.
3. Send the inquirer a branded confirmation email.

Both emails sent via Resend using your verified `ardentlivinglagos.com` domain.

## What I'll build

1. **Store the Resend API key** as `RESEND_API_KEY` (the value you shared). It lives only as a server secret, not in code.

2. **Update `src/lib/inquiries.functions.ts`**:
   - After the DB insert succeeds, fire two Resend API calls in parallel (`Promise.allSettled`) via native `fetch` to `https://api.resend.com/emails`.
   - Email failures are logged but do NOT fail the submission — the user still sees the success screen and the row is still saved.
   - API key read inside the handler via `process.env.RESEND_API_KEY`.

3. **Two inline HTML email templates** (brand-aligned: navy heading, gold accent rule, serif title, system body font; values HTML-escaped):

   **Internal notification → `info@ardentlivinglagos.com`**
   - From: `Ardent Inquiries <inquiries@ardentlivinglagos.com>`
   - Reply-To: inquirer's email (so you can reply directly from Zoho); omitted if they didn't provide one
   - Subject: `New inquiry · {Inquiry Type} · {Name}`
   - Body: name, phone, email, inquiry type, message, submission timestamp (Africa/Lagos)

   **Confirmation → inquirer's email** (only if they provided one)
   - From: `Ardent Senior Living <hello@ardentlivinglagos.com>`
   - Reply-To: `info@ardentlivinglagos.com`
   - Subject: `We've received your inquiry — Ardent Senior Living`
   - Body: warm thank-you, "we respond within one business day", WhatsApp + phone (+234 811 401 8598), signed "The Ardent Team"

4. **No changes** to the form UI, validation, success state, or Supabase table.

## Notes for later

- Optional Zoho filter: flag subjects starting with `New inquiry ·` for easy triage.
- If you'd rather use different From local-parts (e.g. `noreply@`, `care@`), tell me and I'll swap them.
