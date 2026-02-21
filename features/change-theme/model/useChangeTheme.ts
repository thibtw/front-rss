import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useCookie } from "@/shared/lib/hooks/useCookies";

export const themes = [
  { code: "light", name: "Light", icon: "☀️" },
  { code: "dark", name: "Dark", icon: "🌙" },
] as const;

type ThemeCode = (typeof themes)[number]["code"];

export function isThemeCode(x: string): x is ThemeCode {
  return (themes as readonly { code: string }[]).some((t) => t.code === x);
}

export function useChangeTheme(): {
  themes: readonly { code: string; name: string; icon: string }[];
  current: ThemeCode;
  changeTheme: (theme: ThemeCode) => void;
} {
  const router = useRouter();
  const { value: cookieTheme, set: setCookieTheme } = useCookie("theme");

  const current = useMemo<ThemeCode>(() => {
    if (cookieTheme && isThemeCode(cookieTheme)) return cookieTheme;
    return "light";
  }, [cookieTheme]);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const root = document.documentElement;
    if (current === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [current]);

  const changeTheme = (theme: ThemeCode): void => {
    setCookieTheme(theme);
    if (typeof document !== "undefined") {
      const root = document.documentElement;
      if (theme === "dark") {
        root.classList.add("dark");
      } else {
        root.classList.remove("dark");
      }
    }
    router.refresh();
  };

  return { themes, current, changeTheme };
}
