"use client";

import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/components/LangContext";
import { asset, CONTACT } from "@/lib/config";

export default function Footer() {
  const { t } = useLang();

  return (
    <footer className="footer">
      <div className="footer-inner shell">
        <div className="footer-brand">
          <Image
            className="footer-lockup"
            src={asset("/img/logo-lockup.png")}
            alt="Semiona"
            width={150}
            height={129}
            loading="eager"
          />
          <p>{t("footer.line")}</p>
        </div>
        <nav className="footer-links" aria-label={t("footer.nav")}>
          <Link href="/privacy">{t("nav.privacy")}</Link>
          <Link href="/terms">{t("nav.terms")}</Link>
          <Link href="/account-deletion">{t("nav.deletion")}</Link>
          <a href={CONTACT.website} target="_blank" rel="noopener noreferrer">
            {t("nav.app")}
          </a>
        </nav>
      </div>
      {/* the build year is baked into the static export; a visitor in a later
          year hydrates to the current one — suppress that expected mismatch */}
      <p className="footer-copy shell" suppressHydrationWarning>
        © {new Date().getFullYear()} {CONTACT.company} · {t("footer.rights")}
      </p>
    </footer>
  );
}
