"use client";

import Image from "next/image";
import Link from "next/link";
import {
  CalendarCheckIcon,
  CheckCircle2Icon,
  DumbbellIcon,
  GraduationCapIcon,
  MegaphoneIcon,
  NetworkIcon,
  PaletteIcon,
  ShoppingBagIcon,
  SparklesIcon,
} from "lucide-react";

import FitlyLogoFull from "@/assets/logo/fitly-logo-full.svg";
import ZonvioLogoIcon from "@/assets/logo/zonvio-logo-icon-black.svg";
import Container from "@/components/Container";
import PageHeading from "@/components/PageHeading";

const modules = [
  {
    title: "Selly by Zonvio",
    subtitle: "Sprzedaż całego ekosystemu",
    description:
      "Zarządzaj produktami, zamówieniami, subskrypcjami, płatnościami i sprzedażą całego ekosystemu.",
    icon: ShoppingBagIcon,
    status: "Już działa",
    iconClassName: "text-violet-600",
  },
  {
    title: "Fitly by Zonvio",
    subtitle: "Moduł dla trenerów",
    description:
      "Prowadzenie podopiecznych, pakietów, planów treningowych i rozliczania wykonanych treningów.",
    icon: DumbbellIcon,
    status: "Już działa",
    href: "https://fitly.zonv.io",
    logo: FitlyLogoFull,
  },
  {
    title: "Socials by Zonvio",
    subtitle: "Marketing i social media",
    description:
      "Analiza profilu, pomysły i scenariusze rolek, kalendarz publikacji oraz połączenie treści ze sprzedażą.",
    icon: MegaphoneIcon,
    status: "Wkrótce dostępne",
    iconClassName: "text-violet-600",
  },
  {
    title: "Courses by Zonvio",
    subtitle: "Kursy i wiedza",
    description:
      "Kursy, lekcje, materiały premium, postępy uczestników i sprzedaż dostępu pod własną marką.",
    icon: GraduationCapIcon,
    status: "Wkrótce dostępne",
    iconClassName: "text-rose-600",
  },
  {
    title: "Creative by Zonvio",
    subtitle: "Projekty i agencje kreatywne",
    description:
      "Briefy, etapy projektu, prezentacja koncepcji, akceptacje klienta i bezpieczne przekazywanie plików.",
    icon: PaletteIcon,
    status: "Wkrótce dostępne",
    iconClassName: "text-fuchsia-600",
  },
  {
    title: "Booking by Zonvio",
    subtitle: "Terminy i płatności",
    description:
      "Rezerwacje wizyt, konsultacji, sesji online i usług z płatnością przed spotkaniem.",
    icon: CalendarCheckIcon,
    status: "Wkrótce dostępne",
    iconClassName: "text-blue-600",
  },
] as const;

const connectionPaths = [
  "M480 0V72C480 96 456 116 432 116H116C92 116 80 136 80 160V290",
  "M480 0V72C480 96 462 116 438 116H276C252 116 240 136 240 160V290",
  "M480 0V72C480 96 468 116 444 116H436C412 116 400 136 400 160V290",
  "M480 0V72C480 96 492 116 516 116H524C548 116 560 136 560 160V290",
  "M480 0V72C480 96 498 116 522 116H684C708 116 720 136 720 160V290",
  "M480 0V72C480 96 504 116 528 116H844C868 116 880 136 880 160V290",
] as const;

const ModuleCard = ({ module }: { module: (typeof modules)[number] }) => {
  const Icon = module.icon;
  const isActive = module.status === "Już działa";
  const hasLogo = "logo" in module && module.logo;
  const content = (
    <>
      <div
        className={`mb-4 flex items-center justify-center rounded-xl ${
          hasLogo
            ? "h-12 w-28 border border-slate-200 bg-white px-3 shadow-sm"
            : "h-12 w-12 border border-slate-200 bg-white shadow-sm"
        }`}
      >
        {hasLogo ? (
          <Image
            src={module.logo}
            alt=""
            className="h-auto w-full"
            aria-hidden="true"
          />
        ) : (
          <Icon
            className={`h-5 w-5 ${
              "iconClassName" in module ? module.iconClassName : ""
            }`}
          />
        )}
      </div>
      <div className="mb-3 flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold ${
            isActive
              ? "border-lime-200 bg-lime-50 text-lime-700"
              : "border-slate-200 bg-slate-50 text-slate-600"
          }`}
        >
          {isActive && <CheckCircle2Icon className="h-3.5 w-3.5" />}
          {module.status}
        </span>
      </div>
      <p className="text-base font-semibold text-slate-950">{module.title}</p>
      <p className="mt-1 text-sm font-medium text-slate-500">
        {module.subtitle}
      </p>
      <p className="mt-3 text-sm leading-6 text-slate-600">
        {module.description}
      </p>
      {"href" in module && module.href && (
        <span className="mt-4 inline-flex text-sm font-semibold text-slate-950">
          Zobacz działający moduł
        </span>
      )}
    </>
  );

  if ("href" in module && module.href) {
    return (
      <Link
        href={module.href}
        target="_blank"
        rel="noreferrer"
        className="relative z-10 flex h-full flex-col rounded-2xl border border-violet-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-violet-300 hover:shadow-lg hover:shadow-violet-100"
      >
        {content}
      </Link>
    );
  }

  return (
    <div className="relative z-10 flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-violet-200 hover:shadow-lg hover:shadow-violet-100">
      {content}
    </div>
  );
};

export default function ZonvioEcosystemSection() {
  return (
    <section className="relative w-full overflow-hidden bg-slate-50 py-20 lg:py-28">
      <div
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          backgroundImage:
            "linear-gradient(rgba(99, 102, 241, 0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(99, 102, 241, 0.08) 1px, transparent 1px)",
          backgroundSize: "24px 24px",
          maskImage:
            "linear-gradient(to bottom, transparent, black 14%, black 86%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent, black 14%, black 86%, transparent)",
        }}
      />
      <Container className="relative z-10 px-6 xl:px-0">
        <PageHeading
          title="Jeden fundament. Moduły dopasowane do Twojego biznesu."
          headerType="h2"
          description="Zonvio łączy dane, sprzedaż, klientów i procesy. Do wspólnej infrastruktury dobierasz wyspecjalizowane moduły, które odpowiadają sposobowi pracy Twojej branży."
          badgeType="default"
          badgeText="Ekosystem"
          position="center"
        />

        <div className="relative mx-auto mt-14 max-w-7xl">
          <svg
            className="pointer-events-none absolute left-1/2 top-32 z-0 hidden h-36 w-full -translate-x-1/2 xl:block"
            viewBox="0 0 960 290"
            fill="none"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="zonvio-ecosystem-line"
                x1="480"
                y1="0"
                x2="480"
                y2="290"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#C7D2FE" stopOpacity="0.28" />
                <stop offset="0.45" stopColor="#818CF8" stopOpacity="0.72" />
                <stop offset="1" stopColor="#6366F1" stopOpacity="0.5" />
              </linearGradient>
              <linearGradient
                id="zonvio-ecosystem-flow"
                x1="0"
                y1="0"
                x2="960"
                y2="290"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4F46E5" stopOpacity="0" />
                <stop offset="0.22" stopColor="#4F46E5" />
                <stop offset="0.56" stopColor="#6366F1" />
                <stop offset="0.82" stopColor="#A5B4FC" />
                <stop offset="1" stopColor="#A5B4FC" stopOpacity="0" />
              </linearGradient>
            </defs>
            {connectionPaths.map((path) => (
              <path
                key={`base-${path}`}
                d={path}
                stroke="white"
                strokeWidth="6"
                strokeLinecap="round"
              />
            ))}
            {connectionPaths.map((path) => (
              <path
                key={`line-${path}`}
                d={path}
                stroke="url(#zonvio-ecosystem-line)"
                strokeWidth="1"
                strokeLinecap="round"
                opacity="0.75"
              />
            ))}
            {connectionPaths.map((path, index) => (
              <path
                key={`flow-${path}`}
                d={path}
                stroke="url(#zonvio-ecosystem-flow)"
                strokeWidth="1"
                strokeLinecap="round"
                strokeDasharray="96 388"
                strokeDashoffset="0"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="-484"
                  dur="4.8s"
                  begin={`${index * 0.35}s`}
                  repeatCount="indefinite"
                />
              </path>
            ))}
          </svg>

          <div className="relative z-10 mx-auto max-w-xl rounded-2xl border border-slate-200 bg-white p-1 shadow-sm">
            <div className="rounded-[15px] bg-slate-950 p-6 text-white">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-white">
                  <Image
                    src={ZonvioLogoIcon}
                    alt=""
                    className="h-10 w-10"
                    aria-hidden="true"
                  />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-xl font-bold">Zonvio</p>
                    <span className="inline-flex items-center gap-1 rounded-full border border-white/15 bg-white/10 px-2.5 py-1 text-xs font-semibold text-lime-200">
                      <NetworkIcon className="h-3.5 w-3.5" />
                      infrastruktura biznesu
                    </span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-white/70">
                    Jedna baza dla sprzedaży online, płatności, produktów,
                    klientów, zespołów, plików i integracji.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <svg
            className="relative z-10 mx-auto mt-8 h-12 w-4 xl:hidden"
            viewBox="0 0 16 48"
            fill="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient
                id="zonvio-ecosystem-mobile-flow"
                x1="8"
                y1="0"
                x2="8"
                y2="48"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4F46E5" stopOpacity="0" />
                <stop offset="0.35" stopColor="#4F46E5" />
                <stop offset="0.68" stopColor="#6366F1" />
                <stop offset="1" stopColor="#A5B4FC" stopOpacity="0" />
              </linearGradient>
            </defs>
            <path
              d="M8 2V46"
              stroke="#C7D2FE"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
            <path
              d="M8 2V46"
              stroke="url(#zonvio-ecosystem-mobile-flow)"
              strokeWidth="1"
              strokeLinecap="round"
              strokeDasharray="22 44"
            >
              <animate
                attributeName="stroke-dashoffset"
                from="0"
                to="-66"
                dur="2.8s"
                repeatCount="indefinite"
              />
            </path>
          </svg>

          <div className="relative z-10 mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:mt-36 xl:grid-cols-6">
            {modules.map((module) => (
              <ModuleCard key={module.title} module={module} />
            ))}
          </div>

          <div className="mt-8 flex justify-center">
            <div className="inline-flex max-w-3xl items-start gap-3 rounded-xl border border-slate-200 bg-white px-5 py-4 text-left shadow-sm">
              <SparklesIcon className="mt-0.5 h-5 w-5 shrink-0 text-lime-600" />
              <p className="text-sm leading-6 text-slate-600">
                Każdy moduł może korzystać z tego samego fundamentu Zonvio, ale
                odpowiada na inny sposób pracy: prowadzenie klientów, marketing,
                projekty kreatywne, kursy lub rezerwacje.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
