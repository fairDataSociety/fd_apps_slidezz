import { atomWithStorage } from "jotai/utils";
import { atom } from "jotai";
import { FdpStorage } from "@fairdatasociety/fdp-storage";
import { SlideShowSettings, StyleSettings } from "./types";

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
      rpcUrl: "http://localhost:8545",
      contractAddresses: {
        fdsRegistrar: "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512",
        ensRegistry: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
        publicResolver: "0xDc64a140Aa3E981100a9becA4E685f962f0cF6C9",
      },
    },
    ensDomain: "fds",
  }
);

export const fdpAtom = atom(fdp);
