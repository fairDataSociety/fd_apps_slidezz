import { atomWithStorage } from 'jotai/utils'
import { atom } from 'jotai'
import {
  File,
  LogoImageFile,
  Slides,
  SlideShowSettings,
  StyleSettings,
  User,
} from '../src/types'
import { extname } from 'path'

// Slide show settings

const initialSettings: SlideShowSettings = {
  controls: true,
  progress: true,
  history: true,
  center: true,
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

export const slidesLogoAtom = atom<LogoImageFile | undefined>(undefined)

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
