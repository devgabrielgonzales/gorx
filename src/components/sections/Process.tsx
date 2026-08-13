"use client";

import FadeIn from "@/components/ui/FadeIn";

const cards = [
  {
    label: "01 — Descobrir",
    title: "Entender & Planejar",
    body: "Entendo o problema antes de escrever qualquer linha. Defino arquitetura, stack e escopo.",
    output: "Output: arquitetura definida + stack escolhida + escopo fechado.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" fill="#1F1F1F" />
        <path d="M10 20h8M22 20h8M20 10v8M20 22v8" stroke="#BFF549" strokeWidth="1.5" />
        <circle cx="20" cy="20" r="3" fill="#BFF549" />
      </svg>
    ),
  },
  {
    label: "02 — Construir",
    title: "Codar & Iterar",
    body: "Escrevo código limpo, com commits organizados e progresso visível. Feedback é bem-vindo em qualquer etapa.",
    output: "Output: PRs revisáveis + código testado + documentação inline.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" fill="#1F1F1F" />
        <rect x="8" y="12" width="24" height="16" stroke="#BFF549" strokeWidth="1.5" />
        <path d="M12 20h6M22 20h6M20 14v12" stroke="#BFF549" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    label: "03 — Escalar",
    title: "Deploy & Refinar",
    body: "Entrego com CI/CD configurado, monitoramento ativo e disponível para ajustes após o lançamento.",
    output: "Output: aplicação em produção + pipeline configurado + suporte pós-deploy.",
    icon: (
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
        <rect width="40" height="40" fill="#1F1F1F" />
        <path d="M8 28l8-10 6 6 6-8 4 4" stroke="#BFF549" strokeWidth="1.5" />
        <circle cx="32" cy="20" r="2" fill="#BFF549" />
      </svg>
    ),
  },
];

export default function Process() {
  return (
    <section id="processo">
      <div className="max-w-container mx-auto border-x border-[#1f1f1f] border-t">
        <div className="px-8 py-8 border-b border-[#1f1f1f]">
          <p className="text-xs font-mono text-[#666] uppercase tracking-widest mb-4">/ como trabalho</p>
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-bold">
              Método direto.
              <br />
              <span className="text-[#bff549]">Sem enrolação.</span>
            </h2>
          </FadeIn>
        </div>

        <div className="grid md:grid-cols-3">
          {cards.map((c, i) => (
            <FadeIn
              key={c.label}
              delay={i * 0.1}
              className={`group px-8 py-8 cursor-default transition-colors ${
                i < cards.length - 1 ? "border-r border-[#1f1f1f]" : ""
              } hover:bg-[#141414] hover:border-[#bff549]`}
              style={{ borderRightWidth: i < cards.length - 1 ? 1 : 0 }}
            >
              <div className="mb-6">{c.icon}</div>
              <p className="text-xs font-mono text-[#666] uppercase tracking-widest mb-3">{c.label}</p>
              <h3 className="text-xl font-bold mb-3">{c.title}</h3>
              <p className="text-[#666] text-sm leading-relaxed mb-6">{c.body}</p>
              <div className="border-t border-[#1f1f1f] pt-6 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                <p className="text-xs font-mono text-[#666]">{c.output}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
