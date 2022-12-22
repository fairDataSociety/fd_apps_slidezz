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
  const [bgColor, setBgColor] = useState('')
  const moveableTarget =
    moveableTargets.length === 1 ? moveableTargets[0] : undefined

  useEffect(() => {
    if (moveableTarget) {
      setBgColor(rgbToHex(moveableTarget.style.backgroundColor))
    } else {
      setBgColor('')
    }
  }, [moveableTarget])

  return (
    <Popover placement="bottom-end">
      <PopoverTrigger>
        <IconButton
          isDisabled={!moveableTarget}
          size="sm"
          variant="outline"
          aria-label="color"
          icon={<MdColorLens />}
        />
      </PopoverTrigger>
      <PopoverContent w="230px">
        <PopoverArrow />
        <PopoverBody>
          <VStack alignItems="flex-start" gap={2}>
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
  )
}
