import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { Center, HStack, Spinner, Box } from '@chakra-ui/react'
import SideBar from '../components/SideBar/SideBar'
import { useAtom } from 'jotai'
import { slidesAtom, slidesDeckAtom, userAtom } from '../store'
import Login from '../components/Login/Login'
import Layout from '../components/Layout/Layout'
import SlideShowTemplates from '../components/SlideShowTemplates/SlideShowTemplates'

const SlideShow = dynamic(() => import('../components/SlideShow/SlideShow'), {
  ssr: false,
  loading: () => (
    <Center h="full">
      <Spinner size="xl" />
    </Center>
  ),
})

const HomePage: NextPage = () => {
  const [deck, setDeck] = useAtom(slidesDeckAtom)
  const [slides] = useAtom(slidesAtom)
  const [user] = useAtom(userAtom)

  if (!user) return <Login />

  return (
    <Layout>
      {slides ? (
        <HStack h="80vh">
          <SideBar />
          <Center w="full" h="full">
            <Box
              w={{ base: '65%', md: '70%', lg: '60%' }}
              h={{ base: '30%', md: '50%', lg: '70%' }}
            >
              <SlideShow
                key={slides.data}
                deckName="mainDeck"
                deck={deck}
                setDeck={setDeck}
                slides={slides}
              />
            </Box>
          </Center>
        </HStack>
      ) : (
        <SlideShowTemplates />
      )}
    </Layout>
  )
}

export default HomePage
