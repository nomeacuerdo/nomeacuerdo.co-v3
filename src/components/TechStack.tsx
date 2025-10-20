"use client"
import { FaReact, FaNodeJs, FaGitAlt } from "react-icons/fa";
import { SiNextdotjs, SiVuedotjs, SiTypescript, SiTailwindcss, SiShopify } from "react-icons/si";

export default function TechStack() {
  const techIcons = [
    { icon: <FaReact className="text-[#58c4dc] text-4xl hover:drop-shadow-[0_0_10px_rgba(255,115,0,0.8)] transition" />, name: "React" },
    { icon: <SiNextdotjs className="text-white text-4xl hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.7)] transition" />, name: "Next.js" },
    { icon: <SiVuedotjs className="text-[#42b883] text-4xl hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.7)] transition" />, name: "Vue.js" },
    { icon: <SiShopify className="text-[#64f44c] text-4xl hover:drop-shadow-[0_0_10px_rgba(255,255,255,0.7)] transition" />, name: "Shopify" },
    { icon: <SiTypescript className="text-[#3178c6] text-4xl hover:drop-shadow-[0_0_10px_rgba(255,191,0,0.7)] transition" />, name: "TypeScript" },
    { icon: <SiTailwindcss className="text-sky-500 text-4xl hover:drop-shadow-[0_0_10px_rgba(244,63,94,0.8)] transition" />, name: "TailwindCSS" },
    { icon: <FaNodeJs className="text-[#84ba64] text-4xl hover:drop-shadow-[0_0_10px_rgba(239,68,68,0.8)] transition" />, name: "Node.js" },
    { icon: <FaGitAlt className="text-[#f05133] text-4xl hover:drop-shadow-[0_0_10px_rgba(234,179,8,0.8)] transition" />, name: "Git" },
  ];
  
  return(
    <>
      <h2 className="text-2xl md:text-3xl font-semibold text-orange-400">Tech Stack</h2>
      <div className="flex flex-wrap justify-center gap-6">
        {techIcons.map(({ icon, name }) => (
          <div key={name} className="flex flex-col items-center space-y-2">
            {icon}
            <span className="text-slate-300 text-sm">{name}</span>
          </div>
        ))}
      </div>
    </>
  );
}
