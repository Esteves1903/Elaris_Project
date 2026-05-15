"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone } from "lucide-react";
import { getUserRole, signOut } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { MessagesPanel } from "@/components/ui/MessagesPanel";
import { projectStageOptions } from "@/lib/project-options";
import { useLang } from "@/context/LanguageContext";

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

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

type ClientData = {
  id: string;
  name: string;
  company: string;
  projects: Project[];
};

function buildProgressSteps(currentStage: string) {
  const stageIndex = projectStageOptions.indexOf(currentStage);
  const isLastStage = stageIndex === projectStageOptions.length - 1;
  return projectStageOptions.map((stage, i) => ({
    title: stage,
    status:
      i < stageIndex || (isLastStage && i === stageIndex)
        ? "completed"
        : i === stageIndex
          ? "active"
          : "pending",
  }));
}

const copy = {
  eyebrow: { en: "Client area", pt: "Área de cliente" },
  checking: { en: "Checking access...", pt: "A verificar acesso..." },
  welcome: { en: "Welcome back,", pt: "Bem-vindo," },
  subtitle: {
    en: "Track your website progress, check what stage your project is in and contact us whenever you need support.",
    pt: "Acompanha o progresso do teu website, verifica em que fase está o teu projeto e contacta-nos sempre que precisares de apoio.",
  },
  logout: { en: "Log out", pt: "Sair" },
  latestUpdates: { en: "Latest updates", pt: "Últimas atualizações" },
  recentActivity: { en: "Recent project activity", pt: "Atividade recente do projeto" },
  noUpdates: { en: "No updates yet.", pt: "Ainda sem atualizações." },
  projectOverview: { en: "Project overview", pt: "Visão geral do projeto" },
  labelCompany: { en: "Company", pt: "Empresa" },
  labelType: { en: "Project type", pt: "Tipo de projeto" },
  labelPlan: { en: "Service plan", pt: "Plano de serviço" },
  labelDelivery: { en: "Estimated delivery", pt: "Entrega estimada" },
  labelStage: { en: "Current stage", pt: "Fase atual" },
  labelStatus: { en: "Status", pt: "Estado" },
  productionProgress: { en: "Production progress", pt: "Progresso da produção" },
  launched: { en: "Your website has been launched! 🎉", pt: "O teu website foi lançado! 🎉" },
  inStage: { en: "Your website is currently in", pt: "O teu website está atualmente em" },
  completed: { en: "Completed", pt: "Concluído" },
  inProgress: { en: "In progress", pt: "Em curso" },
  pending: { en: "Pending", pt: "Pendente" },
  directContact: { en: "Direct contact", pt: "Contacto direto" },
  talkToUs: { en: "Need to talk to us?", pt: "Precisas de falar connosco?" },
  talkDesc: {
    en: "Send us a message, request an update or call directly if something is urgent.",
    pt: "Envia-nos uma mensagem, pede uma atualização ou liga diretamente se algo for urgente.",
  },
  sendMessage: { en: "Send message", pt: "Enviar mensagem" },
  accountAccess: { en: "Account access", pt: "Acesso à conta" },
  manageLogin: { en: "Manage your login", pt: "Gere o teu login" },
  manageDesc: {
    en: "Update the password used to access your private project dashboard.",
    pt: "Atualiza a password usada para aceder ao teu dashboard privado do projeto.",
  },
  changePassword: { en: "Change password", pt: "Alterar password" },
};

export default function ClientAreaPage() {
  const router = useRouter();
  const { lang } = useLang();
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [clientData, setClientData] = useState<ClientData | null>(null);

  useEffect(() => {
    async function init() {
      const role = await getUserRole();
      if (role !== "client") {
        router.push("/client-login");
        return;
      }
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.push("/client-login");
        return;
      }
      const { data } = await supabase
        .from("clients")
        .select("*, projects(*, project_updates(*))")
        .eq("auth_user_id", session.user.id)
        .single();
      if (data) setClientData(data as ClientData);
      setIsCheckingSession(false);
    }
    init();
  }, [router]);

  async function handleLogout() {
    await signOut();
    router.push("/client-login");
  }

  if (isCheckingSession || !clientData) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0B0F19] px-6 text-white">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">
            {copy.eyebrow[lang]}
          </p>
          <p className="text-zinc-400">{copy.checking[lang]}</p>
        </motion.div>
      </main>
    );
  }

  const project = clientData.projects?.[0];
  const progressSteps = project ? buildProgressSteps(project.stage) : [];
  const latestUpdates = project?.project_updates
    ? [...project.project_updates].sort(
        (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      )
    : [];

  const overviewItems = [
    { label: copy.labelCompany[lang], value: clientData.company },
    { label: copy.labelType[lang], value: project?.type },
    { label: copy.labelPlan[lang], value: project?.plan },
    { label: copy.labelDelivery[lang], value: project?.estimated_delivery },
    { label: copy.labelStage[lang], value: project?.stage },
  ];

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0B0F19] px-6 pb-24 pt-32 text-white">
      <div className="pointer-events-none absolute -right-60 top-20 h-[500px] w-[500px] rounded-full bg-cyan-500/[0.04] blur-[140px]" />

      <motion.section
        custom={0}
        variants={sectionVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto mb-10 max-w-6xl"
      >
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">
              {copy.eyebrow[lang]}
            </p>
            <h1 className="mb-5 text-4xl font-bold tracking-tight sm:text-5xl">
              {copy.welcome[lang]}{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                {clientData.name}.
              </span>
            </h1>
            <p className="max-w-2xl text-base leading-7 text-zinc-300">
              {copy.subtitle[lang]}
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {project && (
              <div className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-2 text-sm font-semibold text-cyan-300">
                {project.status}
              </div>
            )}
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full border border-white/10 px-5 py-2 text-sm font-semibold text-white transition hover:border-cyan-400/40 hover:bg-white/[0.06]"
            >
              {copy.logout[lang]}
            </button>
          </div>
        </div>
      </motion.section>

      <motion.section
        custom={1}
        variants={sectionVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto mt-6 max-w-6xl rounded-3xl border border-white/10 bg-white/[0.04] p-8"
      >
        <div className="mb-8">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-cyan-400">
            {copy.latestUpdates[lang]}
          </p>
          <h2 className="text-2xl font-bold tracking-tight">{copy.recentActivity[lang]}</h2>
        </div>

        {latestUpdates.length === 0 ? (
          <p className="text-sm text-zinc-400">{copy.noUpdates[lang]}</p>
        ) : (
          <div className="grid gap-4">
            {latestUpdates.map((update, index) => (
              <motion.div
                key={update.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.2 + index * 0.07 }}
                className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
              >
                <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-zinc-400">
                  {new Date(update.created_at).toLocaleDateString(lang === "pt" ? "pt-PT" : "en-GB", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
                <h3 className="mb-2 font-semibold text-white">{update.title}</h3>
                <p className="text-sm leading-6 text-zinc-400">{update.message}</p>
              </motion.div>
            ))}
          </div>
        )}
      </motion.section>

      <motion.section
        custom={2}
        variants={sectionVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto mt-6 max-w-6xl"
      >
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
          <div className="mb-8 flex flex-col gap-2">
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-cyan-400">
              {copy.projectOverview[lang]}
            </p>
            <h2 className="text-3xl font-bold tracking-tight">
              {project?.website_name ?? clientData.company}
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {overviewItems
              .filter((item) => item.value && item.value.trim() !== "")
              .map((item) => (
                <div key={item.label}>
                  <p className="mb-2 text-sm text-zinc-400">{item.label}</p>
                  <p className="font-medium text-white">{item.value}</p>
                </div>
              ))}
            {project?.status && project.status.trim() !== "" && (
              <div>
                <p className="mb-2 text-sm text-zinc-400">{copy.labelStatus[lang]}</p>
                <p className="font-medium text-cyan-300">{project.status}</p>
              </div>
            )}
          </div>
        </div>
      </motion.section>

      {project && progressSteps.length > 0 && (
        <motion.section
          custom={3}
          variants={sectionVariants}
          initial="hidden"
          animate="show"
          className="relative z-10 mx-auto mt-6 max-w-6xl rounded-3xl border border-white/10 bg-white/[0.04] p-8"
        >
          <div className="mb-10">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-cyan-400">
              {copy.productionProgress[lang]}
            </p>
            <h2 className="text-3xl font-bold tracking-tight">
              {project.stage === "Launched"
                ? copy.launched[lang]
                : `${copy.inStage[lang]} ${project.stage}.`}
            </h2>
          </div>

          <div className="grid gap-4">
            {progressSteps.map((step, index) => {
              const isCompleted = step.status === "completed";
              const isActive = step.status === "active";

              return (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  className="grid gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:grid-cols-[auto_1fr_auto] sm:items-center"
                >
                  <motion.div
                    initial={isCompleted ? { scale: 0.5, opacity: 0 } : {}}
                    animate={isCompleted ? { scale: 1, opacity: 1 } : {}}
                    transition={{ duration: 0.4, delay: 0.5 + index * 0.08, type: "spring", stiffness: 200 }}
                    className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold ${
                      isCompleted
                        ? "bg-cyan-400 text-black shadow-[0_0_16px_rgba(34,211,238,0.4)]"
                        : isActive
                          ? "border border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(34,211,238,0.15)]"
                          : "border border-white/10 text-zinc-400"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </motion.div>

                  <div>
                    <h3 className="font-semibold text-white">{step.title}</h3>
                  </div>

                  <span
                    className={`w-fit rounded-full px-4 py-2 text-xs font-semibold ${
                      isCompleted
                        ? "bg-cyan-400/10 text-cyan-300"
                        : isActive
                          ? "bg-white/10 text-white"
                          : "bg-white/[0.03] text-zinc-400"
                    }`}
                  >
                    {isCompleted ? copy.completed[lang] : isActive ? copy.inProgress[lang] : copy.pending[lang]}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </motion.section>
      )}

      <motion.section
        custom={4}
        variants={sectionVariants}
        initial="hidden"
        animate="show"
        className="relative z-10 mx-auto mt-6 grid max-w-6xl gap-6 lg:grid-cols-[1.6fr_0.6fr]"
      >
        {/* Messaging */}
        <div className="flex flex-col rounded-3xl border border-white/10 bg-white/[0.04] p-8 h-[480px]">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-cyan-400">
            {copy.directContact[lang]}
          </p>
          <h2 className="mb-6 text-2xl font-bold tracking-tight">{copy.talkToUs[lang]}</h2>
          {project ? (
            <MessagesPanel projectId={project.id} currentRole="client" lang={lang} />
          ) : (
            <p className="text-sm text-zinc-400">{copy.talkDesc[lang]}</p>
          )}
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-6">
          {/* Urgent contact */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-cyan-400">
              {lang === "pt" ? "Contacto urgente" : "Urgent contact"}
            </p>
            <p className="mb-5 text-sm leading-6 text-zinc-400">
              {lang === "pt"
                ? "Para assuntos urgentes, contacta-nos diretamente."
                : "For urgent matters, reach us directly."}
            </p>
            <div className="flex flex-col gap-3">
              <a
                href="mailto:contact@helarys.com"
                className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white transition hover:border-cyan-400/30 hover:bg-white/[0.06]"
              >
                <Mail className="h-4 w-4 shrink-0 text-cyan-400" />
                contact@helarys.com
              </a>
              <a
                href="tel:+351910000000"
                className="inline-flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white transition hover:border-cyan-400/30 hover:bg-white/[0.06]"
              >
                <Phone className="h-4 w-4 shrink-0 text-cyan-400" />
                +351 910 000 000
              </a>
            </div>
          </div>

          {/* Account */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-cyan-400">
              {copy.accountAccess[lang]}
            </p>
            <h2 className="mb-3 text-lg font-bold tracking-tight">{copy.manageLogin[lang]}</h2>
            <p className="mb-6 text-sm leading-6 text-zinc-400">
              {copy.manageDesc[lang]}
            </p>
            <Link
              href="/client-area/account"
              className="inline-flex rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-cyan-400/40 hover:bg-white/[0.06]"
            >
              {copy.changePassword[lang]}
            </Link>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
