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

export default function ColorPicker() {
  const [moveableTarget] = useAtom(moveableTargetAtom)
  const [color, setColor] = useState('')
  const [bgColor, setBgColor] = useState('')

  useEffect(() => {
    if (moveableTarget) {
      setColor(moveableTarget.style.color)
      setColor(moveableTarget.style.backgroundColor)
    }
  }, [moveableTarget])

  return (
    <Box zIndex={100} className="test" position="absolute" top={-9} right={10}>
      <Popover placement="right-end">
        <PopoverTrigger>
          <IconButton
            isDisabled={
              !moveableTarget ||
              !['h1', 'h2', 'h3', 'h4', 'h5', 'h5', 'p'].includes(
                moveableTarget.tagName.toLowerCase()
              )
            }
            colorScheme="blue"
            size="sm"
            aria-label="color"
            icon={<MdColorLens />}
          />
        </PopoverTrigger>
        <PopoverContent>
          <PopoverArrow />
          <PopoverBody>
            <VStack gap={2}>
              <VStack>
                <Text>Text Color</Text>
                <HexColorPicker
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
