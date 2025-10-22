"use client"
import { ReactNode, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { fadeVariants } from "@/constants";

function useScrollFadeIn(threshold = 0.1) {
  const controls = useAnimation();
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) controls.start("visible");
        });
      },
      { threshold }
    );
    const elements = document.querySelectorAll(".fade-section");
    elements.forEach((el) => observer.observe(el));
    return () => elements.forEach((el) => observer.unobserve(el));
  }, [controls, threshold]);
  return controls;
}

export default function AnimatedSection(
  { children, id, animate, className }:
  { children?: ReactNode, id: string, animate?: string, className?: string }
) {
  const controls = useScrollFadeIn();
  const defaultClasses = "px-4 text-center space-y-6 fade-section scroll-mt-[60px]";
  
  return (
    <motion.section
      id={id}
      className={className || defaultClasses}
      variants={fadeVariants}
      initial="hidden"
      animate={animate || controls}
    >
      {children}
    </motion.section>
  );
}
