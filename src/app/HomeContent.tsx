"use client";

import Image from "next/image";
import Link from "next/link";
import { LayoutDashboard, MessageCircle, Shield, Zap, Monitor, Wrench, Headphones } from "lucide-react";
import { portfolioProjects } from "@/lib/portfolio-projects";
import { HeroSection } from "@/components/ui/HeroSection";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import RevealCard from "@/components/ui/RevealCard";
import { CTASection } from "@/components/ui/CTASection";
import { TechMarquee } from "@/components/ui/TechMarquee";
import { FAQ } from "@/components/ui/FAQ";
import { useLang } from "@/context/LanguageContext";

const services = {
  en: [
    {
      icon: <Monitor className="h-5 w-5 text-cyan-400" />,
      title: "Website creation",
      description: "We build modern, responsive websites designed to help small businesses grow online.",
    },
    {
      icon: <Wrench className="h-5 w-5 text-cyan-400" />,
      title: "Website improvement",
      description: "We improve existing websites with better design, structure, performance and usability.",
    },
    {
      icon: <Headphones className="h-5 w-5 text-cyan-400" />,
      title: "Ongoing support",
      description: "We provide maintenance, updates and support to keep your digital presence running smoothly.",
    },
  ],
  pt: [
    {
      icon: <Monitor className="h-5 w-5 text-cyan-400" />,
      title: "Criação de websites",
      description: "Criamos websites modernos e responsivos concebidos para ajudar os pequenos negócios a crescer online.",
    },
    {
      icon: <Wrench className="h-5 w-5 text-cyan-400" />,
      title: "Melhoria de websites",
      description: "Melhoramos websites existentes com melhor design, estrutura, performance e usabilidade.",
    },
    {
      icon: <Headphones className="h-5 w-5 text-cyan-400" />,
      title: "Suporte contínuo",
      description: "Fornecemos manutenção, atualizações e suporte para manter a tua presença digital a funcionar sem problemas.",
    },
  ],
};

const whyHelarys = {
  en: [
    { icon: <LayoutDashboard className="h-5 w-5 text-cyan-400" />, title: "Client portal", description: "Clients follow every step of the project in real time." },
    { icon: <MessageCircle className="h-5 w-5 text-cyan-400" />, title: "Direct communication", description: "Small team, no middlemen, no surprises." },
    { icon: <Shield className="h-5 w-5 text-cyan-400" />, title: "Post-launch support", description: "We stay with you after the website goes live." },
    { icon: <Zap className="h-5 w-5 text-cyan-400" />, title: "Modern tech", description: "Built with the latest tools for performance and scale." },
  ],
  pt: [
    { icon: <LayoutDashboard className="h-5 w-5 text-cyan-400" />, title: "Portal do cliente", description: "Os clientes acompanham cada etapa do projeto em tempo real." },
    { icon: <MessageCircle className="h-5 w-5 text-cyan-400" />, title: "Comunicação direta", description: "Equipa pequena, sem intermediários, sem surpresas." },
    { icon: <Shield className="h-5 w-5 text-cyan-400" />, title: "Suporte pós-lançamento", description: "Estamos contigo depois de o website entrar em funcionamento." },
    { icon: <Zap className="h-5 w-5 text-cyan-400" />, title: "Tecnologia moderna", description: "Criado com as ferramentas mais recentes para performance e escala." },
  ],
};

const copy = {
  aboutEyebrow: { en: "About Helarys", pt: "Sobre a Helarys" },
  aboutTitle: { en: "Simple, modern and focused on results.", pt: "Simples, moderno e focado em resultados." },
  aboutBody: {
    en: "Helarys helps businesses build a stronger digital presence through clean websites, useful digital tools and a clear development process. We focus on solutions that look professional, work smoothly and are easy for clients to understand.",
    pt: "A Helarys ajuda negócios a construir uma presença digital mais forte através de websites limpos, ferramentas digitais úteis e um processo de desenvolvimento claro. Focamo-nos em soluções com aspeto profissional, que funcionam sem problemas e são fáceis de compreender.",
  },
  servicesEyebrow: { en: "Services", pt: "Serviços" },
  servicesTitle: { en: "What we can help with.", pt: "Como podemos ajudar." },
  servicesLink: { en: "View all services →", pt: "Ver todos os serviços →" },
  portfolioEyebrow: { en: "Portfolio", pt: "Portfólio" },
  portfolioTitle: { en: "Recent projects we're proud of.", pt: "Projetos recentes dos quais nos orgulhamos." },
  portfolioLink: { en: "View all projects →", pt: "Ver todos os projetos →" },
  portfolioIntro: {
    en: "Fully interactive layout previews — test every feature as if you were a real customer. Booking systems, ordering flows, and more.",
    pt: "Pré-visualizações totalmente interativas — testa cada funcionalidade como se fosses um cliente real. Sistemas de reserva, fluxos de encomenda e muito mais.",
  },
  interactiveDemo: { en: "Interactive demo", pt: "Demo interativo" },
};

export function HomeContent() {
  const { lang } = useLang();

  return (
    <main className="min-h-screen bg-[#0B0F19] pt-20">
      <HeroSection />
      <TechMarquee />

      {/* About */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-center">
          <RevealCard>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">
              {copy.aboutEyebrow[lang]}
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {copy.aboutTitle[lang]}
            </h2>
          </RevealCard>

          <RevealCard delay={0.15}>
            <p className="text-base leading-8 text-zinc-300">
              {copy.aboutBody[lang]}
            </p>
          </RevealCard>
        </div>
      </section>

      {/* Why Helarys */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {whyHelarys[lang].map((item, index) => (
            <SpotlightCard
              key={item.title}
              delay={index * 0.1}
              className="flex flex-col gap-3 rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition-colors hover:border-cyan-400/20 hover:bg-white/[0.06]"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400/10 transition-colors group-hover:bg-cyan-400/15">
                {item.icon}
              </div>
              <h3 className="text-sm font-semibold text-white">{item.title}</h3>
              <p className="text-sm leading-6 text-zinc-400">{item.description}</p>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <RevealCard>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">
              {copy.servicesEyebrow[lang]}
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {copy.servicesTitle[lang]}
            </h2>
          </RevealCard>

          <RevealCard delay={0.1}>
            <Link
              href="/services"
              className="text-sm font-semibold text-cyan-400 transition hover:text-cyan-300"
            >
              {copy.servicesLink[lang]}
            </Link>
          </RevealCard>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {services[lang].map((service, index) => (
            <SpotlightCard
              key={service.title}
              delay={index * 0.15}
              className="flex h-full cursor-default flex-col rounded-2xl border border-white/10 bg-white/5 p-6 text-white transition-colors hover:border-cyan-400/30 hover:bg-white/[0.07]"
            >
              <div className="mb-4 flex h-9 w-9 items-center justify-center rounded-xl bg-cyan-400/10">
                {service.icon}
              </div>
              <h3 className="text-xl font-semibold">{service.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-6 text-zinc-400">
                {service.description}
              </p>
            </SpotlightCard>
          ))}
        </div>
      </section>

      {/* Portfolio */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <RevealCard>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">
              {copy.portfolioEyebrow[lang]}
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {copy.portfolioTitle[lang]}
            </h2>
          </RevealCard>

          <RevealCard delay={0.1}>
            <Link
              href="/portfolio"
              className="text-sm font-semibold text-cyan-400 transition hover:text-cyan-300"
            >
              {copy.portfolioLink[lang]}
            </Link>
          </RevealCard>
        </div>

        <RevealCard delay={0.05}>
          <p className="mb-8 max-w-2xl text-base leading-7 text-zinc-300">
            {copy.portfolioIntro[lang]}
          </p>
        </RevealCard>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {portfolioProjects.slice(0, 3).map((project, index) => {
            const sectionMap: Record<string, string> = {
              "cafe-restaurant": "restaurant",
              "sports-store": "football-store",
              "barbershop": "barber",
            };
            const section = sectionMap[project.category] ?? "";
            return (
              <RevealCard key={project.id} delay={index * 0.15} className="h-full">
                <Link
                  href={section ? `/portfolio?section=${section}` : "/portfolio"}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-colors hover:border-cyan-400/30 hover:bg-white/[0.07]"
                >
                  <div className="relative h-48 w-full overflow-hidden bg-black shrink-0">
                    <Image
                      src={project.images?.[0] || "/api/placeholder/400/320"}
                      alt={project.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                      className="object-cover opacity-80 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
                    />
                    <div className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold uppercase text-cyan-400 backdrop-blur-sm">
                      {project.category.replace("-", " ")}
                    </div>
                    <div className="absolute bottom-4 right-4 flex translate-y-1 items-center gap-1.5 rounded-full border border-cyan-400/30 bg-black/70 px-3 py-1 text-xs font-semibold text-cyan-300 opacity-0 backdrop-blur-sm transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                      <span className="relative flex h-1.5 w-1.5">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-cyan-400" />
                      </span>
                      {copy.interactiveDemo[lang]}
                    </div>
                  </div>

                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-lg font-semibold text-white">
                      {project.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm text-zinc-400">
                      {project.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1 shrink-0">
                      {project.features.slice(0, 2).map((feature) => (
                        <span
                          key={feature}
                          className="rounded-full bg-cyan-400/20 px-2 py-1 text-xs text-cyan-300"
                        >
                          {feature}
                        </span>
                      ))}
                      {project.features.length > 2 && (
                        <span className="rounded-full bg-white/10 px-2 py-1 text-xs text-zinc-300">
                          +{project.features.length - 2}
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              </RevealCard>
            );
          })}
        </div>
      </section>

      <FAQ />
      <CTASection />
    </main>
  );
}
