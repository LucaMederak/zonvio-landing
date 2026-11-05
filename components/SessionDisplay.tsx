"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { TeleprompterSessionState } from "@/lib/teleprompterSession";

export default function SessionDisplay({ initialSession }: Readonly<{ initialSession: TeleprompterSessionState }>) {
  const [session, setSession] = useState(initialSession);
  const [connected, setConnected] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const anchorRef = useRef({ position: initialSession.position, receivedAt: performance.now() });

  const fetchSession = useCallback(async () => {
    try {
      const response = await fetch(`/api/sessions/${initialSession.publicId}`, { cache: "no-store" });
      if (!response.ok) {
        setConnected(false);
        return;
      }
      const next = await response.json() as TeleprompterSessionState;
      anchorRef.current = { position: next.position, receivedAt: performance.now() };
      setSession(next);
      setConnected(true);
    } catch {
      setConnected(false);
    }
  }, [initialSession.publicId]);

  useEffect(() => {
    const interval = window.setInterval(() => void fetchSession(), 500);
    return () => window.clearInterval(interval);
  }, [fetchSession]);

  useEffect(() => {
    const draw = (time: number) => {
      const scrollArea = scrollRef.current;
      if (scrollArea) {
        const elapsed = session.isPlaying ? (time - anchorRef.current.receivedAt) / 1000 : 0;
        scrollArea.scrollTop = anchorRef.current.position + elapsed * session.speed;
      }
      frameRef.current = window.requestAnimationFrame(draw);
    };
    frameRef.current = window.requestAnimationFrame(draw);
    return () => {
      if (frameRef.current !== null) window.cancelAnimationFrame(frameRef.current);
    };
  }, [session.isPlaying, session.speed]);

  const transform = `rotate(${session.rotation}deg) scaleX(${session.mirrorHorizontal ? -1 : 1}) scaleY(${session.mirrorVertical ? -1 : 1})`;

  return (
    <main className="flex h-screen flex-col overflow-hidden bg-black text-white">
      <header className="flex items-center justify-between border-b border-white/10 bg-slate-950 px-4 py-3">
        <div className="min-w-0">
          <strong className="block truncate text-sm">{session.scriptTitle}</strong>
          <span className="text-xs text-slate-500">Ekran telepromptera</span>
        </div>
        <span className={`flex items-center gap-2 text-xs font-semibold ${connected ? "text-emerald-300" : "text-rose-300"}`}>
          <span className={`h-2 w-2 rounded-full ${connected ? "animate-pulse bg-emerald-400" : "bg-rose-400"}`} />
          {connected ? "Połączono" : "Rozłączono"}
        </span>
      </header>
      <div ref={scrollRef} className="relative flex-1 overflow-hidden">
        <div className="pointer-events-none sticky top-1/2 z-10 h-px w-full bg-gradient-to-r from-transparent via-violet-400/35 to-transparent" />
        <div className="h-[45vh]" />
        <div className="mx-auto max-w-6xl px-[7%]" style={{ transform }}>
          <div
            className={`whitespace-pre-wrap font-semibold leading-[1.42] tracking-[-0.025em] ${session.alignment === "center" ? "text-center" : "text-left"}`}
            style={{ fontSize: session.fontSize }}
          >
            {session.content}
          </div>
        </div>
        <div className="h-[60vh]" />
      </div>
    </main>
  );
}
