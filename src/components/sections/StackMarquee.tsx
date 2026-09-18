"use client";

import { useState } from "react";
import Image from "next/image";
import { Pause, Play } from "lucide-react";

const stack = [
  { name: "HTML5", icon: "/svg/stack/html5.svg" },
  { name: "CSS3", icon: "/svg/stack/css3.svg" },
  { name: "JavaScript", icon: "/svg/stack/javascript.svg" },
  { name: "TypeScript", icon: "/svg/stack/typescript.svg" },
  { name: "React", icon: "/svg/stack/react.svg" },
  { name: "Next.js", icon: "/svg/stack/nextjs.svg" },
  { name: "Tailwind", icon: "/svg/stack/tailwind.svg" },
  { name: "Node.js", icon: "/svg/stack/nodejs.svg" },
  { name: "PostgreSQL", icon: "/svg/stack/postgresql.svg" },
  { name: "Git", icon: "/svg/stack/git.svg" },
  { name: "Figma", icon: "/svg/stack/figma.svg" },
  { name: "Docker", icon: "/svg/stack/docker.svg" },
  { name: "Vercel", icon: "/svg/stack/vercel.svg" },
  { name: "Cursor", icon: "/svg/stack/cursor.svg" },
  { name: "Claude", icon: "/svg/stack/claude.svg" },
  { name: "Codex", icon: "/svg/stack/codex.svg" },
];

export default function StackMarquee() {
  const [paused, setPaused] = useState(false);
  return (
    <section
      id="stack"
      className="stack-carousel"
      aria-labelledby="stack-title"
    >
      <div className="stack-carousel-heading">
        <h2 id="stack-title" className="eyebrow">
          Stack & Tecnologias
        </h2>
        <button
          type="button"
          className="stack-pause"
          onClick={() => setPaused(!paused)}
          aria-label={
            paused
              ? "Reproduzir carrossel de tecnologias"
              : "Pausar carrossel de tecnologias"
          }
          aria-pressed={paused}
        >
          {paused ? <Play size={14} /> : <Pause size={14} />}
        </button>
      </div>
      <div className="marquee-container">
        <div className="marquee-track" data-paused={paused}>
          {[0, 1].map((copy) => (
            <ul
              className="marquee-group"
              key={copy}
              aria-hidden={copy === 1 ? true : undefined}
            >
              {stack.map((technology) => (
                <li className="stack-item" key={technology.name}>
                  <Image
                    src={technology.icon}
                    alt=""
                    width={36}
                    height={36}
                    unoptimized
                    // The marquee scrolls every item into view, so lazy
                    // loading would drag blank gaps across the track.
                    loading="eager"
                  />
                  <span>{technology.name}</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
