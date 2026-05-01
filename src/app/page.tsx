import Link from "next/link";

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
    <main className="min-h-screen bg-[#0B0F19] bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.12),_transparent_35%)] pt-20 text-white">
      <section className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl flex-col items-center justify-center px-6 text-center">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">
          Elaris
        </p>

        <h1 className="max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl">
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

      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-10 md:grid-cols-[0.8fr_1.2fr] md:items-center">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">
              About Elaris
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
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

      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-10 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">
              Services
            </p>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
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
          {services.map((service) => (
            <div
              key={service.title}
              className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-cyan-400/40 hover:bg-white/[0.07]"
            >
              <h3 className="text-xl font-semibold">{service.title}</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-400">
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="mb-10">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">
            Process
          </p>
          <h2 className="max-w-2xl text-3xl font-bold tracking-tight sm:text-4xl">
            A clear process from first contact to final delivery.
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-4">
          {processSteps.map((item) => (
            <div
              key={item.step}
              className="rounded-2xl border border-white/10 bg-[#111827] p-6"
            >
              <span className="text-sm font-semibold text-cyan-400">
                {item.step}
              </span>
              <h3 className="mt-5 text-xl font-semibold">{item.title}</h3>
              <p className="mt-3 text-sm leading-6 text-zinc-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="rounded-3xl border border-white/10 bg-white/5 px-6 py-12 text-center sm:px-12">
          <p className="mb-3 text-sm font-medium uppercase tracking-[0.3em] text-cyan-400">
            Start your project
          </p>

          <h2 className="mx-auto max-w-3xl text-3xl font-bold tracking-tight sm:text-4xl">
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