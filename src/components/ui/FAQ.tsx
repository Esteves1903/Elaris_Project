"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import RevealCard from "@/components/ui/RevealCard";

const faqs = [
  {
    q: "How long does a project take?",
    a: "A new website typically takes 2–4 weeks from start to launch, depending on the number of pages and features. We agree on a timeline before starting and keep you updated through your client portal throughout the process.",
  },
  {
    q: "Do you work remotely?",
    a: "Yes — 100% remote. We work with clients across Portugal and internationally. All communication happens via email, video call or your client portal, so location is never a barrier.",
  },
  {
    q: "What's included after launch?",
    a: "Every project includes a post-launch support period where we fix any issues that arise. We also offer ongoing maintenance plans for clients who want continued updates, content changes and technical support.",
  },
  {
    q: "Do I need to provide content and images?",
    a: "You provide the content you have — text, logo, photos — and we organise and present it professionally. If you need copywriting or photography, we can advise on the best approach.",
  },
  {
    q: "How much does a website cost?",
    a: "Every project is different, so we prepare custom quotes based on your needs. The best way to get a number is to fill out our contact form — we'll review your request and get back to you within 24 hours with a clear proposal.",
  },
  {
    q: "Will I be able to update the website myself?",
    a: "Yes, if that's important to you. We can build a simple content management interface so you can update text, images and other content without touching any code.",
  },
];

function Item({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between py-6 text-left"
      >
        <span className="text-base font-semibold text-white pr-6">{q}</span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="shrink-0 text-cyan-400"
        >
          <Plus className="h-5 w-5" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-sm leading-7 text-zinc-400">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function FAQ() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24">
      <div className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
        <RevealCard>
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">
            FAQ
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Common questions.
          </h2>
          <p className="mt-5 text-sm leading-7 text-zinc-400">
            Anything not covered here? Send us a message and we&apos;ll get back to you within 24 hours.
          </p>
        </RevealCard>
        <RevealCard delay={0.1}>
          <div>
            {faqs.map((faq) => (
              <Item key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </RevealCard>
      </div>
    </section>
  );
}
