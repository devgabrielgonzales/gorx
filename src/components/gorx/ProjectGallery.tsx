"use client";
import { useEffect, useRef, useState, type ReactNode } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { Project } from "@/data/content";
import { GorxGlyph } from "./marks";

const pad = (value: number) => String(value).padStart(2, "0");

/** Distance between the left edges of two neighbouring cards. */
const cardStep = (row: HTMLElement | null) => {
  const cards = row?.querySelectorAll<HTMLElement>(".gx-p-card");
  if (!cards || cards.length < 2) return 0;
  return cards[1].offsetLeft - cards[0].offsetLeft;
};

/**
 * One row of cards, two ways of moving through it: on wide screens the page
 * scroll slides it sideways (driven from SiteMotion); on narrow ones it is a
 * swipe carousel, and the counter, rail and arrows below follow its position.
 */
export default function ProjectGallery({ projects }: { projects: Project[] }) {
  const wrap = useRef<HTMLDivElement>(null);
  const [index, setIndex] = useState(0);
  // The closing "your project here" card is a slide too, but not a project.
  const slides = projects.length + 1;
  const shown = Math.min(index + 1, projects.length);

  useEffect(() => {
    const element = wrap.current;
    if (!element) return;
    const onScroll = () => {
      const size = cardStep(element);
      if (!size) return;
      const current = Math.round(element.scrollLeft / size);
      setIndex(Math.max(0, Math.min(slides - 1, current)));
    };
    element.addEventListener("scroll", onScroll, { passive: true });
    return () => element.removeEventListener("scroll", onScroll);
  }, [slides]);

  const go = (direction: -1 | 1) => {
    const target = Math.max(0, Math.min(slides - 1, index + direction));
    wrap.current?.scrollTo({
      left: target * cardStep(wrap.current),
      behavior: "smooth",
    });
  };

  return (
    <>
      <div className="gx-h-wrap" ref={wrap}>
        <div className="gx-h-track">
          {projects.map((project) => {
            const external = /^https?:\/\//.test(project.url);
            const content: ReactNode = (
              <>
                <div className="gx-p-img">
                  <div className="gx-p-pic">
                    <Image
                      src={project.image}
                      alt={`Projeto ${project.name}`}
                      fill
                      sizes="(max-width: 899px) 80vw, 40vw"
                    />
                  </div>
                </div>
                <div className="gx-p-meta">
                  <h3>{project.name}</h3>
                  <span className="gx-eyebrow">{project.category}</span>
                </div>
                <p>{project.description}</p>
              </>
            );
            return external ? (
              <a
                className="gx-p-card"
                key={project.id}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visitar ${project.name} (abre em nova aba)`}
              >
                {content}
              </a>
            ) : (
              <article className="gx-p-card" key={project.id}>
                {content}
              </article>
            );
          })}
          <a className="gx-p-card gx-more" href="#contato">
            <div className="gx-p-img">
              <div className="gx-l-block">
                <GorxGlyph className="gx-l-mark" />
                <div className="gx-l-top">
                  <span className="gx-eyebrow">Próximo projeto</span>
                  <span className="gx-l-arrow">
                    <ArrowUpRight size={24} aria-hidden="true" />
                  </span>
                </div>
                <span className="gx-l-num">+1</span>
              </div>
            </div>
            <div className="gx-p-meta">
              <h3>Seu projeto aqui</h3>
              <span className="gx-eyebrow">Vamos conversar</span>
            </div>
            <p>Me conta a ideia e ela entra nesta galeria.</p>
          </a>
        </div>
      </div>
      <div className="gx-wrap gx-h-foot">
        <div className="gx-h-ctrl">
          <span className="gx-h-count">
            {pad(shown)} / {pad(projects.length)}
          </span>
          <span className="gx-h-rail" aria-hidden="true">
            <i style={{ transform: `scaleX(${shown / projects.length})` }} />
          </span>
          <button
            className="gx-h-nav"
            type="button"
            aria-label="Projeto anterior"
            disabled={index === 0}
            onClick={() => go(-1)}
          >
            <ArrowLeft size={18} aria-hidden="true" />
          </button>
          <button
            className="gx-h-nav"
            type="button"
            aria-label="Próximo projeto"
            disabled={index >= slides - 1}
            onClick={() => go(1)}
          >
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
        <div className="gx-h-bar" aria-hidden="true">
          <i />
        </div>
        <a href="#contato" className="gx-link-arrow">
          O próximo pode ser o seu <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      </div>
    </>
  );
}
