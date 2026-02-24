"use client";

import { useEffect, useState } from "react";
import {
  initRemoteConfig,
  getBooleanFlag,
  getStringFlag,
  getNumberFlag,
} from "@/lib/firebase";

export function useRemoteConfig(): {
  ready: boolean;
  getBooleanFlag: (key: string) => boolean;
  getStringFlag: (key: string) => string;
  getNumberFlag: (key: string) => number;
} {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    void (async (): Promise<void> => {
      await initRemoteConfig();
      setReady(true);
    })();
  }, []);

  return {
    ready,
    getBooleanFlag,
    getStringFlag,
    getNumberFlag,
  };
}
