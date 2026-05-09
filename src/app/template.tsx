"use client";

import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import { introHasRun } from "@/components/ui/IntroAnimation";

export default function Template({ children }: { children: React.ReactNode }) {
  const isHome = usePathname() === "/";
  const showingIntro = isHome && !introHasRun();

  return (
    <motion.div
      initial={{ opacity: 0, y: isHome ? 6 : 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: isHome ? 0.55 : 0.35,
        ease: [0.25, 0.1, 0.25, 1],
        delay: showingIntro ? 2.3 : 0,
      }}
    >
      {children}
    </motion.div>
  );
}
