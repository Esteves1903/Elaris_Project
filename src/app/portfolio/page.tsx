"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PortfolioPage() {
  const [selectedProject, setSelectedProject] = useState<null | number>(null);

  const projects = [
    { 
      id: 1,
      title: "Nova Horizon", 
      category: "E-commerce System", 
      description: "A high-end retail experience focused on conversion and speed.",
      longDescription: "This project involved creating a custom headless commerce solution. We focused on sub-second page loads and a seamless checkout experience.",
      stack: ["Next.js 14", "Tailwind CSS", "Stripe", "Framer Motion"],
      color: "from-blue-600 to-cyan-500"
    },
    { 
      id: 2,
      title: "Zenith SaaS", 
      category: "Analytics Dashboard", 
      description: "Real-time data visualization for enterprise-level teams.",
      longDescription: "A complex dashboard designed to handle large datasets with real-time updates via WebSockets.",
      stack: ["React", "TypeScript", "D3.js", "Supabase"],
      color: "from-purple-600 to-indigo-500"
    }
  ];

  return (
    <main className="min-h-screen bg-[#0B0F19] px-6 pb-24 pt-32 text-white overflow-hidden">
      {/* Header */}
      <section className="mx-auto max-w-6xl mb-20">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">Portfolio</p>
          <h1 className="text-5xl font-bold mb-6">Crafting digital <br/>masterpieces.</h1>
          <p className="text-zinc-400 max-w-xl text-lg">
            Focused on internal excellence. No external redirects, just pure interactive craftsmanship.
          </p>
        </motion.div>
      </section>

      {/* Grid de Projetos */}
      <section className="mx-auto max-w-6xl grid gap-32">
        {projects.map((project) => (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="group grid lg:grid-cols-2 gap-16 items-center"
          >
            {/* Visual Preview Interativo */}
            <div className="relative aspect-video rounded-3xl bg-zinc-900 border border-white/10 overflow-hidden shadow-2xl">
              <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20 group-hover:opacity-40 transition-opacity`} />
              
              {/* Simulação de Interface */}
              <div className="absolute inset-8 border border-white/10 rounded-xl bg-black/40 backdrop-blur-sm p-6">
                <div className="w-full h-2 bg-white/10 rounded-full mb-4" />
                <div className="w-2/3 h-2 bg-white/10 rounded-full mb-8" />
                <div className="grid grid-cols-3 gap-4">
                  {[1, 2, 3].map(i => (
                    <motion.div 
                      key={i}
                      whileHover={{ y: -5 }}
                      className="aspect-square bg-white/5 rounded-lg border border-white/5" 
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Conteúdo e Botões */}
            <div>
              <span className="text-cyan-400 font-mono text-sm tracking-tighter mb-4 block">// Selected Project</span>
              <h2 className="text-4xl font-bold mb-4">{project.title}</h2>
              <p className="text-zinc-400 text-lg mb-8 leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-4">
                {/* BOTÃO 1: Detalhes Internos (Abre Modal) */}
                <button 
                  onClick={() => setSelectedProject(project.id)}
                  className="px-8 py-3 bg-white text-black rounded-full font-bold hover:bg-cyan-400 transition-all active:scale-95"
                >
                  Project Details
                </button>

                {/* BOTÃO 2: Contacto Direto */}
                <a 
                  href="/contact"
                  className="px-8 py-3 border border-white/20 rounded-full font-bold hover:bg-white/10 transition-all text-sm"
                >
                  Inquire Now
                </a>
              </div>

              {/* Tech Stack Horizontal */}
              <div className="mt-10 flex gap-6 border-t border-white/5 pt-8">
                {project.stack.slice(0, 3).map((tech, i) => (
                  <span key={i} className="text-xs font-mono text-zinc-500 uppercase tracking-widest">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Overlay de Detalhes (Modal/Slide-over) */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-xl flex justify-end"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div 
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="w-full max-w-2xl bg-[#0F141F] h-full p-12 overflow-y-auto border-l border-white/10"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedProject(null)}
                className="mb-12 text-zinc-500 hover:text-white transition-colors"
              >
                ← Back to Portfolio
              </button>

              {projects.find(p => p.id === selectedProject) && (
                <>
                  <h2 className="text-5xl font-bold mb-6">
                    {projects.find(p => p.id === selectedProject)?.title}
                  </h2>
                  <p className="text-cyan-400 mb-8 uppercase tracking-widest text-sm font-bold">
                    Full Case Study
                  </p>
                  <p className="text-zinc-400 text-xl leading-relaxed mb-12">
                    {projects.find(p => p.id === selectedProject)?.longDescription}
                  </p>

                  <h3 className="text-xl font-bold mb-4">Core Technology Stack</h3>
                  <div className="flex flex-wrap gap-3 mb-12">
                    {projects.find(p => p.id === selectedProject)?.stack.map((tech, i) => (
                      <span key={i} className="px-4 py-2 bg-white/5 border border-white/10 rounded-lg font-mono text-cyan-300">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="p-8 rounded-2xl bg-cyan-400/10 border border-cyan-400/20">
                    <h4 className="font-bold mb-2 text-cyan-400">Interested in these features?</h4>
                    <p className="text-sm text-zinc-300 mb-6">We can implement a similar solution for your business.</p>
                    <a href="/contact" className="inline-block px-6 py-2 bg-cyan-400 text-black font-bold rounded-lg text-sm">
                      Start Discussion
                    </a>
                  </div>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}