"use client";

import { useState, type FormEvent } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setPending(true);

    const formData = new FormData(event.currentTarget);
    const result = await signIn("credentials", {
      email: formData.get("email"),
      password: formData.get("password"),
      redirect: false,
    });

    setPending(false);
    if (result?.error) {
      setError("Nieprawidłowy email lub hasło.");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  };

  return (
    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-slate-300">Email</span>
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          className="h-12 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 text-white outline-none transition placeholder:text-slate-600 focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10"
          placeholder="ty@example.com"
        />
      </label>
      <label className="block">
        <span className="mb-2 block text-sm font-semibold text-slate-300">Hasło</span>
        <input
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="h-12 w-full rounded-2xl border border-white/10 bg-slate-900 px-4 text-white outline-none transition placeholder:text-slate-600 focus:border-violet-400 focus:ring-4 focus:ring-violet-500/10"
          placeholder="••••••••••••"
        />
      </label>
      {error ? <p role="alert" className="text-sm font-medium text-rose-400">{error}</p> : null}
      <button
        type="submit"
        disabled={pending}
        className="flex h-12 w-full items-center justify-center rounded-2xl bg-violet-600 px-5 text-sm font-bold text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {pending ? "Logowanie…" : "Zaloguj się"}
      </button>
    </form>
  );
}
