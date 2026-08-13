"use client";

import FadeIn from "@/components/ui/FadeIn";

const items = [
  { value: "+30", label: "Projetos entregues", primary: true },
  { value: "3+", label: "Anos programando", primary: false },
  { value: "12+", label: "Tecnologias no stack", primary: false },
];

export default function Stats() {
  return (
    <section id="stats">
      <div className="max-w-container mx-auto border-x border-t border-[#1f1f1f]">
        <div className="grid grid-cols-3">
          {items.map((s, i) => (
            <FadeIn
              key={s.label}
              delay={i * 0.08}
              className={`px-8 py-8 text-center ${i < 2 ? "border-r border-[#1f1f1f]" : ""}`}
            >
              <p className={`text-5xl font-bold mb-1 ${s.primary ? "text-[#bff549]" : "text-white"}`}>
                {s.value}
              </p>
              <p className="text-xs font-mono text-[#666] uppercase tracking-wider">{s.label}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
