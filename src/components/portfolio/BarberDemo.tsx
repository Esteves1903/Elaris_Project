"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Scissors, ArrowLeft, Clock, ChevronRight, CheckCircle2, Star, MapPin } from "lucide-react";
import { AnimatedCounter } from "./AnimatedCounter";

type Lang = "en" | "pt";

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
                <option key={s.id} value={s.name} className="bg-[#111]">{s.name} â€” {s.price}</option>
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

export function BarberDemo() {
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
      role1: "Head Barber â€¢ Dubai", role2: "Master Cut â€¢ Porto", role3: "Razor Specialist â€¢ London",
      tagBestseller: "Bestseller", tagPremium: "Premium", tagElite: "Elite", tagWellness: "Wellness",
      testimonial1: "The best barbershop experience I've ever had. Truly international level.",
      testimonial2: "From the moment you walk in, you know this is different class. World-class precision.",
      testimonial3: "I've been to barbers in Mayfair, Soho, NYC â€” Helarys beats them all.",
      luxuryGroomingHouse: "Luxury Grooming House",
      copyright: "Â© 2026 Helarys Group",
      heroLine1: "THE CRAFT", heroLine2: "OF MEN.",
      top10: "Top 10 Barbers", gqBadge: "GQ Magazine Â· 2025",
      teamHeading: "Master Barbers",
    },
    pt: {
      services: "ServiÃ§os", team: "Equipa", book: "Reservar",
      fullName: "Nome Completo", phone: "Telefone", date: "Data",
      service: "ServiÃ§o", schedule: "HorÃ¡rio", confirm: "Confirmar Reserva",
      selectService: "Selecionar serviÃ§o", namePlaceholder: "O teu nome",
      errName: "Nome completo obrigatÃ³rio", errPhone: "Telefone obrigatÃ³rio",
      errDate: "Data obrigatÃ³ria", errService: "Seleciona um serviÃ§o",
      errTime: "Seleciona um horÃ¡rio",
      back: "Voltar", bookSession: "Marcar SessÃ£o",
      bookNow: "Marcar SessÃ£o", viewServices: "Ver ServiÃ§os", recognized: "Reconhecido",
      yearsExc: "Anos de ExcelÃªncia", intlCities: "Cidades Internacionais",
      happyClients: "Clientes Satisfeitos", masterBarbers: "Master Barbers",
      ourTeam: "A Nossa Equipa", experience: "experiÃªncia",
      testimonials: "Testemunhos", clientsSay: "O que dizem os clientes",
      premiumServices: "ServiÃ§os Premium", theExperience: "A ExperiÃªncia",
      bookThisService: "Reservar Este ServiÃ§o",
      bookingConfirmed: "Reserva Confirmada", seeYou: "ATÃ‰ JÃ",
      sessionBooked: "A tua sessÃ£o premium estÃ¡ marcada",
      welcomeMsg: "Bem-vindo ao padrÃ£o mais alto da barbearia internacional.",
      backHome: "Voltar ao InÃ­cio",
      barberHouse: "Barber House",
      role1: "Chefe de Barbeiros â€¢ Dubai", role2: "Master Cut â€¢ Porto", role3: "Especialista em Navalha â€¢ Londres",
      tagBestseller: "Mais Vendido", tagPremium: "Premium", tagElite: "Elite", tagWellness: "Bem-Estar",
      testimonial1: "A melhor experiÃªncia de barbearia que jÃ¡ tive. NÃ­vel absolutamente internacional.",
      testimonial2: "Desde o momento em que entras, sabes que isto Ã© outra classe. PrecisÃ£o de nÃ­vel mundial.",
      testimonial3: "JÃ¡ fui a barbeiros em Mayfair, Soho, Nova York â€” Helarys supera-os todos.",
      luxuryGroomingHouse: "Casa de Grooming de Luxo",
      copyright: "Â© 2026 Helarys Group",
      heroLine1: "O OFÃCIO", heroLine2: "DOS HOMENS.",
      top10: "Top 10 Barbeiros", gqBadge: "GQ Magazine Â· 2025",
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

  const services: BarberService[] = [
    {
      id: 1, name: "Signature Cut", time: "45 min", price: "â‚¬45", tag: "Bestseller",
      desc: lang === "en"
        ? "Precision cut by master barbers trained in London, Milan and New York. Finished with Baxter of California products."
        : "Corte de precisÃ£o executado por master barbers treinados em Londres, Milano e Nova York. Acabamento com produtos Baxter of California.",
    },
    {
      id: 2, name: "Royal Beard Ritual", time: "35 min", price: "â‚¬35", tag: "Premium",
      desc: lang === "en"
        ? "Complete beard ritual with traditional straight razor, hot eucalyptus towel, premium balms and high-detail contouring."
        : "Ritual completo de barba com navalha tradicional, toalha quente de eucalipto, bÃ¡lsamos premium e contorno de alto detalhe.",
    },
    {
      id: 3, name: "Executive Package", time: "90 min", price: "â‚¬90", tag: "Elite",
      desc: lang === "en"
        ? "Full experience: cut, beard, men's facial treatment, scalp massage and styling with luxury products. The ultimate standard."
        : "ExperiÃªncia total: corte, barba, tratamento facial masculino, scalp massage e styling com produtos de luxo. O standard mÃ¡ximo.",
    },
    {
      id: 4, name: "Scalp Ritual", time: "30 min", price: "â‚¬55", tag: "Wellness",
      desc: lang === "en"
        ? "Deep scalp treatment with imported essential oils, relaxation massage and revitalising tonic."
        : "Tratamento profundo do couro cabeludo com Ã³leos essenciais importados, massagem de relaxamento e tÃ³nico revitalizante.",
    },
  ];

  const tagLabel: Record<string, string> = {
    Bestseller: tBarber.tagBestseller,
    Premium: tBarber.tagPremium,
    Elite: tBarber.tagElite,
    Wellness: tBarber.tagWellness,
  };

  const barbers = [
    { name: "Marcus Helarys", role: tBarber.role1, exp: "12y", img: "/barber1.webp" },
    { name: "AndrÃ© Sousa", role: tBarber.role2, exp: "8y", img: "/barber2.webp" },
    { name: "James Whitfield", role: tBarber.role3, exp: "15y", img: "/barber3.webp" },
  ];

  const testimonials = [
    { name: "Rui Teixeira", city: "Porto", text: tBarber.testimonial1, stars: 5 },
    { name: "Ahmad Al-Rashid", city: "Dubai", text: tBarber.testimonial2, stars: 5 },
    { name: "George H.", city: "London", text: tBarber.testimonial3, stars: 5 },
  ];

  return (
    <div className="h-full flex flex-col bg-[#080808] text-white overflow-hidden relative font-sans">

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-gradient-to-b from-amber-900/20 to-transparent" />
        <div className="absolute top-[-30%] right-[-20%] w-[600px] h-[600px] rounded-full bg-red-900/8 blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-15%] w-[500px] h-[500px] rounded-full bg-amber-900/10 blur-[100px]" />
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundSize: '200px 200px',
        }} />
      </div>

      {/* NAVBAR */}
      <nav className="relative z-30 px-6 md:px-14 py-5 flex items-center justify-between border-b border-white/[0.06] bg-black/60 backdrop-blur-2xl shrink-0">
        <div onClick={() => setView('intro')} className="cursor-pointer flex items-center gap-3 group">
          <div className="relative w-9 h-9 flex items-center justify-center">
            <div className="absolute inset-0 rounded-sm bg-gradient-to-br from-amber-400 to-amber-700 opacity-90" />
            <Scissors size={16} className="relative z-10 text-black" strokeWidth={2.5} />
          </div>
          <div>
            <div className="flex items-baseline gap-1">
              <span className="text-white font-black text-lg tracking-widest">HELARYS</span>
              <span className="text-amber-500 text-xs font-black">Â®</span>
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

          {/* â”€â”€ INTRO / HOME â”€â”€ */}
          {view === 'intro' && (
            <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-full">

              <section className="relative h-[82vh] flex items-end overflow-hidden">
                <img src="/barber.webp" className="absolute inset-0 w-full h-full object-cover opacity-50" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-[#080808]/40 to-transparent" />

                <div className="absolute top-8 right-8 border border-amber-500/40 bg-black/60 backdrop-blur-xl px-5 py-3 text-center hidden md:block">
                  <div className="text-amber-400 text-[9px] uppercase tracking-[0.4em] font-black mb-1">{tBarber.recognized}</div>
                  <div className="text-white text-xs font-bold">{tBarber.top10}</div>
                  <div className="text-white/40 text-[8px] uppercase tracking-widest mt-0.5">{tBarber.gqBadge}</div>
                </div>

                <div className="relative z-10 px-8 md:px-16 pb-16 w-full">
                  <motion.div initial={{ y: 40, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1, duration: 0.8 }}>
                    <div className="flex items-center gap-4 mb-6">
                      <div className="h-px w-12 bg-amber-500" />
                      <span className="text-amber-400 text-[9px] uppercase tracking-[0.6em] font-black">Dubai Â· London Â· Porto</span>
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

          {/* â”€â”€ SERVICES â”€â”€ */}
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

          {/* â”€â”€ BOOK â”€â”€ */}
          {view === 'book' && (
            <BarberBookingForm
              services={services}
              tBarber={tBarber}
              setView={setView}
              setUser={setUser}
            />
          )}

          {/* â”€â”€ DONE â”€â”€ */}
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
                <span>Dubai Â· London Â· Porto</span>
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

      <footer className="relative z-20 border-t border-white/[0.05] bg-black/50 backdrop-blur-xl px-8 md:px-14 py-5 flex flex-col md:flex-row items-center justify-between gap-4 shrink-0">
        <div>
          <h3 className="font-black text-base tracking-widest flex items-baseline gap-0.5">
            HELARYS<span className="text-amber-500 text-lg">Â®</span>
          </h3>
          <p className="text-white/20 text-[8px] uppercase tracking-[0.4em] mt-0.5">{tBarber.luxuryGroomingHouse}</p>
        </div>

        <div className="flex items-center gap-6 text-[8px] uppercase tracking-[0.35em] font-bold text-white/20">
          <span>Dubai</span>
          <span className="text-amber-500/30">Â·</span>
          <span>London</span>
          <span className="text-amber-500/30">Â·</span>
          <span>Porto</span>
        </div>

        <div className="text-[8px] uppercase tracking-widest text-white/15 font-bold">
          {tBarber.copyright}
        </div>
      </footer>
    </div>
  );
}
