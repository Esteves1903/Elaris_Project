import Link from "next/link";

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#0B0F19] px-6 pb-24 pt-32 text-white">
      {/* Hero Section */}
      <section className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">
            Services
          </p>

          <h1 className="mb-8 text-4xl font-bold tracking-tight sm:text-5xl">
            Digital solutions focused on real business needs.
          </h1>

          <p className="text-base leading-7 text-zinc-300">
            At Elaris, we turn ideas into high-performance digital products by
            combining strategy, design and technology.
          </p>
        </div>
      </section>

      {/* Section: Strategy */}
      <section className="mx-auto mt-16 max-w-6xl border-t border-white/10 py-24">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">
              01. Strategy
            </p>
          </div>

          <div>
            <h2 className="mb-6 text-3xl font-bold tracking-tight">
              Discovery & Branding
            </h2>

            <p className="text-base leading-7 text-zinc-400">
              We analyse your business to define the most effective digital
              direction. We create identities that communicate your values with
              clarity and impact.
            </p>
          </div>
        </div>
      </section>

      {/* Section: Design */}
      <section className="mx-auto max-w-6xl border-t border-white/10 py-24">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">
              02. Design
            </p>
          </div>

          <div>
            <h2 className="mb-6 text-3xl font-bold tracking-tight">
              UI/UX Design
            </h2>

            <p className="text-base leading-7 text-zinc-400">
              Interfaces focused on conversion and intuitive user experiences.
              We design every detail to make each user journey clear, smooth and
              memorable.
            </p>
          </div>
        </div>
      </section>

      {/* Section: Technology */}
      <section className="mx-auto max-w-6xl border-t border-white/10 py-24">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">
              03. Technology
            </p>
          </div>

          <div>
            <h2 className="mb-6 text-3xl font-bold tracking-tight">
              Web Development
            </h2>

            <p className="text-base leading-7 text-zinc-400">
              Robust development with modern technologies like Next.js. We focus
              on performance, security and search engine optimisation.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl border-t border-white/10 py-32 text-center">
        <h2 className="mb-10 text-4xl font-bold tracking-tight text-white md:text-5xl">
          Ready to start?
        </h2>

        <div className="flex justify-center">
          <Link
            href="/contact"
            className="inline-block rounded-full bg-white px-7 py-2.5 text-sm font-semibold text-black transition-all hover:bg-zinc-200"
          >
            Start your project
          </Link>
        </div>
      </section>
    </main>
  );
}
