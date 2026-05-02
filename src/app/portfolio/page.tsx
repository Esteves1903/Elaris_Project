"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PortfolioPage() {
  // Estado para simular interação dentro de um projeto específico
  const [activeTab, setActiveTab] = useState("desktop");

  const projects = [
    { 
      id: 1,
      title: "Nova Horizon", 
      category: "E-commerce System", 
      description: "A high-end retail experience built with Next.js 14.",
      color: "bg-blue-600"
    },
    { 
      id: 2,
      title: "Zenith SaaS", 
      category: "Dashboard Design", 
      description: "Real-time data analytics with interactive charts.",
      color: "bg-purple-600"
    }
  ];

  return (
    <main className="min-h-screen bg-[#0B0F19] px-6 pb-24 pt-32 text-white">
      <section className="mx-auto max-w-6xl mb-20 text-center md:text-left">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">Interactive Labs</p>
        <h1 className="text-4xl font-bold sm:text-6xl mb-6">Experience the code.</h1>
        <p className="text-zinc-400 max-w-2xl text-lg">Don't just look. Click, toggle, and explore these live interface prototypes.</p>
      </section>

      <section className="mx-auto max-w-6xl grid gap-20">
        {projects.map((project) => (
          <motion.div 
            key={project.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="group grid lg:grid-cols-2 gap-12 items-center"
          >
            {/* Esquerda: Info do Projeto */}
            <div>
              <p className="text-cyan-400 font-mono mb-2">// 0{project.id}</p>
              <h2 className="text-3xl font-bold mb-4">{project.title}</h2>
              <p className="text-zinc-400 mb-8 text-lg">{project.description}</p>
              
              {/* Botões Reais dentro do layout */}
              <div className="flex gap-4">
                <button className="px-6 py-2 bg-white text-black rounded-full font-bold hover:bg-cyan-400 transition-colors">
                  Live Demo
                </button>
                <button className="px-6 py-2 border border-white/20 rounded-full font-bold hover:bg-white/10">
                  View Code
                </button>
              </div>
            </div>

            {/* Direita: O "Layout Interativo" (Mockup Vivo) */}
            <div className="relative rounded-2xl bg-zinc-900 border border-white/10 p-4 shadow-2xl overflow-hidden">
              {/* Barra de Janela Estilo Mac */}
              <div className="flex gap-2 mb-4 border-b border-white/5 pb-4">
                <div className="w-3 h-3 rounded-full bg-red-500/50" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                <div className="w-3 h-3 rounded-full bg-green-500/50" />
              </div>

              {/* Interface Simulada Reativa */}
              <div className={`aspect-video rounded-lg ${project.color} flex flex-col items-center justify-center p-6 text-center`}>
                <motion.div 
                  whileHover={{ scale: 1.05 }}
                  className="bg-black/20 backdrop-blur-md p-8 rounded-xl border border-white/10"
                >
                  <p className="text-sm uppercase tracking-widest mb-4">Interactive Component</p>
                  <h3 className="text-xl font-bold mb-6">Test the UI behavior</h3>
                  
                  {/* Botões de Teste DENTRO do Mockup */}
                  <div className="flex justify-center gap-3">
                    <button 
                      onClick={() => alert(`Project ${project.id} Interaction Success!`)}
                      className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center hover:bg-white text-black transition-all"
                    >
                      ★
                    </button>
                    <div className="w-24 h-10 rounded-lg bg-black/40 flex items-center justify-center text-xs">
                      Active
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        ))}
      </section>

      {/* Botão Final padrão */}
      <section className="text-center py-32 mt-20 border-t border-white/10">
        <h2 className="text-4xl font-bold mb-10">Want a custom interactive UI?</h2>
        <a href="/contact" className="inline-block rounded-full bg-white px-8 py-3 text-sm font-semibold text-black hover:bg-zinc-200 transition-all">
          Let's talk
        </a>
      </section>
    </main>
  );
}