"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getUserRole, signOut } from "@/lib/auth";
import { projectStageOptions, projectTypeOptions } from "@/lib/project-options";
import { supabase } from "@/lib/supabase";
import { useLang } from "@/context/LanguageContext";

const copy = {
  eyebrow: { en: "New client", pt: "Novo cliente" },
  checking: { en: "Checking admin access...", pt: "A verificar acesso de admin..." },
  back: { en: "← Back to admin", pt: "← Voltar ao admin" },
  logout: { en: "Log out", pt: "Sair" },
  h1a: { en: "Create a new", pt: "Criar um novo" },
  h1b: { en: "client project.", pt: "projeto de cliente." },
  subtitle: { en: "Fill in the essentials to create the account. Everything else can be updated later.", pt: "Preenche o essencial para criar a conta. O resto pode ser atualizado mais tarde." },
  setupEyebrow: { en: "Client setup", pt: "Configuração do cliente" },
  formTitle: { en: "Project information", pt: "Informação do projeto" },
  creating: { en: "Creating...", pt: "A criar..." },
  createBtn: { en: "Create client", pt: "Criar cliente" },
  labelName: { en: "Client name", pt: "Nome do cliente" },
  labelEmail: { en: "Client email", pt: "Email do cliente" },
  labelCompany: { en: "Company", pt: "Empresa" },
  labelPassword: { en: "Temporary password", pt: "Password temporária" },
  placeholderPassword: { en: "Temporary client password", pt: "Password temporária do cliente" },
  labelType: { en: "Project type", pt: "Tipo de projeto" },
  labelStage: { en: "Starting stage", pt: "Fase inicial" },
  labelNext: { en: "Next step", pt: "Próxima etapa" },
  optional: { en: "(optional)", pt: "(opcional)" },
  placeholderNext: { en: "What happens first — e.g. discovery call scheduled for next week", pt: "O que acontece primeiro — ex. chamada de descoberta marcada para a próxima semana" },
  errFallback: { en: "Failed to create client.", pt: "Não foi possível criar o cliente." },
};

function successMsg(name: string, lang: "en" | "pt") {
  return lang === "pt" ? `Cliente "${name}" criado com sucesso.` : `Client "${name}" created successfully.`;
}

export default function NewAdminClientPage() {
  const router = useRouter();
  const { lang } = useLang();
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState("");
  const [password, setPassword] = useState("");
  const [type, setType] = useState(projectTypeOptions[0]);
  const [stage, setStage] = useState(projectStageOptions[0]);
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
      body: JSON.stringify({ name, email, company, password, type, stage, nextStep }),
    });

    const json = await res.json();
    setLoading(false);

    if (!res.ok) {
      setErrorMessage(json.error ?? copy.errFallback[lang]);
      return;
    }

    setSuccessMessage(successMsg(name, lang));
    setName("");
    setEmail("");
    setCompany("");
    setPassword("");
    setNextStep("");
  }

  if (isCheckingSession) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0B0F19] px-6 text-white">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">{copy.eyebrow[lang]}</p>
          <p className="text-zinc-400">{copy.checking[lang]}</p>
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

      <section className="relative z-10 mx-auto max-w-3xl">
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-10 flex items-center justify-between gap-4"
        >
          <Link href="/admin" className="inline-flex text-sm font-medium text-zinc-400 transition hover:text-cyan-300">
            {copy.back[lang]}
          </Link>
          <button
            type="button"
            onClick={handleLogout}
            className="rounded-full border border-white/10 px-5 py-2 text-sm font-semibold text-white transition hover:border-cyan-400/40 hover:bg-white/[0.06]"
          >
            {copy.logout[lang]}
          </button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="mb-10"
        >
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">{copy.eyebrow[lang]}</p>
          <h1 className="mb-3 text-4xl font-bold tracking-tight sm:text-5xl">
            {copy.h1a[lang]}{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              {copy.h1b[lang]}
            </span>
          </h1>
          <p className="text-sm leading-6 text-zinc-400">
            {copy.subtitle[lang]}
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
              <p className="mb-2 text-sm font-medium uppercase tracking-[0.25em] text-cyan-400">{copy.setupEyebrow[lang]}</p>
              <h2 className="text-2xl font-bold tracking-tight">{copy.formTitle[lang]}</h2>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-fit rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black shadow-[0_0_24px_rgba(255,255,255,0.08)] transition hover:bg-zinc-200 disabled:opacity-60"
            >
              {loading ? copy.creating[lang] : copy.createBtn[lang]}
            </button>
          </div>

          <AnimatePresence>
            {successMessage && (
              <motion.p key="success" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="mb-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-300">
                {successMessage}
              </motion.p>
            )}
            {errorMessage && (
              <motion.p key="error" initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                className="mb-6 rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">
                {errorMessage}
              </motion.p>
            )}
          </AnimatePresence>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="nc-name" className="mb-2 block text-sm font-medium text-zinc-300">{copy.labelName[lang]}</label>
              <input id="nc-name" value={name} onChange={e => setName(e.target.value)} required placeholder="João Silva" className={inputClass} />
            </div>
            <div>
              <label htmlFor="nc-email" className="mb-2 block text-sm font-medium text-zinc-300">{copy.labelEmail[lang]}</label>
              <input id="nc-email" type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="joao@silvacafe.com" className={inputClass} />
            </div>
            <div>
              <label htmlFor="nc-company" className="mb-2 block text-sm font-medium text-zinc-300">{copy.labelCompany[lang]}</label>
              <input id="nc-company" value={company} onChange={e => setCompany(e.target.value)} required placeholder="Silva Café" className={inputClass} />
            </div>
            <div>
              <label htmlFor="nc-password" className="mb-2 block text-sm font-medium text-zinc-300">{copy.labelPassword[lang]}</label>
              <input id="nc-password" type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder={copy.placeholderPassword[lang]} className={inputClass} />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">{copy.labelType[lang]}</label>
              <select value={type} onChange={e => setType(e.target.value)} className={selectClass}>
                {projectTypeOptions.map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">{copy.labelStage[lang]}</label>
              <select value={stage} onChange={e => setStage(e.target.value)} className={selectClass}>
                {projectStageOptions.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                {copy.labelNext[lang]} <span className="text-zinc-600">{copy.optional[lang]}</span>
              </label>
              <textarea rows={3} value={nextStep} onChange={e => setNextStep(e.target.value)}
                placeholder={copy.placeholderNext[lang]}
                className={`${inputClass} resize-none`} />
            </div>
          </div>
        </motion.form>
      </section>
    </main>
  );
}
