import { useAtom } from 'jotai'
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

import { slidesDeckAtom } from '../../../store'
import { ExportType, currentSlideToImage, slidesToPdf } from '../../../utils'
import SidebarItem from './SidebarItem'

export default function DownloadSlides() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [deck] = useAtom(slidesDeckAtom)
  return (
    <>
      <SidebarItem icon={BsDownload} label="Download" onClick={onOpen} />

      <Modal size={{ base: 'xs', md: 'sm' }} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Download slides</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack w={{ base: 'full', md: '80%' }} mx="auto" gap={2}>
              <Button
                w="full"
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
                w="full"
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
                w="full"
                onClick={() => {
                  currentSlideToImage(ExportType.SVG)
                  onClose()
                }}
                size="md"
                variant="outline"
              >
                SVG image(.svg, current slide)
              </Button>
              <Button
                w="full"
                size="md"
                variant="outline"
                onClick={() => {
                  slidesToPdf(deck)
                  onClose()
                }}
              >
                PDF document(.pdf)
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
