import Link from "next/link";

export default function ServicesPage() {
  const services = [
    {
      number: "01",
      category: "Strategy",
      title: "Discovery & Branding",
      description: "We analyse your business to define the most effective digital direction. We create identities that communicate your values with clarity and impact.",
    },
    {
      number: "02",
      category: "Design",
      title: "Experience Design (UX/UI)",
      description: "We craft the visual and functional structure. We focus on intuitive navigation and a high-end design that truly reflects your brand identity.",
    },
    {
      number: "03",
      category: "Technology",
      title: "High-Performance Development",
      description: "We turn design into reality. Using Next.js, we ensure your site is lightning-fast, secure, and fully optimized for Google search results.",
    },
  ];

  return (
    <main className="min-h-screen bg-[#0B0F19] px-6 pb-24 pt-32 text-white">
      {/* Hero Section */}
      <section className="mx-auto max-w-6xl mb-16">
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

      {/* Services Sections */}
      <section className="mx-auto max-w-6xl">
        <div className="grid gap-0">
          {services.map((service, index) => (
            <div 
              key={index}
              className="group relative grid gap-10 py-24 border-t border-white/10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start"
            >
              <div className="flex flex-col gap-4">
                {/* Estilo do número igual ao segundo código */}
                <span className="text-5xl font-black text-white/5 transition-colors group-hover:text-cyan-400/20">
                  {service.number}
                </span>
                <p className="text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">
                   {service.category}
                </p>
              </div>

              <div>
                <h2 className="mb-6 text-3xl font-bold tracking-tight">
                  {service.title}
                </h2>

                <p className="text-lg leading-8 text-zinc-400">
                  {service.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="mx-auto max-w-6xl border-t border-white/10 py-32 text-center">
        <h2 className="mb-10 text-4xl font-bold tracking-tight text-white md:text-5xl">
          Ready to start?
        </h2>

        <div className="flex justify-center">
          <Link
            href="/contact"
            className="inline-block rounded-full bg-white px-8 py-3 text-sm font-semibold text-black transition-all hover:bg-zinc-200"
          >
            Start your project
          </Link>
        </div>
      </section>
    </main>
  );
}