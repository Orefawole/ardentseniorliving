## Goal

Make the inquiry form work on the live site without depending on the database. Each submission goes directly to `info@ardentlivinglagos.com` (and a confirmation to the inquirer) through Resend. The "Missing SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY" error disappears because no Supabase client is created at all.

## Why the live error happens

The current `submitInquiry` server function builds a Supabase client from `process.env.SUPABASE_URL` + `SUPABASE_PUBLISHABLE_KEY`. On the published Lovable deployment those server-side env vars aren't injected the way the dev sandbox provides them, so the client constructor throws the "Missing Supabase environment variable(s)" error before anything else runs — even though we're only inserting a row. Removing the Supabase call removes the failure mode entirely.

## Changes

**1. `src/lib/inquiries.functions.ts`** — strip out Supabase, keep Resend.
- Remove the `createClient` import, the `supabasePublic` creation, and the `.from("inquiries").insert(...)` block.
- Keep validation, both Resend sends (notification + confirmation), HTML templates, and the `Promise.allSettled` error handling.
- If `RESEND_API_KEY` is missing OR the notification send fails, throw a user-facing error so the form shows a real failure instead of a silent success. The confirmation email staying best-effort is fine.
- Log a stable request ID per submission to make Resend dashboard lookups easier.

**2. No frontend changes.** `InquiryForm.tsx` already calls `submitInquiry` and handles success/error states correctly.

**3. Leave the `inquiries` table in place.** It's harmless, no longer written to, and removing it is a separate decision. (Mention to user; they can ask for a follow-up migration to drop it if they want.)

## What stays the same

- Sender: `Ardent Inquiries <admin@ardentlivinglagos.com>` → `info@ardentlivinglagos.com`, with `reply_to` set to the inquirer so Zoho replies go straight to them.
- Confirmation: `info@ardentlivinglagos.com` → inquirer.
- All copy, branding, and the WhatsApp / phone fallbacks in the templates.

## Verification after build mode

1. Submit a test inquiry on `/contact` with a real email.
2. Confirm the notification lands in Zoho `info@` (check Spam once if first delivery).
3. Confirm the confirmation arrives at the inquirer.
4. Confirm the form no longer shows the Supabase env-var error.

## Trade-off to flag

Without the DB row, submissions exist only as emails. If a Resend send ever fails silently or an email is deleted, there's no second copy. If you want a safety net later, the cleanest option is a tiny Resend-only audit log (e.g. append to a Google Sheet via a connector, or re-enable the DB insert once Cloud envs are sorted) — not required for this fix.
