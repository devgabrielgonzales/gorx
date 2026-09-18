import Image from "next/image";
import { ArrowDown, ArrowUpRight, ArrowUp, Plus } from "lucide-react";
import Header from "@/components/layout/Header";
import RockHero from "@/components/sections/RockHero";
import PortfolioMotion from "@/components/PortfolioMotion";
import StackMarquee from "@/components/sections/StackMarquee";
import HowItWorks from "@/components/sections/HowItWorks";
import { brand, projects, stats, skills, processSteps } from "@/data/content";

const DISPLAY_ORDER = [
  "lavoro",
  "ideal",
  "atende",
  "dens",
  "integrador",
  "fortnari",
  "mailer",
  "prospect",
  "younus",
];
const orderedProjects = DISPLAY_ORDER.map(
  (id) => projects.find((project) => project.id === id)!,
);

export default function Portfolio() {
  return (
    <>
      <Header />
      <main id="main-content">
        <RockHero>
          <div className="hero-copy">
            <p className="eyebrow hero-eyebrow">
              <span className="availability-dot" /> Independente por escolha.
              Criativo por natureza.
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
            <span className="eyebrow">
              São Paulo, Brasil <span className="muted">/</span> Disponível para
              projetos
            </span>
            <a href="#projetos" className="scroll-cue">
              <span>Explore no scroll</span>
              <ArrowDown size={15} />
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
            <span>ESTRATÉGIA</span>
            <span>✳</span>
            <span>DESIGN</span>
            <span>✳</span>
            <span>CÓDIGO</span>
            <span>✳</span>
            <span>EXPERIÊNCIA</span>
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
            <a className="back-top eyebrow" href="#hero">
              Voltar ao topo <ArrowUp size={16} />
            </a>
          </footer>
        </PortfolioMotion>
      </main>
    </>
  );
}
