"use client";

import { motion } from "framer-motion";

const items = [
  "Next.js", "TypeScript", "React", "Tailwind CSS", "Supabase",
  "Framer Motion", "Vercel", "PostgreSQL", "REST API", "Node.js",
  "Responsive Design", "SEO-ready", "Dark Mode", "Auth & Roles",
];

function Strip({ reverse = false }: { reverse?: boolean }) {
  return (
    <div className="flex overflow-hidden">
      <motion.div
        animate={{ x: reverse ? ["0%", "50%"] : ["0%", "-50%"] }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        className="flex shrink-0 gap-6"
      >
        {[...items, ...items].map((item, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-2 text-xs font-medium uppercase tracking-[0.2em] text-zinc-500"
          >
            <span className="h-1 w-1 rounded-full bg-cyan-400/40" />
            {item}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

export function TechMarquee() {
  return (
    <div className="relative border-y border-white/[0.05] py-4">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#0B0F19] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#0B0F19] to-transparent" />
      <Strip />
    </div>
  );
}
