import { initializeApp } from "firebase/app";
import {
  getRemoteConfig,
  fetchAndActivate,
  getValue,
  type RemoteConfig,
} from "firebase/remote-config";

const firebaseConfig = {
  apiKey:
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY ??
    "AIzaSyBhgVeTNWDEXsaz9NZNB3d6KpRMcPoQGlc",
  authDomain:
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ??
    "test-54db9.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID ?? "test-54db9",
  storageBucket:
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ??
    "test-54db9.firebasestorage.app",
  messagingSenderId:
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ?? "372702374800",
  appId:
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID ??
    "1:372702374800:web:ebfacb63c56e8da0f52115",
};

const app = initializeApp(firebaseConfig);

export const remoteConfig: RemoteConfig = getRemoteConfig(app);

remoteConfig.settings = {
  minimumFetchIntervalMillis: 60_000,
  fetchTimeoutMillis: 10_000,
};

remoteConfig.defaultConfig = {
  header: false,
};

export async function initRemoteConfig(): Promise<boolean> {
  try {
    await fetchAndActivate(remoteConfig);
    return true;
  } catch (e) {
    console.warn("Remote Config fetch failed:", e);
    return false;
  }
}

export function getBooleanFlag(key: string): boolean {
  return getValue(remoteConfig, key).asBoolean();
}

export function getStringFlag(key: string): string {
  return getValue(remoteConfig, key).asString();
}

export function getNumberFlag(key: string): number {
  return getValue(remoteConfig, key).asNumber();
}
