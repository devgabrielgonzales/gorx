"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeIn from "@/components/ui/FadeIn";
import { skills } from "@/data/content";

export default function Skills() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="servicos">
      <div className="max-w-container mx-auto border-x border-[#1f1f1f] border-t">
        <div className="px-8 py-8 border-b border-[#1f1f1f]">
          <p className="text-xs font-mono text-[#666] uppercase tracking-widest mb-4">/ habilidades</p>
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold">
              O que faço.
              <br />
              <span className="text-[#bff549]">Como faço.</span>
            </h2>
          </FadeIn>
        </div>

        {skills.map((s, i) => {
          const isOpen = open === i;
          return (
            <div
              key={s.n}
              className={i < skills.length - 1 ? "border-b border-[#1f1f1f]" : ""}
            >
              <button
                type="button"
                onClick={() => setOpen(isOpen ? null : i)}
                className="w-full flex items-center justify-between px-8 py-6 text-left hover:bg-[#141414] transition-colors"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-6">
                  <span className="text-xs font-mono text-[#666] w-8">{s.n}</span>
                  <div>
                    <h3 className="text-lg font-bold">{s.title}</h3>
                    <p className="text-sm text-[#666] mt-1">{s.subtitle}</p>
                  </div>
                </div>
                <svg
                  className="flex-shrink-0 transition-transform"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="#BFF549"
                  strokeWidth="1.5"
                  style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                >
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8 pl-20">
                      <p className="text-[#666] mb-6 leading-relaxed">{s.body}</p>
                      <ul className="grid md:grid-cols-2 gap-3">
                        {s.bullets.map((b) => (
                          <li key={b} className="flex items-center gap-3 text-sm text-[#666]">
                            <span className="w-1 h-1 bg-[#bff549] inline-block flex-shrink-0" />
                            {b}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
      </div>
    </section>
  );
}
