"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";

const copy = {
  eyebrow: { en: "Error 404", pt: "Erro 404" },
  heading: { en: "Page not found.", pt: "Página não encontrada." },
  sub: {
    en: "The page you're looking for doesn't exist or has been moved.",
    pt: "A página que procuras não existe ou foi movida.",
  },
  home: { en: "Back to homepage", pt: "Voltar ao início" },
  contact: { en: "Contact us", pt: "Fala connosco" },
};

export default function NotFound() {
  const { lang } = useLang();

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0B0F19] px-6 text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(34,211,238,0.7) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/[0.05] blur-[140px]" />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-center"
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400"
        >
          {copy.eyebrow[lang]}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-6 text-7xl font-black tracking-tight sm:text-9xl"
        >
          <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            404
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25, duration: 0.6 }}
          className="mb-3 text-2xl font-bold tracking-tight text-white"
        >
          {copy.heading[lang]}
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.35 }}
          className="mb-10 text-base leading-7 text-zinc-400"
        >
          {copy.sub[lang]}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center"
        >
          <Link
            href="/"
            className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-black shadow-[0_0_32px_rgba(255,255,255,0.12)] transition hover:bg-zinc-200"
          >
            {copy.home[lang]}
          </Link>
          <Link
            href="/contact"
            className="rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            {copy.contact[lang]}
          </Link>
        </motion.div>
      </motion.div>
    </main>
  );
}
