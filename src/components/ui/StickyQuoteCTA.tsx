"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { useLang } from "@/context/LanguageContext";

const HIDDEN_PATHS = ["/contact", "/client-login", "/client-area", "/admin", "/forgot-password", "/reset-password"];

const label = { en: "Get a free quote", pt: "Pedir orçamento grátis" };

export function StickyQuoteCTA() {
  const pathname = usePathname();
  const { lang } = useLang();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const hidden = HIDDEN_PATHS.some((p) => pathname.startsWith(p));

  return (
    <AnimatePresence>
      {visible && !hidden && (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.95 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 z-[150]"
        >
          <Link
            href="/contact"
            className="group flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-semibold text-black shadow-[0_8px_32px_rgba(0,0,0,0.4)] transition hover:bg-zinc-100"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-500 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500" />
            </span>
            {label[lang]}
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
