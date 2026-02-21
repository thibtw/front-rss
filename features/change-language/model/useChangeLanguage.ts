import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { useCookie } from "@/shared/lib/hooks/useCookies";

export const languages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "ua", name: "Ukrainian", flag: "🇺🇦" },
] as const;

type LanguageCode = (typeof languages)[number]["code"];

export function isLanguageCode(x: string): x is LanguageCode {
  return (languages as readonly { code: string }[]).some((l) => l.code === x);
}

export function useChangeLanguage(): {
  languages: readonly { code: string; name: string; flag: string }[];
  current: LanguageCode;
  changeLanguage: (lng: LanguageCode) => Promise<void>;
} {
  const router = useRouter();
  const { i18n } = useTranslation();
  const { value: cookieLang, set: setCookieLang } = useCookie("lang");

  const current = useMemo<LanguageCode>(() => {
    if (cookieLang && isLanguageCode(cookieLang)) return cookieLang;
    return "en";
  }, [cookieLang]);

  useEffect(() => {
    if (
      cookieLang &&
      isLanguageCode(cookieLang) &&
      i18n.language !== cookieLang
    ) {
      void i18n.changeLanguage(cookieLang);
    }
  }, [cookieLang, i18n]);

  const changeLanguage = async (lng: LanguageCode) => {
    setCookieLang(lng);
    await i18n.changeLanguage(lng);
    router.refresh();
  };

  return { languages, current, changeLanguage };
}
