import { Editor } from '@tiptap/react'
import { useColors } from 'catppuccin-chakra-ui-theme'
import fscreen from 'fscreen'
import { useAtom, useAtomValue } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'
import MoveableHelper from 'moveable-helper'
import React, { RefObject, useEffect, useRef, useState } from 'react'
import Moveable from 'react-moveable'
import Selecto from 'react-selecto'
import Reveal from 'reveal.js'
import RevealHighlight from 'reveal.js/plugin/highlight/highlight'
import Markdown from 'reveal.js/plugin/markdown/markdown'

import { Box, Image, Textarea } from '@chakra-ui/react'

import { wrapSlideElements } from '../../actions/wrapSlideElements'
import { LogoPositions } from '../../config/logo-positions'
import useTextEditor from '../../hooks/useTextEditor'
import {
  HistoryActionType,
  SizeHistoryMap,
  TransformHistoryMap,
  addHistoryActionAtom,
  editModeAtom,
  moveableHelperAtom,
  moveableTargetsAtom,
  redoHistoryStackLenAtom,
  replaceImageElementAtom,
  slidesDeckAtom,
  slidesLogoAtom,
  slideshowSettingsAtom,
  styleSettingsAtom,
  undoHistoryStackLenAtom,
} from '../../store'
import { EditMode, Slides as SlidesType } from '../../types'
import { isHTML, parseTransform } from '../../utils'
import {
  MoveableDeleteButton,
  MoveableDeleteButtonProps,
} from './Moveable/Ables/MoveableDeleteButton'
import {
  MoveableDimension,
  MoveableDimensionProps,
} from './Moveable/Ables/MoveableDimension'
import {
  MoveableReplaceImage,
  MoveableReplaceImageProps,
} from './Moveable/Ables/MoveableReplaceImage'
import { ReplaceImage } from './ReplaceImage'

interface SlidesProps {
  deckName: string
  slides: SlidesType
  editor: Editor | null
}

export default function Slides({ deckName, slides, editor }: SlidesProps) {
  const setEditMode = useUpdateAtom(editModeAtom)
  const [deck, setDeck] = useAtom(slidesDeckAtom)
  const { overlay0 } = useColors()
  const moveableRef = useRef() as RefObject<
    Moveable<
      MoveableDeleteButtonProps &
        MoveableDimensionProps &
        MoveableReplaceImageProps
    >
  >
  const selectoRef = useRef() as RefObject<Selecto>
  const [replaceImageElement, setReplaceImageElement] = useAtom(
    replaceImageElementAtom
  )
  const slideshowSettings = useAtomValue(slideshowSettingsAtom)
  const styleSettings = useAtomValue(styleSettingsAtom)
  const slidesLogo = useAtomValue(slidesLogoAtom)
  const [moveableTargets, setMoveableTargets] = useAtom(moveableTargetsAtom)
  const [moveableHelper, setMoveableHelper] = useAtom(moveableHelperAtom)
  const [elementGuidelines, setElementGuidelines] = useState<HTMLElement[]>([])
  const [isFullscreen, setIsFullscreen] = useState(false)
  const slidesRef = useRef() as RefObject<HTMLDivElement>
  const [prevTransforms] = useState(new Map<HTMLElement | SVGElement, string>())
  const [prevSizes] = useState(
    new Map<HTMLElement | SVGElement, { width: string; height: string }>()
  )
  const undoHistoryStackLen = useAtomValue(undoHistoryStackLenAtom)
  const redoHistoryStackLen = useAtomValue(redoHistoryStackLenAtom)
  const addHistoryAction = useUpdateAtom(addHistoryActionAtom)

  useTextEditor()

  useEffect(() => {
    if (slidesRef.current && isHTML(slides.data))
      slidesRef.current.innerHTML = slides.data
  }, [slidesRef, slides.data])

  useEffect(() => {
    document.body.setAttribute('data-theme', styleSettings.theme)
  }, [styleSettings])

  useEffect(() => {
    const newDeck = new Reveal(
      document.querySelector(`.${deckName}`) as HTMLElement,
      {
        embedded: true,
        keyboardCondition: 'focused',
        plugins: [Markdown, RevealHighlight],
        ...slideshowSettings,
        center: false,
        history: false,
        width: slides.width || 1920,
        height: slides.height || 1080,
        minScale: 0,
      }
    )
    newDeck.initialize().then(() => {
      newDeck.layout()
      newDeck.sync()

      newDeck.getSlides().forEach((slide) => {
        wrapSlideElements(Array.from(slide.children) as HTMLElement[])
      })

      const containers = Array.from(
        newDeck.getRevealElement().querySelectorAll('.container')
      ) as HTMLElement[]

      const moveableHelper = new MoveableHelper()

      containers.forEach((container) => {
        const properties = {
          transform: parseTransform(container.style.transform),
        }

        moveableHelper.createFrame(container, properties)
      })

      setMoveableHelper(moveableHelper)

      setElementGuidelines([
        newDeck.getRevealElement() as HTMLElement,
        newDeck.getSlidesElement() as HTMLElement,
        newDeck.getViewportElement() as HTMLElement,
      ])

      newDeck.on('slidechanged', () => {
        setMoveableTargets([])
      })

      newDeck.on('overviewshown', () => {
        setMoveableTargets([])
      })

      setDeck(newDeck)
    })

    const handleFullScreenChange = () => {
      setIsFullscreen(fscreen.fullscreenElement !== null)
    }

    fscreen.addEventListener('fullscreenchange', handleFullScreenChange)

    return () => {
      newDeck.destroy()
      fscreen.removeEventListener('fullscreenchange', handleFullScreenChange)
    }
  }, [])

  useEffect(() => {
    if (deck) deck.configure(slideshowSettings)
  }, [slideshowSettings, deck])

  useEffect(() => {
    if (editor && deck) {
      const editorElement = editor.options.element
      const revealElement = deck.getRevealElement() as HTMLElement
      if (revealElement.contains(editorElement)) {
        const editorHTML = editor.getHTML()
        const parentElement = editorElement.parentElement

        if (parentElement) {
          parentElement.removeChild(editorElement)
          parentElement.innerHTML = editorHTML
        }
      }
      setEditMode(EditMode.MOVE)
    }
  }, [moveableTargets, editor, deck, setEditMode])

  useEffect(() => {
    if (deck) {
      const staticToAbsolute = () => {
        const staticElements: {
          element: HTMLElement
          offsetTop: number
          offsetLeft: number
          offsetWidth: number
          offsetHeight: number
        }[] = []
        const elements = Array.from(
          (deck.getRevealElement() as HTMLElement).querySelectorAll(
            '.present .container'
          )
        ) as HTMLElement[]

        for (const element of elements) {
          if (window.getComputedStyle(element).position === 'static') {
            staticElements.push({
              element,
              offsetTop: element.offsetTop,
              offsetLeft: element.offsetLeft,
              offsetHeight: element.offsetHeight,
              offsetWidth: element.offsetWidth,
            })
          }
        }

        for (const {
          element,
          offsetTop,
          offsetLeft,
          offsetWidth,
          offsetHeight,
        } of staticElements) {
          element.style.position = 'absolute'
          element.style.top = `${offsetTop}px`
          element.style.left = `${offsetLeft}px`
          element.style.width = `${offsetWidth}px`
          element.style.height = `${offsetHeight}px`
        }
      }

      staticToAbsolute()

      deck.on('slidechanged', staticToAbsolute)

      return () => deck.off('slidechanged', staticToAbsolute)
    }
  }, [deck])

  useEffect(() => {
    moveableRef.current?.updateRect()
  }, [undoHistoryStackLen, redoHistoryStackLen])

  return (
    <Box
      className="slideshow"
      position="relative"
      borderWidth="2px"
      borderColor={moveableTargets.length ? overlay0 : 'blue.500'}
      borderBottom="none"
      w="full"
      h="full"
    >
      {replaceImageElement && !isFullscreen && <ReplaceImage />}

      <Box overflow="visible" className={`reveal ${deckName}`}>
        {!isFullscreen && deck ? (
          <Selecto
            ref={selectoRef}
            // The container to add a selection element
            container={deck.getRevealElement() as HTMLElement}
            // Targets to select. You can register a queryselector or an Element.
            selectableTargets={['section.present *']}
            // Whether to select by click (default: true)
            selectByClick={true}
            // Whether to select from the target inside (default: true)
            selectFromInside={true}
            // After the select, whether to select the next target with the selected target (deselected if the target is selected again).
            continueSelect={false}
            // Determines which key to continue selecting the next target via keydown and keyup.
            toggleContinueSelect={'shift'}
            // The container for keydown and keyup events
            keyContainer={deck?.getRevealElement() as HTMLElement}
            // The rate at which the target overlaps the drag area to be selected. (default: 100)
            hitRate={100}
            onDragStart={(e) => {
              const moveable = moveableRef.current
              const target = e.inputEvent.target

              if (
                moveable?.isMoveableElement(target) ||
                moveableTargets.some((t) => t === target || t.contains(target))
              ) {
                e.stop()
              }
            }}
            onSelectEnd={(e) => {
              const selected: HTMLElement[] = []
              const moveable = moveableRef.current
              const containers = Array.from(
                document.querySelectorAll('.present .container')
              ) as HTMLElement[]

              for (const element of e.selected) {
                for (const container of containers) {
                  if (
                    container.contains(element) &&
                    !selected.includes(container)
                  )
                    selected.push(container)
                }
              }

              setMoveableTargets((prevs) => {
                if (
                  prevs.length !== selected.length ||
                  !prevs.every((prev, i) => selected[i] === prev)
                ) {
                  addHistoryAction({
                    type: HistoryActionType.SetMoveableTargets,
                    prevs,
                    nexts: selected,
                    deckState: deck.getState(),
                  })
                }
                return selected
              })

              if (e.isDragStart) {
                e.inputEvent.preventDefault()

                setTimeout(() => {
                  moveable?.dragStart(e.inputEvent)
                })
              }
            }}
          />
        ) : null}

        <Box ref={slidesRef} className="slides">
          {!isHTML(slides.data) && (
            <section data-markdown="" data-separator="---">
              <Textarea data-template defaultValue={slides.data} />
            </section>
          )}

          {!isFullscreen && deck ? (
            <Moveable<
              MoveableDeleteButtonProps &
                MoveableDimensionProps &
                MoveableReplaceImageProps
            >
              ables={[
                MoveableDeleteButton,
                MoveableDimension,
                MoveableReplaceImage,
              ]}
              replaceImage={true}
              deleteButton={true}
              dimension={true}
              ref={moveableRef}
              bounds={{
                left: 0,
                top: 0,
                right: document.querySelector('.slides')?.clientWidth,
                bottom: document.querySelector('.slides')?.clientHeight,
              }}
              elementGuidelines={elementGuidelines}
              target={moveableTargets}
              setTarget={setMoveableTargets}
              addHistoryAction={addHistoryAction}
              deck={deck}
              setReplaceImageElement={setReplaceImageElement}
              draggable={true}
              throttleDrag={0}
              startDragRotate={0}
              throttleDragRotate={0}
              zoom={1}
              origin={true}
              padding={{ left: 0, top: 0, right: 0, bottom: 0 }}
              resizable={true}
              keepRatio={false}
              throttleScale={0}
              renderDirections={['nw', 'n', 'ne', 'w', 'e', 'sw', 's', 'se']}
              edge={false}
              snappable={true}
              rotatable={true}
              verticalGuidelines={[0, 200, 400]}
              horizontalGuidelines={[0, 200, 400]}
              snapThreshold={5}
              isDisplaySnapDigit={true}
              snapGap={true}
              snapDirections={{
                top: true,
                right: true,
                bottom: true,
                left: true,
                center: true,
                middle: true,
              }}
              elementSnapDirections={{
                top: true,
                right: true,
                bottom: true,
                left: true,
                center: true,
                middle: true,
              }}
              snapDigit={0}
              onResizeStart={(e) => {
                const target = e.target
                const width = target.style.width
                const height = target.style.height
                const transform = target.style.transform

                prevSizes.set(target, { width, height })
                prevTransforms.set(target, transform)

                moveableHelper?.onResizeStart(e)
              }}
              onResize={moveableHelper?.onResize}
              onResizeEnd={(e) => {
                if (e.lastEvent) {
                  const target = e.target
                  const infos: SizeHistoryMap = new Map()
                  const prevSize = prevSizes.get(target) || {
                    width: '',
                    height: '',
                  }

                  infos.set(e.target, {
                    prev: {
                      ...prevSize,
                      transform: prevTransforms.get(target) || '',
                    },
                    next: {
                      width: target.style.width,
                      height: target.style.height,
                      transform: target.style.transform,
                    },
                  })

                  addHistoryAction({
                    type: HistoryActionType.SetSize,
                    infos,
                    deckState: deck.getState(),
                  })
                }
              }}
              onResizeGroupStart={(e) => {
                const targets = e.targets

                targets.forEach((target) => {
                  prevSizes.set(target, {
                    width: target.style.width,
                    height: target.style.height,
                  })
                })

                moveableHelper?.onResizeGroupStart(e)
              }}
              onResizeGroup={moveableHelper?.onResizeGroup}
              onResizeGroupEnd={(e) => {
                if (e.events && e.events.length) {
                  const targets = e.targets
                  const infos: SizeHistoryMap = new Map()

                  targets.forEach((target) => {
                    const prevSize = prevSizes.get(target) || {
                      width: '',
                      height: '',
                    }

                    infos.set(target, {
                      prev: {
                        ...prevSize,
                        transform: prevTransforms.get(target) || '',
                      },
                      next: {
                        width: target.style.width,
                        height: target.style.height,
                        transform: target.style.transform,
                      },
                    })
                  })

                  addHistoryAction({
                    type: HistoryActionType.SetSize,
                    infos,
                    deckState: deck.getState(),
                  })
                }
              }}
              onDragStart={(e) => {
                const target = e.target

                prevTransforms.set(target, target.style.transform)

                moveableHelper?.onDragStart(e)
              }}
              onDrag={moveableHelper?.onDrag}
              onDragEnd={(e) => {
                if (e.lastEvent) {
                  const infos: TransformHistoryMap = new Map()
                  const target = e.target

                  infos.set(target, {
                    prevTransform: prevTransforms.get(target) || '',
                    nextTransform: e.lastEvent.transform,
                  })

                  addHistoryAction({
                    type: HistoryActionType.SetTransform,
                    infos,
                    deckState: deck.getState(),
                  })
                }
              }}
              onRotateStart={(e) => {
                const target = e.target

                prevTransforms.set(target, target.style.transform)
                moveableHelper?.onRotateStart(e)
              }}
              onRotate={moveableHelper?.onRotate}
              onRotateEnd={(e) => {
                if (e.lastEvent) {
                  const infos: TransformHistoryMap = new Map()
                  const target = e.target

                  infos.set(target, {
                    prevTransform: prevTransforms.get(target) || '',
                    nextTransform: e.lastEvent.transform,
                  })

                  addHistoryAction({
                    type: HistoryActionType.SetTransform,
                    infos,
                    deckState: deck.getState(),
                  })
                }
              }}
              onDragGroupStart={(e) => {
                const targets = e.targets

                targets.forEach((target) =>
                  prevTransforms.set(target, target.style.transform)
                )

                moveableHelper?.onDragGroupStart(e)
              }}
              onDragGroup={moveableHelper?.onDragGroup}
              onDragGroupEnd={(e) => {
                if (e.isDrag && e.events && e.events.length) {
                  const infos: TransformHistoryMap = new Map()

                  e.events.forEach((event) => {
                    const target = event.target

                    infos.set(target, {
                      prevTransform: prevTransforms.get(target) || '',
                      nextTransform: event.lastEvent.transform,
                    })
                  })

                  addHistoryAction({
                    type: HistoryActionType.SetTransform,
                    infos,
                    deckState: deck.getState(),
                  })
                }
              }}
              onRotateGroupStart={(e) => {
                const targets = e.targets

                targets.forEach((target) =>
                  prevTransforms.set(target, target.style.transform)
                )

                moveableHelper?.onRotateGroupStart(e)
              }}
              onRotateGroup={moveableHelper?.onRotateGroup}
              onRotateGroupEnd={(e) => {
                if (e.events && e.events.length) {
                  const infos: TransformHistoryMap = new Map()

                  e.events.forEach((event) => {
                    const target = event.target

                    infos.set(target, {
                      prevTransform: prevTransforms.get(target) || '',
                      nextTransform: event.lastEvent.transform,
                    })
                  })

                  addHistoryAction({
                    type: HistoryActionType.SetTransform,
                    infos,
                    deckState: deck.getState(),
                  })
                }
              }}
              onClickGroup={(e) => {
                selectoRef.current?.clickTarget(e.inputEvent, e.inputTarget)
              }}
              onClick={(e) => {
                if (e.isDouble && moveableTargets.length === 1 && editor) {
                  setEditMode(EditMode.TEXT)
                  const target = e.target as HTMLElement
                  editor.commands.setContent(target.innerHTML)
                  target.innerHTML = ''
                  target.append(editor.options.element)
                  editor.commands.focus()
                }
              }}
            />
          ) : null}
        </Box>
        {slidesLogo && (
          <Image
            alt="logo"
            zIndex={100}
            position="absolute"
            {...LogoPositions[slideshowSettings.slidesLogoPosition]}
            h={{ base: '10px', sm: '20px', md: '30px', lg: '50px' }}
            w={{ base: '10px', sm: '20px', md: '30px', lg: '50px' }}
            objectFit="cover"
            src={slidesLogo.data}
          />
        )}
      </Box>
    </Box>
  )
}
