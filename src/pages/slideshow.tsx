import { useAtom } from 'jotai'
import type { NextPage } from 'next'

import { Box } from '@chakra-ui/react'

import Editor from '../components/Editor'
import Layout from '../components/Layout'
import Login from '../components/Login'
import SlideshowTemplates from '../components/SlideshowTemplates'
import { slidesAtom, userAtom } from '../store'

const SlideShow: NextPage = () => {
  const [user] = useAtom(userAtom)
  const [slides] = useAtom(slidesAtom)

  if (!user) return <Login />

  return (
    <Layout>
      {slides ? <Editor /> : <SlideshowTemplates />}

      <Box minW="100vw" minH="100vh" className="reveal tmpDeck" />
    </Layout>
  )
}

export default SlideShow
