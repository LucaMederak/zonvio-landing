import { auth } from "@/auth";
import TeleprompterStudio from "@/components/TeleprompterStudio";
import { db } from "@/lib/db";
import type { TeleprompterSessionState } from "@/lib/teleprompterSession";

export default async function DashboardPage() {
  const session = await auth();
  const email = session?.user?.email ?? "";
  const user = await db.user.findUnique({
    where: { email },
    include: {
      scripts: {
        orderBy: { updatedAt: "desc" },
      },
    },
  });
  const scripts = (user?.scripts ?? []).map((script) => ({
    id: script.id,
    title: script.title,
    content: script.content,
    updatedAt: script.updatedAt.toISOString(),
  }));
  const activeSession = user ? await db.teleprompterSession.findFirst({
    where: { userId: user.id, active: true, expiresAt: { gt: new Date() } },
    include: { script: true },
  }) : null;
  const initialSession: TeleprompterSessionState | null = activeSession ? {
    id: activeSession.id,
    publicId: activeSession.publicId,
    scriptId: activeSession.scriptId,
    scriptTitle: activeSession.script.title,
    content: activeSession.script.content,
    active: activeSession.active,
    isPlaying: activeSession.isPlaying,
    position: activeSession.position,
    speed: activeSession.speed,
    fontSize: activeSession.fontSize,
    rotation: activeSession.rotation,
    mirrorHorizontal: activeSession.mirrorHorizontal,
    mirrorVertical: activeSession.mirrorVertical,
    alignment: activeSession.alignment === "center" ? "center" : "left",
    updatedAt: activeSession.updatedAt.toISOString(),
    expiresAt: activeSession.expiresAt.toISOString(),
  } : null;

  return <TeleprompterStudio userEmail={email} initialScripts={scripts} initialSession={initialSession} />;
}
