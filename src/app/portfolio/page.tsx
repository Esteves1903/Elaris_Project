"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- 1. L'ESSENCE GASTRONOMY (LUXURY EXPERIENCE) ---
const RestaurantLayout = () => {
  const [step, setStep] = useState('home'); // 'home' | 'reserve' | 'success'
  const [email, setEmail] = useState('');

  return (
    <div className="h-full bg-[#050505] text-white font-sans overflow-y-auto custom-scrollbar selection:bg-amber-200/30">
      <nav className="sticky top-0 z-30 bg-black/80 backdrop-blur-md border-b border-white/5 px-8 py-5 flex justify-between items-center">
        <span className="font-serif italic text-xl tracking-tighter text-amber-200">L'Essence</span>
        <div className="flex gap-8 text-[9px] uppercase tracking-[0.3em] font-medium">
          <button onClick={() => setStep('home')} className="hover:text-amber-200 transition-colors">The Menu</button>
          <button onClick={() => setStep('reserve')} className="bg-amber-200 text-black px-4 py-2 rounded-sm hover:bg-white transition-colors">Book Now</button>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {step === 'home' && (
          <motion.div 
            key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="relative"
          >
            <div className="h-[400px] flex items-center justify-center relative overflow-hidden">
              <motion.div 
                initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 10 }}
                className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1550966841-396ad886756b?q=80&w=2070')] bg-cover bg-center opacity-40" 
              />
              <div className="relative text-center z-10 px-6">
                <h2 className="text-6xl font-serif italic mb-6 leading-tight">Sensorial<br/>Journey</h2>
                <p className="text-[10px] uppercase tracking-[0.6em] text-amber-100/60">Exclusive Table • Paris 8ème</p>
              </div>
            </div>
            <div className="p-12 text-center max-w-xl mx-auto">
              <p className="text-zinc-400 leading-loose italic text-sm">
                "Gastronomy is the art of using food to create happiness." — Explore our seasonal tasting menu crafted by Chef Aliénor.
              </p>
            </div>
          </motion.div>
        )}

        {step === 'reserve' && (
          <motion.div 
            key="reserve" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ opacity: 0 }}
            className="p-12 max-w-md mx-auto"
          >
            <div className="bg-zinc-900/50 border border-white/10 p-10 backdrop-blur-xl rounded-sm">
              <h3 className="text-xl font-serif italic mb-8 text-center text-amber-200">Reservation Request</h3>
              <div className="space-y-6">
                <div>
                  <label className="text-[8px] uppercase tracking-widest text-zinc-500 block mb-2">Guest Email</label>
                  <input 
                    type="email" value={email} onChange={(e) => setEmail(e.target.value)}
                    placeholder="guest@exclusive.com"
                    className="w-full bg-white/5 border border-white/10 p-3 text-xs focus:border-amber-200 outline-none transition-colors text-white"
                  />
                </div>
                <button 
                  onClick={() => email.includes('@') && setStep('success')}
                  className="w-full py-4 bg-amber-200 text-black text-[10px] font-bold uppercase tracking-widest hover:bg-white transition-all active:scale-95"
                >
                  Confirm Inquiry
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {step === 'success' && (
          <motion.div 
            key="success" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="h-[400px] flex flex-col items-center justify-center text-center p-8"
          >
            <div className="w-16 h-16 border border-amber-200 rounded-full flex items-center justify-center mb-6 text-amber-200 text-2xl">✓</div>
            <h3 className="text-2xl font-serif italic mb-2 text-amber-200">Merci, Guest.</h3>
            <p className="text-zinc-500 text-xs tracking-wide">Our concierge will contact you shortly.</p>
            <button onClick={() => setStep('home')} className="mt-8 text-[9px] uppercase tracking-widest text-zinc-400 hover:text-white underline underline-offset-8">Return</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- 2. IRON & STEEL (MODERN BRUTALIST) ---
const BarberLayout = () => {
  const [view, setView] = useState('services'); // 'services' | 'login'
  const [form, setForm] = useState({ user: '', pass: '' });
  const [isLogged, setIsLogged] = useState(false);

  return (
    <div className="h-full bg-[#0a0a0a] text-white font-sans flex flex-col selection:bg-red-600/30">
      <header className="p-8 border-b border-white/5 flex justify-between items-center bg-[#0d0d0d]">
        <h3 className="text-3xl font-black italic tracking-tighter text-red-600">I&S</h3>
        <button 
          onClick={() => !isLogged && setView(view === 'login' ? 'services' : 'login')}
          className="px-6 py-2 border border-white/10 text-[9px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-all"
        >
          {isLogged ? 'Member Area' : view === 'login' ? 'Close' : 'Client Login'}
        </button>
      </header>

      <div className="flex-1 flex overflow-hidden">
        <div className="w-16 border-r border-white/5 flex flex-col items-center py-10 gap-12 text-[8px] font-bold uppercase vertical-text opacity-30">
          <span>London</span><span>Porto</span><span>Berlin</span>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar p-10">
          <AnimatePresence mode="wait">
            {view === 'services' ? (
              <motion.div key="list" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}>
                <div className="mb-10">
                  <h4 className="text-5xl font-black italic tracking-tight mb-2 uppercase">The Standards.</h4>
                  <p className="text-zinc-500 text-xs">No shortcuts. Only sharp lines and cold steel.</p>
                </div>
                <div className="grid grid-cols-1 gap-3">
                  {[
                    { n: 'Engine Cut', d: 'Signature precision haircut', p: '35€' },
                    { n: 'Blade Shave', d: 'Hot towel & straight razor', p: '25€' },
                    { n: 'The Overhaul', d: 'Full hair and beard treatment', p: '55€' }
                  ].map((s, i) => (
                    <div key={i} className="group p-6 bg-white/5 border border-white/5 hover:border-red-600/50 transition-all flex justify-between items-center cursor-pointer">
                      <div>
                        <h5 className="font-black text-sm uppercase mb-1">{s.n}</h5>
                        <p className="text-[10px] text-zinc-500 italic">{s.d}</p>
                      </div>
                      <span className="font-mono text-lg font-bold group-hover:text-red-600 transition-colors">{s.p}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ) : (
              <motion.div key="login" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="max-w-xs mx-auto pt-10">
                <div className="space-y-6">
                  <h4 className="text-2xl font-black italic uppercase text-center mb-10 tracking-widest">Access Portal</h4>
                  <div className="space-y-4">
                    <input 
                      type="text" placeholder="USERNAME" 
                      onChange={(e) => setForm({...form, user: e.target.value})}
                      className="w-full bg-black border-b border-white/20 p-3 text-[10px] focus:border-red-600 outline-none transition-colors uppercase tracking-widest text-white" 
                    />
                    <input 
                      type="password" placeholder="PASSWORD" 
                      onChange={(e) => setForm({...form, pass: e.target.value})}
                      className="w-full bg-black border-b border-white/20 p-3 text-[10px] focus:border-red-600 outline-none transition-colors text-white" 
                    />
                  </div>
                  <button 
                    onClick={() => { if(form.user && form.pass) { setIsLogged(true); setView('services'); } }}
                    className="w-full py-4 bg-red-600 text-white text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white hover:text-black transition-all active:scale-95"
                  >
                    Authenticate
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {isLogged && (
        <div className="bg-red-600 text-white text-[9px] font-black py-2 px-8 uppercase tracking-[0.5em] flex justify-between animate-pulse">
          <span>Verified Member: {form.user}</span>
          <span>Access Granted</span>
        </div>
      )}
    </div>
  );
};

// --- MAIN PORTFOLIO PAGE ---
export default function PortfolioPage() {
  const [activeProject, setActiveProject] = useState<any>(null);

  useEffect(() => {
    if (activeProject) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '15px';
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
    <main className="min-h-screen bg-[#0B0F19] px-6 pb-24 pt-32 text-white">
      <div className="max-w-5xl mx-auto">
        <header className="mb-32">
          <section className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">
                Portfolio
              </p>
              <h1 className="mb-8 text-4xl font-bold tracking-tight sm:text-5xl">
                Interactive layouts showcase . <br /> 
                
              </h1>
              <p className="text-lg leading-relaxed text-zinc-400 max-w-xl">
                We bridge the gap between bold aesthetics and engineering precision. 
                Explore our interactive gallery of high-performance interfaces.
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
                  <h3 className="text-3xl font-bold tracking-tight">{p.title}</h3>
                </div>
                <div className="hidden md:flex gap-3">
                  {p.tech.map(t => <span key={t} className="text-[9px] font-mono text-cyan-400 border border-cyan-400/20 px-3 py-1 rounded-full uppercase tracking-widest">{t}</span>)}
                </div>
              </div>

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

      <AnimatePresence>
        {activeProject && (
          <>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setActiveProject(null)}
              className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-[100] cursor-crosshair"
            />
            <motion.div 
              initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full max-w-2xl bg-zinc-950 z-[101] border-l border-white/10 flex flex-col"
            >
              <div className="flex-1 overflow-y-auto p-12 md:p-24 custom-scrollbar">
                <button onClick={() => setActiveProject(null)} className="text-cyan-400 font-mono text-xs mb-16 uppercase tracking-[0.4em] hover:translate-x-2 transition-transform">
                  ← Back to Selection
                </button>
                <h2 className="text-6xl font-black italic mb-8 leading-none uppercase">{activeProject.title}</h2>
                <p className="text-zinc-500 text-xl font-light leading-relaxed mb-12">{activeProject.description}</p>
                <div className="space-y-12">
                   <div className="p-10 rounded-[2rem] bg-zinc-900/50 border border-white/5">
                      <h4 className="text-xs font-bold uppercase tracking-widest mb-6 text-cyan-400">Technical Stack</h4>
                      <div className="flex flex-wrap gap-4 font-mono text-[10px]">
                        {activeProject.tech.map((t: string) => <span key={t} className="bg-black px-4 py-2 rounded-lg border border-white/5 tracking-wider">{t}</span>)}
                      </div>
                   </div>
                   <a href="/contact" className="block w-full py-6 bg-cyan-400 text-black text-center font-black rounded-2xl uppercase text-[10px] tracking-[0.2em] shadow-2xl shadow-cyan-400/20 hover:scale-[1.02] transition-transform">
                      Request a quote for a similar site
                   </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 5px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #22d3ee; }
        .vertical-text { writing-mode: vertical-rl; transform: rotate(180deg); }
      `}</style>
    </main>
  );
}