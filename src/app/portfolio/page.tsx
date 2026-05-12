"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import {
  Menu, Search, Heart, Code2, Cpu, Layers,
  User, Scissors, Coffee, Crown,
  Calendar, UtensilsCrossed,Globe,
  Phone, Mail, Users, ChevronRight, Lock, Clock,
  ShoppingBag, Trophy, X, ArrowLeft, CheckCircle2,
  Star, Award, ShieldCheck, ShoppingBasket, Plus, Minus, Trash2,
  Sparkles, MapPin, Mouse, Smartphone, Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { History as HistoryIcon } from "lucide-react";

// --- ANIMATED COUNTER COMPONENT ---
function AnimatedCounter({ target, duration = 2000, suffix = "" }: { target: number; duration?: number; suffix?: string }) {
  const [count, setCount] = React.useState(0);
  const [started, setStarted] = React.useState(false);
  const ref = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  React.useEffect(() => {
    if (!started) return;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
      else setCount(target);
    };
    requestAnimationFrame(step);
  }, [started, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

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

type Lang = "en" | "pt";

function PortfolioScrollHandler() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const section = searchParams.get("section");
    if (!section) return;
    let attempts = 0;
    const tryScroll = () => {
      const el = document.getElementById(section);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 104;
        window.scrollTo({ top, behavior: "smooth" });
      } else if (attempts < 20) {
        attempts++;
        setTimeout(tryScroll, 100);
      }
    };
    setTimeout(tryScroll, 300);
  }, [searchParams]);

  return null;
}

export default function PortfolioPage() {
  const [sidebarData, setSidebarData] = useState<ProjectDetails | null>(null);

  return (
    <main className="min-h-screen bg-[#0B0F19] px-6 pb-24 pt-32 text-white font-sans">
      <Suspense><PortfolioScrollHandler /></Suspense>
      {/* Hero Section */}
      <section className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">
            Portfolio
          </p>
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
            Interactive layout previews.
          </h1>
          <p className="mb-8 text-base leading-7 text-zinc-300">
            These are real, working demos — not screenshots. Click through every feature as if you were a real customer.
          </p>
          <div className="flex flex-wrap gap-3">
            {[
              { icon: <Mouse className="h-3.5 w-3.5" />, label: "Click everything" },
              { icon: <Smartphone className="h-3.5 w-3.5" />, label: "Works on mobile" },
              { icon: <Zap className="h-3.5 w-3.5" />, label: "Fully interactive" },
            ].map((hint) => (
              <span key={hint.label} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-zinc-300">
                <span className="text-cyan-400">{hint.icon}</span>
                {hint.label}
              </span>
            ))}
          </div>
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
        <div id="restaurant" className="space-y-6">
          <h2 className="text-3xl font-black tracking-tight">1. Elaris Restaurant</h2>
          <div className="rounded-2xl md:rounded-[2.5rem] overflow-hidden border border-white/10 h-[580px] md:h-[700px] relative bg-orange-50 shadow-2xl isolate">
            <ElarisFinalDubai />
          </div>
          <div className="flex justify-end">
            <button onClick={() => setSidebarData(technicalDetails.cafe)} className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-bold hover:bg-cyan-400 hover:text-black transition-all flex items-center gap-2 text-xs tracking-widest uppercase">
              Study case
            </button>
          </div>
        </div>

        {/* 2. SPORT STORE */}
        <div id="football-store" className="space-y-6">
          <h2 className="text-3xl font-black tracking-tight">2. Elaris Football Store</h2>
          <div className="rounded-2xl md:rounded-[2.5rem] overflow-hidden border border-white/10 h-[580px] md:h-[700px] relative bg-white shadow-2xl isolate">
            <ElarisSportApp />
          </div>
          <div className="flex justify-end">
            <button onClick={() => setSidebarData(technicalDetails.sport)} className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-bold hover:bg-blue-600 transition-all flex items-center gap-2 text-xs tracking-widest uppercase">
              Study case
            </button>
          </div>
        </div>

        {/* 3. BARBER SHOP */}
        <div id="barber" className="space-y-6">
          <h2 className="text-3xl font-black tracking-tight">3. Elaris Barber Shop</h2>
          <div className="rounded-2xl md:rounded-[2.5rem] overflow-hidden border border-white/10 h-[580px] md:h-[700px] relative bg-[#0a0a0a] shadow-2xl isolate">
            <AsgardBarberApp />
          </div>
          <div className="flex justify-end">
            <button onClick={() => setSidebarData(technicalDetails.asgard)} className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-bold hover:bg-red-600 transition-all flex items-center gap-2 text-xs tracking-widest uppercase">
              Study case
            </button>
          </div>
        </div>

      </section>
    </main>
  );
}

function ElarisFinalDubai() {
  const [lang, setLang] = useState<Lang>("en");
  const t = {
    en: {
      story: "The Story", menu: "The Menu", bookNow: "Book Now",
      home: "Home", heritage: "Heritage", collection: "Collection", reservations: "Reservations",
      discover: "Discover the Collection", artTitle: "The Art of Honest Luxury",
      artQuote: '"At Elaris, we don\'t just serve dishes; we curate moments. From the rustic roots of Portugal to the golden skyline of Dubai."',
      menuTitle: "The Menu", menuSub: "Drag the plates to explore",
      yearsExp: "Years of Experience", intlAwards: "International Awards", worldCapitals: "World Capitals",
      privacy: "Privacy", luxuryDining: "Luxury Dining",
      copyright: "© 2026 Elaris Global Hospitality Group. All rights reserved.",
      location: "Jumeirah Beach Road · Dubai, UAE",
      legacyBadge: "A Legacy of Excellence",
      slideTitle1: "The Golden Era", slideTitle2: "Culinary Alchemy", slideTitle3: "Prestige Lounge",
      cat1: "The Beginning", cat2: "Heritage Mains", cat3: "Grand Finale",
      storyHeading: "A Journey Across", storyHeadingHL: "Continents",
      storyPara: "Elaris was born in 1984 as a small family project in Portugal. Today, it stands as a global beacon of culinary innovation.",
      reserveExp: "Reserve Experience",
      confirmed: "Confirmed",
      successMsg: "Your experience at Elaris Dubai is being meticulously prepared.",
      backToSanctuary: "Back to Sanctuary",
      privacyTitle: "Privacy Protocol",
      privacyP1: "At Elaris Dubai, discretion is our ultimate luxury.",
      privacyP2: "Your personal data is used exclusively for reservation management.",
      acknowledge: "Acknowledge",
      n_wagyu: "A5 Wagyu Tartare", d_wagyu: "Truffle pearls, 24k gold, quail egg.",
      n_lobster: "Blue Lobster Salad", d_lobster: "Citrus emulsion, caviar, sea herbs.",
      n_caviar: "Imperial Beluga Caviar", d_caviar: "30g selection, traditional garnishes, gold leaf blinis.",
      n_foie: "Seared Foie Gras", d_foie: "Port wine reduction, caramelised figs, toasted brioche.",
      n_francesinha: "The Elaris Francesinha", d_francesinha: "Wagyu beef, Pata Negra, champagne sauce.",
      n_seabass: "Sea Bass in Salt", d_seabass: "Mediterranean herbs, flamed tableside.",
      n_octopus: "Octopus 'Lagareiro'", d_octopus: "Roasted potatoes, garlic confit, premium olive oil.",
      n_lamb: "Golden Lamb Chops", d_lamb: "Pistachio crust, saffron risotto, mint jus.",
      n_truffle: "Black Truffle Risotto", d_truffle: "Acquerello rice, fresh winter truffles, 36-month Parmesan.",
      n_abade: "Abade de Priscos", d_abade: "Traditional bacon pudding, citrus sorbet.",
      n_chocolate: "Chocolate Decadence", d_chocolate: "70% Valrhona chocolate, hazelnut praline, sea salt.",
    },
    pt: {
      story: "A História", menu: "O Menu", bookNow: "Reservar",
      home: "Início", heritage: "Herança", collection: "Coleção", reservations: "Reservas",
      discover: "Descobrir a Coleção", artTitle: "A Arte do Luxo Honesto",
      artQuote: '"Na Elaris, não servimos apenas pratos; criamos momentos. Das raízes rústicas de Portugal ao horizonte dourado do Dubai."',
      menuTitle: "O Menu", menuSub: "Arrasta os pratos para os explorar",
      yearsExp: "Anos de Experiência", intlAwards: "Prémios Internacionais", worldCapitals: "Capitais Mundiais",
      privacy: "Privacidade", luxuryDining: "Restaurante de Luxo",
      copyright: "© 2026 Elaris Global Hospitality Group. Todos os direitos reservados.",
      location: "Jumeirah Beach Road · Dubai, EAU",
      legacyBadge: "Um Legado de Excelência",
      slideTitle1: "A Era de Ouro", slideTitle2: "Alquimia Culinária", slideTitle3: "Lounge de Prestígio",
      cat1: "O Início", cat2: "Pratos de Herança", cat3: "Grande Final",
      storyHeading: "Uma Viagem por", storyHeadingHL: "Continentes",
      storyPara: "A Elaris nasceu em 1984 como um pequeno projeto familiar em Portugal. Hoje, é um farol global de inovação culinária.",
      reserveExp: "Reservar Experiência",
      confirmed: "Confirmado",
      successMsg: "A tua experiência no Elaris Dubai está a ser meticulosamente preparada.",
      backToSanctuary: "Voltar ao Início",
      privacyTitle: "Protocolo de Privacidade",
      privacyP1: "No Elaris Dubai, a discrição é o nosso luxo supremo.",
      privacyP2: "Os teus dados pessoais são usados exclusivamente para gestão de reservas.",
      acknowledge: "Reconhecer",
      n_wagyu: "Tartare de Wagyu A5", d_wagyu: "Pérolas de trufa, ouro 24k, ovo de codorniz.",
      n_lobster: "Salada de Lagosta Azul", d_lobster: "Emulsão de citrinos, caviar, ervas marinhas.",
      n_caviar: "Caviar Beluga Imperial", d_caviar: "Seleção de 30g, guarnições tradicionais, blinis de folha de ouro.",
      n_foie: "Foie Gras Selado", d_foie: "Redução de vinho do Porto, figos caramelizados, brioche tostado.",
      n_francesinha: "A Elaris Francesinha", d_francesinha: "Carne de Wagyu, Pata Negra, molho de champanhe.",
      n_seabass: "Robalo no Sal", d_seabass: "Ervas mediterrâneas, flamejado à mesa.",
      n_octopus: "Polvo à Lagareiro", d_octopus: "Batatas assadas, confit de alho, azeite premium.",
      n_lamb: "Costeletas de Borrego Douradas", d_lamb: "Crosta de pistácio, risoto de açafrão, jus de hortelã.",
      n_truffle: "Risoto de Trufa Negra", d_truffle: "Arroz Acquerello, trufas de inverno frescas, Parmesão de 36 meses.",
      n_abade: "Abade de Priscos", d_abade: "Pudim de toucinho tradicional, sorbet de citrinos.",
      n_chocolate: "Decadência de Chocolate", d_chocolate: "Chocolate Valrhona 70%, praliné de avelã, flor de sal.",
    },
  }[lang];
  // --- STATE MANAGEMENT ---
  const [view, setView] = useState<'home' | 'menu' | 'story' | 'booking' | 'success'>('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // --- CONTENT DATA ---
  const slides = [
    { url: "/ElarisRest1.png", title: t.slideTitle1 },
    { url: "/ElarisRest2.png", title: t.slideTitle2 },
    { url: "/ElarisRest3.png", title: t.slideTitle3 },
  ];

  const menuCategories = [
    {
      name: t.cat1,
      items: [
        {
          n: t.n_wagyu,
          p: "AED 245",
          d: t.d_wagyu,
          img: "/A5Wagyu.png"
        },
        {
          n: t.n_lobster,
          p: "AED 190",
          d: t.d_lobster,
          img: "/LagostaAzul.png"
        },
        {
          n: t.n_caviar,
          p: "AED 850",
          d: t.d_caviar,
          img: "/caviar.png"
        },
        {
          n: t.n_foie,
          p: "AED 210",
          d: t.d_foie,
          img: "/FoieGras.png"
        }
      ]
    },
    {
      name: t.cat2,
      items: [
        {
          n: t.n_francesinha,
          p: "AED 320",
          d: t.d_francesinha,
          img: "/francesinha.png"
        },
        {
          n: t.n_seabass,
          p: "AED 450",
          d: t.d_seabass,
          img: "/seabass.png"
        },
        {
          n: t.n_octopus,
          p: "AED 280",
          d: t.d_octopus,
          img: "/octopus.png"
        },
        {
          n: t.n_lamb,
          p: "AED 390",
          d: t.d_lamb,
          img: "/lambchops.png"
        },
        {
          n: t.n_truffle,
          p: "AED 310",
          d: t.d_truffle,
          img: "/truffleRisotto.png"
        }
      ]
    },
    {
      name: t.cat3,
      items: [
        {
          n: t.n_abade,
          p: "AED 110",
          d: t.d_abade,
          img: "/abade.png"
        },
        {
          n: t.n_chocolate,
          p: "AED 135",
          d: t.d_chocolate,
          img: "/chocolate.png"
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
    <div className="h-full w-full bg-[#faf9f6] text-[#1a1a1a] font-sans overflow-hidden relative flex flex-col">

      {/* NAVBAR */}
      <nav className="h-20 md:h-24 bg-white border-b border-zinc-100 flex justify-between items-center px-6 md:px-16 z-50">
        <div
          onClick={() => navigateTo('home')}
          className="cursor-pointer flex flex-col items-center"
        >
          <span className="text-lg md:text-2xl font-light tracking-[0.5em] uppercase">
            Elaris
          </span>

          <span className="text-[7px] tracking-[0.3em] text-zinc-400 font-bold">
            {t.location}
          </span>
        </div>

        <div className="hidden md:flex gap-12 text-[10px] font-black uppercase tracking-[0.3em] items-center text-zinc-800">
          <button
            onClick={() => navigateTo('story')}
            className="hover:text-[#c5a059] transition-all"
          >
            {t.story}
          </button>

          <button
            onClick={() => navigateTo('menu')}
            className="hover:text-[#c5a059] transition-all"
          >
            {t.menu}
          </button>

          <button
            onClick={() => navigateTo('booking')}
            className="px-8 py-3 bg-[#1a1a1a] text-white hover:bg-[#c5a059] transition-all"
          >
            {t.bookNow}
          </button>

          <div className="flex items-center gap-1 ml-2">
            <button onClick={() => setLang("en")} className={`px-2.5 py-1 text-[9px] font-black uppercase tracking-widest rounded-full transition-all border ${lang === "en" ? "bg-[#c5a059] text-black border-[#c5a059]" : "border-zinc-300 text-zinc-400 hover:border-zinc-500"}`}>EN</button>
            <button onClick={() => setLang("pt")} className={`px-2.5 py-1 text-[9px] font-black uppercase tracking-widest rounded-full transition-all border ${lang === "pt" ? "bg-[#c5a059] text-black border-[#c5a059]" : "border-zinc-300 text-zinc-400 hover:border-zinc-500"}`}>PT</button>
          </div>
        </div>

        <button
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(true)}
        >
          <Menu size={22} strokeWidth={1.5} />
        </button>
      </nav>

      {/* MAIN */}
      <main className="flex-1 overflow-hidden relative">

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
                    {t.legacyBadge}
                  </span>

                  <h2 className="text-3xl sm:text-5xl md:text-8xl font-light italic mb-10">
                    {slides[currentSlide].title}
                  </h2>

                    <button
                    onClick={() => navigateTo('menu')}
                    className="px-12 py-5 border border-white hover:bg-white hover:text-black transition-all uppercase text-[10px] tracking-widest font-black"
                  >
                    {t.discover}
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
                  {t.artTitle}
                </h3>

                <p className="text-zinc-500 font-serif text-lg italic leading-relaxed">
                  {t.artQuote}
                </p>
              </section>

            </motion.div>
          )}

          {/* MENU */}
          {view === 'menu' && (
            <motion.div
              key="menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full overflow-y-auto p-8 md:p-16"
            >
              <div className="max-w-7xl mx-auto">
                <header className="text-center mb-16">
                  <h2 className="text-5xl md:text-7xl font-light uppercase tracking-[0.2em] mb-4">
                    {t.menuTitle}
                  </h2>
                  <div className="h-0.5 w-20 bg-[#c5a059] mx-auto mb-4" />
                  <p className="text-zinc-400 text-xs tracking-[0.3em] uppercase">{t.menuSub}</p>
                </header>

                {menuCategories.map((cat) => (
                  <div key={cat.name} className="mb-20">
                    <h4 className="text-[#c5a059] text-[11px] font-black uppercase tracking-[0.5em] border-b border-zinc-100 pb-4 mb-10">
                      {cat.name}
                    </h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {cat.items.map((item) => (
                        <DishCard3D key={item.n} item={item} />
                      ))}
                    </div>
                  </div>
                ))}
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
                    {t.storyHeading}{" "}
                    <span className="text-[#c5a059]">
                      {t.storyHeadingHL}
                    </span>
                  </h2>

                  <p className="text-zinc-400 text-lg italic leading-relaxed mb-8">
                    {t.storyPara}
                  </p>

                  <button
                    onClick={() => navigateTo('booking')}
                    className="mt-6 w-fit px-10 py-4 bg-[#c5a059] text-black text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white transition-all"
                  >
                    {t.reserveExp}
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

              {/* STATS STRIP — "20 anos de experiência" com contador animado */}
              <div className="bg-[#c5a059] py-12 px-10 md:px-24">
                <div className="max-w-5xl mx-auto grid grid-cols-3 gap-8 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-[#111] text-5xl md:text-6xl font-black leading-none tabular-nums">
                      <AnimatedCounter target={20} duration={2200} suffix="+" />
                    </span>
                    <span className="text-[#111]/70 text-[9px] uppercase tracking-[0.4em] font-black mt-2">
                      {t.yearsExp}
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1 border-x border-[#111]/20">
                    <span className="text-[#111] text-5xl md:text-6xl font-black leading-none tabular-nums">
                      <AnimatedCounter target={47} duration={2000} />
                    </span>
                    <span className="text-[#111]/70 text-[9px] uppercase tracking-[0.4em] font-black mt-2">
                      {t.intlAwards}
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-[#111] text-5xl md:text-6xl font-black leading-none tabular-nums">
                      <AnimatedCounter target={3} duration={1500} />
                    </span>
                    <span className="text-[#111]/70 text-[9px] uppercase tracking-[0.4em] font-black mt-2">
                      {t.worldCapitals}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* BOOKING */}
          {view === 'booking' && (
            <BookingForm navigateTo={navigateTo} lang={lang} />
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
                {t.confirmed}
              </h2>

              <p className="text-zinc-500 italic text-xl max-w-md">
                {t.successMsg}
              </p>

              <button
                onClick={() => navigateTo('home')}
                className="mt-12 px-12 py-5 border border-black hover:bg-black hover:text-white transition-all text-[10px] font-black uppercase tracking-widest"
              >
                {t.backToSanctuary}
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
                  {t.privacyTitle}
                </h3>

                <div className="text-sm text-zinc-500 leading-relaxed space-y-4 mb-10">
                  <p>{t.privacyP1}</p>
                  <p>{t.privacyP2}</p>
                </div>

                <button
                  onClick={() => setShowPrivacy(false)}
                  className="w-full py-5 bg-[#1a1a1a] text-[#c5a059] font-black uppercase text-[10px] tracking-[0.4em] hover:bg-[#c5a059] hover:text-black transition-all"
                >
                  {t.acknowledge}
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </main>

      {/* FOOTER FIXO */}
      <footer className="bg-[#0a0a0a] text-white px-4 md:px-16 py-4 border-t border-white/5 w-full shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3">

          {/* LEFT */}
          <div>
            <h4 className="text-lg font-light tracking-[0.4em] uppercase">
              Elaris
            </h4>
            <p className="text-zinc-500 text-[9px] leading-loose tracking-widest uppercase">
              {t.location}
            </p>
          </div>

          {/* CENTER LINKS */}
          <div className="flex gap-6 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
            <button onClick={() => navigateTo('menu')} className="hover:text-[#c5a059] transition-colors">{t.menu}</button>
            <button onClick={() => navigateTo('story')} className="hover:text-[#c5a059] transition-colors">{t.heritage}</button>
            <button onClick={() => setShowPrivacy(true)} className="hover:text-[#c5a059] transition-colors">{t.privacy}</button>
          </div>

          {/* RIGHT */}
          <div className="flex items-center gap-3 text-zinc-500">
            <Globe size={14} className="hover:text-[#c5a059] cursor-pointer transition-colors" />
            <span className="text-[9px] tracking-[0.4em] uppercase">{t.luxuryDining}</span>
          </div>

        </div>
        <div className="max-w-7xl mx-auto mt-3 pt-3 border-t border-white/5 text-center">
          <p className="text-[8px] tracking-[0.5em] uppercase text-zinc-700">
            {t.copyright}
          </p>
        </div>
      </footer>

      {/* MOBILE MENU — positioned over full container including footer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="absolute inset-0 z-[300] bg-white flex flex-col p-10"
          >
            <div className="flex justify-between items-center mb-10">
              <span className="text-[10px] tracking-[0.5em] font-bold text-zinc-400 uppercase">
                Menu
              </span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
                <X size={28} strokeWidth={1} />
              </button>
            </div>

            <div className="flex flex-col gap-7 text-3xl font-light uppercase tracking-[0.2em]">
              <button onClick={() => navigateTo('home')} className="text-left hover:text-[#c5a059]">{t.home}</button>
              <button onClick={() => navigateTo('story')} className="text-left hover:text-[#c5a059]">{t.heritage}</button>
              <button onClick={() => navigateTo('menu')} className="text-left hover:text-[#c5a059]">{t.collection}</button>
              <button onClick={() => navigateTo('booking')} className="text-left text-[#c5a059]">{t.reservations}</button>
            </div>

            <div className="mt-auto border-t border-zinc-100 pt-6 flex items-center justify-between">
              <p className="text-[9px] tracking-widest text-zinc-400 uppercase leading-loose">{t.location}</p>
              <div className="flex items-center gap-1">
                <button onClick={() => setLang("en")} className={`px-2.5 py-1 text-[9px] font-black uppercase tracking-widest rounded-full transition-all border ${lang === "en" ? "bg-[#c5a059] text-black border-[#c5a059]" : "border-zinc-300 text-zinc-400"}`}>EN</button>
                <button onClick={() => setLang("pt")} className={`px-2.5 py-1 text-[9px] font-black uppercase tracking-widest rounded-full transition-all border ${lang === "pt" ? "bg-[#c5a059] text-black border-[#c5a059]" : "border-zinc-300 text-zinc-400"}`}>PT</button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}

ElarisFinalDubai;

 ;
/* -------------------------------------------------------------------------- */
/* --- BOOKING FORM --- */
/* -------------------------------------------------------------------------- */
const COUNTRY_CODES = [
  { code: "+351", flag: "🇵🇹", name: "Portugal" },
  { code: "+1", flag: "🇺🇸", name: "USA / Canada" },
  { code: "+44", flag: "🇬🇧", name: "United Kingdom" },
  { code: "+971", flag: "🇦🇪", name: "UAE" },
  { code: "+33", flag: "🇫🇷", name: "France" },
  { code: "+49", flag: "🇩🇪", name: "Germany" },
  { code: "+34", flag: "🇪🇸", name: "Spain" },
  { code: "+39", flag: "🇮🇹", name: "Italy" },
  { code: "+55", flag: "🇧🇷", name: "Brazil" },
  { code: "+81", flag: "🇯🇵", name: "Japan" },
  { code: "+86", flag: "🇨🇳", name: "China" },
  { code: "+91", flag: "🇮🇳", name: "India" },
  { code: "+7", flag: "🇷🇺", name: "Russia" },
  { code: "+61", flag: "🇦🇺", name: "Australia" },
  { code: "+52", flag: "🇲🇽", name: "Mexico" },
  { code: "+27", flag: "🇿🇦", name: "South Africa" },
  { code: "+82", flag: "🇰🇷", name: "South Korea" },
  { code: "+31", flag: "🇳🇱", name: "Netherlands" },
  { code: "+41", flag: "🇨🇭", name: "Switzerland" },
  { code: "+46", flag: "🇸🇪", name: "Sweden" },
  { code: "+47", flag: "🇳🇴", name: "Norway" },
  { code: "+45", flag: "🇩🇰", name: "Denmark" },
  { code: "+32", flag: "🇧🇪", name: "Belgium" },
  { code: "+43", flag: "🇦🇹", name: "Austria" },
  { code: "+48", flag: "🇵🇱", name: "Poland" },
  { code: "+90", flag: "🇹🇷", name: "Turkey" },
  { code: "+20", flag: "🇪🇬", name: "Egypt" },
  { code: "+966", flag: "🇸🇦", name: "Saudi Arabia" },
  { code: "+65", flag: "🇸🇬", name: "Singapore" },
  { code: "+60", flag: "🇲🇾", name: "Malaysia" },
];

function BookingForm({ navigateTo, lang = "en" }: { navigateTo: (v: 'home' | 'menu' | 'story' | 'booking' | 'success') => void; lang?: Lang }) {
  const t = {
    en: {
      reservations: "Reservations", fullName: "Full Name", guests: "Guests",
      selectGuests: "Select guests", date: "Date", time: "Time", selectTime: "Select time",
      phone: "Phone Number", secureInvitation: "Secure Invitation",
      errName: "Full name is required", errFullName: "Please enter your full name",
      errGuests: "Please select number of guests", errDate: "Please select a date",
      errDateFuture: "Date must be in the future", errTime: "Please select a time",
      errPhone: "Phone number is required", errPhoneInvalid: "Enter a valid phone number",
      person: "Person", persons: "Persons",
    },
    pt: {
      reservations: "Reservas", fullName: "Nome Completo", guests: "Convidados",
      selectGuests: "Selecionar convidados", date: "Data", time: "Hora", selectTime: "Selecionar hora",
      phone: "Número de Telefone", secureInvitation: "Confirmar Reserva",
      errName: "Nome completo obrigatório", errFullName: "Insira o seu nome completo",
      errGuests: "Selecione o número de convidados", errDate: "Selecione uma data",
      errDateFuture: "A data deve ser no futuro", errTime: "Selecione uma hora",
      errPhone: "Telefone obrigatório", errPhoneInvalid: "Insira um número válido",
      person: "Pessoa", persons: "Pessoas",
    },
  }[lang];
  const [form, setForm] = React.useState({
    name: "", guests: "", date: "", time: "", countryCode: "+351", phone: "",
  });
  const [errors, setErrors] = React.useState<Record<string, string>>({});
  const [touched, setTouched] = React.useState<Record<string, boolean>>({});

  const validate = (data: typeof form) => {
    const e: Record<string, string> = {};
    if (!data.name.trim()) e.name = t.errName;
    else if (data.name.trim().split(" ").length < 2) e.name = t.errFullName;
    if (!data.guests) e.guests = t.errGuests;
    if (!data.date) e.date = t.errDate;
    else if (new Date(data.date) < new Date(new Date().toDateString())) e.date = t.errDateFuture;
    if (!data.time) e.time = t.errTime;
    if (!data.phone.trim()) e.phone = t.errPhone;
    else if (!/^\d{6,15}$/.test(data.phone.replace(/\s/g, ""))) e.phone = t.errPhoneInvalid;
    return e;
  };

  const handleChange = (field: string, value: string) => {
    const next = { ...form, [field]: value };
    setForm(next);
    if (touched[field]) {
      setErrors(validate(next));
    }
  };

  const handleBlur = (field: string) => {
    const next = { ...touched, [field]: true };
    setTouched(next);
    setErrors(validate(form));
  };

  const handleSubmit = () => {
    const allTouched = Object.fromEntries(Object.keys(form).map(k => [k, true]));
    setTouched(allTouched);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length === 0) navigateTo('success');
  };

  const fieldClass = (field: string) =>
    `w-full border-b p-4 outline-none bg-transparent transition-colors ${
      errors[field] && touched[field]
        ? "border-red-400 text-red-600 placeholder-red-300"
        : "border-zinc-200 focus:border-[#c5a059]"
    }`;

  return (
    <motion.div
      key="booking"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full overflow-y-auto p-6 md:p-16"
    >
      <div className="bg-white p-10 md:p-16 shadow-2xl w-full max-w-4xl border border-zinc-100 relative mx-auto">
        <h3 className="text-4xl font-light text-center mb-16 uppercase tracking-widest">
          {t.reservations}
        </h3>

        <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">

          {/* Full Name */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-[#c5a059]">{t.fullName} *</label>
            <input
              className={fieldClass("name")}
              placeholder="Johnathan Doe"
              value={form.name}
              onChange={e => handleChange("name", e.target.value)}
              onBlur={() => handleBlur("name")}
            />
            {errors.name && touched.name && <p className="text-red-500 text-[10px] mt-1">{errors.name}</p>}
          </div>

          {/* Guests */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-[#c5a059]">{t.guests} *</label>
            <select
              className={fieldClass("guests")}
              value={form.guests}
              onChange={e => handleChange("guests", e.target.value)}
              onBlur={() => handleBlur("guests")}
            >
              <option value="">{t.selectGuests}</option>
              <option value="1">1 {t.person}</option>
              <option value="2">2 {t.persons}</option>
              <option value="3">3 {t.persons}</option>
              <option value="4">4 {t.persons}</option>
              <option value="5">5 {t.persons}</option>
              <option value="6+">6+ {t.persons}</option>
            </select>
            {errors.guests && touched.guests && <p className="text-red-500 text-[10px] mt-1">{errors.guests}</p>}
          </div>

          {/* Date */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-[#c5a059]">{t.date} *</label>
            <input
              type="date"
              className={fieldClass("date")}
              value={form.date}
              onChange={e => handleChange("date", e.target.value)}
              onBlur={() => handleBlur("date")}
            />
            {errors.date && touched.date && <p className="text-red-500 text-[10px] mt-1">{errors.date}</p>}
          </div>

          {/* Time */}
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-[#c5a059]">{t.time} *</label>
            <select
              className={fieldClass("time")}
              value={form.time}
              onChange={e => handleChange("time", e.target.value)}
              onBlur={() => handleBlur("time")}
            >
              <option value="">{t.selectTime}</option>
              <option value="19:00">19:00</option>
              <option value="20:30">20:30</option>
              <option value="22:00">22:00</option>
            </select>
            {errors.time && touched.time && <p className="text-red-500 text-[10px] mt-1">{errors.time}</p>}
          </div>

          {/* Phone — full width */}
          <div className="space-y-2 md:col-span-2">
            <label className="text-[10px] font-black uppercase tracking-widest text-[#c5a059]">{t.phone} *</label>
            <div className={`flex border-b transition-colors ${errors.phone && touched.phone ? "border-red-400" : "border-zinc-200 focus-within:border-[#c5a059]"}`}>
              <select
                className="bg-transparent outline-none py-4 pr-3 text-sm font-medium text-zinc-600 shrink-0"
                value={form.countryCode}
                onChange={e => handleChange("countryCode", e.target.value)}
              >
                {COUNTRY_CODES.map(c => (
                  <option key={c.code + c.name} value={c.code}>
                    {c.flag} {c.code} {c.name}
                  </option>
                ))}
              </select>
              <input
                className="flex-1 bg-transparent outline-none p-4 text-sm"
                placeholder="912 345 678"
                value={form.phone}
                onChange={e => handleChange("phone", e.target.value.replace(/[^0-9\s]/g, ""))}
                onBlur={() => handleBlur("phone")}
                inputMode="tel"
              />
            </div>
            {errors.phone && touched.phone && <p className="text-red-500 text-[10px] mt-1">{errors.phone}</p>}
          </div>

        </div>

        <button
          onClick={handleSubmit}
          className="w-full mt-16 py-6 bg-[#1a1a1a] text-white font-black uppercase text-[10px] tracking-[0.4em] hover:bg-[#c5a059] hover:text-black transition-all"
        >
          {t.secureInvitation}
        </button>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* --- DISH CARD 3D --- */
/* -------------------------------------------------------------------------- */
function DishCard3D({ item }: { item: { n: string; p: string; d: string; img: string } }) {
  const cardRef = React.useRef<HTMLDivElement>(null);
  const [transform, setTransform] = React.useState("rotateX(0deg) rotateY(0deg) scale(1)");
  const [shine, setShine] = React.useState({ x: 50, y: 50, opacity: 0 });
  const [isHovered, setIsHovered] = React.useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateY = ((x - centerX) / centerX) * 18;
    const rotateX = -((y - centerY) / centerY) * 18;
    setTransform(`rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.04)`);
    setShine({ x: (x / rect.width) * 100, y: (y / rect.height) * 100, opacity: 0.25 });
  };

  const handleMouseLeave = () => {
    setTransform("rotateX(0deg) rotateY(0deg) scale(1)");
    setShine({ x: 50, y: 50, opacity: 0 });
    setIsHovered(false);
  };

  return (
    <div
      style={{ perspective: "900px" }}
      className="cursor-pointer h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        style={{
          transform,
          transition: isHovered ? "transform 0.08s ease-out" : "transform 0.5s ease",
          transformStyle: "preserve-3d",
        }}
        className="relative rounded-2xl overflow-hidden shadow-xl border border-zinc-200 bg-white h-full flex flex-col"
      >
        {/* Shine overlay */}
        <div
          style={{
            background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,${shine.opacity}), transparent 70%)`,
            position: "absolute", inset: 0, zIndex: 10, pointerEvents: "none",
            transition: isHovered ? "none" : "opacity 0.5s",
          }}
        />

        {/* Image */}
        <div className="h-44 overflow-hidden shrink-0">
          <img
            src={item.img}
            alt={item.n}
            className="w-full h-full object-cover"
            style={{
              transform: isHovered ? "scale(1.08)" : "scale(1)",
              transition: "transform 0.5s ease",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" style={{ zIndex: 5 }} />
        </div>

        {/* Content */}
        <div className="p-4 relative z-10 flex-1 flex flex-col">
          <div className="flex justify-between items-start gap-2 mb-2">
            <h5 className="text-sm font-semibold leading-tight text-[#1a1a1a]">{item.n}</h5>
            <span className="text-[#c5a059] text-sm font-black whitespace-nowrap">{item.p}</span>
          </div>
          <p className="text-[#1a1a1a] text-xs italic leading-relaxed">{item.d}</p>
        </div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* -------------------------------------------------------------------------- */
/* --- 2. SPORTZONE FOOTBALL --- */
/* -------------------------------------------------------------------------- */
function Stars({ rating }: { rating: number }) {
  return (
    <span className="flex gap-0.5">
      {[1,2,3,4,5].map(s => (
        <span key={s} className={`text-xs ${s<=Math.round(rating) ? 'text-amber-400' : 'text-zinc-300'}`}>★</span>
      ))}
    </span>
  );
}

function ElarisSportApp() {
  const [lang, setLang] = useState<Lang>("en");
  const t = {
    en: {
      performanceStore: "Performance Store", searchPlaceholder: "Search…", cart: "Cart",
      catAll: "All", catBoots: "Boots", catKits: "Kits", catBalls: "Balls",
      catGoalkeeper: "Goalkeeper", catTraining: "Training", catAccessories: "Accessories",
      heroTitle1: "PLAY AT YOUR", heroTitle2: "PEAK.",
      shopBoots: "Shop Boots", shopKits: "Shop Kits", onBoots: "on boots",
      products: "products", featured: "Featured", priceLow: "Price: Low → High", priceHigh: "Price: High → Low",
      noProducts: "No products found for", backToShop: "Back to Shop", reviews: "reviews",
      selectSize: "Select Size", pleaseSelectSize: "Please select a size",
      addToCart: "Add to Cart", yourCart: "Your Cart", continueShopping: "Continue Shopping",
      cartEmpty: "Your cart is empty", cartEmptySub: "Add some gear to get started",
      browseProducts: "Browse Products", subtotal: "Subtotal", savings: "Savings",
      shipping: "Shipping", free: "Free", addMore: "Add", moreForFree: "more for free shipping!",
      total: "Total", checkout: "Checkout",
      shippingPayment: "Shipping & Payment", fullName: "Full Name", email: "Email Address",
      address: "Shipping Address", card: "Card Number", placeOrder: "Place Order",
      order: "Order", items: "items", orderConfirmed: "Order Confirmed",
      thankYou: "Thank you,", confirmation: "Your order has been confirmed. A confirmation has been sent to",
      yourEmail: "your email", estDelivery: "Estimated delivery:", deliveryDays: "3–5 business days",
      backToStore: "Back to Store", size: "Size", each: "each",
      errName: "Required", errEmail: "Invalid email", errAddress: "Required", errCard: "Enter a valid card number",
      orderSummary: "Order Summary", backToCart: "Back to Cart",
      prod1_d: "Elite football boots engineered for total control. Laceless design with Primeknit upper for a sock-like fit and explosive first touch.",
      prod2_d: "Designed for pure speed. The ultra-thin Flyknit upper delivers a barefoot feel while the carbon fibre soleplate maximises energy return.",
      prod3_d: "The official Portugal 2024 home jersey. Sweat-wicking Dri-FIT ADV technology keeps you cool and dry during the most intense moments.",
      prod4_d: "The official match ball of the UEFA Champions League. Thermally bonded panels and a butyl bladder for consistent flight and touch.",
      prod5_d: "Professional-grade goalkeeper gloves with NC Excellent 3mm latex palm. Exceptional grip in all weather conditions.",
      prod6_d: "The France 2024 away kit featuring a stunning navy gradient design. Official Dri-FIT ADV technology for peak performance.",
      prod7_d: "Durable 32-panel training ball with a butyl inner tube for consistent bounce and shape retention through thousands of kicks.",
      prod8_d: "Nike's most precise boot ever. Textured touch zone and split outsole geometry for explosive multi-directional movement.",
      prod9_d: "Full compression top and shorts set with Dri-FIT technology. Designed to support muscles and enhance recovery during training.",
      prod10_d: "50-piece set of high-visibility training cones. Lightweight, stackable and perfect for agility drills and pitch marking.",
      prod11_d: "Lightweight EVA foam shin guards with anatomical shape. Ankle protection straps included for a secure, comfortable fit.",
      prod12_d: "Professional goalkeeper jersey with padded elbows for diving protection. Ultra-breathable mesh panels for maximum ventilation.",
    },
    pt: {
      performanceStore: "Loja de Performance", searchPlaceholder: "Pesquisar…", cart: "Carrinho",
      catAll: "Todos", catBoots: "Chuteiras", catKits: "Equipamentos", catBalls: "Bolas",
      catGoalkeeper: "Guarda-Redes", catTraining: "Treino", catAccessories: "Acessórios",
      heroTitle1: "JOGA NO TEU", heroTitle2: "MELHOR.",
      shopBoots: "Ver Chuteiras", shopKits: "Ver Equipamentos", onBoots: "nas chuteiras",
      products: "produtos", featured: "Destaques", priceLow: "Preço: Mais Baixo", priceHigh: "Preço: Mais Alto",
      noProducts: "Nenhum produto encontrado para", backToShop: "Voltar à Loja", reviews: "avaliações",
      selectSize: "Selecionar Tamanho", pleaseSelectSize: "Por favor seleciona um tamanho",
      addToCart: "Adicionar ao Carrinho", yourCart: "O Teu Carrinho", continueShopping: "Continuar a Comprar",
      cartEmpty: "O teu carrinho está vazio", cartEmptySub: "Adiciona equipamento para começar",
      browseProducts: "Ver Produtos", subtotal: "Subtotal", savings: "Poupança",
      shipping: "Envio", free: "Grátis", addMore: "Adiciona", moreForFree: "mais para envio grátis!",
      total: "Total", checkout: "Finalizar",
      shippingPayment: "Envio & Pagamento", fullName: "Nome Completo", email: "Email",
      address: "Morada de Envio", card: "Número de Cartão", placeOrder: "Fazer Encomenda",
      order: "Encomenda", items: "artigos", orderConfirmed: "Encomenda Confirmada",
      thankYou: "Obrigado,", confirmation: "A tua encomenda foi confirmada. Foi enviada confirmação para",
      yourEmail: "o teu email", estDelivery: "Entrega estimada:", deliveryDays: "3–5 dias úteis",
      backToStore: "Voltar à Loja", size: "Tamanho", each: "cada",
      errName: "Obrigatório", errEmail: "Email inválido", errAddress: "Obrigatório", errCard: "Número de cartão inválido",
      orderSummary: "Resumo da Encomenda", backToCart: "Voltar ao Carrinho",
      prod1_d: "Chuteiras de elite para controlo total. Design sem atacadores com parte superior Primeknit para um ajuste perfeito e primeiro toque explosivo.",
      prod2_d: "Concebidas para velocidade pura. A parte superior ultra-fina Flyknit oferece uma sensação descalço enquanto a sola de fibra de carbono maximiza o retorno de energia.",
      prod3_d: "A camisola oficial de Portugal para o Euro 2024. Tecnologia Dri-FIT ADV com absorção de suor mantém-te fresco durante os momentos mais intensos.",
      prod4_d: "A bola de jogo oficial da UEFA Champions League. Painéis termicamente colados e bexiga de butilo para voo e toque consistentes.",
      prod5_d: "Luvas de guarda-redes profissionais com palma de látex NC Excellent 3mm. Aderência excecional em todas as condições climatéricas.",
      prod6_d: "O equipamento alternativo da França 2024 com um deslumbrante degradê azul-marinho. Tecnologia oficial Dri-FIT ADV para desempenho máximo.",
      prod7_d: "Bola de treino durável com 32 painéis e câmara de ar de butilo para ressalto consistente e retenção de forma após milhares de remates.",
      prod8_d: "A bota mais precisa da Nike. Zona de toque texturizada e geometria de sola dividida para movimentos multidirecionais explosivos.",
      prod9_d: "Kit completo de compressão com calções e camisola com tecnologia Dri-FIT. Concebido para suporte muscular e recuperação durante o treino.",
      prod10_d: "Conjunto de 50 cones de treino de alta visibilidade. Leves, empilháveis e perfeitos para drills de agilidade e marcação de campo.",
      prod11_d: "Caneleiras leves de espuma EVA com forma anatómica. Inclui tiras de proteção do tornozelo para um ajuste seguro e confortável.",
      prod12_d: "Camisola profissional de guarda-redes com cotoveleiras acolchoadas para proteção nas mergulhadas. Painéis de malha ultra-respirável para ventilação máxima.",
    },
  }[lang] ?? {
    performanceStore: "Performance Store", searchPlaceholder: "Search…", cart: "Cart",
    catAll: "All", catBoots: "Boots", catKits: "Kits", catBalls: "Balls",
    catGoalkeeper: "Goalkeeper", catTraining: "Training", catAccessories: "Accessories",
    heroTitle1: "PLAY AT YOUR", heroTitle2: "PEAK.",
    shopBoots: "Shop Boots", shopKits: "Shop Kits", onBoots: "on boots",
    products: "products", featured: "Featured", priceLow: "Price: Low → High", priceHigh: "Price: High → Low",
    noProducts: "No products found for", backToShop: "Back to Shop", reviews: "reviews",
    selectSize: "Select Size", pleaseSelectSize: "Please select a size",
    addToCart: "Add to Cart", yourCart: "Your Cart", continueShopping: "Continue Shopping",
    cartEmpty: "Your cart is empty", cartEmptySub: "Add some gear to get started",
    browseProducts: "Browse Products", subtotal: "Subtotal", savings: "Savings",
    shipping: "Shipping", free: "Free", addMore: "Add", moreForFree: "more for free shipping!",
    total: "Total", checkout: "Checkout",
    shippingPayment: "Shipping & Payment", fullName: "Full Name", email: "Email Address",
    address: "Shipping Address", card: "Card Number", placeOrder: "Place Order",
    order: "Order", items: "items", orderConfirmed: "Order Confirmed",
    thankYou: "Thank you,", confirmation: "Your order has been confirmed. A confirmation has been sent to",
    yourEmail: "your email", estDelivery: "Estimated delivery:", deliveryDays: "3–5 business days",
    backToStore: "Back to Store", size: "Size", each: "each",
    errName: "Required", errEmail: "Invalid email", errAddress: "Required", errCard: "Enter a valid card number",
    orderSummary: "Order Summary", backToCart: "Back to Cart",
    prod1_d: "Elite football boots engineered for total control. Laceless design with Primeknit upper for a sock-like fit and explosive first touch.",
    prod2_d: "Designed for pure speed. The ultra-thin Flyknit upper delivers a barefoot feel while the carbon fibre soleplate maximises energy return.",
    prod3_d: "The official Portugal 2024 home jersey. Sweat-wicking Dri-FIT ADV technology keeps you cool and dry during the most intense moments.",
    prod4_d: "The official match ball of the UEFA Champions League. Thermally bonded panels and a butyl bladder for consistent flight and touch.",
    prod5_d: "Professional-grade goalkeeper gloves with NC Excellent 3mm latex palm. Exceptional grip in all weather conditions.",
    prod6_d: "The France 2024 away kit featuring a stunning navy gradient design. Official Dri-FIT ADV technology for peak performance.",
    prod7_d: "Durable 32-panel training ball with a butyl inner tube for consistent bounce and shape retention through thousands of kicks.",
    prod8_d: "Nike's most precise boot ever. Textured touch zone and split outsole geometry for explosive multi-directional movement.",
    prod9_d: "Full compression top and shorts set with Dri-FIT technology. Designed to support muscles and enhance recovery during training.",
    prod10_d: "50-piece set of high-visibility training cones. Lightweight, stackable and perfect for agility drills and pitch marking.",
    prod11_d: "Lightweight EVA foam shin guards with anatomical shape. Ankle protection straps included for a secure, comfortable fit.",
    prod12_d: "Professional goalkeeper jersey with padded elbows for diving protection. Ultra-breathable mesh panels for maximum ventilation.",
  };

  interface Product {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    brand: string;
    image: string;
    category: string;
    badge?: string;
    rating: number;
    reviews: number;
    sizes: string[];
    description: string;
  }
  interface CartItem extends Product { quantity: number; selectedSize: string; }

  const [view, setView] = useState<'shop'|'product'|'cart'|'checkout'|'success'>('shop');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product|null>(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [sizeError, setSizeError] = useState(false);
  const [sortBy, setSortBy] = useState<'featured'|'price-asc'|'price-desc'>('featured');
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [checkoutForm, setCheckoutForm] = useState({ name:'', email:'', address:'', card:'' });
  const [checkoutErrors, setCheckoutErrors] = useState<Record<string,string>>({});
  const [addedId, setAddedId] = useState<number|null>(null);

  const products: Product[] = [
    { id:1, name:"Predator Elite FG", price:250, originalPrice:320, brand:"Adidas", category:"Boots",
      badge:"Sale", rating:4.8, reviews:312,
      sizes:["39","40","41","42","43","44","45"],
      description: t.prod1_d,
      image:"/Pedradator.png" },
    { id:2, name:"Mercurial Vapor 16 Elite", price:275, brand:"Nike", category:"Boots",
      badge:"New", rating:4.9, reviews:198,
      sizes:["38","39","40","41","42","43","44"],
      description: t.prod2_d,
      image:"/Mercurial.png" },
    { id:3, name:"Portugal 24 Home Kit", price:140, brand:"Nike", category:"Kits",
      badge:"Hot", rating:4.7, reviews:540,
      sizes:["XS","S","M","L","XL","XXL"],
      description: t.prod3_d,
      image:"/Portugalkit.png" },
    { id:4, name:"UCL Pro Ball", price:165, brand:"Adidas", category:"Balls",
      rating:4.6, reviews:87,
      sizes:["Size 4","Size 5"],
      description: t.prod4_d,
      image:"/UCLBola.png" },
    { id:5, name:"Phantom GK Elite", price:95, brand:"Reusch", category:"Goalkeeper",
      rating:4.5, reviews:63,
      sizes:["7","8","9","10","11"],
      description: t.prod5_d,
      image:"/luvas.png" },
    { id:6, name:"France Away Kit", price:130, originalPrice:150, brand:"Nike", category:"Kits",
      badge:"Sale", rating:4.4, reviews:221,
      sizes:["XS","S","M","L","XL","XXL"],
      description: t.prod6_d,
      image:"/Francefora.png" },
    { id:7, name:"Pro Training Ball", price:45, brand:"Adidas", category:"Balls",
      rating:4.3, reviews:145,
      sizes:["Size 4","Size 5"],
      description: t.prod7_d,
      image:"/bolatreino.png" },
    { id:8, name:"Phantom Luna Elite FG", price:230, brand:"Nike", category:"Boots",
      badge:"New", rating:4.8, reviews:76,
      sizes:["36","37","38","39","40","41","42"],
      description: t.prod8_d,
      image:"/luna.png" },
    { id:9, name:"Training Compression Set", price:75, brand:"Nike", category:"Training",
      rating:4.5, reviews:189,
      sizes:["S","M","L","XL"],
      description: t.prod9_d,
      image:"/kittreino.png" },
    { id:10, name:"Speed Training Cones Set", price:25, brand:"Generic", category:"Training",
      rating:4.2, reviews:302,
      sizes:["One Size"],
      description: t.prod10_d,
      image:"/cones.png" },
    { id:11, name:"Elite Shin Guards", price:55, brand:"Adidas", category:"Accessories",
      rating:4.6, reviews:93,
      sizes:["S","M","L","XL"],
      description: t.prod11_d,
      image:"/caneleira.png" },
    { id:12, name:"Goalkeeper Jersey Pro", price:85, brand:"Reusch", category:"Goalkeeper",
      rating:4.3, reviews:41,
      sizes:["S","M","L","XL","XXL"],
      description: t.prod12_d,
      image:"/gredes.png" },
  ];

  const categories = ['All','Boots','Kits','Balls','Goalkeeper','Training','Accessories'];
  const categoryLabels: Record<string, string> = {
    All: t.catAll, Boots: t.catBoots, Kits: t.catKits, Balls: t.catBalls,
    Goalkeeper: t.catGoalkeeper, Training: t.catTraining, Accessories: t.catAccessories,
  };

  const addToCart = (product: Product, size: string) => {
    setCart(prev => {
      const key = `${product.id}-${size}`;
      const existing = prev.find(i => `${i.id}-${i.selectedSize}` === key);
      if (existing) return prev.map(i => `${i.id}-${i.selectedSize}` === key ? {...i, quantity: i.quantity+1} : i);
      return [...prev, {...product, quantity:1, selectedSize:size}];
    });
    setAddedId(product.id);
    setTimeout(() => setAddedId(null), 1200);
  };

  const removeFromCart = (id: number, size: string) =>
    setCart(prev => prev.filter(i => !(i.id===id && i.selectedSize===size)));

  const updateQuantity = (id: number, size: string, delta: number) =>
    setCart(prev => prev.map(i => i.id===id && i.selectedSize===size
      ? {...i, quantity: Math.max(1, i.quantity+delta)} : i));

  const toggleWishlist = (id: number) =>
    setWishlist(prev => prev.includes(id) ? prev.filter(x=>x!==id) : [...prev, id]);

  const total = cart.reduce((acc,i) => acc + i.price * i.quantity, 0);
  const cartCount = cart.reduce((acc,i) => acc + i.quantity, 0);
  const savings = cart.reduce((acc,i) => acc + ((i.originalPrice||i.price)-i.price)*i.quantity, 0);

  const filtered = products
    .filter(p => selectedCategory==='All' || p.category===selectedCategory)
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase()) || p.brand.toLowerCase().includes(search.toLowerCase()))
    .sort((a,b) => sortBy==='price-asc' ? a.price-b.price : sortBy==='price-desc' ? b.price-a.price : 0);

  const validateCheckout = () => {
    const e: Record<string,string> = {};
    if (!checkoutForm.name.trim()) e.name = t.errName;
    if (!checkoutForm.email.includes('@')) e.email = t.errEmail;
    if (!checkoutForm.address.trim()) e.address = t.errAddress;
    if (checkoutForm.card.replace(/\s/g,'').length < 16) e.card = t.errCard;
    return e;
  };

  return (
    <div className="h-full flex flex-col bg-[#f8f9fb] text-[#111] relative font-sans">

      {/* ── NAVBAR ── */}
      <nav className="bg-white border-b border-zinc-200 px-4 md:px-8 py-3 flex items-center gap-4 z-40 shrink-0">
        <div onClick={()=>{setView('shop');setSearch('');}} className="flex items-center gap-2.5 cursor-pointer mr-2 shrink-0">
          <div className="bg-black p-1.5 rounded-lg"><Trophy size={18} className="text-white"/></div>
          <div>
            <h1 className="font-black text-lg tracking-tight leading-none">ELARIS<span className="text-[#0066ff]">SPORT</span></h1>
            <p className="text-[8px] uppercase tracking-[0.3em] text-zinc-400 font-bold">{t.performanceStore}</p>
          </div>
        </div>

        {/* categories bar (desktop) */}
        <div className="hidden md:flex items-center gap-1 flex-1">
          {categories.map(cat => (
            <button key={cat} onClick={()=>setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all ${selectedCategory===cat ? 'bg-black text-white' : 'hover:bg-zinc-100 text-zinc-500'}`}>
              {categoryLabels[cat]}
            </button>
          ))}
        </div>

        {/* Search */}
        <div className="flex items-center bg-zinc-100 rounded-full px-3 py-2 w-[120px] md:w-[200px] ml-auto">
          <Search size={14} className="text-zinc-400 shrink-0"/>
          <input value={search} onChange={e=>setSearch(e.target.value)} placeholder={t.searchPlaceholder}
            className="bg-transparent outline-none px-2 text-xs w-full"/>
        </div>

        {/* Lang Toggle */}
        <div className="flex items-center gap-1">
          <button onClick={() => setLang("en")} className={`px-2.5 py-1 text-[9px] font-black uppercase tracking-widest rounded-full transition-all border ${lang === "en" ? "bg-[#0066ff] text-white border-[#0066ff]" : "border-zinc-300 text-zinc-400 hover:border-zinc-500"}`}>EN</button>
          <button onClick={() => setLang("pt")} className={`px-2.5 py-1 text-[9px] font-black uppercase tracking-widest rounded-full transition-all border ${lang === "pt" ? "bg-[#0066ff] text-white border-[#0066ff]" : "border-zinc-300 text-zinc-400 hover:border-zinc-500"}`}>PT</button>
        </div>

        {/* Wishlist */}
        <button onClick={()=>{}} className="relative p-2">
          <Heart size={20} className="text-zinc-500"/>
          {wishlist.length>0 && <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">{wishlist.length}</span>}
        </button>

        {/* Cart */}
        <button onClick={()=>setView('cart')} className="relative flex items-center gap-2 bg-black hover:bg-[#0066ff] text-white px-4 py-2 rounded-full transition-all text-xs font-black uppercase tracking-widest shrink-0">
          <ShoppingBag size={16}/>
          <span className="hidden sm:block">{t.cart}</span>
          {cartCount>0 && <span className="absolute -top-2 -right-2 bg-[#0066ff] text-white text-[9px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white">{cartCount}</span>}
        </button>
      </nav>

      {/* ── MAIN CONTENT ── */}
      <div className="flex-1 overflow-y-auto [&::-webkit-scrollbar]:hidden [scrollbar-width:none]">
        <AnimatePresence mode="wait">

          {/* SHOP */}
          {view==='shop' && (
            <motion.div key="shop" initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}>

              {/* Hero Banner */}
              <div className="relative h-[200px] bg-black overflow-hidden">
                <img src="/lojafundo.png"
                  className="absolute inset-0 w-full h-full object-cover opacity-50"/>
                <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent"/>
                <div className="relative z-10 h-full flex flex-col justify-center px-8 md:px-14 text-white">
                  
                  <h2 className="text-1xl md:text-2xl font-black leading-tight mb-5">
                    {t.heroTitle1}<br/>
                    <span className="text-[#0066ff]">{t.heroTitle2}</span>
                  </h2>
                  
                  <div className="flex gap-3">
                    <button onClick={()=>setSelectedCategory('Boots')} className="px-6 py-2.5 bg-[#0066ff] hover:bg-white hover:text-black text-white font-black text-[10px] uppercase tracking-widest rounded-full transition-all">
                      {t.shopBoots}
                    </button>
                    <button onClick={()=>setSelectedCategory('Kits')} className="px-6 py-2.5 border border-white/40 hover:bg-white hover:text-black text-white font-black text-[10px] uppercase tracking-widest rounded-full transition-all">
                      {t.shopKits}
                    </button>
                  </div>
                </div>
                {/* sale badge */}
                <div className="absolute top-6 right-8 bg-red-600 text-white px-4 py-2 rounded-xl text-center shadow-xl">
                  <div className="text-xl font-black leading-none">-20%</div>
                  <div className="text-[9px] uppercase tracking-widest font-bold">{t.onBoots}</div>
                </div>
              </div>

              {/* Mobile categories */}
              <div className="md:hidden bg-white border-b border-zinc-200 px-4 py-3 sticky top-0 z-20">
                <div className="flex gap-2 overflow-x-auto no-scrollbar">
                  {categories.map(cat => (
                    <button key={cat} onClick={()=>setSelectedCategory(cat)}
                      className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all shrink-0 ${selectedCategory===cat ? 'bg-black text-white' : 'bg-zinc-100'}`}>
                      {categoryLabels[cat]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Toolbar */}
              <div className="px-6 md:px-10 py-4 flex items-center justify-between">
                <p className="text-xs text-zinc-400 font-bold">{filtered.length} {t.products}</p>
                <select value={sortBy} onChange={e=>setSortBy(e.target.value as 'featured' | 'price-asc' | 'price-desc')}
                  className="text-xs bg-white border border-zinc-200 rounded-lg px-3 py-2 outline-none font-bold cursor-pointer">
                  <option value="featured">{t.featured}</option>
                  <option value="price-asc">{t.priceLow}</option>
                  <option value="price-desc">{t.priceHigh}</option>
                </select>
              </div>

              {/* Products Grid */}
              <div className="px-6 md:px-10 pb-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {filtered.length===0 && (
                  <div className="col-span-4 text-center py-20 text-zinc-400">
                    <Search size={40} className="mx-auto mb-4 opacity-30"/>
                    <p className="font-bold">{t.noProducts} &quot;{search}&quot;</p>
                  </div>
                )}
                {filtered.map(item => (
                  <motion.div key={item.id} whileHover={{y:-4}} transition={{duration:0.2}}
                    className="bg-white rounded-2xl overflow-hidden border border-zinc-200 hover:border-[#0066ff]/30 hover:shadow-xl transition-all group cursor-pointer"
                    onClick={()=>{setSelectedProduct(item);setSelectedSize('');setSizeError(false);setView('product');}}>
                    <div className="relative h-52 bg-zinc-50 overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                      {item.badge && (
                        <span className={`absolute top-2 left-2 text-white text-[9px] font-black px-2.5 py-1 rounded-full uppercase tracking-wider ${item.badge==='Sale'?'bg-red-500':item.badge==='New'?'bg-[#0066ff]':'bg-amber-500'}`}>
                          {item.badge}
                        </span>
                      )}
                      <button onClick={e=>{e.stopPropagation();toggleWishlist(item.id);}}
                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow transition-all hover:scale-110">
                        <Heart size={14} className={wishlist.includes(item.id) ? 'text-rose-500 fill-rose-500' : 'text-zinc-400'}/>
                      </button>
                      {addedId===item.id && (
                        <div className="absolute inset-0 bg-[#0066ff]/90 flex items-center justify-center">
                          <CheckCircle2 size={40} className="text-white"/>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="text-[9px] font-black uppercase tracking-widest text-[#0066ff] mb-2">{item.brand} · {item.category}</p>
                      <h4 className="font-black text-sm leading-snug mb-3 min-h-[36px]">{item.name}</h4>
                      <div className="flex items-center gap-1.5 mb-3">
                        <Stars rating={item.rating}/>
                        <span className="text-[10px] text-zinc-400">({item.reviews})</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <span className="text-lg font-black">€{item.price}</span>
                          {item.originalPrice && <span className="text-xs text-zinc-400 line-through ml-1">€{item.originalPrice}</span>}
                        </div>
                        <button onClick={e=>{e.stopPropagation();if(item.sizes.length===1){addToCart(item,item.sizes[0]);}else{setSelectedProduct(item);setSelectedSize('');setSizeError(false);setView('product');}}}
                          className="w-8 h-8 bg-black hover:bg-[#0066ff] text-white rounded-xl flex items-center justify-center transition-all">
                          <Plus size={16}/>
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* PRODUCT DETAIL */}
          {view==='product' && selectedProduct && (
            <motion.div key="product" initial={{opacity:0,x:20}} animate={{opacity:1,x:0}} exit={{opacity:0}} className="p-6 md:p-10 max-w-5xl mx-auto">
              <button onClick={()=>setView('shop')} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-black mb-8 transition-colors">
                <ArrowLeft size={16}/> {t.backToShop}
              </button>
              <div className="grid md:grid-cols-2 gap-10">
                {/* Image */}
                <div className="bg-zinc-100 rounded-3xl overflow-hidden h-[380px]">
                  <img src={selectedProduct.image} className="w-full h-full object-cover"/>
                </div>
                {/* Info */}
                <div className="flex flex-col justify-center">
                  {selectedProduct.badge && (
                    <span className={`self-start text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest mb-3 ${selectedProduct.badge==='Sale'?'bg-red-500':selectedProduct.badge==='New'?'bg-[#0066ff]':'bg-amber-500'}`}>
                      {selectedProduct.badge}
                    </span>
                  )}
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#0066ff] mb-2">{selectedProduct.brand} · {selectedProduct.category}</p>
                  <h2 className="text-3xl font-black mb-3">{selectedProduct.name}</h2>
                  <div className="flex items-center gap-2 mb-4">
                    <Stars rating={selectedProduct.rating}/>
                    <span className="text-xs text-zinc-500">{selectedProduct.rating} · {selectedProduct.reviews} {t.reviews}</span>
                  </div>
                  <p className="text-zinc-500 text-sm leading-relaxed mb-6">{selectedProduct.description}</p>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-3xl font-black">€{selectedProduct.price}</span>
                    {selectedProduct.originalPrice && <>
                      <span className="text-lg text-zinc-400 line-through">€{selectedProduct.originalPrice}</span>
                      <span className="bg-red-100 text-red-600 text-xs font-black px-2 py-0.5 rounded-full">-{Math.round((1-selectedProduct.price/selectedProduct.originalPrice)*100)}%</span>
                    </>}
                  </div>
                  {/* Size picker */}
                  <div className="mb-6">
                    <p className="text-[10px] font-black uppercase tracking-widest mb-3 flex items-center gap-2">
                      {t.selectSize}
                      {sizeError && <span className="text-red-500 normal-case font-normal">{t.pleaseSelectSize}</span>}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.sizes.map(s => (
                        <button key={s} onClick={()=>{setSelectedSize(s);setSizeError(false);}}
                          className={`px-4 py-2 rounded-xl text-sm font-bold border-2 transition-all ${selectedSize===s ? 'bg-black text-white border-black' : 'border-zinc-200 hover:border-black'}`}>
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={()=>{
                      if(!selectedSize){setSizeError(true);return;}
                      addToCart(selectedProduct, selectedSize);
                      setView('shop');
                    }} className="flex-1 py-4 bg-black hover:bg-[#0066ff] text-white font-black uppercase tracking-widest text-xs rounded-2xl transition-all flex items-center justify-center gap-2">
                      <ShoppingBag size={16}/> {t.addToCart}
                    </button>
                    <button onClick={()=>toggleWishlist(selectedProduct.id)}
                      className={`w-14 h-14 rounded-2xl border-2 flex items-center justify-center transition-all ${wishlist.includes(selectedProduct.id) ? 'border-rose-500 bg-rose-50' : 'border-zinc-200 hover:border-rose-400'}`}>
                      <Heart size={20} className={wishlist.includes(selectedProduct.id) ? 'text-rose-500 fill-rose-500' : 'text-zinc-400'}/>
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* CART */}
          {view==='cart' && (
            <motion.div key="cart" initial={{opacity:0,x:40}} animate={{opacity:1,x:0}} exit={{opacity:0}} className="p-6 md:p-10 max-w-5xl mx-auto">
              <div className="flex items-center justify-between mb-8">
                <h2 className="text-3xl font-black">{t.yourCart} <span className="text-zinc-300 text-2xl">({cartCount})</span></h2>
                <button onClick={()=>setView('shop')} className="text-xs font-black uppercase tracking-widest text-[#0066ff] flex items-center gap-1 hover:gap-2 transition-all">
                  <ArrowLeft size={14}/> {t.continueShopping}
                </button>
              </div>
              {cart.length===0 ? (
                <div className="bg-white rounded-3xl p-20 text-center border border-zinc-200">
                  <ShoppingBasket size={52} className="mx-auto text-zinc-300 mb-5"/>
                  <h3 className="text-2xl font-black mb-2">{t.cartEmpty}</h3>
                  <p className="text-zinc-400 mb-8">{t.cartEmptySub}</p>
                  <button onClick={()=>setView('shop')} className="px-8 py-3 bg-black text-white font-black uppercase tracking-widest text-xs rounded-full hover:bg-[#0066ff] transition-all">
                    {t.browseProducts}
                  </button>
                </div>
              ) : (
                <div className="grid lg:grid-cols-[1fr_320px] gap-6">
                  <div className="space-y-4">
                    {cart.map(item => (
                      <div key={`${item.id}-${item.selectedSize}`} className="bg-white rounded-2xl p-4 flex gap-4 border border-zinc-200">
                        <img src={item.image} className="w-24 h-24 rounded-xl object-cover shrink-0"/>
                        <div className="flex-1 min-w-0">
                          <p className="text-[9px] font-black uppercase tracking-widest text-[#0066ff]">{item.brand}</p>
                          <h4 className="font-black text-sm mt-0.5 truncate">{item.name}</h4>
                          <p className="text-xs text-zinc-400 mt-0.5">{t.size}: <span className="font-bold text-zinc-600">{item.selectedSize}</span></p>
                          <div className="flex items-center gap-3 mt-3">
                            <div className="flex items-center bg-zinc-100 rounded-full overflow-hidden">
                              <button onClick={()=>updateQuantity(item.id,item.selectedSize,-1)} className="px-3 py-1.5 hover:bg-zinc-200 transition-all"><Minus size={12}/></button>
                              <span className="px-3 text-sm font-black">{item.quantity}</span>
                              <button onClick={()=>updateQuantity(item.id,item.selectedSize,1)} className="px-3 py-1.5 hover:bg-zinc-200 transition-all"><Plus size={12}/></button>
                            </div>
                            <button onClick={()=>removeFromCart(item.id,item.selectedSize)} className="text-zinc-300 hover:text-red-500 transition-colors"><Trash2 size={16}/></button>
                          </div>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="font-black text-lg">€{item.price*item.quantity}</p>
                          {item.quantity>1 && <p className="text-xs text-zinc-400">€{item.price} {t.each}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                  {/* Order Summary */}
                  <div className="bg-white rounded-3xl border border-zinc-200 p-6 h-fit sticky top-4">
                    <h3 className="font-black text-xl mb-6">{t.orderSummary}</h3>
                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between text-sm"><span className="text-zinc-500">{t.subtotal}</span><span className="font-bold">€{total}</span></div>
                      {savings>0 && <div className="flex justify-between text-sm"><span className="text-zinc-500">{t.savings}</span><span className="font-bold text-green-600">-€{savings}</span></div>}
                      <div className="flex justify-between text-sm"><span className="text-zinc-500">{t.shipping}</span><span className="font-bold text-green-600">{total>=100?t.free:'€5.99'}</span></div>
                    </div>
                    {total<100 && <div className="bg-blue-50 border border-blue-200 rounded-xl p-3 mb-4 text-xs text-blue-700 font-bold">{t.addMore} €{(100-total).toFixed(0)} {t.moreForFree}</div>}
                    <div className="border-t pt-4 flex justify-between items-center mb-6">
                      <span className="font-black text-lg">{t.total}</span>
                      <span className="text-2xl font-black">€{total<100?(total+5.99).toFixed(2):total}</span>
                    </div>
                    <button onClick={()=>setView('checkout')} className="w-full py-4 bg-black hover:bg-[#0066ff] text-white font-black uppercase tracking-widest text-xs rounded-2xl transition-all">
                      {t.checkout}
                    </button>
                    <button onClick={()=>setView('shop')} className="w-full py-3 text-zinc-400 hover:text-black text-xs font-bold uppercase tracking-widest transition-colors mt-3">
                      {t.continueShopping}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {/* CHECKOUT */}
          {view==='checkout' && (
            <motion.div key="checkout" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="p-6 md:p-10 max-w-4xl mx-auto">
              <button onClick={()=>setView('cart')} className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-black mb-8 transition-colors">
                <ArrowLeft size={16}/> {t.backToCart}
              </button>
              <div className="grid md:grid-cols-[1fr_280px] gap-8">
                <div className="bg-white rounded-3xl border border-zinc-200 p-8">
                  <h2 className="text-2xl font-black mb-8">{t.shippingPayment}</h2>
                  <div className="space-y-6">
                    {[
                      {field:'name', label:t.fullName, placeholder:'John Doe', type:'text'},
                      {field:'email', label:t.email, placeholder:'john@example.com', type:'email'},
                      {field:'address', label:t.address, placeholder:'123 Main St, Lisbon, Portugal', type:'text'},
                      {field:'card', label:t.card, placeholder:'1234 5678 9012 3456', type:'text'},
                    ].map(({field,label,placeholder,type}) => (
                      <div key={field}>
                        <label className="text-[10px] font-black uppercase tracking-widest text-[#0066ff] block mb-2">{label} *</label>
                        <input type={type} placeholder={placeholder}
                          value={checkoutForm[field as keyof typeof checkoutForm]}
                          onChange={e=>{
                            const val = field==='card'
                              ? e.target.value.replace(/\D/g,'').slice(0,16).replace(/(.{4})/g,'$1 ').trim()
                              : e.target.value;
                            setCheckoutForm(p=>({...p,[field]:val}));
                            setCheckoutErrors(p=>({...p,[field]:''}));
                          }}
                          className={`w-full border-b-2 py-3 outline-none bg-transparent text-sm transition-colors ${checkoutErrors[field] ? 'border-red-400' : 'border-zinc-200 focus:border-[#0066ff]'}`}
                        />
                        {checkoutErrors[field] && <p className="text-red-500 text-[10px] mt-1">{checkoutErrors[field]}</p>}
                      </div>
                    ))}
                    <button onClick={()=>{
                      const errs = validateCheckout();
                      setCheckoutErrors(errs);
                      if(Object.keys(errs).length===0) setView('success');
                    }} className="w-full py-4 bg-black hover:bg-[#0066ff] text-white font-black uppercase tracking-widest text-xs rounded-2xl transition-all mt-4">
                      {t.placeOrder} · €{total<100?(total+5.99).toFixed(2):total}
                    </button>
                  </div>
                </div>
                {/* Mini summary */}
                <div className="bg-white rounded-3xl border border-zinc-200 p-6 h-fit">
                  <h3 className="font-black mb-4 text-sm uppercase tracking-wider">{t.order} ({cartCount} {t.items})</h3>
                  <div className="space-y-3 max-h-64 overflow-y-auto">
                    {cart.map(item => (
                      <div key={`${item.id}-${item.selectedSize}`} className="flex gap-3">
                        <img src={item.image} className="w-12 h-12 rounded-lg object-cover shrink-0"/>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold truncate">{item.name}</p>
                          <p className="text-[10px] text-zinc-400">×{item.quantity} · {item.selectedSize}</p>
                        </div>
                        <p className="text-sm font-black shrink-0">€{item.price*item.quantity}</p>
                      </div>
                    ))}
                  </div>
                  <div className="border-t mt-4 pt-4 flex justify-between font-black">
                    <span>{t.total}</span>
                    <span>€{total<100?(total+5.99).toFixed(2):total}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* SUCCESS */}
          {view==='success' && (
            <motion.div key="success" initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} exit={{opacity:0}}
              className="h-full flex flex-col items-center justify-center text-center p-10">
              <motion.div initial={{scale:0}} animate={{scale:1}} transition={{type:'spring',delay:0.1}}
                className="w-24 h-24 rounded-full bg-[#0066ff] flex items-center justify-center mb-8 shadow-2xl shadow-blue-200">
                <CheckCircle2 size={46} className="text-white"/>
              </motion.div>
              <span className="text-[#0066ff] text-[10px] font-black uppercase tracking-[0.4em] mb-4">{t.orderConfirmed}</span>
              <h2 className="text-5xl font-black leading-tight mb-4">{t.thankYou}<br/>{checkoutForm.name.split(' ')[0] || 'Athlete'}!</h2>
              <p className="text-zinc-400 max-w-md mb-2">{t.confirmation} <span className="font-bold text-zinc-600">{checkoutForm.email||t.yourEmail}</span>.</p>
              <p className="text-zinc-400 text-sm mb-10">{t.estDelivery} <span className="font-bold text-zinc-600">{t.deliveryDays}</span></p>
              <button onClick={()=>{setCart([]);setView('shop');setCheckoutForm({name:'',email:'',address:'',card:''});}}
                className="px-12 py-4 bg-black hover:bg-[#0066ff] text-white font-black uppercase tracking-widest text-xs rounded-full transition-all">
                {t.backToStore}
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* --- BARBER BOOKING FORM (componente próprio para respeitar as regras dos hooks) --- */
/* -------------------------------------------------------------------------- */
type BarberService = { id: number; name: string; price: string; time: string; desc: string; tag: string };
type BarberTrans = {
  fullName: string; phone: string; date: string; service: string; schedule: string; confirm: string;
  selectService: string; namePlaceholder: string; back: string; bookSession: string; book: string;
  errName: string; errPhone: string; errDate: string; errService: string; errTime: string;
};

function BarberBookingForm({ services, tBarber, setView, setUser }: {
  services: BarberService[];
  tBarber: BarberTrans;
  setView: (v: 'intro' | 'services' | 'book' | 'done') => void;
  setUser: (n: string) => void;
}) {
  const [bForm, setBForm] = useState({ name: "", phone: "", date: "", service: "", time: "" });
  const [bErrors, setBErrors] = useState<Record<string, string>>({});
  const [bTouched, setBTouched] = useState<Record<string, boolean>>({});

  const validateBook = (f: typeof bForm) => {
    const e: Record<string, string> = {};
    if (!f.name.trim()) e.name = tBarber.errName;
    if (!f.phone.trim()) e.phone = tBarber.errPhone;
    if (!f.date) e.date = tBarber.errDate;
    if (!f.service) e.service = tBarber.errService;
    if (!f.time) e.time = tBarber.errTime;
    return e;
  };

  const handleChange = (field: string, value: string) => {
    const next = { ...bForm, [field]: value };
    setBForm(next);
    if (bTouched[field]) setBErrors(validateBook(next));
  };

  const handleBlur = (field: string) => {
    setBTouched(prev => ({ ...prev, [field]: true }));
    setBErrors(validateBook(bForm));
  };

  const handleSubmit = () => {
    const allTouched = Object.fromEntries(Object.keys(bForm).map(k => [k, true]));
    setBTouched(allTouched);
    const errs = validateBook(bForm);
    setBErrors(errs);
    if (Object.keys(errs).length === 0) {
      setUser(bForm.name);
      setView('done');
    }
  };

  const fieldCls = (field: string) =>
    `w-full bg-white/[0.04] border outline-none px-5 py-4 text-sm transition-all placeholder:text-white/20 ${bErrors[field] && bTouched[field] ? "border-red-500 text-red-400" : "border-white/[0.08] focus:border-amber-500"}`;

  return (
    <motion.div key="book" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-8 md:p-16 flex items-start justify-center min-h-full">
      <div className="w-full max-w-2xl">
        <button onClick={() => setView('intro')} className="flex items-center gap-2 text-white/30 hover:text-amber-400 text-[10px] uppercase tracking-widest font-black transition-colors mb-10">
          <ArrowLeft size={12} /> {tBarber.back}
        </button>

        <span className="text-amber-500 text-[9px] uppercase tracking-[0.5em] font-black block mb-4">{tBarber.book}</span>
        <h2 className="text-4xl md:text-5xl font-black mb-12 leading-tight">
          {tBarber.bookSession}<span className="text-amber-500">.</span>
        </h2>

        <div className="space-y-5">
          <div>
            <label className="text-[9px] uppercase tracking-[0.4em] font-black text-white/40 block mb-2">{tBarber.fullName} *</label>
            <input
              className={fieldCls("name")}
              placeholder={tBarber.namePlaceholder}
              value={bForm.name}
              onChange={e => handleChange("name", e.target.value)}
              onBlur={() => handleBlur("name")}
            />
            {bErrors.name && bTouched.name && <p className="text-red-400 text-[9px] mt-1">{bErrors.name}</p>}
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="text-[9px] uppercase tracking-[0.4em] font-black text-white/40 block mb-2">{tBarber.phone} *</label>
              <input
                className={fieldCls("phone")}
                placeholder="+351 912..."
                value={bForm.phone}
                onChange={e => handleChange("phone", e.target.value)}
                onBlur={() => handleBlur("phone")}
                inputMode="tel"
              />
              {bErrors.phone && bTouched.phone && <p className="text-red-400 text-[9px] mt-1">{bErrors.phone}</p>}
            </div>
            <div>
              <label className="text-[9px] uppercase tracking-[0.4em] font-black text-white/40 block mb-2">{tBarber.date} *</label>
              <input
                type="date"
                className={fieldCls("date") + " text-white/60"}
                value={bForm.date}
                onChange={e => handleChange("date", e.target.value)}
                onBlur={() => handleBlur("date")}
              />
              {bErrors.date && bTouched.date && <p className="text-red-400 text-[9px] mt-1">{bErrors.date}</p>}
            </div>
          </div>

          <div>
            <label className="text-[9px] uppercase tracking-[0.4em] font-black text-white/40 block mb-2">{tBarber.service} *</label>
            <select
              className={fieldCls("service") + " text-white/60 appearance-none cursor-pointer"}
              value={bForm.service}
              onChange={e => handleChange("service", e.target.value)}
              onBlur={() => handleBlur("service")}
            >
              <option value="" className="bg-[#111]">{tBarber.selectService}</option>
              {services.map((s) => (
                <option key={s.id} value={s.name} className="bg-[#111]">{s.name} — {s.price}</option>
              ))}
            </select>
            {bErrors.service && bTouched.service && <p className="text-red-400 text-[9px] mt-1">{bErrors.service}</p>}
          </div>

          <div>
            <label className="text-[9px] uppercase tracking-[0.4em] font-black text-white/40 block mb-3">{tBarber.schedule} *</label>
            <div className="grid grid-cols-4 gap-2">
              {["10:00","11:00","14:00","15:00","16:00","17:00","18:00","19:00"].map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => handleChange("time", slot)}
                  className={`py-2.5 border text-[10px] font-black transition-all ${bForm.time === slot ? "border-amber-500 text-amber-400 bg-amber-500/10" : "border-white/[0.08] text-white/40 hover:border-amber-500 hover:text-amber-400"}`}
                >
                  {slot}
                </button>
              ))}
            </div>
            {bErrors.time && bTouched.time && <p className="text-red-400 text-[9px] mt-2">{bErrors.time}</p>}
          </div>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full mt-10 py-5 bg-amber-500 text-black font-black uppercase tracking-[0.35em] text-[11px] hover:bg-white transition-all"
        >
          {tBarber.confirm}
        </button>
      </div>
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */
/* --- 3. BARBEARIA ELARIS — WORLD CLASS EDITION --- */
/* -------------------------------------------------------------------------- */
function AsgardBarberApp() {
  const [lang, setLang] = useState<Lang>("en");
  const tBarber = {
    en: {
      services: "Services", team: "Team", book: "Book",
      fullName: "Full Name", phone: "Phone", date: "Date",
      service: "Service", schedule: "Schedule", confirm: "Confirm Booking",
      selectService: "Select service", namePlaceholder: "Your name",
      errName: "Full name required", errPhone: "Phone required",
      errDate: "Date required", errService: "Select a service",
      errTime: "Select a time slot",
      back: "Back", bookSession: "Book Session",
      bookNow: "Book Session", viewServices: "View Services", recognized: "Recognized",
      yearsExc: "Years of Excellence", intlCities: "International Cities",
      happyClients: "Happy Clients", masterBarbers: "Master Barbers",
      ourTeam: "Our Team", experience: "experience",
      testimonials: "Testimonials", clientsSay: "What clients say",
      premiumServices: "Premium Services", theExperience: "The Experience",
      bookThisService: "Book This Service",
      bookingConfirmed: "Booking Confirmed", seeYou: "SEE YOU",
      sessionBooked: "Your premium session is booked",
      welcomeMsg: "Welcome to the highest international grooming standard.",
      backHome: "Back to Home",
      barberHouse: "Barber House",
      role1: "Head Barber • Dubai", role2: "Master Cut • Porto", role3: "Razor Specialist • London",
      tagBestseller: "Bestseller", tagPremium: "Premium", tagElite: "Elite", tagWellness: "Wellness",
      testimonial1: "The best barbershop experience I've ever had. Truly international level.",
      testimonial2: "From the moment you walk in, you know this is different class. World-class precision.",
      testimonial3: "I've been to barbers in Mayfair, Soho, NYC — Elaris beats them all.",
      luxuryGroomingHouse: "Luxury Grooming House",
      copyright: "© 2026 Elaris Group",
      heroLine1: "THE CRAFT", heroLine2: "OF MEN.",
      top10: "Top 10 Barbers", gqBadge: "GQ Magazine · 2025",
      teamHeading: "Master Barbers",
    },
    pt: {
      services: "Serviços", team: "Equipa", book: "Reservar",
      fullName: "Nome Completo", phone: "Telefone", date: "Data",
      service: "Serviço", schedule: "Horário", confirm: "Confirmar Reserva",
      selectService: "Selecionar serviço", namePlaceholder: "O teu nome",
      errName: "Nome completo obrigatório", errPhone: "Telefone obrigatório",
      errDate: "Data obrigatória", errService: "Seleciona um serviço",
      errTime: "Seleciona um horário",
      back: "Voltar", bookSession: "Marcar Sessão",
      bookNow: "Marcar Sessão", viewServices: "Ver Serviços", recognized: "Reconhecido",
      yearsExc: "Anos de Excelência", intlCities: "Cidades Internacionais",
      happyClients: "Clientes Satisfeitos", masterBarbers: "Master Barbers",
      ourTeam: "A Nossa Equipa", experience: "experiência",
      testimonials: "Testemunhos", clientsSay: "O que dizem os clientes",
      premiumServices: "Serviços Premium", theExperience: "A Experiência",
      bookThisService: "Reservar Este Serviço",
      bookingConfirmed: "Reserva Confirmada", seeYou: "ATÉ JÁ",
      sessionBooked: "A tua sessão premium está marcada",
      welcomeMsg: "Bem-vindo ao padrão mais alto da barbearia internacional.",
      backHome: "Voltar ao Início",
      barberHouse: "Barber House",
      role1: "Chefe de Barbeiros • Dubai", role2: "Master Cut • Porto", role3: "Especialista em Navalha • Londres",
      tagBestseller: "Mais Vendido", tagPremium: "Premium", tagElite: "Elite", tagWellness: "Bem-Estar",
      testimonial1: "A melhor experiência de barbearia que já tive. Nível absolutamente internacional.",
      testimonial2: "Desde o momento em que entras, sabes que isto é outra classe. Precisão de nível mundial.",
      testimonial3: "Já fui a barbeiros em Mayfair, Soho, Nova York — Elaris supera-os todos.",
      luxuryGroomingHouse: "Casa de Grooming de Luxo",
      copyright: "© 2026 Elaris Group",
      heroLine1: "O OFÍCIO", heroLine2: "DOS HOMENS.",
      top10: "Top 10 Barbeiros", gqBadge: "GQ Magazine · 2025",
      teamHeading: "Master Barbeiros",
    },
  }[lang];
  const [view, setView] = useState<'intro' | 'services' | 'book' | 'done'>('intro');
  const [scrollToTeam, setScrollToTeam] = useState(false);
  const [user, setUser] = useState("");
  const [activeService, setActiveService] = useState<number | null>(null);
  const teamSectionRef = React.useRef<HTMLElement>(null);

  React.useEffect(() => {
    if (scrollToTeam && view === 'intro') {
      const timer = setTimeout(() => {
        teamSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setScrollToTeam(false);
      }, 80);
      return () => clearTimeout(timer);
    }
  }, [scrollToTeam, view]);

  const services = [
    {
 
      id: 1, name: "Signature Cut", time: "45 min", price: "€45", tag: "Bestseller",
      desc: lang === "en"
        ? "Precision cut by master barbers trained in London, Milan and New York. Finished with Baxter of California products."
        : "Corte de precisão executado por master barbers treinados em Londres, Milano e Nova York. Acabamento com produtos Baxter of California.",
    },
    {
      id: 2, name: "Royal Beard Ritual", time: "35 min", price: "€35", tag: "Premium",
      desc: lang === "en"
        ? "Complete beard ritual with traditional straight razor, hot eucalyptus towel, premium balms and high-detail contouring."
        : "Ritual completo de barba com navalha tradicional, toalha quente de eucalipto, bálsamos premium e contorno de alto detalhe.",
    },
    {
      id: 3, name: "Executive Package", time: "90 min", price: "€90", tag: "Elite",
      desc: lang === "en"
        ? "Full experience: cut, beard, men's facial treatment, scalp massage and styling with luxury products. The ultimate standard."
        : "Experiência total: corte, barba, tratamento facial masculino, scalp massage e styling com produtos de luxo. O standard máximo.",
    },
    {
      id: 4, name: "Scalp Ritual", time: "30 min", price: "€55", tag: "Wellness",
      desc: lang === "en"
        ? "Deep scalp treatment with imported essential oils, relaxation massage and revitalising tonic."
        : "Tratamento profundo do couro cabeludo com óleos essenciais importados, massagem de relaxamento e tónico revitalizante.",
    },
  ];

  const tagLabel: Record<string, string> = {
    Bestseller: tBarber.tagBestseller,
    Premium: tBarber.tagPremium,
    Elite: tBarber.tagElite,
    Wellness: tBarber.tagWellness,
  };

  const barbers = [
    { name: "Marcus Elaris", role: tBarber.role1, exp: "12y", img: "/barber1.png" },
    { name: "André Sousa", role: tBarber.role2, exp: "8y", img: "/barber2.png" },
    { name: "James Whitfield", role: tBarber.role3, exp: "15y", img: "/barber3.png" },
  ];

  const testimonials = [
    { name: "Rui Teixeira", city: "Porto", text: tBarber.testimonial1, stars: 5 },
    { name: "Ahmad Al-Rashid", city: "Dubai", text: tBarber.testimonial2, stars: 5 },
    { name: "George H.", city: "London", text: tBarber.testimonial3, stars: 5 },
  ];

  return (
    <div className="h-full flex flex-col bg-[#080808] text-white overflow-hidden relative font-sans">

      {/* AMBIENT LIGHT */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-b from-amber-900/20 to-transparent" />
        <div className="absolute top-[-30%] right-[-20%] w-[600px] h-[600px] rounded-full bg-red-900/8 blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-15%] w-[500px] h-[500px] rounded-full bg-amber-900/10 blur-[100px]" />
        {/* Grain texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }} />
      </div>

      {/* NAVBAR */}
      <nav className="relative z-30 px-6 md:px-14 py-5 flex items-center justify-between border-b border-white/[0.06] bg-black/60 backdrop-blur-2xl shrink-0">
        <div onClick={() => setView('intro')} className="cursor-pointer flex items-center gap-3 group">
          {/* Logo mark */}
          <div className="relative w-9 h-9 flex items-center justify-center">
            <div className="absolute inset-0 rounded-sm bg-gradient-to-br from-amber-400 to-amber-700 opacity-90" />
            <Scissors size={16} className="relative z-10 text-black" strokeWidth={2.5} />
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-white font-black text-lg tracking-widest">ELARIS</span>
              <span className="text-amber-500 text-xs font-black">®</span>
            </div>
            <span className="text-[8px] uppercase tracking-[0.45em] text-white/30 font-bold block -mt-0.5">
              {tBarber.barberHouse}
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-1">
          {[
            { label: tBarber.services, action: () => setView('services') },
            { label: tBarber.team, action: () => { setView('intro'); setScrollToTeam(true); } },
            { label: tBarber.book, action: () => setView('book'), primary: true },
          ].map((item) => (
            <button
              key={item.label}
              onClick={item.action}
              className={`px-5 py-2.5 text-[10px] font-black uppercase tracking-[0.25em] transition-all ${
                item.primary
                  ? 'bg-amber-500 text-black hover:bg-white ml-4 px-7'
                  : 'text-white/50 hover:text-white'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="flex items-center gap-1 ml-4">
            <button onClick={() => setLang("en")} className={`px-2.5 py-1 text-[9px] font-black uppercase tracking-widest rounded-full transition-all border ${lang === "en" ? "bg-amber-500 text-black border-amber-500" : "border-white/20 text-white/40 hover:border-white/40"}`}>EN</button>
            <button onClick={() => setLang("pt")} className={`px-2.5 py-1 text-[9px] font-black uppercase tracking-widest rounded-full transition-all border ${lang === "pt" ? "bg-amber-500 text-black border-amber-500" : "border-white/20 text-white/40 hover:border-white/40"}`}>PT</button>
          </div>
        </div>

        <div className="flex md:hidden items-center gap-3">
          <div className="flex items-center gap-1">
            <button onClick={() => setLang("en")} className={`px-2 py-1 text-[8px] font-black uppercase tracking-widest rounded-full transition-all border ${lang === "en" ? "bg-amber-500 text-black border-amber-500" : "border-white/20 text-white/40"}`}>EN</button>
            <button onClick={() => setLang("pt")} className={`px-2 py-1 text-[8px] font-black uppercase tracking-widest rounded-full transition-all border ${lang === "pt" ? "bg-amber-500 text-black border-amber-500" : "border-white/20 text-white/40"}`}>PT</button>
          </div>
          <button onClick={() => setView('book')} className="px-4 py-2 bg-amber-500 text-black text-[9px] font-black uppercase tracking-widest">
            {tBarber.book}
          </button>
        </div>
      </nav>

      {/* CONTENT */}
      <div className="flex-1 overflow-y-auto relative z-10 scrollbar-hide">
        <AnimatePresence mode="wait">

          {/* ── INTRO / HOME ── */}
          {view === 'intro' && (
            <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-full">

              {/* HERO */}
              <section className="relative h-[82vh] flex items-end overflow-hidden">
                <img
                  src="/barber.png"
                  className="absolute inset-0 w-full h-full object-cover opacity-50"
                  alt=""
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-transparent" />

                {/* Floating badge */}
                <div className="absolute top-8 right-8 border border-amber-500/40 bg-black/60 backdrop-blur-xl px-5 py-3 text-center hidden md:block">
                  <div className="text-amber-400 text-[9px] uppercase tracking-[0.4em] font-black mb-1">{tBarber.recognized}</div>
                  <div className="text-white text-xs font-bold">{tBarber.top10}</div>
                  <div className="text-white/40 text-[8px] uppercase tracking-widest mt-0.5">{tBarber.gqBadge}</div>
                </div>

                <div className="relative z-10 px-8 md:px-16 pb-16 w-full">
                  <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1, duration: 0.8 }}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="h-px w-12 bg-amber-500" />
                      <span className="text-amber-400 text-[9px] uppercase tracking-[0.6em] font-black">Dubai · London · Porto</span>
                    </div>
                    <h2 className="text-4xl sm:text-6xl md:text-[7rem] font-black leading-[0.9] tracking-tight mb-8 max-w-3xl">
                      {tBarber.heroLine1}
                      <br />
                      <span className="text-transparent" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.25)' }}>
                        {tBarber.heroLine2}
                      </span>
                    </h2>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <button onClick={() => setView('book')} className="px-10 py-4 bg-amber-500 text-black text-[11px] font-black uppercase tracking-[0.3em] hover:bg-white transition-all">
                        {tBarber.bookNow}
                      </button>
                      <button onClick={() => setView('services')} className="px-10 py-4 border border-white/20 text-[11px] font-black uppercase tracking-[0.3em] hover:border-amber-500 hover:text-amber-400 transition-all">
                        {tBarber.viewServices}
                      </button>
                    </div>
                  </motion.div>
                </div>
              </section>

              {/* STATS */}
              <section className="py-14 px-8 md:px-16 border-y border-white/[0.06]">
                <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
                  {[
                    { val: 20, suffix: "+", label: tBarber.yearsExc },
                    { val: 3, suffix: "", label: tBarber.intlCities },
                    { val: 98, suffix: "%", label: tBarber.happyClients },
                    { val: 12, suffix: "", label: tBarber.masterBarbers },
                  ].map((stat, i) => (
                    <div key={i} className={`text-center ${i < 3 ? 'md:border-r border-white/[0.06]' : ''}`}>
                      <div className="text-4xl md:text-5xl font-black text-amber-400 mb-2 tabular-nums">
                        <AnimatedCounter target={stat.val} duration={1800 + i * 200} suffix={stat.suffix} />
                      </div>
                      <div className="text-[9px] uppercase tracking-[0.35em] text-white/40 font-bold">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </section>

              {/* BARBERS */}
              <section ref={teamSectionRef} className="py-20 px-8 md:px-16">
                <div className="max-w-6xl mx-auto">
                  <div className="mb-14 flex items-end justify-between">
                    <div>
                      <span className="text-amber-500 text-[9px] uppercase tracking-[0.5em] font-black block mb-3">{tBarber.ourTeam}</span>
                      <h3 className="text-4xl md:text-5xl font-black leading-tight">
                        {tBarber.teamHeading}<span className="text-amber-500">.</span>
                      </h3>
                    </div>
                    <button onClick={() => setView('book')} className="hidden md:flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-amber-400 hover:text-white transition-colors">
                      {tBarber.book} <ChevronRight size={14} />
                    </button>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6">
                    {barbers.map((b, i) => (
                      <motion.div key={i} whileHover={{ y: -6 }} className="group relative overflow-hidden bg-white/[0.03] border border-white/[0.07] hover:border-amber-500/40 transition-all duration-500">
                        <div className="h-64 overflow-hidden">
                          <img src={b.img} className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 opacity-80" alt={b.name} />
                          <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent" />
                        </div>
                        <div className="p-6">
                          <div className="text-amber-400 text-[8px] uppercase tracking-[0.4em] font-black mb-1">{b.role}</div>
                          <h4 className="text-xl font-black">{b.name}</h4>
                          <div className="flex items-center gap-2 mt-3">
                            <div className="px-2 py-0.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[8px] uppercase tracking-widest font-bold">{b.exp} {tBarber.experience}</div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </section>

              {/* TESTIMONIALS */}
              <section className="py-20 px-8 md:px-16 bg-white/[0.02] border-y border-white/[0.05]">
                <div className="max-w-6xl mx-auto">
                  <div className="text-center mb-14">
                    <span className="text-amber-500 text-[9px] uppercase tracking-[0.5em] font-black block mb-3">{tBarber.testimonials}</span>
                    <h3 className="text-4xl font-black">{tBarber.clientsSay}<span className="text-amber-500">.</span></h3>
                  </div>
                  <div className="grid md:grid-cols-3 gap-6">
                    {testimonials.map((t, i) => (
                      <div key={i} className="p-8 border border-white/[0.07] bg-white/[0.02] hover:border-amber-500/30 transition-all">
                        <div className="flex gap-0.5 mb-5">
                          {[...Array(t.stars)].map((_, s) => (
                            <Star key={s} size={12} className="text-amber-400 fill-amber-400" />
                          ))}
                        </div>
                        <p className="text-white/70 text-sm leading-relaxed italic mb-6">&quot;{t.text}&quot;</p>
                        <div className="border-t border-white/[0.07] pt-5">
                          <div className="font-black text-sm">{t.name}</div>
                          <div className="text-white/30 text-[9px] uppercase tracking-widest mt-0.5">{t.city}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </section>

            </motion.div>
          )}

          {/* ── SERVICES ── */}
          {view === 'services' && (
            <motion.div key="services" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="p-8 md:p-16 max-w-7xl mx-auto">
              <div className="mb-16">
                <button onClick={() => setView('intro')} className="flex items-center gap-2 text-white/30 hover:text-amber-400 text-[10px] uppercase tracking-widest font-black transition-colors mb-10">
                  <ArrowLeft size={12} /> {tBarber.back}
                </button>
                <span className="text-amber-500 text-[9px] uppercase tracking-[0.5em] font-black block mb-4">{tBarber.premiumServices}</span>
                <h2 className="text-5xl md:text-7xl font-black leading-tight">
                  {tBarber.theExperience}<span className="text-amber-500">.</span>
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-5">
                {services.map((s, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ scale: 1.01 }}
                    onClick={() => setActiveService(activeService === s.id ? null : s.id)}
                    className={`group p-8 border cursor-pointer transition-all duration-300 ${
                      activeService === s.id
                        ? 'border-amber-500 bg-amber-500/5'
                        : 'border-white/[0.08] bg-white/[0.02] hover:border-amber-500/40'
                    }`}
                  >
                    <div className="flex justify-between items-start mb-6">
                      <span className={`text-[8px] uppercase tracking-[0.4em] font-black px-2 py-0.5 border ${
                        s.tag === 'Elite' ? 'text-amber-400 border-amber-500/30 bg-amber-500/10' :
                        s.tag === 'Bestseller' ? 'text-green-400 border-green-500/30 bg-green-500/10' :
                        'text-white/40 border-white/10'
                      }`}>
                        {tagLabel[s.tag] ?? s.tag}
                      </span>
                      <span className="text-2xl font-black text-amber-400">{s.price}</span>
                    </div>
                    <h3 className="text-2xl font-black mb-1 group-hover:text-amber-400 transition-colors">{s.name}</h3>
                    <div className="flex items-center gap-2 mb-4">
                      <Clock size={11} className="text-white/30" />
                      <span className="text-[9px] uppercase tracking-widest text-white/30 font-bold">{s.time}</span>
                    </div>
                    <AnimatePresence>
                      {activeService === s.id && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                          <p className="text-white/50 text-sm leading-relaxed mb-6 border-t border-white/[0.06] pt-4">{s.desc}</p>
                          <button
                            onClick={(e) => { e.stopPropagation(); setView('book'); }}
                            className="w-full py-3.5 bg-amber-500 text-black font-black uppercase tracking-[0.3em] text-[10px] hover:bg-white transition-all"
                          >
                            {tBarber.bookThisService}
                          </button>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                ))}
              </div>

              <div className="mt-10 text-center">
                <button onClick={() => setView('book')} className="px-14 py-5 bg-amber-500 text-black font-black uppercase tracking-[0.3em] text-[11px] hover:bg-white transition-all">
                  {tBarber.bookNow}
                </button>
              </div>
            </motion.div>
          )}

          {/* ── BOOK ── */}
          {view === 'book' && (
            <BarberBookingForm
              services={services}
              tBarber={tBarber}
              setView={setView}
              setUser={setUser}
            />
          )}

          {/* ── DONE ── */}
          {view === 'done' && (
            <motion.div
              key="done"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="min-h-full flex flex-col items-center justify-center text-center p-10"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.15 }}
                className="w-24 h-24 mb-10 bg-amber-500 flex items-center justify-center shadow-[0_0_80px_rgba(245,158,11,0.35)]"
              >
                <CheckCircle2 size={44} className="text-black" strokeWidth={2.5} />
              </motion.div>

              <span className="text-amber-400 text-[9px] uppercase tracking-[0.6em] font-black mb-5">
                {tBarber.bookingConfirmed}
              </span>

              <h2 className="text-6xl md:text-7xl font-black leading-none tracking-tight mb-6">
                {tBarber.seeYou}
                <span className="text-amber-500">.</span>
              </h2>

              <p className="text-white/40 text-lg max-w-lg leading-relaxed">
                {tBarber.sessionBooked}{user ? `, ${user}` : ""}. <br />
                {tBarber.welcomeMsg}
              </p>

              <div className="flex items-center gap-3 mt-10 text-[9px] uppercase tracking-widest text-white/20 font-black">
                <MapPin size={10} className="text-amber-500/60" />
                <span>Dubai · London · Porto</span>
              </div>

              <button
                onClick={() => setView('intro')}
                className="mt-12 px-12 py-4 border border-white/10 hover:border-amber-500 hover:text-amber-400 transition-all uppercase tracking-[0.3em] text-[10px] font-black"
              >
                {tBarber.backHome}
              </button>
            </motion.div>
          )}

        </AnimatePresence>
      </div>

      {/* FOOTER */}
      <footer className="relative z-20 border-t border-white/[0.05] bg-black/50 backdrop-blur-xl px-8 md:px-14 py-5 flex flex-col md:flex-row items-center justify-between gap-4 shrink-0">
        <div>
          <h3 className="font-black text-base tracking-widest flex items-baseline gap-0.5">
            ELARIS<span className="text-amber-500 text-lg">®</span>
          </h3>
          <p className="text-white/20 text-[8px] uppercase tracking-[0.4em] mt-0.5">{tBarber.luxuryGroomingHouse}</p>
        </div>

        <div className="flex items-center gap-6 text-[8px] uppercase tracking-[0.35em] font-bold text-white/20">
          <span>Dubai</span>
          <span className="text-amber-500/30">·</span>
          <span>London</span>
          <span className="text-amber-500/30">·</span>
          <span>Porto</span>
        </div>

        <div className="text-[8px] uppercase tracking-widest text-white/15 font-bold">
          {tBarber.copyright}
        </div>
      </footer>
    </div>
  );
}