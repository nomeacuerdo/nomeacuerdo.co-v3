"use client"
import { ReactNode, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

export default function AnimatedContainer({ children }: { children: ReactNode }) {
  const pageLoad = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      await pageLoad.start({ opacity: 1, transition: { duration: 0.5 } });
      await pageLoad.start({ y: 0, opacity: 1, transition: { duration: 0.8, delay: 0.2 } });
    };
    sequence();
  }, [pageLoad]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={pageLoad}
      className="min-h-screen flex flex-col items-center py-12 space-y-20"
    >
      {children}
    </motion.div>
  );
}
