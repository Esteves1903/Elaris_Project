import React from 'react';

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-[#0B0F19] px-6 pb-24 pt-32 text-white">
      {/* Hero Section */}
      <section className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">
            Serviços
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-8">
            Soluções digitais focadas em necessidades reais.
          </h1>
          <p className="text-base leading-7 text-zinc-300">
            Na Elaris, transformamos ideias em produtos digitais de alta performance, unindo estratégia, design e tecnologia.
          </p>
        </div>
      </section>

      {/* Section: Estratégia */}
      <section className="mx-auto max-w-6xl py-24 border-t border-white/10 mt-16">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">
              01. Estratégia
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-6">Discovery & Branding</h2>
            <p className="text-base leading-7 text-zinc-400">
              Análise profunda do seu negócio para definir o caminho digital mais eficiente. Criamos identidades que comunicam os seus valores de forma clara e impactante.
            </p>
          </div>
        </div>
      </section>

      {/* Section: Design */}
      <section className="mx-auto max-w-6xl py-24 border-t border-white/10">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">
              02. Design
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-6">UI/UX Design</h2>
            <p className="text-base leading-7 text-zinc-400">
              Interfaces focadas na conversão e na experiência intuitiva. Desenhamos cada detalhe para garantir que os seus utilizadores tenham uma jornada memorável.
            </p>
          </div>
        </div>
      </section>

      {/* Section: Tecnologia */}
      <section className="mx-auto max-w-6xl py-24 border-t border-white/10">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="mb-3 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">
              03. Tecnologia
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-bold tracking-tight mb-6">Web Development</h2>
            <p className="text-base leading-7 text-zinc-400">
              Desenvolvimento robusto com tecnologias modernas como Next.js. Focamos em performance, segurança e otimização para motores de busca (SEO).
            </p>
          </div>
        </div>
      </section>

      
      <section className="mx-auto max-w-6xl py-32 border-t border-white/10 text-center">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-10 text-white">
          Pronto para começar?
        </h2>
        <div className="flex justify-center">
          <a 
            href="/contact" 
            className="inline-block rounded-full bg-white px-7 py-2.5 text-sm font-semibold text-black transition-all hover:bg-zinc-200"
          >
            Iniciar Projeto
          </a>
        </div>
      </section>
    </main>
  );
}