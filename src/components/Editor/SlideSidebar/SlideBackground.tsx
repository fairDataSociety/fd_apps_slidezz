import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { HexColorInput, HexColorPicker } from 'react-colorful'
import { TbRectangle } from 'react-icons/tb'

import {
  Box,
  Button,
  Divider,
  HStack,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  NumberInput,
  NumberInputField,
  Select,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'

import { slidesDeckAtom } from '../../../store'
import { blobToBase64, rgbToHex } from '../../../utils'
import AddImage from './AddImage'
import SlideSidebarItem from './SlideSidebarItem'

export default function SlideBackground() {
  const { onOpen, onClose, isOpen } = useDisclosure()
  const [deck] = useAtom(slidesDeckAtom)
  const [currentSlide, setCurrentSlide] = useState<HTMLElement>()
  const [slideBgColor, setSlideBgColor] = useState('')
  const [slideBgImage, setSlideBgImage] = useState('')

  useEffect(() => {
    if (deck && isOpen) {
      const currentSlide = deck.getCurrentSlide() as HTMLElement
      setCurrentSlide(currentSlide)
      setSlideBgColor(rgbToHex(currentSlide.style.backgroundColor))
      setSlideBgImage(currentSlide.style.backgroundImage.slice(1, -1))
    } else {
      setCurrentSlide(undefined)
      setSlideBgColor('')
      setSlideBgImage('')
    }
  }, [isOpen, deck])

  return (
    <>
      <SlideSidebarItem
        icon={TbRectangle}
        label="Slide background"
        onClick={onOpen}
      />

      <Modal size="4xl" isCentered isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Slide background</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {currentSlide && (
              <VStack>
                <VStack>
                  <Text fontSize="lg">Color</Text>
                  <Divider />
                  <HexColorPicker
                    style={{
                      width: '250px',
                      height: '250px',
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

                <VStack>
                  <Text fontSize="lg">Image</Text>
                  <Divider />

                  {slideBgImage && (
                    <HStack gap={2} align="flex-start">
                      <Box w="250px" h="250px" border="solid" borderWidth="1px">
                        <Image
                          w="full"
                          h="full"
                          alt="slide background"
                          src={slideBgImage.slice(4, -1)}
                          objectFit="cover"
                          backgroundPosition="center"
                        />
                      </Box>

                      <VStack>
                        <Select>
                          <option value="cover">Cover</option>
                          <option value="contain">Contain</option>
                          <option value="original">Orginal</option>
                        </Select>

                        <Select placeholder="Select option">
                          <option value="option1">Option 1</option>
                          <option value="option2">Option 2</option>
                          <option value="option3">Option 3</option>
                        </Select>

                        <NumberInput defaultValue={15} min={10} max={20}>
                          <NumberInputField />
                        </NumberInput>
                      </VStack>
                    </HStack>
                  )}

                  <HStack>
                    <AddImage
                      handleAddImage={async (image) => {
                        const backgroundImage =
                          'url(' + (await blobToBase64(image.data)) + ')'

                        currentSlide.style.backgroundImage = backgroundImage
                        currentSlide.style.backgroundSize = 'cover'
                        currentSlide.style.backgroundPosition = 'center'
                        setSlideBgImage(backgroundImage)
                      }}
                    >
                      <Button variant="outline" size="md" w="full">
                        {slideBgImage ? 'Replace image' : 'Choose image'}
                      </Button>
                    </AddImage>
                    {slideBgImage && (
                      <Button
                        size="md"
                        onClick={() => {
                          currentSlide.style.backgroundImage = ''
                          setSlideBgImage('')
                        }}
                      >
                        Remove image
                      </Button>
                    )}
                  </HStack>
                </VStack>
              </VStack>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
