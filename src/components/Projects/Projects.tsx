"use client"
import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import projects from "./projectList";
import Modal from "@/components/Motion/Modal";

export default function Projects() {
  const [open, setOpen] = useState<boolean>(false);
  // open: boolean
  // setOpen: React.Dispatch<React.SetStateAction<boolean>>

  const handleMetaJoke = (e: React.MouseEvent<HTMLElement> ) => {
    e.preventDefault();
    console.log("Deja vuu");
    setOpen(true);
  };

  return (
    <>
      <h2 className="text-2xl md:text-3xl font-semibold text-orange-400">Projects</h2>
      <div className="text-center py-4 snap-x container overflow-x-auto">
        <div className="flex flex-col md:flex-row gap-6">
          {projects.map((proj) => (
            <motion.div
              key={proj.id}
              whileHover={{ scale: 1.05 }}
              className="w-[280px] bg-slate-800 rounded-2xl overflow-hidden shadow-lg snap-center flex-shrink-0 transition"
            >
              <Image src={proj.img} alt={proj.title} width={280} height={160} loading="lazy" className="w-full h-40 object-cover" />
              <div className="flex flex-col h-auto p-4 space-y-2 grow">
                <h3 className="text-lg font-bold">{proj.title}</h3>
                <p className="text-slate-400 text-sm grow h-[60px]">{proj.description}</p>
                {
                  proj.id === 1
                  ? (
                    <a
                      href="#"
                      onClick={handleMetaJoke}
                      className="inline-block w-full bg-orange-600 hover:bg-orange-500 text-white py-2 rounded-md transition"
                    >
                      View Project
                    </a>
                  )
                  : (
                    <a
                      href={proj.link}
                      target="_blank"
                      className="inline-block w-full bg-orange-600 hover:bg-orange-500 text-white py-2 rounded-md transition"
                    >
                      View Project
                    </a>
                  )
                }
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Modal open={open} setOpen={setOpen}>
        <div className="px-4 py-3 flex flex-col justify-center items-center gap-6 sm:px-6">
          <p>
            Well, you&apos;re already looking at the project, but here&apos;s a dancing frog in case you want to see more:
          </p>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://cdn3.emoji.gg/emojis/40586-bop-cat.gif" width={128} height={128} alt="dance!" />
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="inline-block w-full bg-orange-600 hover:bg-orange-500 text-white py-2 rounded-md transition cursor-pointer"
          >
            That&apos;s not a frog, but I got it.
          </button>
        </div>
      </Modal>
    </>
  );
}

