import dynamic from 'next/dynamic'
import { Center, HStack, Spinner, Box } from '@chakra-ui/react'
import SideBar from './Sidebar/Sidebar'
import { useAtom } from 'jotai'
import { slidesAtom } from '../../store'

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

  if (!slides) return null

  return (
    <HStack h="80vh">
      <SideBar />
      <Center w="full" h="full">
        <Box
          w={{ base: '65%', md: '70%', lg: '60%' }}
          h={{ base: '30%', md: '50%', lg: '70%' }}
        >
          <Slides key={slides.data} deckName="mainDeck" slides={slides} />
        </Box>
      </Center>
    </HStack>
  )
}
