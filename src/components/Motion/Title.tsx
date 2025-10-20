"use client"
import { motion } from "framer-motion";
import { ReactNode } from "react";

export default function Title({ children }: { children: ReactNode }) {
  return(
    <motion.h1
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.8 }}
      className="text-3xl md:text-4xl"
    >
      {children}
    </motion.h1>
  );
}

