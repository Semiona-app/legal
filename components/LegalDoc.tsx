"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useLang } from "@/components/LangContext";
import { IcArrow, IcMail, IcTop } from "@/components/icons";
import { CONTACT, LAST_UPDATED } from "@/lib/config";
import {
  DOC_CONTACT,
  getDoc,
  type Block,
  type DocSlug,
} from "@/lib/legal";

/** Rough reading time from total character count (≈ 900 chars/min, both scripts). */
function readingMinutes(text: string): number {
  return Math.max(1, Math.round(text.length / 900));
}

function fmtDate(iso: string, lang: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const date = new Date(Date.UTC(y, m - 1, d));
  return new Intl.DateTimeFormat(lang === "ar" ? "ar-EG" : "en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(date);
}

function BlockView({ block }: { block: Block }) {
  switch (block.type) {
    case "p":
      return <p>{block.text}</p>;
    case "h3":
      return <h3 className="doc-subhead">{block.text}</h3>;
    case "ul":
      return (
        <ul className="doc-list">
          {block.items.map((it, i) => (
            <li key={i}>{it}</li>
          ))}
        </ul>
      );
    case "steps":
      return (
        <ol className="doc-steps">
          {block.items.map((it, i) => (
            <li key={i}>
              <span className="step-num">{i + 1}</span>
              <span>{it}</span>
            </li>
          ))}
        </ol>
      );
    case "note":
      return <p className="doc-note">{block.text}</p>;
  }
}

export default function LegalDoc({ slug }: { slug: DocSlug }) {
  const { lang, t } = useLang();
  const doc = useMemo(() => getDoc(lang, slug), [lang, slug]);
  const [active, setActive] = useState<string>(doc.sections[0]?.id ?? "");

  const minutes = useMemo(() => {
    const all =
      doc.intro +
      doc.sections
        .map(
          (s) =>
            s.heading +
            s.blocks
              .map((b) =>
                b.type === "ul" || b.type === "steps"
                  ? b.items.join(" ")
                  : b.text,
              )
              .join(" "),
        )
        .join(" ");
    return readingMinutes(all);
  }, [doc]);

  const contactEmail = CONTACT[DOC_CONTACT[slug]];

  // scroll-spy: highlight the TOC entry for the section in view
  useEffect(() => {
    const headings = doc.sections
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -60% 0px", threshold: 0 },
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [doc]);

  return (
    <main id="main" className="doc-shell shell">
      {/* ── header ── */}
      <header className="doc-head">
        <Link className="doc-crumb" href="/">
          <IcArrow className="ic-flip" />
          {t("doc.backHome")}
        </Link>
        <h1 className="doc-title">{doc.title}</h1>
        <div className="doc-meta">
          <span className="doc-chip">
            {t("doc.updated")}: {fmtDate(LAST_UPDATED, lang)}
          </span>
          <span className="doc-chip doc-chip-soft">
            {minutes} {t("doc.readingTime")}
          </span>
        </div>
        <p className="doc-intro">{doc.intro}</p>
      </header>

      {/* ── body: TOC + article ── */}
      <div className="doc-body">
        <aside className="doc-toc" aria-label={t("doc.toc")}>
          <div className="doc-toc-inner">
            <p className="doc-toc-title">{t("doc.toc")}</p>
            <nav>
              <ol>
                {doc.sections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className={active === s.id ? "is-active" : undefined}
                    >
                      {s.heading}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>
          </div>
        </aside>

        <article className="doc-article">
          {doc.sections.map((s) => (
            <section key={s.id} id={s.id} className="doc-section">
              <h2>{s.heading}</h2>
              {s.blocks.map((b, i) => (
                <BlockView key={i} block={b} />
              ))}
            </section>
          ))}

          {/* contact card */}
          <section className="doc-contact card">
            <span className="doc-contact-ic">
              <IcMail />
            </span>
            <div>
              <h3>{t("doc.contactTitle")}</h3>
              <p>
                {t("doc.contactBody")}{" "}
                <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
              </p>
            </div>
          </section>

          <button
            className="doc-top"
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <IcTop />
            {t("doc.top")}
          </button>
        </article>
      </div>
    </main>
  );
}
