"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import RevealCard from "@/components/ui/RevealCard";

export function CTASection() {
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
              Start your project
            </p>

            <h2 className="relative mx-auto max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Have an idea for your website?{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Let&apos;s turn it into reality.
              </span>
            </h2>

            <p className="relative mx-auto mt-5 max-w-2xl text-base leading-7 text-zinc-300">
              Tell us what your business needs and we will prepare a custom quote
              based on your goals, features and project complexity.
            </p>

            <Link
              href="/contact"
              className="relative mt-8 inline-flex rounded-full bg-white px-7 py-3 text-sm font-semibold text-black shadow-[0_0_32px_rgba(255,255,255,0.12)] transition hover:bg-zinc-200"
            >
              Request a quote
            </Link>
          </div>
        </div>
      </RevealCard>
    </section>
  );
}
