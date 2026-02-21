"use client";

import {
  useChangeLanguage,
  isLanguageCode,
} from "@/features/change-language/model/useChangeLanguage";

export default function LanguageSwitcher(): React.JSX.Element {
  const { languages, current, changeLanguage } = useChangeLanguage();

  return (
    <div className="flex items-center gap-2 rounded-full border border-solid border-black/[.08] bg-white px-4 py-2 dark:border-white/[.145] dark:bg-black">
      <span className="text-sm font-medium text-black dark:text-zinc-50">
        {languages.find((l) => l.code === current)?.flag ?? "🌐"}
      </span>

      <select
        value={current}
        onChange={(e) => {
          const v = e.target.value;
          if (isLanguageCode(v)) void changeLanguage(v);
        }}
        className="cursor-pointer appearance-none bg-transparent text-sm font-medium text-black outline-none dark:text-zinc-50"
      >
        {languages.map((l) => (
          <option key={l.code} value={l.code}>
            {l.name}
          </option>
        ))}
      </select>
    </div>
  );
}
