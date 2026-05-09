import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

export const metadata: Metadata = { title: "Request sent" };

export default function ThanksPage() {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0B0F19] px-6 text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(34,211,238,0.7) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/[0.05] blur-[140px]" />

      <div className="relative z-10 max-w-lg text-center">
        <div className="mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-full border border-cyan-400/20 bg-cyan-400/[0.06]">
          <CheckCircle className="h-10 w-10 text-cyan-400" />
        </div>

        <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">
          Request received
        </p>
        <h1 className="mb-5 text-4xl font-bold tracking-tight sm:text-5xl">
          We&apos;ll be in touch soon.
        </h1>
        <p className="mb-10 text-base leading-7 text-zinc-400">
          Thank you for reaching out. We review every request carefully and will
          get back to you within 24 hours with a personalised response.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-black shadow-[0_0_32px_rgba(255,255,255,0.1)] transition hover:bg-zinc-200"
          >
            Back to homepage
          </Link>
          <Link
            href="/portfolio"
            className="rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            Explore our work
          </Link>
        </div>
      </div>
    </main>
  );
}
