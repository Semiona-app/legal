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

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the static export and publishes it to **GitHub Pages**. The workflow sets `NEXT_PUBLIC_BASE_PATH=/legal` so asset paths resolve under the project-pages URL. For a custom domain (e.g. `legal.semiona.com`), leave `NEXT_PUBLIC_BASE_PATH` unset and add a `CNAME`.
