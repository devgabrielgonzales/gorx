"use client";

import { useState } from "react";

const links = [
  { label: "Sobre", href: "#sobre" },
  { label: "Habilidades", href: "#servicos" },
  { label: "Projetos", href: "#projetos" },
  { label: "Processo", href: "#processo" },
  { label: "Contato", href: "#contato" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header
      id="header"
      className="sticky top-0 z-50 backdrop-blur-sm border-b border-[#1f1f1f]"
      style={{ background: "rgba(13,13,13,0.9)" }}
    >
      <div className="max-w-container mx-auto border-x border-[#1f1f1f] px-6 flex items-center justify-between h-16">
        <a href="#" className="flex items-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/svg/logo.svg" alt="Gorx" className="h-8 w-auto" />
        </a>
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm text-[#666] hover:text-white transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#contato"
          className="hidden md:inline-flex items-center gap-2 bg-[#bff549] text-[#0d0d0d] px-5 py-2 text-sm font-bold hover:bg-white transition-colors"
        >
          Falar comigo
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </a>
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-[#666] hover:text-white"
          aria-label="Menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      {open && (
        <div className="md:hidden border-t border-[#1f1f1f] bg-[#0d0d0d]">
          <div className="max-w-container mx-auto border-x border-[#1f1f1f] px-6 py-4 flex flex-col gap-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm text-[#666] hover:text-white transition-colors"
              >
                {l.label}
              </a>
            ))}
            <a
              href="#contato"
              onClick={() => setOpen(false)}
              className="bg-[#bff549] text-[#0d0d0d] px-5 py-2 text-sm font-bold text-center hover:bg-white transition-colors"
            >
              Falar comigo
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
