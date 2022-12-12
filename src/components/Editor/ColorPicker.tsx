import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { HexColorInput, HexColorPicker } from 'react-colorful'
import { MdColorLens } from 'react-icons/md'

import {
  Box,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Text,
  VStack,
} from '@chakra-ui/react'

import { moveableTargetsAtom } from '../../store'
import { rgbToHex } from '../../utils'

export default function ColorPicker() {
  const [moveableTargets] = useAtom(moveableTargetsAtom)
  const [color, setColor] = useState('')
  const [bgColor, setBgColor] = useState('')
  const moveableTarget =
    moveableTargets.length === 1 &&
    ['h1', 'h2', 'h3', 'h4', 'h5', 'h5', 'p'].includes(
      moveableTargets[0].tagName.toLowerCase()
    )
      ? moveableTargets[0]
      : undefined

  useEffect(() => {
    if (moveableTarget) {
      setColor(rgbToHex(moveableTarget.style.color))
      setBgColor(rgbToHex(moveableTarget.style.backgroundColor))
    } else {
      setColor('')
      setBgColor('')
    }
  }, [moveableTarget])

  return (
    <Box
      position="absolute"
      top={{ base: -7, md: -9 }}
      right={{ base: 8, md: 12 }}
    >
      <Popover placement="right-end">
        <PopoverTrigger>
          <IconButton
            isDisabled={!moveableTarget}
            colorScheme="blue"
            size={{ base: 'xs', md: 'sm' }}
            aria-label="color"
            icon={<MdColorLens />}
          />
        </PopoverTrigger>
        <PopoverContent w="230px">
          <PopoverArrow />
          <PopoverBody>
            <VStack alignItems="flex-start" gap={2}>
              <VStack>
                <Text>Text Color</Text>
                <HexColorPicker
                  style={{
                    width: '150px',
                    height: '150px',
                  }}
                  color={color}
                  onChange={(newColor) => {
                    if (moveableTarget) {
                      moveableTarget.style.color = newColor
                      setColor(newColor)
                    }
                  }}
                />
                <HexColorInput
                  color={color}
                  onChange={(newColor) => {
                    if (moveableTarget) {
                      moveableTarget.style.color = newColor
                      setColor(newColor)
                    }
                  }}
                />
              </VStack>

              <VStack>
                <Text mb={3}>Background Color</Text>
                <HexColorPicker
                  style={{
                    width: '150px',
                    height: '150px',
                  }}
                  color={bgColor}
                  onChange={(newColor) => {
                    if (moveableTarget) {
                      moveableTarget.style.backgroundColor = newColor
                      setBgColor(newColor)
                    }
                  }}
                />

                <HexColorInput
                  color={bgColor}
                  onChange={(newColor) => {
                    if (moveableTarget) {
                      moveableTarget.style.backgroundColor = newColor
                      setBgColor(newColor)
                    }
                  }}
                />
              </VStack>
            </VStack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  )
}
