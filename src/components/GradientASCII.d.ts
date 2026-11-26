import type { CSSProperties, HTMLAttributes } from "react";

/**
 * Types for the React Bits GradientASCII component, which ships as plain JSX.
 * Every prop is optional there; see the props table at
 * https://reactbits.dev/backgrounds/gradient-ascii for what each one does.
 */
export type GradientASCIIProps = Omit<HTMLAttributes<HTMLDivElement>, "children"> & {
  colors?: string[];
  shape?: "horizon" | "pinch" | "rise" | "eclipse";
  characters?: string;
  cellSize?: number;
  density?: number;
  glyphOpacity?: number;
  gradientOpacity?: number;
  glow?: number;
  depthOfField?: number;
  flicker?: number;
  softness?: number;
  scale?: number;
  flow?: number;
  speed?: number;
  grain?: number;
  variation?: number;
  mouseInteraction?: boolean;
  scrambleRadius?: number;
  clickEffect?: "wave" | "burst" | "none";
  intro?: boolean;
  lightMode?: boolean;
  fontFamily?: string;
  dpr?: number;
  className?: string;
  style?: CSSProperties;
};

declare const GradientASCII: (props: GradientASCIIProps) => React.JSX.Element;
export default GradientASCII;
