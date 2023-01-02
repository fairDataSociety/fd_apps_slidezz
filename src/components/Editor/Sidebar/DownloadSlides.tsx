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
  ExportType,
  currentSlideToImage,
  slidesToPdf,
} from '../../../actions/exportSlides'
import {
  loadingModalSetActionAtom,
  moveableTargetsAtom,
  slidesDeckAtom,
  slideshowSettingsAtom,
} from '../../../store'
import SidebarItem from './SidebarItem'

export default function DownloadSlides() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [deck] = useAtom(slidesDeckAtom)
  const [, setMoveableTargets] = useAtom(moveableTargetsAtom)
  const [, loadingModalSetAction] = useAtom(loadingModalSetActionAtom)
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
                  if (!deck) return
                  currentSlideToImage(
                    deck,
                    ExportType.JPEG,
                    loadingModalSetAction,
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
                  if (!deck) return

                  currentSlideToImage(
                    deck,
                    ExportType.PNG,
                    loadingModalSetAction,
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
                  if (!deck) return

                  currentSlideToImage(
                    deck,
                    ExportType.SVG,
                    loadingModalSetAction,
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
                  if (!deck) return
                  slidesToPdf(deck, loadingModalSetAction, slideshowSettings)
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
