"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

type RevealCardProps = {
    children: ReactNode;
    delay?: number;
    className?: string;
};

export default function RevealCard({
    children,
    delay = 0,
    className = "",
}: RevealCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            viewport={{ once: false, amount: 0.35 }}
            transition={{
                opacity: {
                    duration: 0.9,
                    delay,
                    ease: "easeOut",
                },
                x: {
                    duration: 1.2,
                    delay,
                    ease: [0.16, 1, 0.3, 1],
                },
            }}
            className={`will-change-transform ${className}`}
        >
            {children}
        </motion.div>
    );
}