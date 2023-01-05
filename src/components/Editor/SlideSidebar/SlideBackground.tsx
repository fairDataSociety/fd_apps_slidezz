import { useAtom, useAtomValue } from 'jotai'
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
  Select,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'

import { slidesDeckAtom } from '../../../store'
import { blobToBase64, rgbToHex } from '../../../utils'
import AddImage from './AddImage'
import SlideSidebarItem from './SlideSidebarItem'

interface SlideBgOptions {
  size?: string
  position?: string
}

export default function SlideBackground() {
  const { onOpen, onClose, isOpen } = useDisclosure()
  const deck = useAtomValue(slidesDeckAtom)
  const [currentSlide, setCurrentSlide] = useState<HTMLElement>()
  const [slideBgColor, setSlideBgColor] = useState('')
  const [slideBgImage, setSlideBgImage] = useState('')
  const [slideBgOptions, setSlideBgOptions] = useState<SlideBgOptions>({})

  useEffect(() => {
    if (deck && isOpen) {
      const currentSlide = deck.getCurrentSlide() as HTMLElement
      setCurrentSlide(currentSlide)
      setSlideBgColor(rgbToHex(currentSlide.style.backgroundColor))
      setSlideBgImage(currentSlide.style.backgroundImage.slice(1, -1))
      setSlideBgOptions({
        size: currentSlide.style.backgroundSize,
        position: currentSlide.style.backgroundPosition,
      })
    } else {
      setCurrentSlide(undefined)
      setSlideBgColor('')
      setSlideBgImage('')
      setSlideBgOptions({})
    }
  }, [isOpen, deck])

  return (
    <>
      <SlideSidebarItem
        icon={TbRectangle}
        label="Slide background"
        onClick={onOpen}
      />

      <Modal
        size={{ base: 'sm', md: 'xl' }}
        isCentered
        isOpen={isOpen}
        onClose={onClose}
      >
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
                  <VStack boxSize={{ base: 40, md: 60 }}>
                    <HexColorPicker
                      style={{
                        width: '100%',
                        height: '100%',
                      }}
                      color={slideBgColor}
                      onChange={(newColor) => {
                        currentSlide.style.backgroundColor = newColor
                        setSlideBgColor(newColor)
                      }}
                    />
                    <HexColorInput
                      style={{
                        width: '100%',
                      }}
                      color={slideBgColor}
                      onChange={(newColor) => {
                        currentSlide.style.backgroundColor = newColor
                        setSlideBgColor(newColor)
                      }}
                    />

                    <HStack w="full" justify="space-between">
                      <Text fontSize={{ base: 'sm', md: 'md' }}>
                        Reset to theme
                      </Text>
                      <Button
                        isDisabled={!slideBgColor}
                        onClick={() => {
                          currentSlide.style.backgroundColor = ''
                          setSlideBgColor('')
                        }}
                        size={{ base: 'xs', md: 'sm' }}
                      >
                        Reset
                      </Button>
                    </HStack>
                  </VStack>
                </VStack>

                <VStack>
                  <Text fontSize="lg">Image</Text>
                  <Divider />

                  {slideBgImage && (
                    <HStack gap={2} align="flex-start">
                      <Box
                        boxSize={{ base: 40, md: 60 }}
                        border="solid"
                        borderWidth="1px"
                      >
                        <Image
                          w="full"
                          h="full"
                          alt="slide background"
                          src={slideBgImage.slice(4, -1)}
                          objectFit="contain"
                          backgroundPosition="center"
                        />
                      </Box>

                      <VStack>
                        <Select
                          value={slideBgOptions.size}
                          onChange={(e) => {
                            const size = e.target.value
                            currentSlide.style.backgroundSize = size
                            setSlideBgOptions((prev) => ({ ...prev, size }))
                          }}
                        >
                          <option value="cover">Cover</option>
                          <option value="contain">Contain</option>
                          <option value="original">Orginal</option>
                        </Select>

                        <Select
                          value={slideBgOptions.position}
                          onChange={(e) => {
                            const position = e.target.value
                            currentSlide.style.backgroundPosition = position
                            setSlideBgOptions((prev) => ({ ...prev, position }))
                          }}
                        >
                          <option value="center top">Top</option>
                          <option value="left top">Top Left</option>
                          <option value="right top">Top Right</option>
                          <option value="center center">Center</option>
                          <option value="bottom center">Bottom</option>
                          <option value="left bottom">Bottom Left</option>
                          <option value="right bottom">Bottom Right</option>
                        </Select>
                      </VStack>
                    </HStack>
                  )}

                  <HStack>
                    <AddImage
                      handleAddImage={async (image) => {
                        const backgroundImage =
                          'url(' + (await blobToBase64(image.data)) + ')'

                        currentSlide.style.backgroundImage = backgroundImage
                        currentSlide.style.backgroundRepeat = 'no-repeat'
                        currentSlide.style.backgroundSize = 'cover'
                        currentSlide.style.backgroundPosition = 'center'
                        setSlideBgImage(backgroundImage)
                        setSlideBgOptions({
                          size: 'cover',
                          position: 'center',
                        })
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
