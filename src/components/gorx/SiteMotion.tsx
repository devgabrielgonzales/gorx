"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";
import { whenPreloaderDone } from "@/lib/preloader";

type Conditions = { motion: boolean; desktop: boolean; fine: boolean };

const formatNumber = (value: number) => Math.round(value).toLocaleString("pt-BR");

/**
 * Owns every animation on the page. The markup it wraps is complete and
 * readable on its own; this only decides how it arrives. Nothing here runs for
 * visitors who asked for reduced motion.
 */
export default function SiteMotion({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = root.current;
    if (!element) return;
    const select = <T extends Element = HTMLElement>(selector: string) =>
      Array.from(element.querySelectorAll<T>(selector));
    const one = <T extends Element = HTMLElement>(selector: string) =>
      element.querySelector<T>(selector);

    const media = gsap.matchMedia(element);
    media.add(
      {
        motion: "(prefers-reduced-motion: no-preference)",
        desktop: "(min-width: 900px)",
        fine: "(pointer: fine)",
      },
      (context) => {
        const { motion, desktop, fine } = context.conditions as Conditions;
        if (!motion) return;
        const cleanups: Array<() => void> = [];
        element.classList.add("gx-motion");
        cleanups.push(() => element.classList.remove("gx-motion"));

        /* ---------- headings: each word rises from behind its own mask ---------- */
        const splits = select("[data-split]").map((heading) => ({
          heading,
          split: SplitText.create(heading, { type: "words", mask: "words" }),
        }));
        cleanups.push(() => splits.forEach(({ split }) => split.revert()));

        /* ---------- hero entrance, held until the preloader has left ---------- */
        const heroWords = splits
          .filter(({ heading }) => heading.closest(".gx-hero"))
          .flatMap(({ split }) => split.words);
        const intro = gsap
          .timeline({ paused: true, defaults: { ease: "power4.out" } })
          .from(heroWords, { yPercent: 115, duration: 1.1, stagger: 0.09 }, 0.1)
          .from("[data-hero-in]", { y: 26, autoAlpha: 0, duration: 0.9, stagger: 0.08 }, 0.35)
          .from(".gx-hero-figure", { y: 70, autoAlpha: 0, duration: 1.3 }, 0.25);
        cleanups.push(whenPreloaderDone(() => intro.play()));

        gsap.to(".gx-hero-copy", {
          yPercent: -8,
          opacity: 0.2,
          ease: "none",
          scrollTrigger: { trigger: ".gx-hero", start: "top top", end: "bottom top", scrub: true },
        });

        /* ---------- page progress and a header that steps aside on the way down ---------- */
        gsap.to(".gx-progress", {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { start: 0, end: "max", scrub: 0.3 },
        });
        const header = one(".gx-site-header");
        ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: (self) => {
            const menuOpen = header?.querySelector('[aria-expanded="true"]');
            const hide = self.direction === 1 && self.scroll() > 240 && !menuOpen;
            gsap.to(header, { yPercent: hide ? -100 : 0, duration: 0.4, ease: "power3.out", overwrite: "auto" });
          },
        });

        /* ---------- marquee: its speed and lean follow the scroll velocity ---------- */
        const marquee = gsap.to(".gx-marquee-track", { xPercent: -50, ease: "none", duration: 26, repeat: -1 });
        ScrollTrigger.create({
          start: 0,
          end: "max",
          onUpdate: (self) => {
            const velocity = self.getVelocity();
            const direction = velocity < 0 ? -1 : 1;
            gsap.to(marquee, {
              timeScale: direction * (1 + Math.min(Math.abs(velocity) / 260, 7)),
              duration: 0.25,
              overwrite: true,
            });
            gsap.to(marquee, { timeScale: direction, duration: 1.1, delay: 0.25 });
            gsap.to(".gx-marquee-track", {
              skewX: gsap.utils.clamp(-10, 10, velocity / -260),
              duration: 0.3,
              overwrite: "auto",
            });
            gsap.to(".gx-marquee-track", { skewX: 0, duration: 0.8, delay: 0.3 });
          },
        });

        /* ---------- section headings and plain reveals ---------- */
        splits
          .filter(({ heading }) => !heading.closest(".gx-hero"))
          .forEach(({ heading, split }) => {
            gsap.from(split.words, {
              yPercent: 115,
              duration: 1,
              ease: "power4.out",
              stagger: 0.06,
              scrollTrigger: { trigger: heading, start: "top 88%" },
            });
          });
        select("[data-reveal]").forEach((block) => {
          gsap.from(block, {
            y: 36,
            autoAlpha: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: block, start: "top 90%" },
          });
        });

        /* ---------- projects: a pinned sideways gallery on wide screens ---------- */
        const track = one(".gx-h-track");
        if (track && desktop) {
          const distance = () =>
            Math.max(0, track.scrollWidth - document.documentElement.clientWidth);
          const bar = one(".gx-h-bar i");
          const slide = gsap.to(track, {
            x: () => -distance(),
            ease: "none",
            scrollTrigger: {
              trigger: ".gx-h-pin",
              start: "top top+=24",
              end: () => `+=${distance()}`,
              pin: true,
              scrub: 0.7,
              invalidateOnRefresh: true,
              anticipatePin: 1,
              onUpdate: (self) => {
                if (bar) gsap.set(bar, { scaleX: self.progress });
              },
            },
          });
          select(".gx-p-card:not(.gx-more)").forEach((card) => {
            gsap.fromTo(
              card.querySelector(".gx-p-pic"),
              { xPercent: -7 },
              {
                xPercent: 7,
                ease: "none",
                scrollTrigger: {
                  trigger: card,
                  containerAnimation: slide,
                  start: "left right",
                  end: "right left",
                  scrub: true,
                },
              },
            );
          });
        } else if (track) {
          gsap.from(".gx-p-card", {
            y: 50,
            autoAlpha: 0,
            duration: 0.9,
            ease: "power3.out",
            stagger: 0.1,
            scrollTrigger: { trigger: track, start: "top 88%" },
          });
        }

        /* ---------- services ---------- */
        gsap.from("[data-row]", {
          y: 44,
          autoAlpha: 0,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: { trigger: ".gx-svc-list", start: "top 85%" },
        });

        /* ---------- about: the photo slides in and drifts, the numbers count up ---------- */
        gsap.from(".gx-about-photo", {
          x: -70,
          autoAlpha: 0,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: { trigger: ".gx-about-photo", start: "top 82%" },
        });
        gsap.fromTo(
          ".gx-about-pic",
          { yPercent: -6 },
          {
            yPercent: 6,
            ease: "none",
            scrollTrigger: { trigger: ".gx-about-photo", start: "top bottom", end: "bottom top", scrub: true },
          },
        );
        select(".gx-stats [data-count]").forEach((figure) => {
          const original = figure.textContent ?? "";
          const counter = { value: 0 };
          const target = Number(figure.dataset.count);
          const prefix = figure.dataset.prefix ?? "";
          const suffix = figure.dataset.suffix ?? "";
          gsap.to(counter, {
            value: target,
            duration: 1.6,
            ease: "power2.out",
            scrollTrigger: { trigger: figure, start: "top 90%" },
            onUpdate: () => {
              figure.textContent = `${prefix}${formatNumber(counter.value)}${suffix}`;
            },
          });
          cleanups.push(() => {
            figure.textContent = original;
          });
        });

        /* ---------- process: the line follows the scroll and lights each step ---------- */
        gsap.fromTo(
          ".gx-proc-line i",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: { trigger: ".gx-proc-steps", start: "top 62%", end: "bottom 62%", scrub: 0.4 },
          },
        );
        select(".gx-proc-step").forEach((step) => {
          ScrollTrigger.create({
            trigger: step,
            start: "top 64%",
            onEnter: () => step.classList.add("gx-on"),
            onLeaveBack: () => step.classList.remove("gx-on"),
          });
          cleanups.push(() => step.classList.remove("gx-on"));
        });

        /* ---------- plans ---------- */
        const plansTimeline = gsap.timeline({
          scrollTrigger: { trigger: ".gx-plan-grid", start: "top 82%" },
        });
        plansTimeline
          .from("[data-plan]", {
            y: 90,
            autoAlpha: 0,
            rotationX: -18,
            transformOrigin: "50% 100%",
            duration: 1,
            ease: "power3.out",
            stagger: 0.14,
          })
          .from(".gx-plan-list li", { x: -14, autoAlpha: 0, duration: 0.45, ease: "power2.out", stagger: 0.025 }, 0.45);
        select(".gx-plan-price [data-count]").forEach((price) => {
          const original = price.textContent ?? "";
          const counter = { value: 0 };
          plansTimeline.to(
            counter,
            {
              value: Number(price.dataset.count),
              duration: 1.3,
              ease: "power2.out",
              onUpdate: () => {
                price.textContent = formatNumber(counter.value);
              },
            },
            0.3,
          );
          cleanups.push(() => {
            price.textContent = original;
          });
        });

        /* ---------- contact ---------- */
        gsap.fromTo(
          ".gx-contact-mark",
          { rotation: -40, scale: 0.8 },
          {
            rotation: 40,
            scale: 1.1,
            ease: "none",
            scrollTrigger: { trigger: ".gx-contact", start: "top bottom", end: "bottom top", scrub: true },
          },
        );

        /* ---------- pointer-only touches: magnetic buttons and tilting plan cards ---------- */
        if (fine) {
          select("[data-magnet]").forEach((button) => {
            const xTo = gsap.quickTo(button, "x", { duration: 0.4, ease: "power3" });
            const yTo = gsap.quickTo(button, "y", { duration: 0.4, ease: "power3" });
            const move = (event: MouseEvent) => {
              const box = button.getBoundingClientRect();
              xTo((event.clientX - box.left - box.width / 2) * 0.28);
              yTo((event.clientY - box.top - box.height / 2) * 0.4);
            };
            const leave = () => {
              xTo(0);
              yTo(0);
            };
            button.addEventListener("mousemove", move);
            button.addEventListener("mouseleave", leave);
            cleanups.push(() => {
              button.removeEventListener("mousemove", move);
              button.removeEventListener("mouseleave", leave);
            });
          });
          if (desktop) {
            select("[data-plan]").forEach((card) => {
              const tiltX = gsap.quickTo(card, "rotationX", { duration: 0.5, ease: "power3" });
              const tiltY = gsap.quickTo(card, "rotationY", { duration: 0.5, ease: "power3" });
              const move = (event: MouseEvent) => {
                const box = card.getBoundingClientRect();
                tiltY(((event.clientX - box.left) / box.width - 0.5) * 9);
                tiltX(-((event.clientY - box.top) / box.height - 0.5) * 7);
              };
              const leave = () => {
                tiltX(0);
                tiltY(0);
              };
              card.addEventListener("mousemove", move);
              card.addEventListener("mouseleave", leave);
              cleanups.push(() => {
                card.removeEventListener("mousemove", move);
                card.removeEventListener("mouseleave", leave);
              });
            });
          }
        }

        // Images and web fonts settle after the first layout; the triggers need the final positions.
        const refresh = () => ScrollTrigger.refresh();
        window.addEventListener("load", refresh);
        document.fonts?.ready.then(refresh).catch(() => {});
        cleanups.push(() => window.removeEventListener("load", refresh));

        return () => cleanups.forEach((cleanup) => cleanup());
      },
    );
    return () => media.revert();
  }, []);

  return (
    <div className="gx" ref={root}>
      {children}
    </div>
  );
}
