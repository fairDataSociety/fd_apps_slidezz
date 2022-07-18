import { atomWithStorage } from "jotai/utils";

export interface presentationSettings {
  controls: boolean;
  progress: boolean;
  history: boolean;
  center: boolean;
  loop: boolean;
  //   controlsLayout?: "bottom-right" | "edges";
}

const initialSettings: presentationSettings = {
  controls: true,
  progress: true,
  history: true,
  center: true,
  loop: true,
};

export const presentationSettingsAtom = atomWithStorage(
  "presentationSettings",
  initialSettings
);

export const themes = {
  white: "white",
  black: "black",
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
