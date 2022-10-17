import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  SimpleGrid,
  Box,
  Image,
  Tooltip,
  Button,
} from '@chakra-ui/react'

import ImportFile from '../../../FairDriveImportFile/FairDriveImportFile'
import { File } from '../../../../types'
import { PlusSquareIcon } from '@chakra-ui/icons'
import { useAtom } from 'jotai'
import { imageMediaAtom, mediaAtom } from '../../../../store'

interface AddImageModalProps {
  isOpen: boolean
  onClose: () => void
  handleAddImage: (image: File) => void
}

export default function AddImageModal({
  isOpen,
  onClose,
  handleAddImage,
}: AddImageModalProps) {
  const [media, setMedia] = useAtom(mediaAtom)
  const [images] = useAtom(imageMediaAtom)

  return (
    <Modal
      size={{ base: 'sm', md: '2xl', lg: '4xl' }}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent h="600px">
        <ModalHeader>Select an image</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <SimpleGrid
            overflowY="scroll"
            h="400px"
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={10}
          >
            {images.map((image) => {
              return (
                <Tooltip key={image.name} label={image.name} hasArrow>
                  <Box
                    onClick={() => {
                      handleAddImage(image)
                      onClose()
                    }}
                    mx="auto"
                    cursor="pointer"
                    w="200px"
                    h="200px"
                  >
                    <Image
                      objectFit="cover"
                      src={URL.createObjectURL(image.data)}
                    />
                  </Box>
                </Tooltip>
              )
            })}
          </SimpleGrid>
        </ModalBody>
        <ModalFooter flexDir="row-reverse">
          <ImportFile
            setFile={async (file: File | undefined) => {
              if (file) setMedia([...media, file])
            }}
            allowedExtensions={['png', 'jpg', 'jpeg', 'gif', 'svg']}
          >
            <Button leftIcon={<PlusSquareIcon />}>Import from Fairdrive</Button>
          </ImportFile>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
