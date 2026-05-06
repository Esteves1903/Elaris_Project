"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getUserRole, signOut } from "@/lib/auth";
import { projectStageOptions, projectTypeOptions, websiteStatusOptions } from "@/lib/project-options";
import { supabase } from "@/lib/supabase";

export default function NewAdminClientPage() {
  const router = useRouter();
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [slug, setSlug] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState(projectTypeOptions[0]);
  const [plan, setPlan] = useState("");
  const [websiteName, setWebsiteName] = useState("");
  const [websiteUrl, setWebsiteUrl] = useState("");
  const [status, setStatus] = useState(websiteStatusOptions[0]);
  const [stage, setStage] = useState(projectStageOptions[0]);
  const [estimatedDelivery, setEstimatedDelivery] = useState("");
  const [lastUpdate, setLastUpdate] = useState("");
  const [nextStep, setNextStep] = useState("");

  useEffect(() => {
    getUserRole().then((role) => {
      if (role !== "admin") {
        router.push("/client-login");
        return;
      }
      setIsCheckingSession(false);
    });
  }, [router]);

  function handleLogout() {
    signOut().then(() => router.push("/client-login"));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    const { data: { session } } = await supabase.auth.getSession();

    const res = await fetch("/api/admin/clients", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.access_token}`,
      },
      body: JSON.stringify({
        name, email, company, slug, password,
        type, plan, websiteName, websiteUrl,
        status, stage, estimatedDelivery, lastUpdate, nextStep,
      }),
    });

    const json = await res.json();
    setLoading(false);

    if (!res.ok) {
      setErrorMessage(json.error ?? "Failed to create client.");
      return;
    }

    setSuccessMessage(`Client "${name}" created successfully.`);
    setName(""); setEmail(""); setCompany(""); setSlug(""); setPassword("");
    setPlan(""); setWebsiteName(""); setWebsiteUrl(""); setEstimatedDelivery("");
    setLastUpdate(""); setNextStep("");
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
          <Link href="/admin" className="inline-flex text-sm font-medium text-zinc-400 transition hover:text-cyan-300">
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
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">New client</p>
          <h1 className="mb-5 text-4xl font-bold tracking-tight sm:text-5xl">
            Create a new{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              client project.
            </span>
          </h1>
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
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-cyan-400">Client setup</p>
              <h2 className="text-2xl font-bold tracking-tight">Project information</h2>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-fit rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black shadow-[0_0_24px_rgba(255,255,255,0.08)] transition hover:bg-zinc-200 disabled:opacity-60"
            >
              {loading ? "Creating..." : "Create client"}
            </button>
          </div>

          <AnimatePresence>
            {successMessage && (
              <motion.p initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="mb-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-300">
                {successMessage}
              </motion.p>
            )}
            {errorMessage && (
              <motion.p initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="mb-6 rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">
                {errorMessage}
              </motion.p>
            )}
          </AnimatePresence>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">Client name</label>
              <input value={name} onChange={e => setName(e.target.value)} required placeholder="João Silva" className={inputClass} />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">Client email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="joao@silvacafe.com" className={inputClass} />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">Company</label>
              <input value={company} onChange={e => setCompany(e.target.value)} required placeholder="Silva Café" className={inputClass} />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">Company access name</label>
              <input value={slug} onChange={e => setSlug(e.target.value)} required placeholder="silva-cafe" className={inputClass} />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">Temporary password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Temporary client password" className={inputClass} />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">Project type</label>
              <select value={type} onChange={e => setType(e.target.value)} className={selectClass}>
                {projectTypeOptions.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">Service plan</label>
              <input value={plan} onChange={e => setPlan(e.target.value)} placeholder="Standard website" className={inputClass} />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">Website name</label>
              <input value={websiteName} onChange={e => setWebsiteName(e.target.value)} placeholder="Silva Café Website" className={inputClass} />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">Website URL</label>
              <input value={websiteUrl} onChange={e => setWebsiteUrl(e.target.value)} placeholder="https://silvacafe.com" className={inputClass} />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">Website status</label>
              <select value={status} onChange={e => setStatus(e.target.value)} className={selectClass}>
                {websiteStatusOptions.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">Current stage</label>
              <select value={stage} onChange={e => setStage(e.target.value)} className={selectClass}>
                {projectStageOptions.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">Estimated delivery</label>
              <input value={estimatedDelivery} onChange={e => setEstimatedDelivery(e.target.value)} placeholder="12 June 2026" className={inputClass} />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">Last update</label>
              <input value={lastUpdate} onChange={e => setLastUpdate(e.target.value)} placeholder="05 May 2026" className={inputClass} />
            </div>
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium text-zinc-300">Next step</label>
              <textarea rows={4} value={nextStep} onChange={e => setNextStep(e.target.value)}
                placeholder="Homepage first version in progress"
                className={`${inputClass} resize-none`} />
            </div>
          </div>
        </motion.form>
      </section>
    </main>
  );
}
