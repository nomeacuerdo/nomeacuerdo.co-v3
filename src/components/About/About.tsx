"use client"
import { FaChevronDown } from "react-icons/fa";
import Avatar from "@/components/Motion/Avatar";
import Title from "@/components/Motion/Title";
import Paragraph from "@/components/Motion/Paragraph";
import Section from "@/components/Motion/Section";
import Footer from "@/components/Footer";
import styles from './About.module.css';

export default function About() {
  return(
    <Section
      id="about"
      animate="visible"
      className={`${styles.About} fade-section`}
    >
      <Avatar />
      <Title>
        Hi, I&apos;m <strong>Nicolás Arteaga</strong> 👋
      </Title>
      <Paragraph className="mx-auto text-center max-w-2xl">
        I&apos;m a passionate Full stack developer with 16 years of experience and a strong Frontend preference.
        I focus on crafting clean, efficient, and engaging user experiences and thrive working on Agile environments with clean codebases.
      </Paragraph>
      <Paragraph className="mx-auto text-center max-w-2xl">
        I love exploring modern frontend tools, building interactive UIs, and all things geek.
      </Paragraph>
      <Footer />
      <FaChevronDown className="mx-auto mt-6 animate-bounce text-orange-500 drop-shadow-[0_0_10px_rgba(255,115,0,0.8)]" />
    </Section>
  );
}
