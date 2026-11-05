"use client";

import {
  AlignCenter,
  AlignLeft,
  AlertCircle,
  Check,
  Copy,
  ExternalLink,
  FileText,
  FileUp,
  FlipHorizontal2,
  FlipVertical2,
  Gauge,
  LoaderCircle,
  Maximize2,
  Minimize2,
  Pause,
  Play,
  Plus,
  Radio,
  RotateCcw,
  RotateCw,
  Square,
  Trash2,
  Type,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";
import { createScript, deleteScript, startTeleprompterSession, stopTeleprompterSession, syncTeleprompterSession, updateScript } from "@/app/dashboard/actions";
import SignOutButton from "@/components/SignOutButton";
import type { TeleprompterScript } from "@/lib/scripts";
import type { TeleprompterSessionState } from "@/lib/teleprompterSession";

const initialText = `Wklej tutaj tekst, który chcesz przeczytać.

Ustaw wygodny rozmiar liter i prędkość przewijania. Możesz obrócić tekst lub odbić go poziomo, jeśli korzystasz z lustra telepromptera.

Kiedy wszystko będzie gotowe, wybierz Start.`;

const rotations = [0, 90, 180, 270] as const;
type Rotation = (typeof rotations)[number];
type TextAlignment = "left" | "center";

type SaveStatus = "idle" | "saving" | "saved" | "error";

export default function TeleprompterStudio({
  userEmail,
  initialScripts,
  initialSession,
}: Readonly<{
  userEmail: string;
  initialScripts: TeleprompterScript[];
  initialSession: TeleprompterSessionState | null;
}>) {
  const initialScript = initialScripts[0] ?? null;
  const [scripts, setScripts] = useState(initialScripts);
  const [activeScriptId, setActiveScriptId] = useState<string | null>(initialScript?.id ?? null);
  const [title, setTitle] = useState(initialScript?.title ?? "");
  const [text, setText] = useState(initialScript?.content ?? "");
  const [saveStatus, setSaveStatus] = useState<SaveStatus>(initialScript ? "saved" : "idle");
  const [scriptActionPending, setScriptActionPending] = useState(false);
  const [liveSession, setLiveSession] = useState(initialSession);
  const [sessionPending, setSessionPending] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);
  const [appOrigin, setAppOrigin] = useState("");
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
  const fileInputRef = useRef<HTMLInputElement>(null);
  const savedValueRef = useRef(initialScript ? `${initialScript.title}\u0000${initialScript.content}` : "");
  const saveVersionRef = useRef(0);

  useEffect(() => setAppOrigin(window.location.origin), []);

  useEffect(() => {
    if (!activeScriptId) return;
    const nextValue = `${title.trim()}\u0000${text}`;
    if (!title.trim() || nextValue === savedValueRef.current) return;

    const version = ++saveVersionRef.current;
    setSaveStatus("saving");
    const timeout = window.setTimeout(async () => {
      try {
        const updated = await updateScript({ id: activeScriptId, title: title.trim(), content: text });
        if (version !== saveVersionRef.current) return;
        savedValueRef.current = `${updated.title}\u0000${updated.content}`;
        setScripts((current) => current.map((script) => script.id === updated.id ? updated : script));
        setSaveStatus("saved");
      } catch {
        if (version === saveVersionRef.current) setSaveStatus("error");
      }
    }, 800);

    return () => window.clearTimeout(timeout);
  }, [activeScriptId, text, title]);

  const persistActiveScript = async () => {
    if (!activeScriptId || !title.trim()) return;
    const nextValue = `${title.trim()}\u0000${text}`;
    if (nextValue === savedValueRef.current) return;

    const updated = await updateScript({ id: activeScriptId, title: title.trim(), content: text });
    savedValueRef.current = `${updated.title}\u0000${updated.content}`;
    setScripts((current) => current.map((script) => script.id === updated.id ? updated : script));
    setSaveStatus("saved");
  };

  const activateScript = (script: TeleprompterScript) => {
    saveVersionRef.current += 1;
    setActiveScriptId(script.id);
    setTitle(script.title);
    setText(script.content);
    savedValueRef.current = `${script.title}\u0000${script.content}`;
    setSaveStatus("saved");
    stop();
    scrollRef.current?.scrollTo({ top: 0 });
  };

  const selectScript = async (script: TeleprompterScript) => {
    try {
      await persistActiveScript();
      activateScript(script);
    } catch {
      setSaveStatus("error");
    }
  };

  const addScript = async () => {
    setScriptActionPending(true);
    try {
      await persistActiveScript();
      const script = await createScript({ title: "Nowy skrypt", content: initialText });
      setScripts((current) => [script, ...current]);
      activateScript(script);
    } catch {
      setSaveStatus("error");
    } finally {
      setScriptActionPending(false);
    }
  };

  const removeScript = async () => {
    if (!activeScriptId || !window.confirm("Usunąć ten skrypt?")) return;
    setScriptActionPending(true);
    try {
      await deleteScript(activeScriptId);
      const remaining = scripts.filter((script) => script.id !== activeScriptId);
      setScripts(remaining);
      const next = remaining[0] ?? null;
      setActiveScriptId(next?.id ?? null);
      setTitle(next?.title ?? "");
      setText(next?.content ?? "");
      savedValueRef.current = next ? `${next.title}\u0000${next.content}` : "";
      setSaveStatus(next ? "saved" : "idle");
    } finally {
      setScriptActionPending(false);
    }
  };

  const importFile = async (file: File) => {
    const extension = file.name.split(".").pop()?.toLowerCase();
    if (extension !== "txt" && extension !== "md") {
      window.alert("Możesz importować pliki .txt i .md.");
      return;
    }

    setScriptActionPending(true);
    try {
      const content = await file.text();
      const fileTitle = file.name.replace(/\.(txt|md)$/i, "").trim() || "Importowany skrypt";
      await persistActiveScript();
      const script = await createScript({ title: fileTitle, content });
      setScripts((current) => [script, ...current]);
      activateScript(script);
    } catch {
      setSaveStatus("error");
    } finally {
      setScriptActionPending(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

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
    if (!liveSession?.active || liveSession.scriptId !== activeScriptId) return;

    const pushState = () => {
      void syncTeleprompterSession({
        id: liveSession.id,
        position: scrollRef.current?.scrollTop ?? 0,
        isPlaying: playing,
        speed,
        fontSize,
        rotation,
        mirrorHorizontal,
        mirrorVertical,
        alignment,
      }).catch(() => undefined);
    };
    pushState();
    const interval = window.setInterval(pushState, 750);
    return () => window.clearInterval(interval);
  }, [activeScriptId, alignment, fontSize, liveSession, mirrorHorizontal, mirrorVertical, playing, rotation, speed]);

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

  const beginLiveSession = async () => {
    if (!activeScriptId) return;
    setSessionPending(true);
    try {
      await persistActiveScript();
      const session = await startTeleprompterSession({
        scriptId: activeScriptId,
        position: scrollRef.current?.scrollTop ?? 0,
        speed,
        fontSize,
        rotation,
        mirrorHorizontal,
        mirrorVertical,
        alignment,
      });
      setLiveSession(session);
    } finally {
      setSessionPending(false);
    }
  };

  const endLiveSession = async () => {
    if (!liveSession) return;
    setSessionPending(true);
    try {
      await stopTeleprompterSession(liveSession.id);
      setLiveSession(null);
    } finally {
      setSessionPending(false);
    }
  };

  const copySessionLink = async () => {
    if (!liveSession || !appOrigin) return;
    await navigator.clipboard.writeText(`${appOrigin}/session/${liveSession.publicId}`);
    setLinkCopied(true);
    window.setTimeout(() => setLinkCopied(false), 1600);
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
          <div className="flex items-center gap-3">
            <span className="hidden text-xs text-slate-400 sm:inline">{userEmail}</span>
            <SignOutButton />
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1500px] gap-5 p-4 sm:p-6 xl:grid-cols-[390px_minmax(0,1fr)]">
        <aside className="space-y-4">
          <section className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-black/20">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-300">Biblioteka</p>
                <h1 className="mt-1 text-xl font-bold">Twoje skrypty</h1>
              </div>
              <button
                type="button"
                onClick={() => void addScript()}
                disabled={scriptActionPending}
                className="grid h-10 w-10 place-items-center rounded-full bg-violet-600 text-white transition hover:bg-violet-500 disabled:opacity-50"
                aria-label="Utwórz skrypt"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-4 max-h-48 space-y-2 overflow-y-auto pr-1">
              {scripts.length ? scripts.map((script) => (
                <button
                  key={script.id}
                  type="button"
                  onClick={() => void selectScript(script)}
                  className={`flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition ${script.id === activeScriptId ? "border-violet-400/60 bg-violet-500/15" : "border-white/10 bg-slate-900/60 hover:bg-white/10"}`}
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-white/10 text-slate-300">
                    <FileText className="h-4 w-4" />
                  </span>
                  <span className="min-w-0">
                    <strong className="block truncate text-sm font-semibold text-slate-100">{script.title}</strong>
                    <span className="mt-0.5 block text-[11px] text-slate-500">{new Intl.DateTimeFormat("pl-PL", { dateStyle: "medium", timeStyle: "short" }).format(new Date(script.updatedAt))}</span>
                  </span>
                </button>
              )) : (
                <div className="rounded-2xl border border-dashed border-white/10 px-4 py-6 text-center text-sm text-slate-500">
                  Utwórz pierwszy skrypt lub wgraj plik.
                </div>
              )}
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept=".txt,.md,text/plain,text/markdown"
              className="hidden"
              onChange={(event) => {
                const file = event.target.files?.[0];
                if (file) void importFile(file);
              }}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              disabled={scriptActionPending}
              className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 text-xs font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white disabled:opacity-50"
            >
              <FileUp className="h-4 w-4" />
              Wgraj plik .txt lub .md
            </button>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/[0.06] p-5 shadow-2xl shadow-black/20">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.16em] text-violet-300">Edytor</p>
                <h2 className="mt-1 text-xl font-bold">Treść skryptu</h2>
              </div>
              <Type className="h-5 w-5 text-slate-400" />
            </div>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              onBlur={() => {
                if (!title.trim()) setTitle("Bez tytułu");
              }}
              disabled={!activeScriptId}
              maxLength={160}
              className="mb-3 h-11 w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 text-sm font-semibold text-white outline-none transition placeholder:text-slate-600 focus:border-violet-400 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Nazwa skryptu"
              aria-label="Nazwa skryptu"
            />
            <textarea
              value={text}
              onChange={(event) => setText(event.target.value)}
              disabled={!activeScriptId}
              className="min-h-[260px] w-full resize-y rounded-2xl border border-white/10 bg-slate-900/80 p-4 text-[15px] leading-7 text-slate-100 outline-none transition placeholder:text-slate-600 focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10"
              placeholder={activeScriptId ? "Wklej tekst do telepromptera…" : "Najpierw utwórz lub wgraj skrypt."}
              aria-label="Tekst telepromptera"
            />
            <div className="mt-3 flex justify-between text-xs text-slate-500">
              <span>{text.trim() ? text.trim().split(/\s+/).length : 0} słów</span>
              <SaveIndicator status={saveStatus} />
            </div>
            <button
              type="button"
              onClick={() => void removeScript()}
              disabled={!activeScriptId || scriptActionPending}
              className="mt-4 flex h-10 w-full items-center justify-center gap-2 rounded-xl border border-rose-400/15 bg-rose-400/5 text-xs font-semibold text-rose-300 transition hover:bg-rose-400/10 disabled:cursor-not-allowed disabled:opacity-40"
            >
              <Trash2 className="h-4 w-4" />
              Usuń skrypt
            </button>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/[0.06] p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.14em] text-slate-400">Synchronizacja urządzeń</p>
                <h2 className="mt-1 text-lg font-bold">Sesja na żywo</h2>
              </div>
              <Radio className={`h-5 w-5 ${liveSession ? "animate-pulse text-emerald-400" : "text-slate-500"}`} />
            </div>
            {liveSession ? (
              <div className="mt-4 space-y-3">
                <div className="rounded-2xl border border-emerald-400/15 bg-emerald-400/5 p-3">
                  <div className="flex items-center gap-2 text-xs font-semibold text-emerald-300">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    Sesja aktywna przez 12 godzin
                  </div>
                  <p className="mt-2 truncate text-xs text-slate-400">{appOrigin}/session/{liveSession.publicId}</p>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => void copySessionLink()}
                    className="flex h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 text-xs font-semibold text-slate-200 transition hover:bg-white/10"
                  >
                    {linkCopied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                    {linkCopied ? "Skopiowano" : "Kopiuj link"}
                  </button>
                  <a
                    href={`/session/${liveSession.publicId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="flex h-11 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 text-xs font-semibold text-slate-200 transition hover:bg-white/10"
                  >
                    <ExternalLink className="h-4 w-4" />
                    Otwórz ekran
                  </a>
                </div>
                <button
                  type="button"
                  onClick={() => void endLiveSession()}
                  disabled={sessionPending}
                  className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-rose-400/15 bg-rose-400/5 text-xs font-semibold text-rose-300 transition hover:bg-rose-400/10 disabled:opacity-50"
                >
                  <Square className="h-3.5 w-3.5 fill-current" />
                  Zakończ sesję
                </button>
              </div>
            ) : (
              <div className="mt-4">
                <p className="text-sm leading-6 text-slate-400">Utwórz link do otwarcia na tablecie lub drugim komputerze.</p>
                <button
                  type="button"
                  onClick={() => void beginLiveSession()}
                  disabled={!activeScriptId || sessionPending}
                  className="mt-3 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-4 text-xs font-bold text-slate-950 transition hover:bg-emerald-400 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <Radio className="h-4 w-4" />
                  Rozpocznij sesję
                </button>
              </div>
            )}
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

            <div ref={scrollRef} className="relative flex-1 overflow-y-auto overscroll-contain scrollbar-hide">
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

function SaveIndicator({ status }: Readonly<{ status: SaveStatus }>) {
  if (status === "saving") {
    return <span className="flex items-center gap-1.5 text-amber-300"><LoaderCircle className="h-3.5 w-3.5 animate-spin" />Zapisywanie…</span>;
  }

  if (status === "saved") {
    return <span className="flex items-center gap-1.5 text-emerald-300"><Check className="h-3.5 w-3.5" />Zapisano</span>;
  }

  if (status === "error") {
    return <span className="flex items-center gap-1.5 text-rose-300"><AlertCircle className="h-3.5 w-3.5" />Błąd zapisu</span>;
  }

  return <span>Zapis automatyczny</span>;
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
