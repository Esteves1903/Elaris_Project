export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#0B0F19] px-6 pb-24 pt-32 text-white">
      <section className="mx-auto grid max-w-6xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div>
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">
            Contact
          </p>

          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Tell us about your project.
          </h1>

          <p className="mt-6 text-base leading-7 text-zinc-300">
            Send us a few details about your business and what you need. We will
            analyse the project and prepare a custom quote based on your goals,
            features and project complexity.
          </p>

          <div className="mt-10 space-y-5 rounded-2xl border border-white/10 bg-white/5 p-6">
            <div>
              <p className="text-sm font-semibold text-white">Email</p>
              <p className="mt-1 text-sm text-zinc-400">
                contact@elaris.com
              </p>
            </div>

            <div>
              <p className="text-sm font-semibold text-white">
                What happens next?
              </p>
              <p className="mt-1 text-sm leading-6 text-zinc-400">
                We review your request, understand your needs and get back to you
                with the next steps.
              </p>
            </div>
          </div>
        </div>

        <form className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20 sm:p-8">
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-medium">Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full rounded-xl border border-white/10 bg-[#0B0F19] px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-cyan-400"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium">Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full rounded-xl border border-white/10 bg-[#0B0F19] px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-cyan-400"
              />
            </div>
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm font-medium">
              Business name
            </label>
            <input
              type="text"
              placeholder="Your business"
              className="w-full rounded-xl border border-white/10 bg-[#0B0F19] px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-cyan-400"
            />
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm font-medium">
              Project type
            </label>
            <select className="w-full rounded-xl border border-white/10 bg-[#0B0F19] px-4 py-3 text-white outline-none transition focus:border-cyan-400">
              <option>New website</option>
              <option>Improve existing website</option>
              <option>Website maintenance</option>
              <option>Client area / portal</option>
              <option>Not sure yet</option>
            </select>
          </div>

          <div className="mt-5">
            <label className="mb-2 block text-sm font-medium">
              What do you need?
            </label>
            <textarea
              rows={6}
              placeholder="Tell us about your goals, pages, features, integrations or anything important..."
              className="w-full resize-none rounded-xl border border-white/10 bg-[#0B0F19] px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-cyan-400"
            />
          </div>

          <button
            type="submit"
            className="mt-6 w-full rounded-full bg-white px-7 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200 sm:w-auto"
          >
            Send request
          </button>

        </form>
      </section>
    </main>
  );
}