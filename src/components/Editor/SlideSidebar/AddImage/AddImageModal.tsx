import { useAtom, useAtomValue } from 'jotai'

import { PlusSquareIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Tooltip,
} from '@chakra-ui/react'

import { imageMediaAtom, mediaAtom } from '../../../../store'
import { File } from '../../../../types'
import ImportFile from '../../../FairDriveImportFile'

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
  const images = useAtomValue(imageMediaAtom)

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
                      alt={image.name}
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
