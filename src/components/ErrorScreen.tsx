"use client";

import Link from "next/link";
import type { ErrorCode } from "@/data/error-pages";
import { ERROR_PAGES } from "@/data/error-pages";

const SYMBOL_POINTS =
  "1069.77 836.36 835.92 836.36 835.92 836.54 747.33 886.1 656.76 829.01 656.78 658.2 1246.45 658.2 1246.45 1055.51 758.53 1337.5 266.68 1054.83 266.68 471.28 756.6 185.44 1242.33 469.23 1070.72 573.05 756.6 390.59 443.34 572.55 443.34 949.88 758.46 1132.68 1070.72 946.02 1070.55 836.35 1069.77 836.36";

type Props = {
  code: ErrorCode;
  onRetry?: () => void;
};

export default function ErrorScreen({ code, onRetry }: Props) {
  const copy = ERROR_PAGES[code];

  const retry = () => {
    if (onRetry) {
      onRetry();
      return;
    }
    window.location.reload();
  };

  return (
    <main data-error-screen className="error-screen">
      <span className="error-screen__edge error-screen__edge--tl">GORX</span>
      <span className="error-screen__edge error-screen__edge--tr">
        {copy.hint}
      </span>
      <span className="error-screen__edge error-screen__edge--bl">
        {copy.eyebrow}
      </span>
      <span className="error-screen__edge error-screen__edge--br">
        DESIGN × CÓDIGO
      </span>

      <p className="error-screen__code" aria-hidden="true">
        {code}
      </p>

      <div className="error-screen__body">
        <svg
          className="error-screen__mark"
          viewBox="0 0 1513.14 1513.14"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <polygon
            points={SYMBOL_POINTS}
            fill="#0d0d0d"
            stroke="#0d0d0d"
            strokeWidth="6"
            strokeLinejoin="round"
          />
        </svg>

        <p className="error-screen__eyebrow">{copy.eyebrow}</p>
        <h1 className="error-screen__title">{copy.title}</h1>
        <p className="error-screen__desc">{copy.description}</p>

        <div className="error-screen__actions">
          {copy.retry ? (
            <button type="button" className="error-screen__btn" onClick={retry}>
              {copy.retry}
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                aria-hidden="true"
              >
                <path d="M21 12a9 9 0 1 1-3-6.7" />
                <path d="M21 3v6h-6" />
              </svg>
            </button>
          ) : null}
          <Link
            href="/"
            className={
              copy.retry
                ? "error-screen__btn error-screen__btn--ghost"
                : "error-screen__btn"
            }
            onClick={(event) => {
              event.preventDefault();
              window.location.assign("/");
            }}
          >
            {copy.home}
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </main>
  );
}
