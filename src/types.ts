import { slideThemes } from './config/slide-themes'

export interface SlideshowSettings {
  controls: boolean
  progress: boolean
  history: boolean
  loop: boolean
  slideNumber: boolean
  controlsLayout: 'edges' | 'bottom-right'
  controlsBackArrows: 'faded' | 'hidden' | 'visible'
  slidesLogoPosition: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right'
}

export interface StyleSettings {
  theme: keyof typeof slideThemes
}

export interface File {
  name: string
  podName: string
  fullPath: string
  extension: string
  data: Blob
}

export interface Slides {
  data: string
  height?: number
  width?: number
  name?: string
  isReadonly?: boolean
  sharingInfo?: {
    sharedRef: string
    allowDownloading: boolean
  }
}

export interface User {
  username: string
  password: string
}

export enum EditMode {
  MOVE,
  TEXT,
}
