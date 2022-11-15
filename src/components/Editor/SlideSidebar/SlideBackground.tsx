import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { HexColorInput, HexColorPicker } from 'react-colorful'
import { TbRectangle } from 'react-icons/tb'

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'

import { slidesDeckAtom } from '../../../store'
import { rgbToHex } from '../../../utils'
import SlideSidebarItem from './SlideSidebarItem'

export default function SlideBackground() {
  const { onOpen, onClose, isOpen } = useDisclosure()
  const [deck] = useAtom(slidesDeckAtom)
  const [currentSlide, setCurrentSlide] = useState<HTMLElement>()
  const [slideBgColor, setSlideBgColor] = useState('')

  useEffect(() => {
    if (deck && isOpen) {
      const currentSlide = deck.getCurrentSlide() as HTMLElement
      setCurrentSlide(currentSlide)
      setSlideBgColor(rgbToHex(currentSlide.style.backgroundColor))
    } else {
      setCurrentSlide(undefined)
      setSlideBgColor('')
    }
  }, [isOpen, deck])

  return (
    <>
      <SlideSidebarItem
        icon={TbRectangle}
        label="Slide background"
        onClick={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Slide background</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {currentSlide && (
              <VStack>
                <VStack>
                  <Text>Color</Text>
                  <HexColorPicker
                    style={{
                      width: '150px',
                      height: '150px',
                    }}
                    color={slideBgColor}
                    onChange={(newColor) => {
                      currentSlide.style.backgroundColor = newColor
                      setSlideBgColor(newColor)
                    }}
                  />
                  <HexColorInput
                    color={slideBgColor}
                    onChange={(newColor) => {
                      currentSlide.style.backgroundColor = newColor
                      setSlideBgColor(newColor)
                    }}
                  />
                </VStack>
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
