"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const stats = [
  { value: "10+", label: "Projects delivered" },
  { value: "100%", label: "Client satisfaction" },
  { value: "3", label: "Core services" },
];

export function HeroSection() {
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
              Elaris
            </motion.p>

            <motion.h1
              variants={fadeUp}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="text-4xl font-bold tracking-tight text-white sm:text-5xl xl:text-6xl"
            >
              Websites that make small businesses{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                impossible to ignore.
              </span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
              className="mt-6 max-w-md text-base leading-7 text-zinc-300 sm:text-lg"
            >
              We create modern websites and digital tools that help small
              businesses grow online with clarity, design and performance.
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
                Request a quote
              </Link>
              <Link
                href="/services"
                className="rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                View services
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
              className="mt-10 flex flex-wrap items-center justify-center gap-6 lg:justify-start"
            >
              {stats.map((stat, i) => (
                <div key={stat.label} className="flex items-center gap-6">
                  {i > 0 && <span className="h-5 w-px bg-white/10" />}
                  <div>
                    <p className="text-xl font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-zinc-500">{stat.label}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Browser mockup */}
          <motion.div
            initial={{ opacity: 0, y: 32, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="hidden w-full max-w-[440px] shrink-0 lg:block"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            >
              <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0d1117] shadow-[0_0_80px_rgba(34,211,238,0.07),0_40px_80px_rgba(0,0,0,0.5)]">
                {/* Browser chrome */}
                <div className="flex items-center gap-1.5 border-b border-white/[0.06] bg-white/[0.02] px-4 py-3">
                  <span className="h-2.5 w-2.5 rounded-full bg-red-400/40" />
                  <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/40" />
                  <span className="h-2.5 w-2.5 rounded-full bg-green-400/40" />
                  <div className="mx-auto flex max-w-[180px] flex-1 items-center justify-center rounded-full border border-white/[0.06] bg-white/[0.03] px-4 py-1">
                    <span className="text-[11px] text-zinc-600">elaris.com/client</span>
                  </div>
                </div>

                {/* Page content */}
                <div className="space-y-3 p-5">
                  {/* Mini nav */}
                  <div className="flex items-center justify-between">
                    <div className="h-2.5 w-16 rounded bg-white/20" />
                    <div className="flex items-center gap-3">
                      <div className="h-1.5 w-10 rounded bg-white/[0.08]" />
                      <div className="h-1.5 w-10 rounded bg-white/[0.08]" />
                      <div className="h-5 w-20 rounded-full bg-white/[0.12]" />
                    </div>
                  </div>

                  {/* Hero block */}
                  <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-5">
                    <div className="mb-2 h-1.5 w-14 rounded bg-cyan-400/40" />
                    <div className="mb-1 h-3.5 w-4/5 rounded bg-white/20" />
                    <div className="mb-4 h-3.5 w-3/5 rounded bg-white/[0.15]" />
                    <div className="mb-4 space-y-1.5">
                      <div className="h-1.5 w-full rounded bg-white/[0.07]" />
                      <div className="h-1.5 w-3/4 rounded bg-white/[0.07]" />
                    </div>
                    <div className="flex gap-2">
                      <div className="h-7 w-24 rounded-full bg-white/20" />
                      <div className="h-7 w-20 rounded-full border border-white/[0.12]" />
                    </div>
                  </div>

                  {/* Feature cards */}
                  <div className="grid grid-cols-3 gap-2">
                    {[true, false, false].map((accent, i) => (
                      <div
                        key={i}
                        className={`space-y-2 rounded-xl border p-3 ${
                          accent
                            ? "border-cyan-400/20 bg-cyan-400/[0.04]"
                            : "border-white/[0.05] bg-white/[0.02]"
                        }`}
                      >
                        <div
                          className={`h-3 w-3 rounded ${
                            accent ? "bg-cyan-400/50" : "bg-white/15"
                          }`}
                        />
                        <div className="h-1.5 w-full rounded bg-white/[0.08]" />
                        <div className="h-1.5 w-2/3 rounded bg-white/[0.06]" />
                      </div>
                    ))}
                  </div>

                  {/* Progress bars */}
                  <div className="space-y-2.5 rounded-xl border border-white/[0.05] bg-white/[0.02] p-4">
                    {[75, 50, 30].map((w, i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="h-2 w-2 shrink-0 rounded-full bg-cyan-400/50" />
                        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.06]">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${w}%` }}
                            transition={{
                              duration: 1.2,
                              delay: 0.8 + i * 0.15,
                              ease: [0.16, 1, 0.3, 1],
                            }}
                            className="h-full rounded-full bg-gradient-to-r from-cyan-400/40 to-blue-400/30"
                          />
                        </div>
                        <div className="h-1.5 w-6 rounded bg-white/[0.08]" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Reflection glow */}
              <div className="mx-10 h-3 rounded-b-full bg-cyan-500/[0.08] blur-lg" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Bottom gradient fade into next section */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0B0F19] to-transparent" />
    </section>
  );
}
