"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import RevealCard from "@/components/ui/RevealCard";
import { useLang } from "@/context/LanguageContext";

const copy = {
  eyebrow: { en: "Start your project", pt: "Inicia o teu projeto" },
  title: { en: "Have an idea for your website?", pt: "Tens uma ideia para o teu website?" },
  highlight: { en: "Let's turn it into reality.", pt: "Vamos torná-la realidade." },
  sub: {
    en: "Tell us what your business needs and we will prepare a custom quote based on your goals, features and project complexity.",
    pt: "Diz-nos o que o teu negócio precisa e preparamos um orçamento personalizado com base nos teus objetivos, funcionalidades e complexidade do projeto.",
  },
  cta: { en: "Request a quote", pt: "Pedir orçamento" },
};

export function CTASection() {
  const { lang } = useLang();

  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <RevealCard>
        <div className="relative overflow-hidden rounded-3xl p-[1px]">
          {/* Spinning border gradient */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-[100%]"
            style={{
              background:
                "conic-gradient(from 0deg, transparent 55%, rgba(34,211,238,0.5) 75%, transparent 95%)",
            }}
          />

          {/* Inner card */}
          <div className="relative overflow-hidden rounded-3xl bg-[#0d1117] px-6 py-12 text-center sm:px-12">
            {/* Subtle inner glow */}
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(34,211,238,0.05),_transparent_60%)]" />

            <p className="relative mb-3 text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">
              {copy.eyebrow[lang]}
            </p>

            <h2 className="relative mx-auto max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {copy.title[lang]}{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                {copy.highlight[lang]}
              </span>
            </h2>

            <p className="relative mx-auto mt-5 max-w-2xl text-base leading-7 text-zinc-300">
              {copy.sub[lang]}
            </p>

            <Link
              href="/contact"
              className="relative mt-8 inline-flex rounded-full bg-white px-7 py-3 text-sm font-semibold text-black shadow-[0_0_32px_rgba(255,255,255,0.12)] transition hover:bg-zinc-200"
            >
              {copy.cta[lang]}
            </Link>
          </div>
        </div>
      </RevealCard>
    </section>
  );
}
