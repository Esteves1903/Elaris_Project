"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { clearMockClientSession, hasMockClientSession } from "@/lib/mock-auth";
import {
  client,
  clientNeeds,
  latestUpdates,
  progressSteps,
} from "@/lib/mock-client-data";

export default function ClientAreaPage() {
  const router = useRouter();
  const [isCheckingSession, setIsCheckingSession] = useState(true);

  useEffect(() => {
    const isLoggedIn = hasMockClientSession();

    if (!isLoggedIn) {
      router.push("/client-login");
      return;
    }

    setIsCheckingSession(false);
  }, [router]);

  function handleLogout() {
    clearMockClientSession();
    router.push("/client-login");
  }

  if (isCheckingSession) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#0B0F19] px-6 text-white">
        <div className="text-center">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">
            Client area
          </p>

          <p className="text-zinc-400">Checking access...</p>
        </div>
      </main>
    );
  }
  return (
    <main className="min-h-screen bg-[#0B0F19] px-6 pb-24 pt-32 text-white">
      {/* Hero */}
      <section className="mx-auto mb-10 max-w-6xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">
              Client area
            </p>

            <h1 className="mb-5 text-4xl font-bold tracking-tight sm:text-5xl">
              Welcome back, {client.name}.
            </h1>

            <p className="max-w-2xl text-base leading-7 text-zinc-300">
              Track your website progress, check what stage your project is in
              and contact us whenever you need support.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-5 py-2 text-sm font-semibold text-cyan-300">
              {client.websiteStatus}
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="rounded-full border border-white/10 px-5 py-2 text-sm font-semibold text-white transition hover:border-cyan-400/40 hover:bg-white/[0.06]"
            >
              Log out
            </button>
          </div>
        </div>
      </section>

      {/* Overview */}
      <section className="mx-auto grid max-w-6xl gap-6 lg:grid-cols-[1.4fr_0.8fr]">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
          <div className="mb-8 flex flex-col gap-2">
            <p className="text-sm font-medium uppercase tracking-[0.25em] text-cyan-400">
              Project overview
            </p>

            <h2 className="text-3xl font-bold tracking-tight">
              {client.websiteName}
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div>
              <p className="mb-2 text-sm text-zinc-500">Company</p>
              <p className="font-medium text-white">{client.company}</p>
            </div>

            <div>
              <p className="mb-2 text-sm text-zinc-500">Project type</p>
              <p className="font-medium text-white">{client.projectType}</p>
            </div>

            <div>
              <p className="mb-2 text-sm text-zinc-500">Service plan</p>
              <p className="font-medium text-white">{client.plan}</p>
            </div>

            <div>
              <p className="mb-2 text-sm text-zinc-500">Estimated delivery</p>
              <p className="font-medium text-white">
                {client.estimatedDelivery}
              </p>
            </div>

            <div>
              <p className="mb-2 text-sm text-zinc-500">Current stage</p>
              <p className="font-medium text-white">{client.currentStage}</p>
            </div>

            <div>
              <p className="mb-2 text-sm text-zinc-500">Website status</p>
              <p className="font-medium text-cyan-300">
                {client.websiteStatus}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-cyan-400">
            Next step
          </p>

          <h2 className="mb-4 text-2xl font-bold tracking-tight">
            What happens next?
          </h2>

          <p className="mb-8 text-sm leading-6 text-zinc-400">
            {client.nextStep}
          </p>

          <Link
            href="/contact"
            className="inline-block rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-all hover:bg-zinc-200"
          >
            Contact us
          </Link>
        </div>
      </section>

      {/* Progress */}
      <section className="mx-auto mt-6 max-w-6xl rounded-3xl border border-white/10 bg-white/[0.04] p-8">
        <div className="mb-10">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-cyan-400">
            Production progress
          </p>

          <h2 className="text-3xl font-bold tracking-tight">
            Your website is currently in {client.currentStage}.
          </h2>
        </div>

        <div className="grid gap-4">
          {progressSteps.map((step, index) => {
            const isCompleted = step.status === "completed";
            const isActive = step.status === "active";

            return (
              <div
                key={step.title}
                className="grid gap-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:grid-cols-[auto_1fr_auto] sm:items-center"
              >
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-full text-sm font-bold ${isCompleted
                    ? "bg-cyan-400 text-black"
                    : isActive
                      ? "border border-cyan-400 text-cyan-300"
                      : "border border-white/10 text-zinc-500"
                    }`}
                >
                  {String(index + 1).padStart(2, "0")}
                </div>

                <div>
                  <h3 className="font-semibold text-white">{step.title}</h3>
                  <p className="mt-1 text-sm leading-6 text-zinc-400">
                    {step.description}
                  </p>
                </div>

                <span
                  className={`w-fit rounded-full px-4 py-2 text-xs font-semibold ${isCompleted
                    ? "bg-cyan-400/10 text-cyan-300"
                    : isActive
                      ? "bg-white/10 text-white"
                      : "bg-white/[0.03] text-zinc-500"
                    }`}
                >
                  {isCompleted
                    ? "Completed"
                    : isActive
                      ? "In progress"
                      : "Pending"}
                </span>
              </div>
            );
          })}
        </div>
      </section>

      {/* Client needs + contact + account */}
      <section className="mx-auto mt-6 grid max-w-6xl gap-6 lg:grid-cols-3">
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-cyan-400">
            Needed from you
          </p>

          <h2 className="mb-8 text-2xl font-bold tracking-tight">
            Information we still need
          </h2>

          <div className="grid gap-4">
            {clientNeeds.map((need) => {
              const isReceived = need.status === "received";

              return (
                <div
                  key={need.item}
                  className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.03] p-4"
                >
                  <span className="text-sm font-medium text-white">
                    {need.item}
                  </span>

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold ${isReceived
                      ? "bg-cyan-400/10 text-cyan-300"
                      : "bg-yellow-400/10 text-yellow-300"
                      }`}
                  >
                    {isReceived ? "Received" : "Missing"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-cyan-400">
            Direct contact
          </p>

          <h2 className="mb-4 text-2xl font-bold tracking-tight">
            Need to talk to us?
          </h2>

          <p className="mb-8 text-sm leading-6 text-zinc-400">
            Send us a message, request an update or call directly if something
            is urgent.
          </p>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/contact"
              className="rounded-full bg-white px-6 py-3 text-center text-sm font-semibold text-black transition-all hover:bg-zinc-200"
            >
              Send message
            </Link>

            <a
              href="tel:+351000000000"
              className="rounded-full border border-white/15 px-6 py-3 text-center text-sm font-semibold text-white transition-all hover:border-cyan-400/40 hover:bg-white/[0.06]"
            >
              Call us
            </a>
          </div>
        </div>
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-8">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-cyan-400">
            Account access
          </p>

          <h2 className="mb-4 text-2xl font-bold tracking-tight">
            Manage your login
          </h2>

          <p className="mb-8 text-sm leading-6 text-zinc-400">
            Update the password used to access your private project dashboard.
          </p>

          <Link
            href="/client-area/account"
            className="inline-flex rounded-full border border-white/15 px-6 py-3 text-sm font-semibold text-white transition hover:border-cyan-400/40 hover:bg-white/[0.06]"
          >
            Change password
          </Link>
        </div>
      </section>

      {/* Latest updates */}
      <section className="mx-auto mt-6 max-w-6xl rounded-3xl border border-white/10 bg-white/[0.04] p-8">
        <div className="mb-8">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-cyan-400">
            Latest updates
          </p>

          <h2 className="text-2xl font-bold tracking-tight">
            Recent project activity
          </h2>
        </div>

        <div className="grid gap-4">
          {latestUpdates.map((update) => (
            <div
              key={update.title}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
            >
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500">
                {update.date}
              </p>

              <h3 className="mb-2 font-semibold text-white">{update.title}</h3>

              <p className="text-sm leading-6 text-zinc-400">
                {update.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
