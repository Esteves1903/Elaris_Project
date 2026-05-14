"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { useLang } from "@/context/LanguageContext";

const copy = {
  eyebrow: { en: "Request received", pt: "Pedido recebido" },
  heading: { en: "We'll be in touch soon.", pt: "Entraremos em contacto em breve." },
  body: {
    en: "Thank you for reaching out. We review every request carefully and will get back to you within 24 hours with a personalised response.",
    pt: "Obrigado por entrares em contacto. Analisamos cada pedido com cuidado e respondemos dentro de 24 horas com uma resposta personalizada.",
  },
  home: { en: "Back to homepage", pt: "Voltar ao início" },
  portfolio: { en: "Explore our work", pt: "Explorar o nosso trabalho" },
};

export function ThanksContent() {
  const { lang } = useLang();

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
          {copy.eyebrow[lang]}
        </p>
        <h1 className="mb-5 text-4xl font-bold tracking-tight sm:text-5xl">
          {copy.heading[lang]}
        </h1>
        <p className="mb-10 text-base leading-7 text-zinc-400">
          {copy.body[lang]}
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-black shadow-[0_0_32px_rgba(255,255,255,0.1)] transition hover:bg-zinc-200"
          >
            {copy.home[lang]}
          </Link>
          <Link
            href="/portfolio"
            className="rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            {copy.portfolio[lang]}
          </Link>
        </div>
      </div>
    </main>
  );
}
