"use client"
import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function Paragraph({ children, className }: { children: ReactNode, className?: string }) {
  return(
    <motion.p
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5, duration: 0.8 }}
      className={`${className} text-base md:text-lg`}
    >
      {children}
    </motion.p>
  );
}
