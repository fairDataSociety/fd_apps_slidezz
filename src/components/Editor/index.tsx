import { useAtom } from 'jotai'
import dynamic from 'next/dynamic'

import { Box, Center, Flex, Spinner } from '@chakra-ui/react'

import useTextEditor from '../../hooks/useTextEditor'
import { slidesAtom } from '../../store'
import SideBar from './Sidebar'
import SlideSidebar from './SlideSidebar'
import MenuBar from './TextEditor/MenuBar'

const Slides = dynamic(() => import('./Slides'), {
  ssr: false,
  loading: () => (
    <Center h="full">
      <Spinner size="xl" />
    </Center>
  ),
})

export default function Editor() {
  const [slides] = useAtom(slidesAtom)
  const editor = useTextEditor()

  if (!slides) return null

  return (
    <Flex dir="column" h="100vh">
      <SideBar />
      <MenuBar editor={editor} />

      <Center w="full" h="full">
        <Box overflow="hidden" w="full" h="full">
          <Slides
            key={slides.data}
            deckName="mainDeck"
            editor={editor}
            slides={slides}
          />
        </Box>
      </Center>

      <SlideSidebar />
    </Flex>
  )
}
