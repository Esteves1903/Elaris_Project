"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getUserRole, signOut } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { SpotlightCard } from "@/components/ui/SpotlightCard";

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

type Project = {
  id: string;
  type: string;
  status: string;
  stage: string;
  next_step: string;
  last_update: string;
};

type Client = {
  id: string;
  name: string;
  company: string;
  slug: string;
  projects: Project[];
};

export default function AdminPage() {
  const router = useRouter();
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    getUserRole().then((role) => {
      if (role !== "admin") {
        router.push("/client-login");
        return;
      }
      setIsCheckingSession(false);
      fetchClients();
    });
  }, [router]);

  async function fetchClients() {
    const { data } = await supabase
      .from("clients")
      .select("*, projects(*)")
      .order("created_at", { ascending: false });
    if (data) setClients(data as Client[]);
  }

  function handleLogout() {
    signOut().then(() => router.push("/client-login"));
  }

  if (isCheckingSession) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0B0F19] px-6 text-white">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">Admin dashboard</p>
          <p className="text-zinc-400">Checking admin access...</p>
        </motion.div>
      </main>
    );
  }

  const inProduction = clients.filter(c => c.projects?.[0]?.status === "In production").length;
  const waitingForClient = clients.filter(c => c.projects?.[0]?.status === "Waiting for client").length;

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0B0F19] px-6 pb-24 pt-32 text-white">
      <div className="pointer-events-none absolute -left-60 top-10 h-[500px] w-[500px] rounded-full bg-cyan-500/[0.04] blur-[140px]" />

      <motion.section custom={0} variants={sectionVariants} initial="hidden" animate="show"
        className="relative z-10 mx-auto mb-10 max-w-6xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">Admin dashboard</p>
            <h1 className="mb-5 text-4xl font-bold tracking-tight sm:text-5xl">
              Manage{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                client projects.
              </span>
            </h1>
            <p className="max-w-2xl text-base leading-7 text-zinc-300">
              View clients, project stages, website status and the next steps for each active Elaris project.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={handleLogout}
              className="w-fit rounded-full border border-white/10 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-cyan-400/40 hover:bg-white/[0.06]">
              Log out
            </button>
          </div>
        </div>
      </motion.section>

      <motion.section custom={1} variants={sectionVariants} initial="hidden" animate="show"
        className="relative z-10 mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
        {[
          { label: "Total clients", value: clients.length },
          { label: "In production", value: inProduction },
          { label: "Waiting for client", value: waitingForClient },
        ].map((stat, i) => (
          <SpotlightCard key={stat.label} delay={i * 0.05}
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition-colors hover:border-cyan-400/20">
            <p className="mb-3 text-sm text-zinc-500">{stat.label}</p>
            <p className="text-4xl font-bold text-white">{stat.value}</p>
          </SpotlightCard>
        ))}
      </motion.section>

      <motion.section custom={2} variants={sectionVariants} initial="hidden" animate="show"
        className="relative z-10 mx-auto mt-6 max-w-6xl rounded-3xl border border-white/10 bg-white/[0.04] p-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-cyan-400">Clients</p>
            <h2 className="text-2xl font-bold tracking-tight">Active client projects</h2>
          </div>
          <Link href="/admin/clients/new"
            className="w-fit rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black shadow-[0_0_24px_rgba(255,255,255,0.08)] transition hover:bg-zinc-200">
            Add client
          </Link>
        </div>

        {clients.length === 0 ? (
          <p className="text-sm text-zinc-500">No clients yet. Click "Add client" to create the first one.</p>
        ) : (
          <div className="grid gap-4">
            {clients.map((client, index) => {
              const project = client.projects?.[0];
              return (
                <motion.div key={client.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.07 }}>
                  <SpotlightCard className="grid gap-6 rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-cyan-400/20 lg:grid-cols-[1fr_1fr_auto] lg:items-center">
                    <div>
                      <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-cyan-400">
                        {project?.type ?? "—"}
                      </p>
                      <h3 className="text-xl font-bold text-white">{client.company}</h3>
                      <p className="mt-2 text-sm text-zinc-400">Client: {client.name}</p>
                    </div>
                    <div className="grid gap-3 sm:grid-cols-2">
                      <div>
                        <p className="mb-1 text-xs text-zinc-500">Website status</p>
                        <p className="text-sm font-medium text-white">{project?.status ?? "—"}</p>
                      </div>
                      <div>
                        <p className="mb-1 text-xs text-zinc-500">Current stage</p>
                        <p className="text-sm font-medium text-white">{project?.stage ?? "—"}</p>
                      </div>
                      <div>
                        <p className="mb-1 text-xs text-zinc-500">Next step</p>
                        <p className="text-sm font-medium text-white">{project?.next_step ?? "—"}</p>
                      </div>
                      <div>
                        <p className="mb-1 text-xs text-zinc-500">Last update</p>
                        <p className="text-sm font-medium text-white">{project?.last_update ?? "—"}</p>
                      </div>
                    </div>
                    <Link href={`/admin/clients/${client.id}`}
                      className="rounded-full border border-white/15 px-5 py-2.5 text-center text-sm font-semibold text-white transition hover:border-cyan-400/40 hover:bg-white/[0.06]">
                      View details
                    </Link>
                  </SpotlightCard>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.section>
    </main>
  );
}
