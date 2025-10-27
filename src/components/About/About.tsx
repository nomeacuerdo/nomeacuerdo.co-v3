"use client"
import React, { useState, useEffect, useRef } from "react";
import WAVES from "vanta/dist/vanta.waves.min";
// import Script from 'next/script';
import { FaChevronDown } from "react-icons/fa";
import Avatar from "@/components/Motion/Avatar";
import Title from "@/components/Motion/Title";
import Paragraph from "@/components/Motion/Paragraph";
import Section from "@/components/Motion/Section";
import Footer from "@/components/Footer";
import styles from './About.module.css';

export default function About() {  
  const [vantaEffect, setVantaEffect] = useState<ReturnType<typeof WAVES> | null>(null);
  const vantaRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const effect = WAVES({
      el: vantaRef.current,
      color: 0x002d4b,
      mouseControls: true,
      touchControls: true,
      gyroControls: false,
      minHeight: 600.00,
      minWidth: 200.00,
      scale: 1.00,
      scaleMobile: 1.00,
      shininess: 83.00,
      waveHeight: 17.50,
      waveSpeed: 0.40,
      zoom: 1.00
    });
    if (!vantaEffect) {
      setVantaEffect(effect);
      effect.resize();
    }

    return () => {
      if (vantaEffect) vantaEffect.destroy();
    }
  }, [vantaEffect]);

  return(
    <>
      {/* <Script
        src="https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.waves.min.js"
        strategy="afterInteractive"
        crossOrigin="anonymous"
        onLoad={() => {
          if (window.VANTA) {
            window.VANTA.WAVES({
              el: "#about",
              color: 0x002d4b,
              mouseControls: true,
              touchControls: true,
              gyroControls: false,
              minHeight: 600.00,
              minWidth: 200.00,
              scale: 1.00,
              scaleMobile: 1.00,
              shininess: 83.00,
              waveHeight: 17.50,
              waveSpeed: 0.40,
              zoom: 1.00
            });
          }
        }}
      /> */}
      <Section
        id="about"
        animate="visible"
        className={`${styles.About} fade-section relative h-[600px]`}
        ref={vantaRef}
      >
        <div className="text-center max-w-2xl fade-section rounded-2xl p-8 shadow-lg w-full absolute top-6 left-1/2 transform -translate-x-1/2 bg-[rgba(30,41,59,0.75)] text-slate-300">
          <Avatar />
          <Title>
            Hi, I&apos;m <strong>Nicolás Arteaga</strong> 👋
          </Title>
          <Paragraph className="mx-auto text-center max-w-2xl">
            I&apos;m a passionate, critical and persistent Full stack developer with 16 years of experience and a strong Frontend preference.<br />
            I focus on crafting clean, efficient, and engaging user experiences and thrive working on Agile environments with clean codebases.
          </Paragraph>
          <Paragraph className="mx-auto text-center max-w-2xl">
            I love exploring modern frontend tools, building interactive UIs, and all things geek.
          </Paragraph>
          <Footer />
          <FaChevronDown className="mx-auto mt-6 animate-bounce text-orange-500 drop-shadow-[0_0_10px_rgba(255,115,0,0.8)]" />
        </div>
      </Section>
    </>
  );
}
