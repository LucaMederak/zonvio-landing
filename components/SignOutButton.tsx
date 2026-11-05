"use client";

import { LogOut } from "lucide-react";
import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      type="button"
      onClick={() => signOut({ callbackUrl: "/login" })}
      className="inline-flex h-10 items-center justify-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 text-xs font-semibold text-slate-300 transition hover:bg-white/10 hover:text-white"
    >
      <LogOut className="h-4 w-4" />
      Wyloguj
    </button>
  );
}
