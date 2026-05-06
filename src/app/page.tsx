import Link from "next/link";
import { Fragment } from "react";
import { ArrowRight, LayoutDashboard, MessageCircle, Shield, Zap, Monitor, Wrench, Headphones } from "lucide-react";
import { portfolioProjects } from "@/lib/portfolio-projects";
import { HeroSection } from "@/components/ui/HeroSection";
import { SpotlightCard } from "@/components/ui/SpotlightCard";
import RevealCard from "@/components/ui/RevealCard";
import { CTASection } from "@/components/ui/CTASection";

const services = [
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
];

const processSteps = [
  {
    step: "01",
    title: "Understand",
    description: "We start by understanding your business, goals and what your website needs to achieve.",
  },
  {
    step: "02",
    title: "Plan",
    description: "We define the structure, features and direction of the project before development starts.",
  },
  {
    step: "03",
    title: "Build",
    description: "We design and develop the website with a clean, modern and responsive approach.",
  },
  {
    step: "04",
    title: "Deliver",
    description: "We review, adjust and prepare everything so the final result is ready to launch.",
  },
];

const whyElaris = [
  {
    icon: <LayoutDashboard className="h-5 w-5 text-cyan-400" />,
    title: "Client portal",
    description: "Clients follow every step of the project in real time.",
  },
  {
    icon: <MessageCircle className="h-5 w-5 text-cyan-400" />,
    title: "Direct communication",
    description: "Small team, no middlemen, no surprises.",
  },
  {
    icon: <Shield className="h-5 w-5 text-cyan-400" />,
    title: "Post-launch support",
    description: "We stay with you after the website goes live.",
  },
  {
    icon: <Zap className="h-5 w-5 text-cyan-400" />,
    title: "Modern tech",
    description: "Built with the latest tools for performance and scale.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B0F19] pt-20">
      {/* Hero */}
      <HeroSection />

      {/* About */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-center">
          <RevealCard>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">
              About Elaris
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Simple, modern and{" "}
              <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                focused on results.
              </span>
            </h2>
          </RevealCard>

          <RevealCard delay={0.15}>
            <p className="text-base leading-8 text-zinc-300">
              Elaris helps small businesses build a stronger digital presence
              through clean websites, useful digital tools and a clear development
              process. We focus on creating solutions that look professional, work
              smoothly and are easy for clients to understand.
            </p>
          </RevealCard>
        </div>
      </section>

      {/* Why Elaris */}
      <section className="mx-auto max-w-6xl px-6 pb-24">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {whyElaris.map((item, index) => (
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
              Services
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              What we can help with.
            </h2>
          </RevealCard>

          <RevealCard delay={0.1}>
            <Link
              href="/services"
              className="text-sm font-semibold text-cyan-400 transition hover:text-cyan-300"
            >
              View all services →
            </Link>
          </RevealCard>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service, index) => (
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
              Portfolio
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Recent projects we&apos;re proud of.
            </h2>
          </RevealCard>

          <RevealCard delay={0.1}>
            <Link
              href="/portfolio"
              className="text-sm font-semibold text-cyan-400 transition hover:text-cyan-300"
            >
              View all projects →
            </Link>
          </RevealCard>
        </div>

        <RevealCard delay={0.05}>
          <p className="mb-8 max-w-2xl text-base leading-7 text-zinc-300">
            Custom websites for cafes, restaurants, and barbershops with advanced
            features like online booking, ordering systems, and customer
            management tools.
          </p>
        </RevealCard>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {portfolioProjects.slice(0, 3).map((project, index) => (
            <RevealCard key={project.id} delay={index * 0.15} className="h-full">
              <Link
                href="/portfolio"
                className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-colors hover:border-cyan-400/30 hover:bg-white/[0.07]"
              >
                <div className="relative h-48 w-full overflow-hidden bg-black shrink-0">
                  <img
                    src={project.images?.[0] || "/api/placeholder/400/320"}
                    alt={project.title}
                    className="h-full w-full object-cover opacity-80 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
                  />
                  <div className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold uppercase text-cyan-400 backdrop-blur-sm">
                    {project.category.replace("-", " ")}
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
          ))}
        </div>
      </section>

      {/* Process */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <RevealCard>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">
              Process
            </p>
            <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              A clear process from first contact to final delivery.
            </h2>
          </RevealCard>

          <RevealCard delay={0.1}>
            <Link
              href="/process"
              className="text-sm font-semibold text-cyan-400 transition hover:text-cyan-300"
            >
              View full process →
            </Link>
          </RevealCard>
        </div>

        <div className="flex flex-col gap-4 md:flex-row md:items-stretch">
          {processSteps.map((item, index) => (
            <Fragment key={item.step}>
              <SpotlightCard
                delay={index * 0.1}
                className="group flex flex-1 cursor-default flex-col rounded-2xl border border-white/10 bg-white/5 p-6 text-white transition-colors hover:border-cyan-400/30 hover:bg-white/[0.07]"
              >
                <span className="text-sm font-semibold text-cyan-400">
                  {item.step}
                </span>
                <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-6 text-zinc-400">
                  {item.description}
                </p>
              </SpotlightCard>

              {index < processSteps.length - 1 && (
                <div className="hidden items-center justify-center text-white/20 md:flex">
                  <ArrowRight className="h-4 w-4 shrink-0" />
                </div>
              )}
            </Fragment>
          ))}
        </div>
      </section>

      {/* CTA */}
      <CTASection />
    </main>
  );
}
