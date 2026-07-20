"use client";

import { useLang } from "@/components/LangContext";

/** AR ⇄ EN switch — shows the language you'd switch TO. */
export default function LangToggle() {
  const { lang, toggle } = useLang();
  return (
    <button
      className="lang-toggle"
      type="button"
      onClick={toggle}
      aria-label={lang === "ar" ? "Switch to English" : "التبديل إلى العربية"}
    >
      {lang === "ar" ? "EN" : "ع"}
    </button>
  );
}
