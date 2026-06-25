## Problem

Resend rejected the notification email with 403 `validation_error`:

> You can only send testing emails to your own email address (ardentlivinglagos@gmail.com). To send emails to other recipients, please verify a domain... and change the `from` address to an email using this domain.

The current notification uses `from: "Ardent Inquiries <onboarding@resend.dev>"`. `onboarding@resend.dev` is Resend's shared sandbox sender — when the API key it's sent with hasn't verified that exact address, Resend treats the send as a test and only allows the account owner's email as recipient. That's why `info@ardentlivinglagos.com` is blocked.

Your `ardentlivinglagos.com` domain **is** verified on this Resend account (the confirmation email to the inquirer, sent from `hello@ardentlivinglagos.com`, works fine). So the fix is to send the notification from the verified domain too.

The earlier reason I moved off the verified domain was a worry that Zoho would treat same-domain mail from Resend as spoofing and silently quarantine it. In practice, since your domain's SPF/DKIM are set up for Resend during verification, Zoho should accept it — the message is properly authenticated, not spoofed. If it does land in Spam on first delivery, marking it "Not Spam" once trains the filter.

## Fix

In `src/lib/inquiries.functions.ts`, change one constant:

```ts
// before
const FROM_NOTIFICATION = "Ardent Inquiries <onboarding@resend.dev>";
// after
const FROM_NOTIFICATION = "Ardent Inquiries <inquiries@ardentlivinglagos.com>";
```

Everything else stays the same:
- Notification `to`: `info@ardentlivinglagos.com`
- Notification `reply_to`: the inquirer's email (so replies from Zoho go straight to them)
- Confirmation email: unchanged (`hello@ardentlivinglagos.com` → inquirer)

## After deploying

1. Submit a test inquiry on `/contact` with a real email you can check.
2. Confirm the notification arrives in your Zoho `info@` inbox (check Spam once — if it's there, mark Not Spam).
3. Confirm the confirmation email arrives at the inquirer address.

If Zoho still quarantines it after this, the next move is a dedicated subdomain sender like `notify@mail.ardentlivinglagos.com` (separate DKIM, no overlap with your Zoho MX) — but try the simple fix first.

## Notes for later

- The Resend dashboard logs will now show notification sends under your domain, making delivery issues easier to diagnose.
- Optional Zoho filter: flag subjects starting with `New inquiry ·` so notifications land in a dedicated folder.
