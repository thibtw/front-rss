"use client";

import { useEffect } from "react";
import i18n from "@/lib/i18n";
import { I18nextProvider } from "react-i18next";

export function AppProviders({
  children,
  lang,
}: {
  children: React.ReactNode;
  lang: string;
}): React.JSX.Element {
  useEffect(() => {
    if (i18n.language !== lang) {
      void i18n.changeLanguage(lang);
    }
  }, [lang]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
