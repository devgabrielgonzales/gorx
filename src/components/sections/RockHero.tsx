"use client";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, SplitText } from "@/lib/gsap";
import { revealLines, type Reveal } from "@/lib/motion";
import { whenPreloaderDone } from "@/lib/preloader";

/**
 * How many clips the scroll range plays through. The footage is only 8s, so one
 * cycle is already a full pass over the hero's exit; more than that reads as
 * the clip looping rather than as one continuous move. The free-run clock keeps
 * advancing on top of this, so the alternation into the reverse encode still
 * happens, just off the scroll's back.
 */
const SCROLL_CYCLES = 0;

/** Free-run speed, in cycles per clip duration. 1 is real time. */
const FREE_RUN_RATE = 1;

/**
 * The rubber band that reconciles real playback with the scroll-offset target.
 * GAIN is 1/tau: at 8 the error decays with a 125ms time constant, so a single
 * frame of drift (41ms at 24fps) is absorbed in about two frames without the
 * judder a seek would cause.
 */
const GAIN = 8;
const RATE_MIN = 0.1;
const RATE_MAX = 4;

/**
 * Past these the band cannot catch up in time, so seek instead. Forwards a
 * second is tolerable because 4x clears it in a third of that; backwards
 * playback cannot help at all, and keyframes every 12 frames keep a rewind
 * seek cheap.
 */
const SEEK_AHEAD = 1;
const SEEK_BEHIND = 0.15;

/** How early the incoming clip is pre-seeked before a cycle boundary. */
const ARM_LEAD = 0.4;

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
      let presence: ScrollTrigger | undefined;
      // The entrance is built at once — its `from` states are what keeps the
      // hero hidden behind the preloader — but it only runs once the overlay
      // has left, so it is never spent on a covered screen.
      let gateOpen = false;
      // One ScrollTrigger cannot drive both jobs on a flush-top 100svh
      // section: an `end` early enough to vaporize while the h1 is on
      // screen collapses to scroll 0 (`top top`), and any later keyword
      // (`center top`, `bottom top`) fires after the title has already
      // left. Presence watches the section; vaporize watches the h1.
      type CopyState =
        | "hidden"
        | "entering"
        | "shown"
        | "vaporizing"
        | "vaporized";
      let copyState: CopyState = "hidden";
      const lines = Array.from(
        section.querySelectorAll<HTMLElement>(".hero-line"),
      );
      const title = section.querySelector<HTMLElement>("h1");
      const headline = Array.from(
        section.querySelectorAll<HTMLElement>(".hero-line > *"),
      );
      const collectCopy = () => {
        const introLines = Array.from(
          section.querySelectorAll<HTMLElement>(".hero-intro .reveal-line"),
        );
        const intro =
          introLines.length > 0
            ? introLines
            : Array.from(
                section.querySelectorAll<HTMLElement>(".hero-intro > p"),
              );
        return [...headline, ...intro];
      };
      let charSplits: SplitText[] = [];
      let vaporTween: gsap.core.Timeline | undefined;
      const actions = Array.from(
        section.querySelectorAll<HTMLElement>(".hero-actions > *"),
      );
      const resetVapor = () => {
        vaporTween?.kill();
        vaporTween = undefined;
        charSplits.forEach((split) => split.revert());
        charSplits = [];
        section.classList.remove("is-vaporizing");
        lines.forEach((line) =>
          line.classList.remove("hero-line--vaporizing"),
        );
      };
      const hideTitleCopy = () => {
        resetVapor();
        if (headline.length) gsap.set(headline, { yPercent: 115 });
        reveals.forEach((reveal) => reveal.rewind());
        const intro = section.querySelector<HTMLElement>(".hero-intro > p");
        if (intro) gsap.set(intro, { autoAlpha: 0 });
      };
      const playEntrance = () => {
        if (!gateOpen || !timeline) return;
        if (copyState === "entering" || copyState === "shown") return;
        resetVapor();
        const intro = section.querySelector<HTMLElement>(".hero-intro > p");
        if (intro) gsap.set(intro, { clearProps: "opacity,visibility" });
        copyState = "entering";
        timeline.pause(0);
        timeline.play();
        reveals.forEach((reveal) => reveal.restart());
      };
      const hideCopy = () => {
        resetVapor();
        timeline?.progress(0);
        reveals.forEach((reveal) => reveal.rewind());
        copyState = "hidden";
      };
      const vaporizeOut = () => {
        if (copyState !== "shown" && copyState !== "entering") return;
        if (vaporTween) return;
        const copyTargets = collectCopy();
        if (!copyTargets.length) return;
        if (copyState === "entering") {
          timeline?.progress(1);
          reveals.forEach((reveal) => reveal.finish());
        }
        copyState = "vaporizing";
        section.classList.add("is-vaporizing");
        lines.forEach((line) => line.classList.add("hero-line--vaporizing"));
        charSplits = copyTargets.map((el) =>
          SplitText.create(el, { type: "chars", charsClass: "vapor-char" }),
        );
        const chars = charSplits.flatMap((split) => split.chars);
        vaporTween = gsap.timeline({
          onComplete: () => {
            hideTitleCopy();
            copyState = "vaporized";
          },
        });
        if (chars.length) {
          vaporTween.fromTo(
            chars,
            { filter: "blur(0px)" },
            {
              autoAlpha: 0,
              scale: () => gsap.utils.random(0.55, 1.7),
              x: () => gsap.utils.random(-90, 90),
              y: () => gsap.utils.random(-70, 90),
              rotation: () => gsap.utils.random(-32, 32),
              filter: "blur(8px)",
              duration: 0.8,
              ease: "power2.out",
              stagger: { amount: 0.35, from: "random" },
            },
            0,
          );
        }
        if (actions.length) {
          vaporTween.to(
            actions,
            { autoAlpha: 0, duration: 0.45, ease: "power2.out", overwrite: "auto" },
            0,
          );
        }
        if (!vaporTween.getChildren().length) {
          hideTitleCopy();
          copyState = "vaporized";
        }
      };
      const context = gsap.context(() => {
        timeline = gsap
          .timeline({
            paused: true,
            defaults: { ease: "power3.out" },
            onComplete: () => {
              if (copyState === "entering") copyState = "shown";
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
        // In view for the whole section, including scroll 0. Lets the
        // preloader gate call `play()` without tying that to the vaporize
        // threshold.
        presence = ScrollTrigger.create({
          trigger: section,
          start: "top bottom",
          end: "bottom top",
          onEnter: playEntrance,
          onEnterBack: playEntrance,
          onLeave: hideCopy,
          onLeaveBack: hideCopy,
        });
        // Keyword pairs on the section are degenerate (`top top` = scroll
        // 0) or too late (`center top` puts the h1 at y ≈ -170). Fire
        // after the title has travelled ~30% toward the top — always
        // past scroll 0, always while the block is still on screen.
        if (title) {
          ScrollTrigger.create({
            trigger: title,
            start: () => {
              const restTop =
                title.getBoundingClientRect().top + window.scrollY;
              const travel = Math.max(64, restTop * 0.3);
              return `top ${Math.max(0, restTop - travel)}px`;
            },
            end: "bottom top",
            invalidateOnRefresh: true,
            onEnter: (self) => {
              if (self.start <= 0) return;
              vaporizeOut();
            },
            onLeaveBack: playEntrance,
          });
        }
      }, section);
      // Held back with the timeline: a line reveal plays the moment it is
      // built, so building it is what opening the gate means here. Until then
      // `.is-preloading` keeps the paragraph out of sight.
      const buildIntro = () =>
        context.add(() => {
          const intro = section.querySelector<HTMLElement>(".hero-intro > p");
          if (!intro) return;
          const reveal = revealLines(intro, { delay: 0.65 });
          reveal.rewind();
          reveals.push(reveal);
        });
      const openGate = () => {
        if (gateOpen) return;
        gateOpen = true;
        buildIntro();
        if (!presence || presence.isActive) playEntrance();
      };
      const unwait = whenPreloaderDone(openGate);
      // Keyboard focus must never land inside an unrevealed entrance.
      const finish = () => {
        openGate();
        resetVapor();
        timeline?.progress(1);
        copyState = "shown";
        reveals.forEach((reveal) => reveal.finish());
      };
      section.addEventListener("focusin", finish);
      return () => {
        unwait();
        section.removeEventListener("focusin", finish);
        resetVapor();
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
        let disposed = false;
        let shown = false;
        let active = 0;
        // The playhead is the sum of a free-running clock and the scroll
        // offset, so the scene advances on its own and the scroll speeds it up
        // or drives it backwards on top of that.
        let autoCycles = 0;
        const playhead = { cycles: 0 };
        let offscreen = false;
        let hidden = false;
        let paused = false;
        // Autoplay refused; fall back to seeking the playhead into place.
        let blocked = false;
        let waiting = false;

        const ready = () =>
          clips.every(
            (clip) =>
              clip.readyState >= 2 &&
              Number.isFinite(clip.duration) &&
              clip.duration > 0,
          );
        const seek = (clip: HTMLVideoElement, time: number) => {
          if (disposed || clip.seeking || clip.readyState < 2) return;
          if (Math.abs(clip.currentTime - time) > 0.025)
            clip.currentTime = time;
        };
        // Only the clip the playhead is inside of is on screen.
        const paint = () => {
          clips.forEach((clip, index) => {
            clip.style.opacity = shown && index === active ? "1" : "0";
          });
        };
        const retry = () => {
          waiting = false;
          if (disposed || paused) return;
          blocked = false;
          start(clips[active]);
        };
        // iOS Low Power Mode refuses autoplay even when muted, so the next
        // gesture gets one more chance before we settle for seeking.
        const wait = () => {
          if (waiting || disposed) return;
          waiting = true;
          document.addEventListener("pointerdown", retry, { once: true });
          document.addEventListener("keydown", retry, { once: true });
        };
        const start = (clip: HTMLVideoElement) => {
          clip.play().catch(() => {
            blocked = true;
            wait();
          });
        };
        const sync = () => {
          const next = offscreen || hidden;
          if (disposed || paused === next) return;
          paused = next;
          if (next) clips.forEach((clip) => clip.pause());
          else if (shown && !blocked) start(clips[active]);
        };
        const visibility = () => {
          hidden = document.hidden;
          sync();
        };
        // Near a boundary the incoming clip is pre-seeked to its entry frame
        // while still transparent, so the swap never exposes a cold frame.
        const arm = (frac: number) => {
          const clip = clips[active];
          const other = clips[gsap.utils.wrap(0, clips.length, active + 1)];
          if ((1 - frac) * clip.duration <= ARM_LEAD) seek(other, 0);
          else if (frac * clip.duration <= ARM_LEAD)
            seek(other, other.duration - 0.05);
        };
        const handover = (next: number, frac: number) => {
          const from = clips[active];
          const to = clips[next];
          active = next;
          seek(to, frac * to.duration);
          to.playbackRate = 1;
          if (!blocked && to.paused) start(to);
          paint();
          from.pause();
        };
        const tick = (_time: number, deltaTime: number) => {
          if (disposed || paused || !shown) return;
          // The clock is per-clip: the two encodes differ by a frame, so a
          // shared constant would drift across every handover.
          autoCycles +=
            ((deltaTime / 1000) * FREE_RUN_RATE) / clips[active].duration;
          const cycles = autoCycles + playhead.cycles;
          // Wrapping handles scrolling back up, so the loop runs both ways.
          const next = gsap.utils.wrap(0, clips.length, Math.floor(cycles));
          const frac = gsap.utils.wrap(0, 1, cycles);
          if (next !== active) handover(next, frac);
          else arm(frac);
          const clip = clips[active];
          const desired = frac * clip.duration;
          const error = desired - clip.currentTime;
          if (blocked) {
            seek(clip, desired);
            return;
          }
          if (error > SEEK_AHEAD || error < -SEEK_BEHIND) {
            clip.playbackRate = 1;
            seek(clip, desired);
            return;
          }
          clip.playbackRate = gsap.utils.clamp(
            RATE_MIN,
            RATE_MAX,
            1 + error * GAIN,
          );
        };
        const init = () => {
          if (timeline || !ready()) return;
          shown = true;
          paint();
          timeline = gsap.timeline({
            scrollTrigger: {
              trigger: section,
              start: "top top",
              end: "bottom top",
              scrub: 0.8,
              invalidateOnRefresh: true,
              onLeave: () => {
                offscreen = true;
                sync();
              },
              onEnterBack: () => {
                offscreen = false;
                sync();
              },
            },
          });
          // The tween exists only so scrub smooths the value the ticker reads.
          timeline.to(
            playhead,
            { cycles: SCROLL_CYCLES, duration: 1, ease: "none" },
            0,
          );
          gsap.ticker.add(tick);
          start(clips[active]);
          ScrollTrigger.refresh();
        };
        const failure = () => {
          shown = false;
          paint();
          gsap.ticker.remove(tick);
          clips.forEach((clip) => clip.pause());
          timeline?.scrollTrigger?.kill();
          timeline?.kill();
          ScrollTrigger.refresh();
        };
        document.addEventListener("visibilitychange", visibility);
        clips.forEach((clip, index) => {
          clip.addEventListener("loadeddata", init);
          clip.addEventListener("error", failure);
          clip.src = sources[index];
          clip.load();
        });
        return () => {
          disposed = true;
          gsap.ticker.remove(tick);
          document.removeEventListener("visibilitychange", visibility);
          document.removeEventListener("pointerdown", retry);
          document.removeEventListener("keydown", retry);
          timeline?.scrollTrigger?.kill();
          timeline?.revert();
          clips.forEach((clip) => {
            clip.removeEventListener("loadeddata", init);
            clip.removeEventListener("error", failure);
            clip.pause();
            clip.playbackRate = 1;
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
