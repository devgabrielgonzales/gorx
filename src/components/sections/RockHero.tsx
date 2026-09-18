"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { revealLines, type Reveal } from "@/lib/motion";

/**
 * How many clips the scroll range plays through. The clips alternate forward
 * and reverse, so an even count lands the loop back where it started.
 */
const SCROLL_CYCLES = 2;

/**
 * The forward footage and its pre-rendered reverse. Scrubbing backwards
 * through an mp4 is expensive, so the second half of the loop plays a
 * reversed encode forwards instead.
 */
const SOURCES = {
  desktop: ["/video/rocks-desktop.mp4", "/video/rocks-desktop-reverse.mp4"],
  mobile: ["/video/rocks-mobile.mp4", "/video/rocks-mobile-reverse.mp4"],
};

export default function RockHero({ children }: { children: React.ReactNode }) {
  const root = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reverseRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const video = videoRef.current;
    const reverse = reverseRef.current;
    const section = root.current;
    if (!video || !reverse || !section) return;
    const entrance = gsap.matchMedia();
    entrance.add("(prefers-reduced-motion: no-preference)", () => {
      const reveals: Reveal[] = [];
      let timeline: gsap.core.Timeline | undefined;
      const context = gsap.context(() => {
        // The headline lines already exist in the markup, so they slide out
        // from behind their masks instead of being split at runtime.
        timeline = gsap
          .timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              toggleActions: "play reset play reset",
            },
          })
          .from(".hero-eyebrow", { y: 16, autoAlpha: 0, duration: 0.7 })
          .from(
            ".hero-line > *",
            { yPercent: 115, duration: 1.05, stagger: 0.12 },
            0.1,
          )
          .from(
            ".hero-actions > *",
            { y: 18, autoAlpha: 0, duration: 0.7, stagger: 0.1 },
            0.8,
          )
          .from(
            ".hero-bottom > *",
            { y: 14, autoAlpha: 0, duration: 0.7, stagger: 0.1 },
            0.95,
          )
          .from(".hero-side-label", { autoAlpha: 0, duration: 0.8 }, 1.1);
        const intro = section.querySelector<HTMLElement>(".hero-intro > p");
        if (intro)
          reveals.push(
            revealLines(intro, {
              delay: 0.65,
              scrollTrigger: {
                trigger: section,
                start: "top bottom",
                end: "bottom top",
                toggleActions: "play reset play reset",
              },
            }),
          );
      }, section);
      // Keyboard focus must never land inside an unrevealed entrance.
      const finish = () => {
        timeline?.progress(1);
        reveals.forEach((reveal) => reveal.finish());
      };
      section.addEventListener("focusin", finish);
      return () => {
        section.removeEventListener("focusin", finish);
        reveals.forEach((reveal) => reveal.destroy());
        context.revert();
      };
    });
    const media = gsap.matchMedia();
    media.add(
      {
        mobile: "(max-width: 700px)",
        desktop: "(min-width: 701px)",
        reduced: "(prefers-reduced-motion: reduce)",
      },
      (context) => {
        if (context.conditions?.reduced) return;
        const clips = [video, reverse];
        const sources = context.conditions?.mobile
          ? SOURCES.mobile
          : SOURCES.desktop;
        let timeline: gsap.core.Timeline | undefined;
        let frame = 0;
        let disposed = false;
        let loaded = 0;
        let shown = false;
        let active = 0;
        let targetTime = 0;
        const playhead = { cycles: 0 };
        // One seek in flight; catch up to the latest scroll position on seeked.
        const seek = () => {
          frame = 0;
          const clip = clips[active];
          if (disposed || clip.seeking || clip.readyState < 2) return;
          if (Math.abs(clip.currentTime - targetTime) > 0.025)
            clip.currentTime = targetTime;
        };
        const scheduleSeek = () => {
          if (!frame) frame = requestAnimationFrame(seek);
        };
        // Only the clip the playhead is inside of is on screen.
        const paint = () => {
          clips.forEach((clip, index) => {
            clip.style.opacity = shown && index === active ? "1" : "0";
          });
        };
        const init = () => {
          if (
            timeline ||
            ++loaded < clips.length ||
            clips.some((clip) => !Number.isFinite(clip.duration) || clip.duration <= 0)
          )
            return;
          shown = true;
          paint();
          timeline = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom top",
              scrub: 0.45,
              invalidateOnRefresh: true,
            },
          });
          timeline.to(
            playhead,
            {
              cycles: SCROLL_CYCLES,
              duration: 1,
              ease: "none",
              onUpdate: () => {
                // Wrapping handles scrolling back up, so the loop runs both ways.
                const next = gsap.utils.wrap(
                  0,
                  clips.length,
                  Math.floor(playhead.cycles),
                );
                if (next !== active) {
                  active = next;
                  paint();
                }
                // Each clip is timed by its own duration; the encodes differ by
                // a frame or two and a fraction keeps the handover seamless.
                const clip = clips[active];
                const progress = gsap.utils.wrap(0, 1, playhead.cycles);
                targetTime = Math.min(
                  progress * clip.duration,
                  clip.duration - 0.05,
                );
                scheduleSeek();
              },
            },
            0,
          );
          scheduleSeek();
          ScrollTrigger.refresh();
        };
        const failure = () => {
          shown = false;
          paint();
          timeline?.scrollTrigger?.kill();
          timeline?.kill();
          gsap.set(section.querySelectorAll(".hero-copy, .hero-bottom"), {
            clearProps: "all",
          });
          ScrollTrigger.refresh();
        };
        clips.forEach((clip, index) => {
          clip.addEventListener("loadeddata", init);
          clip.addEventListener("seeked", scheduleSeek);
          clip.addEventListener("error", failure);
          clip.src = sources[index];
          clip.load();
        });
        return () => {
          disposed = true;
          cancelAnimationFrame(frame);
          timeline?.scrollTrigger?.kill();
          timeline?.revert();
          clips.forEach((clip) => {
            clip.removeEventListener("loadeddata", init);
            clip.removeEventListener("seeked", scheduleSeek);
            clip.removeEventListener("error", failure);
            clip.pause();
            clip.removeAttribute("src");
            clip.load();
            clip.style.opacity = "0";
          });
        };
      },
    );
    return () => { media.revert(); entrance.revert(); };
  }, []);
  return (
    <section id="hero" className="rock-hero" ref={root}>
      <div className="hero-media" aria-hidden="true">
        <Image
          src="/images/rocks-poster.webp"
          alt=""
          fill
          sizes="100vw"
          preload
          className="hero-poster"
        />
        <video ref={videoRef} muted playsInline preload="auto" tabIndex={-1} />
        <video ref={reverseRef} muted playsInline preload="auto" tabIndex={-1} />
        <div className="hero-shade" />
      </div>
      {children}
      <span className="hero-side-label eyebrow" aria-hidden="true">
        Creative development / Frontend & Fullstack
      </span>
    </section>
  );
}
