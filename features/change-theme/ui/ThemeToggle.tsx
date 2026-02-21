"use client";

import {
  useChangeTheme,
  isThemeCode,
} from "@/features/change-theme/model/useChangeTheme";

export default function ThemeToggle(): React.JSX.Element {
  const { themes, current, changeTheme } = useChangeTheme();

  return (
    <div className="flex items-center gap-2 rounded-full border border-solid border-black/[.08] bg-white px-4 py-2 dark:border-white/[.145] dark:bg-black">
      <span className="text-sm font-medium text-black dark:text-zinc-50">
        {themes.find((t) => t.code === current)?.icon ?? "🌙"}
      </span>

      <select
        value={current}
        onChange={(e) => {
          const v = e.target.value;
          if (isThemeCode(v)) changeTheme(v);
        }}
        className="cursor-pointer appearance-none bg-transparent text-sm font-medium text-black outline-none dark:text-zinc-50"
      >
        {themes.map((t) => (
          <option key={t.code} value={t.code}>
            {t.name}
          </option>
        ))}
      </select>
    </div>
  );
}
