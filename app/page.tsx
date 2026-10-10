import HeroSectionV2 from "@/components/HeroSectionV2";
import SiteNavigation from "@/components/SiteNavigation";
import IndustryTabsSection from "@/components/IndustryTabsSection";
import LandingLanguageLayer from "@/components/LandingLanguageLayer";
import SiteFooter from "@/components/SiteFooter";
import ZonvioEcosystemSection from "@/components/ZonvioEcosystemSection";

export default function Home() {
  return (
    <LandingLanguageLayer>
      <div id="top" className="min-h-screen bg-white">
        <SiteNavigation />
        <main>
          <HeroSectionV2 />
          <IndustryTabsSection />
          <ZonvioEcosystemSection />
        </main>
        <SiteFooter />
      </div>
    </LandingLanguageLayer>
  );
}
