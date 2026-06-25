## Problem

The WhatsApp links currently point to `https://web.whatsapp.com/send?phone=2348114018598`. That URL is the WhatsApp **Web** desktop client, so on mobile it shows the "Use WhatsApp Web from a computer" dead-end page instead of opening the chat in the WhatsApp app.

We switched to `web.whatsapp.com` earlier to work around an `ERR_BLOCKED_BY_RESPONSE` from `api.whatsapp.com`. That redirect block was caused by the `+` sign we had in the `wa.me` path (`wa.me/+234…`). The correct format is `wa.me/2348114018598` (no `+`, no spaces) — this is WhatsApp's official click-to-chat URL and it:

- on mobile → opens the WhatsApp app directly to the chat with that number
- on desktop → opens WhatsApp Web / Desktop client to that chat
- does not route through `api.whatsapp.com`, so it won't hit the earlier block

## Change

Replace every WhatsApp link across the site:

From:
```
https://web.whatsapp.com/send?phone=2348114018598
```

To:
```
https://wa.me/2348114018598?text=Hello%20Ardent%2C%20I%27d%20like%20to%20learn%20more%20about%20your%20services.
```

(Prefilled message matches the existing one. The `text` param is optional — drop it if you'd rather not prefill.)

Files to update:
- `src/components/site/WhatsAppFloat.tsx` (floating button)
- `src/components/site/Footer.tsx` (footer "WhatsApp" link)
- `src/routes/contact.tsx` (contact page WhatsApp CTA)

Phone-number display text (`+234 811 401 8598`) and `tel:+2348114018598` links stay unchanged.

## Verification

After the change I'll grep the codebase to confirm no `web.whatsapp.com` or `wa.me/+234` strings remain, then ask you to tap the button on your phone — it should jump straight into the WhatsApp app with the Ardent chat open.
