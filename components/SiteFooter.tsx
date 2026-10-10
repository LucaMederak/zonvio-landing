"use client";

import Footer from "@/components/Footer";
import { useLandingLocale } from "@/lib/landingLocale";

export default function SiteFooter() {
  const isEnglish = useLandingLocale() === "en";

  return (
    <Footer
      footerText={`Copyright © ${new Date().getFullYear()} Zonvio`}
      links={[
        {
          name: isEnglish ? "Documentation" : "Dokumentacja",
          href: isEnglish ? "/en/documentation" : "/documentation",
        },
        {
          name: isEnglish ? "Terms" : "Regulamin",
          href: isEnglish ? "/en/terms-and-conditions" : "/terms-and-conditions",
        },
        {
          name: isEnglish ? "Privacy policy" : "Polityka prywatności",
          href: isEnglish ? "/en/privacy-policy" : "/privacy-policy",
        },
      ]}
    />
  );
}
