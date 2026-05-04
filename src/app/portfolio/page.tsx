"use client";

import React, { useState, useEffect } from "react";
import {
  Menu, Search, Heart, Code2, Cpu, Layers, 
  User, Scissors, Coffee, Crown,
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
function ElarisSportApp() {
  interface Product {
    id: number;
    name: string;
    price: number;
    brand: string;
    image: string;
    category: string;
  }

  interface CartItem extends Product {
    quantity: number;
  }

  const [view, setView] = useState<'shop' | 'cart' | 'success'>('shop');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('Todos');
  const [search, setSearch] = useState('');

  const gear: Product[] = [
    {
      id: 1,
      name: "Predator Elite FG",
      price: 250,
      brand: "Adidas",
      category: "Futebol",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000",
    },
    {
      id: 2,
      name: "Portugal 24 Authentic",
      price: 140,
      brand: "Nike",
      category: "Equipamento",
      image:
        "https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=1000",
    },
    {
      id: 3,
      name: "Champions League Pro",
      price: 150,
      brand: "Adidas",
      category: "Bolas",
      image:
        "https://images.unsplash.com/photo-1614632537190-23e414dcb33d?q=80&w=1000",
    },
    {
      id: 4,
      name: "Reusch Gold Grip",
      price: 85,
      brand: "Reusch",
      category: "Guarda-Redes",
      image:
        "https://images.unsplash.com/photo-1510566337590-2fc1f21d0faa?q=80&w=1000",
    },
    {
      id: 5,
      name: "Mercurial Vapor Elite",
      price: 270,
      brand: "Nike",
      category: "Futebol",
      image:
        "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1000",
    },
    {
      id: 6,
      name: "Fitness Pro Mat",
      price: 60,
      brand: "Domyos",
      category: "Fitness",
      image:
        "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000",
    },
  ];

  const categories = [
    "Todos",
    "Futebol",
    "Equipamento",
    "Bolas",
    "Fitness",
    "Guarda-Redes",
  ];

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);

      if (existing) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity: Math.max(1, item.quantity + delta),
          };
        }

        return item;
      })
    );
  };

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const filteredGear = gear.filter((item) => {
    const matchesCategory =
      selectedCategory === "Todos" ||
      item.category === selectedCategory;

    const matchesSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.brand.toLowerCase().includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <div className="h-full flex flex-col bg-[#f4f6f8] text-[#111] overflow-hidden relative">

      {/* PRIVACY */}
      <AnimatePresence>
        {showPrivacy && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-[100] bg-black/70 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="bg-white max-w-lg w-full p-8 rounded-2xl shadow-2xl border-t-8 border-[#0082c3]"
            >
              <ShieldCheck
                className="text-[#0082c3] mb-4"
                size={40}
              />

              <h3 className="text-2xl font-black mb-4 uppercase">
                Segurança Elaris
              </h3>

              <p className="text-sm text-zinc-600 mb-8 leading-relaxed">
                Todos os pagamentos e dados pessoais são protegidos
                através de protocolos encriptados de última geração.
              </p>

              <button
                onClick={() => setShowPrivacy(false)}
                className="w-full py-4 bg-[#0082c3] text-white font-black uppercase tracking-widest text-xs rounded-xl"
              >
                Fechar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* HEADER */}
      <nav className="bg-white border-b border-zinc-200 px-4 md:px-8 py-4 flex items-center justify-between sticky top-0 z-40">

        <div
          onClick={() => setView('shop')}
          className="flex items-center gap-3 cursor-pointer"
        >
          <div className="bg-[#0082c3] p-2 rounded-lg">
            <Trophy size={20} className="text-white" />
          </div>

          <div>
            <h1 className="font-black text-xl tracking-tight">
              ELARIS<span className="text-[#0082c3]">SPORT</span>
            </h1>

            <p className="text-[9px] uppercase tracking-[0.3em] text-zinc-400 font-black">
              Performance Store
            </p>
          </div>
        </div>

        {/* SEARCH */}
        <div className="hidden md:flex items-center bg-zinc-100 rounded-full px-4 py-2 w-[420px]">
          <Search size={18} className="text-zinc-400" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pesquisar equipamentos..."
            className="bg-transparent outline-none px-3 text-sm w-full"
          />
        </div>

        {/* CART */}
        <button
          onClick={() => setView('cart')}
          className="relative flex items-center gap-3 bg-[#0082c3] hover:bg-[#006fa7] text-white px-5 py-3 rounded-full transition-all"
        >
          <ShoppingBag size={18} />

          <span className="hidden sm:block text-xs font-black uppercase tracking-widest">
            Carrinho
          </span>

          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center">
              {cartCount}
            </span>
          )}
        </button>
      </nav>

      {/* MOBILE SEARCH */}
      <div className="md:hidden bg-white px-4 pb-4 border-b border-zinc-200">
        <div className="flex items-center bg-zinc-100 rounded-full px-4 py-3">
          <Search size={18} className="text-zinc-400" />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Pesquisar..."
            className="bg-transparent outline-none px-3 text-sm w-full"
          />
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto">

        <AnimatePresence mode="wait">

          {/* SHOP */}
          {view === 'shop' && (
            <motion.div
              key="shop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >

              {/* HERO */}
              <div className="relative h-[380px] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1511886929837-354d827aae26?q=80&w=2000"
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/20" />

                <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-20 text-white">
                  <span className="text-[#4fc3ff] font-black text-xs tracking-[0.4em] uppercase mb-4">
                    Nova Coleção
                  </span>

                  <h2 className="text-5xl md:text-7xl font-black leading-none max-w-3xl">
                    EQUIPAMENTO
                    <br />
                    DE ELITE
                  </h2>

                  <p className="mt-6 text-zinc-300 max-w-xl">
                    Descobre produtos premium para futebol, fitness
                    e alta performance.
                  </p>
                </div>
              </div>

              {/* CATEGORIES */}
              <div className="bg-white border-b border-zinc-200 px-4 md:px-8 py-4 sticky top-0 z-20">
                <div className="flex gap-3 overflow-x-auto no-scrollbar">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-5 py-2 rounded-full text-xs font-black uppercase tracking-widest whitespace-nowrap transition-all ${
                        selectedCategory === cat
                          ? "bg-[#0082c3] text-white"
                          : "bg-zinc-100 hover:bg-zinc-200"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* PRODUCTS */}
              <div className="p-4 md:p-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">

                {filteredGear.map((item) => (
                  <motion.div
                    key={item.id}
                    whileHover={{ y: -6 }}
                    className="bg-white rounded-2xl overflow-hidden border border-zinc-200 hover:shadow-2xl transition-all group"
                  >
                    <div className="h-64 bg-zinc-100 overflow-hidden relative">
                      <img
                        src={item.image}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />

                      <div className="absolute top-3 left-3 bg-[#0082c3] text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                        {item.category}
                      </div>
                    </div>

                    <div className="p-5">
                      <span className="text-[10px] font-black uppercase tracking-widest text-[#0082c3]">
                        {item.brand}
                      </span>

                      <h4 className="font-black text-lg mt-2 leading-tight min-h-[56px]">
                        {item.name}
                      </h4>

                      <div className="flex items-center justify-between mt-6">
                        <span className="text-2xl font-black">
                          €{item.price}
                        </span>

                        <button
                          onClick={() => addToCart(item)}
                          className="bg-[#0082c3] hover:bg-black text-white p-3 rounded-xl transition-all"
                        >
                          <Plus size={18} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}

              </div>
            </motion.div>
          )}

          {/* CART */}
          {view === 'cart' && (
            <motion.div
              key="cart"
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              className="p-4 md:p-10 max-w-6xl mx-auto"
            >
              <div className="flex items-center justify-between mb-10">
                <h2 className="text-4xl md:text-6xl font-black tracking-tight">
                  Carrinho
                </h2>

                <button
                  onClick={() => setView('shop')}
                  className="text-xs font-black uppercase tracking-widest text-[#0082c3]"
                >
                  Continuar Compras
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="bg-white rounded-3xl p-20 text-center border border-zinc-200">
                  <ShoppingBasket
                    size={52}
                    className="mx-auto text-zinc-300 mb-5"
                  />

                  <h3 className="text-2xl font-black mb-2">
                    Carrinho vazio
                  </h3>

                  <p className="text-zinc-500">
                    Adiciona equipamento para começar.
                  </p>
                </div>
              ) : (
                <div className="grid lg:grid-cols-[1fr_350px] gap-8">

                  {/* ITEMS */}
                  <div className="space-y-5">
                    {cart.map((item) => (
                      <div
                        key={item.id}
                        className="bg-white rounded-2xl p-5 flex gap-5 border border-zinc-200"
                      >
                        <img
                          src={item.image}
                          className="w-28 h-28 rounded-xl object-cover"
                        />

                        <div className="flex-1">
                          <span className="text-[10px] uppercase font-black tracking-widest text-[#0082c3]">
                            {item.brand}
                          </span>

                          <h4 className="font-black text-lg mt-1">
                            {item.name}
                          </h4>

                          <div className="flex items-center gap-4 mt-5">

                            <div className="flex items-center border rounded-full overflow-hidden">
                              <button
                                onClick={() =>
                                  updateQuantity(item.id, -1)
                                }
                                className="px-4 py-2 hover:bg-zinc-100"
                              >
                                <Minus size={14} />
                              </button>

                              <span className="px-4 font-black">
                                {item.quantity}
                              </span>

                              <button
                                onClick={() =>
                                  updateQuantity(item.id, 1)
                                }
                                className="px-4 py-2 hover:bg-zinc-100"
                              >
                                <Plus size={14} />
                              </button>
                            </div>

                            <button
                              onClick={() => removeFromCart(item.id)}
                              className="text-zinc-400 hover:text-red-500"
                            >
                              <Trash2 size={18} />
                            </button>
                          </div>
                        </div>

                        <div className="text-right">
                          <span className="text-2xl font-black">
                            €{item.price * item.quantity}
                          </span>

                          <p className="text-xs text-zinc-400">
                            €{item.price} unidade
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* SUMMARY */}
                  <div className="bg-white rounded-3xl border border-zinc-200 p-8 h-fit sticky top-6">
                    <h3 className="font-black text-2xl mb-8">
                      Resumo
                    </h3>

                    <div className="space-y-4 mb-8">
                      <div className="flex justify-between">
                        <span className="text-zinc-500">
                          Subtotal
                        </span>

                        <span className="font-bold">
                          €{total}
                        </span>
                      </div>

                      <div className="flex justify-between">
                        <span className="text-zinc-500">
                          Entrega
                        </span>

                        <span className="font-bold text-green-600">
                          Grátis
                        </span>
                      </div>
                    </div>

                    <div className="border-t pt-5 flex justify-between items-center mb-8">
                      <span className="font-black text-lg">
                        Total
                      </span>

                      <span className="text-3xl font-black">
                        €{total}
                      </span>
                    </div>

                    <button
                      onClick={() => setView('success')}
                      className="w-full py-5 bg-[#0082c3] hover:bg-black text-white font-black uppercase tracking-widest rounded-2xl transition-all"
                    >
                      Finalizar Compra
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* SUCCESS */}
          {view === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="h-full flex flex-col items-center justify-center text-center p-10"
            >
              <div className="w-28 h-28 rounded-full bg-[#0082c3] flex items-center justify-center mb-8 shadow-2xl">
                <CheckCircle2 size={50} className="text-white" />
              </div>

              <h2 className="text-5xl md:text-7xl font-black leading-none">
                Compra
                <br />
                Confirmada
              </h2>

              <p className="text-zinc-500 mt-6 max-w-lg text-lg">
                O teu equipamento premium está a ser preparado para envio.
              </p>

              <button
                onClick={() => {
                  setCart([]);
                  setView('shop');
                }}
                className="mt-12 px-12 py-5 bg-black hover:bg-[#0082c3] text-white font-black uppercase tracking-widest rounded-2xl transition-all"
              >
                Voltar à Loja
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* FOOTER */}
      <footer className="bg-white border-t border-zinc-200 px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-5">
        <div className="flex items-center gap-3 text-xs font-black uppercase tracking-widest text-zinc-500">
          <Award size={15} className="text-[#0082c3]" />
          Garantia Premium Elaris
        </div>

        <div className="flex items-center gap-5">
          <button
            onClick={() => setShowPrivacy(true)}
            className="text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-[#0082c3]"
          >
            Privacidade
          </button>

          <span className="text-zinc-300">|</span>

          <p className="text-[10px] uppercase tracking-[0.2em] text-zinc-400 font-black">
            Elaris Sport © 2026
          </p>
        </div>
      </footer>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* --- 3. BARBEARIA ASGARD --- */
/* -------------------------------------------------------------------------- */
function AsgardBarberApp() {
  const [view, setView] = useState<'intro' | 'services' | 'book' | 'done'>('intro');
  const [user, setUser] = useState("");

  const services = [
    {
      name: "Signature Cut",
      price: "€45",
      desc: "Precisão internacional com acabamento premium."
    },
    {
      name: "Royal Beard Ritual",
      price: "€35",
      desc: "Contorno perfeito com toalha quente e óleos exclusivos."
    },
    {
      name: "Executive Package",
      price: "€90",
      desc: "Corte, barba, skincare e styling de luxo."
    }
  ];

  return (
    <div className="h-full flex flex-col bg-[#050505] text-white overflow-hidden relative font-sans">

      {/* BACKGROUND FX */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[-20%] left-[-10%] w-[500px] h-[500px] bg-red-700/10 blur-[140px]" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] bg-amber-500/10 blur-[140px]" />
      </div>

      {/* NAVBAR */}
      <nav className="relative z-20 px-8 md:px-16 py-6 flex items-center justify-between border-b border-white/5 backdrop-blur-xl bg-black/40">
        <div
          onClick={() => setView('intro')}
          className="cursor-pointer flex items-center gap-4 group"
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-600 to-red-900 flex items-center justify-center shadow-[0_0_25px_rgba(220,38,38,0.4)]">
            <Scissors size={18} />
          </div>

          <div>
            <h1 className="text-2xl font-black italic tracking-tight">
              ELARIS
            </h1>
            <span className="text-[9px] uppercase tracking-[0.4em] text-zinc-500">
              International Barber House
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-10 text-[11px] uppercase tracking-[0.3em] font-bold">
          <button
            onClick={() => setView('services')}
            className="hover:text-red-500 transition-colors"
          >
            Services
          </button>

          <button
            onClick={() => setView('book')}
            className="hover:text-red-500 transition-colors"
          >
            Booking
          </button>

          <button
            onClick={() => setView('book')}
            className="px-8 py-3 bg-red-600 hover:bg-white hover:text-black transition-all"
          >
            Reserve
          </button>
        </div>
      </nav>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto relative z-10">

        <AnimatePresence mode="wait">

          {/* INTRO */}
          {view === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="min-h-full"
            >

              {/* HERO */}
              <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">

                <img
                  src="https://images.unsplash.com/photo-1622286342621-4bd786c2447c?q=80&w=2000"
                  className="absolute inset-0 w-full h-full object-cover opacity-40 scale-105"
                  alt="Barber"
                />

                <div className="absolute inset-0 bg-black/60" />

                <div className="relative z-10 text-center px-6 max-w-5xl">
                  <span className="text-red-500 font-black uppercase tracking-[0.5em] text-xs block mb-6">
                    Dubai • London • Porto
                  </span>

                  <h2 className="text-6xl md:text-8xl font-black italic leading-none tracking-tight mb-8">
                    WORLD CLASS
                    <br />
                    GROOMING.
                  </h2>

                  <p className="text-zinc-400 max-w-2xl mx-auto text-lg leading-relaxed mb-12">
                    Uma experiência de elite inspirada nas barbearias mais luxuosas
                    do mundo. Precisão absoluta, ambiente premium e detalhe obsessivo.
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <button
                      onClick={() => setView('book')}
                      className="px-12 py-5 bg-red-600 hover:bg-white hover:text-black transition-all font-black uppercase tracking-[0.2em] text-sm shadow-2xl"
                    >
                      Reservar Agora
                    </button>

                    <button
                      onClick={() => setView('services')}
                      className="px-12 py-5 border border-white/20 hover:border-red-600 hover:bg-red-600 transition-all font-black uppercase tracking-[0.2em] text-sm"
                    >
                      Explorar Serviços
                    </button>
                  </div>
                </div>
              </section>

              {/* PREMIUM SECTION */}
              <section className="py-24 px-8 md:px-16 max-w-7xl mx-auto grid md:grid-cols-3 gap-10">

                <div className="bg-white/5 border border-white/10 p-10 backdrop-blur-xl">
                  <Award size={38} className="text-red-500 mb-6" />
                  <h3 className="text-2xl font-black italic mb-4">
                    Master Barbers
                  </h3>
                  <p className="text-zinc-500 leading-relaxed">
                    Especialistas treinados nas maiores academias internacionais
                    de grooming e estética masculina.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-10 backdrop-blur-xl">
                  <Crown size={38} className="text-red-500 mb-6" />
                  <h3 className="text-2xl font-black italic mb-4">
                    VIP Experience
                  </h3>
                  <p className="text-zinc-500 leading-relaxed">
                    Whiskey lounge, toalhas quentes, aromas premium e atendimento
                    exclusivo.
                  </p>
                </div>

                <div className="bg-white/5 border border-white/10 p-10 backdrop-blur-xl">
                  <Sparkles size={38} className="text-red-500 mb-6" />
                  <h3 className="text-2xl font-black italic mb-4">
                    Luxury Products
                  </h3>
                  <p className="text-zinc-500 leading-relaxed">
                    Produtos importados e tratamentos profissionais usados pelos
                    melhores barbeiros do mundo.
                  </p>
                </div>

              </section>
            </motion.div>
          )}

          {/* SERVICES */}
          {view === 'services' && (
            <motion.div
              key="services"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 md:p-20 max-w-7xl mx-auto"
            >

              <div className="mb-20 text-center">
                <span className="text-red-500 uppercase tracking-[0.5em] text-xs font-black">
                  Elite Services
                </span>

                <h2 className="text-6xl font-black italic mt-6 tracking-tight">
                  THE EXPERIENCE
                </h2>
              </div>

              <div className="grid md:grid-cols-3 gap-8">

                {services.map((service, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -10 }}
                    className="bg-white/5 border border-white/10 p-10 group hover:border-red-600 transition-all"
                  >

                    <div className="flex justify-between items-start mb-10">
                      <span className="text-zinc-500 text-[10px] uppercase tracking-[0.3em] font-bold">
                        Premium
                      </span>

                      <span className="text-red-500 text-2xl font-black italic">
                        {service.price}
                      </span>
                    </div>

                    <h3 className="text-3xl font-black italic mb-6 group-hover:text-red-500 transition-colors">
                      {service.name}
                    </h3>

                    <p className="text-zinc-500 leading-relaxed mb-10">
                      {service.desc}
                    </p>

                    <button
                      onClick={() => setView('book')}
                      className="w-full py-4 bg-white text-black font-black uppercase tracking-widest text-xs hover:bg-red-600 hover:text-white transition-all"
                    >
                      Reservar
                    </button>
                  </motion.div>
                ))}

              </div>
            </motion.div>
          )}

          {/* BOOK */}
          {view === 'book' && (
            <motion.div
              key="book"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-8 md:p-20 flex items-center justify-center"
            >

              <div className="w-full max-w-4xl bg-white/5 border border-white/10 backdrop-blur-2xl p-10 md:p-16 shadow-[0_0_80px_rgba(0,0,0,0.5)]">

                <div className="text-center mb-14">
                  <span className="text-red-500 uppercase tracking-[0.5em] text-xs font-black">
                    Reservation
                  </span>

                  <h2 className="text-5xl font-black italic mt-6">
                    BOOK YOUR SESSION
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8">

                  <input
                    id="name-asgard"
                    className="bg-black/60 border border-white/10 p-5 outline-none focus:border-red-600 transition-all"
                    placeholder="Nome Completo"
                  />

                  <input
                    className="bg-black/60 border border-white/10 p-5 outline-none focus:border-red-600 transition-all"
                    placeholder="Telefone"
                  />

                  <input
                    type="date"
                    className="bg-black/60 border border-white/10 p-5 outline-none focus:border-red-600 transition-all"
                  />

                  <select className="bg-black/60 border border-white/10 p-5 outline-none focus:border-red-600 transition-all">
                    <option>Signature Cut</option>
                    <option>Royal Beard Ritual</option>
                    <option>Executive Package</option>
                  </select>

                </div>

                <button
                  onClick={() => {
                    const name =
                      (document.getElementById(
                        'name-asgard'
                      ) as HTMLInputElement).value;

                    setUser(name || "Cliente");
                    setView('done');
                  }}
                  className="w-full mt-12 py-5 bg-red-600 hover:bg-white hover:text-black transition-all font-black uppercase tracking-[0.3em] text-sm"
                >
                  Confirmar Reserva
                </button>

              </div>
            </motion.div>
          )}

          {/* DONE */}
          {view === 'done' && (
            <motion.div
              key="done"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="h-full flex flex-col items-center justify-center text-center p-10"
            >

              <div className="w-28 h-28 rounded-full bg-red-600 flex items-center justify-center shadow-[0_0_60px_rgba(220,38,38,0.5)] mb-10">
                <CheckCircle2 size={52} />
              </div>

              <span className="text-red-500 uppercase tracking-[0.5em] text-xs font-black mb-6">
                Reservation Confirmed
              </span>

              <h2 className="text-6xl font-black italic leading-none tracking-tight mb-8">
                SEE YOU
                <br />
                SOON.
              </h2>

              <p className="text-zinc-500 text-xl max-w-xl leading-relaxed">
                A tua sessão premium está marcada, {user}. 
                Bem-vindo ao nível mais alto da barbearia internacional.
              </p>

              <button
                onClick={() => setView('intro')}
                className="mt-14 px-14 py-5 border border-white/20 hover:border-red-600 hover:bg-red-600 transition-all uppercase tracking-[0.3em] text-xs font-black"
              >
                Voltar
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* FOOTER */}
      <footer className="relative z-20 border-t border-white/5 bg-black/40 backdrop-blur-xl px-8 md:px-16 py-6 flex flex-col md:flex-row items-center justify-between gap-6">

        <div>
          <h3 className="font-black italic text-xl">
            ELARIS<span className="text-red-600">.</span>
          </h3>

          <p className="text-zinc-600 text-[10px] uppercase tracking-[0.3em] mt-2">
            Luxury Grooming House
          </p>
        </div>

        <div className="flex items-center gap-8 text-[10px] uppercase tracking-[0.3em] font-bold text-zinc-500">
          <span>Dubai</span>
          <span>London</span>
          <span>Porto</span>
        </div>

      </footer>
    </div>
  );
};
