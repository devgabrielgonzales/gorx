"use client";
import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { brand, navItems } from "@/data/content";

type Props = {
  active: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function MobileNav({ active, open, onOpenChange }: Props) {
  const toggle = useRef<HTMLButtonElement>(null);
  const panel = useRef<HTMLElement>(null);

  useEffect(() => {
    const html = document.documentElement;
    const main = document.getElementById("main-content");
    html.classList.toggle("nav-open", open);
    main?.toggleAttribute("inert", open);
    return () => {
      html.classList.remove("nav-open");
      main?.removeAttribute("inert");
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const first = panel.current?.querySelector<HTMLElement>("a, button");
    first?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOpenChange(false);
        toggle.current?.focus();
        return;
      }
      if (event.key !== "Tab" || !panel.current) return;
      const nodes = [
        ...panel.current.querySelectorAll<HTMLElement>("a, button"),
        toggle.current,
      ].filter((el): el is HTMLButtonElement | HTMLAnchorElement => Boolean(el));
      const firstNode = nodes[0];
      const lastNode = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === firstNode) {
        event.preventDefault();
        lastNode?.focus();
      } else if (!event.shiftKey && document.activeElement === lastNode) {
        event.preventDefault();
        firstNode?.focus();
      }
    };

    const desktop = window.matchMedia("(min-width: 901px)");
    const onViewport = () => {
      if (desktop.matches) onOpenChange(false);
    };

    document.addEventListener("keydown", onKey);
    desktop.addEventListener("change", onViewport);
    return () => {
      document.removeEventListener("keydown", onKey);
      desktop.removeEventListener("change", onViewport);
    };
  }, [open, onOpenChange]);

  return (
    <>
      <button
        ref={toggle}
        type="button"
        className="menu-toggle"
        aria-controls="mobile-menu"
        aria-expanded={open}
        aria-label={open ? "Fechar menu" : "Abrir menu"}
        onClick={() => onOpenChange(!open)}
      >
        <span className="menu-toggle-bars" aria-hidden="true" />
      </button>

      <nav
        ref={panel}
        id="mobile-menu"
        className="mobile-nav"
        hidden={!open}
        aria-label="Navegação mobile"
      >
        <div className="mobile-nav-list">
          {navItems.map((link, index) => {
            const current = active === link.href.slice(1);
            return (
              <a
                key={link.label}
                href={link.href}
                className={current ? "is-active" : undefined}
                aria-current={current ? "location" : undefined}
                style={{ animationDelay: `${40 + index * 50}ms` }}
                onClick={() => onOpenChange(false)}
              >
                <span className="nav-index">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span>{link.label}</span>
                <ArrowUpRight size={20} />
              </a>
            );
          })}
        </div>
        <div className="mobile-nav-footer">
          <a
            href={`mailto:${brand.email}`}
            className="button button-primary"
            onClick={() => onOpenChange(false)}
          >
            Vamos conversar
            <ArrowUpRight size={18} />
          </a>
          <a href={`mailto:${brand.email}`} className="eyebrow muted">
            {brand.email}
          </a>
        </div>
      </nav>
    </>
  );
}
