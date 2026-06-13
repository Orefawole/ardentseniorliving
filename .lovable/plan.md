## Ardent Senior Living — Build Plan

### Brand & design system (locked from chosen direction)
- Palette tokens in `src/styles.css` via `@theme`:
  - `--color-brand-navy: #0F172A`
  - `--color-brand-gold: #C5A059`
  - `--color-brand-stone: #F5F5F4`
  - Keep shadcn semantic tokens intact; map background to white, primary to brand-navy, accent to brand-gold.
- Typography: Playfair Display (serif headings) + Inter (sans body), loaded via `<link>` in `__root.tsx` head (Tailwind v4 requires this, not `@import`).
- Aesthetic: editorial luxe — uppercase tracked-out micro labels, thin gold rules, ample whitespace, no rounded buttons.

### Routes (TanStack Start file-based)
```
src/routes/
  __root.tsx          (shared shell: Header + Footer + WhatsApp float, font links, site-wide meta)
  index.tsx           (Home)
  about.tsx           (About Us)
  services.tsx        (Services)
  how-it-works.tsx    (How It Works)
  contact.tsx         (Contact / Book a Visit)
  sitemap[.]xml.ts    (server route generating sitemap)
  api/inquiries.ts    (only if needed — using createServerFn instead)
```

Each leaf route gets its own `head()`: title, description, og:title, og:description, og:url, canonical, and a leaf og:image where one exists. Root holds sitewide `og:type=website`, viewport, JSON-LD Organization + LocalBusiness schema with the Ikoyi address and phone.

### Shared components
- `src/components/site/Header.tsx` — sticky nav, ARDENT wordmark + "Senior Living" gold sublabel, 4 nav links (About, The Center → Services, How It Works, Contact), mobile hamburger (Sheet), "Inquire Now" button → `/contact`.
- `src/components/site/Footer.tsx` — brand block, hours, quick links, contact, newsletter input (visual only for MVP), copyright.
- `src/components/site/WhatsAppFloat.tsx` — fixed bottom-right pill linking to `https://wa.me/2348114018598`.
- `src/components/site/SectionHeader.tsx` — serif heading + gold underline rule.
- `src/components/site/InquiryForm.tsx` — Zod-validated form (name, phone, email, inquiry type, message), posts to `submitInquiry` server fn, toasts success.

### Page contents

**Home** — Hero (headline "Dignified Care for the Golden Years.", subhead, "Book a Private Tour" + "View Our Facilities" CTAs, portrait image, gold "24/7 Medical Monitoring" badge overlay) → Trust strip (stone bg, "Trusted by families in London • Houston • Lagos • Toronto" + 3 italic trust-org names) → Services preview grid (6 cards with image + serif title + "Discover more" gold link) → Why Choose Us (3 value props with gold numerals: Clinical Excellence, Family Communication, Dignified Environment) → Inquiry section (navy bg, white form with gold underline inputs) → Footer.

**About** — mission + vision header, origin story (two-column with portrait), leadership bios (3-card grid), values band, credentials strip.

**Services** — 6 detailed service blocks (Day Care, Wellness Monitoring, Personal Care, Engagement & Activities, Nutrition & Meal Planning, Family Communication), each as an editorial split row (image + feature list + included items), closing CTA to contact.

**How It Works** — 5-step numbered timeline (Inquiry & Consultation → Assessment & Family Meeting → Customized Care Plan → Enrollment & First Day → Ongoing Care & Communication), Accordion FAQ (6 items), "Start Your Journey" CTA.

**Contact** — Two-column: left = address (12 Glover Road, Ikoyi, Lagos — placeholder, editable), phone +234 811 401 8598 (clickable `tel:`), email `care@ardentliving.com` (placeholder), hours (Mon–Sat 8am–6pm placeholder), embedded Google Maps iframe of Ikoyi; right = InquiryForm. Confirmation state on submit.

> Contact details fall back to sensible placeholders since none were provided; documented as TODO comments at the top of `contact.tsx` and `Footer.tsx` so they're easy to swap.

### Imagery
Generate 6–8 dignified, warm-tone placeholder photos in `src/assets/` via imagegen (older Nigerian adults in residential settings, sunlit interiors, a portrait for hero, service vignettes). Each image gets descriptive alt text. The Ardent logo from the upload is registered as a Lovable Asset and shown in the footer as a circular brand mark next to the wordmark.

### Inquiry form (Lovable Cloud DB)
- Enable Lovable Cloud.
- Migration: `public.inquiries` table — `id uuid pk default gen_random_uuid()`, `created_at timestamptz default now()`, `name text`, `phone text`, `email text`, `inquiry_type text`, `message text`, `source text default 'website'`.
- Grants: `GRANT INSERT ON public.inquiries TO anon, authenticated; GRANT ALL TO service_role;`
- RLS: enable; policy `"anyone can submit"` `FOR INSERT TO anon, authenticated WITH CHECK (true)`. No SELECT policy → submissions are write-only from the public site; owner can read in the Cloud dashboard.
- `src/lib/inquiries.functions.ts` exports `submitInquiry` (`createServerFn` POST) with Zod validation (name/phone required, email valid if present, message ≤ 2000 chars, basic anti-spam length checks). Inserts using publishable-key client via `requireSupabaseAuth`? No — public form, so handler loads `supabaseAdmin` inside the handler (since unauthenticated) and inserts with explicit safe columns.
- Client uses `useServerFn` + `useMutation`; shows toast + inline success message.

### SEO
- Per-route `head()` with unique title/description/og tags, canonical (leaf only) using relative paths (no domain yet).
- `__root.tsx` JSON-LD: `LocalBusiness` schema with `@type: "MedicalBusiness"`, name, telephone, address (Ikoyi, Lagos, NG), areaServed, openingHours.
- `src/routes/sitemap[.]xml.ts` server route listing the 5 public routes; `BASE_URL = ""` placeholder + TODO comment.
- `public/robots.txt` with `User-agent: * / Allow: /`.
- Image lazy loading via native `loading="lazy"`; explicit width/height attributes.

### Accessibility / responsive
- Mobile-first layouts (single column → md:grid-cols-2/3), hamburger nav via shadcn Sheet, focus rings preserved, labels associated with inputs, semantic landmarks (`<header>/<main>/<footer>/<nav>`), color contrast verified for navy-on-stone and gold-on-navy.

### Out of scope for MVP (mention to user)
- Outbound email notification (Resend) — not requested; can add later.
- Newsletter form is visual only (no backend).
- Real testimonials / certifications — copy uses tasteful placeholders flagged in comments.

### Verification before finishing
- Build passes (auto).
- Visit `/`, `/about`, `/services`, `/how-it-works`, `/contact` in preview; verify nav, WhatsApp link uses `2348114018598`, form submits and a row lands in `inquiries`.