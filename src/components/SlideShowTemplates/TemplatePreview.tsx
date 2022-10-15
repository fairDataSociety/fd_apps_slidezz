import {
  Box,
  Button,
  HStack,
  IconButton,
  Text,
  Textarea,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react'
import { RefObject, useEffect, useRef, useState } from 'react'
import { isHTML } from '../../utils'
import { FiEye } from 'react-icons/fi'
import { ChevronRightIcon } from '@chakra-ui/icons'
import fscreen from 'fscreen'

//@ts-ignore
import Reveal from 'reveal.js'
//@ts-ignore
import Markdown from 'reveal.js/plugin/markdown/markdown'
//@ts-ignore
import RevealHighlight from 'reveal.js/plugin/highlight/highlight'
import { useAtom } from 'jotai'
import { slidesAtom } from '../../store'

interface TemplatePreviewProps {
  deckName: string
  title: string
  slides: string
}

export default function TemplatePreview({
  deckName,
  title,
  slides,
}: TemplatePreviewProps) {
  const setSlides = useAtom(slidesAtom)[1]

  return (
    <Box
      w="350px"
      border="solid"
      borderWidth={1}
      borderColor={useColorModeValue('latte-overlay0', 'frappe-overlay0')}
      p={2}
      _hover={{
        boxShadow: 'lg',
      }}
      position="relative"
    >
      <Box w="full" h="250px">
        <SlideShow deckName={deckName} slides={slides} />
      </Box>
      <HStack justify="space-between" mt={2}>
        <Text fontWeight="bold">{title}</Text>
        <Button
          onClick={() => {
            setSlides({ data: slides })
          }}
          size="sm"
          rightIcon={<ChevronRightIcon />}
        >
          Select
        </Button>
      </HStack>

      <Tooltip label="Preview" hasArrow>
        <IconButton
          position="absolute"
          top={1}
          right={1}
          aria-label="preview"
          size="xs"
          icon={<FiEye />}
          onClick={() => {
            fscreen.requestFullscreen(document.querySelector(`.${deckName}`)!)
          }}
        />
      </Tooltip>
    </Box>
  )
}

interface SlideShowProps {
  slides: string
  deckName: string
}

const SlideShow = ({ slides, deckName }: SlideShowProps) => {
  const [deck, setDeck] = useState<any>()
  const slidesRef = useRef() as RefObject<HTMLDivElement>
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    if (slidesRef.current && isHTML(slides))
      slidesRef.current.innerHTML = slides
  }, [slidesRef])

  useEffect(() => {
    //@ts-ignore
    const newDeck = Reveal(document.querySelector(`.${deckName}`), {
      embedded: true,
      keyboardCondition: 'focused',
      plugins: [Markdown, RevealHighlight],
      center: false,
      progress: false,
      controls: false,
    })
    newDeck.initialize().then(() => {
      newDeck.layout()
      newDeck.sync()
      setDeck(newDeck)
    })

    const handleFullScreenChange = () => {
      setIsFullscreen(fscreen.fullscreenElement !== null)
    }

    fscreen.addEventListener('fullscreenchange', handleFullScreenChange)

    return () => {
      newDeck.destroy()
    }
  }, [])

  useEffect(() => {
    if (deck) {
      deck.configure({
        progress: isFullscreen ? true : false,
        controls: isFullscreen ? true : false,
      })
    }
  }, [isFullscreen, deck])

  return (
    <Box w="full" h="full" className="slideshow">
      <Box className={`reveal ${deckName}`}>
        <Box ref={slidesRef} className="slides">
          {!isHTML(slides) && (
            <section data-markdown="" data-separator="---">
              <Textarea data-template defaultValue={slides} />
            </section>
          )}
        </Box>
      </Box>
    </Box>
  )
}
