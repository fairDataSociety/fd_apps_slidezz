import fscreen from 'fscreen'
import { useAtom } from 'jotai'
import MoveableHelper from 'moveable-helper'
import React, { RefObject, useEffect, useRef, useState } from 'react'
import Moveable from 'react-moveable'
import Selecto from 'react-selecto'
//@ts-ignore
import Reveal from 'reveal.js'
//@ts-ignore
import RevealHighlight from 'reveal.js/plugin/highlight/highlight'
//@ts-ignore
import Markdown from 'reveal.js/plugin/markdown/markdown'

import { Box, Image, Textarea } from '@chakra-ui/react'

import { LogoPositions } from '../../config/logo-positions'
import useColors from '../../hooks/useColors'
import {
  editModeAtom,
  moveableTargetsAtom,
  replaceImageElementAtom,
  slidesDeckAtom,
  slidesLogoAtom,
  slideshowSettingsAtom,
  styleSettingsAtom,
} from '../../store'
import { Slides as SlidesType } from '../../types'
import { EditMode } from '../../types'
import { isHTML, parseElements } from '../../utils'
import ColorPicker from './ColorPicker'
import FontTab from './FontTab'
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
import SlideSideBar from './SlideSidebar'

interface SlidesProps {
  deckName: string
  slides: SlidesType
}

export default function Slides({ deckName, slides }: SlidesProps) {
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
  const [slideshowSettings] = useAtom(slideshowSettingsAtom)
  const [styleSettings] = useAtom(styleSettingsAtom)
  const [slidesLogo] = useAtom(slidesLogoAtom)
  const [editMode, setEditMode] = useAtom(editModeAtom)
  const [moveableTargets, setMoveableTargets] = useAtom(moveableTargetsAtom)
  const [moveableHelper] = useState(() => {
    return new MoveableHelper()
  })
  const [elementGuidelines, setElementGuidelines] = useState<HTMLElement[]>([])
  const [isFullscreen, setIsFullscreen] = useState(false)
  const slidesRef = useRef() as RefObject<HTMLDivElement>

  useEffect(() => {
    if (slidesRef.current && isHTML(slides.data))
      slidesRef.current.innerHTML = slides.data
  }, [slidesRef])

  useEffect(() => {
    document.body.setAttribute('data-theme', styleSettings.theme)
  }, [styleSettings])

  useEffect(() => {
    //@ts-ignore
    const newDeck = Reveal(document.querySelector(`.${deckName}`), {
      embedded: true,
      keyboardCondition: 'focused',
      plugins: [Markdown, RevealHighlight],
      ...slideshowSettings,
      center: false,
      width: slides.width || 1920,
      height: slides.height || 1080,
    })
    newDeck.initialize().then(() => {
      setDeck(newDeck)
      newDeck.layout()
      newDeck.sync()

      newDeck.getSlides().forEach((slide: any) => {
        parseElements(slide.children)
      })

      setElementGuidelines([
        newDeck.getRevealElement(),
        newDeck.getSlidesElement(),
        newDeck.getViewportElement(),
      ])

      newDeck.on('slidechanged', () => {
        setMoveableTargets([])
      })

      newDeck.on('overviewshown', () => {
        setMoveableTargets([])
      })
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
  }, [slideshowSettings])

  useEffect(() => {
    if (!moveableTargets.length) setEditMode(EditMode.MOVE)
  }, [moveableTargets])

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
      <SlideSideBar />

      <FontTab />
      <ColorPicker />
      {replaceImageElement && !isFullscreen && <ReplaceImage />}

      <Selecto
        ref={selectoRef}
        // The container to add a selection element
        container={document.querySelector('section.present') as HTMLElement}
        // The area to drag selection element (default: container)
        dragContainer={document.querySelector('section.present') as HTMLElement}
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
        keyContainer={deck?.getRevealElement()}
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
          const moveable = moveableRef.current
          const selected = (e.selected as HTMLElement[]).filter(
            (element) => !element.parentElement?.classList.contains('container')
          )
          setMoveableTargets(selected)

          if (e.isDragStart) {
            e.inputEvent.preventDefault()

            setTimeout(() => {
              moveable?.dragStart(e.inputEvent)
            })
          }
        }}
      />

      <Box overflow="visible" className={`reveal ${deckName}`}>
        <Box ref={slidesRef} className="slides">
          {!isHTML(slides.data) && (
            <section data-markdown="" data-separator="---">
              <Textarea data-template defaultValue={slides.data} />
            </section>
          )}

          {!isFullscreen ? (
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
              setReplaceImageElement={setReplaceImageElement}
              draggable={editMode === EditMode.MOVE ? true : false}
              throttleDrag={0}
              startDragRotate={0}
              throttleDragRotate={0}
              zoom={2}
              origin={editMode === EditMode.MOVE ? true : false}
              padding={{ left: 0, top: 0, right: 0, bottom: 0 }}
              resizable={editMode === EditMode.MOVE ? true : false}
              keepRatio={false}
              throttleScale={0}
              renderDirections={['nw', 'n', 'ne', 'w', 'e', 'sw', 's', 'se']}
              edge={false}
              snappable={editMode === EditMode.MOVE ? true : false}
              rotatable={editMode === EditMode.MOVE ? true : false}
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
              onResizeStart={moveableHelper.onResizeStart}
              onResize={moveableHelper.onResize}
              onDragStart={moveableHelper.onDragStart}
              onDrag={moveableHelper.onDrag}
              onRotateStart={moveableHelper.onRotateStart}
              onRotate={moveableHelper.onRotate}
              onDragGroupStart={moveableHelper.onDragGroupStart}
              onDragGroup={moveableHelper.onDragGroup}
              onRotateGroupStart={moveableHelper.onRotateGroupStart}
              onRotateGroup={moveableHelper.onRotateGroup}
              onResizeGroupStart={moveableHelper.onResizeGroupStart}
              onResizeGroup={moveableHelper.onResizeGroup}
              onClickGroup={(e) => {
                selectoRef.current?.clickTarget(e.inputEvent, e.inputTarget)
              }}
              onClick={(e) => {
                if (e.isDouble && moveableTargets.length === 1) {
                  const target = e.target as HTMLElement
                  target.contentEditable = 'true'
                  e.target.focus()
                  setEditMode(EditMode.TEXT)
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
