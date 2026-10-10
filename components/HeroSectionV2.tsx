"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  Bot,
  Boxes,
  CalendarDays,
  Check,
  CreditCard,
  Globe2,
  Instagram,
  LayoutDashboard,
  Play,
  Smartphone,
  Sparkles,
  Store,
  Users,
  Wrench,
  Workflow,
} from "lucide-react";
import Container from "@/components/Container";
import FitlyLogo from "@/assets/logo/fitly-logo-full.svg";
import ZonvioLogoIcon from "@/assets/logo/zonvio-logo-icon-black.svg";
import ZonvioGradientIcon from "@/assets/logo/zonvio-logo-icon-hero-gradient.svg";
import { useLandingLocale } from "@/lib/landingLocale";

const views = [
  { id: "app", label: "Aplikacja", icon: Smartphone },
  { id: "platform", label: "Platforma", icon: LayoutDashboard },
  { id: "shop", label: "Sklep", icon: Store },
  { id: "website", label: "Strona", icon: Globe2 },
] as const;

type ViewId = (typeof views)[number]["id"];

const features = [
  { id: "modules", label: "Moduły", icon: Boxes },
  { id: "ai", label: "Agent AI", icon: Bot },
  {
    id: "custom",
    label: "Własne funkcje",
    icon: Wrench,
  },
  {
    id: "workflow",
    label: "Workflow",
    icon: Workflow,
  },
] as const;

type FeatureId = (typeof features)[number]["id"];

const modules = [
  {
    id: "selly",
    name: "Selly",
    category: "Sprzedaż i płatności",
    shortName: "S",
    clientActivity: "Nowe zamówienie",
    product: "Produkt lub usługa",
    headline: "Sprzedawaj produkty, usługi i subskrypcje w jednym miejscu",
  },
  {
    id: "fitly",
    name: "Fitly",
    category: "Trening i prowadzenie online",
    shortName: "F",
    logo: FitlyLogo,
    clientActivity: "Plan treningowy",
    product: "Prowadzenie online",
    headline: "Prowadź klientów i rozwijaj biznes fitness",
  },
  {
    id: "socials",
    name: "Socials",
    category: "Marketing i social media",
    shortName: "S",
    clientActivity: "Plan publikacji",
    product: "Kampania Social Media",
    headline: "Twórz treści, rozwijaj zasięg i zamieniaj go w sprzedaż",
  },
  {
    id: "creative",
    name: "Creative",
    category: "Projekty i agencje kreatywne",
    shortName: "C",
    clientActivity: "Akceptacja projektu",
    product: "Pakiet Kreatywny",
    headline: "Prowadź projekty od briefu do finalnej akceptacji",
  },
  {
    id: "courses",
    name: "Courses",
    category: "Kursy i wiedza",
    shortName: "C",
    clientActivity: "Nowa lekcja",
    product: "Kurs Premium",
    headline: "Sprzedawaj wiedzę i buduj własną akademię",
  },
  {
    id: "booking",
    name: "Booking",
    category: "Wizyty i rezerwacje",
    shortName: "B",
    clientActivity: "Najbliższa wizyta",
    product: "Konsultacja 1:1",
    headline: "Przyjmuj rezerwacje bez zbędnych wiadomości",
  },
] as const;

type Module = (typeof modules)[number];

const customFunctionDemos = [
  {
    prompt:
      "Po zakupie pokaż klientowi animowane podziękowanie i od razu udostępnij materiały.",
    code: `onPurchase(() => {\n  showThankYou({ animation: "confetti" })\n  grantAccess("materials")\n})`,
    emoji: "🎉",
    title: "Dziękujemy, Anno!",
    message: "Zakup potwierdzony. Materiały już na Ciebie czekają.",
  },
  {
    prompt:
      "Po ukończeniu kursu wygeneruj certyfikat i pokaż klientowi gratulacje.",
    code: `onCourseComplete(() => {\n  generateCertificate()\n  showCelebration("success")\n})`,
    emoji: "🏆",
    title: "Kurs ukończony!",
    message: "Gratulacje! Twój certyfikat jest gotowy do pobrania.",
  },
  {
    prompt:
      "Gdy klient osiągnie cel, pokaż jego wynik i odblokuj specjalną nagrodę.",
    code: `onGoalReached(() => {\n  showProgress()\n  unlockReward("special")\n})`,
    emoji: "🚀",
    title: "Cel osiągnięty!",
    message: "Świetna robota! Odblokowaliśmy dla Ciebie specjalną nagrodę.",
  },
] as const;

type CustomFunctionStage = "typing" | "coding" | "result";

const CustomDemoContext = createContext<{
  demoIndex: number;
  stage: CustomFunctionStage;
}>({ demoIndex: 0, stage: "typing" });

const workflowDemos = [
  {
    prompt:
      "Po zakupie nadaj dostęp, wyślij onboarding i utwórz zadanie dla opiekuna.",
    steps: ["Zakup", "Dostęp", "Onboarding", "Zadanie"],
  },
  {
    prompt:
      "Gdy klient nie jest aktywny przez 14 dni, wyślij przypomnienie i zaplanuj kontakt.",
    steps: ["Brak aktywności", "Analiza", "E-mail", "Kontakt"],
  },
  {
    prompt:
      "Po ukończeniu programu wygeneruj raport, certyfikat i ofertę kolejnego etapu.",
    steps: ["Ukończenie", "Raport", "Certyfikat", "Oferta"],
  },
] as const;

const WorkflowDemoContext = createContext({
  demoIndex: 0,
  completedSteps: 0,
  running: false,
});

const aiDemos = [
  {
    prompt:
      "Przeanalizuj mój Instagram i utwórz okładki oraz opisy produktów do sklepu.",
    summary:
      "Przeanalizowałem styl profilu i przygotowałem spójne propozycje produktów.",
    scanned: 24,
    matched: 3,
    scannedLabel: "posty przeanalizowane",
    matchedLabel: "produkty utworzone",
    action: "Zobacz produkty",
  },
  {
    prompt:
      "Pokaż klientów, którym kończy się pakiet, i zaproponuj ofertę przedłużenia.",
    summary: "Wybrałem klientów z pakietem kończącym się w ciągu 14 dni.",
    scanned: 42,
    matched: 9,
    scannedLabel: "klientów przeanalizowanych",
    matchedLabel: "ofert do wysłania",
    action: "Utwórz ofertę",
  },
  {
    prompt:
      "Wybierz osoby bez kolejnej rezerwacji i przygotuj wiadomość przypominającą.",
    summary:
      "Znalazłem osoby bez kolejnego terminu i przygotowałem przypomnienie.",
    scanned: 31,
    matched: 8,
    scannedLabel: "klientów przeanalizowanych",
    matchedLabel: "wiadomości gotowych",
    action: "Wyślij przypomnienie",
  },
] as const;

const AiDemoContext = createContext({
  demoIndex: 0,
  running: false,
  scanned: 0,
  matched: 0,
});

const englishAiPrompts = [
  "Analyze my Instagram and create product covers and descriptions for my store.",
  "Show customers whose packages are ending and suggest a renewal offer.",
  "Find people without another booking and prepare a reminder message.",
] as const;

const englishCustomFunctionPrompts = [
  "After purchase, show the customer an animated thank-you and grant access to the materials immediately.",
  "After course completion, generate a certificate and congratulate the customer.",
  "When a customer reaches a goal, show their result and unlock a special reward.",
] as const;

const englishWorkflowPrompts = [
  "After purchase, grant access, send onboarding and create a task for the account manager.",
  "When a customer is inactive for 14 days, send a reminder and schedule follow-up.",
  "After program completion, generate a report, certificate and next-stage offer.",
] as const;

function RotatingBusinessSurface() {
  const locale = useLandingLocale();
  const polishSurfaces = [
    { label: "Twoja platforma.", afterLogo: "ja platforma.", accented: false },
    { label: "Twoja aplikacja.", afterLogo: "ja aplikacja.", accented: false },
    { label: "Twoja strona.", afterLogo: "ja strona.", accented: false },
    { label: "Twój sklep.", afterLogo: "j sklep.", accented: true },
    { label: "Twoja strefa.", afterLogo: "ja strefa.", accented: false },
    { label: "Twoja oferta.", afterLogo: "ja oferta.", accented: false },
    { label: "Twoje funkcje.", afterLogo: "je funkcje.", accented: false },
    { label: "Twoje produkty.", afterLogo: "je produkty.", accented: false },
    { label: "Twój system.", afterLogo: "j system.", accented: true },
    { label: "Twój brand.", afterLogo: "j brand.", accented: true },
    { label: "Twoja marka.", afterLogo: "ja marka.", accented: false },
  ];
  const englishLabels = [
    "Your platform.",
    "Your app.",
    "Your website.",
    "Your store.",
    "Your space.",
    "Your offer.",
    "Your features.",
    "Your products.",
    "Your system.",
    "Your brand.",
    "Your identity.",
  ];
  const surfaces =
    locale === "en"
      ? englishLabels.map((label) => ({
          label,
          afterLogo: label,
          accented: false,
        }))
      : polishSurfaces;
  const [surfaceIndex, setSurfaceIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let transitionTimeout: number | undefined;
    const interval = window.setInterval(() => {
      setVisible(false);
      transitionTimeout = window.setTimeout(() => {
        setSurfaceIndex((current) => (current + 1) % surfaces.length);
        setVisible(true);
      }, 320);
    }, 2400);

    return () => {
      window.clearInterval(interval);
      if (transitionTimeout) window.clearTimeout(transitionTimeout);
    };
  }, [surfaces.length]);

  return (
    <span
      aria-label={surfaces[surfaceIndex].label}
      className={`-mb-[0.12em] inline-block pb-[0.12em] bg-gradient-to-r from-violet-600 to-sky-500 bg-clip-text text-transparent transition-all duration-300 ${visible ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0"}`}
    >
      <span aria-hidden="true">
        {locale === "en" ? (
          surfaces[surfaceIndex].label
        ) : (
          <>
            Tw
            <span className="relative mx-[0.015em] inline-flex h-[0.5em] w-[0.5em] align-[0.01em]">
              <Image
                src={ZonvioGradientIcon}
                alt=""
                className="h-full w-full"
              />
              {surfaces[surfaceIndex].accented && (
                <span className="absolute -right-[0.02em] -top-[0.4em] bg-gradient-to-r from-violet-600 to-sky-500 bg-clip-text text-[0.42em] font-black leading-none text-transparent">
                  ´
                </span>
              )}
            </span>
            {surfaces[surfaceIndex].afterLogo}
          </>
        )}
      </span>
    </span>
  );
}

function AgentActivity({ module }: { module: Module }) {
  const { demoIndex, running, scanned, matched } = useContext(AiDemoContext);
  const demo = aiDemos[demoIndex];

  if (!running) return null;

  return (
    <div className="absolute inset-x-3 bottom-3 z-20 rounded-2xl border border-violet-200 bg-white/95 p-3 shadow-2xl shadow-violet-300/30 backdrop-blur sm:inset-x-auto sm:bottom-4 sm:right-4 sm:w-[285px]">
      <div className="flex items-start gap-2.5">
        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-xl bg-violet-600 text-white shadow-sm">
          {demoIndex === 0 ? (
            <Instagram className="h-4 w-4" />
          ) : (
            <Bot className="h-4 w-4" />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="text-[11px] font-bold text-slate-900">
              Agent relacji z klientami
            </p>
            <span className="flex items-center gap-1 text-[8px] font-bold text-emerald-600">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />{" "}
              Gotowe
            </span>
          </div>
          <p className="mt-1 text-[9px] leading-relaxed text-slate-500">
            {demo.summary} Analiza dotyczy modułu {module.name}.
          </p>
        </div>
      </div>
      {demoIndex === 0 && (
        <div className="mt-2.5 grid grid-cols-3 gap-1.5">
          {[
            ["Plan Pro", "from-violet-500 to-fuchsia-400"],
            ["Start Pack", "from-sky-500 to-cyan-300"],
            ["Premium", "from-amber-400 to-rose-400"],
          ].map(([title, gradient], index) => (
            <div
              key={title}
              className="hero-ai-product-card overflow-hidden rounded-lg border border-white bg-white shadow-sm"
              style={{ animationDelay: `${index * 180}ms` }}
            >
              <div className={`h-8 bg-gradient-to-br ${gradient}`} />
              <p className="truncate px-1.5 py-1 text-[7px] font-bold text-slate-700">
                {title}
              </p>
            </div>
          ))}
        </div>
      )}
      <div className="mt-2.5 grid grid-cols-2 gap-2">
        <div className="rounded-lg bg-slate-50 px-2.5 py-2">
          <p className="text-sm font-bold text-slate-900 tabular-nums">
            {scanned}
          </p>
          <p className="text-[8px] text-slate-400">{demo.scannedLabel}</p>
        </div>
        <div className="rounded-lg bg-violet-50 px-2.5 py-2">
          <p className="text-sm font-bold text-violet-700 tabular-nums">
            {matched}
          </p>
          <p className="text-[8px] text-violet-500">{demo.matchedLabel}</p>
        </div>
      </div>
      <div className="mt-2.5 flex items-center justify-between rounded-lg bg-slate-950 px-3 py-2 text-white">
        <span className="text-[9px] font-bold">{demo.action}</span>
        <ArrowRight className="h-3.5 w-3.5" />
      </div>
    </div>
  );
}

function AnimatedFunctionCode({ code }: { code: string }) {
  const [typedCode, setTypedCode] = useState("");

  useEffect(() => {
    let characterIndex = 0;
    const interval = window.setInterval(() => {
      characterIndex += 1;
      setTypedCode(code.slice(0, characterIndex));
      if (characterIndex >= code.length) window.clearInterval(interval);
    }, 26);

    return () => window.clearInterval(interval);
  }, [code]);

  return (
    <div className="relative mb-3 overflow-hidden rounded-xl bg-slate-950 px-3 py-2.5 text-left shadow-inner">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex gap-1">
          <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
          <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
        </div>
        <span className="flex items-center gap-1 text-[7px] font-semibold text-violet-300">
          <Sparkles className="h-2.5 w-2.5" /> Generowanie funkcji
        </span>
      </div>
      <pre className="min-h-[62px] whitespace-pre-wrap font-mono text-[8px] leading-[1.55] text-sky-200">
        {typedCode}
        <span className="ml-0.5 inline-block h-2.5 w-px animate-pulse bg-violet-300 align-middle" />
      </pre>
    </div>
  );
}

function CustomFunctionActivity({
  demoIndex,
  stage,
}: {
  demoIndex: number;
  stage: CustomFunctionStage;
}) {
  const demo = customFunctionDemos[demoIndex];

  if (stage === "typing") return null;

  return (
    <div className="absolute inset-x-3 bottom-3 z-20 overflow-hidden rounded-2xl border border-rose-200 bg-white/95 p-3 shadow-2xl shadow-rose-200/40 backdrop-blur sm:inset-x-auto sm:bottom-4 sm:right-4 sm:w-[285px]">
      <div className="absolute -right-3 -top-3 h-16 w-16 animate-pulse rounded-full bg-rose-200/50 blur-xl" />
      <AnimatedFunctionCode code={demo.code} />
      {stage === "result" && (
        <div className="relative flex items-center gap-3">
          <div className="relative grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-rose-100 to-amber-100 text-2xl">
            <span className="animate-bounce">{demo.emoji}</span>
            <Sparkles className="absolute -right-1 -top-1 h-4 w-4 animate-pulse text-amber-500" />
          </div>
          <div>
            <p className="text-[9px] font-bold uppercase tracking-[0.14em] text-rose-500">
              Własna funkcja
            </p>
            <p className="mt-0.5 text-sm font-bold text-slate-900">
              {demo.title}
            </p>
            <p className="mt-1 text-[9px] leading-relaxed text-slate-500">
              {demo.message}
            </p>
          </div>
        </div>
      )}
      {stage === "result" && (
        <div className="relative mt-3 h-1.5 overflow-hidden rounded-full bg-rose-100">
          <div className="h-full w-4/5 animate-pulse rounded-full bg-gradient-to-r from-rose-500 to-amber-400" />
        </div>
      )}
    </div>
  );
}

function WorkflowActivity() {
  const { demoIndex, completedSteps, running } =
    useContext(WorkflowDemoContext);
  const steps = workflowDemos[demoIndex].steps;

  if (!running) return null;

  return (
    <div className="absolute inset-x-3 bottom-3 z-20 rounded-2xl border border-sky-200 bg-white/95 p-3 shadow-2xl shadow-sky-200/40 backdrop-blur sm:inset-x-auto sm:bottom-4 sm:right-4 sm:w-[310px]">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-xl bg-sky-500 text-white">
            <Workflow className="h-4 w-4" />
          </div>
          <div>
            <p className="text-[11px] font-bold text-slate-900">
              Workflow nowego klienta
            </p>
            <p className="text-[8px] text-slate-400">
              Uruchomiony automatycznie
            </p>
          </div>
        </div>
        <span className="flex items-center gap-1 text-[8px] font-bold text-emerald-600">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
          W toku
        </span>
      </div>
      <div className="flex items-center">
        {steps.map((step, index) => (
          <div
            key={step}
            className="flex min-w-0 flex-1 items-center last:flex-none"
          >
            <div className="flex flex-col items-center gap-1">
              <div
                className={`grid h-6 w-6 place-items-center rounded-full text-[9px] font-bold transition-all duration-500 ${index < completedSteps ? "scale-105 bg-sky-500 text-white shadow-sm shadow-sky-200" : index === completedSteps ? "animate-pulse border border-sky-300 bg-sky-50 text-sky-600" : "border border-slate-200 bg-white text-slate-400"}`}
              >
                {index < completedSteps ? (
                  <Check className="h-3 w-3" />
                ) : (
                  index + 1
                )}
              </div>
              <span className="text-[7px] font-semibold text-slate-500">
                {step}
              </span>
            </div>
            {index < steps.length - 1 && (
              <div
                className={`mb-3 h-0.5 flex-1 transition-colors duration-500 ${index < completedSteps - 1 ? "bg-sky-400" : "bg-sky-100"}`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function FullPreviewConfetti() {
  const particles = Array.from({ length: 24 }, (_, index) => ({
    left: (index * 37) % 100,
    color: ["#8B5CF6", "#F59E0B", "#EC4899", "#38BDF8", "#10B981"][index % 5],
    delay: `${-(index % 8) * 0.28}s`,
    duration: `${2.1 + (index % 4) * 0.32}s`,
    rotation: `${index * 41}deg`,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 z-10 overflow-hidden">
      {particles.map((particle, index) => (
        <span
          key={index}
          className="absolute -top-4 h-3 w-1.5 rounded-sm"
          style={{
            left: `${particle.left}%`,
            backgroundColor: particle.color,
            animation: `hero-confetti-fall ${particle.duration} linear ${particle.delay} infinite`,
            rotate: particle.rotation,
          }}
        />
      ))}
    </div>
  );
}

function PreviewActivity({
  feature,
  module,
}: {
  feature: FeatureId | null;
  module: Module;
}) {
  const customDemo = useContext(CustomDemoContext);
  if (feature === "ai") return <AgentActivity module={module} />;
  if (feature === "custom")
    return (
      <>
        {customDemo.demoIndex === 0 && customDemo.stage === "result" && (
          <FullPreviewConfetti />
        )}
        <CustomFunctionActivity
          demoIndex={customDemo.demoIndex}
          stage={customDemo.stage}
        />
      </>
    );
  if (feature === "workflow") return <WorkflowActivity />;
  return null;
}

function AppPreview({
  module,
  feature,
}: {
  module: Module;
  feature: FeatureId | null;
}) {
  return (
    <div className="relative flex min-h-[390px] items-center justify-center bg-[radial-gradient(circle_at_50%_45%,rgba(139,92,246,0.15),transparent_45%)] px-4 py-6 sm:min-h-[430px]">
      <div className="relative w-[218px] rounded-[34px] border-[6px] border-slate-900 bg-slate-950 p-1.5 shadow-[0_24px_60px_-16px_rgba(15,23,42,0.55)] sm:w-[236px]">
        <div className="absolute left-1/2 top-2 z-10 h-4 w-16 -translate-x-1/2 rounded-full bg-slate-950" />
        <div className="overflow-hidden rounded-[24px] bg-slate-50">
          <div className="bg-gradient-to-br from-violet-700 via-violet-600 to-sky-500 px-4 pb-6 pt-8 text-white">
            <div className="mb-6 flex items-center justify-between">
              <div className="grid h-8 w-8 place-items-center rounded-xl bg-white/20 text-sm font-black backdrop-blur">
                {module.shortName}
              </div>
              <div className="h-8 w-8 rounded-full border-2 border-white/60 bg-white/20" />
            </div>
            <p className="text-[11px] text-white/70">Dzień dobry, Anna</p>
            <p className="mt-1 text-lg font-bold">{module.clientActivity}</p>
          </div>
          <div className="-mt-3 space-y-2.5 px-3 pb-4">
            <div className="rounded-2xl bg-white p-3 shadow-lg shadow-slate-200/70">
              <div className="mb-2 flex items-center gap-2">
                <div className="grid h-8 w-8 place-items-center rounded-xl bg-violet-100 text-violet-700">
                  <Play className="h-3.5 w-3.5 fill-current" />
                </div>
                <div>
                  <p className="text-[11px] font-bold text-slate-900">
                    Nowy materiał
                  </p>
                  <p className="text-[9px] text-slate-400">Moduł 4 · 12 min</p>
                </div>
              </div>
              <div className="h-1.5 rounded-full bg-slate-100">
                <div className="h-full w-3/5 rounded-full bg-violet-500" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-2xl bg-white p-3 shadow-sm">
                <CalendarDays className="mb-2 h-4 w-4 text-sky-500" />
                <p className="text-[10px] font-bold">Konsultacja</p>
                <p className="text-[9px] text-slate-400">Jutro, 10:00</p>
              </div>
              <div className="rounded-2xl bg-white p-3 shadow-sm">
                <Sparkles className="mb-2 h-4 w-4 text-amber-500" />
                <p className="text-[10px] font-bold">Twój progres</p>
                <p className="text-[9px] text-emerald-500">+18% w tym tyg.</p>
              </div>
            </div>
            <div className="flex justify-around rounded-2xl bg-white px-2 py-3 text-slate-300 shadow-sm">
              <LayoutDashboard className="h-4 w-4 text-violet-600" />
              <CalendarDays className="h-4 w-4" />
              <CreditCard className="h-4 w-4" />
              <Users className="h-4 w-4" />
            </div>
          </div>
        </div>
      </div>
      <div className="absolute right-4 top-24 rounded-2xl border border-white bg-white/95 px-3 py-2 shadow-xl sm:right-8">
        <p className="text-[10px] font-bold text-slate-900 sm:text-xs">
          Twoja aplikacja
        </p>
        <p className="text-[9px] text-slate-400 sm:text-[10px]">
          Logo, kolory i funkcje
        </p>
      </div>
      <PreviewActivity feature={feature} module={module} />
    </div>
  );
}

function PlatformPreview({
  module,
  feature,
}: {
  module: Module;
  feature: FeatureId | null;
}) {
  const nav = [
    { label: "Pulpit", icon: LayoutDashboard },
    { label: "Klienci", icon: Users },
    { label: "Sprzedaż", icon: CreditCard },
    { label: "Kalendarz", icon: CalendarDays },
    { label: "AI", icon: Bot },
  ];

  return (
    <div className="relative min-h-[390px] bg-slate-50 p-4 sm:min-h-[430px] sm:p-6">
      <div className="h-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="grid h-7 w-7 place-items-center rounded-lg bg-violet-600 text-xs font-black text-white">
              {module.shortName}
            </div>
            <span className="text-xs font-bold">{module.name} by Zonvio</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden text-[10px] text-slate-400 sm:inline">
              panel.twojamarka.pl
            </span>
            <div className="h-7 w-7 rounded-full bg-slate-100" />
          </div>
        </div>
        <div className="grid grid-cols-[54px_1fr] sm:grid-cols-[120px_1fr]">
          <aside className="space-y-2 border-r border-slate-100 p-2 sm:p-3">
            {nav.map(({ label, icon: Icon }, index) => (
              <div
                key={label}
                className={`flex items-center gap-2 rounded-lg p-2 text-[10px] ${index === 0 ? "bg-violet-50 font-bold text-violet-700" : "text-slate-400"}`}
              >
                <Icon className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">{label}</span>
              </div>
            ))}
          </aside>
          <div className="p-4 sm:p-5">
            <p className="text-xs text-slate-400">Dzień dobry!</p>
            <h3 className="text-base font-bold text-slate-900 sm:text-lg">
              Twój biznes w jednym miejscu
            </h3>
            <div className="mt-4 grid grid-cols-3 gap-2">
              {[
                ["24", "aktywnych klientów"],
                ["8 420 zł", "sprzedaży"],
                ["12", "zadań na dziś"],
              ].map(([value, label]) => (
                <div
                  key={label}
                  className="rounded-xl border border-slate-100 bg-slate-50 p-2.5 sm:p-3"
                >
                  <p className="text-xs font-bold text-slate-900 sm:text-sm">
                    {value}
                  </p>
                  <p className="mt-1 text-[8px] text-slate-400 sm:text-[10px]">
                    {label}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-3 rounded-xl border border-slate-100 p-3">
              <div className="mb-4 flex items-center justify-between">
                <p className="text-[11px] font-bold">Ostatnia aktywność</p>
                <span className="text-[9px] text-violet-600">
                  Zobacz wszystko
                </span>
              </div>
              {[
                "Nowy klient dołączył",
                "Opłacono subskrypcję",
                "Formularz został uzupełniony",
              ].map((item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-2 border-t border-slate-50 py-2"
                >
                  <span
                    className={`h-2 w-2 rounded-full ${index === 0 ? "bg-emerald-400" : index === 1 ? "bg-violet-400" : "bg-sky-400"}`}
                  />
                  <span className="text-[9px] text-slate-600 sm:text-[10px]">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <PreviewActivity feature={feature} module={module} />
    </div>
  );
}

function ShopPreview({
  module,
  feature,
}: {
  module: Module;
  feature: FeatureId | null;
}) {
  const products = [
    {
      name: module.product,
      price: "249 zł",
      color: "from-violet-500 to-indigo-600",
    },
    {
      name: "Konsultacja 1:1",
      price: "399 zł",
      color: "from-sky-400 to-cyan-500",
    },
    {
      name: "Pakiet materiałów",
      price: "89 zł",
      color: "from-amber-400 to-orange-500",
    },
  ];

  return (
    <div className="relative min-h-[390px] bg-slate-50 p-4 sm:min-h-[430px] sm:p-6">
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-lg">
        <div className="flex items-center justify-between border-b border-slate-100 px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="grid h-7 w-7 place-items-center rounded-lg bg-slate-950 text-[10px] font-black text-white">
              {module.shortName}
            </div>
            <span className="text-xs font-bold">Sklep Twojej Marki</span>
          </div>
          <div className="flex items-center gap-1.5 text-[9px] font-semibold text-slate-500">
            <Store className="h-3.5 w-3.5" /> Koszyk
          </div>
        </div>
        <div className="bg-gradient-to-r from-violet-50 to-sky-50 px-4 py-5 text-center sm:px-6">
          <p className="text-[9px] font-bold uppercase tracking-[0.16em] text-violet-600">
            Produkty i usługi
          </p>
          <h3 className="mt-1 text-lg font-bold text-slate-950">
            Sprzedawaj po swojemu
          </h3>
          <p className="mt-1 text-[10px] text-slate-500">
            Jednorazowo, w pakietach lub subskrypcji
          </p>
        </div>
        <div className="grid grid-cols-3 gap-2 p-3 sm:gap-3 sm:p-4">
          {products.map((product) => (
            <div
              key={product.name}
              className="overflow-hidden rounded-xl border border-slate-100 bg-white shadow-sm"
            >
              <div
                className={`h-16 bg-gradient-to-br sm:h-20 ${product.color}`}
              />
              <div className="p-2.5">
                <p className="min-h-7 text-[9px] font-bold leading-tight text-slate-800 sm:text-[10px]">
                  {product.name}
                </p>
                <p className="mt-2 text-[10px] font-bold text-violet-700 sm:text-xs">
                  {product.price}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mx-3 mb-3 flex items-center justify-between rounded-xl bg-slate-950 px-4 py-3 text-white sm:mx-4 sm:mb-4">
          <div>
            <p className="text-[10px] font-bold">Płatność gotowa</p>
            <p className="text-[8px] text-slate-400">
              BLIK, karty i szybkie przelewy
            </p>
          </div>
          <CreditCard className="h-4 w-4 text-violet-300" />
        </div>
      </div>
      <PreviewActivity feature={feature} module={module} />
    </div>
  );
}

function WebsitePreview({
  module,
  feature,
}: {
  module: Module;
  feature: FeatureId | null;
}) {
  return (
    <div className="relative flex min-h-[390px] items-center bg-slate-100 p-4 sm:min-h-[430px] sm:p-6">
      <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl">
        <div className="flex items-center gap-1.5 border-b border-slate-100 px-3 py-2.5">
          <span className="h-2 w-2 rounded-full bg-rose-300" />
          <span className="h-2 w-2 rounded-full bg-amber-300" />
          <span className="h-2 w-2 rounded-full bg-emerald-300" />
          <div className="mx-auto rounded-full bg-slate-100 px-8 py-1 text-[8px] text-slate-400 sm:px-16">
            twojamarka.pl
          </div>
        </div>
        <div className="bg-[radial-gradient(circle_at_80%_20%,rgba(56,189,248,0.2),transparent_35%),radial-gradient(circle_at_20%_80%,rgba(139,92,246,0.18),transparent_35%)] px-5 py-6 sm:px-8 sm:py-9">
          <div className="mb-8 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="grid h-7 w-7 place-items-center rounded-lg bg-slate-950 text-[10px] font-black text-white">
                {module.shortName}
              </div>
              <span className="text-[10px] font-bold">
                {module.name.toUpperCase()} BY ZONVIO
              </span>
            </div>
            <div className="flex gap-3 text-[8px] font-medium text-slate-500">
              <span>Oferta</span>
              <span>O mnie</span>
              <span>Kontakt</span>
            </div>
          </div>
          <div className="max-w-[330px]">
            <span className="rounded-full bg-violet-100 px-2.5 py-1 text-[8px] font-bold text-violet-700">
              TWOJA WŁASNA STRONA
            </span>
            <h3 className="mt-3 text-xl font-bold leading-tight text-slate-950 sm:text-2xl">
              {module.headline}
            </h3>
            <p className="mt-2 text-[10px] leading-relaxed text-slate-500 sm:text-xs">
              Profesjonalna oferta, płatności i panel klienta — wszystko pod
              Twoją marką.
            </p>
            <div className="mt-4 inline-flex rounded-lg bg-violet-600 px-4 py-2 text-[9px] font-bold text-white">
              Sprawdź ofertę
            </div>
          </div>
          <div className="mt-6 grid grid-cols-3 gap-2">
            {["Płatności online", "Własna domena", "Gotowe sekcje"].map(
              (item) => (
                <div
                  key={item}
                  className="rounded-lg border border-white bg-white/70 p-2 text-center text-[8px] font-semibold text-slate-600 shadow-sm backdrop-blur"
                >
                  {item}
                </div>
              ),
            )}
          </div>
        </div>
      </div>
      <PreviewActivity feature={feature} module={module} />
    </div>
  );
}

const featureContent: Record<
  FeatureId,
  { eyebrow: string; title: string; description: string; items: string[] }
> = {
  modules: {
    eyebrow: "Moduły Zonvio",
    title: "Wybierz tylko to, czego potrzebuje Twój biznes",
    description:
      "Zacznij od jednego modułu i dodawaj kolejne, kiedy Twoja firma będzie gotowa.",
    items: [
      "Sprzedaż i płatności",
      "Rezerwacje",
      "Kursy i materiały",
      "Panel klienta",
      "CRM i relacje",
      "Zadania i projekty",
      "Formularze",
      "Analityka",
    ],
  },
  ai: {
    eyebrow: "Przykładowy agent AI",
    title: "Agent opiekuna klientów",
    description:
      "Analizuje aktywność klientów, wskazuje ryzyka i przygotowuje działania do zatwierdzenia.",
    items: [
      "Znajdź nieaktywnych klientów",
      "Podsumuj ich historię",
      "Przygotuj wiadomość",
      "Utwórz zadanie dla opiekuna",
    ],
  },
  custom: {
    eyebrow: "Własne funkcje",
    title: "System dopasowany do Twojego sposobu pracy",
    description:
      "Dodaj dane, ekrany i działania charakterystyczne dla Twojej branży — bez zmiany całej platformy.",
    items: [
      "Własne pola klienta",
      "Dedykowane formularze",
      "Role i uprawnienia",
      "Raporty branżowe",
      "Integracje z API",
      "Akcje zespołu",
    ],
  },
  workflow: {
    eyebrow: "Automatyczny workflow",
    title: "Od zakupu do obsługi klienta",
    description:
      "Połącz zdarzenia, warunki i akcje w proces, który działa dokładnie tak jak Twoja firma.",
    items: [
      "1. Klient kupuje pakiet",
      "2. Otrzymuje dostęp",
      "3. Uzupełnia onboarding",
      "4. AI analizuje odpowiedzi",
      "5. Zespół dostaje zadanie",
      "6. Klient otrzymuje plan",
    ],
  },
};

function AnimatedAgentPrompt({
  setDemoIndex,
  setRunning,
  setScanned,
  setMatched,
}: {
  setDemoIndex: (index: number) => void;
  setRunning: (running: boolean) => void;
  setScanned: (value: number) => void;
  setMatched: (value: number) => void;
}) {
  const locale = useLandingLocale();
  const [typedPrompt, setTypedPrompt] = useState("");
  const [activePromptIndex, setActivePromptIndex] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const wait = (duration: number) =>
      new Promise((resolve) => window.setTimeout(resolve, duration));

    const run = async () => {
      let demoIndex = 0;
      while (!cancelled) {
        const demo = aiDemos[demoIndex];
        const prompt =
          locale === "en" ? englishAiPrompts[demoIndex] : demo.prompt;
        setActivePromptIndex(demoIndex);
        setDemoIndex(demoIndex);
        setRunning(false);
        setScanned(0);
        setMatched(0);
        setTypedPrompt("");

        for (let index = 1; index <= prompt.length && !cancelled; index += 1) {
          setTypedPrompt(prompt.slice(0, index));
          await wait(32);
        }

        if (cancelled) return;
        setRunning(true);
        for (let value = 1; value <= demo.scanned && !cancelled; value += 1) {
          setScanned(value);
          setMatched(
            Math.min(
              demo.matched,
              Math.floor((value / demo.scanned) * demo.matched),
            ),
          );
          await wait(38);
        }
        await wait(1800);

        for (let index = prompt.length; index >= 0 && !cancelled; index -= 1) {
          setTypedPrompt(prompt.slice(0, index));
          await wait(14);
        }

        setRunning(false);
        demoIndex = (demoIndex + 1) % aiDemos.length;
        await wait(250);
      }
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, [locale, setDemoIndex, setMatched, setRunning, setScanned]);

  return (
    <div className="mb-2 rounded-2xl border border-violet-200 bg-white p-2 shadow-sm">
      <div className="flex min-h-[58px] items-center gap-3 rounded-xl bg-slate-50 px-3 py-2.5 shadow-inner">
        <div className="relative grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-violet-600 text-white">
          {activePromptIndex === 0 ? (
            <Instagram className="h-4 w-4" />
          ) : (
            <Bot className="h-4 w-4" />
          )}
          {activePromptIndex === 0 && (
            <span className="absolute -bottom-1 -right-1 grid h-4 w-4 place-items-center rounded-full border-2 border-white bg-slate-950">
              <Bot className="h-2 w-2" />
            </span>
          )}
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-[8px] font-bold uppercase tracking-[0.12em] text-violet-600">
              Polecenie dla agenta
            </span>
            <span className="text-[8px] text-slate-400">Agent relacji</span>
          </div>
          <p className="text-[10px] leading-relaxed text-slate-700">
            {typedPrompt}
            <span className="ml-0.5 inline-block h-3 w-px animate-pulse bg-violet-500 align-middle" />
          </p>
        </div>
        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-slate-950 text-white">
          <ArrowRight className="h-3.5 w-3.5" />
        </div>
      </div>
    </div>
  );
}

function AnimatedCustomFunctionPrompt({
  setDemoIndex,
  setStage,
}: {
  setDemoIndex: (index: number) => void;
  setStage: (stage: CustomFunctionStage) => void;
}) {
  const locale = useLandingLocale();
  const [typedPrompt, setTypedPrompt] = useState("");

  useEffect(() => {
    let cancelled = false;
    const wait = (duration: number) =>
      new Promise((resolve) => window.setTimeout(resolve, duration));

    const run = async () => {
      let demoIndex = 0;

      while (!cancelled) {
        const demo = customFunctionDemos[demoIndex];
        const prompt =
          locale === "en"
            ? englishCustomFunctionPrompts[demoIndex]
            : demo.prompt;
        setDemoIndex(demoIndex);
        setStage("typing");
        setTypedPrompt("");

        for (let index = 1; index <= prompt.length && !cancelled; index += 1) {
          setTypedPrompt(prompt.slice(0, index));
          await wait(32);
        }

        if (cancelled) return;
        setStage("coding");
        await wait(1900);
        if (cancelled) return;
        setStage("result");
        await wait(2300);

        for (let index = prompt.length; index >= 0 && !cancelled; index -= 1) {
          setTypedPrompt(prompt.slice(0, index));
          await wait(14);
        }

        demoIndex = (demoIndex + 1) % customFunctionDemos.length;
        await wait(250);
      }
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, [locale, setDemoIndex, setStage]);

  return (
    <div className="mb-2 rounded-2xl border border-rose-200 bg-white p-2 shadow-sm">
      <div className="flex min-h-[58px] items-center gap-3 rounded-xl bg-slate-50 px-3 py-2.5 shadow-inner">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-rose-500 to-amber-400 text-white">
          <Wrench className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-[8px] font-bold uppercase tracking-[0.12em] text-rose-500">
              Opisz własną funkcję
            </span>
            <span className="text-[8px] text-slate-400">Bez kodowania</span>
          </div>
          <p className="text-[10px] leading-relaxed text-slate-700">
            {typedPrompt}
            <span className="ml-0.5 inline-block h-3 w-px animate-pulse bg-rose-500 align-middle" />
          </p>
        </div>
        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-slate-950 text-white">
          <ArrowRight className="h-3.5 w-3.5" />
        </div>
      </div>
    </div>
  );
}

function AnimatedWorkflowPrompt({
  setDemoIndex,
  setCompletedSteps,
  setRunning,
}: {
  setDemoIndex: (index: number) => void;
  setCompletedSteps: (steps: number) => void;
  setRunning: (running: boolean) => void;
}) {
  const locale = useLandingLocale();
  const [typedPrompt, setTypedPrompt] = useState("");

  useEffect(() => {
    let cancelled = false;
    const wait = (duration: number) =>
      new Promise((resolve) => window.setTimeout(resolve, duration));

    const run = async () => {
      let demoIndex = 0;
      while (!cancelled) {
        const demo = workflowDemos[demoIndex];
        const prompt =
          locale === "en" ? englishWorkflowPrompts[demoIndex] : demo.prompt;
        setDemoIndex(demoIndex);
        setRunning(false);
        setCompletedSteps(0);
        setTypedPrompt("");

        for (let index = 1; index <= prompt.length && !cancelled; index += 1) {
          setTypedPrompt(prompt.slice(0, index));
          await wait(32);
        }

        if (cancelled) return;
        setRunning(true);
        for (let step = 1; step <= demo.steps.length && !cancelled; step += 1) {
          await wait(620);
          setCompletedSteps(step);
        }
        await wait(1500);

        for (let index = prompt.length; index >= 0 && !cancelled; index -= 1) {
          setTypedPrompt(prompt.slice(0, index));
          await wait(14);
        }

        setRunning(false);
        demoIndex = (demoIndex + 1) % workflowDemos.length;
        await wait(250);
      }
    };

    void run();
    return () => {
      cancelled = true;
    };
  }, [locale, setCompletedSteps, setDemoIndex, setRunning]);

  return (
    <div className="mb-2 rounded-2xl border border-sky-200 bg-white p-2 shadow-sm">
      <div className="flex min-h-[58px] items-center gap-3 rounded-xl bg-slate-50 px-3 py-2.5 shadow-inner">
        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-sky-500 text-white">
          <Workflow className="h-4 w-4" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="mb-1 flex items-center justify-between">
            <span className="text-[8px] font-bold uppercase tracking-[0.12em] text-sky-600">
              Opisz swój workflow
            </span>
            <span className="text-[8px] text-slate-400">Automatyzacja</span>
          </div>
          <p className="text-[10px] leading-relaxed text-slate-700">
            {typedPrompt}
            <span className="ml-0.5 inline-block h-3 w-px animate-pulse bg-sky-500 align-middle" />
          </p>
        </div>
        <div className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-slate-950 text-white">
          <ArrowRight className="h-3.5 w-3.5" />
        </div>
      </div>
    </div>
  );
}

function InteractivePreview() {
  const [activeView, setActiveView] = useState<ViewId>("app");
  const [hoveredView, setHoveredView] = useState<ViewId | null>(null);
  const [activeFeature, setActiveFeature] = useState<FeatureId | null>(null);
  const [customDemoIndex, setCustomDemoIndex] = useState(0);
  const [customStage, setCustomStage] = useState<CustomFunctionStage>("typing");
  const [workflowDemoIndex, setWorkflowDemoIndex] = useState(0);
  const [workflowCompletedSteps, setWorkflowCompletedSteps] = useState(0);
  const [workflowRunning, setWorkflowRunning] = useState(false);
  const [aiDemoIndex, setAiDemoIndex] = useState(0);
  const [aiRunning, setAiRunning] = useState(false);
  const [aiScanned, setAiScanned] = useState(0);
  const [aiMatched, setAiMatched] = useState(0);
  const [selectedModuleId, setSelectedModuleId] =
    useState<Module["id"]>("fitly");
  const selectedModule =
    modules.find((module) => module.id === selectedModuleId) ?? modules[0];
  const logoRotation = hoveredView
    ? {
        app: 180,
        platform: 150,
        shop: 120,
        website: 90,
      }[hoveredView]
    : 0;
  const activeSurfaceX =
    75 + views.findIndex((view) => view.id === activeView) * 150;
  const surfaceCurveEnd =
    activeSurfaceX > 300 ? activeSurfaceX - 7 : activeSurfaceX + 7;
  const surfaceConnectionPath = `M${activeSurfaceX} 0V7Q${activeSurfaceX} 14 ${surfaceCurveEnd} 14M75 14H525M75 14V28M225 14V28M375 14V28M525 14V28`;
  const activeFeatureX = activeFeature
    ? 75 + features.findIndex((feature) => feature.id === activeFeature) * 150
    : 75;
  const activeFeatureItems =
    activeFeature && activeFeature !== "modules"
      ? featureContent[activeFeature].items
      : [];
  const featureBranchItems =
    activeFeature === "ai" ||
    activeFeature === "custom" ||
    activeFeature === "workflow"
      ? ["prompt"]
      : activeFeatureItems;
  const featureItemXs = featureBranchItems.map(
    (_, index) => ((index + 0.5) * 600) / featureBranchItems.length,
  );
  const firstFeatureItemX = featureItemXs[0] ?? 300;
  const lastFeatureItemX = featureItemXs.at(-1) ?? 300;
  const featureBranchPath =
    featureItemXs.length === 1
      ? `M${activeFeatureX} 0V5C${activeFeatureX} 17 ${firstFeatureItemX} 15 ${firstFeatureItemX} 27V32`
      : `M${activeFeatureX} 0V7Q${activeFeatureX} 13 ${activeFeatureX > 300 ? activeFeatureX - 6 : activeFeatureX + 6} 13M${firstFeatureItemX} 13H${lastFeatureItemX}${featureItemXs.map((x) => `M${x} 13V32`).join("")}`;
  const previews: Record<ViewId, ReactNode> = {
    app: <AppPreview module={selectedModule} feature={activeFeature} />,
    platform: (
      <PlatformPreview module={selectedModule} feature={activeFeature} />
    ),
    shop: <ShopPreview module={selectedModule} feature={activeFeature} />,
    website: <WebsitePreview module={selectedModule} feature={activeFeature} />,
  };

  return (
    <div className="relative mx-auto w-full max-w-[620px] lg:ml-auto">
      <div className="absolute -left-12 top-16 h-48 w-48 rounded-full bg-violet-400/20 blur-3xl" />
      <div className="absolute -right-10 bottom-0 h-56 w-56 rounded-full bg-sky-400/20 blur-3xl" />
      <div className="relative overflow-hidden rounded-[28px] border border-white/70 bg-white/90 p-2.5 shadow-[0_32px_90px_-30px_rgba(30,20,70,0.35)] backdrop-blur-xl sm:p-3">
        <div className="relative z-10 flex justify-center pb-1 pt-1">
          <div className="rounded-2xl border border-violet-100 bg-white p-1.5 shadow-lg shadow-violet-200/40">
            <Image
              src={ZonvioLogoIcon}
              alt="Zonvio"
              className="h-10 w-10 transition-transform duration-500 ease-out"
              style={{ transform: `rotate(${logoRotation}deg)` }}
            />
          </div>
        </div>
        <svg
          className="mx-auto hidden h-9 w-full sm:block"
          viewBox="0 0 600 36"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id="hero-zonvio-flow"
              x1="300"
              y1="0"
              x2="300"
              y2="36"
            >
              <stop stopColor="#7C3AED" />
              <stop offset="1" stopColor="#BAE6FD" />
            </linearGradient>
          </defs>
          <path
            d="M300 0V10Q300 17 293 17H82Q75 17 75 24V36M300 17H518Q525 17 525 24V36M225 17V36M375 17V36"
            stroke="#DDD6FE"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M300 0V10Q300 17 293 17H82Q75 17 75 24V36M300 17H518Q525 17 525 24V36M225 17V36M375 17V36"
            stroke="url(#hero-zonvio-flow)"
            strokeWidth="1.5"
            strokeDasharray="38 190"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="-228"
              dur="4s"
              repeatCount="indefinite"
            />
          </path>
        </svg>
        <div className="mx-auto h-4 w-px bg-gradient-to-b from-violet-400 to-violet-100 sm:hidden" />
        <div className="grid grid-cols-4 gap-1 rounded-2xl bg-slate-100 p-1.5">
          {views.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveView(id)}
              onMouseEnter={() => setHoveredView(id)}
              onMouseLeave={() => setHoveredView(null)}
              onFocus={() => setHoveredView(id)}
              onBlur={() => setHoveredView(null)}
              aria-pressed={activeView === id}
              className={`flex min-w-0 items-center justify-center gap-1.5 rounded-xl px-2 py-2.5 text-[10px] font-bold transition sm:text-xs ${activeView === id ? "bg-white text-violet-700 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}
            >
              <Icon className="h-3.5 w-3.5 shrink-0" />
              <span className="truncate">{label}</span>
            </button>
          ))}
        </div>
        <svg
          className="mx-auto hidden h-7 w-full sm:block"
          viewBox="0 0 600 28"
          fill="none"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <defs>
            <linearGradient
              id="hero-surface-flow"
              x1="0"
              y1="0"
              x2="600"
              y2="28"
            >
              <stop stopColor="#C4B5FD" />
              <stop offset="0.5" stopColor="#7C3AED" />
              <stop offset="1" stopColor="#BAE6FD" />
            </linearGradient>
          </defs>
          <path
            d={surfaceConnectionPath}
            stroke="#DDD6FE"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d={surfaceConnectionPath}
            stroke="url(#hero-surface-flow)"
            strokeWidth="1.5"
            strokeDasharray="36 180"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <animate
              attributeName="stroke-dashoffset"
              from="0"
              to="-216"
              dur="3.8s"
              repeatCount="indefinite"
            />
          </path>
        </svg>
        <div className="mx-auto h-4 w-px bg-gradient-to-b from-violet-300 to-violet-100 sm:hidden" />
        <div className="mb-2 grid grid-cols-2 gap-1.5 sm:grid-cols-4">
          {features.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveFeature(id)}
              aria-pressed={activeFeature === id}
              className={`relative flex items-center gap-2 rounded-xl border px-2.5 py-2.5 text-left transition ${activeFeature === id ? "border-violet-300 bg-violet-100 shadow-sm" : "border-violet-100 bg-violet-50/60 hover:border-violet-200 hover:bg-violet-50"}`}
            >
              {(id === "ai" || id === "custom") && (
                <span className="absolute -right-1.5 -top-2 rounded-full border border-amber-200 bg-amber-50 px-1.5 py-0.5 text-[6px] font-bold uppercase tracking-[0.08em] text-amber-700 shadow-sm sm:text-[7px]">
                  Wkrótce dostępne
                </span>
              )}
              <div className="grid h-7 w-7 shrink-0 place-items-center rounded-lg bg-white text-violet-600 shadow-sm">
                <Icon className="h-3.5 w-3.5" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-[10px] font-bold text-slate-800 sm:text-[11px]">
                  {label}
                </p>
              </div>
            </button>
          ))}
        </div>
        {activeFeature === "modules" && (
          <>
            <svg
              className="mx-auto hidden h-8 w-full sm:block"
              viewBox="0 0 600 32"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient
                  id="hero-module-flow"
                  x1="75"
                  y1="0"
                  x2="525"
                  y2="32"
                >
                  <stop stopColor="#7C3AED" />
                  <stop offset="1" stopColor="#38BDF8" />
                </linearGradient>
              </defs>
              <path
                d="M75 0V13M50 13H550M50 13V32M150 13V32M250 13V32M350 13V32M450 13V32M550 13V32"
                stroke="#DDD6FE"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M75 0V13M50 13H550M50 13V32M150 13V32M250 13V32M350 13V32M450 13V32M550 13V32"
                stroke="url(#hero-module-flow)"
                strokeWidth="1.5"
                strokeDasharray="34 170"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="-204"
                  dur="3.4s"
                  repeatCount="indefinite"
                />
              </path>
            </svg>
            <div className="mx-auto h-4 w-px bg-gradient-to-b from-violet-300 to-violet-100 sm:hidden" />
            <div className="mb-2 flex gap-2 overflow-x-auto rounded-2xl border border-slate-100 bg-white p-2 scrollbar-hide sm:grid sm:grid-cols-6 sm:overflow-visible">
              {modules.map((module) => (
                <button
                  key={module.id}
                  type="button"
                  onClick={() => setSelectedModuleId(module.id)}
                  aria-pressed={selectedModuleId === module.id}
                  className={`relative flex min-w-[150px] items-center gap-2 rounded-xl border px-2 py-2.5 text-left transition sm:min-w-0 ${selectedModuleId === module.id ? "border-violet-300 bg-violet-50 shadow-sm" : "border-slate-100 bg-white hover:border-violet-200"}`}
                >
                  {module.id !== "fitly" && module.id !== "selly" && (
                    <span className="absolute -right-1 -top-2 rounded-full border border-amber-200 bg-amber-50 px-1.5 py-0.5 text-[6px] font-bold uppercase tracking-[0.08em] text-amber-700 shadow-sm">
                      Wkrótce dostępne
                    </span>
                  )}
                  <div className="grid h-9 w-9 shrink-0 place-items-center overflow-hidden rounded-lg bg-slate-950 text-xs font-black text-white">
                    {"logo" in module ? (
                      <Image
                        src={module.logo}
                        alt="Fitly"
                        className="h-full w-full bg-white object-contain p-1"
                      />
                    ) : (
                      module.shortName
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-[11px] font-bold text-slate-900">
                      {module.name}{" "}
                      <span className="font-medium text-slate-400">
                        by Zonvio
                      </span>
                    </p>
                    <p className="truncate text-[9px] text-slate-400">
                      {module.category}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </>
        )}
        {activeFeature && activeFeature !== "modules" && (
          <>
            <svg
              className="mx-auto hidden h-8 w-full sm:block"
              viewBox="0 0 600 32"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <defs>
                <linearGradient
                  id="hero-feature-flow"
                  x1="0"
                  y1="0"
                  x2="600"
                  y2="32"
                >
                  <stop stopColor="#7C3AED" />
                  <stop offset="1" stopColor="#38BDF8" />
                </linearGradient>
              </defs>
              <path
                d={featureBranchPath}
                stroke="#DDD6FE"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d={featureBranchPath}
                stroke="url(#hero-feature-flow)"
                strokeWidth="1.5"
                strokeDasharray="34 170"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="0"
                  to="-204"
                  dur="3.4s"
                  repeatCount="indefinite"
                />
              </path>
            </svg>
            <div className="mx-auto h-4 w-px bg-gradient-to-b from-violet-300 to-violet-100 sm:hidden" />
            {activeFeature === "ai" ? (
              <AnimatedAgentPrompt
                setDemoIndex={setAiDemoIndex}
                setRunning={setAiRunning}
                setScanned={setAiScanned}
                setMatched={setAiMatched}
              />
            ) : activeFeature === "custom" ? (
              <AnimatedCustomFunctionPrompt
                setDemoIndex={setCustomDemoIndex}
                setStage={setCustomStage}
              />
            ) : activeFeature === "workflow" ? (
              <AnimatedWorkflowPrompt
                setDemoIndex={setWorkflowDemoIndex}
                setCompletedSteps={setWorkflowCompletedSteps}
                setRunning={setWorkflowRunning}
              />
            ) : (
              <div className="mb-2 flex gap-2 overflow-x-auto rounded-2xl border border-slate-100 bg-white p-2 scrollbar-hide">
                {activeFeatureItems.map((item) => (
                  <div
                    key={item}
                    className="flex min-w-fit items-center justify-center gap-2 rounded-xl border border-slate-100 bg-slate-50 px-3 py-2 sm:min-w-0 sm:flex-1"
                  >
                    <Check className="h-3.5 w-3.5 shrink-0 text-violet-600" />
                    <span className="whitespace-nowrap text-[9px] font-semibold text-slate-600">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
        <div className="relative overflow-hidden rounded-[21px] border border-slate-200 bg-white">
          <CustomDemoContext.Provider
            value={{ demoIndex: customDemoIndex, stage: customStage }}
          >
            <WorkflowDemoContext.Provider
              value={{
                demoIndex: workflowDemoIndex,
                completedSteps: workflowCompletedSteps,
                running: workflowRunning,
              }}
            >
              <AiDemoContext.Provider
                value={{
                  demoIndex: aiDemoIndex,
                  running: aiRunning,
                  scanned: aiScanned,
                  matched: aiMatched,
                }}
              >
                {previews[activeView]}
              </AiDemoContext.Provider>
            </WorkflowDemoContext.Provider>
          </CustomDemoContext.Provider>
        </div>
      </div>
      <div className="absolute -bottom-5 left-5 flex items-center gap-2 rounded-xl border border-white bg-white/95 px-3 py-2 shadow-xl sm:-left-8 sm:bottom-8 sm:px-4 sm:py-3">
        <div className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-100 text-emerald-700">
          <Check className="h-4 w-4" />
        </div>
        <div>
          <p className="text-[10px] font-bold text-slate-900 sm:text-xs">
            Gotowe pod Twoją marką
          </p>
          <p className="text-[9px] text-slate-400 sm:text-[11px]">
            Uruchamiaj i rozwijaj bez kodowania
          </p>
        </div>
      </div>
    </div>
  );
}

export default function HeroSectionV2() {
  return (
    <section className="relative isolate overflow-hidden bg-[radial-gradient(circle_at_15%_20%,rgba(139,92,246,0.13),transparent_35%),radial-gradient(circle_at_88%_12%,rgba(56,189,248,0.12),transparent_30%)] pb-10 pt-32 sm:pt-36 lg:pb-14 lg:pt-44">
      <Container>
        <div className="grid items-start gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-10 xl:gap-16">
          <div className="max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-violet-200 bg-white/80 px-3 py-1.5 text-xs font-bold text-violet-700 shadow-sm backdrop-blur sm:text-sm">
              <span className="h-2 w-2 rounded-full bg-violet-500 shadow-[0_0_0_4px_rgba(139,92,246,0.12)]" />
              Platforma infrastruktury biznesowej
            </div>
            <h1 className="text-[42px] font-bold leading-[1.03] tracking-[-0.04em] text-slate-950 sm:text-6xl lg:text-[68px]">
              Twoja wizja.
              <br />
              Twój biznes.
              <br />
              <RotatingBusinessSurface />
            </h1>
            <p className="mt-6 max-w-xl text-base font-medium leading-relaxed text-slate-600 sm:text-lg">
              Zbuduj profesjonalną obecność, która wzmacnia wiarygodność Twojej
              marki i pomaga sprzedawać więcej. Wybieraj moduły, funkcje,
              workflowy i AI, a Zonvio połączy je w aplikację, platformę, stronę
              lub sklep działający pod Twoją marką.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/auth/register"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-slate-950 px-6 py-3 text-sm font-bold text-white shadow-lg shadow-slate-300 transition hover:-translate-y-0.5 hover:bg-violet-700"
              >
                Zbuduj swoją platformę
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="#demo"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-white/80 px-6 py-3 text-sm font-bold text-slate-700 transition hover:border-violet-300 hover:text-violet-700"
              >
                Zobacz, jak to działa
              </Link>
            </div>
            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-xs font-semibold text-slate-500 sm:text-sm">
              {[
                "Własna marka",
                "Aplikacja i platforma",
                "Moduły, gdy ich potrzebujesz",
              ].map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-emerald-500" />
                  {item}
                </span>
              ))}
            </div>
          </div>
          <InteractivePreview />
        </div>
      </Container>
    </section>
  );
}
