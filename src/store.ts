import { FdpStorage } from '@fairdatasociety/fdp-storage'
import { atom } from 'jotai'
import { atomWithStorage } from 'jotai/utils'
import { extname } from 'path'

import {
  File,
  SlideShowSettings,
  Slides,
  StyleSettings,
  User,
} from '../src/types'

// FDP instance

const fdp = !process.env.NEXT_PUBLIC_IS_FAIROS
  ? new FdpStorage(
      process.env.NEXT_PUBLIC_BEE_URL as string,
      //@ts-ignore
      process.env.NEXT_PUBLIC_BATCH_ID as string,
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
        ensDomain: 'fds',
      }
    )
  : undefined

export const fdpAtom = atom(fdp)

// Slide show settings

const initialSettings: SlideShowSettings = {
  controls: true,
  progress: true,
  history: true,
  loop: true,
  slideNumber: false,
  controlsLayout: 'bottom-right',
  controlsBackArrows: 'faded',
  slidesLogoPosition: 'top-left',
}

export const slideShowSettingsAtom = atomWithStorage(
  'slideShowSettings',
  initialSettings
)

// Style settings

const initialStyles: StyleSettings = {
  theme: 'white',
}

export const styleSettingsAtom = atomWithStorage('styleSettings', initialStyles)

// Slides

export const slidesAtom = atom<Slides | undefined>(undefined)

// Slides deck

export const slidesDeckAtom = atom<any>(undefined)

// Slides logo

export const slidesLogoAtom = atom<{ data: string } | undefined>(undefined)

// Media

export const mediaAtom = atom<File[]>([])

export const imageMediaAtom = atom<File[]>((get) =>
  get(mediaAtom).filter((file) =>
    ['jpg', 'jpeg', 'gif', 'png', 'svg'].includes(extname(file.name).slice(1))
  )
)

export const videoMediaAtom = atom<File[]>((get) =>
  get(mediaAtom).filter((file) =>
    ['mp4', 'webm', 'ogg'].includes(extname(file.name).slice(1))
  )
)

// Moveable target

export const moveableTargetAtom = atom<HTMLElement | undefined>(undefined)

// Edit mode

export const editModeAtom = atom<'MOVE' | 'TEXT'>('MOVE')

// Replace image

export const replaceImageElementAtom = atom<HTMLImageElement | undefined>(
  undefined
)

// User

export const userAtom = atom<User | undefined>(undefined)

// Google Access token

export const googleAccessTokenAtom = atom('')
