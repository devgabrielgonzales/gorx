"use client";
import { useEffect, useRef, useSyncExternalStore } from "react";

const subscribe = () => () => {};
/** Bump when the video files change, so browsers do not mix cached pieces of the old file with the new one. */
const VIDEO_VERSION = 3;

/**
 * WebKit (Safari, and every browser on iOS) plays VP9 WebM but drops its alpha
 * channel, which would put a black box around the character. Those browsers get
 * the MP4 with a solid ground, blended over the hero instead.
 */
const isWebKitOnly = () => {
  const ua = navigator.userAgent;
  return /AppleWebKit/.test(ua) && !/Chrome|Chromium|Edg|OPR|Android/.test(ua);
};

export default function HeroVideo() {
  const video = useRef<HTMLVideoElement>(null);
  const opaque = useSyncExternalStore(subscribe, isWebKitOnly, () => false);

  useEffect(() => {
    // The loop is decoration: viewers who asked for less motion keep the poster.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      video.current?.pause();
      return;
    }
    // Autoplay can be skipped when the element is swapped after hydration.
    video.current?.play().catch(() => {});
  }, [opaque]);

  return (
    <div className={`gx-hero-figure${opaque ? " gx-is-opaque" : ""}`}>
      <div className="gx-figure-stage">
        <video
          // Changing the source of a mounted <video> does not reload it.
          key={opaque ? "mp4" : "webm"}
          ref={video}
          className="gx-figure-video"
          poster="/images/gorx-hero-personagem.webp"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label="Personagem da Gorx: uma estátua grega de óculos escuros digitando em um notebook"
        >
          {opaque ? (
            <source src={`/video/gorx-hero-personagem.mp4?v=${VIDEO_VERSION}`} type="video/mp4" />
          ) : (
            <source src={`/video/gorx-hero-personagem.webm?v=${VIDEO_VERSION}`} type="video/webm" />
          )}
        </video>
      </div>
    </div>
  );
}
