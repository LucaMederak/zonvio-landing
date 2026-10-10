"use client";

import NextLink from "next/link";
import NavigationV2, { type INavigationLink } from "@/components/NavigationV2";
import ZonvioLogoIcon from "@/assets/logo/zonvio-logo-icon-black.svg";
import { useLandingLocale } from "@/lib/landingLocale";

const navLinksPl: INavigationLink[] = [
  { title: "O platformie", href: "benefit", type: "scroll" },
  { title: "Oferta", href: "oferta", type: "page" },
  { title: "Blog", href: "blog", type: "page" },
  { title: "Cennik", href: "cennik", type: "page" },
  { title: "FAQ", href: "faq", type: "scroll" },
];

const navLinksEn: INavigationLink[] = [
  { title: "Platform", href: "benefit", type: "scroll" },
  { title: "Solutions", href: "oferta", type: "page" },
  { title: "Blog", href: "blog", type: "page" },
  { title: "Pricing", href: "cennik", type: "page" },
  { title: "FAQ", href: "faq", type: "scroll" },
];

export default function SiteNavigation() {
  const locale = useLandingLocale();
  const isEnglish = locale === "en";

  return (
    <NavigationV2
      logoURL={ZonvioLogoIcon}
      logoLink={isEnglish ? "/en" : "/"}
      links={isEnglish ? navLinksEn : navLinksPl}
      options={
        <div className="flex w-full flex-col gap-2 sm:flex-row lg:w-auto lg:items-center">
          <NextLink
            href="/auth/login"
            className="inline-flex h-10 w-full items-center justify-center rounded-full border border-transparent px-4 text-[13px] font-semibold text-slate-700 transition duration-200 hover:border-violet-200 hover:bg-white/80 hover:text-violet-700 lg:w-auto"
          >
            {isEnglish ? "Log in" : "Zaloguj się"}
          </NextLink>
          <NextLink
            href="/auth/register"
            className="group relative inline-flex h-10 w-full items-center justify-center overflow-hidden rounded-full border border-violet-500/20 bg-gradient-to-r from-violet-600 via-indigo-600 to-sky-500 px-5 text-[13px] font-bold text-white shadow-md shadow-violet-500/20 transition duration-200 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-violet-500/25 lg:w-auto"
          >
            <span className="absolute inset-0 translate-x-[-120%] bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-[120%]" />
            <span className="relative">{isEnglish ? "Start for free" : "Rozpocznij za darmo"}</span>
          </NextLink>
        </div>
      }
    />
  );
}
