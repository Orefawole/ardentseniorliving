## Cause

The WhatsApp links currently use `https://wa.me/+2348114018598`. WhatsApp web redirect handling does not reliably support the `+` sign in `wa.me` paths, and the blocked page shows the browser ultimately tried to open `api.whatsapp.com`, which is being refused/blocked in that flow.

For WhatsApp click-to-chat links, the correct format is the international number without punctuation in the URL path: `https://wa.me/2348114018598`. The visible phone number can and should remain `+234 811 401 8598`.

## Fix

1. Update every WhatsApp click link from:
   - `https://wa.me/+2348114018598`

   to:
   - `https://wa.me/2348114018598`

2. Keep all displayed phone text and telephone links as:
   - Display: `+234 811 401 8598`
   - Phone call link: `tel:+2348114018598`

3. Apply this only to the WhatsApp URL locations:
   - Floating WhatsApp button
   - Footer WhatsApp link
   - Contact page WhatsApp link

4. Verify with a code search that no WhatsApp URL still contains `wa.me/+234` or `api.whatsapp.com`.