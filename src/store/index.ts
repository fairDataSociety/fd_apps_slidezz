import { FdpStorage } from '@fairdatasociety/fdp-storage'
import { atom } from 'jotai'
import { atomWithReset, atomWithStorage } from 'jotai/utils'
import MoveableHelper from 'moveable-helper'
import { extname } from 'path'
import Reveal from 'reveal.js'

import {
  EditMode,
  File,
  Slides,
  SlidesLogo,
  SlideshowSettings,
  StyleSettings,
  User,
} from '../types'
import { parseTransform } from '../utils'

// FDP instance

type BatchId = ConstructorParameters<typeof FdpStorage>[1]

const fdp = !process.env.NEXT_PUBLIC_IS_FAIROS
  ? new FdpStorage(
      process.env.NEXT_PUBLIC_BEE_URL as string,
      process.env.NEXT_PUBLIC_BATCH_ID as BatchId,
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

const initialSettings: SlideshowSettings = {
  controls: true,
  progress: true,
  loop: true,
  slideNumber: false,
  controlsLayout: 'bottom-right',
  controlsBackArrows: 'faded',
  slidesLogoPosition: 'top-left',
}

export const slideshowSettingsAtom = atomWithStorage(
  'slideshowSettings',
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

export const slidesDeckAtom = atom<Reveal.Api | undefined>(undefined)

// Slides logo

export const slidesLogoAtom = atom<SlidesLogo | undefined>(undefined)

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

export const moveableTargetsAtom = atom<HTMLElement[]>([])

// Replace image

export const replaceImageElementAtom = atom<HTMLImageElement | undefined>(
  undefined
)

// User

export const userAtom = atom<User | undefined>(undefined)

// Google Access token

export const googleAccessTokenAtom = atom('')

// Loading modal

export const loadingModalAtom = atom<{ isOpen: boolean; message?: string }>({
  isOpen: false,
  message: undefined,
})

export const loadingModalSetActionAtom = atom<
  null,
  { action: 'start' | 'stop'; message?: string }
>(null, (_, set, { action, message }) => {
  if (action === 'start') set(loadingModalAtom, { isOpen: true, message })
  if (action === 'stop')
    set(loadingModalAtom, { isOpen: false, message: undefined })
})

// Edit mode

export const editModeAtom = atom<EditMode>(EditMode.MOVE)

// History manager

export enum HistoryActionType {
  SetMoveableTargets,
  SetTransform,
  SetSize,
}

export type TransformHistoryMap = Map<
  HTMLElement | SVGElement,
  { prevTransform: string; nextTransform: string }
>

export type SizeHistoryMap = Map<
  HTMLElement | SVGElement,
  {
    prev: {
      width: string
      height: string
    }
    next: {
      width: string
      height: string
    }
  }
>

export type HistoryAction =
  | {
      type: HistoryActionType.SetMoveableTargets
      prevs: HTMLElement[]
      nexts: HTMLElement[]
    }
  | {
      type: HistoryActionType.SetTransform
      infos: TransformHistoryMap
    }
  | {
      type: HistoryActionType.SetSize
      infos: SizeHistoryMap
    }

export const undoHistoryStackAtom = atomWithReset<HistoryAction[]>([])
export const redoHistoryStackAtom = atomWithReset<HistoryAction[]>([])

export const undoHistoryStackLenAtom = atom(
  (get) => get(undoHistoryStackAtom).length
)
export const redoHistoryStackLenAtom = atom(
  (get) => get(redoHistoryStackAtom).length
)

export const addHistoryActionAtom = atom<null, HistoryAction>(
  null,
  (_, set, historyAction) => {
    set(undoHistoryStackAtom, (prev) => [...prev, historyAction])
    set(redoHistoryStackAtom, [])
  }
)

export const undoHistoryAtom = atom(null, (get, set) => {
  const undoStack = get(undoHistoryStackAtom)
  const undoAction = undoStack.pop()

  if (!undoAction) return

  switch (undoAction.type) {
    case HistoryActionType.SetMoveableTargets:
      set(moveableTargetsAtom, undoAction.prevs)
      break
    case HistoryActionType.SetTransform:
      const moveableHelper = get(moveableHelperAtom)

      for (const [element, { prevTransform }] of undoAction.infos.entries()) {
        element.style.transform = prevTransform

        moveableHelper?.createFrame(element, {
          transform: parseTransform(prevTransform),
        })
      }
      break
    case HistoryActionType.SetSize:
      for (const [element, { prev }] of undoAction.infos.entries()) {
        element.style.width = prev.width
        element.style.height = prev.height
      }
      break
  }

  set(undoHistoryStackAtom, [...undoStack])
  set(redoHistoryStackAtom, (prev) => [...prev, undoAction])
})

export const redoHistoryAtom = atom(null, (get, set) => {
  const redoStack = get(redoHistoryStackAtom)
  const redoAction = redoStack.pop()

  if (!redoAction) return

  switch (redoAction.type) {
    case HistoryActionType.SetMoveableTargets:
      set(moveableTargetsAtom, redoAction.nexts)
      break
    case HistoryActionType.SetTransform:
      const moveableHelper = get(moveableHelperAtom)

      for (const [element, { nextTransform }] of redoAction.infos.entries()) {
        element.style.transform = nextTransform

        moveableHelper?.createFrame(element, {
          transform: parseTransform(nextTransform),
        })
      }
      break
    case HistoryActionType.SetSize:
      for (const [element, { next }] of redoAction.infos.entries()) {
        element.style.width = next.width
        element.style.height = next.height
      }
      break
  }

  set(redoHistoryStackAtom, [...redoStack])
  set(undoHistoryStackAtom, (prev) => [...prev, redoAction])
})

// Moveable helper

export const moveableHelperAtom = atom<MoveableHelper | undefined>(undefined)
