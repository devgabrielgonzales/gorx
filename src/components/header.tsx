"use client";
import { useState } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useScroll } from "@/hooks/use-scroll";
import { useActiveSection } from "@/hooks/use-active-section";
import { MobileNav } from "@/components/mobile-nav";
import { brand, navItems } from "@/data/content";

export const navLinks = navItems;
const SECTION_IDS = navItems.map((link) => link.href.slice(1));

export function Header() {
  const scrolled = useScroll(24);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  return (
    <header
      className="site-header"
      data-scrolled={scrolled || undefined}
      data-open={open || undefined}
    >
      <div className="header-inner">
        <a
          href="#hero"
          className="header-logo"
          aria-label="Gorx — início"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/svg/logo.svg"
            alt="Gorx"
            width={110}
            height={30}
            preload
            className="header-logo-img"
          />
        </a>

        <nav className="desktop-nav" aria-label="Navegação principal">
          {navLinks.map((link, index) => {
            const current = active === link.href.slice(1);
            return (
              <a
                key={link.label}
                href={link.href}
                className={current ? "is-active" : undefined}
                aria-current={current ? "location" : undefined}
              >
                <span className="nav-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                {link.label}
              </a>
            );
          })}
        </nav>

        <div className="header-actions">
          <a href={`mailto:${brand.email}`} className="button button-primary nav-cta header-contact">
            Vamos conversar
            <ArrowUpRight size={14} />
          </a>
          <MobileNav active={active} open={open} onOpenChange={setOpen} />
        </div>
      </div>
    </header>
  );
}
