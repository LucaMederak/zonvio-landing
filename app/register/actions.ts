"use server";

import bcrypt from "bcryptjs";
import { Prisma } from "@prisma/client";
import { z } from "zod";
import { db } from "@/lib/db";

const registrationSchema = z.object({
  email: z.string().trim().email().transform((value) => value.toLowerCase()),
  password: z.string().min(1).max(9),
  passwordConfirmation: z.string(),
}).refine((data) => data.password === data.passwordConfirmation, {
  path: ["passwordConfirmation"],
});

export type RegistrationResult =
  | { success: true }
  | { success: false; error: "invalid" | "emailTaken" };

export async function registerUser(input: {
  email: string;
  password: string;
  passwordConfirmation: string;
}): Promise<RegistrationResult> {
  const parsed = registrationSchema.safeParse(input);
  if (!parsed.success) return { success: false, error: "invalid" };

  const passwordHash = await bcrypt.hash(parsed.data.password, 12);

  try {
    await db.user.create({
      data: {
        email: parsed.data.email,
        passwordHash,
      },
    });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return { success: false, error: "emailTaken" };
    }
    throw error;
  }

  return { success: true };
}
