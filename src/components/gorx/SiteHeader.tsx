"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { brand, siteNav } from "@/data/content";

export default function SiteHeader() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    // The menu only exists on small screens; widening the window past the
    // breakpoint must not leave it open behind the desktop navigation.
    const wide = window.matchMedia("(min-width: 861px)");
    const onWide = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    wide.addEventListener("change", onWide);
    return () => {
      document.removeEventListener("keydown", onKey);
      wide.removeEventListener("change", onWide);
    };
  }, [open]);

  return (
    <>
      <header className="gx-site-header">
        <div className="gx-wrap gx-header-inner">
          <a
            href="#hero"
            className="gx-logo"
            aria-label="Gorx, início"
            onClick={() => setOpen(false)}
          >
            <Image src="/svg/logo.svg" alt="Gorx" width={110} height={30} preload />
          </a>
          <nav className="gx-nav" aria-label="Navegação principal">
            {siteNav.map((item) => (
              <a key={item.href} href={item.href}>
                {item.label}
              </a>
            ))}
            <a href="#contato" className="gx-btn" data-magnet>
              Falar com a Gorx
            </a>
          </nav>
          <button
            className="gx-burger"
            type="button"
            aria-expanded={open}
            aria-controls="gx-menu"
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <i />
            <i />
          </button>
        </div>
      </header>

      <div className="gx-m-menu" id="gx-menu" hidden={!open}>
        <nav aria-label="Menu">
          {siteNav.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label} <ArrowUpRight size={22} aria-hidden="true" />
            </a>
          ))}
        </nav>
        <div className="gx-m-foot">
          <a className="gx-btn" href="#contato" onClick={() => setOpen(false)}>
            Falar com a Gorx
          </a>
          <span>{brand.email}</span>
        </div>
      </div>
    </>
  );
}
