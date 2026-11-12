import type { CSSProperties, ReactElement } from "react";
import styles from "../styles/executive.module.css";

export type ShapeKind =
  | "circle"
  | "half"
  | "quarter"
  | "tri"
  | "square"
  | "diamond"
  | "ring"
  | "zig"
  | "plus"
  | "pill"
  | "arch"
  | "dots";

/** spin: full turn on hover. turn: quarter turn on hover (orientation).
 *  tint: colour shifts gradually on hover. hue: colour shifts with page scroll. */
export type ShapeFx = "spin" | "turn" | "tint" | "hue";

type Props = {
  k: ShapeKind;
  c: string;
  c2?: string;
  size: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  /** degrees of rotation per pixel scrolled (negative reverses) */
  r?: number;
  /** pixels of drift that follows the pointer */
  f?: number;
  fx?: ShapeFx[];
};

const PATHS: Record<ShapeKind, ReactElement> = {
  circle: <circle cx="50" cy="50" r="50" />,
  half: <path d="M0 75 A50 50 0 0 1 100 75 Z" />,
  quarter: <path d="M0 0 H100 A100 100 0 0 1 0 100 Z" />,
  tri: <polygon points="50,4 96,92 4,92" />,
  square: <rect x="6" y="6" width="88" height="88" />,
  diamond: <polygon points="50,0 100,50 50,100 0,50" />,
  ring: <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="18" />,
  zig: (
    <polyline
      points="4,70 22,30 40,70 58,30 76,70 94,30"
      fill="none"
      stroke="currentColor"
      strokeWidth="11"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
  ),
  plus: <path d="M37 0h26v37h37v26H63v37H37V63H0V37h37z" />,
  pill: <rect x="0" y="30" width="100" height="40" rx="20" />,
  arch: <path d="M8 100 V50 A42 42 0 0 1 92 50 V100 H68 V50 A18 18 0 0 0 32 50 V100 Z" />,
  dots: (
    <g>
      {[16, 50, 84].flatMap((y) =>
        [16, 50, 84].map((x) => <circle key={`${x}-${y}`} cx={x} cy={y} r="11" />),
      )}
    </g>
  ),
};

export default function Shape({ k, c, c2, size, top, left, right, bottom, r = 0, f = 0, fx = [] }: Props) {
  const style = {
    top,
    left,
    right,
    bottom,
    width: size,
    height: size,
    "--a": c,
    "--b": c2 ?? c,
    "--r": r,
    "--f": f,
  } as CSSProperties;

  const cls = [styles.shape, ...fx.map((x) => styles[`fx_${x}`])].join(" ");

  return (
    <span className={cls} style={style} data-shape="" aria-hidden="true">
      <svg viewBox="0 0 100 100" fill="currentColor">
        {PATHS[k]}
      </svg>
    </span>
  );
}
