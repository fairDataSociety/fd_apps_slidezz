export const LogoPositions: Record<
  "top-left" | "top-right" | "bottom-left" | "bottom-right",
  {
    top?: number;
    bottom?: number;
    left?: number;
    right?: number;
  }
> = {
  "top-left": {
    top: -2,
    left: 2,
  },
  "top-right": {
    top: -2,
    right: 2,
  },
  "bottom-left": {
    bottom: -2,
    left: 2,
  },
  "bottom-right": {
    bottom: -2,
    right: 2,
  },
};
