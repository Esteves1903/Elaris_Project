import Link from "next/link";
import { portfolioProjects } from "@/lib/portfolio-projects";
import RevealCard from "@/components/ui/RevealCard";

const services = [
  {
    title: "Website creation",
    description:
      "We build modern, responsive websites designed to help small businesses grow online.",
  },
  {
    title: "Website improvement",
    description:
      "We improve existing websites with better design, structure, performance and usability.",
  },
  {
    title: "Ongoing support",
    description:
      "We provide maintenance, updates and support to keep your digital presence running smoothly.",
  },
];

const processSteps = [
  {
    step: "01",
    title: "Understand",
    description:
      "We start by understanding your business, goals and what your website needs to achieve.",
  },
  {
    step: "02",
    title: "Plan",
    description:
      "We define the structure, features and direction of the project before development starts.",
  },
  {
    step: "03",
    title: "Build",
    description:
      "We design and develop the website with a clean, modern and responsive approach.",
  },
  {
    step: "04",
    title: "Deliver",
    description:
      "We review, adjust and prepare everything so the final result is ready to launch.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B0F19] bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.12),_transparent_35%)] pt-20">
      {/* Hero Section */}
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">
          Elaris
        </p>

        <h1 className="max-w-4xl text-4xl font-bold tracking-tight text-white sm:text-6xl">
          Digital solutions for growing businesses.
        </h1>

        <p className="mt-6 max-w-2xl text-base leading-7 text-zinc-300 sm:text-lg">
          We create modern websites and digital tools that help small businesses
          grow online with clarity, design and performance.
        </p>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            href="/contact"
            className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
          >
            Request a quote
          </Link>

          <Link
            href="/services"
            className="rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            View services
          </Link>
        </div>
      </section>

      {/* About Section */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-center">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">
              About Elaris
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Simple, modern and focused on real business needs.
            </h2>
          </div>

          <p className="text-base leading-8 text-zinc-300">
            Elaris helps small businesses build a stronger digital presence
            through clean websites, useful digital tools and a clear development
            process. We focus on creating solutions that look professional, work
            smoothly and are easy for clients to understand.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">
              Services
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              What we can help with.
            </h2>
          </div>

          <Link
            href="/services"
            className="text-sm font-semibold text-cyan-400 transition hover:text-cyan-300"
          >
            View all services →
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {services.map((service, index) => (
            <RevealCard
              key={service.title}
              delay={index * 0.30}
              // h-full para esticar o card
              className="flex flex-col h-full cursor-default rounded-2xl border border-white/10 bg-white/5 p-6 text-white transition-colors hover:border-cyan-400/40 hover:bg-white/[0.07]"
            >
              <h3 className="text-xl font-semibold">{service.title}</h3>
              {/* flex-1 para o texto ocupar o espaço e alinhar os cards */}
              <p className="mt-3 text-sm leading-6 text-zinc-400 flex-1">
                {service.description}
              </p>
            </RevealCard>
          ))}
        </div>
      </section>

      {/* Portfolio Section */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">
              Portfolio
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Recent projects we&apos;re proud of.
            </h2>
          </div>

          <Link
            href="/portfolio"
            className="text-sm font-semibold text-cyan-400 transition hover:text-cyan-300"
          >
            View all projects →
          </Link>
        </div>

        <p className="mb-8 max-w-2xl text-base leading-7 text-zinc-300">
          Custom websites for cafes, restaurants, and barbershops with advanced
          features like online booking, ordering systems, and customer
          management tools.
        </p>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {portfolioProjects.slice(0, 3).map((project, index) => (
            <RevealCard key={project.id} delay={index * 0.30} className="h-full">
              <Link
                href="/portfolio"
                // flex flex-col h-full para alinhar tudo
                className="group flex flex-col h-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition-colors hover:border-cyan-400/40 hover:bg-white/[0.07]"
              >
                <div className="relative h-48 w-full overflow-hidden bg-black shrink-0">
                  <img
                    src={project.images?.[0] || "/api/placeholder/400/320"}
                    alt={project.title}
                    className="h-full w-full object-cover opacity-80 transition group-hover:opacity-100"
                  />
                  <div className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1 text-xs font-semibold uppercase text-cyan-400 backdrop-blur-sm">
                    {project.category.replace("-", " ")}
                  </div>
                </div>

                <div className="p-6 flex flex-1 flex-col">
                  <h3 className="text-lg font-semibold text-white">
                    {project.title}
                  </h3>

                  {/* flex-1 aqui empurra as tags para o fundo e iguala os tamanhos */}
                  <p className="mt-2 text-sm text-zinc-400 flex-1">
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

      {/* Process Section */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">
              Process
            </p>

            <h2 className="max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
              A clear process from first contact to final delivery.
            </h2>
          </div>

          <Link
            href="/process"
            className="text-sm font-semibold text-cyan-400 transition hover:text-cyan-300"
          >
            View full process →
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          {processSteps.map((item, index) => (
            <RevealCard
              key={item.step}
              delay={index * 0.30}
              // h-full e flex-col aqui também
              className="flex flex-col h-full cursor-default rounded-2xl border border-white/10 bg-white/5 p-6 text-white transition-colors hover:border-cyan-400/40 hover:bg-white/[0.07]"
            >
              <span className="text-sm font-semibold text-cyan-400">
                {item.step}
              </span>

              <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>

              <p className="mt-3 text-sm leading-6 text-zinc-400 flex-1">
                {item.description}
              </p>
            </RevealCard>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="rounded-3xl border border-white/10 bg-white/5 px-6 py-12 text-center sm:px-12">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">
            Start your project
          </p>

          <h2 className="mx-auto max-w-3xl text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Have an idea for your website? Let&apos;s turn it into a clear plan.
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-zinc-300">
            Tell us what your business needs and we will prepare a custom quote
            based on your goals, features and project complexity.
          </p>

          <Link
            href="/contact"
            className="mt-8 inline-flex rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
          >
            Request a quote
          </Link>
        </div>
      </section>
    </main>
  );
}