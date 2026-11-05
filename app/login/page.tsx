import Image from "next/image";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import LoginForm from "@/components/LoginForm";

export default async function LoginPage() {
  const session = await auth();
  if (session?.user) redirect("/dashboard");

  return (
    <main className="grid min-h-screen place-items-center bg-slate-950 px-4 py-12 text-white">
      <section className="w-full max-w-md rounded-[32px] border border-white/10 bg-white/[0.06] p-7 shadow-2xl shadow-black/30 sm:p-9">
        <div className="flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-xl bg-white">
            <Image src="/zonvio-logo.svg" width={30} height={30} alt="" priority />
          </span>
          <span>
            <strong className="block text-sm font-bold">Zonvio Teleprompter</strong>
            <span className="text-xs text-slate-400">Panel użytkownika</span>
          </span>
        </div>
        <h1 className="mt-8 text-3xl font-bold tracking-tight">Zaloguj się</h1>
        <p className="mt-2 text-sm leading-6 text-slate-400">Wpisz email i hasło przypisane do Twojego konta.</p>
        <LoginForm />
      </section>
    </main>
  );
}
