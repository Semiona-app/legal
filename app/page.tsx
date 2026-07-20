"use client";

import Link from "next/link";
import { useLang } from "@/components/LangContext";
import { IcArrow, IcDoc, IcShield, IcTrash } from "@/components/icons";
import { LAST_UPDATED } from "@/lib/config";

const CARDS = [
  {
    href: "/privacy",
    icon: IcShield,
    tone: "green",
    title: "card.privacy.title",
    desc: "card.privacy.desc",
  },
  {
    href: "/terms",
    icon: IcDoc,
    tone: "gold",
    title: "card.terms.title",
    desc: "card.terms.desc",
  },
  {
    href: "/account-deletion",
    icon: IcTrash,
    tone: "red",
    title: "card.deletion.title",
    desc: "card.deletion.desc",
  },
] as const;

export default function Home() {
  const { lang, t } = useLang();
  const [y, m, d] = LAST_UPDATED.split("-").map(Number);
  const updated = new Intl.DateTimeFormat(lang === "ar" ? "ar-EG" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(y, m - 1, d)));

  return (
    <main id="main" className="home shell">
      <section className="home-hero">
        <span className="eyebrow">
          <IcShield className="ic" />
          {t("home.eyebrow")}
        </span>
        <h1 className="home-title">{t("home.title")}</h1>
        <p className="home-sub">{t("home.sub")}</p>
        <p className="home-updated">
          {t("home.updated")}: <strong>{updated}</strong>
        </p>
      </section>

      <section className="home-grid" aria-label={t("home.eyebrow")}>
        {CARDS.map((c) => {
          const Icon = c.icon;
          return (
            <Link key={c.href} href={c.href} className={`legal-card card tone-${c.tone}`}>
              <span className="legal-card-ic">
                <Icon />
              </span>
              <h2>{t(c.title)}</h2>
              <p>{t(c.desc)}</p>
              <span className="legal-card-cta">
                {t("card.read")}
                <IcArrow className="ic-flip" />
              </span>
            </Link>
          );
        })}
      </section>
    </main>
  );
}
