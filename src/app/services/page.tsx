import Link from "next/link";

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
    },
    {
      number: "02",
      label: "Website upgrades",
      title: "Website improvement",
      description:
        "We improve existing websites with better design, structure, performance and usability.",
      details:
        "If your current website feels outdated, slow or unclear, we refine the experience without losing what already works. This can include improving the layout, simplifying the navigation, making content easier to read and helping the site feel more trustworthy.",
    },
    {
      number: "03",
      label: "Care & maintenance",
      title: "Ongoing support",
      description:
        "We provide maintenance, updates and support to keep your digital presence running smoothly.",
      details:
        "A website should not feel abandoned after launch. We help with content updates, small changes, fixes, improvements and general support so your site stays fresh, reliable and aligned with your business.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#0B0F19] px-6 pb-24 pt-32 text-white">
      <section className="mx-auto mb-16 max-w-6xl">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">
            Services
          </p>

          <h1 className="mb-8 text-4xl font-bold tracking-tight sm:text-5xl">
            Practical website services for small businesses.
          </h1>

          <p className="text-base leading-7 text-zinc-300">
            We help businesses create, improve and maintain websites that look
            professional, are easy to use and support real business goals.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl">
        <div className="grid gap-0">
          {services.map((service) => (
            <div
              key={service.title}
              className="group relative grid gap-10 border-t border-white/10 py-24 lg:grid-cols-[0.8fr_1.2fr] lg:items-start"
            >
              <div className="flex flex-col gap-4">
                <span className="text-5xl font-black text-white/5 transition-colors group-hover:text-cyan-400/20">
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

                <p className="text-base leading-7 text-zinc-400">
                  {service.details}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl border-t border-white/10 py-32 text-center">
        <h2 className="mb-10 text-4xl font-bold tracking-tight text-white md:text-5xl">
          Need a website that works better for your business?
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
