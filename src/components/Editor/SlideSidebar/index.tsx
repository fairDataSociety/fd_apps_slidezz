import { useAtom } from 'jotai'
import { BsFillImageFill } from 'react-icons/bs'
import { RiText } from 'react-icons/ri'

import { Box } from '@chakra-ui/react'

import useColors from '../../../hooks/useColors'
import { moveableTargetAtom, slidesDeckAtom } from '../../../store'
import { addImageToCurrentSlide } from '../../../utils'
import AddImage from './AddImage'
import AddText from './AddText'
import AddVideo from './AddVideo'
import NewSlide from './NewSlide'
import RemoveSlide from './RemoveSlide'
import SlideBackground from './SlideBackground'
import SlideSideBarItem from './SlideSidebarItem'

export default function SlideSidebar() {
  const [deck] = useAtom(slidesDeckAtom)
  const [, setMoveableTarget] = useAtom(moveableTargetAtom)
  const { crust } = useColors()

  return (
    <Box
      bg={crust}
      fontSize={{ base: 'xs', md: 'md' }}
      position="absolute"
      borderRadius="lg"
      overflow="hidden"
      top={0}
      right={{ base: -8, md: -16 }}
    >
      <AddText>
        <SlideSideBarItem icon={RiText} label="Text" />
      </AddText>

      <AddImage
        handleAddImage={async (image) =>
          await addImageToCurrentSlide(image, deck, setMoveableTarget)
        }
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
