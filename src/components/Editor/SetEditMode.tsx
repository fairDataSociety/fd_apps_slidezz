import { useAtom } from 'jotai'
import { FaMousePointer } from 'react-icons/fa'
import { RiText } from 'react-icons/ri'

import { HStack, IconButton } from '@chakra-ui/react'

import { editModeAtom } from '../../store'
import { EditMode } from '../../types'

export default function SetEditMode() {
  const [editMode, setEditMode] = useAtom(editModeAtom)

  return (
    <HStack position="absolute" top={{ base: -7, md: -9 }} left={0}>
      <IconButton
        colorScheme="blue"
        variant={editMode === EditMode.MOVE ? 'solid' : 'outline'}
        onClick={() => setEditMode(EditMode.MOVE)}
        size={{ base: 'xs', md: 'sm' }}
        aria-label="mouse"
        icon={<FaMousePointer />}
      />
      <IconButton
        colorScheme="blue"
        variant={editMode === EditMode.TEXT ? 'solid' : 'outline'}
        size={{ base: 'xs', md: 'sm' }}
        onClick={() => setEditMode(EditMode.TEXT)}
        aria-label="text"
        icon={<RiText />}
      />
    </HStack>
  )
}
