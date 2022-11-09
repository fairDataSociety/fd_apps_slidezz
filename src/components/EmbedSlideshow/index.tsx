import { useAtom } from 'jotai'
import { useRouter } from 'next/router'
import React, { RefObject, useEffect, useRef } from 'react'
//@ts-ignore
import Reveal from 'reveal.js'
//@ts-ignore
import RevealHighlight from 'reveal.js/plugin/highlight/highlight'
//@ts-ignore
import Markdown from 'reveal.js/plugin/markdown/markdown'

import { Box, Image } from '@chakra-ui/react'

import { LogoPositions } from '../../config/logo-positions'
import { slidesLogoAtom } from '../../store'

interface EmbedSlideshowProps {
  slides: string
}

export default function EmbedSlideshow({ slides }: EmbedSlideshowProps) {
  const [slidesLogo] = useAtom(slidesLogoAtom)
  const slidesRef = useRef() as RefObject<HTMLDivElement>
  const router = useRouter()
  const query = router.query as { [key: string]: string | undefined }
  const slidesLogoPosition =
    (query.slidesLogoPosition as keyof typeof LogoPositions) || 'top-left'

  useEffect(() => {
    if (slidesRef.current) slidesRef.current.innerHTML = slides
  }, [slidesRef])

  useEffect(() => {
    if (query.theme) document.body.setAttribute('data-theme', query.theme)

    //@ts-ignore
    const newDeck = Reveal(document.querySelector(`.reveal`), {
      embedded: true,
      keyboardCondition: 'focused',
      plugins: [Markdown, RevealHighlight],
      ...query,
      center: false,
    })

    newDeck.initialize().then(() => {
      newDeck.layout()
      newDeck.sync()
    })

    return () => {
      newDeck.destroy()
    }
  }, [])

  return (
    <Box className="slideshow" position="relative" w="100vw" h="100vh">
      <Box className="reveal">
        <Box ref={slidesRef} className="slides"></Box>
        {slidesLogo && (
          <Image
            alt="logo"
            zIndex={100}
            position="absolute"
            {...LogoPositions[slidesLogoPosition]}
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