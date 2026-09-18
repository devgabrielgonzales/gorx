"use client";

import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { releasePreloader } from "@/lib/preloader";

const SYMBOL_POINTS =
  "1069.77 836.36 835.92 836.36 835.92 836.54 747.33 886.1 656.76 829.01 656.78 658.2 1246.45 658.2 1246.45 1055.51 758.53 1337.5 266.68 1054.83 266.68 471.28 756.6 185.44 1242.33 469.23 1070.72 573.05 756.6 390.59 443.34 572.55 443.34 949.88 758.46 1132.68 1070.72 946.02 1070.55 836.35 1069.77 836.36";

const PANELS = 5;

export default function Preloader() {
  const [done, setDone] = useState(false);
  const root = useRef<HTMLDivElement>(null);
  const shape = useRef<SVGPolygonElement>(null);
  const counter = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const html = document.documentElement;
      html.classList.add("is-preloading");

      // The class goes and the gate opens in the same task, so the hero's
      // entrance takes hold on the very frame the overlay stops covering it.
      const finish = () => {
        html.classList.remove("is-preloading");
        releasePreloader();
        setDone(true);
      };

      const reduced = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduced) {
        gsap.set([".preloader__mark", ".preloader__meter"], { autoAlpha: 1 });
        gsap.set(shape.current, { strokeDashoffset: 0, fillOpacity: 1 });
        gsap.to(root.current, {
          autoAlpha: 0,
          duration: 0.35,
          delay: 0.5,
          onComplete: finish,
        });
        return;
      }

      const progress = { value: 0 };

      const tl = gsap.timeline({ defaults: { ease: "power3.out" }, onComplete: finish });

      // Every start state also lives in the stylesheet, so the first paint is
      // bare colour — these only restate it for the tween.
      tl.fromTo(
        ".preloader__mark",
        { yPercent: 18, autoAlpha: 0 },
        { yPercent: 0, autoAlpha: 1, duration: 0.7 },
        0,
      )
        .to(
          shape.current,
          { strokeDashoffset: 0, duration: 1.5, ease: "power2.inOut" },
          0.15,
        )
        .to(shape.current, { fillOpacity: 1, duration: 0.6 }, 1.2)
        .to(".preloader__mark", { scale: 1.04, duration: 0.25 }, 1.45)
        .to(".preloader__mark", { scale: 1, duration: 0.45, ease: "power2.out" }, 1.7)
        .fromTo(
          ".preloader__meter",
          { autoAlpha: 0, y: 14 },
          { autoAlpha: 1, y: 0, duration: 0.5 },
          0.35,
        )
        .to(".preloader__edge", { autoAlpha: 1, duration: 0.6, stagger: 0.1 }, 0.2)
        .to(
          ".preloader__bar span",
          { scaleX: 1, duration: 1.8, ease: "power1.inOut" },
          0.3,
        )
        .to(
          progress,
          {
            value: 100,
            duration: 1.8,
            ease: "power1.inOut",
            onUpdate: () => {
              if (counter.current) {
                counter.current.textContent = String(
                  Math.round(progress.value),
                ).padStart(3, "0");
              }
            },
          },
          0.3,
        )
        .to(
          ".preloader__content",
          { y: -28, autoAlpha: 0, duration: 0.5, ease: "power2.in" },
          "+=0.2",
        )
        .to(
          ".preloader__panel",
          {
            yPercent: -101,
            duration: 0.9,
            ease: "expo.inOut",
            stagger: 0.07,
          },
          "<0.15",
        );
    },
    { scope: root },
  );

  if (done) return null;

  return (
    <div className="preloader" ref={root} role="status" aria-live="polite">
      <div className="preloader__panels" aria-hidden="true">
        {Array.from({ length: PANELS }, (_, i) => (
          <div className="preloader__panel" key={i} />
        ))}
      </div>

      <span className="preloader__edge preloader__edge--tl">GORX</span>
      <span className="preloader__edge preloader__edge--br">
        DESIGN × CÓDIGO
      </span>

      <div className="preloader__content">
        <svg
          className="preloader__mark"
          viewBox="0 0 1513.14 1513.14"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          {/* pathLength normalises the outline to 1, so the draw starts hidden
              from the very first paint — no measuring pass, no flash. */}
          <polygon
            ref={shape}
            points={SYMBOL_POINTS}
            pathLength={1}
            fill="#0d0d0d"
            fillOpacity={0}
            stroke="#0d0d0d"
            strokeWidth="6"
            strokeLinejoin="round"
            strokeDasharray={1}
            strokeDashoffset={1}
          />
        </svg>

        <div className="preloader__meter">
          <div className="preloader__bar">
            <span />
          </div>
          <div className="preloader__meta">
            <span>CARREGANDO</span>
            <span className="preloader__count" ref={counter}>
              000
            </span>
          </div>
        </div>
      </div>

      <span className="sr-only">Carregando o site</span>
    </div>
  );
}
