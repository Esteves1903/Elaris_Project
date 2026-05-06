"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";
import type { ReactNode } from "react";

type SpotlightCardProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function SpotlightCard({ children, className = "", delay = 0 }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    setPos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        opacity: { duration: 0.7, delay, ease: "easeOut" },
        y: { duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] },
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setOpacity(1)}
      onMouseLeave={() => setOpacity(0)}
      className={`relative will-change-transform ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
        style={{
          opacity,
          background: `radial-gradient(380px circle at ${pos.x}px ${pos.y}px, rgba(34,211,238,0.07), transparent 70%)`,
        }}
      />
      {children}
    </motion.div>
  );
}
