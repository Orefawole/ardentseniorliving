## Goal
Give visitors a clear picture of a typical day and week at Ardent without crowding the homepage. Add a dedicated **Activities** page and surface it from the main nav.

## New route: `/activities` (`src/routes/activities.tsx`)

Reuses existing brand tokens (navy/gold/stone, Playfair + Inter, `SectionHeader`) so it matches the rest of the site. Sections top-to-bottom:

1. **Hero** — eyebrow "A Day at Ardent", H1 "Meaningful days, thoughtfully planned.", short intro.
2. **Sample Daily Schedule** — the 13-row daily time structure (8:00 AM arrival → 7:00 PM pick-up) rendered as a clean two-column time/activity list (not a heavy table) so it reads well on mobile.
3. **Sample Weekly Programme — Week 1** — full Mon–Fri Week 1 table with the "Culture & Community" theme. Responsive treatment:
   - Desktop (md+): 6-column table (TIME + 5 days) with subtle gold header row, striped rows.
   - Mobile: collapses to five stacked day cards (Monday…Friday), each listing the day's time-slot items. Uses the existing `Accordion` component so only one day is open at a time.
   - Small legend note: "Italic entries are meal suggestions. Activities may be adjusted for individual client needs."
   - "Download full 4-week schedule (PDF)" button — links to a static PDF placed at `public/ardent-4week-schedule.pdf` (generated once from the uploaded docx and committed as a static asset). Opens in a new tab.
4. **Safety & Wellbeing** — three cards using the same visual language as the "Why Ardent" values grid on the home page:
   - **Meal Philosophy** — soft textures, moderate salt/pepper, low oil, diabetic/hypertension-friendly adjustments per care plan.
   - **Excursion Safety** — signed consent, 1:3 carer ratio at pool, medical clearance, shaded routes, water/Zobo provided.
   - **Climate Considerations** — AC/fan-cooled indoor spaces, outdoor stretches before peak heat, hydration prompts, mandatory sun protection.
5. **CTA strip** — navy band linking to `/contact` ("Book a Private Tour").
6. **SEO head()** — unique title/description/og tags, canonical `/activities`, plus JSON-LD `Schedule`/`ItemList` describing the daily structure.

## Navigation

- Add "Activities" link to `src/components/site/Header.tsx` desktop + mobile nav, positioned between **Services** and **How It Works**.
- Add "Activities" to the footer's site links in `src/components/site/Footer.tsx`.
- Add `/activities` to `src/routes/sitemap[.]xml.ts`.

## Homepage nudge (minimal)

On `src/routes/index.tsx`, under the Services grid, add a single-line link "See a sample day and week →" pointing to `/activities`. No large new section on the homepage, per the brief.

## Downloadable PDF

- Generate `public/ardent-4week-schedule.pdf` once from the uploaded docx (LibreOffice convert), commit as a static asset served at `/ardent-4week-schedule.pdf`.
- Referenced from the Weekly Programme section as an `<a href="/ardent-4week-schedule.pdf" download>` styled button.

## Files touched

- **New:** `src/routes/activities.tsx`, `public/ardent-4week-schedule.pdf`
- **Edit:** `src/components/site/Header.tsx`, `src/components/site/Footer.tsx`, `src/routes/sitemap[.]xml.ts`, `src/routes/index.tsx` (one-line link only)
- **Not touched:** `vite.config.ts` (per your instruction), server functions, inquiry form, backend, Resend integration.

## Out of scope

- No changes to the 4-week content itself — Week 1 is used verbatim from your document; Weeks 2–4 live only in the downloadable PDF.
- No new backend, no CMS — content is static in the route file so future edits are one-file changes.
