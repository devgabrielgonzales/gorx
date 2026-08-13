"use client";

import FadeIn from "@/components/ui/FadeIn";

export default function HowItWorks() {
  return (
    <section id="como-funciona">
      <div className="max-w-container mx-auto border-x border-t border-[#1f1f1f]">
        <div className="px-8 py-8 border-b border-[#1f1f1f] text-center">
          <p className="text-xs font-mono text-[#bff549] uppercase tracking-widest mb-3">
            ● Como trabalho
          </p>
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold">
              Do conceito ao deploy
              <br />
              <span className="text-[#bff549]">sem enrolação.</span>
            </h2>
          </FadeIn>
        </div>

        <div className="flex flex-col md:flex-row items-stretch">
          {/* Input */}
          <div className="flex-1 p-6 md:p-8 border-b md:border-b-0 md:border-r border-[#1f1f1f] flex flex-col justify-between bg-[#141414]">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="w-8 h-8 bg-[#1f1f1f] flex items-center justify-center flex-shrink-0">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <rect x="9" y="2" width="6" height="8" />
                    <path d="M20 22v-3l-3-4H7l-3 4v3" />
                  </svg>
                </div>
                <div>
                  <p className="text-xs font-bold text-white">Você</p>
                  <p className="text-xs text-[#666] font-mono">Colaborador</p>
                </div>
                <div className="ml-auto flex items-center gap-0.5">
                  {[2, 4, 3, 5, 2, 4, 3].map((h, i) => (
                    <span
                      key={i}
                      className="w-0.5 inline-block"
                      style={{
                        height: `${h * 4}px`,
                        background: ["#bff54966", "#bff54999", "#bff549", "#bff549cc", "#bff54966", "#bff54999", "#bff54950"][i],
                      }}
                    />
                  ))}
                </div>
              </div>
              <p className="text-white text-sm leading-relaxed">
                &ldquo;Preciso de uma aplicação responsiva, com boa performance e código organizado que eu consiga
                evoluir depois.&rdquo;
              </p>
            </div>
            <p className="text-xs font-mono text-[#666] mt-6 border-t border-[#1f1f1f] pt-4">INPUT / IDEIA</p>
          </div>

          {/* Center */}
          <div className="flex items-center justify-center px-6 md:px-0 py-8 md:py-0 md:w-48 border-b md:border-b-0 md:border-r border-[#1f1f1f] relative flex-shrink-0">
            <div className="hidden md:block absolute left-0 top-1/2 w-1/2 h-px bg-[#1f1f1f]" />
            <div className="hidden md:block absolute right-0 top-1/2 w-1/2 h-px bg-[#1f1f1f]" />
            <div className="relative z-10">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/svg/simbolo.svg" alt="Gorx" className="w-20 h-20 md:w-24 md:h-24" />
            </div>
          </div>

          {/* Output */}
          <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-5">
                <div className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#BFF549" strokeWidth="1.5">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#BFF549" strokeWidth="1.5">
                    <rect x="3" y="3" width="18" height="18" />
                  </svg>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#BFF549" strokeWidth="1.5">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </div>
              </div>
              <p className="text-xs font-mono text-[#666] uppercase tracking-widest mb-4">Gorx entrega</p>
              <p className="text-white text-sm leading-relaxed font-medium">
                &ldquo;Código limpo, componentizado, com testes, documentação e deploy configurado — pronto para
                escalar.&rdquo;
              </p>
            </div>
            <p className="text-xs font-mono text-[#666] mt-6 border-t border-[#1f1f1f] pt-4">OUTPUT / CÓDIGO</p>
          </div>
        </div>

        <div className="border-t border-[#1f1f1f] px-8 py-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-2">
          {["Código limpo", "Bem documentado", "Performático", "Escalável"].map((a, i) => (
            <div key={a} className="flex items-center gap-x-8">
              <span className="text-xs font-mono text-[#666] uppercase tracking-widest">{a}</span>
              {i < 3 && <span className="text-[#666] text-xs">●</span>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
