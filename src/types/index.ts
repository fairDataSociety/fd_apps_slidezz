import { slideThemes } from '../config/slide-themes'

declare global {
  interface Window {
    _detectedSiteType: { type: string; url: string; basePath: string }
  }
}

export interface SlideshowSettings {
  controls: boolean
  progress: boolean
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

export interface SlidesLogo {
  data: string
}

export interface User {
  username: string
  password: string
}

export enum EditMode {
  MOVE,
  TEXT,
}

export type LoadingModalSetAction = (update: {
  action: 'start' | 'stop'
  message?: string | undefined
}) => void
