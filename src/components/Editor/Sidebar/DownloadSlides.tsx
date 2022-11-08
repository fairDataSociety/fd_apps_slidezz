import { BsDownload } from 'react-icons/bs'

import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'

import { ExportType, currentSlideToImage } from '../../../utils'
import SidebarItem from './SidebarItem'

export default function DownloadSlides() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <SidebarItem icon={BsDownload} label="Download" onClick={onOpen} />

      <Modal size={{ base: 'xs', md: 'sm' }} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Download slides</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack gap={2}>
              <Button
                onClick={() => {
                  currentSlideToImage(ExportType.JPEG)
                  onClose()
                }}
                size="md"
                variant="outline"
              >
                JPEG image(.jpg, current slide)
              </Button>
              <Button
                onClick={() => {
                  currentSlideToImage(ExportType.PNG)
                  onClose()
                }}
                size="md"
                variant="outline"
              >
                PNG image(.png, current slide)
              </Button>
              <Button
                onClick={() => {
                  currentSlideToImage(ExportType.SVG)
                  onClose()
                }}
                size="md"
                variant="outline"
              >
                SVG image(.svg, current slide)
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
