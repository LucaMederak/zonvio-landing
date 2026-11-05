import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";

const email = process.env.SEED_USER_EMAIL?.trim().toLowerCase();
const password = process.env.SEED_USER_PASSWORD;

if (!email || !password) {
  throw new Error("SEED_USER_EMAIL and SEED_USER_PASSWORD are required");
}

if (password.length < 12) {
  throw new Error("SEED_USER_PASSWORD must contain at least 12 characters");
}

const prisma = new PrismaClient();
const passwordHash = await bcrypt.hash(password, 12);

await prisma.user.upsert({
  where: { email },
  update: { passwordHash },
  create: { email, passwordHash },
});

await prisma.$disconnect();
