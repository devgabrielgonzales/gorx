"use client";
import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { countUp, revealBlock, revealLines, type Reveal } from "@/lib/motion";

/** Blocks that enter as a unit — their children are staggered in reading order. */
const GROUPS = [
  "[data-reveal]",
  ".section-top",
  ".projects-end",
  ".statement-strip",
  "[data-process]",
  ".contact-bottom",
  ".footer",
  ".stack-carousel-heading",
  ".marquee-container",
].join(", ");

/** Copy that reads better split into lines than faded in as one box. */
const LINES = [
  ".section-heading h2",
  ".section-heading > p",
  ".about-copy h2",
  ".about-copy > p:not(.eyebrow)",
  ".contact-title > span",
  ".contact-bottom > p",
  ".service-row h3",
  ".service-row > p",
  ".process-card h3",
  ".process-card > p:last-child",
  ".brand-quote",
].join(", ");

/** Elements that must move as one piece: images and the looping carousel. */
const ATOMIC = ".about-portrait, .marquee-container, .brand-symbol";

const STEP = 0.09;

export default function PortfolioMotion({
  children,
}: {
  children: React.ReactNode;
}) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const reveals: Reveal[] = [];
      const cleanups: Array<() => void> = [];
      const context = gsap.context(() => {
        gsap.utils.toArray<HTMLElement>(GROUPS).forEach((group) => {
          // Every child of a group shares the group's trigger, so the stagger
          // stays in reading order instead of firing per element position.
          // onEnter / onLeave / onEnterBack / onLeaveBack: play going in,
          // rewind going out, so the entrance runs again on the way back.
          // The rewind is bounded by the whole section, not the group: a 13px
          // eyebrow row would otherwise blank out while its section is still
          // filling the screen.
          const scrollTrigger = {
            trigger: group,
            start: "top 92%",
            endTrigger: group.closest("section") ?? group,
            end: "bottom top",
            toggleActions: "play reset play reset",
          };
          const content = group.matches(".project-card")
            ? group.querySelector(":scope > a") ?? group
            : group;
          const children = group.matches(ATOMIC)
            ? []
            : Array.from(content.children).filter(
                (child): child is HTMLElement =>
                  child instanceof HTMLElement &&
                  // The progress rule is drawn on scroll, not revealed.
                  !child.matches(".process-line"),
              );
          const targets = children.length ? children : [group];
          const entrance = targets.map((target, index) => {
            const delay = index * STEP;
            if (target.matches(LINES))
              return revealLines(target, { delay, scrollTrigger });
            if (target.matches(".stats-row strong"))
              return [
                revealBlock(target, { delay, scrollTrigger }),
                countUp(target, { delay, scrollTrigger }),
              ];
            return revealBlock(target, { delay, scrollTrigger });
          });
          const groupReveals = entrance
            .flat()
            .filter((reveal): reveal is Reveal => Boolean(reveal));
          reveals.push(...groupReveals);
          // Keyboard focus must never land inside an unrevealed entrance.
          const finish = () => groupReveals.forEach((reveal) => reveal.finish());
          group.addEventListener("focusin", finish);
          cleanups.push(() => group.removeEventListener("focusin", finish));
        });
        gsap.utils.toArray<HTMLElement>("[data-process]").forEach((element) => {
          gsap.from(element.querySelector(".process-line"), {
            scaleX: 0,
            transformOrigin: "left",
            ease: "none",
            scrollTrigger: {
              trigger: element,
              start: "top 85%",
              end: "top 45%",
              scrub: true,
            },
          });
        });
        gsap.utils.toArray<HTMLElement>(".statement-strip").forEach((strip) => {
          gsap.fromTo(
            strip.children,
            { xPercent: -6 },
            {
              xPercent: 6,
              ease: "none",
              scrollTrigger: {
                trigger: strip,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            },
          );
        });
      }, root);
      return () => {
        cleanups.forEach((cleanup) => cleanup());
        reveals.forEach((reveal) => reveal.destroy());
        context.revert();
      };
    });
    return () => media.revert();
  }, []);
  return <div ref={root}>{children}</div>;
}
