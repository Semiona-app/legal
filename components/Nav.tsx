"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLang } from "@/components/LangContext";
import LangToggle from "@/components/LangToggle";
import ThemeToggle from "@/components/ThemeToggle";
import { IcLogo } from "@/components/icons";

const LINKS = [
  { href: "/privacy", key: "nav.privacy" as const },
  { href: "/terms", key: "nav.terms" as const },
  { href: "/account-deletion", key: "nav.deletion" as const },
];

export default function Nav() {
  const { t } = useLang();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // close the mobile menu whenever the route changes
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional: dismiss the menu on navigation
    setOpen(false);
  }, [pathname]);

  const isActive = (href: string) =>
    pathname === href || pathname.startsWith(href + "/");

  return (
    <header className={`nav${scrolled ? " is-scrolled" : ""}`}>
      <div className="nav-inner">
        <Link className="brand" href="/" aria-label="Semiona">
          <IcLogo className="brand-mark" />
          <span className="brand-word" aria-hidden="true">
            SEMI<em>O</em>NA
          </span>
        </Link>

        <nav className="nav-links" aria-label={t("nav.menu")}>
          {LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={isActive(l.href) ? "is-active" : undefined}
              aria-current={isActive(l.href) ? "page" : undefined}
            >
              {t(l.key)}
            </Link>
          ))}
        </nav>

        <div className="nav-actions">
          <LangToggle />
          <ThemeToggle />
          <button
            className={`nav-burger${open ? " is-open" : ""}`}
            type="button"
            aria-label={t("nav.menu")}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      {open && (
        <div className="mobile-menu" onClick={() => setOpen(false)}>
          <nav className="mobile-menu-inner" aria-label={t("nav.menu")}>
            <Link href="/">{t("nav.home")}</Link>
            {LINKS.map((l) => (
              <Link key={l.href} href={l.href}>
                {t(l.key)}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
