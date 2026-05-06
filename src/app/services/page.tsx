import type { Metadata } from "next";
import Link from "next/link";
import RevealCard from "@/components/ui/RevealCard";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Website creation, improvement and ongoing support for small businesses. Modern, responsive and professionally built.",
};

export default function ServicesPage() {
  const services = [
    {
      number: "01",
      label: "New websites",
      title: "Website creation",
      description:
        "We build modern, responsive websites designed to help small businesses grow online.",
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
            Practical website services for{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              small businesses.
            </span>
          </h1>
          <p className="text-base leading-7 text-zinc-300">
            We help businesses create, improve and maintain websites that look
            professional, are easy to use and support real business goals.
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
