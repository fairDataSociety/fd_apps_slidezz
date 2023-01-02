import { useAtom } from 'jotai'
import React, { RefObject, useEffect, useRef } from 'react'
import Reveal from 'reveal.js'
import RevealHighlight from 'reveal.js/plugin/highlight/highlight'
import Markdown from 'reveal.js/plugin/markdown/markdown'

import { Box, Image } from '@chakra-ui/react'

import { LogoPositions } from '../../config/logo-positions'
import useColors from '../../hooks/useColors'
import {
  slidesDeckAtom,
  slidesLogoAtom,
  slideshowSettingsAtom,
  styleSettingsAtom,
} from '../../store'
import { Slides } from '../../types'

interface SharedSlideshowProps {
  slides: Slides
}

export default function SharedSlideshow({ slides }: SharedSlideshowProps) {
  const [slideshowSettings] = useAtom(slideshowSettingsAtom)
  const [slidesLogo] = useAtom(slidesLogoAtom)
  const [styleSettings] = useAtom(styleSettingsAtom)
  const slidesRef = useRef() as RefObject<HTMLDivElement>
  const [deck, setDeck] = useAtom(slidesDeckAtom)
  const { overlay0 } = useColors()

  useEffect(() => {
    if (slidesRef.current) slidesRef.current.innerHTML = slides.data
  }, [slidesRef])

  useEffect(() => {
    document.body.setAttribute('data-theme', styleSettings.theme)
  }, [styleSettings])

  useEffect(() => {
    const newDeck = new Reveal(
      document.querySelector(`.reveal`) as HTMLElement,
      {
        embedded: true,
        keyboardCondition: 'focused',
        plugins: [Markdown, RevealHighlight],
        ...slideshowSettings,
        center: false,
        history: true,
        width: slides.width || 1920,
        height: slides.height || 1080,
      }
    )

    newDeck.initialize().then(() => {
      setDeck(newDeck)
      newDeck.layout()
      newDeck.sync()
    })

    return () => {
      newDeck.destroy()
    }
  }, [])

  useEffect(() => {
    if (deck) deck.configure(slideshowSettings)
  }, [slideshowSettings])

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
      <Box className="reveal">
        <Box ref={slidesRef} className="slides"></Box>
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
