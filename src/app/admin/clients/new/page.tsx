"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

export default function NewAdminClientPage() {
  const [successMessage, setSuccessMessage] = useState("");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSuccessMessage("Client created locally for this session.");
  }

  return (
    <main className="min-h-screen bg-[#0B0F19] px-6 pb-24 pt-32 text-white">
      <section className="mx-auto max-w-6xl">
        <Link
          href="/admin"
          className="mb-10 inline-flex text-sm font-medium text-zinc-400 transition hover:text-cyan-300"
        >
          ← Back to admin
        </Link>

        <div className="mb-10 max-w-3xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">
            New client
          </p>

          <h1 className="mb-5 text-4xl font-bold tracking-tight sm:text-5xl">
            Create a new client project.
          </h1>

          <p className="text-base leading-7 text-zinc-300">
            Add the main details for a new Elaris client. This form is currently
            visual only and will later be connected to the database.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-white/10 bg-white/[0.04] p-8"
        >
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.25em] text-cyan-400">
                Client setup
              </p>

              <h2 className="text-2xl font-bold tracking-tight">
                Project information
              </h2>
            </div>

            <button
              type="submit"
              className="w-fit rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-200"
            >
              Create client
            </button>
          </div>

          {successMessage && (
            <p className="mb-6 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-4 py-3 text-sm text-cyan-300">
              {successMessage}
            </p>
          )}

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Client name
              </label>
              <input
                placeholder="João Silva"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-cyan-400/50 focus:bg-white/[0.05]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Company
              </label>
              <input
                placeholder="Silva Café"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-cyan-400/50 focus:bg-white/[0.05]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Company access name
              </label>
              <input
                placeholder="silva-cafe"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-cyan-400/50 focus:bg-white/[0.05]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Temporary password
              </label>
              <input
                type="password"
                placeholder="Temporary client password"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-cyan-400/50 focus:bg-white/[0.05]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Project type
              </label>
              <select className="w-full rounded-2xl border border-white/10 bg-[#111827] px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/50">
                <option>Website Creation</option>
                <option>Website Improvement</option>
                <option>Ongoing Support</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Service plan
              </label>
              <input
                placeholder="Standard website"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-cyan-400/50 focus:bg-white/[0.05]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Website name
              </label>
              <input
                placeholder="Silva Café Website"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-cyan-400/50 focus:bg-white/[0.05]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Website URL
              </label>
              <input
                placeholder="https://silvacafe.com"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-cyan-400/50 focus:bg-white/[0.05]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Website status
              </label>
              <select className="w-full rounded-2xl border border-white/10 bg-[#111827] px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/50">
                <option>In production</option>
                <option>Online</option>
                <option>Offline</option>
                <option>Waiting for client</option>
                <option>Maintenance</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Current stage
              </label>
              <select className="w-full rounded-2xl border border-white/10 bg-[#111827] px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-400/50">
                <option>Discovery</option>
                <option>Planning</option>
                <option>Design & Development</option>
                <option>Review</option>
                <option>Launch</option>
                <option>Launched</option>
              </select>
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Estimated delivery
              </label>
              <input
                placeholder="12 June 2026"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-cyan-400/50 focus:bg-white/[0.05]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Last update
              </label>
              <input
                placeholder="05 May 2026"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-cyan-400/50 focus:bg-white/[0.05]"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm font-medium text-zinc-300">
                Next step
              </label>
              <textarea
                rows={4}
                placeholder="Homepage first version in progress"
                className="w-full resize-none rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-zinc-600 focus:border-cyan-400/50 focus:bg-white/[0.05]"
              />
            </div>
          </div>
        </form>
      </section>
    </main>
  );
}