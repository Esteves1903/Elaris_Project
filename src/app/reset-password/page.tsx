"use client";

import Link from "next/link";
import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";

export default function ResetPasswordPage() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Supabase fires PASSWORD_RECOVERY when the user arrives via the reset link
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setReady(true);
    });
    return () => subscription.unsubscribe();
  }, []);

  const inputClass =
    "w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-zinc-600 focus:border-cyan-400/50 focus:bg-white/[0.05] focus:shadow-[0_0_0_3px_rgba(34,211,238,0.06)]";

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    setLoading(true);
    setError("");
    const { error: err } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (err) {
      setError(err.message);
    } else {
      router.push("/client-area");
    }
  }

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

      <section className="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] max-w-md flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 28, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 shadow-2xl shadow-black/30 backdrop-blur-sm"
        >
          <div className="mb-8">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">
              Password reset
            </p>
            <h1 className="mb-3 text-2xl font-bold tracking-tight">Set a new password</h1>
            <p className="text-sm leading-6 text-zinc-400">
              {ready
                ? "Choose a new password for your account."
                : "Verifying your reset link…"}
            </p>
          </div>

          <AnimatePresence>
            {ready && (
              <motion.form
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onSubmit={handleSubmit}
                className="grid gap-5"
              >
                <div>
                  <label htmlFor="password" className="mb-2 block text-sm font-medium text-zinc-300">
                    New password
                  </label>
                  <input
                    id="password"
                    type="password"
                    required
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label htmlFor="confirm" className="mb-2 block text-sm font-medium text-zinc-300">
                    Confirm password
                  </label>
                  <input
                    id="confirm"
                    type="password"
                    required
                    value={confirm}
                    onChange={(e) => setConfirm(e.target.value)}
                    placeholder="••••••••"
                    className={inputClass}
                  />
                </div>

                <AnimatePresence>
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300"
                    >
                      {error}
                    </motion.p>
                  )}
                </AnimatePresence>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-2 inline-flex w-full items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black shadow-[0_0_24px_rgba(255,255,255,0.1)] transition hover:bg-zinc-200 disabled:opacity-70"
                >
                  {loading ? "Saving..." : "Set new password"}
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          <div className="mt-6">
            <Link href="/client-login" className="text-sm font-medium text-zinc-400 transition hover:text-cyan-300">
              ← Back to login
            </Link>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
