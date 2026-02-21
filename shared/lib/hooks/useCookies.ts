"use client";

import { useCallback, useEffect, useState } from "react";

type CookieOptions = {
  days?: number;
  path?: string;
};

function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;

  const match = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${name}=`));

  if (!match) return null;

  return decodeURIComponent(match.split("=").slice(1).join("="));
}

function setCookie(
  name: string,
  value: string,
  options: CookieOptions = {}
): void {
  if (typeof document === "undefined") return;

  const { days = 365, path = "/" } = options;
  const expires = new Date(
    Date.now() + days * 24 * 60 * 60 * 1000
  ).toUTCString();

  document.cookie = `${name}=${encodeURIComponent(value)}; Path=${path}; Expires=${expires}`;
}

function removeCookie(name: string, path = "/"): void {
  if (typeof document === "undefined") return;
  document.cookie = `${name}=; Path=${path}; Expires=${new Date(0).toUTCString()}`;
}

export function useCookie(
  name: string,
  options?: CookieOptions
): {
  value: string | null;
  set: (nextValue: string) => void;
  remove: () => void;
} {
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    setValue(getCookie(name));
  }, [name]);

  const set = useCallback(
    (nextValue: string) => {
      setCookie(name, nextValue, options);
      setValue(nextValue);
    },
    [name, options]
  );

  const remove = useCallback(() => {
    removeCookie(name, options?.path ?? "/");
    setValue(null);
  }, [name, options?.path]);

  return { value, set, remove };
}
