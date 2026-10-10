import Link from "next/link";
import type { ReactNode } from "react";
import Container from "@/components/Container";

type FooterLink = {
  name: string;
  href: string;
};

type FooterSocialMedia = {
  icon: ReactNode;
  href: string;
};

type FooterProps = {
  footerText: string;
  socialMedia?: FooterSocialMedia[];
  links?: FooterLink[];
};

export default function Footer({ footerText, socialMedia, links }: FooterProps) {
  return (
    <footer className="w-full border-t border-slate-800 bg-slate-950 px-4 py-7">
      <Container className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <span className="text-sm font-medium text-white">{footerText}</span>
        {socialMedia && (
          <ul className="flex items-center justify-start gap-4">
            {socialMedia.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-base font-normal text-white transition hover:text-violet-200"
              >
                {item.icon}
              </Link>
            ))}
          </ul>
        )}
        {links && (
          <ul className="flex flex-col gap-2 md:flex-row md:items-center md:justify-start md:gap-5">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-semibold text-white transition hover:text-violet-200"
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </Container>
    </footer>
  );
}
