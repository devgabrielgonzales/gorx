"use client";
import { useState, type ReactNode } from "react";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { ScrollTrigger } from "@/lib/gsap";
import type { Project } from "@/data/content";
import { GorxGlyph } from "./marks";

/**
 * One list, two presentations: a pinned sideways gallery on wide screens and a
 * stack of rows on narrow ones, where only the first five show until asked.
 */
export default function ProjectGallery({ projects }: { projects: Project[] }) {
  const [showAll, setShowAll] = useState(false);

  const reveal = () => {
    setShowAll(true);
    // The page just grew; every trigger below this section has moved.
    requestAnimationFrame(() => ScrollTrigger.refresh());
  };

  return (
    <>
      <div className="gx-h-wrap">
        <div className={`gx-h-track${showAll ? " gx-all" : ""}`}>
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
                      sizes="(max-width: 899px) 104px, 40vw"
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
        {!showAll && projects.length > 5 && (
          <button
            className="gx-btn gx-btn-ghost gx-only-mobile"
            type="button"
            onClick={reveal}
          >
            Ver os {projects.length} projetos
          </button>
        )}
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
