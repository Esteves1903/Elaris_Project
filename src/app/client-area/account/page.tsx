"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getUser, getUserRole, signIn, updatePassword } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { useLang } from "@/context/LanguageContext";

type ClientProfile = { name: string; company: string; slug: string };

const copy = {
  eyebrow: { en: "Account", pt: "Conta" },
  checking: { en: "Checking access...", pt: "A verificar acesso..." },
  back: { en: "← Back to dashboard", pt: "← Voltar ao dashboard" },
  accessEyebrow: { en: "Account access", pt: "Acesso à conta" },
  h1a: { en: "Manage your", pt: "Gere o teu" },
  h1b: { en: "client access.", pt: "acesso de cliente." },
  subtitle: {
    en: "Update the password used to access your private Helarys client dashboard.",
    pt: "Atualiza a password usada para aceder ao teu dashboard privado Helarys.",
  },
  detailsEyebrow: { en: "Client details", pt: "Detalhes do cliente" },
  labelName: { en: "Client name", pt: "Nome do cliente" },
  labelCompany: { en: "Company", pt: "Empresa" },
  labelSlug: { en: "Company access name", pt: "Nome de acesso da empresa" },
  changeEyebrow: { en: "Change password", pt: "Alterar password" },
  changeTitle: { en: "Choose a new password", pt: "Escolhe uma nova password" },
  labelCurrent: { en: "Current password", pt: "Password atual" },
  labelNew: { en: "New password", pt: "Nova password" },
  labelConfirm: { en: "Confirm new password", pt: "Confirmar nova password" },
  placeholderNew: { en: "At least 6 characters", pt: "Pelo menos 6 caracteres" },
  placeholderConfirm: { en: "Repeat new password", pt: "Repete a nova password" },
  updateBtn: { en: "Update password", pt: "Atualizar password" },
  errShort: { en: "New password must have at least 6 characters.", pt: "A nova password deve ter pelo menos 6 caracteres." },
  errMatch: { en: "New passwords do not match.", pt: "As novas passwords não coincidem." },
  errCurrent: { en: "Current password is incorrect.", pt: "A password atual está incorreta." },
  errFail: { en: "Failed to update password. Please try again.", pt: "Não foi possível atualizar a password. Por favor tenta novamente." },
  errSync: { en: "Password updated but failed to sync. Please contact support.", pt: "Password atualizada mas falhou a sincronização. Por favor contacta o suporte." },
  success: { en: "Password updated successfully.", pt: "Password atualizada com sucesso." },
};

export default function ClientAccountPage() {
  const router = useRouter();
  const { lang } = useLang();
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [profile, setProfile] = useState<ClientProfile | null>(null);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    async function init() {
      const role = await getUserRole();
      if (role !== "client") {
        router.push("/client-login");
        return;
      }
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data } = await supabase
          .from("clients")
          .select("name, company, slug")
          .eq("auth_user_id", session.user.id)
          .single();
        if (data) setProfile(data as ClientProfile);
      }
      setIsCheckingSession(false);
    }
    init();
  }, [router]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (newPassword.length < 6) {
      setErrorMessage(copy.errShort[lang]);
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setErrorMessage(copy.errMatch[lang]);
      return;
    }

    const user = await getUser();
    const { error: verifyError } = await signIn(user!.email!, currentPassword);
    if (verifyError) {
      setErrorMessage(copy.errCurrent[lang]);
      return;
    }

    const { error } = await updatePassword(newPassword);
    if (error) {
      setErrorMessage(copy.errFail[lang]);
      return;
    }

    const { data: { session } } = await supabase.auth.getSession();
    const syncRes = await fetch("/api/client/account", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.access_token}`,
      },
      body: JSON.stringify({ password: newPassword }),
    });

    if (!syncRes.ok) {
      setErrorMessage(copy.errSync[lang]);
      return;
    }

    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setSuccessMessage(copy.success[lang]);
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

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0B0F19] px-6 pb-24 pt-32 text-white">
      <div className="pointer-events-none absolute -right-60 top-20 h-[400px] w-[400px] rounded-full bg-cyan-500/[0.04] blur-[120px]" />

      <section className="relative z-10 mx-auto max-w-6xl">
        <motion.div initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
          <Link href="/client-area" className="mb-10 inline-flex text-sm font-medium text-zinc-400 transition hover:text-cyan-300">
            {copy.back[lang]}
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 max-w-3xl"
        >
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">
            {copy.accessEyebrow[lang]}
          </p>
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
            {copy.h1a[lang]}{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              {copy.h1b[lang]}
            </span>
          </h1>
          <p className="text-base leading-7 text-zinc-300">{copy.subtitle[lang]}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]"
        >
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-cyan-400">
              {copy.detailsEyebrow[lang]}
            </p>
            <div className="grid gap-6">
              {[
                { label: copy.labelName[lang], value: profile?.name ?? "—" },
                { label: copy.labelCompany[lang], value: profile?.company ?? "—" },
                { label: copy.labelSlug[lang], value: profile?.slug ?? "—" },
              ].map((item) => (
                <div key={item.label}>
                  <p className="mb-2 text-sm text-zinc-400">{item.label}</p>
                  <p className="font-medium text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
            <div className="mb-8">
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-cyan-400">
                {copy.changeEyebrow[lang]}
              </p>
              <h2 className="text-2xl font-bold tracking-tight">{copy.changeTitle[lang]}</h2>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-5">
              <div>
                <label htmlFor="currentPassword" className="mb-2 block text-sm font-medium text-zinc-300">
                  {copy.labelCurrent[lang]}
                </label>
                <input id="currentPassword" type="password" value={currentPassword} onChange={(e) => setCurrentPassword(e.target.value)} placeholder="••••••••" className={inputClass} />
              </div>
              <div>
                <label htmlFor="newPassword" className="mb-2 block text-sm font-medium text-zinc-300">
                  {copy.labelNew[lang]}
                </label>
                <input id="newPassword" type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} placeholder={copy.placeholderNew[lang]} className={inputClass} />
              </div>
              <div>
                <label htmlFor="confirmNewPassword" className="mb-2 block text-sm font-medium text-zinc-300">
                  {copy.labelConfirm[lang]}
                </label>
                <input id="confirmNewPassword" type="password" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} placeholder={copy.placeholderConfirm[lang]} className={inputClass} />
              </div>

              <AnimatePresence>
                {errorMessage && (
                  <motion.p initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">
                    {errorMessage}
                  </motion.p>
                )}
                {successMessage && (
                  <motion.p initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                    className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-300">
                    {successMessage}
                  </motion.p>
                )}
              </AnimatePresence>

              <button type="submit" className="mt-2 inline-flex w-full justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black shadow-[0_0_24px_rgba(255,255,255,0.08)] transition hover:bg-zinc-200">
                {copy.updateBtn[lang]}
              </button>
            </form>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
