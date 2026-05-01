export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B0F19] text-white">
      <section className="mx-auto flex min-h-screen max-w-6xl flex-col items-center justify-center px-6 text-center">
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
          <a
            href="/contact"
            className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
          >
            Request a quote
          </a>

          <a
            href="/services"
            className="rounded-full border border-white/20 px-7 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
          >
            View services
          </a>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-semibold">Websites</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Modern, responsive and professional websites for small businesses.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-semibold">Client portals</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Simple client areas to track project progress, payments and support.
            </p>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <h2 className="text-xl font-semibold">Support</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400">
              Ongoing help, maintenance and improvements after delivery.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}