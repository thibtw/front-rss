import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import enTranslations from "../locales/en.json";
import uaTranslations from "../locales/ua.json";

function getInitialLanguage(): string {
  if (typeof document === "undefined") return "en";

  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith("lang="));

  if (!match) return "en";

  const lang = decodeURIComponent(match.split("=").slice(1).join("="));
  return ["en", "ua"].includes(lang) ? lang : "en";
}

const initialLanguage = getInitialLanguage();

void i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: enTranslations,
    },
    ua: {
      translation: uaTranslations,
    },
  },
  lng: initialLanguage,
  fallbackLng: "en",
  supportedLngs: ["en", "ua"],
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
