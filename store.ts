import { atomWithStorage } from "jotai/utils";

export const controlsLayoutOptions = ["bottom-right", "edges"] as const;

export interface SlideShowSettings {
  controls: boolean;
  progress: boolean;
  history: boolean;
  center: boolean;
  loop: boolean;
  controlsLayout: typeof controlsLayoutOptions[number];
}

const initialSettings: SlideShowSettings = {
  controls: true,
  progress: true,
  history: true,
  center: true,
  loop: true,
  controlsLayout: "bottom-right",
};

export const slideShowSettingsAtom = atomWithStorage(
  "slideShowSettings",
  initialSettings
);

export const themes = {
  white: {
    bg: "#fff",
    mainColor: "#222",
    linkColor: "#2a76dd",
  },
  black: {
    bg: "#191919",
    mainColor: "#fff",
    linkColor: "#42affa",
  },
  beige: {
    bg: "#f7f3de",
    mainColor: "#333",
    linkColor: "#8b743d",
  },
  league: {
    bg: "#2b2b2b",
    mainColor: "#eee",
    linkColor: "#13DAEC",
  },
  moon: {
    bg: "#002b36",
    mainColor: "#93a1a1",
    linkColor: "#268bd2",
  },
  night: {
    bg: "#111",
    mainColor: "#eee",
    linkColor: "#e7ad52",
  },
  serif: {
    bg: "#F0F1EB",
    mainColor: "#000",
    linkColor: "#51483D",
  },
  simple: {
    bg: "#fff",
    mainColor: "#000",
    linkColor: "#00008B",
  },
  sky: {
    bg: "#f7fbfc",
    mainColor: "#333",
    linkColor: "#3b759e",
  },
  solarized: {
    bg: "#fdf6e3",
    mainColor: "#657b83",
    linkColor: "#268bd2",
  },
  blood: {
    bg: "#222",
    mainColor: "#eee",
    linkColor: "#a23",
  },
  latte: {
    bg: "#eff1f5",
    mainColor: "#4c4f69",
    linkColor: "#dc8a78",
  },
  // frappe: {
  //   bg: "#303446",
  //   mainColor: "#c6d0f5",
  //   linkColor: "#f2d5cf",
  // },
  macchiato: {
    bg: "#24273a",
    mainColor: "#cad3f5",
    linkColor: "#f4dbd6",
  },
  // mocha: {
  //   bg: "#1e1e2e",
  //   mainColor: "#cdd6f4",
  //   linkColor: "#f5e0dc",
  // },
};

export interface StyleSettings {
  theme: keyof typeof themes;
}

const initialStyles: StyleSettings = {
  theme: "white",
};

export const styleSettingsAtom = atomWithStorage(
  "styleSettings",
  initialStyles
);
