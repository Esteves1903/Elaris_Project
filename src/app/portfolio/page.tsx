"use client";

import React, { useState, useEffect } from "react";
import {
  Menu, Search, Heart, Code2, Cpu, Layers, 
  User, Scissors, Coffee, 
  Calendar, UtensilsCrossed,
  Phone, Mail, Users, ChevronRight, Lock, Clock,
  ShoppingBag, Trophy, X, ArrowLeft, CheckCircle2, 
  Star, Award, ShieldCheck, ShoppingBasket, Plus, Minus, Trash2
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
            <ElarisSportApp />
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  const [bookingDetails, setBookingDetails] = useState({ 
    name: "", phone: "", guests: 2, date: "", time: "20:00" 
  });

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
  }, [images.length]);

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

  const navigateTo = (screen: typeof view) => {
    setView(screen);
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <div className="h-full flex flex-col text-[#2d241e] bg-[#fdfaf5] font-serif overflow-hidden relative">
      
      {/* MODAL DE PRIVACIDADE RESTAURADO */}
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
              <h3 className="text-2xl font-black italic mb-4 uppercase tracking-tighter">Confidencialidade</h3>
              <div className="text-sm text-zinc-600 space-y-4 font-sans leading-relaxed">
                <p>No <strong>Elaris Restaurante</strong>, os seus dados são tratados com o rigor da nossa alta cozinha.</p>
                <p>Recolhemos o seu nome e contacto exclusivamente para processar a reserva. Não partilhamos dados com terceiros.</p>
              </div>
              <button onClick={() => setShowPrivacy(false)} className="w-full mt-8 py-4 bg-[#1a1512] text-[#d4af37] font-bold uppercase tracking-widest text-[10px]">Fechar</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* NAVEGAÇÃO FIXA */}
      <nav className="p-4 md:p-6 bg-[#1a1512] text-[#d4af37] flex justify-between items-center sticky top-0 z-50 border-b border-[#d4af37]/20">
        <div onClick={() => navigateTo('home')} className="cursor-pointer flex items-center gap-2">
          <div className="border-2 border-[#d4af37] p-1 h-8 w-8 flex items-center justify-center font-black uppercase">E</div>
          <span className="font-light text-[10px] tracking-[0.3em] uppercase">Elaris</span>
        </div>
        
        <div className="hidden md:flex gap-8 text-[10px] font-bold uppercase tracking-[0.2em] items-center">
          <button onClick={() => navigateTo('story')} className="hover:text-white transition-colors">História</button>
          <button onClick={() => navigateTo('menu')} className="hover:text-white transition-colors">Carta</button>
          <button onClick={() => navigateTo('booking')} className="px-6 py-2 bg-[#d4af37] text-[#1a1512] font-black rounded-full hover:bg-white transition-all">RESERVAR</button>
        </div>

        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={24}/> : <Menu size={24}/>}
        </button>
      </nav>

      {/* MOBILE OVERLAY */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
            className="fixed inset-0 z-40 bg-[#1a1512] flex flex-col items-center justify-center gap-8 text-[#d4af37]"
          >
            <button onClick={() => navigateTo('home')} className="text-xl font-bold uppercase tracking-widest">Início</button>
            <button onClick={() => navigateTo('story')} className="text-xl font-bold uppercase tracking-widest">História</button>
            <button onClick={() => navigateTo('menu')} className="text-xl font-bold uppercase tracking-widest">Carta</button>
            <button onClick={() => navigateTo('booking')} className="px-10 py-4 bg-[#d4af37] text-[#1a1512] font-black rounded-full uppercase tracking-widest">Reservar</button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          
          {/* HOME */}
          {view === 'home' && (
            <motion.div key="h" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col min-h-full">
              <div className="relative h-[80vh] bg-zinc-900 overflow-hidden flex items-center justify-center">
                <motion.img key={currentImg} initial={{ opacity: 0 }} animate={{ opacity: 0.5 }} transition={{ duration: 1.5 }} src={images[currentImg]} className="absolute inset-0 w-full h-full object-cover" />
                <div className="relative z-10 text-center p-4">
                  <span className="text-[#d4af37] text-[10px] tracking-[0.5em] uppercase mb-4 block">Felgueiras • Portugal</span>
                  <h2 className="text-4xl md:text-8xl font-black italic text-white uppercase tracking-tighter leading-tight">Sabores com<br/>Alma</h2>
                  <button onClick={() => navigateTo('booking')} className="mt-8 px-10 py-4 bg-white text-[#1a1512] font-black text-[10px] tracking-[0.2em] uppercase hover:bg-[#d4af37] transition-all">Garantir Mesa</button>
                </div>
              </div>
            </motion.div>
          )}

          {/* STORY */}
          {view === 'story' && (
            <motion.div key="story" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="min-h-full bg-[#fdfaf5]">
              <div className="h-[40vh] relative overflow-hidden">
                 <img src={images[2]} className="w-full h-full object-cover brightness-50" alt="Legacy" />
                 <div className="absolute inset-0 flex items-center justify-center">
                    <h2 className="text-4xl md:text-7xl font-black italic text-white tracking-tighter uppercase">O Nosso Legado</h2>
                 </div>
              </div>
              <div className="max-w-2xl mx-auto p-8 md:p-20 space-y-10 text-center text-zinc-700 italic text-lg md:text-xl font-sans leading-relaxed">
                <p>Desde 1984, o Elaris é o coração gastronómico de Felgueiras. Elevamos a tradição regional à sofisticação moderna.</p>
                <button onClick={() => navigateTo('home')} className="mt-12 text-[#d4af37] font-black tracking-widest text-[10px] uppercase flex items-center gap-3 mx-auto">
                  <ArrowLeft size={16}/> Voltar
                </button>
              </div>
            </motion.div>
          )}

          {/* MENU */}
          {view === 'menu' && (
            <motion.div key="m" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-6 md:p-20 max-w-5xl mx-auto">
              <h3 className="text-4xl md:text-6xl font-black italic text-center mb-16 uppercase tracking-tighter">A Nossa Carta</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24">
                {menuCategorias.map(cat => (
                  <div key={cat.cat}>
                    <h4 className="text-[#d4af37] text-[10px] font-black uppercase tracking-[0.4em] mb-10 flex items-center gap-4">
                      <div className="h-0.5 w-8 bg-[#d4af37]" /> {cat.cat}
                    </h4>
                    <div className="space-y-10">
                      {cat.items.map(item => (
                        <div key={item.name}>
                          <div className="flex justify-between items-baseline gap-4 mb-2">
                            <h5 className="font-bold text-lg md:text-xl">{item.name}</h5>
                            <span className="text-[#d4af37] font-bold">{item.price}</span>
                          </div>
                          <p className="text-zinc-500 text-xs md:text-sm font-sans italic">{item.desc}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* BOOKING */}
          {view === 'booking' && (
            <motion.div key="b" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="p-4 md:p-12 min-h-full flex items-center justify-center">
              <div className="bg-white p-8 md:p-14 shadow-2xl w-full max-w-2xl border-t-8 border-[#d4af37]">
                <h3 className="text-2xl md:text-4xl font-black italic text-center mb-10 uppercase tracking-tight">Reserva Exclusiva</h3>
                <div className="space-y-6 font-sans">
                  <input className="w-full p-4 bg-zinc-50 border border-zinc-100 text-sm outline-none focus:border-[#d4af37]" placeholder="Anfitrião" onChange={e => setBookingDetails({...bookingDetails, name: e.target.value})} />
                  <input className="w-full p-4 bg-zinc-50 border border-zinc-100 text-sm outline-none focus:border-[#d4af37]" placeholder="Contacto Telemóvel" type="tel" />
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <select className="p-4 bg-zinc-50 border border-zinc-100 text-sm appearance-none outline-none" onChange={e => setBookingDetails({...bookingDetails, guests: parseInt(e.target.value)})}>
                      {[1,2,3,4,5,6,7,8,9,10,11,12].map(n => <option key={n} value={n}>{n} Pessoas</option>)}
                    </select>
                    <input type="date" className="p-4 bg-zinc-50 border border-zinc-100 text-sm outline-none" />
                    <select className="p-4 bg-zinc-50 border border-zinc-100 text-sm appearance-none outline-none">
                      <option>12:30</option><option>13:30</option><option>20:00</option><option>21:30</option>
                    </select>
                  </div>
                  <div className="text-center pt-4">
                    <button onClick={() => setShowPrivacy(true)} className="text-[9px] text-[#d4af37] font-black uppercase tracking-widest hover:underline mb-6 block mx-auto">Ver Política de Privacidade</button>
                    <button onClick={() => navigateTo('success')} className="w-full py-5 bg-[#1a1512] text-[#d4af37] font-black uppercase text-[10px] tracking-widest shadow-xl hover:bg-[#d4af37] hover:text-[#1a1512] transition-all">Confirmar Mesa</button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* SUCCESS */}
          {view === 'success' && (
            <motion.div key="s" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="h-full flex flex-col items-center justify-center text-center p-6 bg-white">
              <CheckCircle2 size={64} className="text-[#d4af37] mb-8" />
              <h2 className="text-4xl md:text-6xl font-black italic uppercase tracking-tighter">Confirmado!</h2>
              <p className="text-zinc-500 mt-6 italic text-lg">Estimado(a) {bookingDetails.name}, aguardamos por si.</p>
              <button onClick={() => navigateTo('home')} className="mt-12 px-12 py-5 bg-[#1a1512] text-[#d4af37] font-black uppercase text-[10px] tracking-[0.3em] transition-all">Voltar ao Início</button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* FOOTER */}
      <footer className="p-8 bg-white border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex gap-8 text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
          <button onClick={() => setShowPrivacy(true)} className="hover:text-[#d4af37] transition-colors">Privacidade</button>
          <span>Felgueiras</span>
          <span className="hidden md:inline">+351 255 000 000</span>
        </div>
        <p className="text-[9px] text-zinc-300 font-sans uppercase tracking-[0.4em] italic">Elaris Restaurante © 2026</p>
      </footer>
    </div>
  );
}

 CafeCafeApp;
/* -------------------------------------------------------------------------- */
/* --- 2. SPORTZONE FOOTBALL --- */
/* -------------------------------------------------------------------------- */
// Interface para o Produto
interface Product {
  id: number;
  name: string;
  price: number;
  brand: string;
  image: string;
}

// Interface para o Item no Carrinho
interface CartItem extends Product {
  quantity: number;
}

function ElarisSportApp() {
  const [view, setView] = useState<'shop' | 'cart' | 'success'>('shop');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showPrivacy, setShowPrivacy] = useState(false);

  const gear: Product[] = [
    { id: 1, name: "Bota Predator Elite FG", price: 250, brand: "Adidas", image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000" },
    { id: 2, name: "Camisola Portugal 24 Authentic", price: 140, brand: "Nike", image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1000" },
    { id: 3, name: "Bola Champions League Pro", price: 150, brand: "Adidas", image: "https://images.unsplash.com/photo-1614632537190-23e414dcb33d?q=80&w=1000" },
    { id: 4, name: "Luvas Reusch Gold Grip", price: 85, brand: "Reusch", image: "https://images.unsplash.com/photo-1510566337590-2fc1f21d0faa?q=80&w=1000" }
  ];

  // --- Lógica do Carrinho ---
  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const total = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="h-full flex flex-col text-[#1a1a1a] bg-[#f8f8f8] font-sans overflow-hidden relative">
      
      {/* MODAL DE PRIVACIDADE (Igual ao Restaurante) */}
      <AnimatePresence>
        {showPrivacy && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-[100] bg-black/70 backdrop-blur-md flex items-center justify-center p-4">
            <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white max-w-lg w-full p-8 shadow-2xl border-t-8 border-orange-500">
              <ShieldCheck className="text-orange-500 mb-4" size={40} />
              <h3 className="text-2xl font-black italic mb-4 uppercase tracking-tighter">Segurança Elaris</h3>
              <p className="text-sm text-zinc-600 mb-8 leading-relaxed">Os seus dados de pagamento e envio são processados através de protocolos encriptados de alta segurança. O Elaris Sport garante a proteção total da sua privacidade.</p>
              <button onClick={() => setShowPrivacy(false)} className="w-full py-4 bg-[#1a1512] text-white font-bold uppercase tracking-widest text-xs">Fechar</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Premium */}
      <nav className="p-6 bg-[#0a0a0a] text-white flex justify-between items-center sticky top-0 z-30 border-b border-orange-500/30">
        <div onClick={() => setView('shop')} className="cursor-pointer group flex items-center gap-3">
          <div className="bg-orange-500 p-1.5 rotate-3 group-hover:rotate-0 transition-transform">
             <Trophy size={22} className="text-black" />
          </div>
          <h1 className="font-black text-2xl italic tracking-tighter uppercase">Elaris<span className="text-orange-500">Sport</span></h1>
        </div>
        
        <button onClick={() => setView('cart')} className="relative flex items-center gap-4 bg-white/5 hover:bg-white/10 px-5 py-2.5 rounded-full transition-all border border-white/10">
          <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">Equipamento</span>
          <div className="relative">
            <ShoppingBag size={20} className="text-orange-500" />
            {cartCount > 0 && (
              <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-2 -right-2 bg-white text-black text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-black">
                {cartCount}
              </motion.span>
            )}
          </div>
        </button>
      </nav>

      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          
          {/* VIEW: SHOP */}
          {view === 'shop' && (
            <motion.div key="s" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {/* Banner Hero Imagem Grande */}
              <div className="relative h-[450px] bg-black overflow-hidden flex items-center justify-center">
                <img src="https://images.unsplash.com/photo-1511886929837-354d827aae26?q=80&w=2000" className="absolute inset-0 w-full h-full object-cover opacity-60 scale-105" alt="Hero" />
                <div className="relative text-center z-10 p-6">
                  <span className="text-orange-500 font-black text-xs tracking-[0.5em] uppercase mb-4 block">Alta Performance</span>
                  <h2 className="text-6xl md:text-8xl font-black italic text-white tracking-tighter leading-none mb-8">LEVEL UP<br/>YOUR GAME</h2>
                  <button onClick={() => {document.getElementById('catalog')?.scrollIntoView({behavior:'smooth'})}} className="px-10 py-4 bg-orange-500 text-black font-black uppercase text-xs tracking-widest hover:bg-white transition-all">Ver Coleção</button>
                </div>
              </div>

              {/* Catálogo */}
              <div id="catalog" className="p-8 md:p-16 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {gear.map(item => (
                  <motion.div key={item.id} whileHover={{ y: -10 }} className="group bg-white border border-zinc-100 p-4 shadow-sm hover:shadow-2xl transition-all">
                    <div className="h-64 bg-[#f3f3f3] mb-6 overflow-hidden relative">
                      <img src={item.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={item.name} />
                      <div className="absolute top-3 left-3 bg-black text-white text-[9px] font-black px-3 py-1 uppercase tracking-tighter italic">New Season</div>
                    </div>
                    <span className="text-[10px] font-black text-orange-500 uppercase tracking-widest">{item.brand}</span>
                    <h4 className="text-lg font-black italic tracking-tighter mb-4 h-12 leading-tight uppercase">{item.name}</h4>
                    <div className="flex items-center justify-between pt-4 border-t border-zinc-50">
                      <span className="text-xl font-black">€{item.price}</span>
                      <button 
                        onClick={() => addToCart(item)}
                        className="p-3 bg-black text-white hover:bg-orange-500 transition-colors"
                      >
                        <Plus size={18} />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* VIEW: CART (Totalmente Funcional) */}
          {view === 'cart' && (
            <motion.div key="c" initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} className="p-6 md:p-16 max-w-4xl mx-auto">
              <h2 className="text-5xl font-black italic tracking-tighter mb-12 uppercase">O Teu Arsenal <span className="text-zinc-300">({cartCount})</span></h2>
              
              {cart.length === 0 ? (
                <div className="text-center py-20 bg-white border-2 border-dashed border-zinc-200">
                  <ShoppingBasket size={48} className="mx-auto text-zinc-300 mb-4" />
                  <p className="text-zinc-500 italic">O teu carrinho está vazio. Volta ao campo!</p>
                  <button onClick={() => setView('shop')} className="mt-8 px-8 py-3 bg-black text-white font-bold uppercase text-xs">Ir para a Loja</button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map(item => (
                    <div key={item.id} className="bg-white p-6 flex items-center gap-6 shadow-sm border border-zinc-100">
                      <img src={item.image} className="w-24 h-24 object-cover bg-zinc-100" />
                      <div className="flex-1">
                        <span className="text-[9px] font-black text-orange-500 uppercase">{item.brand}</span>
                        <h4 className="font-black italic text-lg uppercase tracking-tighter">{item.name}</h4>
                        <div className="flex items-center gap-4 mt-3">
                          <div className="flex items-center border">
                            <button onClick={() => updateQuantity(item.id, -1)} className="p-2 hover:bg-zinc-100"><Minus size={14}/></button>
                            <span className="px-4 font-bold text-sm">{item.quantity}</span>
                            <button onClick={() => updateQuantity(item.id, 1)} className="p-2 hover:bg-zinc-100"><Plus size={14}/></button>
                          </div>
                          <button onClick={() => removeFromCart(item.id)} className="text-zinc-400 hover:text-red-500 transition-colors"><Trash2 size={18}/></button>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="block font-black text-xl">€{item.price * item.quantity}</span>
                        <span className="text-[10px] text-zinc-400 font-bold">€{item.price} unid.</span>
                      </div>
                    </div>
                  ))}

                  <div className="mt-12 bg-[#0a0a0a] text-white p-8">
                    <div className="flex justify-between items-center mb-8">
                      <span className="text-zinc-400 uppercase font-black tracking-[0.3em] text-xs">Total do Pedido</span>
                      <span className="text-4xl font-black italic tracking-tighter">€{total}</span>
                    </div>
                    <button 
                      onClick={() => setView('success')}
                      className="w-full py-5 bg-orange-500 text-black font-black uppercase tracking-[0.2em] text-sm hover:bg-white transition-all shadow-xl"
                    >
                      Finalizar e Pagar
                    </button>
                    <button onClick={() => setView('shop')} className="w-full mt-4 text-[10px] font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-colors">Continuar a Comprar</button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* VIEW: SUCCESS */}
          {view === 'success' && (
            <motion.div key="ok" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="h-full flex flex-col items-center justify-center p-10 text-center bg-white">
              <div className="w-24 h-24 bg-orange-500 rounded-full flex items-center justify-center mb-8 shadow-2xl">
                <CheckCircle2 size={48} className="text-black" />
              </div>
              <h2 className="text-6xl font-black italic uppercase tracking-tighter">Encomenda<br/>Confirmada</h2>
              <p className="text-zinc-500 italic text-xl mt-6 max-w-md mx-auto">O teu equipamento Elaris já está a caminho do balneário. Prepara-te para vencer.</p>
              <button 
                onClick={() => {setCart([]); setView('shop');}} 
                className="mt-12 px-16 py-4 bg-black text-white font-black tracking-widest uppercase text-xs hover:bg-orange-500 transition-all"
              >
                Voltar à Loja
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
      
      {/* Footer Profissional */}
      <footer className="p-10 bg-white border-t border-zinc-100 flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex gap-12">
          <div className="flex flex-col gap-1">
            <span className="text-[9px] uppercase text-zinc-400 font-black tracking-widest">Suporte Elaris</span>
            <div className="flex items-center gap-2 text-zinc-800 font-bold text-xs"><Award size={14} className="text-orange-500" /> Garantia Vitalícia</div>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <button onClick={() => setShowPrivacy(true)} className="text-[10px] font-black uppercase tracking-widest text-zinc-400 hover:text-orange-500 transition-colors">Privacidade</button>
          <span className="text-zinc-200">|</span>
          <p className="text-[10px] font-black uppercase tracking-widest text-zinc-300 italic">Elaris Sport Global Group © 2026</p>
        </div>
      </footer>
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