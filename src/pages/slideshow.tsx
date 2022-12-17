import { useAtom } from 'jotai'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'

import { Box } from '@chakra-ui/react'

import Editor from '../components/Editor'
import Layout from '../components/Layout'
import Login from '../components/Login'
import { slidesAtom, slidesDeckAtom, userAtom } from '../store'

const SlideshowTemplates = dynamic(
  () => import('../components/SlideshowTemplates'),
  {
    ssr: false,
  }
)

const SlideShow: NextPage = () => {
  const [user] = useAtom(userAtom)
  const [slides] = useAtom(slidesAtom)
  const [deck] = useAtom(slidesDeckAtom)

  // if (!user) return <Login />

  return (
    <Layout>
      {slides ? <Editor /> : <SlideshowTemplates />}

      {deck && (
        <Box
          w={deck.getComputedSlideSize().width}
          h={deck.getComputedSlideSize().height}
          className="reveal tmpDeck"
          display="none"
        />
      )}
    </Layout>
  )
}

export default SlideShow
