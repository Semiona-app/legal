/**
 * Single source for external references shown across the legal pages.
 * Update these once and every page follows.
 */
export const SITE_URL = "https://semiona.com";

export const CONTACT = {
  /** Primary privacy / data-protection contact. */
  privacyEmail: "privacy@semiona.com",
  /** General support inbox. */
  supportEmail: "support@semiona.com",
  /** Legal / terms contact. */
  legalEmail: "legal@semiona.com",
  company: "Semiona",
  website: "https://semiona.com",
};

/** Date each document was last reviewed (ISO). Shown as the "last updated" stamp. */
export const LAST_UPDATED = "2026-07-20";

/**
 * next/image with `unoptimized` does NOT prepend basePath, so every static
 * asset src must go through this helper (NEXT_PUBLIC_ vars are inlined at
 * build time, so the exported HTML gets the right prefix).
 */
export const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "";
export const asset = (p: string) => `${BASE_PATH}${p}`;
