import type { ReactNode } from "react";
import Image from "next/image";
import { ArrowDown, ArrowUpRight, Plus } from "lucide-react";
import { Header } from "@/components/header";
import BackToTop from "@/components/BackToTop";
import RockHero from "@/components/sections/RockHero";
import PortfolioMotion from "@/components/PortfolioMotion";
import StackMarquee from "@/components/sections/StackMarquee";
import HowItWorks from "@/components/sections/HowItWorks";
import { brand, projects, stats, skills, processSteps, social } from "@/data/content";

const socialIcons: Record<string, ReactNode> = {
  LinkedIn: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  ),
  GitHub: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  ),
};

const DISPLAY_ORDER = [
  "lavoro",
  "ideal",
  "dens",
  "fortnari",
  "atende",
  "integrador",
  "mailer",
  "prospect",
  "younus",
];
const orderedProjects = DISPLAY_ORDER.map(
  (id) => projects.find((project) => project.id === id)!,
);

const STATEMENT_WORDS = [
  "ESTRATÉGIA",
  "DESIGN",
  "CÓDIGO",
  "EXPERIÊNCIA",
  "PERFORMANCE",
  "DETALHE",
  "IMPACTO",
  "ENTREGA",
];

export default function Portfolio() {
  return (
    <>
      <Header />
      <main id="main-content">
        <RockHero>
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">
              <span className="availability-dot" /> Disponível para novos
              projetos.
            </p>
            <h1>
              <span className="hero-line">
                <span className="hero-lead">
                  Transformo <br className="mobile-break" />
                  ideias em
                </span>
              </span>
              <span className="hero-line">
                <span className="hero-serif">experiências</span>
              </span>
              <span className="hero-line">
                <span className="hero-last-line">
                  digitais<span className="lime">.</span>
                  <span className="hero-asterisk" aria-hidden="true">
                    ✳
                  </span>
                </span>
              </span>
            </h1>
            <div className="hero-intro">
              <p>
                Design com intenção. Código com propósito.
                <br />
                Desenvolvimento frontend & fullstack por Gabriel Gonzales.
              </p>
              <div className="hero-actions">
                <a href="#projetos" className="button button-primary">
                  Ver projetos <ArrowDown size={17} />
                </a>
                <a href="#contato" className="text-link">
                  Vamos conversar <ArrowUpRight size={17} />
                </a>
              </div>
            </div>
          </div>
          <div className="hero-bottom">
            <a href="#projetos" className="scroll-cue">
              <span>Explore no scroll</span>
              <svg
                width="15"
                height="24"
                viewBox="0 0 15 24"
                fill="none"
                aria-hidden="true"
              >
                <rect
                  x="1"
                  y="1"
                  width="13"
                  height="22"
                  rx="6.5"
                  stroke="currentColor"
                  strokeWidth="1.4"
                />
                <circle
                  className="mouse-scroll-dot"
                  cx="7.5"
                  cy="7"
                  r="1.5"
                  fill="currentColor"
                />
              </svg>
            </a>
            <span className="eyebrow hero-edition">Portfolio — 2026</span>
          </div>
        </RockHero>
        <PortfolioMotion>
          <section id="projetos" className="section projects-section">
            <div className="section-top">
              <p className="eyebrow">
                <span className="section-dot" /> 01 / Trabalhos selecionados
              </p>
              <span className="eyebrow muted">
                Design. Desenvolvimento. Resultado.
              </span>
            </div>
            <div className="section-heading" data-reveal>
              <h2>
                Ideias que
                <br />
                ganharam <span className="serif-word">forma.</span>
              </h2>
              <p>
                Do primeiro conceito à última linha de código.
                <br />
                Uma seleção do que venho construindo.
              </p>
            </div>
            <div className="projects-grid">
              {orderedProjects.map((project, index) => {
                const external = /^https?:\/\//.test(project.url);
                const content = (
                  <>
                    <div className="project-image">
                      <Image
                        src={project.image}
                        alt={`Projeto ${project.name}`}
                        fill
                        sizes="(max-width: 700px) 92vw, 46vw"
                      />
                      <span className="project-number">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {external && (
                        <span className="project-open" aria-hidden="true">
                          <ArrowUpRight size={23} />
                        </span>
                      )}
                    </div>
                    <div className="project-caption">
                      <h3>{project.name}</h3>
                      <span className="eyebrow">{project.category}</span>
                    </div>
                    <p className="project-description">{project.description}</p>
                  </>
                );
                return (
                  <article
                    className={`project-card ${index < 2 ? "project-featured" : ""}`}
                    key={project.id}
                    data-reveal
                  >
                    {external ? (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visitar ${project.name} (abre em nova aba)`}
                      >
                        {content}
                      </a>
                    ) : (
                      content
                    )}
                  </article>
                );
              })}
            </div>
            <div className="projects-end">
              <span className="eyebrow">
                Cada projeto, um novo ponto de partida.
              </span>
              <a href="#contato" className="text-link">
                O próximo pode ser o seu <ArrowUpRight size={18} />
              </a>
            </div>
          </section>
          <div className="statement-strip" aria-hidden="true">
            <div className="statement-track">
              {[0, 1].map((copy) => (
                <div
                  className="statement-group"
                  key={copy}
                  aria-hidden={copy === 1 ? true : undefined}
                >
                  {STATEMENT_WORDS.map((word) => (
                    <span key={word}>{word}</span>
                  )).reduce<ReactNode[]>((acc, span, i) => {
                    if (i > 0) acc.push(<span key={`dot-${i}`}>✳</span>);
                    acc.push(span);
                    return acc;
                  }, [] as ReactNode[])}
                </div>
              ))}
            </div>
          </div>
          <section id="sobre" className="section about-section">
            <div className="section-top">
              <p className="eyebrow">
                <span className="section-dot" /> 02 / Por trás do código
              </p>
              <span className="eyebrow muted">Gabriel Gonzales — Gorx</span>
            </div>
            <div className="about-grid">
              <div className="about-portrait" data-reveal>
                <Image
                  src="/images/about-photo.png"
                  alt="Gabriel Gonzales, desenvolvedor da Gorx"
                  fill
                  sizes="(max-width: 700px) 90vw, 36vw"
                />
                <span className="portrait-tag eyebrow">
                  Criatividade encontra engenharia.
                </span>
              </div>
              <div className="about-copy" data-reveal>
                <p className="eyebrow lime">Muito além da interface</p>
                <h2>
                  Bom design
                  <br />
                  merece um
                  <br />
                  <span className="serif-word">bom código.</span>
                </h2>
                <p>
                  Sou Gabriel, desenvolvedor frontend & fullstack. Conecto
                  design e tecnologia para criar experiências que fazem sentido
                  — para quem usa e para quem constrói.
                </p>
                <p>
                  Da primeira ideia ao deploy, cuido dos detalhes: uma interação
                  fluida, uma interface acessível e uma base sólida para
                  crescer.
                </p>
                <a className="text-link" href="#contato">
                  Vamos construir juntos <ArrowUpRight size={18} />
                </a>
              </div>
            </div>
            <div className="stats-row">
              {stats.map((stat) => (
                <div key={stat.label} data-reveal>
                  <strong>{stat.value}</strong>
                  <span className="eyebrow">{stat.label}</span>
                </div>
              ))}
            </div>
          </section>
          <HowItWorks />
          <section id="habilidades" className="section skills-section">
            <div className="section-top">
              <p className="eyebrow">
                <span className="section-dot" /> 04 / O que eu faço
              </p>
              <span className="eyebrow muted">Da visão à versão final</span>
            </div>
            <div className="section-heading" data-reveal>
              <h2>
                Visão criativa.
                <br />
                <span className="serif-word">Execução técnica.</span>
              </h2>
              <p>
                As ferramentas certas para tirar
                <br />o seu próximo projeto do papel.
              </p>
            </div>
            <div className="services-list">
              {skills.map((skill) => (
                <div className="service-row" key={skill.n} data-reveal>
                  <span className="eyebrow lime">/{skill.n}</span>
                  <h3>{skill.title}</h3>
                  <p>{skill.subtitle}</p>
                  <Plus size={24} aria-hidden="true" />
                </div>
              ))}
            </div>
            <StackMarquee />
          </section>
          <section id="processo" className="section process-section">
            <div className="section-top">
              <p className="eyebrow">
                <span className="section-dot" /> 05 / Como acontece
              </p>
              <span className="eyebrow muted">Clareza em cada etapa</span>
            </div>
            <div className="section-heading" data-reveal>
              <h2>
                Uma boa parceria.
                <br />
                <span className="serif-word">Um processo claro.</span>
              </h2>
            </div>
            <div className="process-grid">
              {processSteps.map((step) => (
                <article className="process-card" key={step.n} data-process>
                  <div className="process-line" />
                  <span className="process-number">{step.n}</span>
                  <p className="eyebrow lime">{step.label}</p>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                </article>
              ))}
            </div>
          </section>
          <section id="contato" className="section contact-section">
            <div className="section-top">
              <p className="eyebrow">
                <span className="availability-dot" /> Disponível para novas
                ideias
              </p>
              <span className="eyebrow muted">06 / Vamos conversar</span>
            </div>
            <a
              className="contact-title"
              href={`mailto:${brand.email}`}
              data-reveal
            >
              <span>
                Vamos criar
                <br />
                algo <span className="serif-word">marcante?</span>
              </span>
              <ArrowUpRight aria-hidden="true" />
            </a>
            <div className="contact-bottom">
              <p>
                Tem uma ideia, um desafio ou um projeto em mente?
                <br />
                Me conta. O primeiro passo é uma conversa.
              </p>
              <a href={`mailto:${brand.email}`} className="email-link">
                {brand.email} <ArrowUpRight size={20} />
              </a>
            </div>
          </section>
          <footer className="footer">
            <a href="#hero" aria-label="Gorx — voltar ao início">
              <Image src="/svg/logo.svg" alt="Gorx" width={110} height={31} />
            </a>
            <p className="eyebrow muted">© 2026 Gorx. Feito com intenção.</p>
            <nav className="footer-social" aria-label="Redes sociais">
              {social.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                >
                  {socialIcons[item.label]}
                </a>
              ))}
            </nav>
          </footer>
        </PortfolioMotion>
      </main>
      <BackToTop />
    </>
  );
}
