"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { clearMockAdminSession, hasMockAdminSession } from "@/lib/mock-admin-auth";
import { projectStageOptions, projectTypeOptions, websiteStatusOptions } from "@/lib/project-options";

export default function NewAdminClientPage() {
  const router = useRouter();
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const isLoggedIn = hasMockAdminSession();
    if (!isLoggedIn) {
      router.push("/client-login");
      return;
    }
    setIsCheckingSession(false);
  }, [router]);

  function handleLogout() {
    clearMockAdminSession();
    router.push("/client-login");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSuccessMessage("Client created locally for this session.");
  }

  if (isCheckingSession) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0B0F19] px-6 text-white">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">New client</p>
          <p className="text-zinc-400">Checking admin access...</p>
        </motion.div>
      </main>
    );
  }

  const inputClass =
    "w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition-all placeholder:text-zinc-600 focus:border-cyan-400/50 focus:bg-white/[0.05] focus:shadow-[0_0_0_3px_rgba(34,211,238,0.06)]";
  const selectClass =
    "w-full rounded-2xl border border-white/10 bg-[#111827] px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/50";

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0B0F19] px-6 pb-24 pt-32 text-white">
      <div className="pointer-events-none absolute -left-60 top-10 h-[400px] w-[400px] rounded-full bg-cyan-500/[0.04] blur-[120px]" />

      <section className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex items-center justify-between gap-4"
        >
          <Link
            href="/admin"
            className="inline-flex text-sm font-medium text-zinc-400 transition hover:text-cyan-300"
          >
            ← Back to admin
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-full border border-white/10 px-5 py-2 text-sm font-semibold text-white transition hover:border-cyan-400/40 hover:bg-white/[0.06]"
          >
            Log out
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 max-w-3xl"
        >
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">
            New client
          </p>
          <h1 className="mb-5 text-4xl font-bold tracking-tight sm:text-5xl">
            Create a new{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              client project.
            </span>
          </h1>
          <p className="text-base leading-7 text-zinc-300">
            Add the main details for a new Elaris client. This form is currently visual only
            and will later be connected to the database.
          </p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          onSubmit={handleSubmit}
          className="rounded-3xl border border-white/10 bg-white/[0.04] p-8"
        >
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-cyan-400">
                Client setup
              </p>
              <h2 className="text-2xl font-bold tracking-tight">Project information</h2>
            </div>
            <button
              type="submit"
              className="w-fit rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black shadow-[0_0_24px_rgba(255,255,255,0.08)] transition hover:bg-zinc-200"
            >
              Create client
            </button>
          </div>

          <AnimatePresence>
            {successMessage && (
              <motion.p
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mb-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-300"
              >
                {successMessage}
              </motion.p>
            )}
          </AnimatePresence>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">Client name</label>
              <input placeholder="João Silva" className={inputClass} />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">Company</label>
              <input placeholder="Silva Café" className={inputClass} />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">Company access name</label>
              <input placeholder="silva-cafe" className={inputClass} />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">Temporary password</label>
              <input type="password" placeholder="Temporary client password" className={inputClass} />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">Project type</label>
              <select className={selectClass}>
                {projectTypeOptions.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">Service plan</label>
              <input placeholder="Standard website" className={inputClass} />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">Website name</label>
              <input placeholder="Silva Café Website" className={inputClass} />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">Website URL</label>
              <input placeholder="https://silvacafe.com" className={inputClass} />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">Website status</label>
              <select className={selectClass}>
                {websiteStatusOptions.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">Current stage</label>
              <select className={selectClass}>
                {projectStageOptions.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">Estimated delivery</label>
              <input placeholder="12 June 2026" className={inputClass} />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">Last update</label>
              <input placeholder="05 May 2026" className={inputClass} />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium text-zinc-300">Next step</label>
              <textarea
                rows={4}
                placeholder="Homepage first version in progress"
                className={`${inputClass} resize-none`}
              />
            </div>
          </div>
        </motion.form>
      </section>
    </main>
  );
}
