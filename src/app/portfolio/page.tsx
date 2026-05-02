"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- ELASTIC UI COMPONENTS (ELARIS STYLE) ---

const RestaurantLayout = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleBooking = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSuccess(true);
    }, 1500);
  };

  return (
    <div className="h-full bg-[#050505] text-white font-sans overflow-y-auto custom-scrollbar">
      {/* Dynamic Nav */}
      <nav className="sticky top-0 z-20 bg-black/60 backdrop-blur-xl border-b border-white/5 px-6 py-4 flex justify-between items-center">
        <span className="font-black tracking-tighter text-xl">L'E.</span>
        <div className="hidden md:flex gap-6 text-[10px] uppercase tracking-[0.2em] opacity-60">
          <span className="hover:text-cyan-400 cursor-pointer transition-colors">Menu</span>
          <span className="hover:text-cyan-400 cursor-pointer transition-colors">Private</span>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative h-[350px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2070')] bg-cover bg-center scale-110 opacity-40 blur-[2px]" />
        <div className="relative text-center z-10 px-4">
          <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-5xl md:text-6xl font-serif italic mb-4">Culinary Art</motion.h2>
          <p className="text-xs tracking-[0.5em] uppercase opacity-60">Michelin Star Experience 2026</p>
        </div>
      </div>

      {/* Booking Card */}
      <div className="p-8 max-w-md mx-auto -mt-12 relative z-10">
        <div className="bg-zinc-900/90 border border-white/10 p-8 rounded-3xl backdrop-blur-2xl shadow-2xl">
          <h4 className="text-sm font-bold mb-6 text-center uppercase tracking-widest">Reserve a Table</h4>
          <button 
            onClick={handleBooking}
            disabled={loading || success}
            className={`w-full py-4 rounded-xl font-bold text-[10px] uppercase tracking-widest transition-all ${
              success ? 'bg-green-500 text-white' : 'bg-white text-black hover:bg-cyan-400'
            }`}
          >
            {loading ? "Checking Availability..." : success ? "Booking Confirmed ✓" : "Find a Table"}
          </button>
        </div>
      </div>
    </div>
  );
};

const BarberLayout = () => {
  const [activeTab, setActiveTab] = useState('Hair');
  return (
    <div className="h-full bg-[#0a0a0a] text-white font-sans overflow-hidden flex flex-col">
      <div className="p-8 border-b border-white/5 flex justify-between items-end">
        <div>
          <h3 className="text-4xl font-black italic tracking-tighter leading-none mb-2">IRON<br/>& STEEL</h3>
          <p className="text-[9px] text-red-600 font-bold uppercase tracking-widest">Premium Grooming</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] opacity-40">Est. 2026</p>
          <p className="text-xs font-mono">London, UK</p>
        </div>
      </div>
      
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar Nav */}
        <div className="w-20 border-r border-white/5 flex flex-col items-center py-8 gap-10 text-[9px] font-bold uppercase vertical-text opacity-40">
          {['Service', 'Booking', 'Gallery'].map(t => <span key={t} className="cursor-pointer hover:text-red-600 transition-colors">{t}</span>)}
        </div>
        
        {/* Content Area */}
        <div className="flex-1 p-8 overflow-y-auto custom-scrollbar">
          <div className="grid grid-cols-1 gap-4">
            {['The Classic', 'Beard Trim', 'Skin Fade'].map(s => (
              <div key={s} className="group p-6 bg-zinc-900/50 border border-white/5 rounded-2xl hover:border-red-600/50 transition-all flex justify-between items-center cursor-pointer">
                <div>
                  <h4 className="font-bold text-sm mb-1">{s}</h4>
                  <p className="text-[10px] opacity-40">45 Minutes • Professional</p>
                </div>
                <span className="font-mono text-red-600 group-hover:translate-x-2 transition-transform">→</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// --- REST OF THE CODE (MAIN COMPONENT) ---

export default function PortfolioPage() {
  const [activeProject, setActiveProject] = useState<any>(null);

  // Scroll Lock Logic
  useEffect(() => {
    if (activeProject) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '15px'; // Prevent layout shift
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    }
  }, [activeProject]);

  const projects = [
    { 
      id: 1, 
      title: "L'Essence Gastronomy", 
      url: "lessence-rest.com", 
      layout: <RestaurantLayout />, 
      tech: ["Next.js 14", "Framer", "UI/UX"],
      description: "A luxury reservation platform with micro-interactions and a glassmorphism interface."
    },
    { 
      id: 2, 
      title: "Iron & Steel Barber", 
      url: "ironsteel.co", 
      layout: <BarberLayout />, 
      tech: ["Tailwind", "Motion Design"],
      description: "Aggressive branding for premium service industries, focused on high-speed booking flows."
    }
  ];

  return (
    <main className="min-h-screen bg-[#080808] text-white pt-32 pb-40 px-6">
      <div className="max-w-5xl mx-auto">
        <header className="mb-32">
          <section className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">
            Portfolio
          </p>

          <h1 className="mb-8 text-4xl font-bold tracking-tight sm:text-5xl">
            Interactive layouts showcase .
          </h1>

          <p className="text-base leading-7 text-zinc-300">
            We bridge the gap between bold aesthetics and engineering precision. 
    Explore our interactive gallery of high-performance interfaces designed 
    to redefine how users engage with your brand.
          </p>
        </div>
      </section>
        </header>

        <div className="space-y-60">
          {projects.map((p) => (
            <div key={p.id} className="relative group">
              <div className="flex justify-between items-center mb-10">
                <div className="flex items-center gap-4">
                  <span className="text-4xl font-black text-zinc-800">0{p.id}</span>
                  <h3 className="text-3xl font-bold">{p.title}</h3>
                </div>
                <div className="hidden md:flex gap-3">
                  {p.tech.map(t => <span key={t} className="text-[9px] font-mono text-cyan-400 border border-cyan-400/20 px-3 py-1 rounded-full uppercase tracking-widest">{t}</span>)}
                </div>
              </div>

              {/* Mockup Window */}
              <div className="rounded-[2.5rem] overflow-hidden border border-white/10 bg-zinc-900 shadow-[0_0_80px_rgba(0,0,0,0.5)]">
                <div className="bg-zinc-800/50 px-8 py-5 flex items-center justify-between border-b border-white/5">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-zinc-700" />
                    <div className="w-3 h-3 rounded-full bg-zinc-700" />
                  </div>
                  <div className="bg-black/40 px-4 py-1.5 rounded-lg text-[9px] font-mono text-zinc-400 border border-white/5 tracking-widest uppercase">
                    {p.url}
                  </div>
                  <div className="w-10" />
                </div>
                
                <div className="h-[550px] relative">
                  {p.layout}
                </div>
              </div>

              <div className="mt-12 flex justify-center">
                <button 
                  onClick={() => setActiveProject(p)}
                  className="px-12 py-5 bg-white text-black rounded-full font-black text-[11px] uppercase tracking-[0.3em] hover:bg-cyan-400 transition-all active:scale-95 shadow-xl shadow-white/5"
                >
                  Explore Project Case Study
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Side Panel */}
      <AnimatePresence>
        {activeProject && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setActiveProject(null)}
              className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-[100]"
            />
            <motion.div 
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full max-w-2xl bg-zinc-950 z-[101] border-l border-white/10 flex flex-col"
            >
              <div className="flex-1 overflow-y-auto p-12 md:p-24 custom-scrollbar">
                <button 
                  onClick={() => setActiveProject(null)}
                  className="text-cyan-400 font-mono text-xs mb-16 uppercase tracking-widest hover:translate-x-2 transition-transform inline-block"
                >
                  ← Back to Selection
                </button>
                <h2 className="text-6xl font-black italic mb-8 leading-none uppercase">{activeProject.title}</h2>
                <p className="text-zinc-500 text-xl font-light leading-relaxed mb-12">{activeProject.description}</p>
                
                <div className="space-y-12">
                   <div className="p-8 rounded-3xl bg-zinc-900/50 border border-white/5">
                      <h4 className="text-xs font-bold uppercase tracking-widest mb-6 text-cyan-400">Technical Stack</h4>
                      <div className="flex flex-wrap gap-4 font-mono text-[10px]">
                        {activeProject.tech.map((t: string) => <span key={t} className="bg-black px-4 py-2 rounded-lg border border-white/5">{t}</span>)}
                      </div>
                   </div>
                   <a href="/contact" className="block w-full py-6 bg-cyan-400 text-black text-center font-black rounded-2xl uppercase text-xs tracking-widest shadow-2xl shadow-cyan-400/20">
                      Request a quote for a similar site
                   </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #22d3ee; }
        .vertical-text { writing-mode: vertical-rl; transform: rotate(180deg); }
      `}</style>
    </main>
  );
}