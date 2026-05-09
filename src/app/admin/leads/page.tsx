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

type Lead = {
  id: string;
  name: string;
  email: string;
  business: string | null;
  type: string;
  message: string;
  created_at: string;
};

export default function AdminLeadsPage() {
  const router = useRouter();
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [leads, setLeads] = useState<Lead[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);

  useEffect(() => {
    getUserRole().then(async (role) => {
      if (role !== "admin") {
        router.push("/client-login");
        return;
      }

      const { data: { session } } = await supabase.auth.getSession();
      const res = await fetch("/api/admin/leads", {
        headers: { Authorization: `Bearer ${session?.access_token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setLeads(data);
      }
      setIsCheckingSession(false);
    });
  }, [router]);

  function handleLogout() {
    signOut().then(() => router.push("/client-login"));
  }

  if (isCheckingSession) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0B0F19] px-6 text-white">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">Leads</p>
          <p className="text-zinc-400">Checking admin access...</p>
        </motion.div>
      </main>
    );
  }

  const typeColors: Record<string, string> = {
    "New website": "bg-cyan-400/10 text-cyan-300 border-cyan-400/20",
    "Improve existing website": "bg-blue-400/10 text-blue-300 border-blue-400/20",
    "Website maintenance": "bg-violet-400/10 text-violet-300 border-violet-400/20",
    "Client area / portal": "bg-emerald-400/10 text-emerald-300 border-emerald-400/20",
    "Not sure yet": "bg-zinc-400/10 text-zinc-400 border-zinc-400/20",
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0B0F19] px-6 pb-24 pt-32 text-white">
      <div className="pointer-events-none absolute -left-60 top-10 h-[500px] w-[500px] rounded-full bg-cyan-500/[0.04] blur-[140px]" />

      <motion.section custom={0} variants={sectionVariants} initial="hidden" animate="show"
        className="relative z-10 mx-auto mb-10 max-w-6xl">
        <div className="mb-8 flex items-center justify-between gap-4">
          <Link href="/admin" className="text-sm font-medium text-zinc-400 transition hover:text-cyan-300">
            ← Back to admin
          </Link>
          <button type="button" onClick={handleLogout}
            className="rounded-full border border-white/10 px-5 py-2 text-sm font-semibold text-white transition hover:border-cyan-400/40 hover:bg-white/[0.06]">
            Log out
          </button>
        </div>

        <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">Leads</p>
        <h1 className="mb-5 text-4xl font-bold tracking-tight sm:text-5xl">
          Contact{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            requests.
          </span>
        </h1>
        <p className="max-w-2xl text-base leading-7 text-zinc-300">
          All enquiries submitted through the contact form, sorted by most recent.
        </p>
      </motion.section>

      <motion.section custom={1} variants={sectionVariants} initial="hidden" animate="show"
        className="relative z-10 mx-auto mb-6 grid max-w-6xl gap-6 md:grid-cols-3">
        {[
          { label: "Total leads", value: leads.length },
          { label: "This month", value: leads.filter(l => new Date(l.created_at).getMonth() === new Date().getMonth()).length },
          { label: "New website", value: leads.filter(l => l.type === "New website").length },
        ].map((stat, i) => (
          <SpotlightCard key={stat.label} delay={i * 0.05}
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition-colors hover:border-cyan-400/20">
            <p className="mb-3 text-sm text-zinc-500">{stat.label}</p>
            <p className="text-4xl font-bold text-white">{stat.value}</p>
          </SpotlightCard>
        ))}
      </motion.section>

      <motion.section custom={2} variants={sectionVariants} initial="hidden" animate="show"
        className="relative z-10 mx-auto max-w-6xl rounded-3xl border border-white/10 bg-white/[0.04] p-8">
        <div className="mb-8">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-cyan-400">All leads</p>
          <h2 className="text-2xl font-bold tracking-tight">Contact requests</h2>
        </div>

        {leads.length === 0 ? (
          <p className="text-sm text-zinc-500">No leads yet.</p>
        ) : (
          <div className="grid gap-4">
            {leads.map((lead, index) => {
              const isExpanded = expanded === lead.id;
              const colorClass = typeColors[lead.type] ?? "bg-zinc-400/10 text-zinc-400 border-zinc-400/20";

              return (
                <motion.div key={lead.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.06 }}>
                  <div
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-colors hover:border-cyan-400/20 cursor-pointer"
                    onClick={() => setExpanded(isExpanded ? null : lead.id)}
                  >
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                      <div className="flex-1">
                        <div className="mb-3 flex flex-wrap items-center gap-3">
                          <span className={`rounded-full border px-3 py-1 text-xs font-semibold ${colorClass}`}>
                            {lead.type}
                          </span>
                          <span className="text-xs text-zinc-500">
                            {new Date(lead.created_at).toLocaleDateString("en-GB", {
                              day: "2-digit",
                              month: "long",
                              year: "numeric",
                            })}
                          </span>
                        </div>
                        <h3 className="mb-1 text-lg font-bold text-white">{lead.name}</h3>
                        <p className="text-sm text-zinc-400">{lead.email}</p>
                        {lead.business && (
                          <p className="mt-1 text-sm text-zinc-500">{lead.business}</p>
                        )}
                      </div>
                      <span className="text-xs text-zinc-600 transition-transform sm:mt-1">
                        {isExpanded ? "▲ hide" : "▼ show message"}
                      </span>
                    </div>

                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        transition={{ duration: 0.25 }}
                        className="mt-4 border-t border-white/10 pt-4"
                      >
                        <p className="text-sm font-medium text-zinc-400 mb-2">Message</p>
                        <p className="text-sm leading-6 text-white whitespace-pre-wrap">{lead.message}</p>
                        <a
                          href={`mailto:${lead.email}`}
                          onClick={(e) => e.stopPropagation()}
                          className="mt-5 inline-block rounded-full bg-white px-5 py-2 text-sm font-semibold text-black transition hover:bg-zinc-200"
                        >
                          Reply by email
                        </a>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.section>
    </main>
  );
}
