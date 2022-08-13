import { slideThemes } from "./config/slide-themes";
import type { Data } from "@ethersphere/bee-js";

export interface SlideShowSettings {
  controls: boolean;
  progress: boolean;
  history: boolean;
  center: boolean;
  loop: boolean;
  slideNumber: boolean;
  controlsLayout: "edges" | "bottom-right";
  controlsBackArrows: "faded" | "hidden" | "visible";
  slidesLogoPosition: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

export interface StyleSettings {
  theme: keyof typeof slideThemes;
}

export interface File {
  name: string;
  data: Data;
}