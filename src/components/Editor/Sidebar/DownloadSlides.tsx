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

import {
  loadingModalActionAtom,
  moveableTargetsAtom,
  slidesDeckAtom,
  slideshowSettingsAtom,
} from '../../../store'
import { ExportType, currentSlideToImage, slidesToPdf } from '../../../utils'
import SidebarItem from './SidebarItem'

export default function DownloadSlides() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [deck] = useAtom(slidesDeckAtom)
  const [, setMoveableTargets] = useAtom(moveableTargetsAtom)
  const [, loadingModalAction] = useAtom(loadingModalActionAtom)
  const [slideshowSettings] = useAtom(slideshowSettingsAtom)

  return (
    <>
      <SidebarItem
        icon={BsDownload}
        label="Download"
        onClick={() => {
          setMoveableTargets([])
          onOpen()
        }}
      />

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
                  currentSlideToImage(
                    deck,
                    ExportType.JPEG,
                    loadingModalAction,
                    slideshowSettings
                  )
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
                  currentSlideToImage(
                    deck,
                    ExportType.PNG,
                    loadingModalAction,
                    slideshowSettings
                  )
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
                  currentSlideToImage(
                    deck,
                    ExportType.SVG,
                    loadingModalAction,
                    slideshowSettings
                  )
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
                  slidesToPdf(deck, loadingModalAction, slideshowSettings)
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
