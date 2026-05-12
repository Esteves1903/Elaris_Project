"use client";

import Link from "next/link";
import RevealCard from "@/components/ui/RevealCard";
import { useLang } from "@/context/LanguageContext";

const copy = {
  eyebrow: { en: "Services", pt: "Serviços" },
  h1: { en: "Practical website services for small businesses.", pt: "Serviços de website práticos para pequenos negócios." },
  intro: {
    en: "We create, improve and maintain websites that look professional, are easy to use and support real business goals.",
    pt: "Criamos, melhoramos e mantemos websites com aspeto profissional, fáceis de usar e alinhados com objetivos reais de negócio.",
  },
  howEyebrow: { en: "How we work", pt: "Como trabalhamos" },
  howTitle: {
    en: "A clear process from first contact to final delivery.",
    pt: "Um processo claro, do primeiro contacto à entrega final.",
  },
  ctaTitle: {
    en: "Need a website that works better for your business?",
    pt: "Precisas de um website que funcione melhor para o teu negócio?",
  },
  ctaBtn: { en: "Request a quote", pt: "Pedir orçamento" },
};

const services = {
  en: [
    {
      number: "01",
      label: "New websites",
      title: "Website creation",
      description: "We build modern, responsive websites designed to help your business grow online.",
      details: "Ideal for businesses that need a professional online presence from scratch. We focus on clear structure, clean design, mobile-friendly layouts and pages that make it easy for visitors to understand what you offer and contact you.",
      tags: ["Next.js", "Tailwind CSS", "Responsive", "SEO-ready"],
    },
    {
      number: "02",
      label: "Website upgrades",
      title: "Website improvement",
      description: "We improve existing websites with better design, structure, performance and usability.",
      details: "If your current website feels outdated, slow or unclear, we refine the experience without losing what already works. This can include improving the layout, simplifying the navigation, making content easier to read and helping the site feel more trustworthy.",
      tags: ["Performance", "UX Audit", "Redesign", "Speed"],
    },
    {
      number: "03",
      label: "Care & maintenance",
      title: "Ongoing support",
      description: "We provide maintenance, updates and support to keep your digital presence running smoothly.",
      details: "A website should not feel abandoned after launch. We help with content updates, small changes, fixes, improvements and general support so your site stays fresh, reliable and aligned with your business.",
      tags: ["Updates", "Fixes", "Content", "Monitoring"],
    },
  ],
  pt: [
    {
      number: "01",
      label: "Novos websites",
      title: "Criação de websites",
      description: "Criamos websites modernos e responsivos concebidos para ajudar o teu negócio a crescer online.",
      details: "Ideal para negócios que precisam de uma presença online profissional de raiz. Focamo-nos numa estrutura clara, design limpo, layouts adaptados para mobile e páginas que facilitem a compreensão da oferta e o contacto dos visitantes.",
      tags: ["Next.js", "Tailwind CSS", "Responsivo", "SEO-ready"],
    },
    {
      number: "02",
      label: "Melhorias de website",
      title: "Melhoria de websites",
      description: "Melhoramos websites existentes com melhor design, estrutura, performance e usabilidade.",
      details: "Se o teu website atual parece desatualizado, lento ou confuso, refinamos a experiência sem perder o que já funciona. Pode incluir melhorar o layout, simplificar a navegação, tornar o conteúdo mais legível e fazer o site parecer mais credível.",
      tags: ["Performance", "UX Audit", "Redesign", "Velocidade"],
    },
    {
      number: "03",
      label: "Manutenção",
      title: "Suporte contínuo",
      description: "Fornecemos manutenção, atualizações e suporte para manter a tua presença digital a funcionar sem problemas.",
      details: "Um website não deve parecer abandonado após o lançamento. Ajudamos com atualizações de conteúdo, pequenas alterações, correções, melhorias e suporte geral para que o site se mantenha atual, fiável e alinhado com o teu negócio.",
      tags: ["Atualizações", "Correções", "Conteúdo", "Monitorização"],
    },
  ],
};

const processSteps = {
  en: [
    {
      number: "01",
      label: "Project discovery",
      title: "Understand",
      description: "We start by understanding your business, goals and what your website needs to achieve.",
      details: "Before designing anything, we look at your business, your audience and the role the website needs to play. This helps us avoid random decisions and build around a clear purpose from the beginning.",
      duration: "1–2 days",
    },
    {
      number: "02",
      label: "Structure & direction",
      title: "Plan",
      description: "We define the structure, features and direction of the project before development starts.",
      details: "We organise the pages, sections, priorities and user journey so the website feels simple to navigate. This stage gives the project a clear direction before time is spent on visuals or development.",
      duration: "2–3 days",
    },
    {
      number: "03",
      label: "Design & development",
      title: "Build",
      description: "We design and develop the website with a clean, modern and responsive approach.",
      details: "This is where the website takes shape. We focus on a polished visual style, responsive layouts, smooth interactions and a structure that works well across desktop, tablet and mobile.",
      duration: "1–3 weeks",
    },
    {
      number: "04",
      label: "Review & launch",
      title: "Deliver",
      description: "We review, adjust and prepare everything so the final result is ready to launch.",
      details: "Before delivery, we test the website, polish the details and make final adjustments. The goal is to make sure the final result feels complete, reliable and ready to represent your business online.",
      duration: "2–4 days",
    },
  ],
  pt: [
    {
      number: "01",
      label: "Descoberta do projeto",
      title: "Compreender",
      description: "Começamos por compreender o teu negócio, objetivos e o que o website precisa de alcançar.",
      details: "Antes de desenhar qualquer coisa, analisamos o teu negócio, o teu público e o papel que o website precisa de desempenhar. Isto ajuda-nos a evitar decisões arbitrárias e a construir com um propósito claro desde o início.",
      duration: "1 a 2 dias",
    },
    {
      number: "02",
      label: "Estrutura e direção",
      title: "Planear",
      description: "Definimos a estrutura, funcionalidades e direção do projeto antes de começar o desenvolvimento.",
      details: "Organizamos as páginas, secções, prioridades e percurso do utilizador para que o website seja simples de navegar. Esta fase dá ao projeto uma direção clara antes de investir tempo no visual ou no desenvolvimento.",
      duration: "2 a 3 dias",
    },
    {
      number: "03",
      label: "Design e desenvolvimento",
      title: "Construir",
      description: "Desenhamos e desenvolvemos o website com uma abordagem limpa, moderna e responsiva.",
      details: "Aqui o website toma forma. Focamo-nos num estilo visual cuidado, layouts responsivos, interações fluidas e uma estrutura que funciona bem em desktop, tablet e mobile.",
      duration: "1 a 3 semanas",
    },
    {
      number: "04",
      label: "Revisão e lançamento",
      title: "Entregar",
      description: "Revemos, ajustamos e preparamos tudo para que o resultado final esteja pronto para lançar.",
      details: "Antes da entrega, testamos o website, polimos os detalhes e fazemos ajustes finais. O objetivo é garantir que o resultado final parece completo, fiável e pronto para representar o teu negócio online.",
      duration: "2 a 4 dias",
    },
  ],
};

export function ServicesContent() {
  const { lang } = useLang();

  return (
    <main className="min-h-screen bg-[#0B0F19] px-6 pb-24 pt-32 text-white">
      <section className="mx-auto mb-16 max-w-6xl">
        <RevealCard className="max-w-3xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">
            {copy.eyebrow[lang]}
          </p>
          <h1 className="mb-8 text-4xl font-bold tracking-tight sm:text-5xl">
            {copy.h1[lang]}
          </h1>
          <p className="text-base leading-7 text-zinc-300">
            {copy.intro[lang]}
          </p>
        </RevealCard>
      </section>

      <section className="mx-auto max-w-6xl">
        <div className="grid gap-0">
          {services[lang].map((service, index) => (
            <RevealCard key={service.title} delay={index * 0.1}>
              <div className="group relative grid gap-10 border-t border-white/10 py-24 transition-colors lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                <div className="absolute left-0 top-0 h-[1px] w-0 bg-gradient-to-r from-cyan-400/80 to-transparent transition-all duration-700 ease-out group-hover:w-full" />

                <div className="flex flex-col gap-4">
                  <span className="text-6xl font-black text-white/[0.04] transition-all duration-500 group-hover:text-cyan-400/20 group-hover:drop-shadow-[0_0_24px_rgba(34,211,238,0.25)]">
                    {service.number}
                  </span>
                  <p className="text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">
                    {service.label}
                  </p>
                </div>

                <div>
                  <h2 className="mb-5 text-3xl font-bold tracking-tight">
                    {service.title}
                  </h2>
                  <p className="mb-5 text-lg leading-8 text-zinc-300">
                    {service.description}
                  </p>
                  <p className="mb-8 text-base leading-7 text-zinc-400">
                    {service.details}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {service.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-xs font-medium text-zinc-400 transition-colors group-hover:border-cyan-400/20 group-hover:text-zinc-300"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </RevealCard>
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="mx-auto max-w-6xl border-t border-white/10 pt-24 pb-0">
        <RevealCard>
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">
            {copy.howEyebrow[lang]}
          </p>
          <h2 className="mb-16 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
            {copy.howTitle[lang]}
          </h2>
        </RevealCard>
        <div className="grid gap-0">
          {processSteps[lang].map((step, index) => (
            <RevealCard key={step.title} delay={index * 0.1}>
              <div className="group relative grid gap-10 border-t border-white/10 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                <div className="absolute left-0 top-0 h-[1px] w-0 bg-gradient-to-r from-cyan-400/80 to-transparent transition-all duration-700 ease-out group-hover:w-full" />
                <div className="flex flex-col gap-4">
                  <span className="text-6xl font-black text-white/[0.04] transition-all duration-500 group-hover:text-cyan-400/20 group-hover:drop-shadow-[0_0_24px_rgba(34,211,238,0.25)]">
                    {step.number}
                  </span>
                  <p className="text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">
                    {step.label}
                  </p>
                  <div className="flex items-center gap-1.5">
                    <div className="h-1 w-1 rounded-full bg-white/20" />
                    <span className="text-xs text-zinc-500">{step.duration}</span>
                  </div>
                </div>
                <div>
                  <h3 className="mb-5 text-3xl font-bold tracking-tight">{step.title}</h3>
                  <p className="mb-5 text-lg leading-8 text-zinc-300">{step.description}</p>
                  <p className="text-base leading-7 text-zinc-400">{step.details}</p>
                </div>
              </div>
            </RevealCard>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl border-t border-white/10 py-32 text-center">
        <RevealCard>
          <h2 className="mb-10 text-4xl font-bold tracking-tight text-white md:text-5xl">
            {copy.ctaTitle[lang]}
          </h2>
          <Link
            href="/contact"
            className="inline-block rounded-full bg-white px-8 py-3 text-sm font-semibold text-black shadow-[0_0_32px_rgba(255,255,255,0.1)] transition-all hover:bg-zinc-200"
          >
            {copy.ctaBtn[lang]}
          </Link>
        </RevealCard>
      </section>
    </main>
  );
}
