## Goal

Deploy this site on Vercel with `vite build`, keep editing in Lovable, and have every Lovable edit auto-deploy to Vercel via GitHub — without touching `vite.config.ts`.

## Most likely cause of the CSS failure on Vercel

Tailwind v4 compiles through **Lightning CSS**, which is a native binary (`lightningcss-linux-x64-gnu`) loaded as an **optional dependency**. Locally and on Lovable this is installed via `bun install` from `bun.lock`. On Vercel the default install runs `npm install`, which often skips that optional native binary on Linux — the build "succeeds" but Tailwind silently emits no styles, so the deployed site looks unstyled. This matches "the CSS itself" being the problem while Vercel doesn't actually fail.

Fix: pin Vercel to **bun install** so it respects `bun.lock` and pulls the correct native CSS binary, and lock the build command/output explicitly so Vercel never second-guesses the TanStack output. No `vite.config.ts` changes.

## Changes

**1. New file `vercel.json`** (project root):
```json
{
  "$schema": "https://openapi.vercel.sh/vercel.json",
  "installCommand": "bun install",
  "buildCommand": "vite build",
  "framework": null
}
```
- `installCommand: bun install` — installs Lightning CSS's Linux binary the same way Lovable does.
- `buildCommand: vite build` — exactly what you asked for; the TanStack Vite plugin + Nitro `vercel` preset already emit `.vercel/output/` which Vercel auto-detects, so no Output Directory override is needed.
- `framework: null` — stops Vercel from auto-detecting "Vite" and forcing `dist/` as the output dir (which would 404 the whole site).

**2. New file `.nvmrc`** with `20` — guarantees Vercel uses Node 20, matching the Lovable runtime. Avoids the second common silent-CSS failure (Node 18 + Lightning CSS).

**3. No code changes.** `vite.config.ts`, `src/styles.css`, routes, components, and the Resend inquiry flow are untouched.

## Vercel project settings to set once (Project → Settings → General)

These are usually inherited from `vercel.json`, but set them explicitly so a future UI change can't override the file:

- Framework Preset: **Other**
- Build Command: **`vite build`** (Override ON)
- Output Directory: **leave blank** (Override OFF — Nitro writes `.vercel/output/`)
- Install Command: **`bun install`** (Override ON)
- Node.js Version: **20.x**

Also set the env vars on Vercel (Settings → Environment Variables, all three environments):
- `RESEND_API_KEY` — required for the inquiry form to send mail.
- Any `VITE_SUPABASE_*` keys you want available; the inquiry flow no longer needs them, but the Supabase client module reads them, so missing values can throw on first render. Copy them from the Lovable `.env`.

## The ongoing workflow

1. Connect the Lovable project to GitHub (Lovable → Plus menu → GitHub → Connect). One-time.
2. In Vercel, **Import Project** from that GitHub repo. Confirm the settings above.
3. From now on:
   - Edit in Lovable as normal.
   - Lovable pushes commits to GitHub automatically.
   - Vercel sees the push and deploys with `bun install` + `vite build`.
   - Custom domain stays pointed at Vercel; Lovable's `.lovable.app` URL continues to work for previewing in-progress changes.
4. If you ever want to skip a Vercel deploy on a commit, prefix the commit message with `[skip ci]` (Lovable lets you edit commit messages from the version history side panel).

## How to verify after the first Vercel deploy

1. Open the Vercel deployment URL. Page should render with the Navy + Gold theme and Playfair / Inter fonts — not unstyled black-on-white text.
2. In DevTools → Network, the `assets/*.css` file should be ~tens of KB (not a near-empty file).
3. Submit a test inquiry on `/contact` and confirm it arrives in Zoho `info@ardentlivinglagos.com` — that proves `RESEND_API_KEY` got picked up by the serverless function.

## Trade-off to flag

`vercel.json` and `.nvmrc` will sync back into Lovable via GitHub. They're inert in the Lovable preview (Lovable uses its own runner) but make Vercel deterministic. If you ever switch hosts, deleting these two files is the only cleanup needed.