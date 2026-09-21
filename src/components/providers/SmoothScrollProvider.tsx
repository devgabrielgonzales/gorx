"use client";
import { useEffect } from "react";
import Lenis from "lenis";
import { OverlayScrollbars } from "overlayscrollbars";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const osInstance = OverlayScrollbars(document.body, {
      scrollbars: { theme: "os-theme-primary", clickScroll: true },
    });
    return () => osInstance.destroy();
  }, []);

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
