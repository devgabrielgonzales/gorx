"use client";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { gsap } from "@/lib/gsap";

const links = [
  { label: "Projetos", href: "#projetos" },
  { label: "Sobre", href: "#sobre" },
  { label: "Habilidades", href: "#habilidades" },
  { label: "Processo", href: "#processo" },
  { label: "Contato", href: "#contato" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);
  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setOpen(false);
    };
    const desktop = window.matchMedia("(min-width: 901px)");
    const resize = () => {
      if (desktop.matches) setOpen(false);
    };
    document.addEventListener("keydown", close);
    document.addEventListener("pointerdown", outside);
    desktop.addEventListener("change", resize);
    return () => {
      document.removeEventListener("keydown", close);
      document.removeEventListener("pointerdown", outside);
      desktop.removeEventListener("change", resize);
    };
  }, []);
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.from(".header-inner > *", {
          y: -14,
          autoAlpha: 0,
          duration: 0.7,
          delay: 0.15,
          stagger: 0.09,
          ease: "power3.out",
        });
      }, header);
      return () => context.revert();
    });
    return () => media.revert();
  }, []);
  return (
    <header className="site-header" ref={header}>
      <div className="header-inner">
        <a
          href="#hero"
          onClick={() => setOpen(false)}
          aria-label="Gorx — início"
        >
          <Image
            src="/svg/logo.svg"
            alt="Gorx"
            width={108}
            height={30}
            preload
          />
        </a>
        <nav className="desktop-nav" aria-label="Navegação principal">
          {links.map((link) => (
            <a href={link.href} key={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <a href="mailto:contato@gorx.com.br" className="header-contact">
          Vamos conversar <ArrowUpRight size={17} />
        </a>
        <button
          ref={toggle}
          className="menu-toggle"
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
          aria-controls="mobile-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </div>
      <nav
        id="mobile-navigation"
        className="mobile-nav"
        aria-label="Navegação mobile"
        hidden={!open}
      >
        {links.map((link, i) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            <span className="eyebrow lime">0{i + 1}</span>
            {link.label}
            <ArrowUpRight size={20} />
          </a>
        ))}
      </nav>
    </header>
  );
}
