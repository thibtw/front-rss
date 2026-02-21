import { cookies } from "next/headers";
import { AppProviders } from "@/app/providers";

const LANG_COOKIE = "lang";
const THEME_COOKIE = "theme";
const allowedThemes = new Set(["light", "dark"]);

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}): Promise<React.JSX.Element> {
  const cookieStore = await cookies();
  const lang = cookieStore.get(LANG_COOKIE)?.value ?? "ua";
  const theme = cookieStore.get(THEME_COOKIE)?.value ?? "light";
  const themeClass = allowedThemes.has(theme) ? theme : "light";

  return (
    <html lang={lang} className={themeClass === "dark" ? "dark" : ""}>
      <body>
        <AppProviders lang={lang}>{children}</AppProviders>
      </body>
    </html>
  );
}
