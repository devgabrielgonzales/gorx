import Image from "next/image";
import { ChevronLeft, ChevronRight, Square, UserRound } from "lucide-react";

const waveform = [2, 4, 3, 5, 2, 4, 3];
const attributes = [
  "Código limpo",
  "Bem documentado",
  "Performático",
  "Escalável",
];

export default function HowItWorks() {
  return (
    <section id="como-funciona" className="section brand-section">
      <div className="section-top">
        <p className="eyebrow">
          <span className="section-dot" /> 03 / Como trabalho
        </p>
        <span className="eyebrow muted">Do briefing ao deploy</span>
      </div>
      <div className="section-heading" data-reveal>
        <h2>
          Do conceito ao deploy
          <br />
          <span className="serif-word">sem enrolação.</span>
        </h2>
        <p>
          Uma ideia entra de um lado.
          <br />
          Código pronto para escalar sai do outro.
        </p>
      </div>

      <div className="brand-flow">
        <article className="brand-card" data-reveal>
          <div className="brand-card-top">
            <span className="brand-avatar" aria-hidden="true">
              <UserRound size={15} />
            </span>
            <span className="brand-who">
              <strong>Você</strong>
              <span className="eyebrow muted">Colaborador</span>
            </span>
            <span className="brand-wave" aria-hidden="true">
              {waveform.map((bar, index) => (
                <i key={index} style={{ height: `${bar * 4}px` }} />
              ))}
            </span>
          </div>
          <p className="brand-quote">
            &ldquo;Preciso de uma aplicação responsiva, com boa performance e
            código organizado que eu consiga evoluir depois.&rdquo;
          </p>
          <p className="eyebrow muted brand-tag">Input / Ideia</p>
        </article>

        <div className="brand-symbol" data-reveal>
          <Image src="/svg/simbolo.svg" alt="Gorx" width={96} height={96} />
        </div>

        <article className="brand-card" data-reveal>
          <div className="brand-card-top">
            <span className="brand-chevrons" aria-hidden="true">
              <ChevronLeft size={16} />
              <Square size={12} />
              <ChevronRight size={16} />
            </span>
          </div>
          <p className="eyebrow lime brand-delivers">Gorx entrega</p>
          <p className="brand-quote">
            &ldquo;Código limpo, componentizado, com testes, documentação e
            deploy configurado — pronto para escalar.&rdquo;
          </p>
          <p className="eyebrow muted brand-tag">Output / Código</p>
        </article>
      </div>

      <div className="brand-attributes" data-reveal>
        {attributes.map((attribute, index) => (
          <span className="eyebrow" key={attribute}>
            {attribute}
            {index < attributes.length - 1 && (
              <span className="brand-dot" aria-hidden="true" />
            )}
          </span>
        ))}
      </div>
    </section>
  );
}
