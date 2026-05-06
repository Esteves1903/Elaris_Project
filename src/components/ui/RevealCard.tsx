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
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{
                opacity: {
                    duration: 0.7,
                    delay,
                    ease: "easeOut",
                },
                y: {
                    duration: 0.9,
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
