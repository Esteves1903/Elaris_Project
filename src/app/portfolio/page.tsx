"use client";

import { useState, useEffect, Suspense } from "react";
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


type ProjectDetails = {
  id: string;
  title: string;
  description: string;
  features: string[];
  stack: string[];
  logic: string[];
};

type FlowStep = { title: { en: string; pt: string }; detail: { en: string; pt: string } };
type LiveProjectDetails = {
  title: string;
  url: string;
  description: { en: string; pt: string };
  flow: FlowStep[];
  stack: string[];
  logic: { en: string; pt: string }[];
};

const praticamaisDetails: LiveProjectDetails = {
  title: "Pratica+",
  url: "https://www.praticamais.pt",
  description: {
    en: "A production tutoring marketplace connecting Portuguese secondary school students (5th–12th grade) with university tutors from ISEP and FEP. Built with Next.js App Router, Supabase and Tailwind — featuring a multi-step booking wizard, 6-digit OTP email verification and MBway payment processing.",
    pt: "Uma plataforma de apoio escolar online que liga alunos do 5.º ao 12.º ano com explicadores universitários do ISEP e da FEP. Construída com Next.js App Router, Supabase e Tailwind — inclui um wizard de marcação em múltiplos passos, verificação de email por OTP de 6 dígitos e pagamento por MBway.",
  },
  flow: [
    {
      title: { en: "Select subject & year", pt: "Escolher disciplina e ano" },
      detail: { en: "Student picks from 6 subjects and their school year. This filters which tutors are shown and sets pricing tier.", pt: "O aluno escolhe entre 6 disciplinas e o seu ano letivo. Isso filtra os explicadores disponíveis e define o escalão de preço." },
    },
    {
      title: { en: "Choose a tutor", pt: "Escolher explicador" },
      detail: { en: "Available tutors are listed with their university, specialties and real-time schedule pulled from Supabase.", pt: "Os explicadores são listados com a sua universidade, especialidades e horário em tempo real via Supabase." },
    },
    {
      title: { en: "Pick a time slot", pt: "Selecionar horário" },
      detail: { en: "Availability grid fetched server-side — booked slots are filtered out before the calendar renders to prevent race conditions.", pt: "Grelha de disponibilidade calculada server-side — slots ocupados filtrados antes de renderizar o calendário, evitando conflitos." },
    },
    {
      title: { en: "OTP email verification", pt: "Verificação de email por OTP" },
      detail: { en: "A 6-digit code is generated server-side, hashed and stored in Supabase with a 10-minute TTL, then sent to the student's email.", pt: "Código de 6 dígitos gerado server-side, guardado em hash no Supabase com validade de 10 minutos e enviado para o email do aluno." },
    },
    {
      title: { en: "Confirm OTP", pt: "Confirmar código" },
      detail: { en: "Student enters the code. On match the token is consumed and the booking moves from pending → verified. Wrong or expired codes are rejected silently.", pt: "O aluno introduz o código. Se correto, o token é consumido e a reserva passa de pending → verified. Códigos errados ou expirados são rejeitados." },
    },
    
  ],
  stack: ["Next.js App Router", "Supabase", "Tailwind CSS", "OTP / Email", "MBway"],
  logic: [
    {
      en: "OTP generated with crypto.randomInt(), hashed before storage. The booking row is created with status='pending' first — this holds the slot optimistically and is auto-cleaned if the code expires.",
      pt: "OTP gerado com crypto.randomInt(), guardado em hash. A reserva é criada com status='pending' antes da verificação — ocupa o slot otimisticamente e é limpa automaticamente se o código expirar.",
    },
    {
      en: "Availability query joins tutors and bookings tables in Supabase, filtering any slot that overlaps a confirmed booking — queried fresh on every calendar open to stay in sync.",
      pt: "A query de disponibilidade faz join das tabelas de explicadores e reservas no Supabase, filtrando slots sobrepostos com reservas confirmadas — consultada a cada abertura do calendário.",
    },
    {
      en: "MBway webhook validates the payment signature before writing to the database. Client-side confirmation is blocked at API level — booking status only changes after the server receives the webhook.",
      pt: "O webhook do MBway valida a assinatura antes de escrever na base de dados. Confirmação client-side está bloqueada ao nível da API — o estado da reserva só muda após o servidor receber o webhook.",
    },
    {
      en: "Confirmation email with the Zoom link and tutor WhatsApp is dispatched after the webhook resolves — sending on the client is explicitly rejected to prevent duplicate emails.",
      pt: "Email de confirmação com link Zoom e WhatsApp do explicador é enviado após o webhook resolver — envio no cliente é explicitamente rejeitado para evitar duplicados.",
    },
  ],
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
  h1: { en: "Work we're proud of.", pt: "Trabalho do qual nos orgulhamos." },
  desc: {
    en: "A real shipped product and interactive demo layouts — built by Helarys to show what we do.",
    pt: "Um projeto real entregue e demos interativas de layouts — criados pela Helarys para mostrar o que fazemos.",
  },
  liveEyebrow: { en: "Live projects", pt: "Projetos reais" },
  liveHeading: { en: "Real work, shipped.", pt: "Trabalho real, entregue." },
  visitProject: { en: "Visit project", pt: "Ver projeto" },
  demoEyebrow: { en: "Interactive demos", pt: "Demos interativas" },
  demoHeading: { en: "Interactive layout previews.", pt: "Pré-visualizações interativas de layouts." },
  demoDesc: {
    en: "These are example websites built by Helarys to showcase our design and development capabilities — they are not real client projects. Every feature is fully functional: click through as if you were a real customer.",
    pt: "Estes são websites de exemplo criados pela Helarys para mostrar as nossas capacidades de design e desenvolvimento — não são projetos reais de clientes. Cada funcionalidade está totalmente operacional: clica como se fosses um cliente real.",
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
  launchDemo: { en: "Launch demo", pt: "Abrir demo" },
  liveCase: { en: "Case study", pt: "Caso de estudo" },
  bookingFlow: { en: "Booking flow", pt: "Fluxo de reserva" },
  technicalNotes: { en: "Technical notes", pt: "Notas técnicas" },
  visitLive: { en: "Visit live", pt: "Ver projeto" },
};

export default function PortfolioPage() {
  const { lang } = useLang();
  const [sidebarData, setSidebarData] = useState<ProjectDetails | null>(null);
  const [sidebarLive, setSidebarLive] = useState(false);
  const [demoOpen, setDemoOpen] = useState<string | null>(null);
  const details = technicalDetails[lang];

  useEffect(() => {
    document.body.style.overflow = demoOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [demoOpen]);

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
          <p className="text-base leading-7 text-zinc-400">
            {portfolioCopy.desc[lang]}
          </p>
        </div>
      </section>

      <AnimatePresence>
        {sidebarData && (
          <>
            <motion.div
              key="demo-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarData(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
            />
            <motion.div
              key="demo-sidebar"
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
                  onClick={() => { setSidebarData(null); setDemoOpen(sidebarData.id); }}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/10 px-6 py-3 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-400/20 hover:border-cyan-400/50"
                >
                  <Play size={15} />
                  {portfolioCopy.launchDemo[lang]}
                </button>
              </div>
            </motion.div>
          </>
        )}

        {sidebarLive && (
          <>
            <motion.div
              key="live-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarLive(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[100]"
            />
            <motion.div
              key="live-sidebar"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 280 }}
              className="fixed right-0 top-0 h-full w-full max-w-md bg-[#0d1117] border-l border-white/10 z-[101] overflow-y-auto flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between px-8 py-6 border-b border-white/[0.06]">
                <span className="text-xs font-bold uppercase tracking-[0.3em] text-green-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                  {portfolioCopy.liveCase[lang]}
                </span>
                <button
                  onClick={() => setSidebarLive(false)}
                  aria-label="Close"
                  className="p-2 hover:bg-white/10 rounded-full transition text-zinc-400 hover:text-white"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="flex-1 px-8 py-8 space-y-9">

                {/* Title + description */}
                <div>
                  <div className="flex items-center gap-3 mb-3">
                    <h2 className="text-3xl font-black tracking-tight">{praticamaisDetails.title}</h2>
                    <a href={praticamaisDetails.url} target="_blank" rel="noopener noreferrer" className="text-[10px] font-bold text-blue-400 hover:text-blue-300 uppercase tracking-widest transition border border-blue-400/30 px-2.5 py-1 rounded-full">
                      .pt ↗
                    </a>
                  </div>
                  <p className="text-zinc-400 text-sm leading-7">{praticamaisDetails.description[lang]}</p>
                </div>

                {/* Booking flow */}
                <div>
                  <h4 className="font-bold flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-300 mb-5">
                    <Play size={14} className="text-green-400" />
                    {portfolioCopy.bookingFlow[lang]}
                  </h4>
                  <div className="relative">
                    {praticamaisDetails.flow.map((step, i) => (
                      <div key={i} className="flex gap-4 mb-0">
                        {/* Step indicator + line */}
                        <div className="flex flex-col items-center">
                          <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-black shrink-0 z-10 ${i === 3 ? "bg-blue-500/30 border border-blue-400/60 text-blue-300" : "bg-white/[0.06] border border-white/10 text-zinc-300"}`}>
                            {i + 1}
                          </div>
                          {i < praticamaisDetails.flow.length - 1 && (
                            <div className={`w-px flex-1 my-1 ${i === 3 ? "bg-blue-500/40" : "bg-white/[0.07]"}`} style={{ minHeight: "20px" }} />
                          )}
                        </div>
                        {/* Step content */}
                        <div className={`pb-4 flex-1 ${i === 3 ? "bg-blue-500/5 border border-blue-500/15 rounded-xl px-4 py-3 -ml-1 mb-1" : ""}`}>
                          <p className={`text-sm font-bold mb-0.5 ${i === 3 ? "text-blue-200" : "text-white"}`}>{step.title[lang]}</p>
                          <p className="text-xs text-zinc-500 leading-5">{step.detail[lang]}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Stack */}
                <div className="space-y-3">
                  <h4 className="font-bold flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-300">
                    <Cpu size={14} className="text-green-400" />
                    {portfolioCopy.sidebarStack[lang]}
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {praticamaisDetails.stack.map(s => (
                      <span key={s} className="px-3 py-1.5 bg-green-500/10 border border-green-500/20 rounded-lg text-xs text-green-400 font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Technical notes */}
                <div className="space-y-3">
                  <h4 className="font-bold flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-zinc-300">
                    <Layers size={14} className="text-green-400" />
                    {portfolioCopy.technicalNotes[lang]}
                  </h4>
                  <ul className="space-y-3">
                    {praticamaisDetails.logic.map((l, i) => (
                      <li key={i} className="text-sm text-zinc-400 flex items-start gap-3 leading-relaxed">
                        <div className="mt-2 w-1 h-1 bg-zinc-600 rounded-full shrink-0" />
                        {l[lang]}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Bottom CTA */}
              <div className="px-8 py-6 border-t border-white/[0.06]">
                <a
                  href={praticamaisDetails.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-full border border-green-400/30 bg-green-400/10 px-6 py-3 text-sm font-semibold text-green-300 transition hover:bg-green-400/20 hover:border-green-400/50"
                >
                  {portfolioCopy.visitLive[lang]}
                  <ArrowRight size={15} />
                </a>
              </div>
            </motion.div>
          </>
        )}

        {demoOpen && (
          <>
            <motion.div
              key="demo-modal-bg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setDemoOpen(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-sm z-[200]"
            />
            <motion.div
              key="demo-modal"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed inset-4 md:inset-8 z-[201] rounded-2xl md:rounded-3xl overflow-hidden flex flex-col shadow-2xl"
            >
              <button
                onClick={() => setDemoOpen(null)}
                aria-label="Close"
                className="absolute top-3 right-3 z-10 p-2 bg-black/60 hover:bg-black/80 backdrop-blur-sm rounded-full text-white/70 hover:text-white transition"
              >
                <X size={20} />
              </button>
              {demoOpen === "restaurant" && <RestaurantDemo />}
              {demoOpen === "football-store" && <FootballStoreDemo />}
              {demoOpen === "barber" && <BarberDemo />}
              <button
                onClick={() => setDemoOpen(null)}
                className="absolute bottom-5 left-1/2 -translate-x-1/2 z-10 inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-black/60 hover:bg-black/80 backdrop-blur-sm border border-white/10 text-white/70 hover:text-white text-xs font-bold uppercase tracking-widest transition"
              >
                <X size={13} />
                {lang === "pt" ? "Sair da demo" : "Exit demo"}
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* ── LIVE PROJECTS ── */}
      <section className="max-w-6xl mx-auto pt-20 pb-8">
        <div className="mb-10">
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-green-400 mb-3">
            {portfolioCopy.liveEyebrow[lang]}
          </p>
          <h2 className="text-3xl font-bold tracking-tight">
            {portfolioCopy.liveHeading[lang]}
          </h2>
        </div>

        {/* praticamais.pt */}
        <div className="rounded-2xl md:rounded-3xl border border-white/10 overflow-hidden bg-[#0c1320] shadow-2xl">
          {/* Visual header */}
          <div className="relative h-52 overflow-hidden">
            <img
              src="https://www.praticamais.pt/og-image.jpg"
              alt="Pratica+"
              className="absolute inset-0 w-full h-full object-cover object-top opacity-60"
              onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
            />
            <div className="absolute inset-0 bg-gradient-to-br from-[#1e3a8a] via-[#1d4ed8]/80 to-[#0369a1]" />
            {/* Decorative grid */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "28px 28px" }} />
            {/* Center content */}
            <div className="relative z-10 h-full flex flex-col items-center justify-center gap-2">
              <span className="text-5xl font-black text-white tracking-tight">Pratica<span className="text-blue-300">+</span></span>
              <span className="text-blue-200/70 text-xs tracking-[0.4em] uppercase font-medium">praticamais.pt</span>
            </div>
            {/* Live badge */}
            <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-green-500/20 border border-green-400/30 rounded-full px-3 py-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <span className="text-green-300 text-[10px] font-bold uppercase tracking-wider">Live</span>
            </div>
          </div>

          {/* Info */}
          <div className="p-8 md:p-10">
            <div className="md:flex md:items-start md:justify-between md:gap-10">
              <div className="flex-1 mb-6 md:mb-0">
                <h3 className="text-2xl font-black tracking-tight mb-2">Pratica+</h3>
                <p className="text-zinc-400 text-sm leading-7 max-w-xl">
                  {lang === "en"
                    ? "Online tutoring platform connecting Portuguese secondary school students (5th–12th grade) with university tutors from ISEP and FEP. Features real-time booking, tiered pricing, MBway payments and WhatsApp integration."
                    : "Plataforma de apoio escolar online que liga alunos do 5.º ao 12.º ano com estudantes universitários do ISEP e da FEP. Marcação em tempo real, preços escalonados, pagamento por MBway e integração com WhatsApp."}
                </p>
                <div className="flex flex-wrap gap-2 mt-5">
                  {["EdTech", "Booking system", "MBway", "WhatsApp", "PT Market"].map(tag => (
                    <span key={tag} className="px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs text-zinc-400 font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3 shrink-0">
                <a
                  href="https://www.praticamais.pt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white text-black font-bold text-sm px-7 py-3 rounded-full hover:bg-zinc-100 transition-all shadow-lg whitespace-nowrap"
                >
                  {portfolioCopy.visitProject[lang]} <ArrowRight size={15} />
                </a>
                <button
                  onClick={() => setSidebarLive(true)}
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-7 py-3 text-sm font-bold text-white transition hover:border-green-400/40 hover:bg-green-400/10 hover:text-green-300 whitespace-nowrap"
                >
                  {portfolioCopy.liveCase[lang]}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-6xl mx-auto py-16">
        <div className="mb-12">
          <p className="text-sm font-medium uppercase tracking-[0.35em] text-cyan-400 mb-3">
            {portfolioCopy.demoEyebrow[lang]}
          </p>
          <h2 className="text-3xl font-bold tracking-tight mb-4">
            {portfolioCopy.demoHeading[lang]}
          </h2>
          <p className="mb-6 max-w-2xl text-sm leading-7 text-zinc-400">
            {portfolioCopy.demoDesc[lang]}
          </p>
          <div className="flex flex-wrap gap-3">
            {portfolioCopy.hints[lang].map((label, i) => (
              <span key={label} className="inline-flex items-center gap-1.5 rounded-full border border-cyan-400/20 bg-cyan-400/[0.05] px-3 py-1.5 text-xs font-medium text-cyan-300">
                <span className="text-cyan-400">{hintIcons[i]}</span>
                {label}
              </span>
            ))}
          </div>
        </div>

        <div className="space-y-8">

          {/* Restaurant */}
          <div id="restaurant" className="rounded-2xl md:rounded-3xl border border-white/10 overflow-hidden bg-[#0c0c0a] shadow-2xl">
            <div className="relative h-52 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#1a0800] via-[#7c3a1a]/50 to-[#0d0300]" />
              <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "28px 28px" }} />
              <div className="relative z-10 h-full flex flex-col items-center justify-center gap-2">
                <span className="text-4xl font-black text-white tracking-tight">Helarys <span className="text-[#c5a059]">Restaurant</span></span>
                <span className="text-[#c5a059]/50 text-xs tracking-[0.4em] uppercase font-medium">Fine Dining Experience</span>
              </div>
              <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-cyan-500/20 border border-cyan-400/30 rounded-full px-3 py-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span className="text-cyan-300 text-[10px] font-bold uppercase tracking-wider">Demo</span>
              </div>
            </div>
            <div className="p-8 md:p-10">
              <div className="md:flex md:items-start md:justify-between md:gap-10">
                <div className="flex-1 mb-6 md:mb-0">
                  <h3 className="text-2xl font-black tracking-tight mb-2">{details.cafe.title}</h3>
                  <p className="text-zinc-400 text-sm leading-7 max-w-xl">{details.cafe.description}</p>
                  <div className="flex flex-wrap gap-2 mt-5">
                    {details.cafe.stack.map(tag => (
                      <span key={tag} className="px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs text-zinc-400 font-medium">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-3 shrink-0">
                  <button
                    onClick={() => setDemoOpen("restaurant")}
                    className="inline-flex items-center justify-center gap-2 bg-white text-black font-bold text-sm px-7 py-3 rounded-full hover:bg-zinc-100 transition-all shadow-lg whitespace-nowrap"
                  >
                    <Play size={14} />
                    {portfolioCopy.launchDemo[lang]}
                  </button>
                  <button
                    onClick={() => setSidebarData(details.cafe)}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-7 py-3 text-sm font-bold text-white transition hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-cyan-300 whitespace-nowrap"
                  >
                    {portfolioCopy.studyCase[lang]}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Football Store */}
          <div id="football-store" className="rounded-2xl md:rounded-3xl border border-white/10 overflow-hidden bg-[#080d14] shadow-2xl">
            <div className="relative h-52 overflow-hidden">
              <img src="/lojafundo.webp" alt="" className="absolute inset-0 w-full h-full object-cover opacity-25" />
              <div className="absolute inset-0 bg-gradient-to-br from-[#00162b] via-[#0066ff]/25 to-[#000e1f]" />
              <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "28px 28px" }} />
              <div className="relative z-10 h-full flex flex-col items-center justify-center gap-2">
                <span className="text-4xl font-black text-white tracking-tight">Helarys <span className="text-[#0066ff]">Store</span></span>
                <span className="text-blue-400/50 text-xs tracking-[0.4em] uppercase font-medium">Football Equipment</span>
              </div>
              <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-cyan-500/20 border border-cyan-400/30 rounded-full px-3 py-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span className="text-cyan-300 text-[10px] font-bold uppercase tracking-wider">Demo</span>
              </div>
            </div>
            <div className="p-8 md:p-10">
              <div className="md:flex md:items-start md:justify-between md:gap-10">
                <div className="flex-1 mb-6 md:mb-0">
                  <h3 className="text-2xl font-black tracking-tight mb-2">{details.sport.title}</h3>
                  <p className="text-zinc-400 text-sm leading-7 max-w-xl">{details.sport.description}</p>
                  <div className="flex flex-wrap gap-2 mt-5">
                    {details.sport.stack.map(tag => (
                      <span key={tag} className="px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs text-zinc-400 font-medium">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-3 shrink-0">
                  <button
                    onClick={() => setDemoOpen("football-store")}
                    className="inline-flex items-center justify-center gap-2 bg-white text-black font-bold text-sm px-7 py-3 rounded-full hover:bg-zinc-100 transition-all shadow-lg whitespace-nowrap"
                  >
                    <Play size={14} />
                    {portfolioCopy.launchDemo[lang]}
                  </button>
                  <button
                    onClick={() => setSidebarData(details.sport)}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-7 py-3 text-sm font-bold text-white transition hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-cyan-300 whitespace-nowrap"
                  >
                    {portfolioCopy.studyCase[lang]}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Barber */}
          <div id="barber" className="rounded-2xl md:rounded-3xl border border-white/10 overflow-hidden bg-[#080808] shadow-2xl">
            <div className="relative h-52 overflow-hidden">
              <img src="/barber.webp" alt="" className="absolute inset-0 w-full h-full object-cover opacity-20" />
              <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0d1a2a]/70 to-black" />
              <div className="absolute inset-0 opacity-[0.08]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "28px 28px" }} />
              <div className="relative z-10 h-full flex flex-col items-center justify-center gap-2">
                <span className="text-4xl font-black text-white tracking-tight">Helarys <span className="text-cyan-400">Barber</span></span>
                <span className="text-cyan-400/50 text-xs tracking-[0.4em] uppercase font-medium">Premium Viking Experience</span>
              </div>
              <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-cyan-500/20 border border-cyan-400/30 rounded-full px-3 py-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                <span className="text-cyan-300 text-[10px] font-bold uppercase tracking-wider">Demo</span>
              </div>
            </div>
            <div className="p-8 md:p-10">
              <div className="md:flex md:items-start md:justify-between md:gap-10">
                <div className="flex-1 mb-6 md:mb-0">
                  <h3 className="text-2xl font-black tracking-tight mb-2">{details.asgard.title}</h3>
                  <p className="text-zinc-400 text-sm leading-7 max-w-xl">{details.asgard.description}</p>
                  <div className="flex flex-wrap gap-2 mt-5">
                    {details.asgard.stack.map(tag => (
                      <span key={tag} className="px-2.5 py-1 rounded-full bg-white/[0.05] border border-white/[0.08] text-xs text-zinc-400 font-medium">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="flex flex-col gap-3 shrink-0">
                  <button
                    onClick={() => setDemoOpen("barber")}
                    className="inline-flex items-center justify-center gap-2 bg-white text-black font-bold text-sm px-7 py-3 rounded-full hover:bg-zinc-100 transition-all shadow-lg whitespace-nowrap"
                  >
                    <Play size={14} />
                    {portfolioCopy.launchDemo[lang]}
                  </button>
                  <button
                    onClick={() => setSidebarData(details.asgard)}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-7 py-3 text-sm font-bold text-white transition hover:border-cyan-400/40 hover:bg-cyan-400/10 hover:text-cyan-300 whitespace-nowrap"
                  >
                    {portfolioCopy.studyCase[lang]}
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
