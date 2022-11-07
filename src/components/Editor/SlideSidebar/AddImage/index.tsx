import { Box, useDisclosure } from '@chakra-ui/react'

import { File } from '../../../../types'
import AddImageModal from './AddImageModal'

interface AddImageProps {
  children?: React.ReactNode
  handleAddImage: (image: File) => void
}

export default function AddImage({ children, handleAddImage }: AddImageProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Box onClick={onOpen}>{children}</Box>
      <AddImageModal
        isOpen={isOpen}
        onClose={onClose}
        handleAddImage={handleAddImage}
      />
    </>
  )
}
