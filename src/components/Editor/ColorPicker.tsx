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

import { moveableTargetAtom } from '../../store'
import { rgbToHex } from '../../utils'

export default function ColorPicker() {
  const [moveableTarget] = useAtom(moveableTargetAtom)
  const [color, setColor] = useState('')
  const [bgColor, setBgColor] = useState('')
  const isTargetAnElement = moveableTarget instanceof HTMLElement

  useEffect(() => {
    if (isTargetAnElement) {
      setColor(rgbToHex(moveableTarget.style.color))
      setBgColor(rgbToHex(moveableTarget.style.backgroundColor))
    } else {
      setColor('')
      setBgColor('')
    }
  }, [moveableTarget, isTargetAnElement])

  return (
    <Box
      position="absolute"
      top={{ base: -7, md: -9 }}
      right={{ base: 8, md: 12 }}
    >
      <Popover placement="right-end">
        <PopoverTrigger>
          <IconButton
            isDisabled={
              !isTargetAnElement ||
              !['h1', 'h2', 'h3', 'h4', 'h5', 'h5', 'p'].includes(
                moveableTarget.tagName.toLowerCase()
              )
            }
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
                    if (isTargetAnElement) {
                      moveableTarget.style.color = newColor
                      setColor(newColor)
                    }
                  }}
                />
                <HexColorInput
                  color={color}
                  onChange={(newColor) => {
                    if (isTargetAnElement) {
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
                    if (isTargetAnElement) {
                      moveableTarget.style.backgroundColor = newColor
                      setBgColor(newColor)
                    }
                  }}
                />

                <HexColorInput
                  color={bgColor}
                  onChange={(newColor) => {
                    if (isTargetAnElement) {
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
