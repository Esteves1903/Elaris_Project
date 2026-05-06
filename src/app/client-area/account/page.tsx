"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getUser, getUserRole, signIn, updatePassword } from "@/lib/auth";
import { supabase } from "@/lib/supabase";

type ClientProfile = { name: string; company: string; slug: string };

export default function ClientAccountPage() {
  const router = useRouter();
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
      setErrorMessage("New password must have at least 6 characters.");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setErrorMessage("New passwords do not match.");
      return;
    }

    const user = await getUser();
    const { error: verifyError } = await signIn(user!.email!, currentPassword);
    if (verifyError) {
      setErrorMessage("Current password is incorrect.");
      return;
    }

    const { error } = await updatePassword(newPassword);
    if (error) {
      setErrorMessage("Failed to update password. Please try again.");
      return;
    }

    const { data: { session } } = await supabase.auth.getSession();
    await fetch("/api/client/account", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${session?.access_token}`,
      },
      body: JSON.stringify({ password: newPassword }),
    });

    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setSuccessMessage("Password updated successfully.");
  }

  if (isCheckingSession) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0B0F19] px-6 text-white">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">Account</p>
          <p className="text-zinc-400">Checking access...</p>
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
        <motion.div
          initial={{ opacity: 0, x: -12 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href="/client-area"
            className="mb-10 inline-flex text-sm font-medium text-zinc-400 transition hover:text-cyan-300"
          >
            ← Back to dashboard
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 max-w-3xl"
        >
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">
            Account access
          </p>
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
            Manage your{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              client access.
            </span>
          </h1>
          <p className="text-base leading-7 text-zinc-300">
            Update the password used to access your private Elaris client dashboard.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]"
        >
          {/* Client details */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-cyan-400">
              Client details
            </p>
            <div className="grid gap-6">
              {[
                { label: "Client name", value: profile?.name ?? "—" },
                { label: "Company", value: profile?.company ?? "—" },
                { label: "Company access name", value: profile?.slug ?? "—" },
              ].map((item) => (
                <div key={item.label}>
                  <p className="mb-2 text-sm text-zinc-500">{item.label}</p>
                  <p className="font-medium text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Change password */}
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
            <div className="mb-8">
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-cyan-400">
                Change password
              </p>
              <h2 className="text-2xl font-bold tracking-tight">Choose a new password</h2>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-5">
              <div>
                <label htmlFor="currentPassword" className="mb-2 block text-sm font-medium text-zinc-300">
                  Current password
                </label>
                <input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder="••••••••"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="newPassword" className="mb-2 block text-sm font-medium text-zinc-300">
                  New password
                </label>
                <input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className={inputClass}
                />
              </div>
              <div>
                <label htmlFor="confirmNewPassword" className="mb-2 block text-sm font-medium text-zinc-300">
                  Confirm new password
                </label>
                <input
                  id="confirmNewPassword"
                  type="password"
                  value={confirmNewPassword}
                  onChange={(e) => setConfirmNewPassword(e.target.value)}
                  placeholder="Repeat new password"
                  className={inputClass}
                />
              </div>

              <AnimatePresence>
                {errorMessage && (
                  <motion.p
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300"
                  >
                    {errorMessage}
                  </motion.p>
                )}
                {successMessage && (
                  <motion.p
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-300"
                  >
                    {successMessage}
                  </motion.p>
                )}
              </AnimatePresence>

              <button
                type="submit"
                className="mt-2 inline-flex w-full justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black shadow-[0_0_24px_rgba(255,255,255,0.08)] transition hover:bg-zinc-200"
              >
                Update password
              </button>
            </form>

          </div>
        </motion.div>
      </section>
    </main>
  );
}
