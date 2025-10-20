"use client"
import { motion } from "framer-motion";

export default function Avatar() {
  return(
    <motion.img
      src="https://avatars.githubusercontent.com/u/1702714?v=4"
      alt="nomeacuerdo"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1 }}
      className="w-32 h-32 rounded-full mx-auto border-4 border-orange-500 shadow-[0_0_5px_rgba(255,115,0,0.8)]"
    />
  );
}
