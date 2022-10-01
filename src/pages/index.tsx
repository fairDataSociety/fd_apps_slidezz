import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import {
  Center,
  HStack,
  Spinner,
  Box,
  Heading,
  Button,
  VStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuDivider,
} from '@chakra-ui/react'
import SideBar from '../components/SideBar/SideBar'
import { useAtom } from 'jotai'
import { slidesAtom, slidesDeckAtom, slidesLogoAtom, userAtom } from '../store'
import { AiOutlineFileMarkdown } from 'react-icons/ai'
import { MdSlideshow } from 'react-icons/md'
import ImportFile from '../components/ImportFile/ImportFile'
import { File } from '../types'
import { loadSlideshow } from '../utils'
import NavBar from '../components/NavBar/NavBar'
import Login from '../components/Login/Login'

const SlideShow = dynamic(() => import('../components/SlideShow/SlideShow'), {
  ssr: false,
  loading: () => (
    <Center h="full">
      <Spinner size="xl" />
    </Center>
  ),
})

const Home: NextPage = () => {
  const [deck, setDeck] = useAtom(slidesDeckAtom)
  const [slides, setSlides] = useAtom(slidesAtom)
  const [slidesLogo, setSlidesLogo] = useAtom(slidesLogoAtom)
  const [user] = useAtom(userAtom)

  if (!user) return <Login />

  return (
    <>
      <NavBar />
      <HStack h="80vh">
        {slides && <SideBar />}

        <Center w="full" h="full">
          {slides ? (
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
          ) : (
            <VStack
              h="30rem"
              gap={10}
              justify={{ base: 'center', md: 'flex-start' }}
            >
              <Heading fontSize={{ base: '2rem', sm: '3rem', md: '5rem' }}>
                Make a slideshow
              </Heading>
              <Menu>
                <MenuButton as={Button}>New Slideshow</MenuButton>
                <MenuList>
                  <MenuItem
                    onClick={() => {
                      setSlides({ data: '## Slide 1' })
                    }}
                  >
                    Blank Slideshow
                  </MenuItem>
                  <MenuDivider />
                  <MenuGroup title="Select a Slideshow Template">
                    <ImportFile
                      setFile={async (file: File | undefined) => {
                        if (file) setSlides({ data: await file.data.text() })
                      }}
                      allowedExtensions={['md']}
                    >
                      <MenuItem icon={<AiOutlineFileMarkdown />}>
                        Select a Markdown File
                      </MenuItem>
                    </ImportFile>

                    <ImportFile
                      setFile={async (file: File | undefined) => {
                        await loadSlideshow(file, setSlides, setSlidesLogo)
                      }}
                      allowedExtensions={['html']}
                      initialPod={process.env.NEXT_PUBLIC_SLIDES_POD}
                    >
                      <MenuItem icon={<MdSlideshow />}>My Slideshows</MenuItem>
                    </ImportFile>
                  </MenuGroup>
                </MenuList>
              </Menu>
            </VStack>
          )}
        </Center>
      </HStack>
    </>
  )
}

export default Home
