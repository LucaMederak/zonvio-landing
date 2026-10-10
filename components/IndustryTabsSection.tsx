"use client";

import { useState } from "react";
import Image, { type StaticImageData } from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Calculator,
  Camera,
  Check,
  Code,
  Dumbbell,
  GraduationCap,
  HeartPulse,
  Lightbulb,
  Megaphone,
  Palette,
  Sparkles,
  Video,
  type LucideIcon,
} from "lucide-react";
import Container from "@/components/Container";
import TrainerImage from "@/assets/proffesion/trainer.jpeg";
import DieticianImage from "@/assets/proffesion/dietician.jpeg";
import CreatorImage from "@/assets/proffesion/youtuber.jpeg";
import TiktokImage from "@/assets/proffesion/tiktoker.jpeg";
import TeacherImage from "@/assets/proffesion/tutor.jpeg";
import DesignerImage from "@/assets/proffesion/graphic-designer.jpeg";
import DeveloperImage from "@/assets/proffesion/programmer.jpeg";
import PhotographerImage from "@/assets/proffesion/photographer.jpeg";
import AccountantImage from "@/assets/proffesion/accountant.jpeg";
import EntrepreneurImage from "@/assets/proffesion/entrepreneur.jpeg";

type Industry = {
  id: string;
  label: string;
  title: string;
  description: string;
  image: StaticImageData;
  imagePosition?: string;
  icon: LucideIcon;
  slug: string;
  uses: string[];
  modules: string[];
};

const industries: Industry[] = [
  {
    id: "marketing-agency",
    label: "Agencja marketingowa",
    title: "Zarządzaj klientami, kampaniami i raportami w jednym systemie",
    description:
      "Połącz proces sprzedaży, onboarding, realizację kampanii i raportowanie. Klient widzi postępy w swoim panelu, a zespół pracuje według ustalonego workflow.",
    image: EntrepreneurImage,
    icon: Megaphone,
    slug: "inny-przedsiebiorca",
    uses: [
      "Leady, oferty i onboarding nowych klientów",
      "Kampanie, zadania oraz cykliczne raporty",
      "Agent AI analizujący wyniki i przygotowujący podsumowania",
    ],
    modules: ["CRM", "Projekty", "Raporty", "Agent AI", "Workflow"],
  },
  {
    id: "creative-agency",
    label: "Agencja kreatywna",
    title: "Prowadź projekty kreatywne od briefu do finalnej akceptacji",
    description:
      "Zbieraj briefy, prezentuj koncepcje i prowadź akceptacje w strefie klienta. Uporządkuj pliki, feedback, terminy i pracę całego zespołu.",
    image: DesignerImage,
    icon: Palette,
    slug: "inny-przedsiebiorca",
    uses: [
      "Briefy i automatyczne tworzenie projektu",
      "Prezentacja koncepcji oraz akceptacje klienta",
      "Wersjonowanie plików, komentarze i przekazanie materiałów",
    ],
    modules: ["Projekty", "Panel klienta", "Pliki", "Formularze", "Workflow"],
  },
  {
    id: "trainer",
    label: "Trener",
    title: "Prowadź podopiecznych i sprzedawaj plany pod własną marką",
    description:
      "Połącz aplikację dla podopiecznych, plany treningowe, pomiary progresu, płatności i kontakt z trenerem w jeden spójny system.",
    image: TrainerImage,
    icon: Dumbbell,
    slug: "trener-personalny",
    uses: [
      "Plany treningowe i monitoring progresu",
      "Pakiety, subskrypcje i płatności",
      "Agent AI analizujący aktywność podopiecznych",
    ],
    modules: ["Fitly", "Płatności", "Kalendarz", "Agent AI", "CRM"],
  },
  {
    id: "dietician",
    label: "Dietetyk",
    title: "Zbuduj cyfrowy gabinet i opiekę dietetyczną online",
    description:
      "Zbieraj ankiety, udostępniaj jadłospisy i materiały, umawiaj konsultacje oraz automatyzuj opiekę między wizytami.",
    image: DieticianImage,
    icon: HeartPulse,
    slug: "dietetyk",
    uses: [
      "Panel klienta z zaleceniami i materiałami",
      "Konsultacje, formularze i przypomnienia",
      "Sprzedaż diet, e-booków i programów opieki",
    ],
    modules: ["Panel klienta", "Formularze", "Kalendarz", "Sklep", "Workflow"],
  },
  {
    id: "creator",
    label: "YouTuber",
    title:
      "Zamień społeczność w biznes niezależny od platform społecznościowych",
    description:
      "Sprzedawaj dostęp do treści, kursów i społeczności premium we własnej aplikacji, sklepie i serwisie pod własną marką.",
    image: CreatorImage,
    imagePosition: "object-center",
    icon: Megaphone,
    slug: "youtuber",
    uses: [
      "Treści premium i płatna społeczność",
      "Kursy, webinary i produkty cyfrowe",
      "Automatyczny onboarding nowych członków",
    ],
    modules: ["Courses", "Community", "Sklep", "Subskrypcje", "Newsletter"],
  },
  {
    id: "tiktok",
    label: "Twórca TikTok",
    title: "Monetyzuj zasięgi i buduj społeczność poza social mediami",
    description:
      "Kieruj odbiorców do własnego sklepu, aplikacji i strefy premium, w której sprzedajesz wiedzę, materiały oraz dostęp do społeczności.",
    image: TiktokImage,
    icon: Video,
    slug: "tiktok-creator",
    uses: [
      "Szybkie landing pages dla kampanii i premier",
      "Materiały premium, kursy i subskrypcje",
      "Automatyczne nadawanie dostępu po zakupie",
    ],
    modules: ["Landing pages", "Sklep", "Community", "Courses", "Workflow"],
  },
  {
    id: "teacher",
    label: "Edukator",
    title: "Ucz, organizuj zajęcia i skaluj swoją wiedzę",
    description:
      "Połącz rezerwacje lekcji, materiały, kursy i płatności. Ucz indywidualnie lub twórz ofertę dostępną dla setek klientów.",
    image: TeacherImage,
    icon: GraduationCap,
    slug: "nauczyciel-korepetytor",
    uses: [
      "Kalendarz zajęć i cykliczne płatności",
      "Kursy, zadania i biblioteka materiałów",
      "Panel postępów każdego uczestnika",
    ],
    modules: ["Courses", "Kalendarz", "Płatności", "Materiały", "CRM"],
  },
  {
    id: "designer",
    label: "Grafik",
    title: "Prezentuj portfolio, obsługuj zlecenia i sprzedawaj projekty",
    description:
      "Twoja strona, sklep i strefa klienta mogą działać razem — od pierwszego zapytania aż po przekazanie gotowych plików.",
    image: DesignerImage,
    icon: Sparkles,
    slug: "grafik-projektant",
    uses: [
      "Portfolio i formularz briefu",
      "Akceptacja etapów oraz plików projektu",
      "Sprzedaż szablonów, usług i licencji",
    ],
    modules: ["Strona", "Projekty", "Pliki", "Sklep", "Workflow"],
  },
  {
    id: "developer",
    label: "Programista",
    title: "Sprzedawaj oprogramowanie, wiedzę i dostęp w jednym miejscu",
    description:
      "Uruchom stronę produktu, płatności, licencje i panel użytkownika. Dodaj własne funkcje lub zintegruj Zonvio ze swoim API.",
    image: DeveloperImage,
    icon: Code,
    slug: "programista",
    uses: [
      "Sprzedaż aplikacji, licencji i subskrypcji",
      "Kursy, dokumentacja i płatny dostęp",
      "Automatyczne procesy po zakupie produktu",
    ],
    modules: ["Subskrypcje", "Licencje", "Courses", "API", "Workflow"],
  },
  {
    id: "photographer",
    label: "Fotograf",
    title: "Połącz portfolio, rezerwacje i obsługę sesji",
    description:
      "Klient może poznać ofertę, zarezerwować termin, opłacić sesję i odebrać materiały w jednej spójnej przestrzeni pod Twoją marką.",
    image: PhotographerImage,
    icon: Camera,
    slug: "fotograf",
    uses: [
      "Portfolio, pakiety i rezerwacja terminów",
      "Formularze przygotowujące klienta do sesji",
      "Bezpieczne galerie oraz przekazywanie plików",
    ],
    modules: ["Strona", "Kalendarz", "Płatności", "Galerie", "Panel klienta"],
  },
  {
    id: "accountant",
    label: "Księgowy",
    title: "Stwórz bezpieczną strefę współpracy z klientami",
    description:
      "Uporządkuj dokumenty, zadania, terminy i komunikację. Każdy klient otrzymuje własny panel, a zespół pracuje według jednego procesu.",
    image: AccountantImage,
    icon: Calculator,
    slug: "ksiegowy",
    uses: [
      "Panel klienta i bezpieczny obieg dokumentów",
      "Cykliczne zadania, terminy i przypomnienia",
      "Agent AI wspierający analizę i komunikację",
    ],
    modules: ["Dokumenty", "Zadania", "CRM", "Agent AI", "Workflow"],
  },
  {
    id: "business",
    label: "Firma usługowa",
    title: "Ułóż własny proces sprzedaży i obsługi klienta",
    description:
      "Zbuduj system dopasowany do sposobu pracy Twojej firmy: od pozyskania leada, przez ofertę i płatność, po realizację usługi.",
    image: EntrepreneurImage,
    icon: Lightbulb,
    slug: "inny-przedsiebiorca",
    uses: [
      "CRM, oferty i panel klienta",
      "Automatyczne zadania i komunikacja",
      "Własne funkcje oraz agent AI dla zespołu",
    ],
    modules: ["CRM", "Projekty", "Płatności", "Agent AI", "Workflow"],
  },
];

export default function IndustryTabsSection() {
  const [activeId, setActiveId] = useState(industries[0].id);
  const activeIndustry =
    industries.find((industry) => industry.id === activeId) ?? industries[0];
  const ActiveIcon = activeIndustry.icon;

  return (
    <section
      id="benefit"
      className="overflow-hidden bg-white pb-20 pt-10 lg:pb-28 lg:pt-14"
    >
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-3 py-1.5 text-xs font-bold text-violet-700 sm:text-sm">
            <Sparkles className="h-4 w-4" />
            Zonvio dla Twojej branży
          </div>
          <h2 className="text-[28px] font-semibold tracking-[-0.025em] text-slate-950 sm:text-4xl lg:text-[42px]">
            Jeden ekosystem. Wiele sposobów wykorzystania.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 sm:text-lg">
            Wybierz branżę i zobacz, jak aplikacja, platforma oraz moduły Zonvio
            mogą wspierać Twój model pracy i sprzedaży.
          </p>
        </div>

        <div className="relative mt-10">
          <div className="flex gap-2 overflow-x-auto pb-2 pr-20 scrollbar-hide">
            {industries.map((industry) => {
              const Icon = industry.icon;
              const isActive = industry.id === activeIndustry.id;

              return (
                <button
                  key={industry.id}
                  type="button"
                  onClick={() => setActiveId(industry.id)}
                  className={`flex min-w-fit items-center gap-2 rounded-full border px-4 py-2.5 text-sm font-bold transition-all ${
                    isActive
                      ? "border-violet-300 bg-violet-100 text-violet-800 shadow-sm"
                      : "border-slate-200 bg-white text-slate-600 hover:border-violet-200 hover:bg-violet-50"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {industry.label}
                </button>
              );
            })}
          </div>
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-white via-white/85 to-transparent backdrop-blur-[2px]"
          />
        </div>

        <div
          key={activeIndustry.id}
          className="mt-6 grid overflow-hidden rounded-[28px] border border-violet-100 bg-[linear-gradient(135deg,rgba(245,243,255,0.9),rgba(255,255,255,1)_55%,rgba(240,249,255,0.9))] shadow-[0_30px_80px_-45px_rgba(76,29,149,0.45)] lg:grid-cols-[0.88fr_1.12fr]"
        >
          <div className="relative min-h-[300px] overflow-hidden lg:min-h-[520px]">
            <Image
              src={activeIndustry.image}
              alt={activeIndustry.label}
              fill
              priority={activeIndustry.id === industries[0].id}
              className={`object-cover ${activeIndustry.imagePosition ?? "object-center"}`}
              sizes="(min-width: 1024px) 42vw, 100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/55 via-transparent to-transparent" />
            <div className="absolute bottom-5 left-5 right-5 rounded-2xl border border-white/30 bg-white/15 p-4 text-white backdrop-blur-md sm:bottom-7 sm:left-7 sm:right-auto sm:max-w-xs">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-white/70">
                Przykładowy ekosystem
              </p>
              <p className="mt-1 font-bold">
                Strona, aplikacja i panel działające pod Twoją marką
              </p>
            </div>
          </div>

          <div className="flex flex-col justify-center p-6 sm:p-9 lg:p-12">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-violet-600 text-white shadow-lg shadow-violet-200">
              <ActiveIcon className="h-6 w-6" />
            </div>
            <h3 className="mt-6 text-2xl font-semibold leading-tight tracking-[-0.015em] text-slate-950 sm:text-[28px]">
              {activeIndustry.title}
            </h3>
            <p className="mt-4 leading-relaxed text-slate-600">
              {activeIndustry.description}
            </p>

            <div className="mt-6 space-y-3">
              {activeIndustry.uses.map((use) => (
                <div key={use} className="flex items-start gap-3">
                  <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-emerald-100 text-emerald-700">
                    <Check className="h-3.5 w-3.5" />
                  </span>
                  <span className="text-sm font-semibold text-slate-700 sm:text-base">
                    {use}
                  </span>
                </div>
              ))}
            </div>

            <div className="mt-7">
              <p className="text-xs font-bold uppercase tracking-[0.15em] text-slate-400">
                Polecane moduły
              </p>
              <div className="mt-3 flex flex-wrap gap-2">
                {activeIndustry.modules.map((module) => (
                  <span
                    key={module}
                    className="rounded-full border border-violet-200 bg-white/80 px-3 py-1.5 text-xs font-bold text-violet-700"
                  >
                    {module}
                  </span>
                ))}
              </div>
            </div>

            <Link
              href={`/oferta/${activeIndustry.slug}`}
              className="group mt-8 inline-flex w-fit items-center gap-2 text-sm font-bold text-violet-700 transition hover:text-violet-900"
            >
              Zobacz ofertę dla tej branży
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
