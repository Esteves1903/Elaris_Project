"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, LockKeyhole } from "lucide-react";
import { signIn, getUserRole } from "@/lib/auth";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

export default function ClientLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");

    const { error } = await signIn(email, password);

    if (error) {
      setLoading(false);
      setErrorMessage("Invalid email or password.");
      return;
    }

    const role = await getUserRole();

    if (role === "admin") {
      router.push("/admin");
    } else if (role === "client") {
      router.push("/client-area");
    } else {
      setLoading(false);
      setErrorMessage("Access not configured. Please contact the Elaris team.");
    }
  }

  const inputClass =
    "w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-zinc-600 focus:border-cyan-400/50 focus:bg-white/[0.05] focus:shadow-[0_0_0_3px_rgba(34,211,238,0.06)]";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0B0F19] px-6 pb-24 pt-20 text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(34,211,238,0.7) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="pointer-events-none absolute -left-60 top-20 h-[500px] w-[500px] rounded-full bg-cyan-500/[0.06] blur-[130px]" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-[350px] w-[350px] rounded-full bg-indigo-500/[0.05] blur-[100px]" />

      <section className="relative z-10 mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl items-center gap-12 lg:grid-cols-[1fr_0.9fr]">
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">
            Client login
          </p>
          <h1 className="mb-6 max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">
            Access your private{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              project dashboard.
            </span>
          </h1>
          <p className="max-w-xl text-base leading-7 text-zinc-300">
            This area is reserved for Elaris clients. Use the email and password
            provided after your project has been confirmed.
          </p>

          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            <SpotlightCard className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-colors hover:border-cyan-400/20">
              <Mail className="mb-4 h-5 w-5 text-cyan-400" />
              <h2 className="mb-2 font-semibold text-white">Secure access</h2>
              <p className="text-sm leading-6 text-zinc-400">
                Login with the email and password provided by Elaris.
              </p>
            </SpotlightCard>

            <SpotlightCard className="rounded-2xl border border-white/10 bg-white/[0.04] p-5 transition-colors hover:border-cyan-400/20">
              <LockKeyhole className="mb-4 h-5 w-5 text-cyan-400" />
              <h2 className="mb-2 font-semibold text-white">Private dashboard</h2>
              <p className="text-sm leading-6 text-zinc-400">
                Track progress, updates and project information in one place.
              </p>
            </SpotlightCard>
          </div>
        </motion.div>

        {/* Right — form card */}
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-black/30 backdrop-blur-sm"
        >
          <div className="mb-8">
            <h2 className="mb-3 text-2xl font-bold tracking-tight">Sign in</h2>
            <p className="text-sm leading-6 text-zinc-400">
              Enter the access details provided by the Elaris team.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="grid gap-5">
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-zinc-300">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-zinc-300">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={inputClass}
              />
            </div>

            <AnimatePresence>
              {errorMessage && (
                <motion.p
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300"
                >
                  {errorMessage}
                </motion.p>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={loading}
              className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black shadow-[0_0_24px_rgba(255,255,255,0.1)] transition hover:bg-zinc-200 disabled:opacity-70"
            >
              <AnimatePresence mode="wait" initial={false}>
                {loading ? (
                  <motion.span
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center gap-2"
                  >
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }}
                      className="block h-4 w-4 rounded-full border-2 border-black/20 border-t-black"
                    />
                    Signing in...
                  </motion.span>
                ) : (
                  <motion.span
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Sign in
                  </motion.span>
                )}
              </AnimatePresence>
            </button>
          </form>

          <div className="mt-8 space-y-4 border-t border-white/10 pt-6">
            <p className="text-xs leading-5 text-zinc-500">
              Login details are created and provided directly by Elaris. If you do not
              have access yet, please contact our team.
            </p>
          </div>

          <div className="mt-6">
            <Link href="/" className="text-sm font-medium text-zinc-400 transition hover:text-cyan-300">
              ← Back to homepage
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
