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
  moveableTargetAtom,
  replaceImageElementAtom,
  slidesDeckAtom,
  slidesLogoAtom,
  slideshowSettingsAtom,
  styleSettingsAtom,
} from '../../store'
import { Slides as SlidesType } from '../../types'
import { EditMode } from '../../types'
import { addMoveableToElements, isHTML, parseElements } from '../../utils'
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
import SetEditMode from './SetEditMode'
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
  const [replaceImageElement, setReplaceImageElement] = useAtom(
    replaceImageElementAtom
  )
  const [slideshowSettings] = useAtom(slideshowSettingsAtom)
  const [styleSettings] = useAtom(styleSettingsAtom)
  const [slidesLogo] = useAtom(slidesLogoAtom)
  const [editMode] = useAtom(editModeAtom)
  const [moveableTarget, setMoveableTarget] = useAtom(moveableTargetAtom)
  const [moveableHelper] = useState(() => {
    return new MoveableHelper()
  })
  const [elementGuidelines, setElementGuidelines] = useState<HTMLElement[]>([])
  const [isFullscreen, setIsFullscreen] = useState(false)
  const slidesRef = useRef() as RefObject<HTMLDivElement>

  useEffect(() => {
    const handleBodyClick = (e: MouseEvent) => {
      const revealElement = deck.getRevealElement() as HTMLElement
      const target = e.target as HTMLElement

      if (
        !moveableRef.current?.isInside(e.clientX, e.clientY) &&
        revealElement.contains(target)
      ) {
        setMoveableTarget(undefined)
      }
    }

    if (deck) document.body.addEventListener('click', handleBodyClick)

    return () => {
      document.body.removeEventListener('click', handleBodyClick)
    }
  }, [moveableRef, deck])

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
        addMoveableToElements(slide.children, setMoveableTarget)
      })

      setElementGuidelines([
        newDeck.getRevealElement(),
        newDeck.getSlidesElement(),
        newDeck.getViewportElement(),
      ])

      newDeck.on('slidechanged', () => {
        setMoveableTarget(undefined)
      })

      newDeck.on('overviewshown', () => {
        setMoveableTarget(undefined)
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
    if (deck) {
      deck.layout()
      deck.sync()
    }
  }, [deck])

  useEffect(() => {
    if (deck) deck.configure(slideshowSettings)
  }, [slideshowSettings])

  useEffect(() => {
    console.log('here')
    if (moveableTarget instanceof HTMLElement) {
      if (editMode === EditMode.TEXT && !isFullscreen) {
        moveableTarget.contentEditable = 'true'
      } else {
        moveableTarget.contentEditable = 'false'
      }
    }
  }, [moveableTarget, editMode])

  return (
    <Box
      className="slideshow"
      position="relative"
      borderWidth="1px"
      borderColor={overlay0}
      borderBottom="none"
      w="full"
      h="full"
    >
      <SlideSideBar />
      <SetEditMode />
      <FontTab />
      <ColorPicker />
      {replaceImageElement && !isFullscreen && <ReplaceImage />}

      <Selecto
        // The container to add a selection element
        container={document.querySelector('.present') as HTMLElement}
        // The area to drag selection element (default: container)
        dragContainer={document.querySelector('.present') as HTMLElement}
        // Targets to select. You can register a queryselector or an Element.
        selectableTargets={['.present *']}
        // Whether to select by click (default: true)
        selectByClick={false}
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
          if (moveableTarget) {
            e.stop()
          }
        }}
        onSelectEnd={(e) => {
          setTimeout(() => {
            const selected = (e.selected as HTMLElement[]).filter(
              (element) =>
                !element.parentElement?.classList.contains('container')
            )

            if (selected.length) setMoveableTarget(selected)
          })
        }}
      />

      <Box overflow="visible" className={`reveal ${deckName}`}>
        <Box ref={slidesRef} className="slides">
          {!isHTML(slides.data) && (
            <section data-markdown="" data-separator="---">
              <Textarea data-template defaultValue={slides.data} />
            </section>
          )}

          {moveableTarget && !isFullscreen && editMode === EditMode.MOVE ? (
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
              target={moveableTarget}
              setTarget={setMoveableTarget}
              setReplaceImageElement={setReplaceImageElement}
              draggable={true}
              throttleDrag={0}
              startDragRotate={0}
              throttleDragRotate={0}
              zoom={2}
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
