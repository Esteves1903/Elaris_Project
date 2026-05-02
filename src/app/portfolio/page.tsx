"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MapPin, Clock, Users, Star, Calendar, Phone } from 'lucide-react';

// --- 1. BREWHAUS COFFEE & RESTAURANT ---
const BrewhausCafeLayout = () => {
  const [step, setStep] = useState('home'); // 'home' | 'menu' | 'reserve' | 'success'
  const [reservationData, setReservationData] = useState({ name: '', guests: '2', date: '', time: '' });

  const menuItems = [
    { category: 'Specialty Coffees', items: [
      { name: 'Espresso', price: '€3.50', desc: 'Classic Italian espresso' },
      { name: 'Cappuccino', price: '€4.50', desc: 'Smooth milk foam blend' },
      { name: 'Cold Brew', price: '€5.00', desc: 'Bold and smooth' },
    ]},
    { category: 'Pastries', items: [
      { name: 'Croissant', price: '€3.20', desc: 'Buttery and flaky' },
      { name: 'Almond Tart', price: '€4.00', desc: 'Premium almond filling' },
      { name: 'Soufflé Pancake', price: '€6.50', desc: 'Light and fluffy' },
    ]}
  ];

  return (
    <div className="h-full bg-gradient-to-b from-amber-50 to-white text-zinc-900 font-sans overflow-y-auto custom-scrollbar">
      <nav className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-amber-100 px-8 py-4 flex justify-between items-center shadow-sm">
        <div className="font-serif text-2xl font-bold text-amber-900">Brewhaus</div>
        <div className="flex gap-6 text-sm font-medium">
          <button onClick={() => setStep('home')} className={`transition ${step === 'home' ? 'text-amber-900 border-b-2 border-amber-900' : 'text-zinc-600 hover:text-amber-900'}`}>Home</button>
          <button onClick={() => setStep('menu')} className={`transition ${step === 'menu' ? 'text-amber-900 border-b-2 border-amber-900' : 'text-zinc-600 hover:text-amber-900'}`}>Menu</button>
          <button onClick={() => setStep('reserve')} className="bg-amber-900 text-white px-6 py-2 rounded-full hover:bg-amber-800 transition">Reserve</button>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {step === 'home' && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="relative h-96 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=1200&h=600&fit=crop" alt="Cafe" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                <div className="text-center text-white">
                  <h1 className="text-5xl font-serif font-bold mb-4">Welcome to Brewhaus</h1>
                  <p className="text-lg">Specialty Coffee & Fine Dining</p>
                </div>
              </div>
            </div>
            <div className="max-w-4xl mx-auto px-8 py-16">
              <div className="grid grid-cols-3 gap-6 mb-16">
                <div className="text-center p-6 bg-amber-50 rounded-lg">
                  <Clock className="w-8 h-8 mx-auto mb-4 text-amber-900" />
                  <h3 className="font-semibold mb-2">Hours</h3>
                  <p className="text-sm text-zinc-600">Mon-Fri: 7am-10pm<br/>Sat-Sun: 8am-11pm</p>
                </div>
                <div className="text-center p-6 bg-amber-50 rounded-lg">
                  <MapPin className="w-8 h-8 mx-auto mb-4 text-amber-900" />
                  <h3 className="font-semibold mb-2">Location</h3>
                  <p className="text-sm text-zinc-600">123 Coffee Street<br/>Porto, Portugal</p>
                </div>
                <div className="text-center p-6 bg-amber-50 rounded-lg">
                  <Phone className="w-8 h-8 mx-auto mb-4 text-amber-900" />
                  <h3 className="font-semibold mb-2">Contact</h3>
                  <p className="text-sm text-zinc-600">+351 22 1234 5678<br/>hello@brewhaus.pt</p>
                </div>
              </div>
              <div className="bg-gradient-to-r from-amber-100 to-orange-50 p-8 rounded-lg">
                <h2 className="text-2xl font-serif font-bold mb-4 text-amber-900">Why Choose Brewhaus?</h2>
                <ul className="space-y-3 text-zinc-700">
                  <li>✓ Premium single-origin coffee beans</li>
                  <li>✓ Freshly baked pastries daily</li>
                  <li>✓ Cozy atmosphere for work or meetings</li>
                  <li>✓ Free WiFi & Power outlets</li>
                </ul>
              </div>
            </div>
          </motion.div>
        )}

        {step === 'menu' && (
          <motion.div key="menu" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="px-8 py-16 max-w-2xl mx-auto">
            <h2 className="text-3xl font-serif font-bold mb-12 text-amber-900">Our Menu</h2>
            {menuItems.map((section, idx) => (
              <div key={idx} className="mb-12">
                <h3 className="text-xl font-semibold mb-6 pb-2 border-b-2 border-amber-200 text-amber-900">{section.category}</h3>
                <div className="space-y-6">
                  {section.items.map((item, i) => (
                    <div key={i} className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className="font-semibold text-zinc-900">{item.name}</h4>
                        <p className="text-sm text-zinc-500">{item.desc}</p>
                      </div>
                      <span className="font-bold text-amber-900 ml-4">{item.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        )}

        {step === 'reserve' && (
          <motion.div key="reserve" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="px-8 py-16 max-w-md mx-auto">
            <div className="bg-white border-2 border-amber-200 p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-serif font-bold mb-8 text-center text-amber-900">Book Your Table</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-zinc-700 mb-2">Your Name</label>
                  <input type="text" value={reservationData.name} onChange={(e) => setReservationData({...reservationData, name: e.target.value})} placeholder="John Doe" className="w-full border border-amber-200 p-3 rounded-lg text-zinc-900 focus:outline-none focus:border-amber-900" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-zinc-700 mb-2">Number of Guests</label>
                  <select value={reservationData.guests} onChange={(e) => setReservationData({...reservationData, guests: e.target.value})} className="w-full border border-amber-200 p-3 rounded-lg text-zinc-900 focus:outline-none focus:border-amber-900">
                    {[1,2,3,4,5,6,7,8].map(n => <option key={n} value={n}>{n} {n === 1 ? 'Guest' : 'Guests'}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-zinc-700 mb-2">Date</label>
                  <input type="date" value={reservationData.date} onChange={(e) => setReservationData({...reservationData, date: e.target.value})} className="w-full border border-amber-200 p-3 rounded-lg text-zinc-900 focus:outline-none focus:border-amber-900" />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-zinc-700 mb-2">Time</label>
                  <input type="time" value={reservationData.time} onChange={(e) => setReservationData({...reservationData, time: e.target.value})} className="w-full border border-amber-200 p-3 rounded-lg text-zinc-900 focus:outline-none focus:border-amber-900" />
                </div>
                <button onClick={() => reservationData.name && reservationData.date && reservationData.time && setStep('success')} className="w-full py-3 bg-amber-900 text-white font-semibold rounded-lg hover:bg-amber-800 transition">Confirm Reservation</button>
              </div>
            </div>
          </motion.div>
        )}

        {step === 'success' && (
          <motion.div key="success" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="h-96 flex flex-col items-center justify-center text-center px-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-6 text-4xl">✓</div>
            <h3 className="text-3xl font-serif font-bold mb-2 text-amber-900">Reservation Confirmed!</h3>
            <p className="text-zinc-600 mb-6">We'll see you on {reservationData.date} at {reservationData.time}</p>
            <button onClick={() => setStep('home')} className="px-8 py-3 bg-amber-900 text-white rounded-full font-semibold hover:bg-amber-800 transition">Return to Home</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- 2. PRIME CUTS BARBERSHOP ---
const PrimeCutsBarberLayout = () => {
  const [view, setView] = useState('home'); 
  const [bookingData, setBookingData] = useState({ name: '', email: '', service: 'Haircut', date: '', time: '' });

  const services = [
    { name: 'Haircut', price: '€35', duration: '45 min', desc: 'Professional cut with precision' },
    { name: 'Beard Trim', price: '€20', duration: '20 min', desc: 'Shaping and detail work' },
    { name: 'Hot Shave', price: '€30', duration: '30 min', desc: 'Straight razor shave' },
    { name: 'Full Treatment', price: '€60', duration: '90 min', desc: 'Haircut + Beard + Massage' },
  ];

  const barbers = [
    { name: 'Marco', specialty: 'Classic Cuts', rating: 4.9 },
    { name: 'David', specialty: 'Fades & Designs', rating: 4.8 },
    { name: 'João', specialty: 'Beard Specialist', rating: 4.9 },
  ];

  return (
    <div className="h-full bg-gradient-to-b from-slate-900 via-slate-800 to-black text-white font-sans overflow-y-auto custom-scrollbar">
      <header className="sticky top-0 z-30 bg-black/80 backdrop-blur-md border-b border-red-900/50 px-8 py-5 flex justify-between items-center">
        <h1 className="text-3xl font-black text-red-600 italic tracking-tight">PRIME CUTS</h1>
        <nav className="flex gap-8 text-sm font-bold uppercase tracking-widest">
          <button onClick={() => setView('home')} className={`transition ${view === 'home' ? 'text-red-600' : 'text-zinc-400 hover:text-white'}`}>Home</button>
          <button onClick={() => setView('services')} className={`transition ${view === 'services' ? 'text-red-600' : 'text-zinc-400 hover:text-white'}`}>Services</button>
          <button onClick={() => setView('book')} className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition">Book Now</button>
        </nav>
      </header>

      <AnimatePresence mode="wait">
        {view === 'home' && (
          <motion.div key="home" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="relative h-96 overflow-hidden">
              <img src="https://images.unsplash.com/photo-1599458438107-6fad2dd5c1ea?w=1200&h=600&fit=crop" alt="Barbershop" className="w-full h-full object-cover opacity-60" />
              <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/40 flex items-center justify-center">
                <div className="text-center">
                  <h1 className="text-5xl font-black mb-4 tracking-tight">SHARP LINES<br/>COLD STEEL</h1>
                  <p className="text-red-400 font-bold text-lg tracking-widest">PORTO • ESTABLISHED 2020</p>
                </div>
              </div>
            </div>
            <div className="max-w-4xl mx-auto px-8 py-16">
              <div className="grid grid-cols-2 gap-8 mb-16">
                <div className="border-l-4 border-red-600 pl-6">
                  <h3 className="text-sm font-black uppercase tracking-widest text-red-600 mb-2">Hours</h3>
                  <p className="text-zinc-400">Mon-Fri: 10am-8pm<br/>Sat: 9am-7pm<br/>Sun: Closed</p>
                </div>
                <div className="border-l-4 border-red-600 pl-6">
                  <h3 className="text-sm font-black uppercase tracking-widest text-red-600 mb-2">Location</h3>
                  <p className="text-zinc-400">Rua dos Barbeiros 42<br/>Porto, Portugal<br/>+351 22 5678 9012</p>
                </div>
              </div>
              <div className="mb-16">
                <h2 className="text-2xl font-black mb-8 uppercase tracking-tight">Our Barbers</h2>
                <div className="grid grid-cols-3 gap-6">
                  {barbers.map((barber, idx) => (
                    <div key={idx} className="p-6 bg-white/5 border border-red-600/30 rounded-lg hover:border-red-600 transition">
                      <div className="w-full h-32 bg-zinc-700 rounded-lg mb-4" />
                      <h4 className="font-bold text-lg mb-1">{barber.name}</h4>
                      <p className="text-sm text-zinc-400 mb-2">{barber.specialty}</p>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => <span key={i} className={i < Math.floor(barber.rating) ? 'text-yellow-500' : 'text-zinc-600'}>★</span>)}
                        <span className="text-xs text-zinc-400 ml-2">{barber.rating}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {view === 'services' && (
          <motion.div key="services" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} className="max-w-2xl mx-auto px-8 py-16">
            <h2 className="text-3xl font-black mb-12 uppercase tracking-tight">Services & Pricing</h2>
            <div className="space-y-4">
              {services.map((service, idx) => (
                <div key={idx} className="p-6 bg-gradient-to-r from-red-600/10 to-transparent border border-red-600/30 rounded-lg hover:border-red-600 transition cursor-pointer group">
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-black text-lg uppercase tracking-wider mb-2 group-hover:text-red-400 transition">{service.name}</h4>
                      <p className="text-zinc-400 text-sm">{service.desc}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-black text-red-600 mb-1">{service.price}</div>
                      <div className="text-xs text-zinc-500">{service.duration}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {view === 'book' && (
          <motion.div key="book" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="max-w-md mx-auto px-8 py-16">
            <div className="bg-zinc-900/50 border border-red-600/50 p-8 backdrop-blur-xl rounded-lg">
              <h3 className="text-2xl font-black uppercase tracking-wide mb-8 text-center">Book Appointment</h3>
              <div className="space-y-4">
                <input type="text" placeholder="Your Name" value={bookingData.name} onChange={(e) => setBookingData({...bookingData, name: e.target.value})} className="w-full bg-black border border-red-600/30 p-3 text-sm focus:border-red-600 outline-none transition-colors text-white placeholder-zinc-600 uppercase tracking-widest" />
                <input type="email" placeholder="Email" value={bookingData.email} onChange={(e) => setBookingData({...bookingData, email: e.target.value})} className="w-full bg-black border border-red-600/30 p-3 text-sm focus:border-red-600 outline-none transition-colors text-white placeholder-zinc-600 uppercase tracking-widest" />
                <select value={bookingData.service} onChange={(e) => setBookingData({...bookingData, service: e.target.value})} className="w-full bg-black border border-red-600/30 p-3 text-sm focus:border-red-600 outline-none transition-colors text-white uppercase tracking-widest">
                  {services.map(s => <option key={s.name} value={s.name}>{s.name}</option>)}
                </select>
                <input type="date" value={bookingData.date} onChange={(e) => setBookingData({...bookingData, date: e.target.value})} className="w-full bg-black border border-red-600/30 p-3 text-sm focus:border-red-600 outline-none transition-colors text-white uppercase tracking-widest" />
                <input type="time" value={bookingData.time} onChange={(e) => setBookingData({...bookingData, time: e.target.value})} className="w-full bg-black border border-red-600/30 p-3 text-sm focus:border-red-600 outline-none transition-colors text-white uppercase tracking-widest" />
                <button onClick={() => bookingData.name && bookingData.email && bookingData.date && bookingData.time && setView('success')} className="w-full py-3 bg-red-600 text-white font-black uppercase tracking-[0.3em] rounded hover:bg-red-700 transition active:scale-95">Confirm Booking</button>
              </div>
            </div>
          </motion.div>
        )}

        {view === 'success' && (
          <motion.div key="success" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="h-96 flex flex-col items-center justify-center text-center px-8">
            <div className="w-20 h-20 border-4 border-red-600 rounded-full flex items-center justify-center mb-6 text-red-600 text-3xl">✓</div>
            <h3 className="text-3xl font-black uppercase tracking-tight mb-2 text-red-600">Appointment Booked</h3>
            <p className="text-zinc-400 mb-6">Your appointment is confirmed for<br/>{bookingData.date} at {bookingData.time}</p>
            <button onClick={() => setView('home')} className="px-8 py-3 bg-red-600 text-white rounded font-black uppercase tracking-widest hover:bg-red-700 transition">Back to Home</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- MAIN PORTFOLIO ---
export default function Portfolio() {
  const [activeProject, setActiveProject] = useState<any>(null);

  useEffect(() => {
    if (activeProject) {
      document.body.style.overflow = 'hidden';
      document.body.style.paddingRight = '15px';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.paddingRight = '0px';
    }
  }, [activeProject]);

  const projects = [
    {
      id: 1,
      title: "Brewhaus Coffee & Restaurant",
      url: "brewhaus-cafe.com",
      layout: <BrewhausCafeLayout />,
      tech: ["Next.js 14", "Framer Motion", "Tailwind CSS", "Booking System"],
      description: "A modern cafe and restaurant website featuring an elegant menu, online reservations, and a warm, inviting interface.",
      features: ["Online Menu", "Table Reservations", "Operating Hours", "Location & Contact", "Staff Showcase"]
    },
    {
      id: 2,
      title: "Prime Cuts Barbershop",
      url: "primecuts-barber.com",
      layout: <PrimeCutsBarberLayout />,
      tech: ["React", "TypeScript", "Framer Motion", "Appointment System"],
      description: "A professional barbershop website with aggressive branding, service showcase, and barber profiles.",
      features: ["Appointment Booking", "Barber Profiles", "Service Gallery", "Rating System", "Mobile Optimized"]
    }
  ];

  return (
    <main className="min-h-screen bg-[#0B0F19] px-6 pb-24 pt-32 text-white">
      <div className="max-w-5xl mx-auto">
        <header className="mb-32">
          <section className="mx-auto max-w-6xl">
            <div className="max-w-3xl">
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.35em] text-cyan-400">
                Portfolio
              </p>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Interactive layouts for cafes & services
              </h1>
              <p className="text-zinc-400 text-lg max-w-xl leading-relaxed">
                Specialized website designs for hospitality and service businesses. 
                Explore fully interactive prototypes with booking systems, menus, and more.
              </p>
            </div>
          </section>
        </header>

        <div className="space-y-60">
          {projects.map((p) => (
            <div key={p.id} className="relative group">
              <div className="flex justify-between items-center mb-10 flex-col md:flex-row gap-4">
                <div className="flex items-center gap-4">
                  <span className="text-4xl font-black text-zinc-800">0{p.id}</span>
                  <h3 className="text-3xl font-bold tracking-tight">{p.title}</h3>
                </div>
                <div className="hidden md:flex flex-wrap gap-2 justify-end">
                  {p.tech.map(t => (
                    <span key={t} className="text-[10px] text-cyan-400 border border-cyan-400/20 px-3 py-1 rounded-full uppercase tracking-widest bg-cyan-400/5">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="rounded-[2.5rem] overflow-hidden border border-white/10 bg-zinc-900 shadow-[0_0_80px_rgba(0,0,0,0.5)]">
                <div className="bg-zinc-800/50 px-8 py-5 flex items-center justify-between border-b border-white/5">
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500" />
                    <div className="w-3 h-3 rounded-full bg-green-500" />
                  </div>
                  <div className="bg-black/40 px-4 py-1.5 rounded-lg text-[9px] font-mono text-zinc-400 border border-white/5 tracking-widest uppercase">
                    {p.url}
                  </div>
                  <div className="w-10" />
                </div>
                <div className="h-[550px] relative">
                  {p.layout}
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-cyan-400 mb-3">Description</h4>
                  <p className="text-zinc-400">{p.description}</p>
                </div>
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-widest text-cyan-400 mb-3">Key Features</h4>
                  <ul className="space-y-2">
                    {p.features.map((f, i) => (
                      <li key={i} className="text-zinc-400 flex items-center gap-2">
                        <span className="w-2 h-2 bg-cyan-400 rounded-full" />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-12 flex justify-center">
                <button
                  onClick={() => setActiveProject(p)}
                  className="px-12 py-5 bg-white text-black rounded-full font-black text-[11px] uppercase tracking-[0.3em] hover:bg-cyan-400 transition-all active:scale-95 shadow-xl shadow-white/10"
                >
                  View Case Study
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {activeProject && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProject(null)}
              className="fixed inset-0 bg-black/95 backdrop-blur-2xl z-[100] cursor-crosshair"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 200 }}
              className="fixed inset-y-0 right-0 w-full max-w-2xl bg-zinc-950 z-[101] border-l border-white/10 flex flex-col"
            >
              <div className="flex-1 overflow-y-auto p-12 md:p-24 custom-scrollbar">
                <button 
                  onClick={() => setActiveProject(null)} 
                  className="text-cyan-400 font-mono text-xs mb-16 uppercase tracking-[0.4em] hover:translate-x-2 transition-transform"
                >
                  ← Back to Portfolio
                </button>
                <h2 className="text-5xl font-black italic mb-8 leading-none uppercase">{activeProject.title}</h2>
                <p className="text-zinc-500 text-lg font-light leading-relaxed mb-12">{activeProject.description}</p>

                <div className="space-y-12">
                  <div className="p-10 rounded-[2rem] bg-zinc-900/50 border border-white/5">
                    <h4 className="text-xs font-bold uppercase tracking-widest mb-6 text-cyan-400">Technical Stack</h4>
                    <div className="flex flex-wrap gap-4 font-mono text-[10px]">
                      {activeProject.tech.map((t: string) => (
                        <span key={t} className="bg-black px-4 py-2 rounded-lg border border-white/5 tracking-wider">{t}</span>
                      ))}
                    </div>
                  </div>

                  <div className="p-10 rounded-[2rem] bg-zinc-900/50 border border-white/5">
                    <h4 className="text-xs font-bold uppercase tracking-widest mb-6 text-cyan-400">Features Included</h4>
                    <ul className="space-y-3">
                      {activeProject.features.map((f: string) => (
                        <li key={f} className="text-zinc-400 flex items-center gap-3">
                          <span className="w-2 h-2 bg-cyan-400 rounded-full flex-shrink-0" />
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href="/contact"
                    className="block w-full py-6 bg-cyan-400 text-black text-center font-black rounded-2xl uppercase text-[10px] tracking-[0.2em] shadow-2xl shadow-cyan-400/20 hover:bg-white transition-all"
                  >
                    Request a Similar Website
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.05); border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #22d3ee; }
        .vertical-text { writing-mode: vertical-rl; transform: rotate(180deg); }
      `}</style>
    </main>
  );
}