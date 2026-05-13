"use client";

import React, { useState, useEffect } from "react";
import { Menu, Sparkles, X, ShieldCheck, Globe, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { AnimatedCounter } from "./AnimatedCounter";

type Lang = "en" | "pt";

/* -------------------------------------------------------------------------- */
/* DISH CARD 3D                                                                 */
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
        <div
          style={{
            background: `radial-gradient(circle at ${shine.x}% ${shine.y}%, rgba(255,255,255,${shine.opacity}), transparent 70%)`,
            position: "absolute", inset: 0, zIndex: 10, pointerEvents: "none",
            transition: isHovered ? "none" : "opacity 0.5s",
          }}
        />
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
/* BOOKING FORM                                                                 */
/* -------------------------------------------------------------------------- */
const COUNTRY_CODES = [
  { code: "+351", flag: "🇵🇹", name: "Portugal" },
  { code: "+1",   flag: "🇺🇸", name: "USA / Canada" },
  { code: "+44",  flag: "🇬🇧", name: "United Kingdom" },
  { code: "+971", flag: "🇦🇪", name: "UAE" },
  { code: "+33",  flag: "🇫🇷", name: "France" },
  { code: "+49",  flag: "🇩🇪", name: "Germany" },
  { code: "+34",  flag: "🇪🇸", name: "Spain" },
  { code: "+39",  flag: "🇮🇹", name: "Italy" },
  { code: "+55",  flag: "🇧🇷", name: "Brazil" },
  { code: "+81",  flag: "🇯🇵", name: "Japan" },
  { code: "+86",  flag: "🇨🇳", name: "China" },
  { code: "+91",  flag: "🇮🇳", name: "India" },
  { code: "+7",   flag: "🇷🇺", name: "Russia" },
  { code: "+61",  flag: "🇦🇺", name: "Australia" },
  { code: "+52",  flag: "🇲🇽", name: "Mexico" },
  { code: "+27",  flag: "🇿🇦", name: "South Africa" },
  { code: "+82",  flag: "🇰🇷", name: "South Korea" },
  { code: "+31",  flag: "🇳🇱", name: "Netherlands" },
  { code: "+41",  flag: "🇨🇭", name: "Switzerland" },
  { code: "+46",  flag: "🇸🇪", name: "Sweden" },
  { code: "+47",  flag: "🇳🇴", name: "Norway" },
  { code: "+45",  flag: "🇩🇰", name: "Denmark" },
  { code: "+32",  flag: "🇧🇪", name: "Belgium" },
  { code: "+43",  flag: "🇦🇹", name: "Austria" },
  { code: "+48",  flag: "🇵🇱", name: "Poland" },
  { code: "+90",  flag: "🇹🇷", name: "Turkey" },
  { code: "+20",  flag: "🇪🇬", name: "Egypt" },
  { code: "+966", flag: "🇸🇦", name: "Saudi Arabia" },
  { code: "+65",  flag: "🇸🇬", name: "Singapore" },
  { code: "+60",  flag: "🇲🇾", name: "Malaysia" },
];

function BookingForm({
  navigateTo,
  lang = "en",
}: {
  navigateTo: (v: "home" | "menu" | "story" | "booking" | "success") => void;
  lang?: Lang;
}) {
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
    if (touched[field]) setErrors(validate(next));
  };

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
    setErrors(validate(form));
  };

  const handleSubmit = () => {
    const allTouched = Object.fromEntries(Object.keys(form).map(k => [k, true]));
    setTouched(allTouched);
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length === 0) navigateTo("success");
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
/* RESTAURANT DEMO (Helarys Dubai)                                              */
/* -------------------------------------------------------------------------- */
export function RestaurantDemo() {
  const [lang, setLang] = useState<Lang>("en");
  const t = {
    en: {
      story: "The Story", menu: "The Menu", bookNow: "Book Now",
      home: "Home", heritage: "Heritage", collection: "Collection", reservations: "Reservations",
      discover: "Discover the Collection", artTitle: "The Art of Honest Luxury",
      artQuote: '"At Helarys, we don\'t just serve dishes; we curate moments. From the rustic roots of Portugal to the golden skyline of Dubai."',
      menuTitle: "The Menu", menuSub: "Drag the plates to explore",
      yearsExp: "Years of Experience", intlAwards: "International Awards", worldCapitals: "World Capitals",
      privacy: "Privacy", luxuryDining: "Luxury Dining",
      copyright: "© 2026 Helarys Global Hospitality Group. All rights reserved.",
      location: "Jumeirah Beach Road · Dubai, UAE",
      legacyBadge: "A Legacy of Excellence",
      slideTitle1: "The Golden Era", slideTitle2: "Culinary Alchemy", slideTitle3: "Prestige Lounge",
      cat1: "The Beginning", cat2: "Heritage Mains", cat3: "Grand Finale",
      storyHeading: "A Journey Across", storyHeadingHL: "Continents",
      storyPara: "Helarys was born in 1984 as a small family project in Portugal. Today, it stands as a global beacon of culinary innovation.",
      reserveExp: "Reserve Experience",
      confirmed: "Confirmed",
      successMsg: "Your experience at Helarys Dubai is being meticulously prepared.",
      backToSanctuary: "Back to Sanctuary",
      privacyTitle: "Privacy Protocol",
      privacyP1: "At Helarys Dubai, discretion is our ultimate luxury.",
      privacyP2: "Your personal data is used exclusively for reservation management.",
      acknowledge: "Acknowledge",
      n_wagyu: "A5 Wagyu Tartare", d_wagyu: "Truffle pearls, 24k gold, quail egg.",
      n_lobster: "Blue Lobster Salad", d_lobster: "Citrus emulsion, caviar, sea herbs.",
      n_caviar: "Imperial Beluga Caviar", d_caviar: "30g selection, traditional garnishes, gold leaf blinis.",
      n_foie: "Seared Foie Gras", d_foie: "Port wine reduction, caramelised figs, toasted brioche.",
      n_francesinha: "The Helarys Francesinha", d_francesinha: "Wagyu beef, Pata Negra, champagne sauce.",
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
      artQuote: '"Na Helarys, não servimos apenas pratos; criamos momentos. Das raízes rústicas de Portugal ao horizonte dourado do Dubai."',
      menuTitle: "O Menu", menuSub: "Arrasta os pratos para os explorar",
      yearsExp: "Anos de Experiência", intlAwards: "Prémios Internacionais", worldCapitals: "Capitais Mundiais",
      privacy: "Privacidade", luxuryDining: "Restaurante de Luxo",
      copyright: "© 2026 Helarys Global Hospitality Group. Todos os direitos reservados.",
      location: "Jumeirah Beach Road · Dubai, EAU",
      legacyBadge: "Um Legado de Excelência",
      slideTitle1: "A Era de Ouro", slideTitle2: "Alquimia Culinária", slideTitle3: "Lounge de Prestígio",
      cat1: "O Início", cat2: "Pratos de Herança", cat3: "Grande Final",
      storyHeading: "Uma Viagem por", storyHeadingHL: "Continentes",
      storyPara: "A Helarys nasceu em 1984 como um pequeno projeto familiar em Portugal. Hoje, é um farol global de inovação culinária.",
      reserveExp: "Reservar Experiência",
      confirmed: "Confirmado",
      successMsg: "A tua experiência no Helarys Dubai está a ser meticulosamente preparada.",
      backToSanctuary: "Voltar ao Início",
      privacyTitle: "Protocolo de Privacidade",
      privacyP1: "No Helarys Dubai, a discrição é o nosso luxo supremo.",
      privacyP2: "Os teus dados pessoais são usados exclusivamente para gestão de reservas.",
      acknowledge: "Reconhecer",
      n_wagyu: "Tartare de Wagyu A5", d_wagyu: "Pérolas de trufa, ouro 24k, ovo de codorniz.",
      n_lobster: "Salada de Lagosta Azul", d_lobster: "Emulsão de citrinos, caviar, ervas marinhas.",
      n_caviar: "Caviar Beluga Imperial", d_caviar: "Seleção de 30g, guarnições tradicionais, blinis de folha de ouro.",
      n_foie: "Foie Gras Selado", d_foie: "Redução de vinho do Porto, figos caramelizados, brioche tostado.",
      n_francesinha: "A Helarys Francesinha", d_francesinha: "Carne de Wagyu, Pata Negra, molho de champanhe.",
      n_seabass: "Robalo no Sal", d_seabass: "Ervas mediterrâneas, flamejado à mesa.",
      n_octopus: "Polvo à Lagareiro", d_octopus: "Batatas assadas, confit de alho, azeite premium.",
      n_lamb: "Costeletas de Borrego Douradas", d_lamb: "Crosta de pistácio, risoto de açafrão, jus de hortelã.",
      n_truffle: "Risoto de Trufa Negra", d_truffle: "Arroz Acquerello, trufas de inverno frescas, Parmesão de 36 meses.",
      n_abade: "Abade de Priscos", d_abade: "Pudim de toucinho tradicional, sorbet de citrinos.",
      n_chocolate: "Decadência de Chocolate", d_chocolate: "Chocolate Valrhona 70%, praliné de avelã, flor de sal.",
    },
  }[lang];

  const [view, setView] = useState<"home" | "menu" | "story" | "booking" | "success">("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    { url: "/ElarisRest1.png", title: t.slideTitle1 },
    { url: "/ElarisRest2.png", title: t.slideTitle2 },
    { url: "/ElarisRest3.png", title: t.slideTitle3 },
  ];

  const menuCategories = [
    {
      name: t.cat1,
      items: [
        { n: t.n_wagyu,      p: "AED 245", d: t.d_wagyu,      img: "/A5Wagyu.png" },
        { n: t.n_lobster,    p: "AED 190", d: t.d_lobster,    img: "/LagostaAzul.png" },
        { n: t.n_caviar,     p: "AED 850", d: t.d_caviar,     img: "/caviar.png" },
        { n: t.n_foie,       p: "AED 210", d: t.d_foie,       img: "/FoieGras.png" },
      ],
    },
    {
      name: t.cat2,
      items: [
        { n: t.n_francesinha, p: "AED 320", d: t.d_francesinha, img: "/francesinha.png" },
        { n: t.n_seabass,     p: "AED 450", d: t.d_seabass,     img: "/seabass.png" },
        { n: t.n_octopus,     p: "AED 280", d: t.d_octopus,     img: "/octopus.png" },
        { n: t.n_lamb,        p: "AED 390", d: t.d_lamb,        img: "/lambchops.png" },
        { n: t.n_truffle,     p: "AED 310", d: t.d_truffle,     img: "/truffleRisotto.png" },
      ],
    },
    {
      name: t.cat3,
      items: [
        { n: t.n_abade,     p: "AED 110", d: t.d_abade,     img: "/abade.png" },
        { n: t.n_chocolate, p: "AED 135", d: t.d_chocolate, img: "/chocolate.png" },
      ],
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length);
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
        <div onClick={() => navigateTo("home")} className="cursor-pointer flex flex-col items-center">
          <span className="text-lg md:text-2xl font-light tracking-[0.5em] uppercase">Helarys</span>
          <span className="text-[7px] tracking-[0.3em] text-zinc-400 font-bold">{t.location}</span>
        </div>

        <div className="hidden md:flex gap-12 text-[10px] font-black uppercase tracking-[0.3em] items-center text-zinc-800">
          <button onClick={() => navigateTo("story")} className="hover:text-[#c5a059] transition-all">{t.story}</button>
          <button onClick={() => navigateTo("menu")} className="hover:text-[#c5a059] transition-all">{t.menu}</button>
          <button onClick={() => navigateTo("booking")} className="px-8 py-3 bg-[#1a1a1a] text-white hover:bg-[#c5a059] transition-all">{t.bookNow}</button>
          <div className="flex items-center gap-1 ml-2">
            <button onClick={() => setLang("en")} className={`px-2.5 py-1 text-[9px] font-black uppercase tracking-widest rounded-full transition-all border ${lang === "en" ? "bg-[#c5a059] text-black border-[#c5a059]" : "border-zinc-300 text-zinc-400 hover:border-zinc-500"}`}>EN</button>
            <button onClick={() => setLang("pt")} className={`px-2.5 py-1 text-[9px] font-black uppercase tracking-widest rounded-full transition-all border ${lang === "pt" ? "bg-[#c5a059] text-black border-[#c5a059]" : "border-zinc-300 text-zinc-400 hover:border-zinc-500"}`}>PT</button>
          </div>
        </div>

        <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(true)}>
          <Menu size={22} strokeWidth={1.5} />
        </button>
      </nav>

      {/* MAIN */}
      <main className="flex-1 overflow-hidden relative">
        <AnimatePresence mode="wait">

          {/* HOME */}
          {view === "home" && (
            <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full overflow-y-auto">
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
                    <img src={slides[currentSlide].url} className="w-full h-full object-cover" alt="" />
                    <div className="absolute inset-0 bg-black/40" />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center text-white px-6 z-10">
                  <span className="text-[10px] tracking-[0.6em] uppercase mb-4 font-bold">{t.legacyBadge}</span>
                  <h2 className="text-3xl sm:text-5xl md:text-8xl font-light italic mb-10">{slides[currentSlide].title}</h2>
                  <button onClick={() => navigateTo("menu")} className="px-12 py-5 border border-white hover:bg-white hover:text-black transition-all uppercase text-[10px] tracking-widest font-black">
                    {t.discover}
                  </button>
                </div>
              </div>

              <section className="py-20 px-8 max-w-4xl mx-auto text-center">
                <Sparkles className="text-[#c5a059] mx-auto mb-8" size={32} strokeWidth={1} />
                <h3 className="text-3xl md:text-5xl font-light mb-10">{t.artTitle}</h3>
                <p className="text-zinc-500 font-serif text-lg italic leading-relaxed">{t.artQuote}</p>
              </section>
            </motion.div>
          )}

          {/* MENU */}
          {view === "menu" && (
            <motion.div key="menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full overflow-y-auto p-8 md:p-16">
              <div className="max-w-7xl mx-auto">
                <header className="text-center mb-16">
                  <h2 className="text-5xl md:text-7xl font-light uppercase tracking-[0.2em] mb-4">{t.menuTitle}</h2>
                  <div className="h-0.5 w-20 bg-[#c5a059] mx-auto mb-4" />
                  <p className="text-zinc-400 text-xs tracking-[0.3em] uppercase">{t.menuSub}</p>
                </header>
                {menuCategories.map(cat => (
                  <div key={cat.name} className="mb-20">
                    <h4 className="text-[#c5a059] text-[11px] font-black uppercase tracking-[0.5em] border-b border-zinc-100 pb-4 mb-10">{cat.name}</h4>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                      {cat.items.map(item => <DishCard3D key={item.n} item={item} />)}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* STORY */}
          {view === "story" && (
            <motion.div key="story" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full overflow-y-auto">
              <div className="grid md:grid-cols-2 min-h-full">
                <div className="bg-[#111] text-white p-10 md:p-24 flex flex-col justify-center">
                  <h2 className="text-4xl md:text-6xl font-light mb-10 leading-none">
                    {t.storyHeading}{" "}
                    <span className="text-[#c5a059]">{t.storyHeadingHL}</span>
                  </h2>
                  <p className="text-zinc-400 text-lg italic leading-relaxed mb-8">{t.storyPara}</p>
                  <button onClick={() => navigateTo("booking")} className="mt-6 w-fit px-10 py-4 bg-[#c5a059] text-black text-[10px] font-black uppercase tracking-[0.3em] hover:bg-white transition-all">
                    {t.reserveExp}
                  </button>
                </div>
                <div className="relative min-h-[400px]">
                  <img src="https://images.unsplash.com/photo-1481833761820-0509d3217039?q=80&w=2000" className="w-full h-full object-cover" alt="" />
                </div>
              </div>

              <div className="bg-[#c5a059] py-12 px-10 md:px-24">
                <div className="max-w-5xl mx-auto grid grid-cols-3 gap-8 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-[#111] text-5xl md:text-6xl font-black leading-none tabular-nums">
                      <AnimatedCounter target={20} duration={2200} suffix="+" />
                    </span>
                    <span className="text-[#111]/70 text-[9px] uppercase tracking-[0.4em] font-black mt-2">{t.yearsExp}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1 border-x border-[#111]/20">
                    <span className="text-[#111] text-5xl md:text-6xl font-black leading-none tabular-nums">
                      <AnimatedCounter target={47} duration={2000} />
                    </span>
                    <span className="text-[#111]/70 text-[9px] uppercase tracking-[0.4em] font-black mt-2">{t.intlAwards}</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <span className="text-[#111] text-5xl md:text-6xl font-black leading-none tabular-nums">
                      <AnimatedCounter target={3} duration={1500} />
                    </span>
                    <span className="text-[#111]/70 text-[9px] uppercase tracking-[0.4em] font-black mt-2">{t.worldCapitals}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* BOOKING */}
          {view === "booking" && <BookingForm navigateTo={navigateTo} lang={lang} />}

          {/* SUCCESS */}
          {view === "success" && (
            <motion.div key="success" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="h-full flex flex-col items-center justify-center text-center p-10">
              <CheckCircle2 size={80} className="text-[#c5a059] mb-10" strokeWidth={1} />
              <h2 className="text-5xl font-light uppercase tracking-widest mb-6">{t.confirmed}</h2>
              <p className="text-zinc-500 italic text-xl max-w-md">{t.successMsg}</p>
              <button onClick={() => navigateTo("home")} className="mt-12 px-12 py-5 border border-black hover:bg-black hover:text-white transition-all text-[10px] font-black uppercase tracking-widest">
                {t.backToSanctuary}
              </button>
            </motion.div>
          )}

        </AnimatePresence>

        {/* PRIVACY MODAL */}
        <AnimatePresence>
          {showPrivacy && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 z-[200] flex items-center justify-center p-6">
              <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowPrivacy(false)} />
              <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }} className="relative bg-white p-10 md:p-14 max-w-lg w-full shadow-2xl border-t-4 border-[#c5a059] z-10">
                <button onClick={() => setShowPrivacy(false)} className="absolute top-6 right-6 text-zinc-400 hover:text-black">
                  <X size={24} />
                </button>
                <ShieldCheck className="text-[#c5a059] mb-6" size={42} strokeWidth={1} />
                <h3 className="text-2xl font-light mb-6 uppercase tracking-[0.2em]">{t.privacyTitle}</h3>
                <div className="text-sm text-zinc-500 leading-relaxed space-y-4 mb-10">
                  <p>{t.privacyP1}</p>
                  <p>{t.privacyP2}</p>
                </div>
                <button onClick={() => setShowPrivacy(false)} className="w-full py-5 bg-[#1a1a1a] text-[#c5a059] font-black uppercase text-[10px] tracking-[0.4em] hover:bg-[#c5a059] hover:text-black transition-all">
                  {t.acknowledge}
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* FOOTER */}
      <footer className="bg-[#0a0a0a] text-white px-4 md:px-16 py-4 border-t border-white/5 w-full shrink-0">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-3">
          <div>
            <h4 className="text-lg font-light tracking-[0.4em] uppercase">Helarys</h4>
            <p className="text-zinc-500 text-[9px] leading-loose tracking-widest uppercase">{t.location}</p>
          </div>
          <div className="flex gap-6 text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">
            <button onClick={() => navigateTo("menu")} className="hover:text-[#c5a059] transition-colors">{t.menu}</button>
            <button onClick={() => navigateTo("story")} className="hover:text-[#c5a059] transition-colors">{t.heritage}</button>
            <button onClick={() => setShowPrivacy(true)} className="hover:text-[#c5a059] transition-colors">{t.privacy}</button>
          </div>
          <div className="flex items-center gap-3 text-zinc-500">
            <Globe size={14} className="hover:text-[#c5a059] cursor-pointer transition-colors" />
            <span className="text-[9px] tracking-[0.4em] uppercase">{t.luxuryDining}</span>
          </div>
        </div>
        <div className="max-w-7xl mx-auto mt-3 pt-3 border-t border-white/5 text-center">
          <p className="text-[8px] tracking-[0.5em] uppercase text-zinc-700">{t.copyright}</p>
        </div>
      </footer>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute inset-0 z-[300] bg-white flex flex-col p-10"
          >
            <div className="flex justify-between items-center mb-10">
              <span className="text-[10px] tracking-[0.5em] font-bold text-zinc-400 uppercase">Menu</span>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2">
                <X size={28} strokeWidth={1} />
              </button>
            </div>
            <div className="flex flex-col gap-7 text-3xl font-light uppercase tracking-[0.2em]">
              <button onClick={() => navigateTo("home")}    className="text-left hover:text-[#c5a059]">{t.home}</button>
              <button onClick={() => navigateTo("story")}   className="text-left hover:text-[#c5a059]">{t.heritage}</button>
              <button onClick={() => navigateTo("menu")}    className="text-left hover:text-[#c5a059]">{t.collection}</button>
              <button onClick={() => navigateTo("booking")} className="text-left text-[#c5a059]">{t.reservations}</button>
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
