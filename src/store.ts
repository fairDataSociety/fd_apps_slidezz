import { atomWithStorage } from "jotai/utils";
import { atom } from "jotai";
import { FdpStorage } from "@fairdatasociety/fdp-storage";
import { File, SlideShowSettings, StyleSettings } from "../src/types";
import type { Data } from "@ethersphere/bee-js";

const initialSettings: SlideShowSettings = {
  controls: true,
  progress: true,
  history: true,
  center: true,
  loop: true,
  slideNumber: false,
  controlsLayout: "bottom-right",
  controlsBackArrows: "faded",
  slidesLogoPosition: "top-left",
};

export const slideShowSettingsAtom = atomWithStorage(
  "slideShowSettings",
  initialSettings
);

const initialStyles: StyleSettings = {
  theme: "white",
};

export const styleSettingsAtom = atomWithStorage(
  "styleSettings",
  initialStyles
);

const fdp = new FdpStorage(
  process.env.NEXT_PUBLIC_BEE_URL as string,
  process.env.NEXT_PUBLIC_BEE_DEBUG_URL as string,
  {
    ensOptions: {
      performChecks: true,
      rpcUrl: process.env.NEXT_PUBLIC_RPC_URL as string,
      contractAddresses: {
        fdsRegistrar: process.env.NEXT_PUBLIC_FDS_REGISTRAR as string,
        ensRegistry: process.env.NEXT_PUBLIC_ENS_REGISTRY as string,
        publicResolver: process.env.NEXT_PUBLIC_PUBLIC_RESOLVER as string,
      },
    },
    ensDomain: "fds",
  }
);

export const fdpAtom = atom(fdp);

export const slidesAtom = atom<string | undefined>(undefined);

export const slidesLogoAtom = atom<Data | undefined>(undefined);

export const mediaAtom = atom<File[]>([]);
