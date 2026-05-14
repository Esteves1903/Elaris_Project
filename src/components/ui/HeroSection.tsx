"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useLang } from "@/context/LanguageContext";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const copy = {
  headline1: { en: "Websites that make small businesses", pt: "Websites que tornam os pequenos negócios" },
  headline2: { en: "impossible to ignore.", pt: "impossíveis de ignorar." },
  sub: {
    en: "We create modern websites and digital tools that help growing businesses stand out online with clarity, design and performance.",
    pt: "Criamos websites modernos e ferramentas digitais que ajudam negócios em crescimento a destacar-se online com clareza, design e performance.",
  },
  cta1: { en: "Request a quote", pt: "Pedir orçamento" },
  cta2: { en: "View services", pt: "Ver serviços" },
  badge: { en: "No commitment · Free quote · Response within 24h", pt: "Sem compromisso · Orçamento gratuito · Resposta em 24h" },
  explore: { en: "Explore portfolio →", pt: "Explorar portfólio →" },
  demos: { en: "3 interactive demos", pt: "3 demos interativos" },
};

export function HeroSection() {
  const { lang } = useLang();

  return (
    <section className="relative min-h-[calc(100vh-5rem)] overflow-hidden">
      {/* Dot grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.10]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(34,211,238,0.7) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Glow orbs */}
      <div className="pointer-events-none absolute -left-60 top-10 h-[650px] w-[650px] rounded-full bg-cyan-500/[0.07] blur-[150px]" />
      <div className="pointer-events-none absolute -right-60 bottom-10 h-[450px] w-[450px] rounded-full bg-indigo-500/[0.06] blur-[120px]" />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center px-6 py-20">
        <div className="flex w-full flex-col items-center gap-12 lg:flex-row lg:items-center lg:gap-16">

          {/* Text */}
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="flex flex-1 flex-col items-center text-center lg:items-start lg:text-left"
          >
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400"
            >
              Helarys
            </motion.p>

            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-4xl font-bold tracking-tight text-white sm:text-5xl xl:text-6xl"
            >
              {copy.headline1[lang]}{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                {copy.headline2[lang]}
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="mt-6 max-w-md text-base leading-7 text-zinc-300 sm:text-lg"
            >
              {copy.sub[lang]}
            </motion.p>

            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="mt-10 flex flex-col gap-4 sm:flex-row"
            >
              <Link
                href="/contact"
                className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-black shadow-[0_0_32px_rgba(255,255,255,0.12)] transition hover:bg-zinc-200"
              >
                {copy.cta1[lang]}
              </Link>
              <Link
                href="/services"
                className="rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                {copy.cta2[lang]}
              </Link>
            </motion.div>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="mt-5 text-xs text-zinc-500"
            >
              {copy.badge[lang]}
            </motion.p>

          </motion.div>

          {/* Browser mockup with real portfolio screenshot */}
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="hidden w-full max-w-[460px] shrink-0 lg:block"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="relative"
            >
              {/* Main browser window */}
              <Link href="/portfolio" className="group block cursor-pointer">
                <motion.div
                  whileHover={{ scale: 1.03, y: -4 }}
                  transition={{ type: "spring", stiffness: 300, damping: 22 }}
                  className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d1117] shadow-[0_0_80px_rgba(34,211,238,0.08),0_40px_80px_rgba(0,0,0,0.6)] transition-shadow duration-300 group-hover:border-cyan-400/30 group-hover:shadow-[0_0_80px_rgba(34,211,238,0.18),0_40px_80px_rgba(0,0,0,0.6)]"
                >
                  {/* Browser chrome */}
                  <div className="flex items-center gap-1.5 border-b border-white/[0.06] bg-white/[0.02] px-4 py-3">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400/40" />
                    <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/40" />
                    <span className="h-2.5 w-2.5 rounded-full bg-green-400/40" />
                    <div className="mx-auto flex max-w-[200px] flex-1 items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.03] px-4 py-1 transition-colors group-hover:border-cyan-400/20 group-hover:bg-cyan-400/[0.04]">
                      <span className="text-[11px] text-zinc-500 transition-colors group-hover:text-cyan-400">helarys.com/portfolio</span>
                    </div>
                  </div>

                  {/* Real screenshot */}
                  <div className="relative h-[300px] overflow-hidden">
                    <Image
                      src="/ElarisRest1.webp"
                      alt="Helarys portfolio — restaurant website demo"
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d1117]/50 to-transparent" />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 backdrop-blur-[2px] transition-opacity duration-300 group-hover:opacity-100">
                      <div className="flex items-center gap-2 rounded-full border border-cyan-400/40 bg-black/60 px-6 py-3 text-sm font-semibold text-cyan-300 shadow-[0_0_24px_rgba(34,211,238,0.2)]">
                        <span className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
                        </span>
                        {copy.explore[lang]}
                      </div>
                    </div>
                  </div>
                </motion.div>
              </Link>

              {/* Floating badge */}
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -bottom-4 -right-4 flex items-center gap-2 rounded-2xl border border-white/10 bg-[#0d1117] px-4 py-2.5 shadow-xl"
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
                </span>
                <span className="text-xs font-semibold text-white">{copy.demos[lang]}</span>
              </motion.div>

              {/* Reflection glow */}
              <div className="mx-10 mt-6 h-3 rounded-b-full bg-cyan-500/[0.08] blur-lg" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade into next section */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0B0F19] to-transparent" />
    </section>
  );
}
