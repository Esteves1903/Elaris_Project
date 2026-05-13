"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Code2, Cpu, Layers, X, Mouse, Smartphone, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import { useLang } from "@/context/LanguageContext";

function DemoSkeleton() {
  return (
    <div className="h-full w-full flex items-center justify-center bg-white/[0.02]">
      <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-white/50 animate-spin" />
    </div>
  );
}

const RestaurantDemo = dynamic(
  () => import("@/components/portfolio/RestaurantDemo").then(m => ({ default: m.RestaurantDemo })),
  { ssr: false, loading: () => <DemoSkeleton /> }
);

const FootballStoreDemo = dynamic(
  () => import("@/components/portfolio/FootballStoreDemo").then(m => ({ default: m.FootballStoreDemo })),
  { ssr: false, loading: () => <DemoSkeleton /> }
);

const BarberDemo = dynamic(
  () => import("@/components/portfolio/BarberDemo").then(m => ({ default: m.BarberDemo })),
  { ssr: false, loading: () => <DemoSkeleton /> }
);

function LazyDemo({ children, className }: { children: React.ReactNode; className: string }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { rootMargin: "300px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {visible ? children : <DemoSkeleton />}
    </div>
  );
}

type ProjectDetails = {
  title: string;
  stack: string[];
  description: string;
  logic: string[];
};

const technicalDetails = {
  en: {
    cafe: {
      title: "Helarys Restaurant",
      stack: ["React State", "Framer Motion", "Tailwind CSS"],
      description: "Restaurant application with table booking and digital menu visualization.",
      logic: ["Booking state management", "Menu category navigation", "Customer bill simulation"],
    },
    sport: {
      title: "Helarys Football Store",
      stack: ["Dynamic Filtering", "Cart Logic", "Lucide Icons"],
      description: "Football e-commerce featuring a simplified checkout flow.",
      logic: ["Global cart counter", "Real-time search filtering", "Dynamic product pages"],
    },
    asgard: {
      title: "Helarys Barber Shop",
      stack: ["Dark UI Design", "Step-by-step Booking", "Animations"],
      description: "Premium barber shop interface with Viking theme and quick scheduling.",
      logic: ["Intuitive booking workflow", "Visual success feedback", "Mock auth system"],
    },
  },
  pt: {
    cafe: {
      title: "Helarys Restaurant",
      stack: ["React State", "Framer Motion", "Tailwind CSS"],
      description: "Aplicação de restaurante com reservas de mesa e visualização de menu digital.",
      logic: ["Gestão de estado de reservas", "Navegação por categorias do menu", "Simulação de conta do cliente"],
    },
    sport: {
      title: "Helarys Football Store",
      stack: ["Filtragem Dinâmica", "Lógica de Carrinho", "Lucide Icons"],
      description: "E-commerce de futebol com fluxo de checkout simplificado.",
      logic: ["Contador global do carrinho", "Filtragem por pesquisa em tempo real", "Páginas de produto dinâmicas"],
    },
    asgard: {
      title: "Helarys Barber Shop",
      stack: ["Dark UI Design", "Reserva Passo a Passo", "Animações"],
      description: "Interface premium de barbearia com tema Viking e agendamento rápido.",
      logic: ["Fluxo de reserva intuitivo", "Feedback visual de sucesso", "Sistema de auth simulado"],
    },
  },
};

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

const portfolioCopy = {
  eyebrow: { en: "Portfolio", pt: "Portfólio" },
  h1: { en: "Interactive layout previews.", pt: "Pré-visualizações interativas de layouts." },
  desc: {
    en: "These are real, working demos — not screenshots. Click through every feature as if you were a real customer.",
    pt: "São demos reais e funcionais — não capturas de ecrã. Clica em tudo como se fosses um cliente real.",
  },
  hints: {
    en: ["Click everything", "Works on mobile", "Fully interactive"],
    pt: ["Clica em tudo", "Funciona no mobile", "Totalmente interativo"],
  },
  sidebarDevCase: { en: "Dev Case", pt: "Caso Técnico" },
  sidebarStack: { en: "Stack", pt: "Stack" },
  sidebarLogic: { en: "Technical Logic", pt: "Lógica Técnica" },
  studyCase: { en: "Study case", pt: "Caso de estudo" },
};

export default function PortfolioPage() {
  const { lang } = useLang();
  const [sidebarData, setSidebarData] = useState<ProjectDetails | null>(null);
  const details = technicalDetails[lang];

  const hintIcons = [
    <Mouse className="h-3.5 w-3.5" key="mouse" />,
    <Smartphone className="h-3.5 w-3.5" key="phone" />,
    <Zap className="h-3.5 w-3.5" key="zap" />,
  ];

  return (
    <main className="min-h-screen bg-[#0B0F19] px-6 pb-24 pt-32 text-white font-sans">
      <Suspense><PortfolioScrollHandler /></Suspense>

      <section className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">
            {portfolioCopy.eyebrow[lang]}
          </p>
          <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-5xl">
            {portfolioCopy.h1[lang]}
          </h1>
          <p className="mb-8 text-base leading-7 text-zinc-300">
            {portfolioCopy.desc[lang]}
          </p>
          <div className="flex flex-wrap gap-3">
            {portfolioCopy.hints[lang].map((label, i) => (
              <span key={label} className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-xs font-medium text-zinc-300">
                <span className="text-cyan-400">{hintIcons[i]}</span>
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {sidebarData && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setSidebarData(null)} className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]" />
            <motion.div initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }} className="fixed right-0 top-0 h-full w-full max-w-md bg-[#0d1117] border-l border-white/10 z-[101] p-8 overflow-y-auto">
              <button onClick={() => setSidebarData(null)} className="mb-8 p-2 hover:bg-white/10 rounded-full transition"><X size={24} /></button>
              <div className="space-y-8">
                <div>
                  <h3 className="text-cyan-400 text-xs font-black uppercase tracking-widest mb-2 flex items-center gap-2"><Code2 size={14} /> {portfolioCopy.sidebarDevCase[lang]}</h3>
                  <h2 className="text-4xl font-black">{sidebarData.title}</h2>
                  <p className="text-zinc-400 mt-4 leading-relaxed">{sidebarData.description}</p>
                </div>
                <div className="space-y-4">
                  <h4 className="font-bold flex items-center gap-2 text-sm uppercase tracking-wider text-zinc-300"><Cpu size={18}/> {portfolioCopy.sidebarStack[lang]}</h4>
                  <div className="flex flex-wrap gap-2">{sidebarData.stack.map(s => <span key={s} className="px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded text-xs text-cyan-400">{s}</span>)}</div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-bold flex items-center gap-2 text-sm uppercase tracking-wider text-zinc-300"><Layers size={18}/> {portfolioCopy.sidebarLogic[lang]}</h4>
                  <ul className="space-y-3">{sidebarData.logic.map(l => <li key={l} className="text-sm text-zinc-400 flex items-start gap-3"><div className="mt-1.5 w-1.5 h-1.5 bg-cyan-400 rounded-full shrink-0" /> {l}</li>)}</ul>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <section className="max-w-6xl mx-auto py-24 space-y-48">

        <div id="restaurant" className="space-y-6">
          <h2 className="text-3xl font-black tracking-tight">1. Helarys Restaurant</h2>
          <LazyDemo className="rounded-2xl md:rounded-[2.5rem] overflow-hidden border border-white/10 h-[580px] md:h-[700px] relative bg-orange-50 shadow-2xl isolate">
            <RestaurantDemo />
          </LazyDemo>
          <div className="flex justify-end">
            <button onClick={() => setSidebarData(details.cafe)} className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-bold hover:bg-cyan-400 hover:text-black transition-all flex items-center gap-2 text-xs tracking-widest uppercase">
              {portfolioCopy.studyCase[lang]}
            </button>
          </div>
        </div>

        <div id="football-store" className="space-y-6">
          <h2 className="text-3xl font-black tracking-tight">2. Helarys Football Store</h2>
          <LazyDemo className="rounded-2xl md:rounded-[2.5rem] overflow-hidden border border-white/10 h-[580px] md:h-[700px] relative bg-white shadow-2xl isolate">
            <FootballStoreDemo />
          </LazyDemo>
          <div className="flex justify-end">
            <button onClick={() => setSidebarData(details.sport)} className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-bold hover:bg-blue-600 transition-all flex items-center gap-2 text-xs tracking-widest uppercase">
              {portfolioCopy.studyCase[lang]}
            </button>
          </div>
        </div>

        <div id="barber" className="space-y-6">
          <h2 className="text-3xl font-black tracking-tight">3. Helarys Barber Shop</h2>
          <LazyDemo className="rounded-2xl md:rounded-[2.5rem] overflow-hidden border border-white/10 h-[580px] md:h-[700px] relative bg-[#0a0a0a] shadow-2xl isolate">
            <BarberDemo />
          </LazyDemo>
          <div className="flex justify-end">
            <button onClick={() => setSidebarData(details.asgard)} className="px-6 py-3 bg-white/5 border border-white/10 text-white rounded-xl font-bold hover:bg-red-600 transition-all flex items-center gap-2 text-xs tracking-widest uppercase">
              {portfolioCopy.studyCase[lang]}
            </button>
          </div>
        </div>

      </section>
    </main>
  );
}
