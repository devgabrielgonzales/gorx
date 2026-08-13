"use client";

import FadeIn from "@/components/ui/FadeIn";
import FeatureTabs from "./FeatureTabs";

export default function Hero() {
  return (
    <section id="hero">
      <div className="max-w-container mx-auto border-x border-[#1f1f1f]">
        <div className="flex flex-col items-center text-center px-6 pt-16 pb-12 border-b border-[#1f1f1f]">
          <FadeIn className="inline-flex items-center gap-2 border border-[#1f1f1f] px-3 py-1 text-xs font-mono text-[#666] mb-5">
            <span className="status-dot" />
            Disponível para novos projetos em 2026
          </FadeIn>
          <FadeIn delay={0.1}>
            <h1 className="text-4xl md:text-6xl font-bold leading-none tracking-tight mb-6">
              Desenvolvo<br />
              <span className="text-gradient">interfaces rápidas</span><br />
              <span className="text-white">e código limpo.</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.2} className="flex flex-wrap gap-3 justify-center">
            <a
              href="#contato"
              className="bg-[#bff549] text-[#0d0d0d] px-7 py-2.5 font-bold text-sm hover:bg-white transition-colors"
            >
              Falar comigo
            </a>
            <a
              href="#projetos"
              className="border border-[#1f1f1f] px-7 py-2.5 text-sm font-medium text-white hover:border-[#bff549] hover:text-[#bff549] transition-colors"
            >
              Ver projetos
            </a>
          </FadeIn>
        </div>

        <FeatureTabs />
      </div>
    </section>
  );
}
