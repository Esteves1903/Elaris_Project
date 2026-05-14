"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { UserCircle, Menu, X, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { signOut } from "@/lib/auth";
import { useLang } from "@/context/LanguageContext";

const navLinks = [
  { href: "/", en: "Home", pt: "Início" },
  { href: "/services", en: "Services", pt: "Serviços" },
  { href: "/portfolio", en: "Portfolio", pt: "Portfólio" },
  { href: "/pricing", en: "Pricing", pt: "Preços" },
  { href: "/about", en: "About", pt: "Sobre" },
];

const t = {
  clientArea: { en: "Client Area", pt: "Área de Cliente" },
  requestQuote: { en: "Request a quote", pt: "Pedir orçamento" },
  logOut: { en: "Log out", pt: "Sair" },
};

type SessionState = {
  role: "admin" | "client" | null;
  name: string | null;
};

function LangSwitch({ lang, setLang }: { lang: "en" | "pt"; setLang: (l: "en" | "pt") => void }) {
  return (
    <div
      role="switch"
      aria-checked={lang === "pt"}
      aria-label="Toggle language"
      onClick={() => setLang(lang === "en" ? "pt" : "en")}
      className="relative flex cursor-pointer select-none items-center rounded-full border border-white/10 bg-white/[0.03] p-0.5"
    >
      <motion.div
        className="absolute top-0.5 bottom-0.5 rounded-full bg-white/[0.13]"
        animate={{ left: lang === "en" ? "2px" : "calc(50%)" }}
        style={{ width: "calc(50% - 2px)" }}
        transition={{ type: "spring", stiffness: 500, damping: 38 }}
      />
      <span className={`relative z-10 w-8 py-1 text-center text-xs font-semibold transition-colors duration-150 ${lang === "en" ? "text-white" : "text-zinc-500"}`}>
        EN
      </span>
      <span className={`relative z-10 w-8 py-1 text-center text-xs font-semibold transition-colors duration-150 ${lang === "pt" ? "text-white" : "text-zinc-500"}`}>
        PT
      </span>
    </div>
  );
}

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { lang, setLang } = useLang();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [session, setSession] = useState<SessionState>({ role: null, name: null });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session: s } }) => {
      if (!s) return;
      const role = s.user.app_metadata?.role as "admin" | "client" | null;
      const name = s.user.user_metadata?.name ?? s.user.email ?? null;
      setSession({ role, name });
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
      if (!s) {
        setSession({ role: null, name: null });
        return;
      }
      const role = s.user.app_metadata?.role as "admin" | "client" | null;
      const name = s.user.user_metadata?.name ?? s.user.email ?? null;
      setSession({ role, name });
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    await signOut();
    setSession({ role: null, name: null });
    router.push("/");
  }

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  const dashboardHref = session.role === "admin" ? "/admin" : "/client-area";
  const displayName = session.role === "admin" ? "Admin" : session.name;

  return (
    <>
      <header className={`fixed left-0 top-0 z-50 w-full border-b backdrop-blur-xl transition-all duration-300 ${scrolled ? "border-white/10 bg-[#0B0F19]/95 shadow-lg shadow-black/20" : "border-transparent bg-[#0B0F19]/70"}`}>
        <div className="mx-auto grid h-20 max-w-6xl grid-cols-[1fr_auto_1fr] items-center gap-x-6 px-6">
          <Link
            href="/"
            className="flex items-center justify-self-start"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <motion.div
              className="flex items-center gap-2.5 select-none"
              initial={{ filter: "drop-shadow(0 0 0px rgba(34,211,238,0))" }}
              whileHover={{ scale: 1.05, filter: "drop-shadow(0 0 10px rgba(34,211,238,0.35))" }}
              transition={{ type: "spring", stiffness: 350, damping: 22 }}
            >
              <Image src="/brand/icon.svg" alt="" width={48} height={48} priority className="h-12 w-12" />
              <span
                className="text-2xl font-bold tracking-tight bg-clip-text text-transparent"
                style={{
                  backgroundImage: "linear-gradient(90deg, #03D3FB 0%, #01C9FC 35%, #0265F9 65%, #03D3FB 100%)",
                  backgroundSize: "400% auto",
                  animation: "logo-sweep 12s linear infinite",
                }}
              >
                Helarys
              </span>
            </motion.div>
          </Link>

          <nav className="hidden items-center justify-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition ${
                  isActive(link.href) ? "text-white" : "text-zinc-400 hover:text-white"
                }`}
              >
                {link[lang]}
                {isActive(link.href) && (
                  <motion.span
                    layoutId="nav-underline"
                    className="mt-0.5 block h-px bg-cyan-400"
                  />
                )}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center justify-self-end gap-3 md:flex">
            {session.role ? (
              <div className="flex items-center gap-2">
                <Link
                  href={dashboardHref}
                  className="inline-flex items-center gap-2 whitespace-nowrap rounded-full border border-cyan-400/30 bg-cyan-400/[0.06] px-4 py-2.5 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-400/10"
                >
                  <UserCircle className="h-4 w-4" />
                  {displayName}
                </Link>
                <button
                  onClick={handleLogout}
                  className="inline-flex items-center justify-center rounded-full border border-white/10 p-2.5 text-zinc-400 transition hover:border-red-400/30 hover:text-red-400"
                  aria-label="Log out"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <Link
                href="/client-login"
                className="inline-flex items-center justify-center rounded-full border border-white/10 p-2.5 text-white transition hover:border-cyan-400/40 hover:bg-white/[0.06]"
                aria-label={t.clientArea[lang]}
              >
                <UserCircle className="h-4 w-4 text-cyan-400" />
              </Link>
            )}
            <Link
              href="/contact"
              className="inline-flex whitespace-nowrap rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-200"
            >
              {t.requestQuote[lang]}
            </Link>
            <LangSwitch lang={lang} setLang={setLang} />
          </div>

          <button
            className="col-start-3 justify-self-end text-white md:hidden"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 260 }}
              className="fixed right-0 top-0 z-[70] flex h-full w-72 flex-col bg-[#0B0F19] px-8 py-8 border-l border-white/10"
            >
              <div className="flex items-center justify-between mb-10">
                <div className="flex items-center gap-2 select-none">
                  <Image src="/brand/icon.svg" alt="" width={40} height={40} className="h-10 w-10" />
                  <span
                    className="text-xl font-bold tracking-tight bg-clip-text text-transparent"
                    style={{
                      backgroundImage: "linear-gradient(90deg, #03D3FB 0%, #01C9FC 40%, #0265F9 100%)",
                      backgroundSize: "200% auto",
                      animation: "shimmer 4s linear infinite",
                    }}
                  >
                    Helarys
                  </span>
                </div>
                <button
                  onClick={() => setMobileOpen(false)}
                  className="text-zinc-400 hover:text-white"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex flex-col gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={`rounded-xl px-4 py-3 text-sm font-medium transition ${
                      isActive(link.href)
                        ? "bg-white/10 text-white"
                        : "text-zinc-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    {link[lang]}
                  </Link>
                ))}
              </nav>

              <div className="mt-10 flex flex-col gap-3">
                {session.role ? (
                  <>
                    <Link
                      href={dashboardHref}
                      onClick={() => setMobileOpen(false)}
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/[0.06] px-4 py-2.5 text-sm font-semibold text-cyan-300 transition"
                    >
                      <UserCircle className="h-4 w-4" />
                      {displayName}
                    </Link>
                    <button
                      onClick={() => { setMobileOpen(false); handleLogout(); }}
                      className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-4 py-2.5 text-sm font-semibold text-zinc-400 transition hover:text-red-400"
                    >
                      <LogOut className="h-4 w-4" />
                      {t.logOut[lang]}
                    </button>
                  </>
                ) : (
                  <Link
                    href="/client-login"
                    onClick={() => setMobileOpen(false)}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:border-cyan-400/40 hover:bg-white/[0.06]"
                  >
                    <UserCircle className="h-4 w-4 text-cyan-400" />
                    {t.clientArea[lang]}
                  </Link>
                )}
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-200"
                >
                  {t.requestQuote[lang]}
                </Link>
                <div className="flex justify-center">
                  <LangSwitch lang={lang} setLang={setLang} />
                </div>
              </div>

              <div className="mt-auto border-t border-white/10 pt-6">
                <p className="text-xs text-zinc-600">contact@helarys.com</p>
                <p className="mt-1 text-xs text-zinc-700">© 2026 Helarys</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
