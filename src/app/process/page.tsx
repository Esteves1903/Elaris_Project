import React from 'react';

export default function ProcessPage() {
  const steps = [
    {
      number: "01",
      title: "Discovery & Strategy",
      description: "We start by diving deep into your business. We understand your goals, your target audience, and the specific challenges we need to solve together.",
      details: ["Market Analysis", "Goal Setting", "User Personas"]
    },
    {
      number: "02",
      title: "Experience Design (UX/UI)",
      description: "We craft the visual and functional structure. We focus on intuitive navigation and a high-end design that truly reflects your brand identity.",
      details: ["Wireframing", "Interface Design", "Interactive Prototypes"]
    },
    {
      number: "03",
      title: "High-Performance Development",
      description: "We turn design into reality. Using Next.js, we ensure your site is lightning-fast, secure, and fully optimized for Google search results.",
      details: ["Clean Code", "SEO Optimized", "100% Performance"]
    },
    {
      number: "04",
      title: "Launch & Support",
      description: "We don't leave you hanging. We handle the deployment and ensure everything runs perfectly long after the project goes live.",
      details: ["Final Testing", "Deployment (Vercel)", "Post-launch Support"]
    }
  ];

  return (
    <main className="min-h-screen bg-[#0B0F19] px-6 pb-24 pt-32 text-white">
      {/* Hero Section */}
      <section className="mx-auto max-w-6xl mb-24">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">
            Our Method
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-8">
            How we turn your ideas into digital reality.
          </h1>
          <p className="text-base leading-7 text-zinc-300">
            We work with transparency and a results-driven mindset. Every stage of our process is designed to guarantee maximum quality and efficiency.
          </p>
        </div>
      </section>

      {/* Steps Section */}
      <section className="mx-auto max-w-6xl">
        <div className="grid gap-12">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="group relative grid gap-10 py-16 border-t border-white/10 lg:grid-cols-[0.9fr_1.1fr]"
            >
              <div className="flex flex-col gap-4">
                <span className="text-5xl font-black text-white/5 transition-colors group-hover:text-cyan-400/20">
                  {step.number}
                </span>
                <h2 className="text-3xl font-bold tracking-tight">{step.title}</h2>
              </div>
              
              <div>
                <p className="text-lg leading-8 text-zinc-400 mb-8">
                  {step.description}
                </p>
                <ul className="flex flex-wrap gap-3">
                  {step.details.map((detail, idx) => (
                    <li 
                      key={idx}
                      className="rounded-full border border-white/10 bg-white/5 px-4 py-1 text-sm text-zinc-300"
                    >
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Final Call to Action */}
      <section className="mx-auto max-w-6xl py-32 border-t border-white/10 text-center">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-10">
          Ready to start the journey?
        </h2>
        <div className="flex justify-center">
          <a 
            href="/contact" 
            className="inline-block rounded-full bg-white px-8 py-3 text-sm font-semibold text-black transition-all hover:bg-zinc-200"
          >
            Get in touch
          </a>
        </div>
      </section>
    </main>
  );
}