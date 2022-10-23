type WithRequiredProperty<T, K extends keyof T> = T & {
  [P in K]-?: T[P]
}

export interface GoogleSlides {
  slides: GoogleSlide[]
  pageSize: {
    width: {
      magnitude: number
      unit: 'EMU'
    }
    height: {
      magnitude: number
      unit: 'EMU'
    }
  }
}

export interface GoogleSlide {
  objectId: string
  pageElements: PageElement[]
}

export interface PageElement {
  objectId: string
  size: Size
  transform: Transform
  title?: string
  video?: {
    url: string
    source: 'YOUTUBE' | 'DRIVE'
    id: string
  }
  elementGroup?: {
    children: PageElement[]
  }
}

export interface Size {
  width: {
    magnitude: number
    unit: 'EMU'
  }
  height: {
    magnitude: number
    unit: 'EMU'
  }
}

export interface Transform {
  scaleX?: number
  scaleY?: number
  shearX?: number
  shearY?: number
  translateX?: number
  translateY?: number
  unit: 'EMU'
}

export type VideoElement = WithRequiredProperty<PageElement, 'video'>
