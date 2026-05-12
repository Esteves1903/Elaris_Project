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
import { useLang } from "@/context/LanguageContext";

const copy = {
  eyebrow: { en: "Admin dashboard", pt: "Painel de admin" },
  checking: { en: "Checking admin access...", pt: "A verificar acesso de admin..." },
  back: { en: "← Back to admin", pt: "← Voltar ao admin" },
  deleteClient: { en: "Delete client", pt: "Eliminar cliente" },
  logout: { en: "Log out", pt: "Sair" },
  deleteTitle: { en: "Delete client", pt: "Eliminar cliente" },
  deleteWarning: { en: "This will permanently delete", pt: "Isto irá eliminar permanentemente" },
  deleteWarning2: { en: ", their project and all associated data. This cannot be undone.", pt: ", o respetivo projeto e todos os dados associados. Esta ação não pode ser revertida." },
  deleting: { en: "Deleting...", pt: "A eliminar..." },
  deleteConfirm: { en: "Yes, delete permanently", pt: "Sim, eliminar permanentemente" },
  cancel: { en: "Cancel", pt: "Cancelar" },
  detailsEyebrow: { en: "Client details", pt: "Detalhes do cliente" },
  subtitle: { en: "Manage project information, website status and recent updates for this client.", pt: "Gere a informação do projeto, estado do website e atualizações recentes deste cliente." },
  profileEyebrow: { en: "Client profile", pt: "Perfil do cliente" },
  labelName: { en: "Client name", pt: "Nome do cliente" },
  labelEmail: { en: "Email", pt: "Email" },
  labelCompany: { en: "Company", pt: "Empresa" },
  labelSlug: { en: "Access slug", pt: "Slug de acesso" },
  labelType: { en: "Project type", pt: "Tipo de projeto" },
  labelPlan: { en: "Service plan", pt: "Plano de serviço" },
  projectEyebrow: { en: "Project details", pt: "Detalhes do projeto" },
  projectTitle: { en: "Website information", pt: "Informação do website" },
  saving: { en: "Saving...", pt: "A guardar..." },
  saveBtn: { en: "Save changes", pt: "Guardar alterações" },
  errSave: { en: "Failed to save changes.", pt: "Não foi possível guardar as alterações." },
  successSave: { en: "Changes saved successfully.", pt: "Alterações guardadas com sucesso." },
  errDelete: { en: "Failed to delete client.", pt: "Não foi possível eliminar o cliente." },
  labelWebsiteName: { en: "Website name", pt: "Nome do website" },
  labelWebsiteUrl: { en: "Website URL", pt: "URL do website" },
  labelStatus: { en: "Website status", pt: "Estado do website" },
  labelStage: { en: "Current stage", pt: "Fase atual" },
  labelDelivery: { en: "Estimated delivery", pt: "Entrega estimada" },
  labelLastUpdate: { en: "Last update", pt: "Última atualização" },
  labelNext: { en: "Next step", pt: "Próxima etapa" },
  updatesEyebrow: { en: "Latest updates", pt: "Últimas atualizações" },
  updatesTitle: { en: "Project activity", pt: "Atividade do projeto" },
  cancelUpdate: { en: "Cancel", pt: "Cancelar" },
  addUpdate: { en: "Add update", pt: "Adicionar atualização" },
  labelTitle: { en: "Title", pt: "Título" },
  placeholderTitle: { en: "Homepage review completed", pt: "Revisão da homepage concluída" },
  labelMessage: { en: "Message", pt: "Mensagem" },
  placeholderMessage: { en: "Describe what changed or what was completed.", pt: "Descreve o que mudou ou o que foi concluído." },
  errUpdate: { en: "Failed to add update.", pt: "Não foi possível adicionar a atualização." },
  savingUpdate: { en: "Saving...", pt: "A guardar..." },
  saveUpdate: { en: "Save update", pt: "Guardar atualização" },
  noUpdates: { en: "No updates yet.", pt: "Ainda sem atualizações." },
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
  const { lang } = useLang();
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
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [updateError, setUpdateError] = useState("");

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
      setErrorMessage(json.error ?? copy.errSave[lang]);
    } else {
      setSuccessMessage(copy.successSave[lang]);
    }
  }

  async function handleDelete() {
    setDeleteLoading(true);
    const headers = await getAuthHeader();
    const res = await fetch(`/api/admin/clients/${client.id}`, {
      method: "DELETE",
      headers,
    });
    setDeleteLoading(false);
    if (!res.ok) {
      const json = await res.json();
      setErrorMessage(json.error ?? copy.errDelete[lang]);
      setShowDeleteConfirm(false);
      return;
    }
    router.push("/admin");
  }

  async function handleAddUpdate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!newUpdateTitle || !newUpdateMessage) return;
    setAddLoading(true);
    setUpdateError("");

    const headers = await getAuthHeader();
    const res = await fetch(`/api/admin/clients/${client.id}/updates`, {
      method: "POST",
      headers: { "Content-Type": "application/json", ...headers },
      body: JSON.stringify({ title: newUpdateTitle, message: newUpdateMessage }),
    });

    setAddLoading(false);
    if (!res.ok) {
      const json = await res.json();
      setUpdateError(json.error ?? copy.errUpdate[lang]);
      return;
    }

    const json = await res.json();
    setLatestUpdates((prev) => [json.update, ...prev]);
    setNewUpdateTitle("");
    setNewUpdateMessage("");
    setUpdateError("");
    setIsAddingUpdate(false);
  }

  if (isCheckingSession) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0B0F19] px-6 text-white">
        <div className="text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">
            {copy.eyebrow[lang]}
          </p>
          <p className="text-zinc-400">{copy.checking[lang]}</p>
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
            {copy.back[lang]}
          </Link>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowDeleteConfirm(true)}
              className="rounded-full border border-red-500/30 px-5 py-2 text-sm font-semibold text-red-400 transition hover:border-red-400/60 hover:bg-red-400/[0.08]"
            >
              {copy.deleteClient[lang]}
            </button>
            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full border border-white/10 px-5 py-2 text-sm font-semibold text-white transition hover:border-cyan-400/40 hover:bg-white/[0.06]"
            >
              {copy.logout[lang]}
            </button>
          </div>
        </motion.div>

        <AnimatePresence>
          {showDeleteConfirm && (
            <motion.div
              key="delete-confirm"
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="mb-8 rounded-2xl border border-red-500/30 bg-red-500/[0.07] p-6"
            >
              <p className="mb-1 text-sm font-semibold text-red-400">{copy.deleteTitle[lang]}</p>
              <p className="mb-5 text-sm leading-6 text-zinc-400">
                {copy.deleteWarning[lang]} <span className="font-semibold text-white">{client.company}</span>{copy.deleteWarning2[lang]}
              </p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={deleteLoading}
                  className="rounded-full bg-red-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-red-400 disabled:opacity-60"
                >
                  {deleteLoading ? copy.deleting[lang] : copy.deleteConfirm[lang]}
                </button>
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(false)}
                  disabled={deleteLoading}
                  className="rounded-full border border-white/10 px-5 py-2 text-sm font-semibold text-white transition hover:bg-white/[0.06]"
                >
                  {copy.cancel[lang]}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between"
        >
          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">
              {copy.detailsEyebrow[lang]}
            </p>
            <h1 className="mb-5 text-4xl font-bold tracking-tight sm:text-5xl">
              <span className="bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                {client.company}
              </span>
            </h1>
            <p className="max-w-2xl text-base leading-7 text-zinc-300">
              {copy.subtitle[lang]}
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
              {copy.profileEyebrow[lang]}
            </p>
            <div className="grid gap-6">
              {[
                { label: copy.labelName[lang], value: client.name },
                { label: copy.labelEmail[lang], value: client.email },
                { label: copy.labelCompany[lang], value: client.company },
                { label: copy.labelSlug[lang], value: client.slug },
                { label: copy.labelType[lang], value: project?.type ?? "—" },
                { label: copy.labelPlan[lang], value: project?.plan ?? "—" },
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
                    {copy.projectEyebrow[lang]}
                  </p>
                  <h2 className="text-2xl font-bold tracking-tight">{copy.projectTitle[lang]}</h2>
                </div>
                <button
                  type="submit"
                  disabled={saveLoading}
                  className="w-fit rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-200 disabled:opacity-60"
                >
                  {saveLoading ? copy.saving[lang] : copy.saveBtn[lang]}
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
                  <label className="mb-2 block text-sm font-medium text-zinc-300">{copy.labelWebsiteName[lang]}</label>
                  <input value={websiteName} onChange={(e) => setWebsiteName(e.target.value)} className={inputClass} />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-300">{copy.labelWebsiteUrl[lang]}</label>
                  <input value={websiteUrl} onChange={(e) => setWebsiteUrl(e.target.value)} placeholder="https://" className={inputClass} />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-300">{copy.labelStatus[lang]}</label>
                  <select value={websiteStatus} onChange={(e) => setWebsiteStatus(e.target.value)} className={selectClass}>
                    {websiteStatusOptions.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-300">{copy.labelStage[lang]}</label>
                  <select value={currentStage} onChange={(e) => setCurrentStage(e.target.value)} className={selectClass}>
                    {projectStageOptions.map((s) => <option key={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-300">{copy.labelDelivery[lang]}</label>
                  <input value={estimatedDelivery} onChange={(e) => setEstimatedDelivery(e.target.value)} placeholder="12 June 2026" className={inputClass} />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-300">{copy.labelLastUpdate[lang]}</label>
                  <input value={lastUpdate} onChange={(e) => setLastUpdate(e.target.value)} placeholder="05 May 2026" className={inputClass} />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-medium text-zinc-300">{copy.labelNext[lang]}</label>
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
                {copy.updatesEyebrow[lang]}
              </p>
              <h2 className="text-2xl font-bold tracking-tight">{copy.updatesTitle[lang]}</h2>
            </div>
            <button
              type="button"
              onClick={() => setIsAddingUpdate((v) => !v)}
              className="rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-cyan-400/40 hover:bg-white/[0.06]"
            >
              {isAddingUpdate ? copy.cancelUpdate[lang] : copy.addUpdate[lang]}
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
                  <label className="mb-2 block text-sm font-medium text-zinc-300">{copy.labelTitle[lang]}</label>
                  <input
                    value={newUpdateTitle}
                    onChange={(e) => setNewUpdateTitle(e.target.value)}
                    placeholder={copy.placeholderTitle[lang]}
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-zinc-300">{copy.labelMessage[lang]}</label>
                  <textarea
                    value={newUpdateMessage}
                    onChange={(e) => setNewUpdateMessage(e.target.value)}
                    placeholder={copy.placeholderMessage[lang]}
                    rows={4}
                    required
                    className={`${inputClass} resize-none`}
                  />
                </div>
                {updateError && (
                  <p className="rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">
                    {updateError}
                  </p>
                )}
                <button
                  type="submit"
                  disabled={addLoading}
                  className="w-fit rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-200 disabled:opacity-60"
                >
                  {addLoading ? copy.savingUpdate[lang] : copy.saveUpdate[lang]}
                </button>
              </motion.form>
            )}
          </AnimatePresence>

          {latestUpdates.length === 0 ? (
            <p className="text-sm text-zinc-500">{copy.noUpdates[lang]}</p>
          ) : (
            <div className="grid gap-4">
              {latestUpdates.map((update) => (
                <div
                  key={update.id}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                >
                  <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
                    {new Date(update.created_at).toLocaleDateString(lang === "pt" ? "pt-PT" : "en-GB", {
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
