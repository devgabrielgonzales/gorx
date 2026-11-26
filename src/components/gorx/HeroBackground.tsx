"use client";
import { useSyncExternalStore } from "react";
import GradientASCII from "@/components/GradientASCII";

/** Lime on the rim of the horizon, then dark greens fading into the page. */
const COLORS = ["#bff549", "#3b4f12", "#222e0c", "#141a0a"];
const FALLBACK_FONT = "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";

const subscribe = () => () => {};

/**
 * next/font registers JetBrains Mono under a generated family name, exposed as
 * a CSS variable on <html>. The shader draws its glyph atlas on a canvas, so it
 * needs the real name rather than the variable.
 */
const readMonoFont = () => {
  const family = getComputedStyle(document.documentElement)
    .getPropertyValue("--font-jetbrains")
    .trim();
  return family ? `${family}, ${FALLBACK_FONT}` : FALLBACK_FONT;
};

export default function HeroBackground() {
  const fontFamily = useSyncExternalStore(
    subscribe,
    readMonoFont,
    () => FALLBACK_FONT,
  );
  return (
    <div className="gx-hero-ascii">
      <GradientASCII
        colors={COLORS}
        shape="horizon"
        characters=" =+xX0S8#@"
        cellSize={18}
        density={0.8}
        gradientOpacity={0.5}
        glyphOpacity={0.85}
        glow={0.2}
        grain={0.06}
        fontFamily={fontFamily}
      />
    </div>
  );
}
