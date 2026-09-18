"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  Braces,
  FolderOpen,
  Mail,
  Menu,
  User,
  Workflow,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { gsap } from "@/lib/gsap";

const items = {
  left: [
    { label: "Projetos", href: "#projetos", icon: FolderOpen },
    { label: "Sobre", href: "#sobre", icon: User },
    { label: "Habilidades", href: "#habilidades", icon: Braces },
  ],
  right: [
    { label: "Processo", href: "#processo", icon: Workflow },
    { label: "Contato", href: "#contato", icon: Mail },
  ],
};

const EMAIL = "contato@gorx.com.br";

const NavLink = ({
  href,
  icon: Icon,
  label,
  onClick,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  onClick?: () => void;
}) => (
  <a
    href={href}
    onClick={onClick}
    className="group flex items-center gap-1.5 whitespace-nowrap text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
  >
    <Icon className="h-4 w-4 opacity-70 group-hover:opacity-100" />
    <span>{label}</span>
  </a>
);

export function NotchNavbar({
  className,
  logo,
  ...props
}: React.HTMLAttributes<HTMLElement> & { logo?: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const header = useRef<HTMLElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);

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
    const desktop = window.matchMedia("(min-width: 768px)");
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
        gsap.from("[data-nav-reveal]", {
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
    <>
      <header
        ref={header}
        className={cn("fixed inset-x-0 top-0 z-50 flex h-16 px-0", className)}
        {...props}
      >
        {/* Left rail — carries the wordmark */}
        <div className="relative z-20 h-10 min-w-0 flex-1 bg-background">
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <line x1="0" y1="39.5" x2="100%" y2="39.5" stroke="currentColor" strokeOpacity={0.12} strokeWidth={0.5} className="text-foreground" />
            <line x1="0" y1="36.5" x2="100%" y2="36.5" stroke="currentColor" strokeOpacity={0.07} strokeWidth={0.5} className="text-foreground" />
          </svg>
          <div className="relative flex h-full items-center pl-[5vw]" data-nav-reveal>
            {logo ?? (
              <a
                href="#hero"
                onClick={() => setOpen(false)}
                aria-label="Gorx — início"
                className="flex items-center"
              >
                <Image
                  src="/svg/logo.svg"
                  alt="Gorx"
                  width={92}
                  height={25}
                  preload
                  className="transition-opacity hover:opacity-80"
                />
              </a>
            )}
          </div>
        </div>

        {/* Notch — left corner, content, right corner */}
        <div className="relative z-10 -ml-px flex h-16 shrink-0">
          <div className="relative h-full w-[50px] shrink-0">
            <div
              className="absolute inset-0 bg-background"
              style={{ clipPath: "path('M0 0 H50 V64 C25 64 25 40 0 40 Z')" }}
            />
            <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 50 64" aria-hidden="true">
              <path d="M0 39.5 C25 39.5 25 63.5 50 63.5" fill="none" stroke="currentColor" strokeOpacity={0.12} strokeWidth={0.5} className="text-foreground" />
              <path d="M0 36.5 C25 36.5 25 60.5 50 60.5" fill="none" stroke="currentColor" strokeOpacity={0.07} strokeWidth={0.5} className="text-foreground" />
            </svg>
          </div>

          <div className="relative -ml-px h-full min-w-0 flex-1">
            <div className="absolute inset-0 bg-background">
              <svg className="pointer-events-none absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden="true">
                <line x1="0" y1="63.5" x2="100%" y2="63.5" stroke="currentColor" strokeOpacity={0.12} strokeWidth={0.5} className="text-foreground" />
                <line x1="0" y1="60.5" x2="100%" y2="60.5" stroke="currentColor" strokeOpacity={0.07} strokeWidth={0.5} className="text-foreground" />
              </svg>
            </div>

            <div className="relative flex h-full w-full items-end justify-between px-4 pb-2 md:px-8">
              <nav
                className="mb-1 hidden shrink-0 gap-8 md:flex"
                aria-label="Navegação principal"
                data-nav-reveal
              >
                {items.left.map((item) => (
                  <NavLink key={item.label} {...item} />
                ))}
              </nav>

              <button
                ref={toggle}
                type="button"
                className="mb-1 p-1 text-foreground/70 transition-colors hover:text-foreground md:hidden"
                onClick={() => setOpen(!open)}
                aria-label={open ? "Fechar menu" : "Abrir menu"}
                aria-expanded={open}
                aria-controls="notch-mobile-navigation"
                data-nav-reveal
              >
                {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>

              <nav
                className="hidden shrink-0 items-center gap-6 md:flex"
                aria-label="Navegação secundária"
                data-nav-reveal
              >
                {items.right.map((item) => (
                  <NavLink key={item.label} {...item} />
                ))}
                <div className="flex shrink-0 items-center border-l border-foreground/10 pl-4">
                  <a
                    href={`mailto:${EMAIL}`}
                    className="button button-primary nav-cta"
                  >
                    Vamos conversar
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </nav>

              {/* Keeps the notch balanced on mobile, where the toggle sits left. */}
              <div className="mb-1 flex items-center md:hidden" data-nav-reveal>
                <a
                  href={`mailto:${EMAIL}`}
                  className="flex h-9 w-9 items-center justify-center text-foreground/70 transition-colors hover:text-foreground"
                  aria-label="Enviar e-mail"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          <div className="relative -ml-px h-full w-[50px] shrink-0">
            <div
              className="absolute inset-0 bg-background"
              style={{ clipPath: "path('M0 0 H50 V40 C25 40 25 64 0 64 Z')" }}
            />
            <svg className="pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 50 64" aria-hidden="true">
              <path d="M0 63.5 C25 63.5 25 39.5 50 39.5" fill="none" stroke="currentColor" strokeOpacity={0.12} strokeWidth={0.5} className="text-foreground" />
              <path d="M0 60.5 C25 60.5 25 36.5 50 36.5" fill="none" stroke="currentColor" strokeOpacity={0.07} strokeWidth={0.5} className="text-foreground" />
            </svg>
          </div>
        </div>

        {/* Right rail */}
        <div className="relative z-20 -ml-px h-10 min-w-0 flex-1 bg-background">
          <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" aria-hidden="true">
            <line x1="0" y1="39.5" x2="100%" y2="39.5" stroke="currentColor" strokeOpacity={0.12} strokeWidth={0.5} className="text-foreground" />
            <line x1="0" y1="36.5" x2="100%" y2="36.5" stroke="currentColor" strokeOpacity={0.07} strokeWidth={0.5} className="text-foreground" />
          </svg>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.nav
            id="notch-mobile-navigation"
            aria-label="Navegação mobile"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-16 z-40 border-b border-foreground/10 bg-background p-4 shadow-lg md:hidden"
          >
            <div className="flex flex-col gap-2">
              {[...items.left, ...items.right].map((item, index) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="flex items-center gap-3 p-3 transition-colors hover:bg-foreground/5"
                  onClick={() => setOpen(false)}
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-primary">
                    0{index + 1}
                  </span>
                  <item.icon className="h-5 w-5 opacity-70" />
                  <span className="font-medium text-foreground/90">
                    {item.label}
                  </span>
                  <ArrowUpRight className="ml-auto h-5 w-5 opacity-70" />
                </a>
              ))}
              <div className="my-2 h-px bg-foreground/10" />
              <a
                href={`mailto:${EMAIL}`}
                className="button button-primary w-full justify-center gap-3"
                onClick={() => setOpen(false)}
              >
                Vamos conversar
                <ArrowUpRight className="h-5 w-5" />
              </a>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
