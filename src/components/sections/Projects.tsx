"use client";

import { projects } from "@/data/content";
import FadeIn from "@/components/ui/FadeIn";

export default function Projects() {
  return (
    <section id="projetos">
      <div className="max-w-container mx-auto border-x border-[#1f1f1f] border-t">
        <div className="px-8 py-8 border-b border-[#1f1f1f]">
          <p className="text-xs font-mono text-[#666] uppercase tracking-widest mb-4">/ projetos</p>
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold">
              Trabalhos
              <br />
              <span className="text-[#bff549]">selecionados.</span>
            </h2>
          </FadeIn>
        </div>

        <div className="grid md:grid-cols-3 grid-cols-1">
          {projects.map((p, i) => (
            <a
              key={p.id}
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              id={`card-projeto${i + 1}`}
              className={`group overflow-hidden cursor-pointer ${
                // 3 col grid: borders right except last col, bottom except last row
                i % 3 !== 2 ? "md:border-r" : ""
              } ${i < projects.length - 3 ? "border-b" : ""} border-[#1f1f1f]`}
            >
              <div className="bg-[#141414] aspect-video relative overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={p.image}
                  alt={`Projeto ${String(i + 1).padStart(2, "0")} — ${p.name}`}
                  className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-[#bff549]/0 group-hover:bg-[#bff549]/10 transition-colors" />
              </div>
              <div className="px-6 py-5">
                <span className="text-xs font-mono text-[#bff549] border border-[#bff549]/30 px-2 py-1">
                  {p.category}
                </span>
                <h3 className="font-bold mt-3 group-hover:text-[#bff549] transition-colors">{p.name}</h3>
                <p className="text-sm text-[#666] mt-1">{p.description}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
