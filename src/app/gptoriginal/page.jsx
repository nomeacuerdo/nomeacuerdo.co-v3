"use client"
import { useState, useEffect } from "react";
// import { Mail, Github, Linkedin, ChevronDown } from "lucide-react";
import { motion, useAnimation } from "framer-motion";
import { FaReact, FaNodeJs, FaGitAlt, FaChevronDown, FaGithub, FaLinkedin, FaPaperPlane } from "react-icons/fa";
import { SiNextdotjs, SiTypescript, SiTailwindcss } from "react-icons/si";

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

export default function Portfolio() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const controls = useScrollFadeIn();
  const pageLoad = useAnimation();

  useEffect(() => {
    const sequence = async () => {
      await pageLoad.start({ opacity: 1, transition: { duration: 0.5 } });
      await pageLoad.start({ y: 0, opacity: 1, transition: { duration: 0.8, delay: 0.2 } });
    };
    sequence();
  }, [pageLoad]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Message sent! (mock)");
    setForm({ name: "", email: "", message: "" });
  };

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const fadeVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7 } },
  };

  const techIcons = [
    { icon: <FaReact className="text-orange-500 text-4xl hover:drop-shadow-[0_0_10px_rgba(255,115,0,0.8)] transition" />, name: "React" },
    { icon: <SiNextdotjs className="text-white text-4xl hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.7)] transition" />, name: "Next.js" },
    { icon: <SiTypescript className="text-amber-500 text-4xl hover:drop-shadow-[0_0_10px_rgba(255,191,0,0.7)] transition" />, name: "TypeScript" },
    { icon: <SiTailwindcss className="text-rose-500 text-4xl hover:drop-shadow-[0_0_10px_rgba(244,63,94,0.8)] transition" />, name: "TailwindCSS" },
    { icon: <FaNodeJs className="text-red-500 text-4xl hover:drop-shadow-[0_0_10px_rgba(239,68,68,0.8)] transition" />, name: "Node.js" },
    { icon: <FaGitAlt className="text-yellow-500 text-4xl hover:drop-shadow-[0_0_10px_rgba(234,179,8,0.8)] transition" />, name: "Git" },
  ];

  const projects = [
    { id: 1, title: "Project One", img: "https://picsum.photos/seed/p1/600/400" },
    { id: 2, title: "Project Two", img: "https://picsum.photos/seed/p2/600/400" },
    { id: 3, title: "Project Three", img: "https://picsum.photos/seed/p3/600/400" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={pageLoad}
      className="min-h-screen bg-slate-900 text-slate-100 flex flex-col items-center px-6 py-12 space-y-20"
    >
      <nav className="fixed top-0 w-full bg-slate-800 bg-opacity-80 backdrop-blur-sm z-50 py-4 flex justify-center space-x-8 text-slate-300 text-sm md:text-base">
        {[
          { label: "About", id: "about" },
          { label: "Tech", id: "tech" },
          { label: "Projects", id: "projects" },
          { label: "Contact", id: "contact" },
        ].map((link) => (
          <button key={link.id} onClick={() => scrollTo(link.id)} className="hover:text-orange-400 hover:drop-shadow-[0_0_6px_rgba(255,115,0,0.8)] transition">
            {link.label}
          </button>
        ))}
      </nav>

      <motion.section
        id="about"
        variants={fadeVariants}
        initial="hidden"
        animate="visible"
        className="pt-20 text-center space-y-6 max-w-2xl fade-section bg-gradient-to-r from-orange-100 via-amber-100 to-orange-200 text-slate-900 rounded-2xl p-8 shadow-lg w-full"
      >
        <motion.img
          src="https://avatars.githubusercontent.com/u/000000?v=4"
          alt="Avatar"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="w-32 h-32 rounded-full mx-auto border-4 border-orange-500 shadow-[0_0_15px_rgba(255,115,0,0.8)]"
        />
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-3xl md:text-4xl font-bold"
        >
          Hi, I'm Nicolas Arteaga 👋
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-slate-800 text-base md:text-lg"
        >
          I'm a passionate React developer focused on crafting clean, efficient, and engaging user experiences.
          I love exploring modern frontend tools, building interactive UIs, and contributing to open-source projects.
        </motion.p>
        <FaChevronDown className="mx-auto mt-6 animate-bounce text-orange-500 drop-shadow-[0_0_10px_rgba(255,115,0,0.8)]" />
      </motion.section>

      <motion.section
        id="tech"
        className="text-center space-y-6 fade-section"
        variants={fadeVariants}
        initial="hidden"
        animate={controls}
      >
        <h2 className="text-2xl md:text-3xl font-semibold">Tech Stack</h2>
        <div className="flex flex-wrap justify-center gap-6">
          {techIcons.map(({ icon, name }) => (
            <div key={name} className="flex flex-col items-center space-y-2">
              {icon}
              <span className="text-slate-300 text-sm">{name}</span>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section
        id="projects"
        className="text-center space-y-6 fade-section w-full"
        variants={fadeVariants}
        initial="hidden"
        animate={controls}
      >
        <h2 className="text-2xl md:text-3xl font-semibold">Projects</h2>
        <div className="flex overflow-x-auto gap-6 pb-4 snap-x">
          {projects.map((proj) => (
            <motion.div
              key={proj.id}
              whileHover={{ scale: 1.05 }}
              className="min-w-[280px] bg-slate-800 rounded-2xl overflow-hidden shadow-lg snap-center flex-shrink-0 hover:shadow-[0_0_20px_rgba(255,115,0,0.6)] transition"
            >
              <img src={proj.img} alt={proj.title} className="w-full h-40 object-cover" />
              <div className="p-4 space-y-2">
                <h3 className="text-lg font-bold">{proj.title}</h3>
                <p className="text-slate-400 text-sm">A brief description of this project.</p>
                <a
                  href="#"
                  className="inline-block w-full bg-orange-600 hover:bg-orange-500 hover:drop-shadow-[0_0_10px_rgba(255,115,0,0.8)] text-white py-2 rounded-md transition"
                >
                  View Project
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <motion.section
        id="contact"
        className="text-center space-y-6 max-w-md w-full pb-20 fade-section"
        variants={fadeVariants}
        initial="hidden"
        animate={controls}
      >
        <h2 className="text-2xl md:text-3xl font-semibold">Contact Me</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={form.name}
            onChange={handleChange}
            className="w-full p-2 rounded bg-slate-800 text-slate-100 border border-slate-700"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={form.email}
            onChange={handleChange}
            className="w-full p-2 rounded bg-slate-800 text-slate-100 border border-slate-700"
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={form.message}
            onChange={handleChange}
            rows="4"
            className="w-full p-2 rounded bg-slate-800 text-slate-100 border border-slate-700"
            required
          />
          <button type="submit" className="bg-orange-600 hover:bg-orange-500 hover:drop-shadow-[0_0_10px_rgba(255,115,0,0.8)] w-full py-2 rounded-md transition">
            Send Message
          </button>
        </form>
        <div className="flex justify-center gap-6 mt-6 text-orange-500">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:drop-shadow-[0_0_10px_rgba(255,115,0,0.8)] transition"><FaGithub /></a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:drop-shadow-[0_0_10px_rgba(255,115,0,0.8)] transition"><FaLinkedin /></a>
          <a href="mailto:email@example.com" className="hover:drop-shadow-[0_0_10px_rgba(255,115,0,0.8)] transition"><FaPaperPlane /></a>
        </div>
      </motion.section>
    </motion.div>
  );
}
