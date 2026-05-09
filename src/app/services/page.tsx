import type { Metadata } from "next";
import Link from "next/link";
import RevealCard from "@/components/ui/RevealCard";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Website creation, improvement and ongoing support for small businesses. Modern, responsive and professionally built.",
};

export default function ServicesPage() {
  const processSteps = [
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
  ];

  const services = [
    {
      number: "01",
      label: "New websites",
      title: "Website creation",
      description:
        "We build modern, responsive websites designed to help your business grow online.",
      details:
        "Ideal for businesses that need a professional online presence from scratch. We focus on clear structure, clean design, mobile-friendly layouts and pages that make it easy for visitors to understand what you offer and contact you.",
      tags: ["Next.js", "Tailwind CSS", "Responsive", "SEO-ready"],
    },
    {
      number: "02",
      label: "Website upgrades",
      title: "Website improvement",
      description:
        "We improve existing websites with better design, structure, performance and usability.",
      details:
        "If your current website feels outdated, slow or unclear, we refine the experience without losing what already works. This can include improving the layout, simplifying the navigation, making content easier to read and helping the site feel more trustworthy.",
      tags: ["Performance", "UX Audit", "Redesign", "Speed"],
    },
    {
      number: "03",
      label: "Care & maintenance",
      title: "Ongoing support",
      description:
        "We provide maintenance, updates and support to keep your digital presence running smoothly.",
      details:
        "A website should not feel abandoned after launch. We help with content updates, small changes, fixes, improvements and general support so your site stays fresh, reliable and aligned with your business.",
      tags: ["Updates", "Fixes", "Content", "Monitoring"],
    },
  ];

  return (
    <main className="min-h-screen bg-[#0B0F19] px-6 pb-24 pt-32 text-white">
      <section className="mx-auto mb-16 max-w-6xl">
        <RevealCard className="max-w-3xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">
            Services
          </p>
          <h1 className="mb-8 text-4xl font-bold tracking-tight sm:text-5xl">
            Practical website services for small businesses.
          </h1>
          <p className="text-base leading-7 text-zinc-300">
            We create, improve and maintain websites that look professional,
            are easy to use and support real business goals.
          </p>
        </RevealCard>
      </section>

      <section className="mx-auto max-w-6xl">
        <div className="grid gap-0">
          {services.map((service, index) => (
            <RevealCard key={service.title} delay={index * 0.1}>
              <div className="group relative grid gap-10 border-t border-white/10 py-24 transition-colors lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                {/* Animated top-border sweep on hover */}
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
            How we work
          </p>
          <h2 className="mb-16 max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
            A clear process from first contact to final delivery.
          </h2>
        </RevealCard>
        <div className="grid gap-0">
          {processSteps.map((step, index) => (
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
            Need a website that works better for your business?
          </h2>
          <Link
            href="/contact"
            className="inline-block rounded-full bg-white px-8 py-3 text-sm font-semibold text-black shadow-[0_0_32px_rgba(255,255,255,0.1)] transition-all hover:bg-zinc-200"
          >
            Request a quote
          </Link>
        </RevealCard>
      </section>
    </main>
  );
}
