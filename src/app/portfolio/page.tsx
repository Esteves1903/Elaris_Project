"use client";

import React, { useState } from "react";
import {
  Menu, X, Search, ShoppingBag, Heart, Code2, Cpu, Layers, 
  User, Scissors, ArrowLeft, CheckCircle2, Coffee, 
  ShoppingBasket, Calendar, Star, UtensilsCrossed, Trophy,
  Phone, Mail
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

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

export default function PortfolioProfissional() {
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

/* -------------------------------------------------------------------------- */
/* --- 1. RESTAURANTE APP --- */
/* -------------------------------------------------------------------------- */
function CafeCafeApp() {
  const [view, setView] = useState<'home' | 'menu' | 'booking' | 'success'>('home');
  const [user, setUser] = useState<string | null>(null);

  const menuCategorias = [
    { 
      cat: "Especiais", 
      items: [
        { name: "Francesinha à Legado", price: "13.50€", desc: "Molho secreto artesanal e carnes selecionadas." },
        { name: "Cachorro Especial", price: "9.00€", desc: "Salsicha fresca, queijo derretido e batata palha." }
      ]
    },
    { 
      cat: "Petiscos", 
      items: [
        { name: "Moelas Picantes", price: "6.50€", desc: "Tradicionais, cozinhadas lentamente." },
        { name: "Pica-Pau de Vitela", price: "11.00€", desc: "Cubos de vitela tenra com pickles." }
      ]
    }
  ];

  return (
    <div className="h-full flex flex-col text-[#2d241e] bg-[#fdfaf5] font-serif">
      <nav className="p-6 bg-[#2d241e] text-[#d4af37] flex justify-between items-center sticky top-0 z-20 shadow-xl">
        <div onClick={() => setView('home')} className="cursor-pointer group">
          <h1 className="font-black text-xl tracking-[0.2em] uppercase">O LEGADO</h1>
          <div className="h-0.5 bg-[#d4af37] w-0 group-hover:w-full transition-all duration-300" />
        </div>
        <div className="flex gap-6 text-[10px] font-bold uppercase tracking-widest items-center">
          <button onClick={() => setView('menu')} className="hover:text-white transition">Carta</button>
          <button 
            onClick={() => user ? setUser(null) : setView('booking')} 
            className="px-5 py-2 border border-[#d4af37] hover:bg-[#d4af37] hover:text-[#2d241e] transition-all rounded-sm"
          >
            {user ? `Olá, ${user.split(' ')[0]}` : 'RESERVAR'}
          </button>
        </div>
      </nav>

      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {view === 'home' && (
            <motion.div key="h" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col h-full">
              <div className="relative h-64 bg-zinc-800">
                <img 
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=1000" 
                  className="w-full h-full object-cover opacity-50"
                  alt="Restaurante Interior"
                />
                <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-6">
                  <span className="text-[#d4af37] text-xs tracking-[0.4em] uppercase mb-2">Felgueiras</span>
                  <h2 className="text-3xl font-black italic">Tradição à Mesa</h2>
                </div>
              </div>
              
              <div className="p-8 text-center bg-white border-b border-[#eaddca]">
                <p className="italic text-lg text-zinc-600 mb-6">"Onde o café se cruza com a melhor gastronomia regional."</p>
                <div className="flex justify-center gap-2 mb-8">
                  {[1,2,3,4,5].map(s => <Star key={s} size={14} className="fill-[#d4af37] text-[#d4af37]" />)}
                </div>
                <button onClick={() => setView('menu')} className="w-full py-4 bg-[#2d241e] text-white font-bold tracking-widest uppercase text-xs hover:bg-[#d4af37] hover:text-[#2d241e] transition-all">
                  Explorar a Carta
                </button>
              </div>
            </motion.div>
          )}

          {view === 'menu' && (
            <motion.div key="m" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-6">
              <h3 className="text-3xl font-black italic text-center mb-10 text-[#2d241e]">A Nossa Carta</h3>
              {menuCategorias.map(categoria => (
                <div key={categoria.cat} className="mb-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-[1px] bg-[#d4af37] flex-1" />
                    <span className="text-xs font-black uppercase tracking-[0.3em] text-[#d4af37]">{categoria.cat}</span>
                    <div className="h-[1px] bg-[#d4af37] flex-1" />
                  </div>
                  <div className="space-y-8">
                    {categoria.items.map(item => (
                      <div key={item.name} className="flex flex-col">
                        <div className="flex justify-between items-baseline mb-1">
                          <h4 className="font-bold text-lg">{item.name}</h4>
                          <span className="font-black text-[#d4af37]">{item.price}</span>
                        </div>
                        <p className="text-sm text-zinc-500 font-sans italic">{item.desc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {view === 'booking' && (
            <motion.div key="b" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="p-8 h-full flex flex-col justify-center">
              <div className="bg-white p-8 border border-[#eaddca] shadow-2xl relative">
                <div className="absolute top-[-10px] left-1/2 -translate-x-1/2 bg-[#fdfaf5] px-4">
                  <UtensilsCrossed size={20} className="text-[#d4af37]" />
                </div>
                <h3 className="text-2xl font-black italic mb-6 text-center">Marcar Mesa</h3>
                <div className="space-y-4 font-sans">
                  <input id="name-legado" className="w-full p-4 border-b border-[#eaddca] bg-transparent outline-none focus:border-[#d4af37] transition text-black" placeholder="Nome Completo" />
                  <div className="grid grid-cols-2 gap-4">
                    <input type="date" className="w-full p-4 border-b border-[#eaddca] bg-transparent text-xs text-black" />
                    <input type="time" className="w-full p-4 border-b border-[#eaddca] bg-transparent text-xs text-black" />
                  </div>
                  <button 
                    onClick={() => {
                      const name = (document.getElementById('name-legado') as HTMLInputElement).value;
                      setUser(name || "Estimado Cliente");
                      setView('success');
                    }} 
                    className="w-full py-5 bg-[#2d241e] text-white font-bold tracking-widest uppercase text-xs mt-4"
                  >
                    Confirmar Pedido
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {view === 'success' && (
            <motion.div key="s" initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="h-full flex flex-col items-center justify-center p-10 text-center">
              <div className="p-6 rounded-full border border-[#d4af37] mb-6">
                <CheckCircle2 size={40} className="text-[#d4af37]" />
              </div>
              <h2 className="text-3xl font-black italic text-[#2d241e]">Reserva Efetuada</h2>
              <p className="text-zinc-500 mt-4 font-sans italic">"Aguardamos a sua visita em breve, {user}."</p>
              <button onClick={() => setView('home')} className="mt-10 px-8 py-3 bg-[#2d241e] text-white text-[10px] font-bold tracking-[0.3em] uppercase">Voltar ao Início</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      <footer className="p-4 bg-white border-t border-[#eaddca] text-center">
        <div className="flex justify-center gap-4 text-zinc-400 mb-2">
          <Phone size={14} /> <Mail size={14} />
        </div>
        <p className="text-[9px] uppercase tracking-widest text-zinc-400">Felgueiras, Portugal • Aberto todos os dias</p>
      </footer>
    </div>
  );
}

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