"use client";

import {
  AlignCenter,
  AlignLeft,
  FlipHorizontal2,
  FlipVertical2,
  Gauge,
  Maximize2,
  Minimize2,
  Pause,
  Play,
  RotateCcw,
  RotateCw,
  Type,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

const initialText = `Wklej tutaj tekst, który chcesz przeczytać.

Ustaw wygodny rozmiar liter i prędkość przewijania. Możesz obrócić tekst lub odbić go poziomo, jeśli korzystasz z lustra telepromptera.

Kiedy wszystko będzie gotowe, wybierz Start.`;

const rotations = [0, 90, 180, 270] as const;
type Rotation = (typeof rotations)[number];
type TextAlignment = "left" | "center";

export default function TeleprompterStudio() {
  const [text, setText] = useState(initialText);
  const [fontSize, setFontSize] = useState(54);
  const [speed, setSpeed] = useState(36);
  const [rotation, setRotation] = useState<Rotation>(0);
  const [mirrorHorizontal, setMirrorHorizontal] = useState(false);
  const [mirrorVertical, setMirrorVertical] = useState(false);
  const [alignment, setAlignment] = useState<TextAlignment>("left");
  const [playing, setPlaying] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const stageRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);

  useEffect(() => {
    const savedText = window.localStorage.getItem("zonvio-teleprompter-text");
    if (savedText) setText(savedText);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("zonvio-teleprompter-text", text);
  }, [text]);

  const stop = useCallback(() => {
    setPlaying(false);
    previousTimeRef.current = null;
    if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    frameRef.current = null;
  }, []);

  const togglePlayback = useCallback(() => {
    if (playing) {
      stop();
      return;
    }

    const scrollArea = scrollRef.current;
    if (scrollArea && scrollArea.scrollTop + scrollArea.clientHeight >= scrollArea.scrollHeight - 8) {
      scrollArea.scrollTop = 0;
    }
    previousTimeRef.current = null;
    setPlaying(true);
  }, [playing, stop]);

  useEffect(() => {
    if (!playing) return;

    const tick = (time: number) => {
      const scrollArea = scrollRef.current;
      if (!scrollArea) return;
      const previousTime = previousTimeRef.current ?? time;
      const elapsed = Math.min(time - previousTime, 48);
      previousTimeRef.current = time;
      scrollArea.scrollTop += (speed * elapsed) / 1000;

      if (scrollArea.scrollTop + scrollArea.clientHeight >= scrollArea.scrollHeight - 2) {
        stop();
        return;
      }

      frameRef.current = window.requestAnimationFrame(tick);
    };

    frameRef.current = window.requestAnimationFrame(tick);
    return () => {
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
      previousTimeRef.current = null;
    };
  }, [playing, speed, stop]);

  useEffect(() => {
    const handleFullscreen = () => setFullscreen(document.fullscreenElement === stageRef.current);
    document.addEventListener("fullscreenchange", handleFullscreen);
    return () => document.removeEventListener("fullscreenchange", handleFullscreen);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.tagName === "TEXTAREA" || target?.tagName === "INPUT") return;

      if (event.code === "Space") {
        event.preventDefault();
        togglePlayback();
      }

      if (event.code === "ArrowUp") {
        event.preventDefault();
        setSpeed((current) => Math.min(120, current + 4));
      }

      if (event.code === "ArrowDown") {
        event.preventDefault();
        setSpeed((current) => Math.max(8, current - 4));
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [togglePlayback]);

  const resetScroll = () => {
    stop();
    scrollRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  };

  const rotate = () => {
    const index = rotations.indexOf(rotation);
    setRotation(rotations[(index + 1) % rotations.length]);
  };

  const toggleFullscreen = async () => {
    if (document.fullscreenElement) {
      await document.exitFullscreen();
      return;
    }
    await stageRef.current?.requestFullscreen();
  };

  const transform = `rotate(${rotation}deg) scaleX(${mirrorHorizontal ? -1 : 1}) scaleY(${mirrorVertical ? -1 : 1})`;

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <header className="border-b border-white/10 bg-slate-950/90 px-4 py-4 backdrop-blur-xl sm:px-6">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-xl bg-white">
              <Image src="/zonvio-logo.svg" width={28} height={28} alt="" priority />
            </span>
            <span>
              <strong className="block text-sm font-bold">Zonvio Teleprompter</strong>
              <span className="text-xs text-slate-400">Studio prezentacji</span>
            </span>
          </div>
          <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-4 py-2 text-xs font-semibold text-emerald-300">
            Zapis automatyczny
          </span>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1500px] gap-5 p-4 sm:p-6 xl:grid-cols-[390px_minmax(0,1fr)]">
        <aside className="space-y-4">
          <section className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-black/20">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-300">Twój scenariusz</p>
                <h1 className="mt-1 text-xl font-bold">Wpisz lub wklej tekst</h1>
              </div>
              <Type className="h-5 w-5 text-slate-400" />
            </div>
            <textarea
              value={text}
              onChange={(event) => setText(event.target.value)}
              className="min-h-[260px] w-full resize-y rounded-2xl border border-white/10 bg-slate-900/80 p-4 text-[15px] leading-7 text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10"
              placeholder="Wklej tekst do telepromptera…"
              aria-label="Tekst telepromptera"
            />
            <div className="mt-3 flex justify-between text-xs text-slate-500">
              <span>{text.trim() ? text.trim().split(/\s+/).length : 0} słów</span>
              <span>Zapis automatyczny</span>
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/[0.06] p-5">
            <ControlSlider
              icon={<Gauge className="h-4 w-4" />}
              label="Prędkość przewijania"
              value={speed}
              min={8}
              max={120}
              suffix=" px/s"
              onChange={setSpeed}
            />
            <div className="my-5 h-px bg-white/10" />
            <ControlSlider
              icon={<Type className="h-4 w-4" />}
              label="Rozmiar tekstu"
              value={fontSize}
              min={28}
              max={100}
              suffix=" px"
              onChange={setFontSize}
            />
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/[0.06] p-5">
            <p className="mb-3 text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Orientacja tekstu</p>
            <div className="grid grid-cols-2 gap-2">
              <ControlButton active={rotation !== 0} onClick={rotate} icon={<RotateCw className="h-4 w-4" />}>
                Obrót {rotation}°
              </ControlButton>
              <ControlButton active={mirrorHorizontal} onClick={() => setMirrorHorizontal((value) => !value)} icon={<FlipHorizontal2 className="h-4 w-4" />}>
                Odbij poziomo
              </ControlButton>
              <ControlButton active={mirrorVertical} onClick={() => setMirrorVertical((value) => !value)} icon={<FlipVertical2 className="h-4 w-4" />}>
                Odbij pionowo
              </ControlButton>
              <ControlButton active={alignment === "center"} onClick={() => setAlignment((value) => value === "left" ? "center" : "left")} icon={alignment === "center" ? <AlignCenter className="h-4 w-4" /> : <AlignLeft className="h-4 w-4" />}>
                {alignment === "center" ? "Wyśrodkuj" : "Do lewej"}
              </ControlButton>
            </div>
          </section>
        </aside>

        <section className="min-w-0">
          <div
            ref={stageRef}
            className="relative flex min-h-[620px] flex-col overflow-hidden rounded-[32px] border border-white/10 bg-black shadow-2xl shadow-black/40 fullscreen:min-h-screen fullscreen:rounded-none"
          >
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-slate-950/90 px-4 py-3 sm:px-5">
              <div className="flex items-center gap-2">
                <span className={`h-2.5 w-2.5 rounded-full ${playing ? "animate-pulse bg-emerald-400" : "bg-slate-600"}`} />
                <span className="text-xs font-semibold text-slate-400">{playing ? "Przewijanie aktywne" : "Podgląd gotowy"}</span>
              </div>
              <div className="flex items-center gap-2">
                <button type="button" onClick={resetScroll} className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white" aria-label="Przewiń do początku">
                  <RotateCcw className="h-4 w-4" />
                </button>
                <button type="button" onClick={toggleFullscreen} className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white" aria-label={fullscreen ? "Wyjdź z pełnego ekranu" : "Pełny ekran"}>
                  {fullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </button>
                <button
                  type="button"
                  onClick={togglePlayback}
                  className="inline-flex h-10 items-center justify-center gap-2 rounded-full bg-violet-600 px-5 text-sm font-bold text-white transition hover:bg-violet-500"
                >
                  {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4 fill-current" />}
                  {playing ? "Pauza" : "Start"}
                </button>
              </div>
            </div>

            <div ref={scrollRef} className="relative flex-1 overflow-y-auto overscroll-contain scroll-smooth scrollbar-hide">
              <div className="pointer-events-none sticky top-1/2 z-10 h-px w-full bg-gradient-to-r from-transparent via-violet-400/35 to-transparent" />
              <div className="h-[42vh] min-h-[260px]" />
              <div className="mx-auto max-w-5xl px-[8%] transition-transform duration-300" style={{ transform }}>
                <div
                  className={`w-full whitespace-pre-wrap font-semibold leading-[1.42] tracking-[-0.025em] text-white ${alignment === "center" ? "text-center" : "text-left"}`}
                  style={{ fontSize }}
                >
                  {text || "Twój tekst pojawi się tutaj…"}
                </div>
              </div>
              <div className="h-[58vh] min-h-[380px]" />
            </div>

            <div className="flex items-center justify-between border-t border-white/10 bg-slate-950/90 px-4 py-3 text-[11px] font-medium text-slate-500 sm:px-5">
              <span>Spacja: start / pauza</span>
              <span>↑ ↓: prędkość</span>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

function ControlSlider({
  icon,
  label,
  value,
  min,
  max,
  suffix,
  onChange,
}: {
  icon: ReactNode;
  label: string;
  value: number;
  min: number;
  max: number;
  suffix: string;
  onChange: (value: number) => void;
}) {
  return (
    <label className="block">
      <span className="mb-3 flex items-center justify-between gap-3 text-sm font-semibold">
        <span className="flex items-center gap-2 text-slate-300">{icon}{label}</span>
        <span className="rounded-full bg-white/10 px-2.5 py-1 text-xs text-white">{value}{suffix}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="w-full accent-violet-500"
      />
    </label>
  );
}

function ControlButton({
  active,
  onClick,
  icon,
  children,
}: {
  active: boolean;
  onClick: () => void;
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex min-h-11 items-center gap-2 rounded-xl border px-3 text-left text-xs font-semibold transition ${active ? "border-violet-400 bg-violet-500/20 text-violet-100" : "border-white/10 bg-white/5 text-slate-300 hover:bg-white/10"}`}
    >
      {icon}
      {children}
    </button>
  );
}
