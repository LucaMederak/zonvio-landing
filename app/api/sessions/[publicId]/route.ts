import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(_request: Request, context: { params: Promise<{ publicId: string }> }) {
  const { publicId } = await context.params;
  const session = await db.teleprompterSession.findFirst({
    where: {
      publicId,
      active: true,
      expiresAt: { gt: new Date() },
    },
    include: { script: true },
  });
  if (!session) return NextResponse.json({ error: "Session not found" }, { status: 404 });

  return NextResponse.json({
    id: session.id,
    publicId: session.publicId,
    scriptId: session.scriptId,
    scriptTitle: session.script.title,
    content: session.script.content,
    active: session.active,
    isPlaying: session.isPlaying,
    position: session.position,
    speed: session.speed,
    fontSize: session.fontSize,
    rotation: session.rotation,
    mirrorHorizontal: session.mirrorHorizontal,
    mirrorVertical: session.mirrorVertical,
    alignment: session.alignment === "center" ? "center" : "left",
    updatedAt: session.updatedAt.toISOString(),
    expiresAt: session.expiresAt.toISOString(),
  });
}
