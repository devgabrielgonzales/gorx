"use client";

import FadeIn from "@/components/ui/FadeIn";

const stack = [
  "React",
  "Next.js",
  "TypeScript",
  "Tailwind",
  "Node.js",
  "PostgreSQL",
  "Figma",
  "Docker",
  "Vercel",
];

export default function About() {
  return (
    <section id="sobre">
      <div className="max-w-container mx-auto border-x border-[#1f1f1f] border-t">
        <div className="grid md:grid-cols-2">
          <div className="px-8 py-12 border-r border-[#1f1f1f]">
            <p className="text-xs font-mono text-[#666] uppercase tracking-widest mb-8">/ sobre</p>
            <FadeIn>
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                <span className="text-[#bff549]">Gabriel Gonzales.</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-[#666] leading-relaxed mb-4">
                <span className="text-white/40">Desenvolvedor frontend & fullstack apaixonado por</span>
                <span className="text-white font-medium"> interfaces bem feitas e código que escala.</span>
                <span className="text-white/40"> Trabalho desde o design até o deploy, com foco em</span>
                <span className="text-white font-medium"> performance, acessibilidade e experiência do usuário.</span>
              </p>
            </FadeIn>
            <FadeIn delay={0.2}>
              <p className="text-[#666] leading-relaxed mb-8">
                <span className="text-white/40">Gosto de projetos onde</span>
                <span className="text-white font-medium"> cada detalhe importa</span>
                <span className="text-white/40">
                  {" "}— da tipografia ao tempo de carregamento, do componente ao sistema de design.
                </span>
              </p>
            </FadeIn>
            <FadeIn delay={0.25}>
              <a
                href="#contato"
                className="inline-flex items-center gap-2 bg-[#bff549] text-[#0d0d0d] px-6 py-3 font-bold text-sm hover:bg-white transition-colors"
              >
                Falar comigo
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </a>
            </FadeIn>

            <FadeIn delay={0.3} className="mt-8 pt-6 border-t border-[#1f1f1f]">
              <p className="text-xs font-mono text-[#666] uppercase tracking-widest mb-4">Stack principal</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {stack.map((s) => (
                  <span
                    key={s}
                    className="border border-[#1f1f1f] px-3 py-1.5 text-xs font-mono text-[#666] hover:border-[#bff549] hover:text-[#bff549] transition-colors"
                  >
                    {s}
                  </span>
                ))}
              </div>
              <p className="text-xs font-mono text-[#666] uppercase tracking-widest mb-4">IA no workflow</p>
              <div className="flex flex-wrap gap-2">
                <span className="border border-[#bff549]/30 px-3 py-1.5 text-xs font-mono text-[#bff549]/70 hover:border-[#bff549] hover:text-[#bff549] transition-colors flex items-center gap-1.5">
                  <svg width="10" height="10" viewBox="0 0 32 32" fill="currentColor">
                    <path d="M7 3L7 24L12.5 18.5L16.5 28L20 26.5L16 17L23.5 17Z" />
                  </svg>
                  Cursor
                </span>
                <span className="border border-[#bff549]/30 px-3 py-1.5 text-xs font-mono text-[#bff549]/70 hover:border-[#bff549] hover:text-[#bff549] transition-colors flex items-center gap-1.5">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" />
                  </svg>
                  Claude
                </span>
                <span className="border border-[#bff549]/30 px-3 py-1.5 text-xs font-mono text-[#bff549]/70 hover:border-[#bff549] hover:text-[#bff549] transition-colors flex items-center gap-1.5">
                  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M12 8v4M12 16h.01" />
                  </svg>
                  Codex
                </span>
              </div>
            </FadeIn>
          </div>

          <div className="bg-[#141414] min-h-[380px] md:min-h-[480px] relative overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/about-photo.png"
              alt="Retrato de Gorx"
              className="absolute inset-0 w-full h-full object-cover object-center"
            />
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "linear-gradient(to bottom, rgba(13,13,13,0) 58%, rgba(13,13,13,0.62) 100%)",
              }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
