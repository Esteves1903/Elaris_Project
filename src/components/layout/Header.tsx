"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { UserCircle, Menu, X, LogOut } from "lucide-react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabase";
import { signOut } from "@/lib/auth";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/process", label: "Process" },
  { href: "/portfolio", label: "Portfolio" },
];

type SessionState = {
  role: "admin" | "client" | null;
  name: string | null;
};

export function Header() {
  const pathname = usePathname();
  const router = useRouter();
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
      const role = s.user.user_metadata?.role as "admin" | "client" | null;
      const name = s.user.user_metadata?.name ?? s.user.email ?? null;
      setSession({ role, name });
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, s) => {
      if (!s) {
        setSession({ role: null, name: null });
        return;
      }
      const role = s.user.user_metadata?.role as "admin" | "client" | null;
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

  const AuthButton = () =>
    session.role ? (
      <div className="flex items-center gap-2">
        <Link
          href={dashboardHref}
          className="inline-flex items-center gap-2 rounded-full border border-cyan-400/30 bg-cyan-400/[0.06] px-4 py-2.5 text-sm font-semibold text-cyan-300 transition hover:bg-cyan-400/10"
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
        className="inline-flex items-center gap-2 rounded-full border border-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:border-cyan-400/40 hover:bg-white/[0.06]"
      >
        <UserCircle className="h-4 w-4 text-cyan-400" />
        Client Area
      </Link>
    );

  return (
    <>
      <header className={`fixed left-0 top-0 z-50 w-full border-b backdrop-blur-xl transition-all duration-300 ${scrolled ? "border-white/10 bg-[#0B0F19]/95 shadow-lg shadow-black/20" : "border-transparent bg-[#0B0F19]/70"}`}>
        <div className="mx-auto grid h-20 max-w-6xl grid-cols-3 items-center px-6">
          <Link href="/" className="flex items-center justify-self-start">
            <img
              src="/brand/logo-horizontal-transparent.svg"
              alt="Elaris"
              className="h-10 w-auto object-contain shrink-0"
            />
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
                {link.label}
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
            <AuthButton />
            <Link
              href="/contact"
              className="inline-flex rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-200"
            >
              Request a quote
            </Link>
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
                <img
                  src="/brand/logo-horizontal-transparent.svg"
                  alt="Elaris"
                  className="h-8 w-auto"
                />
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
                    {link.label}
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
                      Log out
                    </button>
                  </>
                ) : (
                  <Link
                    href="/client-login"
                    onClick={() => setMobileOpen(false)}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/10 px-4 py-2.5 text-sm font-semibold text-white transition hover:border-cyan-400/40 hover:bg-white/[0.06]"
                  >
                    <UserCircle className="h-4 w-4 text-cyan-400" />
                    Client Area
                  </Link>
                )}
                <Link
                  href="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="inline-flex justify-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition hover:bg-zinc-200"
                >
                  Request a quote
                </Link>
              </div>

              <div className="mt-auto border-t border-white/10 pt-6">
                <p className="text-xs text-zinc-600">contact@elaris.com</p>
                <p className="mt-1 text-xs text-zinc-700">© 2026 Elaris</p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
