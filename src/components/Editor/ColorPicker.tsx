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
    <Box position="absolute" top={-9} right={10}>
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
