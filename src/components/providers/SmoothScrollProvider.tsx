"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    const media = gsap.matchMedia();
    media.add(
      "(prefers-reduced-motion: no-preference) and (min-width: 901px)",
      () => {
        const lenis = new Lenis({
          lerp: 0.09,
          smoothWheel: true,
          anchors: { offset: -90 },
        });
        lenis.on("scroll", ScrollTrigger.update);
        const tick = (time: number) => lenis.raf(time * 1000);
        gsap.ticker.add(tick);
        return () => {
          gsap.ticker.remove(tick);
          lenis.destroy();
        };
      },
    );
    return () => media.revert();
  }, []);
  return <>{children}</>;
}
