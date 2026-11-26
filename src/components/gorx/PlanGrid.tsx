"use client";
import { useEffect, useRef, useState } from "react";
import { Check } from "lucide-react";
import type { Plan } from "@/data/content";

const NARROW = "(max-width: 960px)";

const formatPrice = (value: number) => value.toLocaleString("pt-BR");

/**
 * Three cards in a row on wide screens. On narrow ones the row becomes a swipe
 * carousel that opens on the recommended plan, with dots that follow the swipe.
 */
export default function PlanGrid({ plans }: { plans: Plan[] }) {
  const grid = useRef<HTMLDivElement>(null);
  const start = Math.max(
    0,
    plans.findIndex((plan) => plan.recommended),
  );
  const [active, setActive] = useState(start);

  useEffect(() => {
    const element = grid.current;
    if (!element) return;
    const cards = Array.from(element.children) as HTMLElement[];
    const narrow = window.matchMedia(NARROW);

    const centre = () => {
      const card = cards[start];
      if (!narrow.matches || !card) return;
      element.scrollLeft =
        card.offsetLeft - (element.clientWidth - card.offsetWidth) / 2;
    };
    const onScroll = () => {
      const middle = element.scrollLeft + element.clientWidth / 2;
      let nearest = 0;
      let gap = Infinity;
      cards.forEach((card, index) => {
        const distance = Math.abs(
          card.offsetLeft + card.offsetWidth / 2 - middle,
        );
        if (distance < gap) {
          gap = distance;
          nearest = index;
        }
      });
      setActive(nearest);
    };

    // The row's width is not final when this first runs (styles and fonts can
    // land after hydration), so keep re-centring on every resize until the
    // visitor takes over the carousel.
    let touched = false;
    const onTouch = () => {
      touched = true;
    };
    const sizes = new ResizeObserver(() => {
      if (!touched) centre();
    });

    centre();
    sizes.observe(element);
    element.addEventListener("scroll", onScroll, { passive: true });
    element.addEventListener("pointerdown", onTouch, { passive: true });
    element.addEventListener("wheel", onTouch, { passive: true });
    narrow.addEventListener("change", centre);
    return () => {
      sizes.disconnect();
      element.removeEventListener("scroll", onScroll);
      element.removeEventListener("pointerdown", onTouch);
      element.removeEventListener("wheel", onTouch);
      narrow.removeEventListener("change", centre);
    };
  }, [start]);

  return (
    <>
      <div className="gx-plan-grid" ref={grid}>
        {plans.map((plan) => (
          <article
            className={`gx-plan${plan.recommended ? " gx-rec" : ""}`}
            key={plan.id}
            data-plan
          >
            <div className="gx-plan-in">
              <div className="gx-plan-top">
                <h3 className="gx-plan-name">{plan.name}</h3>
                {plan.recommended && <span className="gx-chip">Recomendado</span>}
              </div>
              <p className="gx-plan-for">{plan.audience}</p>
              <div className="gx-plan-price">
                <span>R$</span>
                <b data-count={plan.price}>{formatPrice(plan.price)}</b>
                <span>/mês</span>
              </div>
              <ul className="gx-plan-list">
                {plan.features.map((feature) => (
                  <li
                    key={feature.label}
                    className={feature.highlight ? "gx-head" : undefined}
                  >
                    <Check size={18} aria-hidden="true" />
                    {feature.label}
                  </li>
                ))}
              </ul>
              <a
                href="#contato"
                className={`gx-btn${plan.recommended ? "" : " gx-btn-ghost"}`}
                data-magnet={plan.recommended ? "" : undefined}
              >
                Quero o {plan.name}
              </a>
            </div>
          </article>
        ))}
      </div>
      <div className="gx-plan-dots" aria-hidden="true">
        {plans.map((plan, index) => (
          <i key={plan.id} className={index === active ? "gx-on" : undefined} />
        ))}
      </div>
    </>
  );
}
