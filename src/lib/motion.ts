"use client";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";

export const REVEAL_EASE = "power3.out";

/**
 * A running entrance. `finish` jumps it to its end state — used when keyboard
 * focus lands inside content that has not been revealed yet. `destroy` undoes
 * every DOM change the entrance made.
 */
export type Reveal = {
  finish: () => void;
  rewind: () => void;
  restart: () => void;
  destroy: () => void;
};

type RevealOptions = {
  delay?: number;
  duration?: number;
  stagger?: number;
  scrollTrigger?: ScrollTrigger.Vars;
};

/**
 * Splits text into lines and slides each one up from behind its own mask.
 * `autoSplit` re-splits when fonts finish loading or the element rewraps, and
 * the entrance only replays while it has never finished.
 */
export function revealLines(
  target: gsap.DOMTarget,
  {
    delay = 0,
    duration = 0.95,
    stagger = 0.11,
    scrollTrigger,
  }: RevealOptions = {},
): Reveal {
  let animation: gsap.core.Tween | undefined;
  const split = SplitText.create(target, {
    type: "lines",
    mask: "lines",
    autoSplit: true,
    linesClass: "reveal-line",
    onSplit: (self) => {
      // Rebuilt on every re-split; the trigger owns when it plays.
      animation = gsap.from(self.lines, {
        yPercent: 115,
        duration,
        delay,
        stagger,
        ease: REVEAL_EASE,
        scrollTrigger,
      });
      return animation;
    },
  });
  return {
    finish: () => {
      // Jump to the end without killing the trigger, so it can replay later.
      animation?.progress(1);
    },
    rewind: () => animation?.pause(0),
    restart: () => {
      animation?.pause(0);
      animation?.play();
    },
    destroy: () => {
      animation?.scrollTrigger?.kill();
      animation?.kill();
      split.revert();
    },
  };
}

type BlockOptions = RevealOptions & { y?: number };

/** Fades a block in from below — for images, buttons, rules and icons. */
export function revealBlock(
  targets: gsap.DOMTarget,
  {
    delay = 0,
    duration = 0.8,
    stagger = 0.08,
    y = 26,
    scrollTrigger,
  }: BlockOptions = {},
): Reveal {
  const animation = gsap.from(targets, {
    y,
    autoAlpha: 0,
    duration,
    delay,
    stagger,
    ease: REVEAL_EASE,
    scrollTrigger,
  });
  return {
    finish: () => animation.progress(1),
    rewind: () => animation.pause(0),
    restart: () => animation.restart(),
    destroy: () => {
      animation.scrollTrigger?.kill();
      animation.revert();
    },
  };
}

/**
 * Counts the number inside an element up from zero, keeping whatever sits
 * around it ("+30", "12+"). Returns null when there is no number to count.
 */
export function countUp(
  element: HTMLElement,
  { delay = 0, duration = 1.4, scrollTrigger }: RevealOptions = {},
): Reveal | null {
  const original = element.textContent ?? "";
  const match = original.match(/\d[\d.,]*/);
  if (!match) return null;
  const value = Number(match[0].replace(/[.,]/g, ""));
  if (!Number.isFinite(value)) return null;
  const prefix = original.slice(0, match.index);
  const suffix = original.slice((match.index ?? 0) + match[0].length);
  const counter = { value: 0 };
  const render = () => {
    element.textContent = `${prefix}${Math.round(counter.value)}${suffix}`;
  };
  render();
  // Driven by explicit callbacks rather than toggleActions: rewinding a tween
  // over a plain object does not re-run onUpdate, so the old number would stay
  // on screen after the section scrolled away.
  const animation = gsap.to(counter, {
    value,
    duration,
    delay,
    ease: "power2.out",
    snap: { value: 1 },
    paused: true,
    onUpdate: render,
  });
  const rewind = () => {
    animation.pause(0);
    counter.value = 0;
    render();
  };
  const trigger = scrollTrigger
    ? ScrollTrigger.create({
        ...scrollTrigger,
        onEnter: () => animation.restart(true),
        onEnterBack: () => animation.restart(true),
        onLeave: rewind,
        onLeaveBack: rewind,
      })
    : undefined;
  if (!trigger) animation.play();
  return {
    finish: () => animation.progress(1),
    rewind,
    restart: () => animation.restart(true),
    destroy: () => {
      trigger?.kill();
      animation.kill();
      element.textContent = original;
    },
  };
}
