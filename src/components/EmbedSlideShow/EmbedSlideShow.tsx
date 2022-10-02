import { Box, Image } from '@chakra-ui/react'
import React, { RefObject, useEffect, useRef } from 'react'

//@ts-ignore
import Reveal from 'reveal.js'
//@ts-ignore
import Markdown from 'reveal.js/plugin/markdown/markdown'
//@ts-ignore
import RevealHighlight from 'reveal.js/plugin/highlight/highlight'
import { useRouter } from 'next/router'
import { LogoPositions } from '../../config/logo-positions'
import { useAtom } from 'jotai'
import { slidesLogoAtom } from '../../store'

interface EmbedSlideShowProps {
  slides: string
}

export default function EmbedSlideShow({ slides }: EmbedSlideShowProps) {
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
            position="absolute"
            {...LogoPositions[slidesLogoPosition]}
            h={{ base: '10px', sm: '20px', md: '30px', lg: '50px' }}
            w={{ base: '10px', sm: '20px', md: '30px', lg: '50px' }}
            objectFit="cover"
            src={URL.createObjectURL(new Blob([slidesLogo.data.buffer]))}
          />
        )}
      </Box>
    </Box>
  )
}
