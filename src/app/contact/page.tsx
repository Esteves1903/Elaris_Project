export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#0B0F19] px-6 py-24 text-white">
      <section className="mx-auto max-w-3xl">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">
          Contact
        </p>

        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          Tell us about your project.
        </h1>

        <p className="mt-6 text-base leading-7 text-zinc-300">
          Send us a few details about your business and what you need. We will
          analyse the project and prepare a custom quote.
        </p>

        <form className="mt-10 space-y-5">
          <div>
            <label className="mb-2 block text-sm font-medium">
              Name
            </label>
            <input
              type="text"
              placeholder="Your name"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              placeholder="your@email.com"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              Business name
            </label>
            <input
              type="text"
              placeholder="Your business"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-medium">
              What do you need?
            </label>
            <textarea
              rows={6}
              placeholder="Tell us if you need a new website, improvements, maintenance, client area, or something else..."
              className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-cyan-400"
            />
          </div>

          <button
            type="submit"
            className="rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
          >
            Send request
          </button>
        </form>
      </section>
    </main>
  );
}