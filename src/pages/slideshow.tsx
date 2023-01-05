import { useAtomValue } from 'jotai'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

import { Box } from '@chakra-ui/react'

import Editor from '../components/Editor'
import Login from '../components/Login'
import Navbar from '../components/Navbar'
import { slidesAtom, slidesDeckAtom, userAtom } from '../store'

const SlideshowTemplates = dynamic(
  () => import('../components/SlideshowTemplates'),
  {
    ssr: false,
  }
)

const SlideShow: NextPage = () => {
  const user = useAtomValue(userAtom)
  const slides = useAtomValue(slidesAtom)
  const deck = useAtomValue(slidesDeckAtom)

  if (!user) return <Login />

  return (
    <>
      {slides ? (
        <Editor />
      ) : (
        <>
          <Navbar />
          <SlideshowTemplates />
        </>
      )}
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

export default SlideShow
