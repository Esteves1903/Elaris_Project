"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export function HeroSection() {
  return (
    <section className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl flex-col items-center justify-center px-6 text-center">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="flex flex-col items-center"
      >
        <motion.p
          variants={item}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400"
        >
          Elaris
        </motion.p>

        <motion.h1
          variants={item}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-6xl"
        >
          Digital solutions for growing businesses.
        </motion.h1>

        <motion.p
          variants={item}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-6 max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg"
        >
          We create modern websites and digital tools that help small businesses
          grow online with clarity, design and performance.
        </motion.p>

        <motion.div
          variants={item}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="mt-10 flex flex-col gap-4 sm:flex-row"
        >
          <Link
            href="/contact"
            className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
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
      </motion.div>
    </section>
  );
}
