import { useAtom } from 'jotai'
import { BsImageAlt } from 'react-icons/bs'

import {
  Box,
  Button,
  Center,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'

import { slidesLogoAtom } from '../../../store'
import { File } from '../../../types'
import { blobToBase64 } from '../../../utils'
import AddImage from '../SlideSidebar/AddImage'
import SideBarItem from './SidebarItem'

export default function LogoImage() {
  const [slidesLogo, setSlidesLogo] = useAtom(slidesLogoAtom)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const handleAddSlidesLogo = async (image: File) =>
    setSlidesLogo({
      data: await blobToBase64(image.data),
    })

  return (
    <>
      {slidesLogo ? (
        <>
          <SideBarItem
            onClick={onOpen}
            icon={BsImageAlt}
            label="Logo/Copyright image"
          />

          <Modal
            size={{ base: 'xs', md: 'md' }}
            isOpen={isOpen}
            onClose={onClose}
          >
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Logo/Copyright image</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Center mx="auto" maxW="300px" maxH="300px">
                  <Image
                    alt="logo-image"
                    objectFit="contain"
                    w="full"
                    h="full"
                    src={slidesLogo.data}
                  />
                </Center>
              </ModalBody>
              <ModalFooter>
                <VStack align="stretch" w="full">
                  <AddImage
                    handleAddImage={(image) => handleAddSlidesLogo(image)}
                  >
                    <Button w="full">Change slides logo</Button>
                  </AddImage>

                  <Button
                    variant="outline"
                    onClick={() => {
                      setSlidesLogo(undefined)
                      onClose()
                    }}
                  >
                    Remove slides logo
                  </Button>
                </VStack>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </>
      ) : (
        <AddImage handleAddImage={(image) => handleAddSlidesLogo(image)}>
          <SideBarItem icon={BsImageAlt} label="Logo/Copyright image" />
        </AddImage>
      )}
    </>
  )
}
