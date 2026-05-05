"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import {
  getMockClientPassword,
  hasMockClientSession,
  updateMockClientPassword,
} from "@/lib/mock-auth";
import { client } from "@/lib/mock-client-data";

export default function ClientAccountPage() {
  const router = useRouter();

  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const isLoggedIn = hasMockClientSession();

    if (!isLoggedIn) {
      router.push("/client-login");
      return;
    }

    setIsCheckingSession(false);
  }, [router]);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setErrorMessage("");
    setSuccessMessage("");

    if (currentPassword !== getMockClientPassword()) {
      setErrorMessage("Current password is incorrect.");
      return;
    }

    if (newPassword.length < 6) {
      setErrorMessage("New password must have at least 6 characters.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setErrorMessage("New passwords do not match.");
      return;
    }

    updateMockClientPassword(newPassword);

    setCurrentPassword("");
    setNewPassword("");
    setConfirmNewPassword("");
    setSuccessMessage("Password updated successfully.");
  }

  if (isCheckingSession) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0B0F19] px-6 text-white">
        <div className="text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">
            Account
          </p>

          <p className="text-zinc-400">Checking access...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0B0F19] px-6 pb-24 pt-32 text-white">
      <section className="mx-auto max-w-6xl">
        <Link
          href="/client-area"
          className="mb-10 inline-flex text-sm font-medium text-zinc-400 transition hover:text-cyan-300"
        >
          ← Back to dashboard
        </Link>

        <div className="mb-12 max-w-3xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">
            Account access
          </p>

          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
            Manage your client access.
          </h1>

          <p className="text-base leading-7 text-zinc-300">
            Update the password used to access your private Elaris client
            dashboard.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-cyan-400">
              Client details
            </p>

            <div className="grid gap-6">
              <div>
                <p className="mb-2 text-sm text-zinc-500">Client name</p>
                <p className="font-medium text-white">{client.name}</p>
              </div>

              <div>
                <p className="mb-2 text-sm text-zinc-500">Company</p>
                <p className="font-medium text-white">{client.company}</p>
              </div>

              <div>
                <p className="mb-2 text-sm text-zinc-500">
                  Company access name
                </p>
                <p className="font-medium text-white">silva-cafe</p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
            <div className="mb-8">
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-cyan-400">
                Change password
              </p>

              <h2 className="text-2xl font-bold tracking-tight">
                Choose a new password
              </h2>
            </div>

            <form onSubmit={handleSubmit} className="grid gap-5">
              <div>
                <label
                  htmlFor="currentPassword"
                  className="mb-2 block text-sm font-medium text-zinc-300"
                >
                  Current password
                </label>

                <input
                  id="currentPassword"
                  type="password"
                  value={currentPassword}
                  onChange={(event) => setCurrentPassword(event.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-cyan-400/50 focus:bg-white/[0.05]"
                />
              </div>

              <div>
                <label
                  htmlFor="newPassword"
                  className="mb-2 block text-sm font-medium text-zinc-300"
                >
                  New password
                </label>

                <input
                  id="newPassword"
                  type="password"
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-cyan-400/50 focus:bg-white/[0.05]"
                />
              </div>

              <div>
                <label
                  htmlFor="confirmNewPassword"
                  className="mb-2 block text-sm font-medium text-zinc-300"
                >
                  Confirm new password
                </label>

                <input
                  id="confirmNewPassword"
                  type="password"
                  value={confirmNewPassword}
                  onChange={(event) =>
                    setConfirmNewPassword(event.target.value)
                  }
                  placeholder="Repeat new password"
                  className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-cyan-400/50 focus:bg-white/[0.05]"
                />
              </div>

              {errorMessage && (
                <p className="rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-300">
                  {errorMessage}
                </p>
              )}

              {successMessage && (
                <p className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-300">
                  {successMessage}
                </p>
              )}

              <button
                type="submit"
                className="mt-2 inline-flex w-full justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
              >
                Update password
              </button>
            </form>

            <p className="mt-6 text-xs leading-5 text-zinc-500">
              This is currently a temporary mock password system. Later, this
              action will update the real client password securely.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}