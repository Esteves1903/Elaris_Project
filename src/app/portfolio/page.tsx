"use client";

import React, { useState, useEffect } from "react";
import {
  Menu, Search, Heart, Code2, Cpu, Layers, 
  User, Scissors, Coffee, 
  Calendar, UtensilsCrossed,Globe, 
  Phone, Mail, Users, ChevronRight, Lock, Clock,
  ShoppingBag, Trophy, X, ArrowLeft, CheckCircle2, 
  Star, Award, ShieldCheck, ShoppingBasket, Plus, Minus, Trash2,
  Sparkles, MapPin,
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
            <ElarisFinalDubai/>
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

function ElarisFinalDubai() {
  // --- STATE MANAGEMENT ---
  const [view, setView] = useState<'home' | 'menu' | 'story' | 'booking' | 'success'>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // --- CONTENT DATA ---
  const slides = [
    {
      url: "https://images.unsplash.com/photo-1583417319070-4a69db38a482?q=80&w=2000",
      title: "The Golden Era",
    },
    {
      url: "https://images.unsplash.com/photo-1559339352-11d035aa65de?q=80&w=2000",
      title: "Culinary Alchemy",
    },
    {
      url: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?q=80&w=2000",
      title: "Prestige Lounge",
    }
  ];

  const menuCategories = [
    {
      name: "The Beginning",
      items: [
        {
          n: "A5 Wagyu Tartare",
          p: "AED 245",
          d: "Truffle pearls, 24k gold, quail egg."
        },
        {
          n: "Blue Lobster Salad",
          p: "AED 190",
          d: "Citrus emulsion, caviar, sea herbs."
        }
      ]
    },
    {
      name: "Heritage Mains",
      items: [
        {
          n: "The Elaris Francesinha",
          p: "AED 320",
          d: "Wagyu beef, Pata Negra, champagne sauce."
        },
        {
          n: "Sea Bass in Salt",
          p: "AED 450",
          d: "Mediterranean herbs, flamed tableside."
        }
      ]
    }
  ];

  // --- LOGIC ---
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const navigateTo = (screen: typeof view) => {
    setView(screen);
    setIsMobileMenuOpen(false);
    setShowPrivacy(false);
  };

  return (
    <div className="h-screen w-full bg-[#faf9f6] text-[#1a1a1a] font-sans overflow-hidden relative">

      {/* NAVBAR */}
      <nav className="h-20 md:h-24 bg-white/95 backdrop-blur-md border-b border-zinc-100 flex justify-between items-center px-6 md:px-16 relative z-50">
        <div
          onClick={() => navigateTo('home')}
          className="cursor-pointer flex flex-col items-center"
        >
          <span className="text-xl md:text-2xl font-light tracking-[0.5em] uppercase">
            Elaris
          </span>

          <span className="text-[7px] tracking-[0.3em] text-zinc-400 font-bold">
            DUBAI • JUMEIRAH
          </span>
        </div>

        <div className="hidden md:flex gap-12 text-[10px] font-black uppercase tracking-[0.3em] items-center text-zinc-800">
          <button
            onClick={() => navigateTo('story')}
            className="hover:text-[#c5a059] transition-all"
          >
            The Story
          </button>

          <button
            onClick={() => navigateTo('menu')}
            className="hover:text-[#c5a059] transition-all"
          >
            The Menu
          </button>

          <button
            onClick={() => navigateTo('booking')}
            className="px-10 py-4 bg-[#1a1a1a] text-white hover:bg-[#c5a059] transition-all"
          >
            Book Now
          </button>
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu size={24} strokeWidth={1.5} />
        </button>
      </nav>

      {/* MAIN */}
      <main className="h-[calc(100vh-80px)] md:h-[calc(100vh-96px)] overflow-hidden relative">

        <AnimatePresence mode="wait">

          {/* HOME */}
          {view === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full overflow-y-auto"
            >
              <div className="relative h-[75vh] overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 1.08 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.4 }}
                    className="absolute inset-0"
                  >
                    <img
                      src={slides[currentSlide].url}
                      className="w-full h-full object-cover"
                      alt=""
                    />

                    <div className="absolute inset-0 bg-black/40" />
                  </motion.div>
                </AnimatePresence>

                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6 z-10">
                  <span className="text-[10px] tracking-[0.6em] uppercase mb-4 font-bold">
                    A Legacy of Excellence
                  </span>

                  <h2 className="text-5xl md:text-8xl font-light italic mb-10">
                    {slides[currentSlide].title}
                  </h2>

                  <button
                    onClick={() => navigateTo('menu')}
                    className="px-12 py-5 border border-white hover:bg-white hover:text-black transition-all uppercase text-[10px] tracking-widest font-black"
                  >
                    Discover the Collection
                  </button>
                </div>
              </div>

              <section className="py-20 px-8 max-w-4xl mx-auto text-center">
                <Sparkles
                  className="text-[#c5a059] mx-auto mb-8"
                  size={32}
                  strokeWidth={1}
                />

                <h3 className="text-3xl md:text-5xl font-light mb-10">
                  The Art of Honest Luxury
                </h3>

                <p className="text-zinc-500 font-serif text-lg italic leading-relaxed">
                  "At Elaris, we don't just serve dishes; we curate moments.
                  From the rustic roots of Portugal to the golden skyline of Dubai."
                </p>
              </section>

              {/* FOOTER PEQUENO */}
              <footer className="bg-[#0a0a0a] text-white px-8 py-10">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-10">

                  <div>
                    <h4 className="text-xl tracking-[0.4em] uppercase mb-3">
                      Elaris
                    </h4>

                    <p className="text-zinc-500 text-xs leading-relaxed">
                      Jumeirah Beach Road <br />
                      Dubai, UAE
                    </p>
                  </div>

                  <div className="flex flex-col gap-3 text-[10px] uppercase tracking-[0.3em]">
                    <button
                      onClick={() => navigateTo('menu')}
                      className="hover:text-[#c5a059] text-left"
                    >
                      Menu
                    </button>

                    <button
                      onClick={() => navigateTo('story')}
                      className="hover:text-[#c5a059] text-left"
                    >
                      Heritage
                    </button>

                    <button
                      onClick={() => setShowPrivacy(true)}
                      className="hover:text-[#c5a059] text-left"
                    >
                      Privacy
                    </button>
                  </div>
                </div>

                <div className="mt-10 border-t border-white/10 pt-5 text-center text-[8px] tracking-[0.3em] text-zinc-700 uppercase">
                  © 2026 Elaris Global Hospitality
                </div>
              </footer>
            </motion.div>
          )}

          {/* MENU */}
          {view === 'menu' && (
            <motion.div
              key="menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full overflow-y-auto p-8 md:p-20"
            >
              <div className="max-w-6xl mx-auto">
                <header className="text-center mb-20">
                  <h2 className="text-5xl md:text-7xl font-light uppercase tracking-[0.2em] mb-4">
                    The Menu
                  </h2>

                  <div className="h-0.5 w-20 bg-[#c5a059] mx-auto" />
                </header>

                <div className="grid md:grid-cols-2 gap-20">
                  {menuCategories.map((cat) => (
                    <div key={cat.name} className="space-y-14">
                      <h4 className="text-[#c5a059] text-[11px] font-black uppercase tracking-[0.5em] border-b border-zinc-100 pb-4">
                        {cat.name}
                      </h4>

                      {cat.items.map((item) => (
                        <div key={item.n}>
                          <div className="flex justify-between items-end mb-2">
                            <h5 className="text-xl font-light">
                              {item.n}
                            </h5>

                            <span className="text-sm tracking-widest">
                              {item.p}
                            </span>
                          </div>

                          <p className="text-zinc-400 text-sm italic">
                            {item.d}
                          </p>
                        </div>
                      ))}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* STORY */}
          {view === 'story' && (
            <motion.div
              key="story"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full overflow-y-auto"
            >
              <div className="grid md:grid-cols-2 min-h-full">
                <div className="bg-[#111] text-white p-10 md:p-24 flex flex-col justify-center">
                  <h2 className="text-4xl md:text-6xl font-light mb-10 leading-none">
                    A Journey Across{" "}
                    <span className="text-[#c5a059]">
                      Continents
                    </span>
                  </h2>

                  <p className="text-zinc-400 text-lg italic leading-relaxed mb-8">
                    Elaris was born in 1984 as a small family project in
                    Portugal. Today, it stands as a global beacon of
                    culinary innovation.
                  </p>

                  <button
                    onClick={() => navigateTo('booking')}
                    className="mt-6 w-fit px-10 py-4 bg-[#c5a059] text-black text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white transition-all"
                  >
                    Reserve Experience
                  </button>
                </div>

                <div className="relative min-h-[400px]">
                  <img
                    src="https://images.unsplash.com/photo-1481833761820-0509d3217039?q=80&w=2000"
                    className="w-full h-full object-cover"
                    alt=""
                  />
                </div>
              </div>
            </motion.div>
          )}

          {/* BOOKING */}
          {view === 'booking' && (
            <motion.div
              key="booking"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full overflow-y-auto flex items-center justify-center p-6 md:p-20"
            >
              <div className="bg-white p-10 md:p-20 shadow-2xl w-full max-w-4xl border border-zinc-100 relative">
                <h3 className="text-4xl font-light text-center mb-16 uppercase tracking-widest">
                  Reservations
                </h3>

                <div className="grid md:grid-cols-2 gap-12">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#c5a059]">
                      Full Name
                    </label>

                    <input
                      className="w-full border-b border-zinc-200 p-4 outline-none bg-transparent"
                      placeholder="Johnathan Doe"
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#c5a059]">
                      Guests
                    </label>

                    <select className="w-full border-b border-zinc-200 p-4 bg-transparent outline-none">
                      <option>2 Persons</option>
                      <option>4 Persons</option>
                      <option>6+ Persons</option>
                    </select>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#c5a059]">
                      Date
                    </label>

                    <input
                      type="date"
                      className="w-full border-b border-zinc-200 p-4 outline-none"
                    />
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-[#c5a059]">
                      Time
                    </label>

                    <select className="w-full border-b border-zinc-200 p-4 bg-transparent outline-none">
                      <option>19:00</option>
                      <option>20:30</option>
                      <option>22:00</option>
                    </select>
                  </div>
                </div>

                <button
                  onClick={() => navigateTo('success')}
                  className="w-full mt-20 py-6 bg-[#1a1a1a] text-white font-black uppercase text-[10px] tracking-[0.4em] hover:bg-[#c5a059] hover:text-black transition-all"
                >
                  Secure Invitation
                </button>
              </div>
            </motion.div>
          )}

          {/* SUCCESS */}
          {view === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full flex flex-col items-center justify-center text-center p-10"
            >
              <CheckCircle2
                size={80}
                className="text-[#c5a059] mb-10"
                strokeWidth={1}
              />

              <h2 className="text-5xl font-light uppercase tracking-widest mb-6">
                Confirmed
              </h2>

              <p className="text-zinc-500 italic text-xl max-w-md">
                Your experience at Elaris Dubai is being meticulously prepared.
              </p>

              <button
                onClick={() => navigateTo('home')}
                className="mt-12 px-12 py-5 border border-black hover:bg-black hover:text-white transition-all text-[10px] font-black uppercase tracking-widest"
              >
                Back to Sanctuary
              </button>
            </motion.div>
          )}

        </AnimatePresence>

        {/* PRIVACY MODAL */}
        <AnimatePresence>
          {showPrivacy && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-[200] flex items-center justify-center p-6"
            >
              <div
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
                onClick={() => setShowPrivacy(false)}
              />

              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative bg-white p-10 md:p-14 max-w-lg w-full shadow-2xl border-t-4 border-[#c5a059] z-10"
              >
                <button
                  onClick={() => setShowPrivacy(false)}
                  className="absolute top-6 right-6 text-zinc-400 hover:text-black"
                >
                  <X size={24} />
                </button>

                <ShieldCheck
                  className="text-[#c5a059] mb-6"
                  size={42}
                  strokeWidth={1}
                />

                <h3 className="text-2xl font-light mb-6 uppercase tracking-[0.2em]">
                  Privacy Protocol
                </h3>

                <div className="text-sm text-zinc-500 leading-relaxed space-y-4 mb-10">
                  <p>
                    At Elaris Dubai, discretion is our ultimate luxury.
                  </p>

                  <p>
                    Your personal data is used exclusively for reservation management.
                  </p>
                </div>

                <button
                  onClick={() => setShowPrivacy(false)}
                  className="w-full py-5 bg-[#1a1a1a] text-[#c5a059] font-black uppercase text-[10px] tracking-[0.4em] hover:bg-[#c5a059] hover:text-black transition-all"
                >
                  Acknowledge
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute inset-0 z-[300] bg-white flex flex-col p-12"
            >
              <div className="flex justify-between items-center mb-20">
                <span className="text-[10px] tracking-[0.5em] font-bold text-zinc-400 uppercase">
                  Menu
                </span>

                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2"
                >
                  <X size={30} strokeWidth={1} />
                </button>
              </div>

              <div className="flex flex-col gap-10 text-4xl font-light uppercase tracking-[0.2em]">
                <button
                  onClick={() => navigateTo('home')}
                  className="text-left hover:text-[#c5a059]"
                >
                  Home
                </button>

                <button
                  onClick={() => navigateTo('story')}
                  className="text-left hover:text-[#c5a059]"
                >
                  Heritage
                </button>

                <button
                  onClick={() => navigateTo('menu')}
                  className="text-left hover:text-[#c5a059]"
                >
                  Collection
                </button>

                <button
                  onClick={() => navigateTo('booking')}
                  className="text-left text-[#c5a059]"
                >
                  Reservations
                </button>
              </div>

              <div className="mt-auto border-t border-zinc-100 pt-10">
                <p className="text-[9px] tracking-widest text-zinc-400 uppercase leading-loose">
                  Jumeirah Beach Road • Dubai
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>
    </div>
  );
}

ElarisFinalDubai;

 ;
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