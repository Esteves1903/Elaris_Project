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
    },
    {
      number: "02",
      label: "Structure & direction",
      title: "Plan",
      description:
        "We define the structure, features and direction of the project before development starts.",
      details:
        "We organise the pages, sections, priorities and user journey so the website feels simple to navigate. This stage gives the project a clear direction before time is spent on visuals or development.",
    },
    {
      number: "03",
      label: "Design & development",
      title: "Build",
      description:
        "We design and develop the website with a clean, modern and responsive approach.",
      details:
        "This is where the website takes shape. We focus on a polished visual style, responsive layouts, smooth interactions and a structure that works well across desktop, tablet and mobile.",
    },
    {
      number: "04",
      label: "Review & launch",
      title: "Deliver",
      description:
        "We review, adjust and prepare everything so the final result is ready to launch.",
      details:
        "Before delivery, we test the website, polish the details and make final adjustments. The goal is to make sure the final result feels complete, reliable and ready to represent your business online.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#0B0F19] px-6 pb-24 pt-32 text-white">
      <section className="mx-auto mb-16 max-w-6xl">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">
            Process
          </p>

          <h1 className="mb-8 text-4xl font-bold tracking-tight sm:text-5xl">
            A simple process that keeps every project clear.
          </h1>

          <p className="text-base leading-7 text-zinc-300">
            Our process is built to keep things focused and easy to follow, from
            the first conversation to the final website delivery.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl">
        <div className="relative grid gap-0">
          {/* Vertical connecting line between steps */}
          <div className="absolute left-8 top-24 bottom-24 w-px bg-gradient-to-b from-transparent via-white/[0.08] to-transparent hidden lg:block" />

          {processSteps.map((step, index) => (
            <RevealCard key={step.title} delay={index * 0.1}>
              <div className="group relative grid gap-10 border-t border-white/10 py-24 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
                <div className="flex flex-col gap-4">
                  <span className="text-5xl font-black text-white/5 transition-colors group-hover:text-cyan-400/20">
                    {step.number}
                  </span>

                  <p className="text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">
                    {step.label}
                  </p>
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
        <h2 className="mb-10 text-4xl font-bold tracking-tight text-white md:text-5xl">
          Ready to build your website with a clear plan?
        </h2>

        <Link
          href="/contact"
          className="inline-block rounded-full bg-white px-8 py-3 text-sm font-semibold text-black transition-all hover:bg-zinc-200"
        >
          Request a quote
        </Link>
      </section>
    </main>
  );
}
