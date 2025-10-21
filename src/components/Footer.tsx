"use client"
import { FaGithub, FaLinkedin, FaPaperPlane, FaFilePdf } from "react-icons/fa";
import { motion } from "framer-motion";

export default function Footer() {
  const footerIcons = [
      { id: 1, icon: <FaGithub className="text-white text-4xl hover:text-orange-500 transition" />, name: "Github", link: "https://github.com/nomeacuerdo" },
      { id: 2, icon: <FaLinkedin className="text-white text-4xl hover:text-orange-500 transition" />, name: "Linkedin", link: "https://linkedin.com/in/nomeacuerdo" },
      { id: 4, icon: <FaFilePdf className="text-white text-4xl hover:text-orange-500 transition" />, name: "Curriculum", link: "/cv-nomeacuerdo-1025.pdf" },
      { id: 3, icon: <FaPaperPlane className="text-white text-4xl hover:text-orange-500 transition" />, name: "Mail", link: "mailto:nomeacuerdo+contact@gmail.com" },
    ];

  return(
    <>
      <div className="flex justify-center gap-6 pb-4 mt-6">
        {footerIcons.map((icon) => (
          <motion.div
            key={icon.id}
            whileHover={{ scale: 1.05 }}
            className="snap-center flex-shrink-0"
          >
            <a href={icon.link} target="_blank" rel="noreferrer" className="hover:text-orange-500 transition" title={icon.name}>
              {icon.icon}
            </a>
          </motion.div>
        ))}
      </div>
    </>
  );
}

