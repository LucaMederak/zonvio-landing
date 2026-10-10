"use client";

import {
  useEffect,
  useState,
  type ComponentProps,
  type ReactNode,
} from "react";
import Image, { type StaticImageData } from "next/image";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { Link } from "react-scroll";
import { AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { twMerge } from "tailwind-merge";
import Portal from "@/components/Portal";
import LogoText from "@/components/LogoText";
import { useLandingLocale } from "@/lib/landingLocale";

export type INavigationLink = {
  title: string;
  href: string;
  type: "scroll" | "page";
};

type NavigationV2Props = {
  className?: ComponentProps<"nav">["className"];
  logoURL?: StaticImageData | string;
  logoLink: string;
  links?: INavigationLink[];
  options?: ReactNode;
};

function NavigationLink({
  pathname,
  locale,
  link,
  onClick,
}: {
  pathname: string;
  locale: "pl" | "en";
  link: INavigationLink;
  onClick?: () => void;
}) {
  const className =
    "cursor-pointer text-[13px] font-semibold text-slate-600 transition-colors hover:text-violet-700";

  if (link.type === "scroll") {
    const homePath = locale === "en" ? "/en" : "/";
    if (pathname === homePath) {
      return (
        <Link
          className={className}
          to={link.href}
          smooth
          spy
          offset={-110}
          duration={400}
          onClick={onClick}
        >
          {link.title}
        </Link>
      );
    }

    return (
      <NextLink
        href={`${homePath}#${link.href}`}
        className={className}
        onClick={onClick}
      >
        {link.title}
      </NextLink>
    );
  }

  return (
    <NextLink
      href={`${locale === "en" ? "/en" : ""}/${link.href}`}
      className={className}
      onClick={onClick}
    >
      {link.title}
    </NextLink>
  );
}

export default function NavigationV2({
  className,
  logoURL,
  logoLink,
  links,
  options,
}: NavigationV2Props) {
  const pathname = usePathname();
  const locale = useLandingLocale();
  const localizedContentPath =
    pathname.startsWith("/oferta") ||
    pathname.startsWith("/blog") ||
    pathname === "/cennik" ||
    pathname === "/documentation" ||
    pathname === "/terms-and-conditions" ||
    pathname === "/privacy-policy";
  const englishLocalizedContentPath =
    pathname.startsWith("/en/oferta") ||
    pathname.startsWith("/en/blog") ||
    pathname === "/en/cennik" ||
    pathname === "/en/documentation" ||
    pathname === "/en/terms-and-conditions" ||
    pathname === "/en/privacy-policy";
  const polishLanguagePath = englishLocalizedContentPath
    ? pathname.replace(/^\/en/, "")
    : "/";
  const englishLanguagePath = localizedContentPath ? `/en${pathname}` : "/en";
  const [navOpen, setNavOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={twMerge(
        "fixed left-0 top-0 z-40 w-full px-4 pb-4 pt-6 transition-all duration-300",
        className,
      )}
    >
      <div
        className={twMerge(
          "mx-auto flex w-full max-w-5xl items-center justify-between rounded-full border px-5 py-2 transition-all duration-300 md:px-6 lg:px-7",
          isScrolled
            ? "border-white/55 bg-white/35 shadow-lg shadow-violet-950/5 backdrop-blur-xl"
            : "border-white/70 bg-white/65 shadow-xl shadow-violet-950/5",
        )}
      >
        <NextLink
          href={logoLink}
          aria-label="Zonvio — strona główna"
          className="flex shrink-0 items-center gap-2.5 rounded-full pr-2"
        >
          {logoURL && (
            <Image
              src={logoURL}
              width={36}
              height={36}
              alt=""
              className="h-9 w-9"
            />
          )}
          <LogoText className="hidden text-xl sm:block" />
        </NextLink>

        {links && (
          <ul
            className={twMerge(
              "hidden items-center gap-1 rounded-full border px-2 py-1.5 transition-colors lg:flex",
              "border-violet-200/60 bg-violet-500/[0.08]",
              isScrolled && "backdrop-blur-md",
            )}
          >
            {links.map((link) => (
              <li
                key={`${link.type}-${link.href}`}
                className={twMerge(
                  "rounded-full px-3 py-1.5 transition-colors",
                  isScrolled ? "hover:bg-white" : "hover:bg-white/10",
                )}
              >
                <NavigationLink
                  pathname={pathname}
                  locale={locale}
                  link={link}
                />
              </li>
            ))}
          </ul>
        )}

        <div className="hidden items-center gap-3 lg:flex">
          <div className="flex items-center rounded-full border border-violet-200/70 bg-violet-50/80 p-1 text-[11px] font-bold">
            <NextLink
              href={polishLanguagePath}
              aria-label="Polska wersja językowa"
              className={`rounded-full px-2.5 py-1 transition ${locale === "pl" ? "bg-white text-violet-700 shadow-sm" : "text-slate-400 hover:text-slate-700"}`}
            >
              PL
            </NextLink>
            <NextLink
              href={englishLanguagePath}
              aria-label="English language version"
              className={`rounded-full px-2.5 py-1 transition ${locale === "en" ? "bg-white text-violet-700 shadow-sm" : "text-slate-400 hover:text-slate-700"}`}
            >
              EN
            </NextLink>
          </div>
          {options}
        </div>

        <button
          type="button"
          onClick={() => setNavOpen(true)}
          aria-label="Otwórz menu"
          className="grid h-10 w-10 place-items-center rounded-full border border-slate-200 bg-slate-50 text-slate-800 transition hover:border-violet-200 hover:bg-violet-50 lg:hidden"
        >
          <Menu className="h-5 w-5" />
        </button>
      </div>

      <AnimatePresence>
        {navOpen && (
          <Portal
            portalContainerClassName="flex justify-end"
            className="flex min-h-screen w-[min(88vw,360px)] flex-col bg-white shadow-2xl"
            onClose={() => setNavOpen(false)}
          >
            <div className="flex items-center justify-between border-b border-slate-100 p-5">
              <NextLink
                href={logoLink}
                onClick={() => setNavOpen(false)}
                className="flex items-center gap-2.5"
              >
                {logoURL && (
                  <Image src={logoURL} width={38} height={38} alt="" />
                )}
                <LogoText className="text-xl" />
              </NextLink>
              <button
                type="button"
                onClick={() => setNavOpen(false)}
                aria-label="Zamknij menu"
                className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-slate-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {links && (
              <ul className="flex flex-col gap-1 p-5">
                {links.map((link) => (
                  <li
                    key={`${link.type}-${link.href}`}
                    className="rounded-2xl px-4 py-3 hover:bg-violet-50"
                  >
                    <NavigationLink
                      pathname={pathname}
                      locale={locale}
                      link={link}
                      onClick={() => setNavOpen(false)}
                    />
                  </li>
                ))}
              </ul>
            )}

            <div className="mt-auto border-t border-slate-100 p-5">
              <div className="mb-4 flex items-center rounded-full border border-violet-200 bg-violet-50 p-1 text-xs font-bold">
                <NextLink
                  href={polishLanguagePath}
                  onClick={() => setNavOpen(false)}
                  className={`flex-1 rounded-full px-3 py-2 text-center ${locale === "pl" ? "bg-white text-violet-700 shadow-sm" : "text-slate-400"}`}
                >
                  PL
                </NextLink>
                <NextLink
                  href={englishLanguagePath}
                  onClick={() => setNavOpen(false)}
                  className={`flex-1 rounded-full px-3 py-2 text-center ${locale === "en" ? "bg-white text-violet-700 shadow-sm" : "text-slate-400"}`}
                >
                  EN
                </NextLink>
              </div>
              {options}
            </div>
          </Portal>
        )}
      </AnimatePresence>
    </nav>
  );
}
