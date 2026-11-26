"use client";
import { useEffect, useRef } from "react";

const LIME = "191,245,73";
const PALE = "226,255,214";
const WHITE = "255,255,255";
/** The frame shown to viewers who asked for less motion. */
const STILL_FRAME_MS = 3200;
/** Seconds the scan line takes to cross the frame once. */
const SCAN_SECONDS = 5;
/** The entrance waits for the character to arrive, then each mark takes this long to draw. */
const DRAW_DELAY = 0.9;
const DRAW_SECONDS = 0.8;
/** One full breath of the frame, and how far the marks travel in it. */
const BREATH_SECONDS = 6;
const BREATH_PX = 5;
/** How often the glint visits each mark. */
const GLINT_SECONDS = 4;

type Box = { x: number; y: number; w: number; h: number };
type Point = [number, number];

const rgba = (rgb: string, alpha: number) =>
  `rgba(${rgb},${Math.max(0, Math.min(1, alpha)).toFixed(3)})`;

/**
 * Four guide marks around the hero character, with the same cut corner as the
 * buttons. They draw themselves in, breathe, catch a glint in turn, and frame a
 * scan line drifting down between them. Drawn over the ASCII background.
 * Canvas 2D rather than WebGL: the page already runs one shader in the hero.
 */
export default function HeroGuides() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = canvas?.closest<HTMLElement>(".gx-hero");
    const figure = hero?.querySelector<HTMLElement>(".gx-hero-figure");
    const context = canvas?.getContext("2d");
    if (!canvas || !hero || !figure || !context) return;
    const stage = figure.querySelector<HTMLElement>(".gx-figure-stage") ?? figure;
    const ctx = context;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let box: Box = { x: 0, y: 0, w: 1, h: 1 };
    let frameId = 0;
    let visible = true;
    let startedAt = 0;

    const measure = () => {
      // The canvas can be shorter than the hero: on phones the background
      // only covers the band where the character stands.
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);

      // Layout offsets, not client rects: the entrance animation moves the
      // figure with a transform, and the marks belong to its resting place.
      let x = 0;
      let y = 0;
      for (let node: HTMLElement | null = figure; node && node !== hero; node = node.offsetParent as HTMLElement | null) {
        x += node.offsetLeft;
        y += node.offsetTop;
      }
      const figureRect = figure.getBoundingClientRect();
      const stageRect = stage.getBoundingClientRect();
      box = {
        x: x + (stageRect.left - figureRect.left),
        y: y + (stageRect.top - figureRect.top),
        w: stageRect.width,
        h: stageRect.height,
      };
      if (reduceMotion) draw(STILL_FRAME_MS);
    };

    function draw(now: number) {
      const t = now / 1000;
      if (!startedAt) startedAt = t;
      // Viewers who asked for less motion get the finished, resting frame.
      const age = reduceMotion ? Infinity : t - startedAt;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";

      // The frame breathes: the marks drift a few pixels out and back in.
      const breath = reduceMotion ? 0 : Math.sin((t / BREATH_SECONDS) * Math.PI * 2) * BREATH_PX;
      const left = Math.max(box.x + box.w * 0.03 - breath, 8);
      const right = Math.min(box.x + box.w * 0.97 + breath, width - 8);
      const top = Math.max(box.y + box.h * 0.03 - breath, 8);
      const bottom = Math.min(box.y + box.h * 0.82 + breath, height - 12);
      const arm = box.w * 0.11;
      const cut = box.w * 0.045;

      // Each mark is a path that starts and ends at its arm tips.
      // Top-right and bottom-left are cut, like the buttons.
      const marks: Point[][] = [
        [[left, top + arm], [left, top], [left + arm, top]],
        [[right - arm, top], [right - cut, top], [right, top + cut], [right, top + arm]],
        [[right, bottom - arm], [right, bottom], [right - arm, bottom]],
        [[left + arm, bottom], [left + cut, bottom], [left, bottom - cut], [left, bottom - arm]],
      ];

      ctx.lineJoin = "miter";
      ctx.lineCap = "butt";
      marks.forEach((points, index) => {
        const length = points.slice(1).reduce((sum, [px, py], i) => sum + Math.hypot(px - points[i][0], py - points[i][1]), 0);
        ctx.beginPath();
        points.forEach(([px, py], i) => (i ? ctx.lineTo(px, py) : ctx.moveTo(px, py)));

        // Entrance: each mark draws itself from one tip to the other, one after another.
        const drawn = Math.max(0, Math.min(1, (age - DRAW_DELAY - index * 0.18) / DRAW_SECONDS));
        const eased = 1 - Math.pow(1 - drawn, 3);
        if (eased <= 0) return;
        ctx.setLineDash([length * eased, length * 2]);
        ctx.lineDashOffset = 0;
        ctx.lineWidth = 2.2;
        ctx.strokeStyle = rgba(LIME, 1);
        ctx.shadowColor = rgba(LIME, 1);
        ctx.shadowBlur = 14;
        ctx.stroke();
        // A second pass without blur keeps the line crisp over its own glow.
        ctx.shadowBlur = 0;
        ctx.stroke();

        // A white glint runs along each mark in turn.
        if (drawn >= 1 && !reduceMotion) {
          const progress = ((t / GLINT_SECONDS + index * 0.25) % 1) * 2.5;
          if (progress < 1) {
            const dash = length * 0.3;
            ctx.setLineDash([dash, length * 2 + dash * 2]);
            ctx.lineDashOffset = dash - progress * (length + dash);
            ctx.lineWidth = 2.6;
            ctx.strokeStyle = rgba(WHITE, 0.95);
            ctx.shadowBlur = 16;
            ctx.stroke();
            ctx.shadowBlur = 0;
          }
        }
        ctx.setLineDash([]);
      });

      // The scan line fades in after the top marks and out before the bottom ones.
      const progress = reduceMotion ? 0.45 : (t / SCAN_SECONDS) % 1;
      const strength = Math.sin(progress * Math.PI) * Math.min(1, Math.max(0, age - DRAW_DELAY - DRAW_SECONDS));
      const y = top + (bottom - top) * progress;
      const gradient = ctx.createLinearGradient(left, 0, right, 0);
      gradient.addColorStop(0, rgba(LIME, 0));
      gradient.addColorStop(0.5, rgba(PALE, strength));
      gradient.addColorStop(1, rgba(LIME, 0));
      // A soft band trails above the line, like the wake of a scanner.
      const wake = ctx.createLinearGradient(0, y - 46, 0, y);
      wake.addColorStop(0, rgba(LIME, 0));
      wake.addColorStop(1, rgba(LIME, 0.14 * strength));
      ctx.fillStyle = wake;
      ctx.fillRect(left + (right - left) * 0.12, y - 46, (right - left) * 0.76, 46);
      ctx.beginPath();
      ctx.moveTo(left, y);
      ctx.lineTo(right, y);
      ctx.lineWidth = 1.6;
      ctx.strokeStyle = gradient;
      ctx.shadowColor = rgba(LIME, 1);
      ctx.shadowBlur = 16;
      ctx.stroke();
      ctx.shadowBlur = 0;

      ctx.globalCompositeOperation = "source-over";
    }

    const loop = (now: number) => {
      draw(now);
      frameId = requestAnimationFrame(loop);
    };
    const start = () => {
      if (reduceMotion || frameId || !visible || document.hidden) return;
      frameId = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(frameId);
      frameId = 0;
    };

    measure();
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(hero);
    resizeObserver.observe(figure);

    // Nothing to draw once the hero has scrolled away or the tab is hidden.
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    intersectionObserver.observe(hero);
    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);
    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="gx-hero-lines" />;
}
