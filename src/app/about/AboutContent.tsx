"use client";

import Link from "next/link";
import { CTASection } from "@/components/ui/CTASection";
import RevealCard from "@/components/ui/RevealCard";
import { useLang } from "@/context/LanguageContext";

const copy = {
  eyebrow: { en: "About us", pt: "Sobre nós" },
  h1a: { en: "A small studio doing", pt: "Um estúdio pequeno a fazer" },
  h1b: { en: "serious work.", pt: "trabalho sério." },
  intro: {
    en: "Helarys is a two-person web studio based in Portugal. We build modern, high-quality websites for businesses that want more than a template — with a client portal, direct communication and support that doesn't stop after launch.",
    pt: "A Helarys é um estúdio web de duas pessoas baseado em Portugal. Criamos websites modernos e de alta qualidade para negócios que querem mais do que um template — com portal de cliente, comunicação direta e suporte que não para após o lançamento.",
  },
  teamEyebrow: { en: "The team", pt: "A equipa" },
  valuesEyebrow: { en: "How we work", pt: "Como trabalhamos" },
  whyEyebrow: { en: "Why Helarys", pt: "Porquê a Helarys" },
  whyTitle: {
    en: "We got tired of agencies that overpromise and underdeliver.",
    pt: "Cansámo-nos de agências que prometem demais e entregam de menos.",
  },
  whyBody: {
    en: "Most small businesses either get a cheap template that looks like everyone else, or an expensive agency project where they never talk to the actual developer. We wanted to offer a third option — real craftsmanship, direct access, and a product you're proud to show.",
    pt: "A maioria dos pequenos negócios recebe um template barato igual a todos os outros, ou um projeto de agência caro onde nunca falam com o verdadeiro developer. Quisemos oferecer uma terceira opção — artesanato real, acesso direto e um produto do qual te orgulhas de mostrar.",
  },
  workWithUs: { en: "Work with us", pt: "Trabalha connosco" },
};

const team = {
  en: [
    {
      name: "João Mouta",
      role: "Co-founder · Development & Design",
      bio: "Focused on building fast, modern web experiences with clean code and a sharp eye for detail.",
      initials: "JM",
    },
    {
      name: "José Mário",
      role: "Co-founder · Development & Design",
      bio: "Responsible for the visual direction and user experience across every Helarys project.",
      initials: "JM",
    },
  ],
  pt: [
    {
      name: "João Mouta",
      role: "Co-fundador · Desenvolvimento & Design",
      bio: "Focado em criar experiências web rápidas e modernas com código limpo e atenção ao detalhe.",
      initials: "JM",
    },
    {
      name: "José Mário",
      role: "Co-fundador · Desenvolvimento & Design",
      bio: "Responsável pela direção visual e experiência do utilizador em todos os projetos Helarys.",
      initials: "JM",
    },
  ],
};

const values = {
  en: [
    { title: "Honest work", description: "We say what we can deliver and deliver what we say. No inflated proposals, no disappearing after launch." },
    { title: "Direct communication", description: "You deal directly with the people building your project. No account managers, no ticket queues." },
    { title: "Built to last", description: "Every website we build is maintainable, documented and easy to hand over — whether you stay with us or not." },
    { title: "Results over aesthetics", description: "Good-looking is not enough. Every design decision is made to serve the visitor and grow the business." },
  ],
  pt: [
    { title: "Trabalho honesto", description: "Dizemos o que conseguimos entregar e entregamos o que dizemos. Sem propostas inflacionadas, sem desaparecer após o lançamento." },
    { title: "Comunicação direta", description: "Lideras diretamente com as pessoas que constroem o teu projeto. Sem gestores de conta, sem filas de suporte." },
    { title: "Construído para durar", description: "Cada website que criamos é fácil de manter, documentado e simples de passar — fiques connosco ou não." },
    { title: "Resultados acima da estética", description: "Ter bom aspeto não chega. Cada decisão de design é tomada para servir o visitante e fazer crescer o negócio." },
  ],
};

export function AboutContent() {
  const { lang } = useLang();

  return (
    <main className="min-h-screen bg-[#0B0F19] px-6 pb-0 pt-32 text-white">
      {/* Hero */}
      <section className="mx-auto mb-24 max-w-6xl">
        <RevealCard className="max-w-3xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">
            {copy.eyebrow[lang]}
          </p>
          <h1 className="mb-8 text-4xl font-bold tracking-tight sm:text-5xl">
            {copy.h1a[lang]}{" "}
            <span className="text-white">{copy.h1b[lang]}</span>
          </h1>
          <p className="text-base leading-7 text-zinc-300">
            {copy.intro[lang]}
          </p>
        </RevealCard>
      </section>

      {/* Team */}
      <section className="mx-auto mb-24 max-w-6xl">
        <RevealCard>
          <p className="mb-10 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">
            {copy.teamEyebrow[lang]}
          </p>
        </RevealCard>
        <div className="grid gap-6 sm:grid-cols-2">
          {team[lang].map((member, i) => (
            <RevealCard key={member.name} delay={i * 0.1}>
              <div className="flex gap-5 rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition-colors hover:border-cyan-400/20">
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-400/20 to-blue-500/20 text-sm font-bold text-cyan-300">
                  {member.initials}
                </div>
                <div>
                  <p className="font-semibold text-white">{member.name}</p>
                  <p className="mb-3 text-xs font-medium text-cyan-400">{member.role}</p>
                  <p className="text-sm leading-6 text-zinc-400">{member.bio}</p>
                </div>
              </div>
            </RevealCard>
          ))}
        </div>
      </section>

      {/* Values */}
      <section className="mx-auto mb-24 max-w-6xl">
        <RevealCard>
          <p className="mb-10 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">
            {copy.valuesEyebrow[lang]}
          </p>
        </RevealCard>
        <div className="grid gap-6 sm:grid-cols-2">
          {values[lang].map((v, i) => (
            <RevealCard key={v.title} delay={i * 0.08}>
              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 transition-colors hover:border-cyan-400/20">
                <h3 className="mb-3 font-semibold text-white">{v.title}</h3>
                <p className="text-sm leading-6 text-zinc-400">{v.description}</p>
              </div>
            </RevealCard>
          ))}
        </div>
      </section>

      {/* Why we built Helarys */}
      <section className="mx-auto mb-24 max-w-6xl border-t border-white/10 pt-24">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <RevealCard>
            <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">
              {copy.whyEyebrow[lang]}
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {copy.whyTitle[lang]}
            </h2>
          </RevealCard>
          <RevealCard delay={0.1}>
            <p className="text-base leading-7 text-zinc-300">
              {copy.whyBody[lang]}
            </p>
            <Link
              href="/contact"
              className="mt-8 inline-flex rounded-full bg-white px-7 py-3 text-sm font-semibold text-black shadow-[0_0_32px_rgba(255,255,255,0.1)] transition hover:bg-zinc-200"
            >
              {copy.workWithUs[lang]}
            </Link>
          </RevealCard>
        </div>
      </section>

      <CTASection />
    </main>
  );
}
