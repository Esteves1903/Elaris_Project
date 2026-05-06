import Link from "next/link";
import RevealCard from "@/components/ui/RevealCard";

export default function ProcessPage() {
  const processSteps = [
    {
      number: "01",
      label: "Project discovery",
      title: "Understand",
      description:
        "We start by understanding your business, goals and what your website needs to achieve.",
      details:
        "Before designing anything, we look at your business, your audience and the role the website needs to play. This helps us avoid random decisions and build around a clear purpose from the beginning.",
      duration: "1–2 days",
    },
    {
      number: "02",
      label: "Structure & direction",
      title: "Plan",
      description:
        "We define the structure, features and direction of the project before development starts.",
      details:
        "We organise the pages, sections, priorities and user journey so the website feels simple to navigate. This stage gives the project a clear direction before time is spent on visuals or development.",
      duration: "2–3 days",
    },
    {
      number: "03",
      label: "Design & development",
      title: "Build",
      description:
        "We design and develop the website with a clean, modern and responsive approach.",
      details:
        "This is where the website takes shape. We focus on a polished visual style, responsive layouts, smooth interactions and a structure that works well across desktop, tablet and mobile.",
      duration: "1–3 weeks",
    },
    {
      number: "04",
      label: "Review & launch",
      title: "Deliver",
      description:
        "We review, adjust and prepare everything so the final result is ready to launch.",
      details:
        "Before delivery, we test the website, polish the details and make final adjustments. The goal is to make sure the final result feels complete, reliable and ready to represent your business online.",
      duration: "2–4 days",
    },
  ];

  return (
    <main className="min-h-screen bg-[#0B0F19] px-6 pb-24 pt-32 text-white">
      <section className="mx-auto mb-16 max-w-6xl">
        <RevealCard className="max-w-3xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">
            Process
          </p>
          <h1 className="mb-8 text-4xl font-bold tracking-tight sm:text-5xl">
            A simple process that keeps every{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              project clear.
            </span>
          </h1>
          <p className="text-base leading-7 text-zinc-300">
            Our process is built to keep things focused and easy to follow, from
            the first conversation to the final website delivery.
          </p>
        </RevealCard>
      </section>

      <section className="mx-auto max-w-6xl">
        <div className="relative grid gap-0">
          {processSteps.map((step, index) => (
            <RevealCard key={step.title} delay={index * 0.1}>
              <div className="group relative grid gap-10 border-t border-white/10 py-24 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                {/* Animated top-border sweep */}
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
                  <h2 className="mb-5 text-3xl font-bold tracking-tight">
                    {step.title}
                  </h2>
                  <p className="mb-5 text-lg leading-8 text-zinc-300">
                    {step.description}
                  </p>
                  <p className="text-base leading-7 text-zinc-400">
                    {step.details}
                  </p>
                </div>
              </div>
            </RevealCard>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl border-t border-white/10 py-32 text-center">
        <RevealCard>
          <h2 className="mb-10 text-4xl font-bold tracking-tight text-white md:text-5xl">
            Ready to build your website with a clear plan?
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
