import Link from "next/link";
import { LockKeyhole, Building2 } from "lucide-react";

export default function ClientLoginPage() {
  return (
    <main className="min-h-screen bg-[#0B0F19] px-6 pb-24 pt-32 text-white">
      <section className="mx-auto grid min-h-[calc(100vh-8rem)] max-w-6xl items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
        <div>
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">
            Client login
          </p>

          <h1 className="mb-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            Access your private project dashboard.
          </h1>

          <p className="max-w-xl text-base leading-7 text-zinc-300">
            This area is reserved for Elaris clients. Use the company access
            name and password provided after your project has been confirmed.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <Building2 className="mb-4 h-5 w-5 text-cyan-400" />

              <h2 className="mb-2 font-semibold text-white">
                Company access
              </h2>

              <p className="text-sm leading-6 text-zinc-400">
                Login with the unique access name assigned to your company.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-5">
              <LockKeyhole className="mb-4 h-5 w-5 text-cyan-400" />

              <h2 className="mb-2 font-semibold text-white">
                Private dashboard
              </h2>

              <p className="text-sm leading-6 text-zinc-400">
                Track progress, updates and project information in one place.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-black/20">
          <div className="mb-8">
            <h2 className="mb-3 text-2xl font-bold tracking-tight">
              Sign in
            </h2>

            <p className="text-sm leading-6 text-zinc-400">
              Enter the access details provided by the Elaris team.
            </p>
          </div>

          <form className="grid gap-5">
            <div>
              <label
                htmlFor="companyAccessName"
                className="mb-2 block text-sm font-medium text-zinc-300"
              >
                Company access name
              </label>

              <input
                id="companyAccessName"
                name="companyAccessName"
                type="text"
                placeholder="silva-cafe"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-cyan-400/50 focus:bg-white/[0.05]"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-2 block text-sm font-medium text-zinc-300"
              >
                Password
              </label>

              <input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-cyan-400/50 focus:bg-white/[0.05]"
              />
            </div>

            <Link
              href="/client-area"
              className="mt-2 inline-flex w-full justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
            >
              Sign in
            </Link>
          </form>

          <div className="mt-8 border-t border-white/10 pt-6">
            <p className="text-xs leading-5 text-zinc-500">
              Login details are created and provided directly by Elaris. If you
              do not have access yet, please contact our team.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}