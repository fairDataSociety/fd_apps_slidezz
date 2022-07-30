import { atomWithStorage } from "jotai/utils";
import { slideThemes } from "./slide-themes";

export interface SlideShowSettings {
  controls: boolean;
  progress: boolean;
  history: boolean;
  center: boolean;
  loop: boolean;
  slideNumber: boolean;
  controlsLayout: "edges" | "bottom-right";
  controlsBackArrows: "faded" | "hidden" | "visible";
}

const initialSettings: SlideShowSettings = {
  controls: true,
  progress: true,
  history: true,
  center: true,
  loop: true,
  slideNumber: false,
  controlsLayout: "bottom-right",
  controlsBackArrows: "faded",
};

export const slideShowSettingsAtom = atomWithStorage(
  "slideShowSettings",
  initialSettings
);

export interface StyleSettings {
  theme: keyof typeof slideThemes;
}

const initialStyles: StyleSettings = {
  theme: "white",
};

export const styleSettingsAtom = atomWithStorage(
  "styleSettings",
  initialStyles
);
