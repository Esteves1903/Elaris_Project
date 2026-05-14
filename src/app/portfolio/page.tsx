"use client";

import { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Code2, Cpu, Layers, Play, X, Mouse, Smartphone, Zap, ArrowRight } from "lucide-react";
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
  id: string;
  title: string;
  description: string;
  features: string[];
  stack: string[];
  logic: string[];
};

const technicalDetails = {
  en: {
    cafe: {
      id: "restaurant",
      title: "Helarys Restaurant",
      description: "A fully interactive restaurant app — every feature a real customer would use is wired up and functional. Reservations, a categorised menu and a live bill breakdown all work without any backend calls.",
      features: [
        "Book a table for 1–10 guests at any date and time",
        "Browse the full menu split by starters, mains and desserts",
        "Add dishes to your order and watch the bill update live",
        "Toggle EN / PT and see all copy switch instantly",
        "Cancel or modify your booking before confirming",
      ],
      stack: ["React useState", "Framer Motion", "Tailwind CSS", "Context API"],
      logic: [
        "Reservation state tracks date, time, guests and name simultaneously with a single useState object",
        "Menu categories rendered from a static map — zero network calls, instant tab switching",
        "Bill total recalculated on every cart mutation via Array.reduce()",
        "Language toggled via React Context — no router reload, no flicker",
        "Booking form validation runs client-side before the confirmation step",
      ],
    },
    sport: {
      id: "football-store",
      title: "Helarys Football Store",
      description: "A football e-commerce built to show how product search, filtering, cart management and a full checkout flow can all live inside a single-page demo with zero backend. Every interaction updates state instantly.",
      features: [
        "Search products by name — results filter on every keystroke",
        "Filter by category: shirts, boots, balls and accessories",
        "Add items to cart, adjust quantity or remove them",
        "Navigate to a full product detail page for any item",
        "Complete the checkout and see the order confirmation",
      ],
      stack: ["useState", "In-memory Filtering", "Cart Logic", "Lucide Icons"],
      logic: [
        "Product list filtered in-memory with Array.filter() — no debounce needed at demo scale",
        "Cart state stored in a top-level useState and passed via props — no Context or Zustand required",
        "Checkout steps enforce linear progression: each step is gated by the previous",
        "Global cart counter derived from the cart array length — always in sync, no extra state",
        "Product pages driven by ID selection within a single component — no routing overhead",
      ],
    },
    asgard: {
      id: "barber",
      title: "Helarys Barber Shop",
      description: "A dark, premium booking interface for a Viking-themed barber shop. Demonstrates how a multi-step booking wizard, a mock authentication system and polished Framer Motion animations come together into a coherent, real-feeling experience.",
      features: [
        "Browse the services menu with prices and estimated duration",
        "Choose a barber from the team roster",
        "Pick a date and a time slot from the availability grid",
        "See the animated booking confirmation screen",
        "Try the mock login — use any name and any 4-digit PIN",
      ],
      stack: ["Framer Motion", "Step-by-step State Machine", "Dark UI", "Mock Auth"],
      logic: [
        "Booking flow built as a local state machine — each step is gated and the user cannot skip ahead",
        "AnimatedCounter fires exactly once on viewport entry via IntersectionObserver",
        "Mock auth validates against a hardcoded credentials object and stores a local session flag",
        "Step transitions use Framer Motion's AnimatePresence so exiting steps animate out before the next mounts",
        "Success screen uses a staggered animation sequence: icon scale → title fade → detail reveal",
      ],
    },
  },
  pt: {
    cafe: {
      id: "restaurant",
      title: "Helarys Restaurant",
      description: "Uma app de restaurante totalmente interativa — cada funcionalidade que um cliente real usaria está operacional. Reservas, menu categorizado e conta em tempo real, tudo sem chamadas a backend.",
      features: [
        "Reservar mesa para 1 a 10 pessoas em qualquer data e hora",
        "Navegar pelo menu completo dividido por entradas, pratos e sobremesas",
        "Adicionar pratos e ver a conta atualizar em tempo real",
        "Alternar EN / PT e ver toda a copy mudar instantaneamente",
        "Cancelar ou modificar a reserva antes de confirmar",
      ],
      stack: ["React useState", "Framer Motion", "Tailwind CSS", "Context API"],
      logic: [
        "Estado da reserva gere data, hora, convidados e nome em simultâneo com um único objeto useState",
        "Categorias do menu renderizadas a partir de um mapa estático — zero chamadas de rede, tabs instantâneas",
        "Total da conta recalculado a cada mutação do carrinho via Array.reduce()",
        "Língua alternada via React Context — sem reload do router, sem flash",
        "Validação do formulário de reserva corre no cliente antes do passo de confirmação",
      ],
    },
    sport: {
      id: "football-store",
      title: "Helarys Football Store",
      description: "Um e-commerce de futebol criado para mostrar como pesquisa de produtos, filtragem, gestão de carrinho e um checkout completo podem existir numa demo de página única sem backend. Cada interação atualiza o estado instantaneamente.",
      features: [
        "Pesquisar produtos por nome — resultados filtram em cada keystroke",
        "Filtrar por categoria: camisolas, chuteiras, bolas e acessórios",
        "Adicionar itens ao carrinho, ajustar quantidade ou remover",
        "Navegar para a página de detalhe completa de qualquer produto",
        "Completar o checkout e ver a confirmação da encomenda",
      ],
      stack: ["useState", "Filtragem em Memória", "Lógica de Carrinho", "Lucide Icons"],
      logic: [
        "Lista de produtos filtrada em memória com Array.filter() — sem debounce necessário à escala da demo",
        "Estado do carrinho guardado num useState de topo e passado via props — sem Context ou Zustand",
        "Passos do checkout com progressão linear: cada passo valida antes de avançar",
        "Contador global do carrinho derivado do comprimento do array — sempre sincronizado, sem estado extra",
        "Páginas de produto geridas por seleção de ID dentro de um único componente — sem overhead de routing",
      ],
    },
    asgard: {
      id: "barber",
      title: "Helarys Barber Shop",
      description: "Uma interface de agendamento premium com tema Viking para uma barbearia. Demonstra como um wizard de reserva multi-passo, um sistema de autenticação simulado e animações Framer Motion polidas se combinam numa experiência coerente e realista.",
      features: [
        "Ver o menu de serviços com preços e duração estimada",
        "Escolher um barbeiro da equipa",
        "Selecionar data e horário na grelha de disponibilidade",
        "Ver o ecrã de confirmação animado da reserva",
        "Experimentar o login simulado — qualquer nome e PIN de 4 dígitos",
      ],
      stack: ["Framer Motion", "State Machine Passo a Passo", "Dark UI", "Auth Simulado"],
      logic: [
        "Fluxo de reserva construído como state machine local — cada passo está bloqueado e não é possível saltar à frente",
        "AnimatedCounter dispara exatamente uma vez ao entrar no viewport via IntersectionObserver",
        "Auth simulado valida contra um objeto de credenciais hardcoded e guarda flag de sessão local",
        "Transições de passo usam AnimatePresence do Framer Motion para os passos saírem antes do próximo montar",
        "Ecrã de sucesso usa sequência de animação escalonada: escala do ícone → fade do título → reveal dos detalhes",
      ],
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
  sidebarFeatures: { en: "What you can try", pt: "O que podes experimentar" },
  sidebarStack: { en: "Stack", pt: "Stack" },
  sidebarLogic: { en: "Technical Logic", pt: "Lógica Técnica" },
  sidebarGoToDemo: { en: "Go to demo", pt: "Ir para a demo" },
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

  function scrollToDemo(id: string) {
    setSidebarData(null);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 104;
        window.scrollTo({ top, behavior: "smooth" });
      }
    }, 350);
  }

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
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarData(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 280 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-[#0d1117] border-l border-white/10 z-[101] overflow-y-auto flex flex-col"
            >
              {/* Top bar with close */}
              <div className="flex items-center justify-between px-8 py-6 border-b border-white/[0.06]">
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-400 flex items-center gap-2">
                  <Code2 size={13} />
                  {portfolioCopy.sidebarDevCase[lang]}
                </span>
                <button
                  onClick={() => setSidebarData(null)}
                  aria-label="Close"
                  className="p-2 hover:bg-white/10 rounded-full transition text-zinc-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 px-8 py-8 space-y-8">

                {/* Title + description */}
                <div>
                  <h2 className="text-3xl font-black tracking-tight leading-tight">{sidebarData.title}</h2>
                  <p className="text-zinc-400 mt-4 text-sm leading-7">{sidebarData.description}</p>
                </div>

                {/* What you can try */}
                <div className="space-y-4">
                  <h4 className="font-bold flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-300">
                    <Play size={14} className="text-cyan-400" />
                    {portfolioCopy.sidebarFeatures[lang]}
                  </h4>
                  <ul className="space-y-2.5">
                    {sidebarData.features.map(f => (
                      <li key={f} className="flex items-start gap-3 rounded-xl bg-white/[0.03] border border-white/[0.06] px-4 py-3">
                        <div className="mt-1 w-1.5 h-1.5 bg-cyan-400 rounded-full shrink-0" />
                        <span className="text-sm text-zinc-300 leading-snug">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Stack */}
                <div className="space-y-4">
                  <h4 className="font-bold flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-300">
                    <Cpu size={14} className="text-cyan-400" />
                    {portfolioCopy.sidebarStack[lang]}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {sidebarData.stack.map(s => (
                      <span key={s} className="px-3 py-1.5 bg-cyan-500/10 border border-cyan-500/20 rounded-lg text-xs text-cyan-400 font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Technical logic */}
                <div className="space-y-4">
                  <h4 className="font-bold flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-300">
                    <Layers size={14} className="text-cyan-400" />
                    {portfolioCopy.sidebarLogic[lang]}
                  </h4>
                  <ul className="space-y-3">
                    {sidebarData.logic.map(l => (
                      <li key={l} className="text-sm text-zinc-400 flex items-start gap-3 leading-relaxed">
                        <div className="mt-2 w-1 h-1 bg-zinc-600 rounded-full shrink-0" />
                        {l}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="px-8 py-6 border-t border-white/[0.06]">
                <button
                  onClick={() => scrollToDemo(sidebarData.id)}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-zinc-200"
                >
                  {portfolioCopy.sidebarGoToDemo[lang]}
                  <ArrowRight size={15} />
                </button>
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
