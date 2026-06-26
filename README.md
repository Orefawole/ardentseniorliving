# Ardent Senior Living — Project Documentation

Premium, trust-focused marketing website for **Ardent Senior Living**, an elderly
wellness and adult day center in Ikoyi, Lagos, targeting Nigeria-based and
diaspora families.

- **Live site:** https://www.ardentlivinglagos.com
- **Lovable preview:** https://ardentseniorliving.lovable.app
- **Design direction:** Stately heritage luxe (navy `#0F172A`, gold `#C5A059`, stone `#F5F5F4`, Playfair Display + Inter)

---

## 1. Tech Stack

| Layer | Choice |
| --- | --- |
| Framework | TanStack Start v1 (React 19, file-based routing) |
| Build tool | Vite 7 |
| Styling | Tailwind CSS v4 (via `src/styles.css`, Lightning CSS) |
| UI primitives | shadcn/ui (Radix) |
| Server functions | `createServerFn` from `@tanstack/react-start` |
| Email | Resend HTTP API (called directly via `fetch`) |
| Inbox | Zoho Mail on `ardentlivinglagos.com` |
| Hosting | Vercel (production) + Lovable preview |
| Source of truth | GitHub (bidirectional sync with Lovable) |

The project initially used Lovable Cloud (Supabase) for inquiry storage, then
moved to **email-only** delivery to remove the runtime dependency on Supabase
env vars on Vercel. The Supabase client files remain in the repo (auto-generated)
but are no longer imported by app code.

---

## 2. Repository Layout

```
src/
├── routes/                    # File-based routes (TanStack Start)
│   ├── __root.tsx             # App shell, head metadata, JSON-LD
│   ├── index.tsx              # Home
│   ├── about.tsx
│   ├── services.tsx
│   ├── how-it-works.tsx
│   ├── contact.tsx
│   └── sitemap[.]xml.ts
├── components/site/           # Header, Footer, WhatsAppFloat, InquiryForm, SectionHeader
├── components/ui/             # shadcn primitives
├── lib/
│   └── inquiries.functions.ts # Server function — Resend email delivery
├── integrations/supabase/     # Auto-generated; unused by app code
├── assets/                    # Generated imagery
├── styles.css                 # Tailwind v4 entry + design tokens
├── router.tsx
├── start.ts
└── server.ts
vercel.json                    # Vercel build configuration
.nvmrc                         # Node 20
```

---

## 3. Local Workflow

### Editing in Lovable
1. Open the project in Lovable.
2. Make changes via chat. Lovable commits to the connected GitHub repo automatically.
3. The Lovable preview at `ardentseniorliving.lovable.app` updates within seconds.

### Editing locally
1. `git clone` the repo.
2. `bun install`.
3. `bun run dev` (Vite on `http://localhost:8080`).
4. Push to `main` → GitHub → Lovable picks up changes within seconds → Vercel auto-deploys.

### Bidirectional sync
- Changes made in Lovable → pushed to GitHub automatically.
- Changes pushed to GitHub → reflected in Lovable automatically.
- **Never** run stateful git commands from inside Lovable; the agent's git state is managed for you.

---

## 4. Deployment Workflow (Vercel)

The site is hosted on Vercel and connected to the GitHub repo.

### Vercel project settings
- **Framework preset:** *None* (TanStack's Vercel preset is bypassed — see `vercel.json`)
- **Install command:** `bun install`
- **Build command:** `vite build`
- **Output directory:** `dist`
- **Node version:** 20 (from `.nvmrc`)

### `vercel.json`
```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "installCommand": "bun install",
  "buildCommand": "vite build",
  "framework": null
}
```

### Environment variables (Vercel → Settings → Environment Variables)
| Name | Used by | Required |
| --- | --- | --- |
| `RESEND_API_KEY` | `src/lib/inquiries.functions.ts` | Yes |

> Lovable Cloud / Supabase env vars are **not** required on Vercel — the app has been migrated off Supabase for the inquiry flow.

### Redeploying after env-var or code changes
1. Push to `main` (or trigger from Vercel UI: *Deployments → Redeploy*).
2. **Uncheck "Use existing Build Cache"** when redeploying after a code or env change — stale server bundles caused the long-running Supabase error.
3. After deploy, submit the inquiry form on the live site once and check the Vercel function logs for the build marker:
   ```
   [submitInquiry] build=v2-resend-only (no supabase)
   ```
   If you see it, the new bundle is live. If you still see `Missing Supabase environment variable(s)…`, the deploy didn't pick up the latest commit — recheck the Git source and redeploy without cache.

---

## 5. Inquiry Form → Email Pipeline

`src/components/site/InquiryForm.tsx` is a controlled form that calls the
`submitInquiry` server function. The server function calls Resend's HTTP API
directly — there is **no database write**.

### Flow
```
User submits form
   │
   ▼
useServerFn(submitInquiry)   ← TanStack server-function RPC
   │
   ▼
Zod validation (name, phone required; email/type/message optional)
   │
   ▼
fetch POST https://api.resend.com/emails
   │
   ├──► Notification email
   │      from: Ardent Inquiries <admin@ardentlivinglagos.com>
   │      to:   info@ardentlivinglagos.com   (Zoho inbox)
   │      reply_to: <inquirer's email>       (so staff reply directly from Zoho)
   │
   └──► Confirmation email (best-effort, only if inquirer provided email)
          from: Ardent Senior Living <info@ardentlivinglagos.com>
          to:   <inquirer's email>
          reply_to: info@ardentlivinglagos.com
```

### Why two `from` addresses?
- `admin@ardentlivinglagos.com` sends to `info@ardentlivinglagos.com` to avoid
  same-address loops in Zoho.
- `info@ardentlivinglagos.com` is the public-facing brand address used for the
  user confirmation, so replies land in the main inbox.

### Failure behaviour
- Notification failure → user sees: *"We couldn't submit your inquiry right now. Please WhatsApp or call us at +234 811 401 8598."*
- Confirmation failure → silent (logged only). The inquiry has already reached the team.

---

## 6. Design System

### Tokens (`src/styles.css`)
- `--brand-navy: #0F172A`
- `--brand-gold: #C5A059`
- `--brand-stone: #F5F5F4`
- Fonts loaded via `<link>` tag in `__root.tsx` head (Playfair Display + Inter).
- Tailwind v4 with `@source` directive — **Lightning CSS** is the bundled engine.

### Components
- `Header` — sticky, navy on transparent → solid on scroll, mobile drawer
- `Footer` — three-column with address, contact, credentials
- `WhatsAppFloat` — fixed bottom-right CTA, `https://wa.me/2348114018598`
- `InquiryForm` — light/dark variants, accessible labels, validation

### Accessibility
- WCAG 2.1 AA targets: contrast, focus rings, semantic landmarks, alt text on all imagery.
- Single H1 per route.

### SEO
- Per-route `head()` with unique `title`, meta description, OG/Twitter tags.
- JSON-LD `LocalBusiness` schema in `__root.tsx`.
- `src/routes/sitemap[.]xml.ts` generates a sitemap.
- `public/robots.txt` allows all.

---

## 7. WhatsApp Click-to-Chat

- **Number:** `+234 811 401 8598`
- **Link format used everywhere:** `https://wa.me/2348114018598`

### Why this format
The path segment **must not contain `+`** — Chrome's `ERR_BLOCKED_BY_RESPONSE`
fires when the `+` is URL-encoded inconsistently. The bare digits format works
across:
- Mobile (opens the WhatsApp app)
- Desktop (opens WhatsApp Web / desktop client)

The `+` is preserved in visible text only.

---

## 8. Issues Hit and How They Were Resolved

| # | Symptom | Root cause | Fix |
| - | --- | --- | --- |
| 1 | `ERR_BLOCKED_BY_RESPONSE` on WhatsApp link | `+` in URL path | Strip `+` from `wa.me/…` path; keep it in visible text |
| 2 | Resend error: *"You can only send testing emails to your own email address"* | Used `onboarding@resend.dev` without verified domain | Switched sender to verified `@ardentlivinglagos.com` mailboxes |
| 3 | Notification arriving but `from` showed `onboarding@resend.dev` on live site | Vercel was serving a stale bundle | Redeploy on Vercel with "Use existing Build Cache" unchecked |
| 4 | Live form error: *"Missing Supabase environment variable(s): SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY"* | Production bundle still imported `client.server.ts` from before the Resend-only refactor | Removed Supabase from `inquiries.functions.ts`; redeploy without cache; added build marker `build=v2-resend-only` to verify the new bundle on the live site |
| 5 | CSS missing on live site (unstyled HTML) | Lightning CSS native binary skipped when Vercel used `npm install` | Added `vercel.json` forcing `bun install`; pinned Node 20 via `.nvmrc` |
| 6 | CSS missing in Lovable preview | `@import "tw-animate-css"` placed after `@source` in `styles.css` (Lightning CSS requires all `@import` first) | Moved the `@import` to the top of `styles.css` |
| 7 | `dist-check failed with exit status 1` after dependency upgrades | TanStack version mismatch + stale `vite.config.ts` | Aligned `@tanstack/react-start` and `@tanstack/react-router`; adopted `@lovable.dev/vite-tanstack-config` `defineConfig` wrapper |
| 8 | Vulnerable deps (high/medium) flagged by scanner | Outdated `js-yaml`, transitive `undici`, old TanStack | Upgraded TanStack packages; bumped `js-yaml`; removed `undici` |
| 9 | Form `reset()` crashed with null reference | Read `e.currentTarget` after `await` (event pooled) | Capture `form` reference before `await` |
| 10 | Inquiries security scan: `MISSING_RLS_SELECT_POLICY` (while still using Supabase) | No SELECT policy on `inquiries` table | Added restrictive policy: only `service_role` can read |
| 11 | Background figure in social image | AI generation artifact | Regenerated `service-social.jpg` until only the four foreground women remained |
| 12 | Inquiry form failed silently on Vercel | `RESEND_API_KEY` not configured in Vercel env vars | Added the key in Vercel Settings → Environment Variables (Production), then redeployed |

---

## 9. Common Maintenance Tasks

### Add a new route
1. Create `src/routes/<name>.tsx` with `createFileRoute('/<name>')`.
2. Add a per-route `head()` with unique `title` and meta description.
3. Add a link in `src/components/site/Header.tsx` nav array.
4. The route tree (`src/routeTree.gen.ts`) regenerates automatically — never edit it.

### Update copy
- Edit the relevant route file in `src/routes/`.
- For footer/header/contact info, edit `src/components/site/Footer.tsx` and `Header.tsx`.

### Replace an image
- Drop the new image into `src/assets/`.
- Re-import in the route/component that uses it.

### Rotate the Resend key
1. Generate a new key in the Resend dashboard.
2. In Vercel: Settings → Environment Variables → update `RESEND_API_KEY`.
3. Redeploy without build cache.

### Change the WhatsApp number
- Search for `2348114018598` across the codebase and replace.
- Keep the `+234 811 401 8598` format in visible text only.

---

## 10. Verifying a Deploy Is Healthy

1. Visit https://www.ardentlivinglagos.com — page renders with full styling.
2. Open Contact page → submit the inquiry form with a real test email.
3. Confirm in Vercel function logs: `[submitInquiry] build=v2-resend-only (no supabase)`.
4. Check `info@ardentlivinglagos.com` (Zoho) — notification email present, `reply_to` set to the tester's address.
5. Check tester's inbox — confirmation email received from `info@ardentlivinglagos.com`.
6. Click the floating WhatsApp button on mobile → opens WhatsApp app to the correct number.

---

## 11. Contact

- **Email:** info@ardentlivinglagos.com
- **Phone / WhatsApp:** +234 811 401 8598
- **Address:** Ikoyi, Lagos, Nigeria
