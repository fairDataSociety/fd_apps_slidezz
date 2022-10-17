import type { NextPage } from 'next'
import { useAtom } from 'jotai'
import { slidesAtom, userAtom } from '../store'
import Login from '../components/Login/Login'
import Layout from '../components/Layout/Layout'
import SlideShowTemplates from '../components/SlideshowTemplates/SlideshowTemplates'
import Editor from '../components/Editor/Editor'

const SlidesPage: NextPage = () => {
  const [user] = useAtom(userAtom)
  const [slides] = useAtom(slidesAtom)

  if (!user) return <Login />

  return <Layout>{slides ? <Editor /> : <SlideShowTemplates />}</Layout>
}

export default SlidesPage
