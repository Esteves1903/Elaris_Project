"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MapPin, Clock, Users, Star, Calendar, Phone, Menu, X } from 'lucide-react';

// --- 1. BREWHAUS COFFEE & RESTAURANT ---
const BrewhausCafeLayout = () => {
  const [step, setStep] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const menuItems = [
    { category: 'Specialty Coffees', items: [
      { name: 'Espresso', price: '€3.50', desc: 'Classic Italian espresso' },
      { name: 'Cappuccino', price: '€4.50', desc: 'Smooth milk foam blend' },
      { name: 'Cold Brew', price: '€5.00', desc: 'Bold and smooth' },
    ]},
    { category: 'Pastries', items: [
      { name: 'Croissant', price: '€3.20', desc: 'Buttery and flaky' },
      { name: 'Almond Tart', price: '€4.00', desc: 'Premium almond filling' },
      { name: 'Soufflé Pancake', price: '€6.50', desc: 'Light and fluffy' },
    ]}
  ];

  return (
    <div className="h-full bg-gradient-to-b from-amber-50 to-white text-zinc-900 font-sans overflow-y-auto custom-scrollbar">
      <nav className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-amber-100 px-4 md:px-8 py-4 flex justify-between items-center shadow-sm">
        <div className="font-serif text-xl md:text-2xl font-bold text-amber-900">Brewhaus</div>
        <div className="hidden md:flex gap-6 text-sm font-medium">
          <button onClick={() => setStep('home')} className={`transition ${step === 'home' ? 'text-amber-900 border-b-2 border-amber-900' : 'text-zinc-600 hover:text-amber-900'}`}>Home</button>
          <button onClick={() => setStep('menu')} className={`transition ${step === 'menu' ? 'text-amber-900 border-b-2 border-amber-900' : 'text-zinc-600 hover:text-amber-900'}`}>Menu</button>
          <button onClick={() => setStep('reserve')} className="bg-amber-900 text-white px-6 py-2 rounded-full hover:bg-amber-800 transition text-xs">Reserve</button>
        </div>
        <button className="md:hidden text-amber-900" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute top-14 left-0 w-full bg-white z-20 border-b border-amber-100 p-4 flex flex-col gap-3 md:hidden shadow-xl text-sm">
             <button onClick={() => {setStep('home'); setIsMobileMenuOpen(false)}} className="text-left py-2 font-medium">Home</button>
             <button onClick={() => {setStep('menu'); setIsMobileMenuOpen(false)}} className="text-left py-2 font-medium">Menu</button>
             <button onClick={() => {setStep('reserve'); setIsMobileMenuOpen(false)}} className="bg-amber-900 text-white p-3 rounded-full font-bold text-center">Reserve Table</button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {step === 'home' && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="relative h-64 md:h-96 overflow-hidden bg-amber-100">
              <img src="/fundocafe.jfif" alt="Cafe" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center p-4">
                <div className="text-center text-white">
                  <h1 className="text-3xl md:text-5xl font-serif font-bold mb-2 md:mb-4">Welcome to Brewhaus</h1>
                  <p className="text-sm md:text-lg">Specialty Coffee & Fine Dining</p>
                </div>
              </div>
            </div>
            <div className="max-w-4xl mx-auto px-4 md:px-8 py-8 md:py-16">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <div className="text-center p-6 bg-amber-50 rounded-lg">
                  <Clock className="w-6 h-6 mx-auto mb-3 text-amber-900" />
                  <h3 className="font-semibold text-sm mb-1">Hours</h3>
                  <p className="text-xs text-zinc-600">Mon-Fri: 7am-10pm</p>
                </div>
                <div className="text-center p-6 bg-amber-50 rounded-lg">
                  <MapPin className="w-6 h-6 mx-auto mb-3 text-amber-900" />
                  <h3 className="font-semibold text-sm mb-1">Location</h3>
                  <p className="text-xs text-zinc-600">123 Coffee Street, Porto</p>
                </div>
                <div className="text-center p-6 bg-amber-50 rounded-lg">
                  <Phone className="w-6 h-6 mx-auto mb-3 text-amber-900" />
                  <h3 className="font-semibold text-sm mb-1">Contact</h3>
                  <p className="text-xs text-zinc-600">+351 22 1234 5678</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {step === 'menu' && (
          <motion.div key="menu" className="px-4 md:px-8 py-8 md:py-16 max-w-2xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-serif font-bold mb-8 text-amber-900">Our Menu</h2>
            {menuItems.map((section, idx) => (
              <div key={idx} className="mb-8">
                <h3 className="text-lg font-semibold mb-4 pb-2 border-b-2 border-amber-200 text-amber-900">{section.category}</h3>
                <div className="space-y-4">
                  {section.items.map((item, i) => (
                    <div key={i} className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm text-zinc-900">{item.name}</h4>
                        <p className="text-xs text-zinc-500">{item.desc}</p>
                      </div>
                      <span className="font-bold text-amber-900 text-sm">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {step === 'reserve' && (
          <motion.div key="reserve" className="px-4 py-8 md:py-16 max-w-md mx-auto">
            <div className="bg-white border-2 border-amber-200 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-serif font-bold mb-6 text-center text-amber-900">Book a Table</h3>
              <div className="space-y-4">
                <input type="text" placeholder="Name" className="w-full border border-amber-200 p-3 rounded-lg text-sm outline-none focus:border-amber-900" />
                <input type="date" className="w-full border border-amber-200 p-3 rounded-lg text-sm outline-none focus:border-amber-900" />
                <button onClick={() => setStep('home')} className="w-full py-3 bg-amber-900 text-white font-semibold rounded-lg text-sm">Confirm</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- 2. PRIME CUTS BARBER SHOP ---
const PrimeCutsBarberLayout = () => {
  const [view, setView] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const services = [
    { name: 'Haircut', price: '€35', duration: '45 min', desc: 'Professional cut with precision' },
    { name: 'Beard Trim', price: '€20', duration: '20 min', desc: 'Shaping and detail work' },
    { name: 'Hot Shave', price: '€30', duration: '30 min', desc: 'Straight razor shave' },
    { name: 'Full Treatment', price: '€60', duration: '90 min', desc: 'Haircut + Beard + Massage' },
  ];

  const barbers = [
    { name: 'Marco', specialty: 'Classic Cuts', rating: 4.9, img:'/Barbeiro1.jfif'},
    { name: 'David', specialty: 'Fades & Designs', rating: 4.8, img: '/barbeiro2.jfif' },
    { name: 'João', specialty: 'Beard Specialist', rating: 4.9, img: '/barbeiro3.jfif' },
  ];

  return (
    <div className="h-full bg-slate-950 text-white font-sans overflow-y-auto custom-scrollbar">
      <header className="sticky top-0 z-30 bg-black/90 backdrop-blur-md border-b border-red-900/50 px-4 md:px-8 py-4 flex justify-between items-center">
        <h1 className="text-xl md:text-2xl font-black text-red-600 italic tracking-tighter">PRIME CUTS</h1>
        <nav className="hidden md:flex gap-8 text-[10px] font-bold uppercase tracking-widest">
          <button onClick={() => setView('home')} className={`transition ${view === 'home' ? 'text-red-600' : 'text-zinc-400'}`}>Home</button>
          <button onClick={() => setView('services')} className={`transition ${view === 'services' ? 'text-red-600' : 'text-zinc-400'}`}>Services</button>
          <button onClick={() => setView('book')} className="bg-red-600 text-white px-4 py-2 rounded">Book</button>
        </nav>
        <button className="md:hidden text-red-600" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="absolute inset-0 bg-black z-50 p-8 flex flex-col gap-6 text-center justify-center">
            <button className="absolute top-6 right-6" onClick={() => setIsMobileMenuOpen(false)}><X size={28}/></button>
            <button onClick={() => {setView('home'); setIsMobileMenuOpen(false)}} className="text-2xl font-black italic">HOME</button>
            <button onClick={() => {setView('services'); setIsMobileMenuOpen(false)}} className="text-2xl font-black italic">SERVICES</button>
            <button onClick={() => {setView('book'); setIsMobileMenuOpen(false)}} className="bg-red-600 py-4 text-lg font-black italic">BOOK NOW</button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {view === 'home' && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="relative h-80 md:h-[450px] overflow-hidden bg-zinc-900">
              <img src="/fundobarber.avif" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center px-4">
                  <h1 className="text-4xl md:text-7xl font-black mb-2 italic tracking-tighter">SHARP LINES</h1>
                  <p className="text-red-600 font-bold tracking-[0.3em] text-[10px] md:text-xs">ESTABLISHED 2020 • PORTO</p>
                </div>
              </div>
            </div>
            
            <div className="max-w-4xl mx-auto px-4 md:px-8 py-12 pb-24">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                <div className="border-l-4 border-red-600 pl-4">
                  <h3 className="text-red-600 font-black text-[10px] uppercase mb-1">Location</h3>
                  <p className="text-zinc-400 text-xs">Rua dos Barbeiros 42, Porto</p>
                </div>
                <div className="border-l-4 border-red-600 pl-4">
                  <h3 className="text-red-600 font-black text-[10px] uppercase mb-1">Contact</h3>
                  <p className="text-zinc-400 text-xs">+351 22 567 890</p>
                </div>
              </div>

              <h2 className="text-xl font-black italic mb-8 border-b border-zinc-800 pb-2">THE TEAM</h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                {barbers.map((b, i) => (
                  <div key={i} className="group relative overflow-hidden rounded-lg bg-zinc-900 border border-zinc-800">
                    <img src={b.img} className="w-full h-72 object-cover group-hover:scale-110 transition duration-500 opacity-80" alt={b.name} />
                    <div className="absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-black to-transparent">
                      <h4 className="font-black italic text-sm">{b.name}</h4>
                      <p className="text-[10px] text-red-500 font-bold uppercase">{b.specialty}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {view === 'services' && (
          <motion.div key="services" className="max-w-2xl mx-auto px-4 py-12">
            <h2 className="text-2xl font-black italic mb-8 text-red-600">SERVICES</h2>
            <div className="space-y-4">
              {services.map((s, i) => (
                <div key={i} className="p-5 bg-zinc-900/50 border border-zinc-800 rounded flex justify-between items-center group hover:border-red-600 transition">
                  <div className="pr-4">
                    <h4 className="font-black text-sm md:text-base group-hover:text-red-500 transition uppercase tracking-wider">{s.name}</h4>
                    <p className="text-[10px] text-zinc-500 italic">{s.desc}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-lg font-black text-red-600">{s.price}</div>
                    <div className="text-[8px] text-zinc-600 uppercase font-bold">{s.duration}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {view === 'book' && (
          <motion.div key="book" className="max-w-md mx-auto px-4 py-12">
            <div className="bg-zinc-900 p-6 md:p-8 border-t-4 border-red-600">
              <h3 className="text-xl font-black italic mb-8 text-center uppercase tracking-widest">BOOK NOW</h3>
              <div className="space-y-4">
                <input type="text" placeholder="NAME" className="w-full bg-black border border-zinc-800 p-4 text-[10px] font-bold outline-none focus:border-red-600" />
                <button onClick={() => setView('success')} className="w-full py-4 bg-red-600 font-black italic text-sm">CONFIRM</button>
              </div>
            </div>
          </motion.div>
        )}

        {view === 'success' && (
          <motion.div key="success" className="h-96 flex flex-col items-center justify-center text-center px-4">
            <h3 className="text-3xl font-black italic mb-2">YOU'RE SET!</h3>
            <button onClick={() => setView('home')} className="mt-8 px-10 py-3 border-2 border-white font-black italic text-xs">BACK</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- MAIN PORTFOLIO PAGE ---
export default function Portfolio() {
  const [activeProject, setActiveProject] = useState<any>(null);

  const projects = [
    {
      id: 1,
      title: "Brewhaus Coffee",
      url: "brewhaus-cafe.com",
      layout: <BrewhausCafeLayout />,
      tech: ["Next.js", "Framer Motion"],
      description: "Elegant hospitality platform with real-time booking and menu management.",
      features: ["Online Menu", "Table Booking", "Responsive UI"]
    },
    {
      id: 2,
      title: "Prime Cuts Barber",
      url: "primecuts-barber.com",
      layout: <PrimeCutsBarberLayout />,
      tech: ["React", "TypeScript"],
      description: "High-contrast service layout for modern barbershops with team showcases.",
      features: ["Appointment UI", "Team Profiles", "Service Gallery"]
    }
  ];

  return (
    <main className="min-h-screen bg-[#06080e] text-white">
      <section className="px-6 pt-24 pb-12 md:pt-32 md:pb-24 max-w-6xl mx-auto">
        <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">
            Portfolio
          </p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-8">
            Interactive layouts previews.
          </h1>
      </section>

      <section className="px-4 md:px-6 space-y-32 pb-32 max-w-6xl mx-auto">
        {projects.map((p) => (
          <div key={p.id} className="relative">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
              <div className="flex items-center gap-4">
                <span className="text-3xl md:text-5xl font-black text-zinc-900">0{p.id}</span>
                <h3 className="text-2xl md:text-3xl font-bold tracking-tight">{p.title}</h3>
              </div>
            </div>

            <div className="rounded-xl md:rounded-[2.5rem] overflow-hidden border border-white/10 bg-zinc-900 shadow-2xl">
              <div className="bg-zinc-800/50 px-4 md:px-8 py-3 md:py-4 flex items-center justify-between border-b border-white/5">
                <div className="flex gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500/30" />
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/30" />
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500/30" />
                </div>
                <div className="text-[8px] font-mono text-zinc-500 tracking-[0.2em] uppercase">{p.url}</div>
                <div className="w-8 md:w-16 h-1 bg-zinc-700/50 rounded-full" />
              </div>
              <div className="h-[500px] md:h-[600px] relative">
                {p.layout}
              </div>
            </div>

            <div className="mt-8 flex flex-col md:flex-row gap-6 justify-between items-start">
               <p className="text-zinc-500 text-sm max-w-lg leading-relaxed">{p.description}</p>
               <button onClick={() => setActiveProject(p)} className="text-[10px] font-black uppercase tracking-widest bg-white text-black px-10 py-4 rounded-full hover:bg-cyan-400 transition whitespace-nowrap">Explore Specs</button>
            </div>
          </div>
        ))}
      </section>

      <AnimatePresence>
        {activeProject && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setActiveProject(null)} className="fixed inset-0 bg-black/95 z-50 backdrop-blur-xl" />
            <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} className="fixed inset-y-0 right-0 w-full max-w-xl bg-zinc-950 z-[60] p-8 md:p-16 overflow-y-auto border-l border-white/10">
              <button onClick={() => setActiveProject(null)} className="text-cyan-400 font-mono text-[10px] mb-12 tracking-[0.3em]">← CLOSE</button>
              <h2 className="text-4xl md:text-5xl font-black italic mb-6 leading-none uppercase">{activeProject.title}</h2>
              <div className="space-y-12">
                <div>
                  <h4 className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest mb-6">Key Features</h4>
                  <ul className="grid grid-cols-1 gap-3">
                    {activeProject.features.map((f:any) => <li key={f} className="text-zinc-400 text-sm border-l border-zinc-800 pl-4">{f}</li>)}
                  </ul>
                </div>
                <button className="w-full py-5 bg-white text-black font-black uppercase tracking-widest rounded-xl text-[10px]">Start your project</button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
      `}</style>
    </main>
  );
}