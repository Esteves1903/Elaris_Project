"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function ScrollProgress() {
  const raw = useMotionValue(0);
  const scaleX = useSpring(raw, { stiffness: 200, damping: 30 });

  useEffect(() => {
    const update = () => {
      const total = document.body.scrollHeight - window.innerHeight;
      raw.set(total > 0 ? window.scrollY / total : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, [raw]);

  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0%" }}
      className="fixed left-0 top-0 z-[200] h-[2px] w-full bg-gradient-to-r from-cyan-400 to-blue-500"
    />
  );
}
