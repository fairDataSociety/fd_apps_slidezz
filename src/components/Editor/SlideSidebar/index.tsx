import { useAtom, useAtomValue } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'
import dynamic from 'next/dynamic'
import { BsFillImageFill } from 'react-icons/bs'
import { RiText } from 'react-icons/ri'

import { Box } from '@chakra-ui/react'

import { addImageToCurrentSlide } from '../../../actions/addImageToCurrentSlide'
import useColors from '../../../hooks/useColors'
import {
  addHistoryActionAtom,
  moveableTargetsAtom,
  slidesDeckAtom,
} from '../../../store'
import AddImage from './AddImage'
import AddText from './AddText'
import AddVideo from './AddVideo'
import RemoveSlide from './RemoveSlide'
import SlideBackground from './SlideBackground'
import SlideSideBarItem from './SlideSidebarItem'

const NewSlide = dynamic(() => import('./NewSlide'), { ssr: false })

export default function SlideSidebar() {
  const deck = useAtomValue(slidesDeckAtom)
  const setMoveableTargets = useUpdateAtom(moveableTargetsAtom)
  const addHistoryAction = useUpdateAtom(addHistoryActionAtom)
  const { crust } = useColors()

  return (
    <Box bg={crust} fontSize="lg" h="full" w="4rem">
      <AddText>
        <SlideSideBarItem icon={RiText} label="Text" />
      </AddText>

      <AddImage
        handleAddImage={async (image) => {
          if (!deck) return
          await addImageToCurrentSlide(
            image,
            deck,
            setMoveableTargets,
            addHistoryAction
          )
        }}
      >
        <SlideSideBarItem icon={BsFillImageFill} label="Image" />
      </AddImage>
      <AddVideo />
      <SlideBackground />
      <RemoveSlide />
      <NewSlide />
    </Box>
  )
}
