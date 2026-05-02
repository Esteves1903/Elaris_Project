"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// --- COMPONENTES DE APOIO INTERNO ---

const NavInternal = ({ active, set, items, color }: any) => (
  <div className="flex gap-3 mb-6 border-b border-white/5 pb-2">
    {items.map((item: string) => (
      <button 
        key={item}
        onClick={(e) => { e.stopPropagation(); set(item); }}
        className={`text-[9px] uppercase tracking-widest transition-colors ${active === item ? color : 'text-zinc-500'}`}
      >
        {item}
      </button>
    ))}
  </div>
);

// --- 1. RESTAURANTE (L'ESSENCE) ---
const RestaurantLayout = () => {
  const [tab, setTab] = useState('Home');
  return (
    <div className="h-full bg-[#0D0D0D] p-6 font-serif overflow-y-auto custom-scrollbar">
      <NavInternal active={tab} set={setTab} items={['Home', 'About', 'Menu']} color="text-amber-200" />
      <AnimatePresence mode="wait">
        {tab === 'Home' && (
          <motion.div key="h" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <h3 className="text-2xl text-white mb-2">L'Essence</h3>
            <p className="text-[10px] text-zinc-400 leading-relaxed mb-4">Experience the art of fine dining in the heart of the city.</p>
            <div className="h-24 bg-zinc-900 rounded-lg border border-white/5" />
          </motion.div>
        )}
        {tab === 'About' && (
          <motion.div key="a" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h4 className="text-amber-200 text-xs mb-2 italic">Our Story</h4>
            <p className="text-[10px] text-zinc-300 leading-relaxed">Founded in 2026, we believe that food is a bridge between cultures. Our chef Curates every dish with passion.</p>
          </motion.div>
        )}
        {tab === 'Menu' && (
          <motion.div key="m" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-2">
            <div className="flex justify-between text-[10px] text-white"><span>Truffle Risotto</span><span>€32</span></div>
            <div className="flex justify-between text-[10px] text-white"><span>Wagyu Steak</span><span>€45</span></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- 2. BARBEARIA (IRON & STEEL) ---
const BarberLayout = () => {
  const [tab, setTab] = useState('Home');
  return (
    <div className="h-full bg-[#141414] p-6 font-sans border-l-4 border-red-600 overflow-y-auto">
      <NavInternal active={tab} set={setTab} items={['Home', 'About', 'Book']} color="text-red-500" />
      <AnimatePresence mode="wait">
        {tab === 'Home' && (
          <motion.div key="h" initial={{ x: 10, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
            <h3 className="text-xl font-black italic text-white mb-4 tracking-tighter text-red-500">IRON & STEEL</h3>
            <div className="bg-zinc-900 p-3 rounded border border-white/5 text-[10px] text-zinc-400">Next available slot: Today, 17:30</div>
          </motion.div>
        )}
        {tab === 'About' && (
          <motion.div key="a" initial={{ x: 10, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
            <p className="text-[10px] text-zinc-300 leading-relaxed uppercase font-bold tracking-tight">Classic techniques. Modern style. No bullshit. Just great hair.</p>
          </motion.div>
        )}
        {tab === 'Book' && (
          <motion.button whileTap={{ scale: 0.95 }} className="w-full bg-red-600 py-3 text-[10px] font-black uppercase mt-4">Confirm Booking</motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- 3. WELLNESS (ZEN SPACE) ---
const WellnessLayout = () => {
  const [tab, setTab] = useState('Home');
  return (
    <div className="h-full bg-[#FBF8F5] p-6 text-[#4A4A4A] overflow-y-auto">
      <NavInternal active={tab} set={setTab} items={['Home', 'About', 'Services']} color="text-teal-600" />
      <AnimatePresence mode="wait">
        {tab === 'Home' && (
          <motion.div key="h" initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center">
            <div className="text-2xl mb-2 text-teal-600">🌿</div>
            <h3 className="text-sm font-light tracking-widest mb-4">ZEN SPACE</h3>
            <p className="text-[9px] opacity-70">Find your inner balance.</p>
          </motion.div>
        )}
        {tab === 'About' && (
          <motion.div key="a" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[10px] leading-loose text-center italic">
            "A sanctuary designed to reconnect your body and mind."
          </motion.div>
        )}
        {tab === 'Services' && (
          <motion.div key="s" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 gap-2">
            <div className="bg-white p-2 rounded text-[9px] border border-teal-100">Deep Tissue Massage</div>
            <div className="bg-white p-2 rounded text-[9px] border border-teal-100">Acupuncture</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- 4. CAFÉ (BREW & CO) ---
const CoffeeLayout = () => {
  const [tab, setTab] = useState('Home');
  return (
    <div className="h-full bg-[#EADBC8] p-6 text-[#3E2723] overflow-y-auto">
      <NavInternal active={tab} set={setTab} items={['Home', 'Story', 'Order']} color="text-[#3E2723] font-bold" />
      <AnimatePresence mode="wait">
        {tab === 'Home' && (
          <motion.div key="h" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center gap-2 mb-4">
               <span className="text-xl">☕</span>
               <h3 className="font-black text-sm tracking-tighter">BREW & CO.</h3>
            </div>
            <div className="h-20 bg-[#3E2723]/5 rounded-2xl border-2 border-dashed border-[#3E2723]/10 flex items-center justify-center text-[10px] opacity-40 italic">Photo Placeholder</div>
          </motion.div>
        )}
        {tab === 'Story' && (
          <motion.div key="a" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <p className="text-[10px] font-medium leading-relaxed italic">"From bean to cup, we ensure every sip tells a story of quality and community."</p>
          </motion.div>
        )}
        {tab === 'Order' && (
          <motion.div key="o" initial={{ y: 20 }} animate={{ y: 0 }} className="space-y-3">
             <div className="bg-white p-2 rounded-lg text-[10px] flex justify-between font-bold"><span>Cappuccino</span><span>€3.50</span></div>
             <button className="w-full bg-[#3E2723] text-white py-2 rounded-lg text-[10px]">Add to cart</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- PÁGINA PRINCIPAL ---

export default function PortfolioPage() {
  const projects = [
    { id: 1, title: "L'Essence Restaurant", category: "High-End Gastronomy", layout: <RestaurantLayout />, tech: ["Framer", "Serif UI"] },
    { id: 2, title: "Iron & Steel Barber", category: "Local Business", layout: <BarberLayout />, tech: ["Industrial UI", "React"] },
    { id: 3, title: "Zen Space Studio", category: "Wellness App", layout: <WellnessLayout />, tech: ["Minimalism", "UX"] },
    { id: 4, title: "Brew & Co.", category: "Modern Retail", layout: <CoffeeLayout />, tech: ["Next.js", "Interaction"] },
  ];

  return (
    <main className="min-h-screen bg-[#0B0F19] text-white pt-32 pb-24 px-6 font-sans">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-24">
          <p className="text-cyan-400 font-mono text-sm tracking-[0.3em] uppercase mb-4">// Interactive Showcase</p>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 italic">Portfolio.</h1>
          <p className="text-zinc-400 text-lg max-w-xl">
            Each project below is a fully functional mini-interface. Click the navigation inside the mockups to explore.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {projects.map((p) => (
            <motion.div 
              key={p.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="group"
            >
              {/* Browser Window Mockup */}
              <div className="relative rounded-2xl bg-zinc-900 border border-white/10 overflow-hidden shadow-2xl transition-all group-hover:border-cyan-400/30">
                <div className="flex items-center justify-between px-4 py-3 bg-zinc-800/50 border-b border-white/5">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                    <div className="w-2.5 h-2.5 rounded-full bg-zinc-700" />
                  </div>
                  <div className="text-[9px] text-zinc-500 font-mono tracking-widest uppercase">Elaris Preview System</div>
                </div>
                
                <div className="aspect-[4/3] w-full">
                  {p.layout}
                </div>
              </div>

              {/* Info Below Mockup */}
              <div className="mt-8">
                <div className="flex justify-between items-end mb-4">
                  <div>
                    <h3 className="text-2xl font-bold">{p.title}</h3>
                    <p className="text-zinc-500 text-sm">{p.category}</p>
                  </div>
                  <div className="flex gap-2">
                    {p.tech.map(t => (
                      <span key={t} className="text-[10px] font-mono text-cyan-400 bg-cyan-400/5 px-2 py-1 rounded border border-cyan-400/10">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <a 
                  href="/contact" 
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-white group-hover:text-cyan-400 transition-colors"
                >
                  Start a project like this <span>→</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}