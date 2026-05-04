"use client";

import React, { useState, useEffect } from "react";
import {
  Menu, X, Search, ShoppingBag, Heart, Code2, Cpu, Layers, 
  User, Scissors, ArrowLeft, CheckCircle2, Coffee, 
  ShoppingBasket, Calendar, Star, UtensilsCrossed, Trophy,
  Phone, Mail, Users, ChevronRight, Award, Lock, Clock, ShieldCheck
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { History as HistoryIcon } from "lucide-react";

// --- DADOS DA SIDEBAR TÉCNICA (Traduzido para Inglês) ---
type ProjectDetails = {
  title: string;
  stack: string[];
  description: string;
  logic: string[];
};

const technicalDetails: Record<string, ProjectDetails> = {
  cafe: {
    title: "Elaris Restaurant",
    stack: ["React State", "Framer Motion", "Tailwind CSS"],
    description: "Restaurant application with table booking and digital menu visualization.",
    logic: ["Booking state management", "Menu category navigation", "Customer bill simulation"],
  },
  sport: {
    title: "Elaris Football Store",
    stack: ["Dynamic Filtering", "Cart Logic", "Lucide Icons"],
    description: "Football e-commerce featuring a simplified checkout flow.",
    logic: ["Global cart counter", "Real-time search filtering", "Dynamic product pages"],
  },
  asgard: {
    title: "Elaris Barber Shop",
    stack: ["Dark UI Design", "Step-by-step Booking", "Animations"],
    description: "Premium barber shop interface with Viking theme and quick scheduling.",
    logic: ["Intuitive booking workflow", "Visual success feedback", "Mock auth system"],
  },
};

export default function() {
  const [sidebarData, setSidebarData] = useState<ProjectDetails | null>(null);

  return (
    <main className="min-h-screen bg-[#0B0F19] px-6 pb-24 pt-32 text-white font-sans">
      {/* Hero Section */}
      <section className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">
            Portfolio
          </p>
          <h1 className="mb-8 text-4xl font-bold tracking-tight sm:text-5xl">
            Interactive Layouts Previews.
          </h1>
        </div>
      </section>

      {/* SIDEBAR TÉCNICA (Traduzida) */}
      <AnimatePresence>
        {sidebarData && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSidebarData(null)} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]" />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} className="fixed right-0 top-0 h-full w-full max-w-md bg-[#0d1117] border-l border-white/10 z-[101] p-8 overflow-y-auto">
              <button onClick={() => setSidebarData(null)} className="mb-8 p-2 hover:bg-white/10 rounded-full transition"><X size={24} /></button>
              <div className="space-y-8">
                <div>
                  <h3 className="text-cyan-400 text-xs font-black uppercase tracking-widest mb-2 flex items-center gap-2"><Code2 size={14} /> Dev Case</h3>
                  <h2 className="text-4xl font-black">{sidebarData.title}</h2>
                  <p className="text-zinc-400 mt-4 leading-relaxed">{sidebarData.description}</p>
                </div>
                <div className="space-y-4">
                  <h4 className="font-bold flex items-center gap-2 text-sm uppercase tracking-wider text-zinc-300"><Cpu size={18}/> Stack</h4>
                  <div className="flex flex-wrap gap-2">{sidebarData.stack.map(s => <span key={s} className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded text-xs text-cyan-400">{s}</span>)}</div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-bold flex items-center gap-2 text-sm uppercase tracking-wider text-zinc-300"><Layers size={18}/> Technical Logic</h4>
                  <ul className="space-y-3">{sidebarData.logic.map(l => <li key={l} className="text-sm text-zinc-400 flex items-start gap-3"><div className="mt-1.5 w-1.5 h-1.5 bg-cyan-400 rounded-full shrink-0" /> {l}</li>)}</ul>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <section className="max-w-6xl mx-auto py-24 space-y-48">
        
        {/* 1. RESTAURANTE */}
        <div className="space-y-6">
          <h2 className="text-3xl font-black tracking-tight">1. Elaris Restaurant</h2>
          <div className="rounded-[2.5rem] overflow-hidden border border-white/10 h-[700px] relative bg-orange-50 shadow-2xl">
            <CafeCafeApp />
          </div>
          <div className="flex justify-end">
            <button onClick={() => setSidebarData(technicalDetails.cafe)} className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-bold hover:bg-cyan-400 hover:text-black transition-all flex items-center gap-2 text-xs tracking-widest uppercase">
              View Case Details <Code2 size={18} />
            </button>
          </div>
        </div>

        {/* 2. SPORT STORE */}
        <div className="space-y-6">
          <h2 className="text-3xl font-black tracking-tight">2. Elaris Football Store</h2>
          <div className="rounded-[2.5rem] overflow-hidden border border-white/10 h-[700px] relative bg-white shadow-2xl">
            <SportZoneApp />
          </div>
          <div className="flex justify-end">
            <button onClick={() => setSidebarData(technicalDetails.sport)} className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-bold hover:bg-blue-600 transition-all flex items-center gap-2 text-xs tracking-widest uppercase">
              View Case Details <Code2 size={18} />
            </button>
          </div>
        </div>

        {/* 3. BARBER SHOP */}
        <div className="space-y-6">
          <h2 className="text-3xl font-black tracking-tight">3. Elaris Barber Shop</h2>
          <div className="rounded-[2.5rem] overflow-hidden border border-white/10 h-[700px] relative bg-[#0a0a0a] shadow-2xl">
            <AsgardBarberApp />
          </div>
          <div className="flex justify-end">
            <button onClick={() => setSidebarData(technicalDetails.asgard)} className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-bold hover:bg-red-600 transition-all flex items-center gap-2 text-xs tracking-widest uppercase">
              View Case Details <Code2 size={18} />
            </button>
          </div>
        </div>

      </section>
    </main>
  );
}

function CafeCafeApp() {
  const [view, setView] = useState<'home' | 'menu' | 'story' | 'booking' | 'success'>('home');
  const [showPrivacy, setShowPrivacy] = useState(false);
  
  // Estado do Formulário
  const [bookingDetails, setBookingDetails] = useState({ 
    name: "", 
    phone: "", 
    guests: 2, 
    date: "", 
    time: "20:00" 
  });

  // --- Slideshow de Imagens (Fundo) ---
  const images = [
    "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2000",
    "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2000",
    "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2000",
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?q=80&w=2000"
  ];
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % images.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const menuCategorias = [
    { 
      cat: "Assinatura Elaris", 
      items: [
        { name: "Francesinha Elaris", price: "18.50€", desc: "Bife de lombo maturado, enchidos artesanais, molho secreto Elaris macerado por 48h." },
        { name: "Cachorro em Brioche de Ouro", price: "14.00€", desc: "Salsicha fresca, queijo da Serra derretido e cebola caramelizada em vinho do Porto." }
      ]
    },
    { 
      cat: "Herança Regional", 
      items: [
        { name: "Moelas Confitadas", price: "9.50€", desc: "Cozinhadas em baixa temperatura com redução de tomate cereja e ervas aromáticas." },
        { name: "Pica-Pau de Vitela Premium", price: "16.00€", desc: "Cubos de vitela local salteados em manteiga de alho e pickles artesanais." }
      ]
    }
  ];

  return (
    <div className="h-full flex flex-col text-[#2d241e] bg-[#fdfaf5] font-serif overflow-hidden relative">
      
      {/* MODAL DE PRIVACIDADE PROFISSIONAL */}
      <AnimatePresence>
        {showPrivacy && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="absolute inset-0 z-[100] bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
              className="bg-white max-w-lg w-full p-8 shadow-2xl border-t-8 border-[#d4af37] relative"
            >
              <button onClick={() => setShowPrivacy(false)} className="absolute top-4 right-4 text-zinc-400 hover:text-black">
                <X size={24} />
              </button>
              <ShieldCheck className="text-[#d4af37] mb-4" size={40} />
              <h3 className="text-2xl font-black italic mb-4">Política de Confidencialidade</h3>
              <div className="text-sm text-zinc-600 space-y-4 font-sans leading-relaxed">
                <p>No <strong>Elaris Restaurante</strong>, os seus dados são tratados com o mesmo rigor que a nossa cozinha.</p>
                <p>Recolhemos o seu nome e contacto exclusivamente para processar a reserva e enviar a confirmação. Não utilizamos os seus dados para marketing sem consentimento explícito.</p>
              </div>
              <button onClick={() => setShowPrivacy(false)} className="w-full mt-8 py-4 bg-[#1a1512] text-[#d4af37] font-bold uppercase tracking-widest text-xs transition-all hover:bg-zinc-800">Fechar</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Navigation */}
      <nav className="p-6 bg-[#1a1512] text-[#d4af37] flex justify-between items-center sticky top-0 z-30 border-b border-[#d4af37]/20 shadow-2xl">
        <div onClick={() => setView('home')} className="cursor-pointer group flex items-center gap-3">
          <div className="border-2 border-[#d4af37] p-1.5 transition-all group-hover:bg-[#d4af37]">
             <h1 className="font-black text-xl tracking-[0.3em] uppercase group-hover:text-[#1a1512]">E</h1>
          </div>
          <span className="font-light text-sm tracking-[0.4em] uppercase hidden sm:block">Elaris Restaurante</span>
        </div>
        
        <div className="flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em] items-center">
          <button onClick={() => setView('story')} className="hover:text-white transition-colors">História</button>
          <button onClick={() => setView('menu')} className="hover:text-white transition-colors">Carta</button>
          <button onClick={() => setView('booking')} className="px-8 py-2.5 bg-[#d4af37] text-[#1a1512] hover:bg-white transition-all font-black rounded-full">RESERVAR</button>
        </div>
      </nav>

      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          
          {/* VIEW: HOME */}
          {view === 'home' && (
            <motion.div key="h" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col min-h-full">
              <div className="relative h-[75vh] min-h-[500px] bg-zinc-900 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.img 
                    key={currentImg}
                    initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 0.6, scale: 1 }} exit={{ opacity: 0 }}
                    transition={{ duration: 2 }}
                    src={images[currentImg]} 
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                </AnimatePresence>
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-6">
                  <motion.span initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-[#d4af37] text-xs tracking-[1em] uppercase mb-6">Felgueiras • Portugal</motion.span>
                  <motion.h2 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="text-6xl md:text-8xl font-black italic text-center leading-[1.1]">A Arte do <br/> Paladar Honesto</motion.h2>
                  <button onClick={() => setView('booking')} className="mt-12 px-14 py-5 bg-white text-[#1a1512] font-black text-xs tracking-[0.3em] uppercase hover:bg-[#d4af37] transition-all">Garantir Mesa</button>
                </div>
              </div>
              
              <div className="p-24 text-center bg-white">
                <div className="max-w-2xl mx-auto space-y-10">
                  <Award size={40} className="mx-auto text-[#d4af37] opacity-60" />
                  <p className="italic text-4xl text-zinc-800 leading-tight font-serif">"Uma experiência que transcende o prato."</p>
                  <div className="flex justify-center gap-2">
                    {[1,2,3,4,5].map(s => <Star key={s} size={20} className="fill-[#d4af37] text-[#d4af37]" />)}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* VIEW: STORY */}
          {view === 'story' && (
            <motion.div key="story" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-full">
              <div className="h-[50vh] relative overflow-hidden">
                 <img src={images[2]} className="w-full h-full object-cover brightness-50" alt="History Background" />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <h2 className="text-7xl font-black italic text-white tracking-tighter">O Legado Elaris</h2>
                 </div>
              </div>
              <div className="max-w-3xl mx-auto p-20 space-y-12 text-center text-zinc-700 italic text-2xl font-sans leading-relaxed">
                <p>Desde 1984, o <strong>Elaris</strong> é sinónimo de excelência em Felgueiras. Elevamos a gastronomia regional ao patamar da alta cozinha.</p>
                <p>Cada ingrediente é escolhido a dedo, cada molho é apurado durante horas, garantindo que a tradição se mantém viva em cada garfada.</p>
                <button onClick={() => setView('home')} className="mt-10 text-[#d4af37] font-black tracking-widest text-xs uppercase flex items-center gap-3 mx-auto">
                  <ArrowLeft size={18}/> Regressar ao Início
                </button>
              </div>
            </motion.div>
          )}

          {/* VIEW: BOOKING (Com Horas, Datas e Max 12 pessoas) */}
          {view === 'booking' && (
            <motion.div key="b" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="p-12 min-h-full flex flex-col items-center justify-center bg-[#fdfaf5]">
              <div className="bg-white p-14 shadow-2xl w-full max-w-2xl border-t-[12px] border-[#d4af37]">
                <div className="text-center mb-12">
                  <h3 className="text-4xl font-black italic text-[#1a1512]">Reserva Exclusiva</h3>
                  <p className="text-zinc-400 text-[10px] uppercase tracking-[0.5em] mt-4">Máximo 12 Convidados por Mesa</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-sans">
                  <div>
                    <label className="text-[10px] font-black uppercase text-zinc-500 mb-3 block tracking-widest">Anfitrião</label>
                    <input 
                      onChange={(e) => setBookingDetails({...bookingDetails, name: e.target.value})}
                      className="w-full p-4 bg-zinc-50 border border-zinc-200 outline-none focus:border-[#d4af37] text-black" 
                      placeholder="Nome completo" 
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-zinc-500 mb-3 block tracking-widest">Telemóvel</label>
                    <input 
                      type="tel"
                      onChange={(e) => setBookingDetails({...bookingDetails, phone: e.target.value})}
                      className="w-full p-4 bg-zinc-50 border border-zinc-200 outline-none focus:border-[#d4af37] text-black" 
                      placeholder="+351 9xx xxx xxx" 
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-black uppercase text-zinc-500 mb-3 block tracking-widest">Convidados (Máx 12)</label>
                    <div className="relative">
                      <Users className="absolute left-4 top-4 text-zinc-400" size={18} />
                      <select 
                        value={bookingDetails.guests}
                        onChange={(e) => setBookingDetails({...bookingDetails, guests: parseInt(e.target.value)})}
                        className="w-full p-4 pl-12 bg-zinc-50 border border-zinc-200 text-black appearance-none"
                      >
                        {[...Array(12)].map((_, i) => (
                          <option key={i+1} value={i+1}>{i+1} {i === 0 ? 'Pessoa' : 'Pessoas'}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-[10px] font-black uppercase text-zinc-500 mb-3 block tracking-widest">Dia</label>
                      <input 
                        type="date" 
                        onChange={(e) => setBookingDetails({...bookingDetails, date: e.target.value})}
                        className="w-full p-4 bg-zinc-50 border border-zinc-200 text-black text-xs" 
                      />
                    </div>
                    <div>
                      <label className="text-[10px] font-black uppercase text-zinc-500 mb-3 block tracking-widest">Hora</label>
                      <select 
                        onChange={(e) => setBookingDetails({...bookingDetails, time: e.target.value})}
                        className="w-full p-4 bg-zinc-50 border border-zinc-200 text-black text-xs"
                      >
                        <option>12:00</option><option>13:00</option><option>14:00</option>
                        <option>19:00</option><option>20:00</option><option>21:00</option><option>22:00</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="mt-10 pt-8 border-t border-zinc-100 text-center">
                  <label className="flex items-center justify-center gap-3 mb-8 cursor-pointer group">
                     <input type="checkbox" className="w-5 h-5 accent-[#d4af37]" required />
                     <span className="text-[10px] text-zinc-500 font-sans">Li e aceito a <button onClick={(e) => {e.preventDefault(); setShowPrivacy(true);}} className="text-[#d4af37] font-bold hover:underline">Política de Privacidade</button></span>
                  </label>
                  <button 
                    onClick={() => setView('success')} 
                    className="w-full py-5 bg-[#1a1512] text-[#d4af37] font-black tracking-[0.5em] uppercase text-xs hover:bg-[#d4af37] hover:text-white transition-all shadow-xl"
                  >
                    Confirmar Mesa no Elaris
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* VIEW: SUCCESS */}
          {view === 'success' && (
            <motion.div key="s" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="h-full flex flex-col items-center justify-center p-10 text-center">
              <div className="w-32 h-32 rounded-full border-4 border-[#d4af37] flex items-center justify-center mb-10 bg-white shadow-2xl">
                <CheckCircle2 size={60} className="text-[#d4af37]" />
              </div>
              <h2 className="text-6xl font-black italic text-[#1a1512]">Reserva Confirmada!</h2>
              <div className="mt-8 p-8 bg-white shadow-lg border border-zinc-100 max-w-lg">
                <p className="text-zinc-600 italic text-2xl mb-4">"Estimado(a) {bookingDetails.name || 'Cliente'}, aguardamos por si."</p>
                <div className="grid grid-cols-2 gap-4 text-sm font-bold text-[#d4af37] uppercase tracking-widest">
                  <div className="flex items-center gap-2"><Calendar size={16}/> {bookingDetails.date || 'Hoje'}</div>
                  <div className="flex items-center gap-2"><Clock size={16}/> {bookingDetails.time}</div>
                </div>
              </div>
              <button onClick={() => setView('home')} className="mt-12 px-20 py-5 bg-[#1a1512] text-[#d4af37] font-black tracking-widest uppercase text-xs">Regressar ao Menu Principal</button>
            </motion.div>
          )}

          {/* VIEW: MENU */}
          {view === 'menu' && (
            <motion.div key="m" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-20">
               <div className="max-w-5xl mx-auto">
                 <h3 className="text-6xl font-black italic text-center mb-24">A Nossa Carta</h3>
                 <div className="grid md:grid-cols-2 gap-24">
                    {menuCategorias.map(cat => (
                      <div key={cat.cat}>
                        <h4 className="text-[#d4af37] text-xs font-black uppercase tracking-[0.5em] mb-12 flex items-center gap-5">
                          <div className="h-0.5 w-10 bg-[#d4af37]" /> {cat.cat}
                        </h4>
                        <div className="space-y-14">
                          {cat.items.map(item => (
                            <div key={item.name} className="group">
                              <div className="flex justify-between items-baseline mb-3">
                                <h5 className="font-bold text-2xl group-hover:text-[#d4af37] transition-colors">{item.name}</h5>
                                <div className="flex-1 mx-4 border-b border-dotted border-zinc-300" />
                                <span className="text-[#d4af37] font-bold text-xl">{item.price}</span>
                              </div>
                              <p className="text-zinc-500 text-base italic font-sans leading-relaxed">{item.desc}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    ))}
                 </div>
               </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
      
      {/* Footer */}
      <footer className="p-10 bg-white border-t border-zinc-200 flex flex-col md:flex-row justify-between items-center">
        <div className="flex gap-16 text-zinc-600 font-sans font-bold">
          <div className="flex items-center gap-3"><Phone size={18} className="text-[#d4af37]" /> 255 000 000</div>
          <div className="flex items-center gap-3"><Mail size={18} className="text-[#d4af37]" /> reservas@elaris.pt</div>
        </div>
        <div className="flex items-center gap-8 mt-8 md:mt-0">
          <button onClick={() => setShowPrivacy(true)} className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-400 hover:text-[#d4af37] transition-colors">Privacidade</button>
          <p className="text-[10px] font-black uppercase tracking-[0.4em] text-zinc-300">Felgueiras • Portugal</p>
        </div>
      </footer>
    </div>
  );
}

 CafeCafeApp;
/* -------------------------------------------------------------------------- */
/* --- 2. SPORTZONE FOOTBALL --- */
/* -------------------------------------------------------------------------- */
function SportZoneApp() {
  const [cart, setCart] = useState(0);
  const [view, setView] = useState<'shop' | 'cart'>('shop');

  const gear = [
    { id: 1, name: "Bota Predator Elite", price: 250, brand: "Adidas" },
    { id: 2, name: "Camisola Portugal 24", price: 95, brand: "Nike" },
    { id: 3, name: "Bola Champions League", price: 140, brand: "Adidas" },
    { id: 4, name: "Luvas Guarda-Redes", price: 60, brand: "Reusch" }
  ];

  return (
    <div className="h-full flex flex-col text-black bg-white font-sans">
      <header className="p-5 border-b-4 border-orange-500 flex justify-between items-center bg-[#003399] text-white">
        <div onClick={() => setView('shop')} className="flex items-center gap-2 cursor-pointer">
          <Trophy size={20} className="text-orange-500" />
          <h1 className="font-black italic text-xl tracking-tighter">Elaris<span className="text-orange-500">Sport</span></h1>
        </div>
        <button onClick={() => setView('cart')} className="relative p-2 bg-white/10 rounded-full">
          <ShoppingBag size={20} />
          {cart > 0 && <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-bold">{cart}</span>}
        </button>
      </header>

      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {view === 'shop' && (
            <motion.div key="s" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-6 grid grid-cols-2 gap-4">
              {gear.map(item => (
                <div key={item.id} className="bg-zinc-50 border rounded-xl p-4 flex flex-col">
                  <div className="h-28 bg-zinc-200 rounded-lg mb-3 flex items-center justify-center text-zinc-400"><ShoppingBasket size={30}/></div>
                  <span className="text-[10px] font-bold text-orange-600 uppercase">{item.brand}</span>
                  <h4 className="text-xs font-bold mb-3 h-8 leading-tight">{item.name}</h4>
                  <button 
                    onClick={() => setCart(c => c + 1)}
                    className="mt-auto py-2 bg-[#003399] text-white text-[10px] font-black rounded uppercase"
                  >
                    €{item.price} - Adicionar
                  </button>
                </div>
              ))}
            </motion.div>
          )}

          {view === 'cart' && (
            <motion.div key="c" initial={{ x: 100 }} animate={{ x: 0 }} className="p-8 text-center">
              <CheckCircle2 size={50} className="text-green-500 mx-auto mb-4" />
              <h2 className="text-2xl font-black">Carrinho</h2>
              <p className="text-zinc-500 text-sm mt-2">Tem {cart} itens prontos para entrar em campo.</p>
              <button onClick={() => {setCart(0); setView('shop');}} className="mt-8 w-full py-4 bg-orange-500 text-white font-bold rounded-xl shadow-lg">Finalizar Compra</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* --- 3. BARBEARIA ASGARD --- */
/* -------------------------------------------------------------------------- */
function AsgardBarberApp() {
  const [view, setView] = useState<'intro' | 'book' | 'done'>('intro');
  const [user, setUser] = useState("");

  return (
    <div className="h-full flex flex-col bg-[#0a0a0a] text-white font-serif relative overflow-hidden">
      <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-red-900/10 blur-[100px]" />
      <nav className="p-6 flex justify-between items-center border-b border-white/5 relative z-10">
        <h1 className="text-xl font-black tracking-tighter text-red-600 italic">Elaris</h1>
        <button onClick={() => setView('book')} className="text-[10px] font-bold tracking-[0.2em] uppercase border-b border-red-600">Marcas</button>
      </nav>

      <div className="flex-1 overflow-y-auto relative z-10">
        <AnimatePresence mode="wait">
          {view === 'intro' && (
            <motion.div key="i" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col items-center justify-center p-8 text-center">
              <Scissors size={48} className="text-red-600 mb-6" />
              <h2 className="text-5xl font-black italic mb-4 leading-none">CORTES DE<br/>GUERREIRO.</h2>
              <p className="text-zinc-500 font-sans text-sm mb-10">Estilo nórdico e precisão moderna no coração da cidade.</p>
              <button onClick={() => setView('book')} className="px-12 py-4 bg-red-600 text-white font-bold tracking-widest hover:bg-white hover:text-black transition-colors">ENTRAR EM ELARIS</button>
            </motion.div>
          )}

          {view === 'book' && (
            <motion.div key="b" initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="p-8">
              <div className="bg-zinc-900/50 border border-white/10 p-8 rounded-3xl">
                <h3 className="text-2xl italic font-black mb-6">Agendar Batalha</h3>
                <div className="space-y-4 font-sans">
                  <input id="name-asgard" className="w-full p-4 bg-black border border-white/10 rounded-xl outline-none focus:border-red-600 transition text-white" placeholder="Nome do Guerreiro" />
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-black border border-white/10 rounded-xl flex flex-col gap-2 cursor-pointer hover:border-red-600 transition">
                      <Calendar size={14} className="text-red-600" />
                      <span className="text-[10px] font-bold">HOJE</span>
                    </div>
                    <div className="p-4 bg-black border border-white/10 rounded-xl flex flex-col gap-2 cursor-pointer hover:border-red-600 transition">
                      <Star size={14} className="text-red-600" />
                      <span className="text-[10px] font-bold">VIP</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => {
                      const name = (document.getElementById('name-asgard') as HTMLInputElement).value;
                      setUser(name || "Guerreiro");
                      setView('done');
                    }}
                    className="w-full py-5 bg-white text-black font-black uppercase tracking-tighter hover:bg-red-600 hover:text-white transition"
                  >
                    Confirmar Corte
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {view === 'done' && (
            <motion.div key="d" initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="h-full flex flex-col items-center justify-center p-10 text-center">
              <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center mb-6 shadow-[0_0_50px_rgba(220,38,38,0.3)]">
                <CheckCircle2 size={40} />
              </div>
              <h2 className="text-4xl font-black italic">ESTÁ MARCADO!</h2>
              <p className="text-zinc-500 mt-4 font-sans">Vemo-nos em breve, {user}.</p>
              <button onClick={() => setView('intro')} className="mt-12 text-xs font-bold tracking-widest uppercase border-b border-white/20">Sair de Elaris</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}