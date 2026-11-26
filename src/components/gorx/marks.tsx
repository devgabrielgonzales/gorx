const GLYPH_POINTS =
  "462.69 361.74 361.55 361.74 361.55 361.82 323.23 383.25 284.06 358.56 284.07 284.68 539.11 284.68 539.11 456.52 328.08 578.49 115.35 456.23 115.35 203.84 327.24 80.21 537.33 202.95 463.11 247.85 327.24 168.94 191.75 247.64 191.75 410.84 328.05 489.9 463.11 409.17 463.03 361.73 462.69 361.74";

/** The hexagonal G on its own, drawn in the current text colour. */
export function GorxGlyph({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 654.46 654.46" aria-hidden="true">
      <polygon fill="currentColor" points={GLYPH_POINTS} />
    </svg>
  );
}

/** The full symbol: the G on its lime square. */
export function GorxMark({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 654.46 654.46" aria-hidden="true">
      <rect width="654.46" height="654.46" fill="#bff549" />
      <polygon fill="#1f1f1f" points={GLYPH_POINTS} />
    </svg>
  );
}
