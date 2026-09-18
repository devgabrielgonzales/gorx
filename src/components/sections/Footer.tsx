"use client";

const stack = ["React / Next.js", "TypeScript / Node.js", "Tailwind / CSS"];
const navLinks = [
  { label: "Sobre", href: "#sobre" },
  { label: "Projetos", href: "#projetos" },
  { label: "Processo", href: "#processo" },
  { label: "Contato", href: "#contato" },
];
const social = [
  {
    label: "LinkedIn",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="4" height="4" />
        <rect x="2" y="9" width="4" height="12" />
        <path d="M10 9h4v3c1-2 3-3 4-3 3 0 4 2 4 5v8h-4v-7c0-2-1-2-2-2s-2 0-2 2v7h-4V9z" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="2" width="20" height="20" />
        <rect x="8" y="8" width="8" height="8" />
        <rect x="15" y="5" width="3" height="3" />
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    icon: (
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
        <rect x="2" y="3" width="20" height="18" />
        <path d="M7 8l4 4-4 4M14 16h4" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer>
      <div className="max-w-container mx-auto border-x border-t border-[#1f1f1f]">
        <div className="grid md:grid-cols-4 gap-0 border-b border-[#1f1f1f]">
          <div className="px-8 py-10 border-r border-[#1f1f1f]">
            <div className="flex items-center mb-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/svg/logo.svg" alt="Gorx" className="h-7 w-auto" />
            </div>
            <p className="text-sm text-[#666] leading-relaxed">
              Desenvolvedor frontend & fullstack. Interfaces rápidas, código limpo, resultado real.
            </p>
          </div>
          <div className="px-8 py-10 border-r border-[#1f1f1f]">
            <p className="text-xs font-mono text-[#666] uppercase tracking-widest mb-6">Stack</p>
            <ul className="flex flex-col gap-3">
              {stack.map((s) => (
                <li key={s}>
                  <span className="text-sm text-[#666]">{s}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="px-8 py-10 border-r border-[#1f1f1f]">
            <p className="text-xs font-mono text-[#666] uppercase tracking-widest mb-6">Navegação</p>
            <ul className="flex flex-col gap-3">
              {navLinks.map((n) => (
                <li key={n.href}>
                  <a href={n.href} className="text-sm text-[#666] hover:text-white transition-colors">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className="px-8 py-10">
            <p className="text-xs font-mono text-[#666] uppercase tracking-widest mb-6">Redes</p>
            <ul className="flex flex-col gap-3">
              {social.map((s) => (
                <li key={s.label}>
                  <a
                    href="#"
                    className="text-sm text-[#666] hover:text-white transition-colors flex items-center gap-2"
                  >
                    {s.icon}
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="overflow-hidden select-none" style={{ lineHeight: 0.85 }}>
          <p
            className="wordmark-fade text-center font-bold tracking-tighter"
            style={{
              fontSize: "clamp(80px, 20vw, 240px)",
              opacity: 0.15,
              letterSpacing: "-0.04em",
            }}
          >
            GORX
          </p>
        </div>

        <div className="px-8 py-6 border-t border-[#1f1f1f] flex items-center justify-between flex-wrap gap-4">
          <p className="text-xs text-[#666] font-mono">© 2025 Gorx. Todos os direitos reservados.</p>
          <p className="text-xs text-[#666] font-mono">Feito com precisão cirúrgica.</p>
        </div>
      </div>
    </footer>
  );
}
