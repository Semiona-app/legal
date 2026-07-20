"use client";

import { useEffect, useState } from "react";
import { IcMoon, IcSun } from "@/components/icons";

type Theme = "light" | "dark";
type Pref = Theme | "system";

const systemTheme = (): Theme =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

/** Light/dark switch — mirrors the app, which ships both modes.
 *  Default follows the OS; an explicit choice persists in localStorage. */
export default function ThemeToggle() {
  // null = before hydration settles (SSR renders the light icon)
  const [pref, setPref] = useState<Pref | null>(null);

  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem("semiona-theme");
    } catch {
      /* private mode */
    }
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time post-hydration restore
    setPref(saved === "dark" || saved === "light" ? saved : "system");
  }, []);

  useEffect(() => {
    if (!pref || pref === "system") return;
    document.documentElement.dataset.theme = pref;
    try {
      localStorage.setItem("semiona-theme", pref);
    } catch {
      /* private mode */
    }
  }, [pref]);

  const effective: Theme =
    pref === null || pref === "system"
      ? typeof window === "undefined" || pref === null
        ? "light"
        : systemTheme()
      : pref;

  return (
    <button
      className="lang-toggle theme-toggle"
      type="button"
      onClick={() => setPref(effective === "dark" ? "light" : "dark")}
      aria-label={effective === "dark" ? "الوضع النهاري" : "الوضع الليلي"}
    >
      {effective === "dark" ? <IcSun /> : <IcMoon />}
    </button>
  );
}
