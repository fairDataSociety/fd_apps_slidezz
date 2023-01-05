import { useAtom, useAtomValue } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { Box, Center, HStack, Spinner } from '@chakra-ui/react'

import { importSharedSlides } from '../actions/importSharedSlides'
import SideBar from '../components/Editor/Sidebar'
import Login from '../components/Login'
import Navbar from '../components/Navbar'
import {
  fdpAtom,
  slidesAtom,
  slidesDeckAtom,
  slidesLogoAtom,
  userAtom,
} from '../store'

const SharedSlideshow = dynamic(() => import('../components/SharedSlideshow'), {
  ssr: false,
  loading: () => (
    <Center h="full">
      <Spinner size="xl" />
    </Center>
  ),
})

const EmbedSlideshow = dynamic(() => import('../components/EmbedSlideshow'), {
  ssr: false,
  loading: () => (
    <Center h="full">
      <Spinner size="xl" />
    </Center>
  ),
})

const SharedSlideshowPage: NextPage = () => {
  const router = useRouter()
  const fdp = useAtomValue(fdpAtom)
  const setSlidesLogo = useUpdateAtom(slidesLogoAtom)
  const [slides, setSlides] = useAtom(slidesAtom)
  const [isEmbed, setIsEmbed] = useState(false)
  const user = useAtomValue(userAtom)
  const deck = useAtomValue(slidesDeckAtom)

  useEffect(() => {
    if (router.isReady && (fdp || user)) {
      const slidesShareRef = router.query.ref as string
      const isEmbed = typeof router.query.embed === 'string'

      setIsEmbed(isEmbed)
      importSharedSlides(slidesShareRef, setSlides, setSlidesLogo, fdp, user)
    }
  }, [
    router.isReady,
    fdp,
    user,
    router.query.ref,
    router.query.embed,
    setSlides,
    setSlidesLogo,
  ])

  if (!fdp && !user) return <Login />

  if (!slides)
    return (
      <Center h="100vh" w="full">
        <Spinner size="xl" />
      </Center>
    )

  if (isEmbed) return <EmbedSlideshow slides={slides} />

  return (
    <>
      <Navbar />
      <HStack h="80vh">
        <SideBar isSlidesReadOnly={true} />
        <Center h="full" w="full">
          <Box
            w={{ base: '65%', md: '70%', lg: '60%' }}
            h={{ base: '30%', md: '50%', lg: '70%' }}
          >
            <SharedSlideshow slides={slides} />
          </Box>
        </Center>
      </HStack>
      {deck && (
        <Box
          //@ts-ignore
          w={deck.getComputedSlideSize().width}
          //@ts-ignore
          h={deck.getComputedSlideSize().height}
          className="reveal tmpDeck"
          display="none"
        />
      )}
    </>
  )
}

export default SharedSlideshowPage
