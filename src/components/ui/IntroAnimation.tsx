"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

/* Persists across SPA navigation, resets on hard refresh */
let _introHasRun = false;
export function introHasRun() { return _introHasRun; }

/* ── Component ─────────────────────────────────────────────────────────── */
export function IntroAnimation() {
  const [visible, setVisible] = useState(true);
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "hold" | "reveal">("loading");
  const rafRef = useRef<number | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const cleanup = useCallback(() => {
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
  }, []);

  const startAnimation = useCallback(() => {
    cleanup();
    setProgress(0);
    setPhase("loading");
    setVisible(true);

    const DURATION = 1900;
    const start = performance.now();

    const tick = (now: number) => {
      const p = Math.min(Math.round(((now - start) / DURATION) * 100), 100);
      setProgress(p);
      if (p < 100) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setPhase("hold");
        timerRef.current = setTimeout(() => {
          setPhase("reveal");
        }, 550);
      }
    };

    rafRef.current = requestAnimationFrame(tick);
  }, [cleanup]);

  useEffect(() => {
    if (_introHasRun) {
      setVisible(false);
      return;
    }
    _introHasRun = true;
    startAnimation();
    return cleanup;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (!visible) return null;

  const isRevealing = phase === "reveal";
  const isHold = phase === "hold";

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center select-none overflow-hidden"
      style={{
        backgroundColor: "#070B14",
        backgroundImage: `
          linear-gradient(rgba(34,211,238,0.03) 1px, transparent 1px),
          linear-gradient(90deg, rgba(34,211,238,0.03) 1px, transparent 1px)
        `,
        backgroundSize: "72px 72px",
      }}
      animate={isRevealing ? { y: "-100%" } : { y: 0 }}
      transition={
        isRevealing
          ? { duration: 0.85, ease: [0.76, 0, 0.24, 1] }
          : { duration: 0 }
      }
      onAnimationComplete={() => { if (isRevealing) setVisible(false); }}
    >
      {/* Ambient glow */}
      <div
        className="pointer-events-none absolute"
        style={{
          width: 600, height: 300, borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(34,211,238,0.07) 0%, transparent 65%)",
          top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        }}
      />

      {/* Scan line */}
      <motion.div
        className="pointer-events-none absolute left-0 right-0"
        style={{
          height: 1,
          background: "linear-gradient(90deg, transparent 0%, rgba(34,211,238,0.5) 30%, rgba(255,255,255,0.8) 50%, rgba(34,211,238,0.5) 70%, transparent 100%)",
          boxShadow: "0 0 12px rgba(34,211,238,0.6)",
        }}
        initial={{ top: "-1%" }}
        animate={{ top: "101%" }}
        transition={{ duration: 1.6, ease: "linear", delay: 0.15 }}
      />

      {/* Corner brackets */}
      {([
        { pos: { top: 32, left: 32 },   tw: 1, tb: 0, tl: 1, tr: 0 },
        { pos: { top: 32, right: 32 },  tw: 1, tb: 0, tl: 0, tr: 1 },
        { pos: { bottom: 32, left: 32 },  tw: 0, tb: 1, tl: 1, tr: 0 },
        { pos: { bottom: 32, right: 32 }, tw: 0, tb: 1, tl: 0, tr: 1 },
      ] as const).map((b, i) => (
        <motion.div
          key={i}
          className="absolute"
          style={{
            width: 20, height: 20,
            borderColor: "rgba(34,211,238,0.35)",
            borderTopWidth: b.tw, borderBottomWidth: b.tb,
            borderLeftWidth: b.tl, borderRightWidth: b.tr,
            ...b.pos,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 + i * 0.06, duration: 0.4 }}
        />
      ))}

      {/* Centre content */}
      <div className="relative flex flex-col items-center">

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.86, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
        >
          <span
            className="text-4xl font-bold tracking-tight bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent select-none"
            style={{
              filter: isHold || isRevealing
                ? "drop-shadow(0 0 14px rgba(34,211,238,0.55))"
                : "none",
              transition: "filter 0.4s ease",
            }}
          >
            Helarys
          </span>
        </motion.div>

        {/* Progress bar */}
        <div
          className="relative mt-9 overflow-hidden"
          style={{ width: 160, height: 1, background: "rgba(255,255,255,0.05)" }}
        >
          <div
            style={{
              position: "absolute", left: 0, top: 0, height: "100%",
              width: `${progress}%`,
              background: "linear-gradient(90deg, #22d3ee, #60a5fa)",
              boxShadow: "0 0 10px rgba(34,211,238,0.9), 0 0 20px rgba(34,211,238,0.3)",
              transition: "width 0.04s linear",
            }}
          />
        </div>

        {/* Status row */}
        <div className="mt-4 flex items-center gap-4">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.18 }}
            transition={{ delay: 0.35, duration: 0.4 }}
            className="font-mono text-white tabular-nums"
            style={{ fontSize: 10, letterSpacing: "0.45em" }}
          >
            {String(progress).padStart(3, "0")}
          </motion.span>

          <AnimatePresence>
            {(isHold || isRevealing) && (
              <motion.span
                initial={{ opacity: 0, x: -6 }}
                animate={{ opacity: 0.5, x: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="font-mono text-cyan-400"
                style={{ fontSize: 9, letterSpacing: "0.35em" }}
              >
                READY
              </motion.span>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Curtain bottom edge glow */}
      <motion.div
        className="absolute bottom-0 left-0 right-0"
        style={{ height: 1 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: isRevealing ? 1 : 0 }}
        transition={{ duration: 0.15 }}
      >
        <div style={{
          height: "100%",
          background: "linear-gradient(90deg, transparent 0%, #22d3ee 20%, #ffffff 50%, #22d3ee 80%, transparent 100%)",
          boxShadow: "0 0 24px 2px rgba(34,211,238,0.9)",
        }} />
      </motion.div>
    </motion.div>
  );
}
