"use client";
// 📍 src/components/animations/page-transition.tsx

import { motion } from "framer-motion";

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export function PageTransition({ children, className }: PageTransitionProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.97, filter: "blur(10px)" }}
      animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
      exit={{ opacity: 0, scale: 1.01, filter: "blur(6px)" }}
      transition={{
        duration: 0.45,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export function SlideTransition({ children, className }: PageTransitionProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: 40, filter: "blur(8px)" }}
      animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
      exit={{ opacity: 0, x: -40, filter: "blur(4px)" }}
      transition={{ duration: 0.38, ease: [0.4, 0, 0.2, 1] }}
    >
      {children}
    </motion.div>
  );
}
