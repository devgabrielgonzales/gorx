"use client";

import FadeIn from "@/components/ui/FadeIn";

export default function CTA() {
  return (
    <section id="cta">
      <div className="max-w-container mx-auto border-x border-t border-[#1f1f1f]">
        <div className="px-8 py-14 md:py-20 text-center relative overflow-hidden">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 50% at 50% 50%, rgba(191,245,73,0.08) 0%, transparent 70%)",
            }}
          />
          <div className="relative">
            <p className="text-xs font-mono text-[#666] uppercase tracking-widest mb-4">Vamos conversar</p>
            <FadeIn>
              <h2 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
                Tem um projeto
                <br />
                <span className="text-gradient">em mente?</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="text-[#666] text-lg max-w-lg mx-auto mb-8">
                Me manda uma mensagem. Seja um projeto novo, freela, ou só para trocar uma ideia.
              </p>
            </FadeIn>
            <FadeIn delay={0.2} className="flex flex-wrap gap-4 justify-center">
              <a
                href="#contato"
                className="bg-[#bff549] text-[#0d0d0d] px-10 py-4 font-bold text-base hover:bg-white transition-colors"
              >
                Entrar em contato
              </a>
              <a
                href="https://wa.me/55"
                className="border border-[#1f1f1f] px-10 py-4 text-base font-medium hover:border-[#bff549] hover:text-[#bff549] transition-colors"
              >
                WhatsApp direto
              </a>
            </FadeIn>
          </div>
        </div>
      </div>
    </section>
  );
}
