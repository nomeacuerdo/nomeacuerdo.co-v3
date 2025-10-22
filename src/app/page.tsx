import Image from "next/image";

import NavBar from "@/components/NavBar/NavBar";
import About from "@/components/About/About";
import Projects from "@/components/Projects/Projects";
import TechStack from "@/components/TechStack";
import ContactForm from "@/components/ContactForm";
import Container from "@/components/Motion/Container";
import Section from "@/components/Motion/Section";

export default function Portfolio() {
  return (
    <Container>
      <NavBar />

      <About />

      <Section id="tech">
        <TechStack />
      </Section>

      <Section id="projects">
        <Projects />
      </Section>

      <Section
        id="contact"
        className="px-4 text-center space-y-6 max-w-md w-full pb-20 fade-section scroll-mt-[60px]"
      >
        <ContactForm />
      </Section>
      <Image
        src="/favicon.png"
        width={16}
        height={16}
        alt="nomeacuerdo.co"
      />
    </Container>
  );
}
