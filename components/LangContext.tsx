"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { DICT, type I18nKey, type Lang } from "@/lib/i18n";

type LangContextValue = {
  lang: Lang;
  t: (key: I18nKey) => string;
  toggle: () => void;
};

const LangContext = createContext<LangContextValue>({
  lang: "ar",
  t: (key) => DICT.ar[key],
  toggle: () => {},
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ar");

  // Restore the saved choice after hydration. The static HTML is Arabic and
  // must hydrate as Arabic first — switching any earlier would mismatch.
  useEffect(() => {
    try {
      const saved = localStorage.getItem("semiona-lang");
      // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional one-time post-hydration restore
      if (saved === "en") setLang("en");
    } catch {
      /* private mode */
    }
  }, []);

  useEffect(() => {
    const dict = DICT[lang];
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "en" ? "ltr" : "rtl";
    document.title = dict._title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", dict._desc);
    try {
      localStorage.setItem("semiona-lang", lang);
    } catch {
      /* private mode */
    }
  }, [lang]);

  const t = useCallback((key: I18nKey) => DICT[lang][key], [lang]);
  const toggle = useCallback(
    () => setLang((prev) => (prev === "ar" ? "en" : "ar")),
    [],
  );

  return (
    <LangContext.Provider value={{ lang, t, toggle }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
