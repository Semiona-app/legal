# Semiona — Legal Center

The official legal site for **Semiona** (سيميونا), the social-marketplace app. Hosts the three documents the app stores require and users deserve:

- **Privacy Policy** — `/privacy`
- **Terms of Service** — `/terms`
- **Account & Data Deletion** — `/account-deletion` (the URL Google Play requires)

Arabic-first (RTL) with an English toggle. The visual language is lifted 1:1 from the app and the marketing landing page: the brand green `#5ECB5C`, the `#6FD46D → #3FB98C` CTA gradient, the Facebook-style dark palette, Poppins (Latin) paired with Alexandria (Arabic).

## Stack

- **Next.js 16** (App Router, TypeScript, `output: "export"` — pure static site)
- **next/font/local** — self-hosted Poppins + Alexandria (no external requests)
- Plain hand-written CSS (`app/globals.css`) driven by design tokens — no UI framework
- Zero client data collection — the site is static; language/theme are stored only in your own browser's `localStorage`

## Structure

```
app/
  layout.tsx              # fonts, metadata, Nav + Footer shell, theme pre-paint
  page.tsx                # the Legal Center hub (3 cards)
  privacy/page.tsx        # thin wrappers around <LegalDoc slug="…">
  terms/page.tsx
  account-deletion/page.tsx
components/
  LegalDoc.tsx            # renders a document + sticky scroll-spy table of contents
  Nav.tsx  Footer.tsx  LangToggle.tsx  ThemeToggle.tsx  LangContext.tsx  icons.tsx
lib/
  legal.ts               # ALL document copy (AR + EN) as structured sections
  i18n.ts                # UI chrome strings (AR + EN)
  config.ts              # contact emails, last-updated date, basePath helper
```

## Editing the documents

All legal text lives in **`lib/legal.ts`** as structured section arrays — one per language, kept in the same order so the shared table of contents and deep-links line up. Edit the copy there; the renderer, TOC, and reading-time estimate update automatically. Contact emails and the "last updated" date live in **`lib/config.ts`**.

> The content is a thorough, product-specific template that reflects how the app actually works (posts, marketplace, wallet, KYC, chats, ads, points). It is **not** a substitute for review by a qualified lawyer before publication in a specific jurisdiction.

## Develop

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export → out/
npx serve out      # preview the export
```

## Deploy

Hosted on the Semiona **Dokploy** server and served at **https://legal.semiona.com** (auto-SSL via Let's Encrypt).

The `Dockerfile` builds the static export and serves it with a tiny nginx (`nginx.conf` maps clean URLs like `/privacy` onto the exported `/privacy.html`). Dokploy is pointed at this repo (`main`), builds the image, and routes `legal.semiona.com` to it. No `NEXT_PUBLIC_BASE_PATH` is set, so the site lives at the domain root.

To deploy: push to `main` (Dokploy auto-deploys) or trigger a redeploy in the Dokploy app. Build it locally with `docker build -t semiona-legal . && docker run -p 8080:80 semiona-legal`.
