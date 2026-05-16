"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, X, Zap, ArrowRight } from "lucide-react";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import { useLang } from "@/context/LanguageContext";

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
  }),
};

const copy = {
  eyebrow: { en: "Pricing", pt: "Preços" },
  h1a: { en: "Simple,", pt: "Preços" },
  h1b: { en: "transparent pricing.", pt: "sem surpresas." },
  subtitle: {
    en: "All plans include a professional, responsive website built from scratch. No hidden fees, no subscriptions — you own everything.",
    pt: "Todos os planos incluem um website profissional e responsivo construído de raiz. Sem taxas escondidas, sem subscrições — és dono de tudo.",
  },
  popular: { en: "Most popular", pt: "Mais popular" },
  ctaEyebrow: { en: "Not sure which plan fits?", pt: "Não sabes qual o plano certo?" },
  ctaTitle: { en: "Let's talk about your project.", pt: "Vamos falar sobre o teu projeto." },
  ctaBody: {
    en: "Every project is different. Send us a message and we'll recommend the right plan — or build a custom quote.",
    pt: "Cada projeto é diferente. Envia-nos uma mensagem e recomendamos o plano certo — ou construímos um orçamento à medida.",
  },
  ctaBtn: { en: "Request a quote", pt: "Pedir orçamento" },
  noteTitle: { en: "What's not included", pt: "O que não está incluído" },
  noteBody: {
    en: "Domain registration and hosting are not included in any plan. We can recommend providers and help with setup at no extra cost.",
    pt: "O registo de domínio e o alojamento não estão incluídos em nenhum plano. Podemos recomendar fornecedores e ajudar na configuração sem custo extra.",
  },
  getStarted: { en: "Get started", pt: "Começar" },
  contactUs: { en: "Contact us", pt: "Falar connosco" },
};

type PlanFeature = { text: { en: string; pt: string }; included: boolean };

type Plan = {
  name: { en: string; pt: string };
  price: string;
  delivery: { en: string; pt: string };
  description: { en: string; pt: string };
  features: PlanFeature[];
  highlight: boolean;
  badge?: { en: string; pt: string };
};

const plans: Plan[] = [
  {
    name: { en: "Essencial", pt: "Essencial" },
    price: "499",
    delivery: { en: "~2 weeks", pt: "~2 semanas" },
    description: {
      en: "For new businesses that need a clean, professional online presence fast.",
      pt: "Para novos negócios que precisam de uma presença online limpa e profissional rapidamente.",
    },
    highlight: false,
    features: [
      { text: { en: "Up to 4 pages", pt: "Até 4 páginas" }, included: true },
      { text: { en: "Professional design", pt: "Design profissional" }, included: true },
      { text: { en: "Contact form", pt: "Formulário de contacto" }, included: true },
      { text: { en: "Mobile-first & SEO ready", pt: "Mobile-first e pronto para SEO" }, included: true },
      { text: { en: "1 design revision", pt: "1 revisão de design" }, included: true },
      { text: { en: "Blog / CMS", pt: "Blog / CMS" }, included: false },
      { text: { en: "Post-delivery support", pt: "Suporte pós-entrega" }, included: false },
    ],
  },
  {
    name: { en: "Profissional", pt: "Profissional" },
    price: "999",
    delivery: { en: "~3–4 weeks", pt: "~3–4 semanas" },
    description: {
      en: "A complete website that looks great, ranks on Google and turns visitors into customers.",
      pt: "Um website completo que impressiona, aparece no Google e converte visitantes em clientes.",
    },
    highlight: true,
    badge: copy.popular,
    features: [
      { text: { en: "Up to 8 pages", pt: "Até 8 páginas" }, included: true },
      { text: { en: "Premium custom design", pt: "Design premium personalizado" }, included: true },
      { text: { en: "Contact form", pt: "Formulário de contacto" }, included: true },
      { text: { en: "Mobile-first, SEO & analytics", pt: "Mobile-first, SEO e analytics" }, included: true },
      { text: { en: "3 design revisions", pt: "3 revisões de design" }, included: true },
      { text: { en: "Blog / CMS", pt: "Blog / CMS" }, included: true },
      { text: { en: "1 month post-delivery support", pt: "1 mês de suporte pós-entrega" }, included: true },
    ],
  },
  {
    name: { en: "Empresarial", pt: "Empresarial" },
    price: "1.799",
    delivery: { en: "~5–6 weeks", pt: "~5–6 semanas" },
    description: {
      en: "A fully custom solution with everything included — including your own private client portal.",
      pt: "Uma solução totalmente personalizada com tudo incluído — incluindo portal privado de cliente.",
    },
    highlight: false,
    features: [
      { text: { en: "Unlimited pages", pt: "Páginas ilimitadas" }, included: true },
      { text: { en: "Premium custom design", pt: "Design premium personalizado" }, included: true },
      { text: { en: "Contact form", pt: "Formulário de contacto" }, included: true },
      { text: { en: "Mobile-first, SEO & analytics", pt: "Mobile-first, SEO e analytics" }, included: true },
      { text: { en: "Unlimited design revisions", pt: "Revisões de design ilimitadas" }, included: true },
      { text: { en: "Blog / CMS", pt: "Blog / CMS" }, included: true },
      { text: { en: "3 months priority support + client portal", pt: "3 meses de suporte prioritário + portal de cliente" }, included: true },
    ],
  },
];

export function PricingContent() {
  const { lang } = useLang();

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#0B0F19] px-6 pb-32 pt-32 text-white">
      <div className="pointer-events-none absolute -left-60 top-10 h-[500px] w-[500px] rounded-full bg-cyan-500/[0.04] blur-[140px]" />
      <div className="pointer-events-none absolute -right-60 bottom-40 h-[400px] w-[400px] rounded-full bg-indigo-500/[0.04] blur-[120px]" />

      {/* Hero */}
      <motion.section
        custom={0} variants={sectionVariants} initial="hidden" animate="show"
        className="relative z-10 mx-auto mb-16 max-w-3xl text-center"
      >
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">
          {copy.eyebrow[lang]}
        </p>
        <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
          {copy.h1a[lang]}{" "}
          <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
            {copy.h1b[lang]}
          </span>
        </h1>
        <p className="mx-auto max-w-2xl text-base leading-7 text-zinc-300">
          {copy.subtitle[lang]}
        </p>
      </motion.section>

      {/* Plans grid */}
      <motion.section
        custom={1} variants={sectionVariants} initial="hidden" animate="show"
        className="relative z-10 mx-auto mb-12 grid max-w-6xl gap-6 lg:grid-cols-3"
      >
        {plans.map((plan, i) => (
          <motion.div
            key={plan.name.en}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 + i * 0.1 }}
            className="flex"
          >
            <SpotlightCard
              className={`relative flex w-full flex-col rounded-3xl border p-8 transition-colors ${
                plan.highlight
                  ? "border-cyan-400/40 bg-cyan-400/[0.04] hover:border-cyan-400/60"
                  : "border-white/10 bg-white/[0.03] hover:border-white/20"
              }`}
            >
              {plan.badge && (
                <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-cyan-400 px-4 py-1 text-xs font-bold text-black">
                    <Zap className="h-3 w-3" />
                    {plan.badge[lang]}
                  </span>
                </div>
              )}

              <div className="mb-8">
                <p className={`mb-4 text-sm font-semibold uppercase tracking-[0.2em] ${plan.highlight ? "text-cyan-400" : "text-zinc-400"}`}>
                  {plan.name[lang]}
                </p>
                <div className="mb-2 flex items-end gap-1">
                  <span className="text-sm font-medium text-zinc-400">€</span>
                  <span className="text-5xl font-bold tracking-tight text-white">{plan.price}</span>
                </div>
                <p className="mb-4 text-xs text-zinc-400">
                  {lang === "pt" ? "Entrega" : "Delivery"}: {plan.delivery[lang]}
                </p>
                <p className="text-sm leading-6 text-zinc-400">{plan.description[lang]}</p>
              </div>

              <ul className="mb-8 flex-1 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature.text.en} className="flex items-start gap-3">
                    {feature.included ? (
                      <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
                    ) : (
                      <X className="mt-0.5 h-4 w-4 shrink-0 text-zinc-700" />
                    )}
                    <span className={`text-sm ${feature.included ? "text-zinc-300" : "text-zinc-600"}`}>
                      {feature.text[lang]}
                    </span>
                  </li>
                ))}
              </ul>

              <Link
                href="/contact"
                className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition ${
                  plan.highlight
                    ? "bg-white text-black shadow-[0_0_24px_rgba(255,255,255,0.1)] hover:bg-zinc-200"
                    : "border border-white/15 text-white hover:border-cyan-400/40 hover:bg-white/[0.06]"
                }`}
              >
                {copy.getStarted[lang]}
                <ArrowRight className="h-4 w-4" />
              </Link>
            </SpotlightCard>
          </motion.div>
        ))}
      </motion.section>

      {/* Note */}
      <motion.section
        custom={2} variants={sectionVariants} initial="hidden" animate="show"
        className="relative z-10 mx-auto mb-16 max-w-3xl rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-5 text-center"
      >
        <p className="text-sm font-medium text-zinc-400">
          <span className="text-white">{copy.noteTitle[lang]}: </span>
          {copy.noteBody[lang]}
        </p>
      </motion.section>

      {/* CTA */}
      <motion.section
        custom={3} variants={sectionVariants} initial="hidden" animate="show"
        className="relative z-10 mx-auto max-w-3xl text-center"
      >
        <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">
          {copy.ctaEyebrow[lang]}
        </p>
        <h2 className="mb-5 text-3xl font-bold tracking-tight sm:text-4xl">
          {copy.ctaTitle[lang]}
        </h2>
        <p className="mb-8 text-base leading-7 text-zinc-400">{copy.ctaBody[lang]}</p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-semibold text-black shadow-[0_0_32px_rgba(255,255,255,0.1)] transition hover:bg-zinc-200"
        >
          {copy.ctaBtn[lang]}
          <ArrowRight className="h-4 w-4" />
        </Link>
      </motion.section>
    </main>
  );
}
