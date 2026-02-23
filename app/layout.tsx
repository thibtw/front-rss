import { cookies } from "next/headers";
import { AppProviders } from "@/app/providers";
import "@/app/globals.css";
import DesktopHeader from "../widgets/Header/DesktopHeader";
import MobileHeader from "../widgets/Header/MobileHeader";

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
        <AppProviders lang={lang}>
          <div className="bg-black">
            <>
              <div className="md:hidden sticky top-0 z-50 backdrop-blur-md bg-black/40">
                <MobileHeader />
              </div>
              <div className="hidden md:block sticky top-0 z-50 backdrop-blur-md bg-black/40">
                <DesktopHeader />
              </div>
            </>

            {children}
          </div>
        </AppProviders>
      </body>
    </html>
  );
}
