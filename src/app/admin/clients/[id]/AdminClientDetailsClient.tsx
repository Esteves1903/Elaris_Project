"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getUserRole, signOut } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import {
  projectStageOptions,
  websiteStatusOptions,
} from "@/lib/project-options";

type ProjectUpdate = {
  id: string;
  title: string;
  message: string;
  created_at: string;
};

type Project = {
  id: string;
  type: string;
  plan: string;
  website_name: string;
  website_url: string;
  status: string;
  stage: string;
  estimated_delivery: string;
  last_update: string;
  next_step: string;
  project_updates: ProjectUpdate[];
};

type AdminClient = {
  id: string;
  name: string;
  email: string;
  company: string;
  slug: string;
  projects: Project[];
};

type AdminClientDetailsClientProps = {
  client: AdminClient;
};

const inputClass =
  "w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/50 focus:bg-white/[0.05]";
const selectClass =
  "w-full rounded-2xl border border-white/10 bg-[#111827] px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/50";

export default function AdminClientDetailsClient({ client }: AdminClientDetailsClientProps) {
  const router = useRouter();
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  const project = client.projects?.[0];

  const [websiteName, setWebsiteName] = useState(project?.website_name ?? "");
  const [websiteUrl, setWebsiteUrl] = useState(project?.website_url ?? "");
  const [websiteStatus, setWebsiteStatus] = useState(project?.status ?? websiteStatusOptions[0]);
  const [currentStage, setCurrentStage] = useState(project?.stage ?? projectStageOptions[0]);
  const [estimatedDelivery, setEstimatedDelivery] = useState(project?.estimated_delivery ?? "");
  const [lastUpdate, setLastUpdate] = useState(project?.last_update ?? "");
  const [nextStep, setNextStep] = useState(project?.next_step ?? "");

  const [latestUpdates, setLatestUpdates] = useState<ProjectUpdate[]>(
    project?.project_updates
      ? [...project.project_updates].sort(
          (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
        )
      : [],
  );

  const [isAddingUpdate, setIsAddingUpdate] = useState(false);
  const [newUpdateTitle, setNewUpdateTitle] = useState("");
  const [newUpdateMessage, setNewUpdateMessage] = useState("");
  const [saveLoading, setSaveLoading] = useState(false);
  const [addLoading, setAddLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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

  async function getAuthHeader() {
    const { data: { session } } = await supabase.auth.getSession();
    return { Authorization: `Bearer ${session?.access_token}` };
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaveLoading(true);
    setSuccessMessage("");
    setErrorMessage("");

    const headers = await getAuthHeader();
    const res = await fetch(`/api/admin/clients/${client.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify({
        websiteName, websiteUrl, status: websiteStatus,
        stage: currentStage, estimatedDelivery, lastUpdate, nextStep,
      }),
    });

    setSaveLoading(false);
    if (!res.ok) {
      const json = await res.json();
      setErrorMessage(json.error ?? "Failed to save changes.");
    } else {
      setSuccessMessage("Changes saved successfully.");
    }
  }

  async function handleAddUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!newUpdateTitle || !newUpdateMessage) return;
    setAddLoading(true);

    const headers = await getAuthHeader();
    const res = await fetch(`/api/admin/clients/${client.id}/updates`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify({ title: newUpdateTitle, message: newUpdateMessage }),
    });

    setAddLoading(false);
    if (!res.ok) {
      const json = await res.json();
      setErrorMessage(json.error ?? "Failed to add update.");
      return;
    }

    const json = await res.json();
    setLatestUpdates((prev) => [json.update, ...prev]);
    setNewUpdateTitle("");
    setNewUpdateMessage("");
    setIsAddingUpdate(false);
  }

  if (isCheckingSession) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0B0F19] px-6 text-white">
        <div className="text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">
            Admin dashboard
          </p>
          <p className="text-zinc-400">Checking admin access...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0B0F19] px-6 pb-24 pt-32 text-white">
      <div className="pointer-events-none absolute -right-60 top-10 h-[400px] w-[400px] rounded-full bg-cyan-500/[0.04] blur-[120px]" />

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
          className="mb-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">
              Client details
            </p>
            <h1 className="mb-5 text-4xl font-bold tracking-tight sm:text-5xl">
              <span className="bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                {client.company}
              </span>
            </h1>
            <p className="max-w-2xl text-base leading-7 text-zinc-300">
              Manage project information, website status and recent updates for this client.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-2 text-sm font-semibold text-cyan-300">
              {websiteStatus}
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]"
        >
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
            <p className="mb-6 text-sm font-medium uppercase tracking-[0.25em] text-cyan-400">
              Client profile
            </p>
            <div className="grid gap-6">
              {[
                { label: "Client name", value: client.name },
                { label: "Email", value: client.email },
                { label: "Company", value: client.company },
                { label: "Access slug", value: client.slug },
                { label: "Project type", value: project?.type ?? "—" },
                { label: "Service plan", value: project?.plan ?? "—" },
              ].map(({ label, value }) => (
                <div key={label}>
                  <p className="mb-2 text-sm text-zinc-500">{label}</p>
                  <p className="font-medium text-white">{value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
            <form onSubmit={handleSubmit}>
              <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-cyan-400">
                    Project details
                  </p>
                  <h2 className="text-2xl font-bold tracking-tight">Website information</h2>
                </div>
                <button
                  type="submit"
                  disabled={saveLoading}
                  className="w-fit rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-200 disabled:opacity-60"
                >
                  {saveLoading ? "Saving..." : "Save changes"}
                </button>
              </div>

              <AnimatePresence>
                {successMessage && (
                  <motion.p
                    key="success"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mb-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-300"
                  >
                    {successMessage}
                  </motion.p>
                )}
                {errorMessage && (
                  <motion.p
                    key="error"
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mb-6 rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300"
                  >
                    {errorMessage}
                  </motion.p>
                )}
              </AnimatePresence>

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-300">Website name</label>
                  <input value={websiteName} onChange={(e) => setWebsiteName(e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-300">Website URL</label>
                  <input value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} placeholder="https://" className={inputClass} />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-300">Website status</label>
                  <select value={websiteStatus} onChange={(e) => setWebsiteStatus(e.target.value)} className={selectClass}>
                    {websiteStatusOptions.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-300">Current stage</label>
                  <select value={currentStage} onChange={(e) => setCurrentStage(e.target.value)} className={selectClass}>
                    {projectStageOptions.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-300">Estimated delivery</label>
                  <input value={estimatedDelivery} onChange={(e) => setEstimatedDelivery(e.target.value)} placeholder="12 June 2026" className={inputClass} />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-300">Last update</label>
                  <input value={lastUpdate} onChange={(e) => setLastUpdate(e.target.value)} placeholder="05 May 2026" className={inputClass} />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-zinc-300">Next step</label>
                  <textarea
                    value={nextStep}
                    onChange={(e) => setNextStep(e.target.value)}
                    rows={4}
                    className={`${inputClass} resize-none`}
                  />
                </div>
              </div>
            </form>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 rounded-3xl border border-white/10 bg-white/[0.04] p-8"
        >
          <div className="mb-8 flex items-end justify-between gap-4">
            <div>
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-cyan-400">
                Latest updates
              </p>
              <h2 className="text-2xl font-bold tracking-tight">Project activity</h2>
            </div>
            <button
              type="button"
              onClick={() => setIsAddingUpdate((v) => !v)}
              className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-cyan-400/40 hover:bg-white/[0.06]"
            >
              {isAddingUpdate ? "Cancel" : "Add update"}
            </button>
          </div>

          <AnimatePresence>
            {isAddingUpdate && (
              <motion.form
                key="add-update-form"
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                onSubmit={handleAddUpdate}
                className="mb-6 grid gap-4 rounded-2xl border border-white/10 bg-white/[0.03] p-5"
              >
                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-300">Title</label>
                  <input
                    value={newUpdateTitle}
                    onChange={(e) => setNewUpdateTitle(e.target.value)}
                    placeholder="Homepage review completed"
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-300">Message</label>
                  <textarea
                    value={newUpdateMessage}
                    onChange={(e) => setNewUpdateMessage(e.target.value)}
                    placeholder="Describe what changed or what was completed."
                    rows={4}
                    required
                    className={`${inputClass} resize-none`}
                  />
                </div>
                <button
                  type="submit"
                  disabled={addLoading}
                  className="w-fit rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-200 disabled:opacity-60"
                >
                  {addLoading ? "Saving..." : "Save update"}
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          {latestUpdates.length === 0 ? (
            <p className="text-sm text-zinc-500">No updates yet.</p>
          ) : (
            <div className="grid gap-4">
              {latestUpdates.map((update) => (
                <div
                  key={update.id}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                >
                  <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
                    {new Date(update.created_at).toLocaleDateString("en-GB", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <h3 className="mb-2 font-semibold text-white">{update.title}</h3>
                  <p className="text-sm leading-6 text-zinc-400">{update.message}</p>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </section>
    </main>
  );
}
