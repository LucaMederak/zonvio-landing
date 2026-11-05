"use server";

import { z } from "zod";
import { randomBytes } from "node:crypto";
import { auth } from "@/auth";
import { db } from "@/lib/db";
import type { TeleprompterScript } from "@/lib/scripts";
import type { TeleprompterSessionState } from "@/lib/teleprompterSession";

const scriptFields = z.object({
  title: z.string().trim().min(1).max(160),
  content: z.string().max(1_000_000),
});

const updateFields = scriptFields.extend({
  id: z.string().min(1),
});

const sessionStateFields = z.object({
  id: z.string().min(1),
  position: z.number().min(0).max(10_000_000),
  isPlaying: z.boolean(),
  speed: z.number().min(1).max(300),
  fontSize: z.number().int().min(12).max(200),
  rotation: z.union([z.literal(0), z.literal(90), z.literal(180), z.literal(270)]),
  mirrorHorizontal: z.boolean(),
  mirrorVertical: z.boolean(),
  alignment: z.union([z.literal("left"), z.literal("center")]),
});

async function requireUser() {
  const session = await auth();
  const email = session?.user?.email;
  if (!email) throw new Error("Unauthorized");

  const user = await db.user.findUnique({ where: { email } });
  if (!user) throw new Error("Unauthorized");

  return user;
}

function serializeScript(script: { id: string; title: string; content: string; updatedAt: Date }): TeleprompterScript {
  return {
    id: script.id,
    title: script.title,
    content: script.content,
    updatedAt: script.updatedAt.toISOString(),
  };
}

function serializeSession(session: {
  id: string;
  publicId: string;
  scriptId: string;
  active: boolean;
  isPlaying: boolean;
  position: number;
  speed: number;
  fontSize: number;
  rotation: number;
  mirrorHorizontal: boolean;
  mirrorVertical: boolean;
  alignment: string;
  updatedAt: Date;
  expiresAt: Date;
  script: { title: string; content: string };
}): TeleprompterSessionState {
  return {
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
  };
}

export async function createScript(input: { title: string; content: string }): Promise<TeleprompterScript> {
  const data = scriptFields.parse(input);
  const user = await requireUser();
  const script = await db.script.create({
    data: {
      ...data,
      userId: user.id,
    },
  });

  return serializeScript(script);
}

export async function updateScript(input: { id: string; title: string; content: string }): Promise<TeleprompterScript> {
  const data = updateFields.parse(input);
  const user = await requireUser();
  const result = await db.script.updateMany({
    where: { id: data.id, userId: user.id },
    data: { title: data.title, content: data.content },
  });
  if (result.count !== 1) throw new Error("Script not found");

  const script = await db.script.findUniqueOrThrow({ where: { id: data.id } });
  return serializeScript(script);
}

export async function deleteScript(id: string): Promise<void> {
  const scriptId = z.string().min(1).parse(id);
  const user = await requireUser();
  const result = await db.script.deleteMany({
    where: { id: scriptId, userId: user.id },
  });
  if (result.count !== 1) throw new Error("Script not found");
}

export async function startTeleprompterSession(input: {
  scriptId: string;
  position: number;
  speed: number;
  fontSize: number;
  rotation: 0 | 90 | 180 | 270;
  mirrorHorizontal: boolean;
  mirrorVertical: boolean;
  alignment: "left" | "center";
}): Promise<TeleprompterSessionState> {
  const fields = sessionStateFields.omit({ id: true, isPlaying: true }).extend({ scriptId: z.string().min(1) }).parse(input);
  const user = await requireUser();
  const script = await db.script.findFirst({ where: { id: fields.scriptId, userId: user.id } });
  if (!script) throw new Error("Script not found");

  const session = await db.teleprompterSession.upsert({
    where: { userId: user.id },
    update: {
      publicId: randomBytes(18).toString("base64url"),
      scriptId: script.id,
      active: true,
      isPlaying: false,
      position: fields.position,
      speed: fields.speed,
      fontSize: fields.fontSize,
      rotation: fields.rotation,
      mirrorHorizontal: fields.mirrorHorizontal,
      mirrorVertical: fields.mirrorVertical,
      alignment: fields.alignment,
      expiresAt: new Date(Date.now() + 12 * 60 * 60 * 1000),
    },
    create: {
      publicId: randomBytes(18).toString("base64url"),
      userId: user.id,
      scriptId: script.id,
      position: fields.position,
      speed: fields.speed,
      fontSize: fields.fontSize,
      rotation: fields.rotation,
      mirrorHorizontal: fields.mirrorHorizontal,
      mirrorVertical: fields.mirrorVertical,
      alignment: fields.alignment,
      expiresAt: new Date(Date.now() + 12 * 60 * 60 * 1000),
    },
    include: { script: true },
  });

  return serializeSession(session);
}

export async function syncTeleprompterSession(input: z.infer<typeof sessionStateFields>): Promise<void> {
  const fields = sessionStateFields.parse(input);
  const user = await requireUser();
  const result = await db.teleprompterSession.updateMany({
    where: { id: fields.id, userId: user.id, active: true },
    data: {
      position: fields.position,
      isPlaying: fields.isPlaying,
      speed: fields.speed,
      fontSize: fields.fontSize,
      rotation: fields.rotation,
      mirrorHorizontal: fields.mirrorHorizontal,
      mirrorVertical: fields.mirrorVertical,
      alignment: fields.alignment,
    },
  });
  if (result.count !== 1) throw new Error("Session not found");
}

export async function stopTeleprompterSession(id: string): Promise<void> {
  const sessionId = z.string().min(1).parse(id);
  const user = await requireUser();
  const result = await db.teleprompterSession.updateMany({
    where: { id: sessionId, userId: user.id },
    data: { active: false, isPlaying: false },
  });
  if (result.count !== 1) throw new Error("Session not found");
}
