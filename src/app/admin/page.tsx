"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { getUserRole, signOut } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { useLang } from "@/context/LanguageContext";

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

const copy = {
  eyebrow: { en: "Admin dashboard", pt: "Painel de admin" },
  checking: { en: "Checking admin access...", pt: "A verificar acesso de admin..." },
  h1a: { en: "Manage", pt: "Gerir" },
  h1b: { en: "client projects.", pt: "projetos de clientes." },
  subtitle: {
    en: "View clients, project stages, website status and the next steps for each active Helarys project.",
    pt: "Ver clientes, fases do projeto, estado do website e os próximos passos para cada projeto Helarys ativo.",
  },
  viewLeads: { en: "View leads", pt: "Ver leads" },
  logout: { en: "Log out", pt: "Sair" },
  statTotal: { en: "Total clients", pt: "Total de clientes" },
  statProduction: { en: "In production", pt: "Em produção" },
  statWaiting: { en: "Waiting for client", pt: "À espera do cliente" },
  clientsEyebrow: { en: "Clients", pt: "Clientes" },
  clientsTitle: { en: "Active client projects", pt: "Projetos de clientes ativos" },
  addClient: { en: "Add client", pt: "Adicionar cliente" },
  noClients: { en: 'No clients yet. Click "Add client" to create the first one.', pt: 'Ainda sem clientes. Clica em "Adicionar cliente" para criar o primeiro.' },
  clientLabel: { en: "Client:", pt: "Cliente:" },
  labelStatus: { en: "Website status", pt: "Estado do website" },
  labelStage: { en: "Current stage", pt: "Fase atual" },
  labelNext: { en: "Next step", pt: "Próxima etapa" },
  labelLast: { en: "Last update", pt: "Última atualização" },
  viewDetails: { en: "View details", pt: "Ver detalhes" },
};

export default function AdminPage() {
  const router = useRouter();
  const { lang } = useLang();
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [clients, setClients] = useState<Client[]>([]);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  async function fetchClients() {
    const { data } = await supabase
      .from("clients")
      .select("*, projects(*)")
      .order("created_at", { ascending: false });
    if (data) setClients(data as Client[]);
  }

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

  function handleLogout() {
    signOut().then(() => router.push("/client-login"));
  }

  if (isCheckingSession) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0B0F19] px-6 text-white">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">{copy.eyebrow[lang]}</p>
          <p className="text-zinc-400">{copy.checking[lang]}</p>
        </motion.div>
      </main>
    );
  }

  const inProduction = clients.filter(c => c.projects?.[0]?.status === "In production").length;
  const waitingForClient = clients.filter(c => c.projects?.[0]?.status === "Waiting for client").length;

  const stats = [
    { label: copy.statTotal[lang], value: clients.length },
    { label: copy.statProduction[lang], value: inProduction },
    { label: copy.statWaiting[lang], value: waitingForClient },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0B0F19] px-6 pb-24 pt-32 text-white">
      <div className="pointer-events-none absolute -left-60 top-10 h-[500px] w-[500px] rounded-full bg-cyan-500/[0.04] blur-[140px]" />

      <motion.section custom={0} variants={sectionVariants} initial="hidden" animate="show"
        className="relative z-10 mx-auto mb-10 max-w-6xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">{copy.eyebrow[lang]}</p>
            <h1 className="mb-5 text-4xl font-bold tracking-tight sm:text-5xl">
              {copy.h1a[lang]}{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                {copy.h1b[lang]}
              </span>
            </h1>
            <p className="max-w-2xl text-base leading-7 text-zinc-300">{copy.subtitle[lang]}</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/admin/leads"
              className="w-fit rounded-full border border-white/10 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-cyan-400/40 hover:bg-white/[0.06]">
              {copy.viewLeads[lang]}
            </Link>
            <button type="button" onClick={handleLogout}
              className="w-fit rounded-full border border-white/10 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-cyan-400/40 hover:bg-white/[0.06]">
              {copy.logout[lang]}
            </button>
          </div>
        </div>
      </motion.section>

      <motion.section custom={1} variants={sectionVariants} initial="hidden" animate="show"
        className="relative z-10 mx-auto grid max-w-6xl gap-6 md:grid-cols-3">
        {stats.map((stat, i) => (
          <SpotlightCard key={stat.label} delay={i * 0.05}
            className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 transition-colors hover:border-cyan-400/20">
            <p className="mb-3 text-sm text-zinc-400">{stat.label}</p>
            <p className="text-4xl font-bold text-white">{stat.value}</p>
          </SpotlightCard>
        ))}
      </motion.section>

      <motion.section custom={2} variants={sectionVariants} initial="hidden" animate="show"
        className="relative z-10 mx-auto mt-6 max-w-6xl rounded-3xl border border-white/10 bg-white/[0.04] p-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-cyan-400">{copy.clientsEyebrow[lang]}</p>
            <h2 className="text-2xl font-bold tracking-tight">{copy.clientsTitle[lang]}</h2>
          </div>
          <Link href="/admin/clients/new"
            className="w-fit rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black shadow-[0_0_24px_rgba(255,255,255,0.08)] transition hover:bg-zinc-200">
            {copy.addClient[lang]}
          </Link>
        </div>

        {clients.length === 0 ? (
          <p className="text-sm text-zinc-400">{copy.noClients[lang]}</p>
        ) : (
          <div className="grid gap-3">
            {clients.map((client, index) => {
              const project = client.projects?.[0];
              const isOpen = expandedId === client.id;
              return (
                <motion.div key={client.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.3 + index * 0.07 }}>
                  <SpotlightCard className="rounded-2xl border border-white/10 bg-white/[0.03] transition-colors hover:border-cyan-400/20">
                    {/* Header row — always visible */}
                    <button
                      type="button"
                      onClick={() => setExpandedId(isOpen ? null : client.id)}
                      className="flex w-full items-center justify-between gap-4 p-5 text-left"
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="min-w-0">
                          <p className="mb-0.5 text-xs font-medium uppercase tracking-[0.2em] text-cyan-400">
                            {project?.type ?? "—"}
                          </p>
                          <h3 className="truncate text-base font-bold text-white">{client.company}</h3>
                          <p className="text-sm text-zinc-400">{client.name}</p>
                        </div>
                      </div>
                      <div className="flex shrink-0 items-center gap-3">
                        {project?.status && (
                          <span className="hidden rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-zinc-300 sm:inline">
                            {project.status}
                          </span>
                        )}
                        <ChevronDown className={`h-4 w-4 text-zinc-400 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
                      </div>
                    </button>

                    {/* Expandable details */}
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <div className="border-t border-white/[0.06] px-5 pb-5 pt-4">
                            <div className="mb-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                              <div>
                                <p className="mb-1 text-xs text-zinc-500">{copy.labelStatus[lang]}</p>
                                <p className="text-sm font-medium text-white">{project?.status ?? "—"}</p>
                              </div>
                              <div>
                                <p className="mb-1 text-xs text-zinc-500">{copy.labelStage[lang]}</p>
                                <p className="text-sm font-medium text-white">{project?.stage ?? "—"}</p>
                              </div>
                              <div>
                                <p className="mb-1 text-xs text-zinc-500">{copy.labelNext[lang]}</p>
                                <p className="text-sm font-medium text-white">{project?.next_step ?? "—"}</p>
                              </div>
                              <div>
                                <p className="mb-1 text-xs text-zinc-500">{copy.labelLast[lang]}</p>
                                <p className="text-sm font-medium text-white">{project?.last_update ?? "—"}</p>
                              </div>
                            </div>
                            <Link href={`/admin/clients/${client.id}`}
                              className="inline-flex rounded-full border border-white/15 px-5 py-2 text-sm font-semibold text-white transition hover:border-cyan-400/40 hover:bg-white/[0.06]">
                              {copy.viewDetails[lang]}
                            </Link>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
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
