"use client";

import { usePathname } from "next/navigation";

export type LandingLocale = "pl" | "en";

export function useLandingLocale(): LandingLocale {
  const pathname = usePathname();
  return pathname === "/en" || pathname.startsWith("/en/") ? "en" : "pl";
}

export function localizedHomePath(locale: LandingLocale) {
  return locale === "en" ? "/en" : "/";
}
