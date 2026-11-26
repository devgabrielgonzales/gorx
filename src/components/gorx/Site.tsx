import Image from "next/image";
import { ArrowDown, ArrowUpRight, Check } from "lucide-react";
import {
  brand,
  plans,
  plansAreExamples,
  processSteps,
  projectOrder,
  projects,
  services,
  stats,
} from "@/data/content";
import CopyEmail from "./CopyEmail";
import HeroBackground from "./HeroBackground";
import HeroGuides from "./HeroGuides";
import HeroVideo from "./HeroVideo";
import PlanGrid from "./PlanGrid";
import ProjectGallery from "./ProjectGallery";
import SiteHeader from "./SiteHeader";
import SiteMotion from "./SiteMotion";
import { GorxMark } from "./marks";

const orderedProjects = projectOrder
  .map((id) => projects.find((project) => project.id === id))
  .filter((project) => project !== undefined);

const MARQUEE_WORDS = [
  "ESTRATÉGIA",
  "DESIGN",
  "CÓDIGO",
  "CONTEÚDO",
  "PERFORMANCE",
  "TRÁFEGO",
  "ENTREGA",
];

/** Splits "+30" or "12+" into the number that counts up and what sits around it. */
function statParts(value: string) {
  const match = value.match(/\d+/);
  if (!match) return null;
  return {
    count: match[0],
    prefix: value.slice(0, match.index),
    suffix: value.slice((match.index ?? 0) + match[0].length),
  };
}

export default function Site() {
  return (
    <SiteMotion>
      <div className="gx-progress" aria-hidden="true" />
      <SiteHeader />

      <main id="main-content">
        <section className="gx-hero" id="hero">
          <div className="gx-hero-bg" aria-hidden="true">
            <HeroBackground />
            <HeroGuides />
            <div className="gx-hero-scrim" />
          </div>

          <div className="gx-wrap gx-hero-grid">
            <div className="gx-hero-copy">
              <p className="gx-eyebrow" data-hero-in>
                <span className="gx-dot" />
                Disponível para novos projetos
              </p>
              <h1 data-split>
                <span className="gx-line">Design com intenção.</span>
                <span className="gx-line">
                  Código com <span className="gx-lime">propósito.</span>
                </span>
              </h1>
              <p className="gx-hero-lede" data-hero-in>
                Sites, sistemas e conteúdo para redes sociais.{" "}
                <strong>Do design ao código</strong>, tudo feito para a sua marca
                aparecer, carregar rápido e vender.
              </p>
              <div className="gx-hero-actions" data-hero-in>
                <a href="#planos" className="gx-btn" data-magnet>
                  Ver planos
                </a>
                <a href="#projetos" className="gx-link-arrow">
                  Veja o que já foi criado <ArrowDown size={18} aria-hidden="true" />
                </a>
                <a href="#projetos" className="gx-btn gx-btn-ghost gx-only-mobile">
                  Projetos
                </a>
              </div>
              <ul className="gx-hero-checks" data-hero-in>
                <li>
                  <Check size={16} aria-hidden="true" />
                  <span>
                    <strong>+30</strong> projetos entregues
                  </span>
                </li>
                <li>
                  <Check size={16} aria-hidden="true" />
                  <span>
                    <strong>5+ anos</strong> programando
                  </span>
                </li>
                <li>
                  <Check size={16} aria-hidden="true" />
                  <span>Design, código e conteúdo no mesmo lugar</span>
                </li>
              </ul>
            </div>

            <HeroVideo />
          </div>
        </section>

        <div className="gx-marquee" aria-hidden="true">
          <div className="gx-marquee-track">
            {[0, 1].map((copy) => (
              <div className="gx-marquee-group" key={copy}>
                {MARQUEE_WORDS.flatMap((word) => [
                  <span key={word}>{word}</span>,
                  <i key={`${word}-star`}>✳</i>,
                ])}
              </div>
            ))}
          </div>
        </div>

        <section className="gx-projects" id="projetos">
          <div className="gx-h-pin">
            <div className="gx-wrap gx-section-head">
              <div>
                <p className="gx-eyebrow">
                  <span className="gx-dot" />
                  Trabalhos selecionados
                </p>
                <h2 data-split>
                  Ideias que ganharam <span className="gx-lime">forma.</span>
                </h2>
              </div>
              <p data-reveal>
                Do primeiro conceito à última linha de código. Uma seleção do que
                a Gorx vem construindo.
              </p>
            </div>
            <ProjectGallery projects={orderedProjects} />
          </div>
        </section>

        <section className="gx-section gx-services" id="servicos">
          <div className="gx-wrap">
            <div className="gx-section-head">
              <div>
                <p className="gx-eyebrow">
                  <span className="gx-dot" />O que a Gorx faz
                </p>
                <h2 data-split>
                  Visão criativa.{" "}
                  <span className="gx-lime">Execução técnica.</span>
                </h2>
              </div>
              <p data-reveal>
                As ferramentas certas para tirar o seu próximo projeto do papel e
                manter a sua marca ativa depois do lançamento.
              </p>
            </div>
            <div className="gx-svc-list">
              {services.map((service) => (
                <a
                  className="gx-svc"
                  href={service.href}
                  key={service.title}
                  data-row
                >
                  <h3>
                    {service.title}
                    {service.isNew && <span className="gx-chip">Novo</span>}
                  </h3>
                  <p>{service.summary}</p>
                  <ArrowUpRight size={28} aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </section>

        <section className="gx-section" id="sobre">
          <div className="gx-wrap">
            <div className="gx-about-grid">
              <div className="gx-about-photo">
                <div className="gx-about-pic">
                  <Image
                    src="/images/about-photo.webp"
                    alt="Gabriel Gonzales, desenvolvedor da Gorx"
                    fill
                    sizes="(max-width: 760px) 92vw, 40vw"
                  />
                </div>
              </div>
              <div className="gx-about-copy">
                <p className="gx-eyebrow">
                  <span className="gx-dot" />
                  Por trás do código
                </p>
                <h2 className="gx-big-h" data-split>
                  Bom design merece um{" "}
                  <span className="gx-lime">bom código.</span>
                </h2>
                <p data-reveal>
                  Sou Gabriel, desenvolvedor frontend &amp; fullstack. Conecto
                  design e tecnologia para criar experiências que fazem sentido
                  para quem usa e para quem constrói.
                </p>
                <p data-reveal>
                  Da primeira ideia ao deploy, cuido dos detalhes: uma interação
                  fluida, uma interface acessível e uma base sólida para crescer.
                </p>
                <a className="gx-link-arrow" href="#contato" data-reveal>
                  Vamos construir juntos{" "}
                  <ArrowUpRight size={18} aria-hidden="true" />
                </a>
              </div>
            </div>
            <div className="gx-stats">
              {stats.map((stat) => {
                const parts = statParts(stat.value);
                return (
                  <div key={stat.label} data-reveal>
                    <strong
                      data-count={parts?.count}
                      data-prefix={parts?.prefix || undefined}
                      data-suffix={parts?.suffix || undefined}
                    >
                      {stat.value}
                    </strong>
                    <span className="gx-eyebrow">{stat.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="gx-section gx-process" id="processo">
          <div className="gx-wrap gx-proc-grid">
            <div className="gx-proc-intro">
              <p className="gx-eyebrow">
                <span className="gx-dot" />
                Como acontece
              </p>
              <h2 className="gx-big-h" data-split>
                Uma boa parceria.{" "}
                <span className="gx-lime">Um processo claro.</span>
              </h2>
              <p data-reveal>
                Três etapas, com entregas visíveis em cada uma. Você acompanha o
                progresso do começo ao fim.
              </p>
            </div>
            <div className="gx-proc-steps">
              <div className="gx-proc-line" aria-hidden="true">
                <i />
              </div>
              {processSteps.map((step) => (
                <article className="gx-proc-step" key={step.n}>
                  <span className="gx-proc-num">
                    {step.n} · {step.label}
                  </span>
                  <h3>{step.title}</h3>
                  <p>{step.body}</p>
                  <p className="gx-proc-out">
                    {step.output.replace(/^Output:/, "Entrega:")}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="gx-section gx-plans" id="planos">
          <div className="gx-wrap">
            <div className="gx-section-head">
              <div>
                <p className="gx-eyebrow">
                  <span className="gx-dot" />
                  Planos de social media
                </p>
                <h2 data-split>
                  Um plano para cada{" "}
                  <span className="gx-lime">fase da marca.</span>
                </h2>
              </div>
              <div>
                <p data-reveal>
                  Conteúdo toda semana no Instagram e no Facebook. Você escolhe o
                  ritmo, a Gorx cuida do resto.
                </p>
                {plansAreExamples && (
                  <span className="gx-plans-note">
                    Valores e itens de exemplo, a definir
                  </span>
                )}
              </div>
            </div>
            <PlanGrid plans={plans} />
          </div>
        </section>

        <section className="gx-section gx-contact" id="contato">
          <GorxMark className="gx-contact-mark" />
          <div className="gx-wrap gx-contact-in">
            <p className="gx-eyebrow">
              <span className="gx-dot" />
              Disponível para novas ideias
            </p>
            <h2 data-split>
              Vamos criar algo <span className="gx-lime">marcante?</span>
            </h2>
            <p data-reveal>
              Tem uma ideia, um desafio ou um projeto em mente? Me conta. O
              primeiro passo é uma conversa.
            </p>
            <CopyEmail email={brand.email} />
          </div>
        </section>
      </main>

      <footer className="gx-footer">
        <div className="gx-wrap gx-footer-in">
          <a href="#hero" className="gx-logo" aria-label="Gorx, voltar ao início">
            <Image src="/svg/logo.svg" alt="Gorx" width={88} height={24} />
          </a>
          <p className="gx-eyebrow">© 2026 Gorx. Feito com intenção.</p>
        </div>
      </footer>
    </SiteMotion>
  );
}
