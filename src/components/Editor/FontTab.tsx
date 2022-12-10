import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { RiFontSize } from 'react-icons/ri'

import {
  Box,
  FormControl,
  FormLabel,
  IconButton,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverContent,
  PopoverTrigger,
  Select,
  SimpleGrid,
} from '@chakra-ui/react'

import { moveableTargetAtom } from '../../store'

export default function FontTab() {
  const [moveableTarget] = useAtom(moveableTargetAtom)
  const [fontSize, setFontSize] = useState('')
  const [textAlign, setTextAlign] = useState('')
  const [textDecoration, setTextDecoration] = useState('')
  const [fontStyle, setFontStyle] = useState('')
  const [fontWeight, setFontWeight] = useState('')
  const isTargetAnElement = moveableTarget instanceof HTMLElement

  useEffect(() => {
    if (isTargetAnElement) {
      setTextAlign(moveableTarget.style.textAlign)
      setTextDecoration(moveableTarget.style.textDecoration)
      setFontStyle(moveableTarget.style.fontStyle)
      setFontSize(moveableTarget.style.fontSize.replace(/px/, ''))
      setFontWeight(moveableTarget.style.fontWeight)
    }
  }, [moveableTarget, isTargetAnElement])

  return (
    <Box
      className="test"
      position="absolute"
      top={{ base: -7, md: -9 }}
      right={0}
    >
      <Popover placement="left-end">
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
            aria-label="font"
            icon={<RiFontSize />}
          />
        </PopoverTrigger>
        <PopoverContent w={{ base: '15rem', md: '20rem' }}>
          <PopoverArrow />
          <PopoverBody>
            <SimpleGrid columns={2} spacing={2}>
              <FormControl>
                <FormLabel fontSize={{ base: 'xs', md: 'md' }}>
                  font-size
                </FormLabel>
                <NumberInput
                  value={fontSize}
                  onChange={(valueString) => {
                    if (isTargetAnElement) {
                      moveableTarget.style.fontSize = valueString + 'px'
                      setFontSize(valueString)
                    }
                  }}
                  size="sm"
                  min={0}
                >
                  <NumberInputField />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <FormControl>
                <FormLabel fontSize={{ base: 'xs', md: 'md' }}>
                  text-align
                </FormLabel>
                <Select
                  value={textAlign}
                  onChange={(e) => {
                    if (isTargetAnElement && e.target.value !== '') {
                      const newValue = e.target.value
                      moveableTarget.style.textAlign = newValue
                      setTextAlign(newValue)
                    }
                  }}
                  size="sm"
                >
                  <option selected value=""></option>
                  <option value="left">left</option>
                  <option value="center">center</option>
                  <option value="right">right</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel fontSize={{ base: 'xs', md: 'md' }}>
                  text-decoration
                </FormLabel>
                <Select
                  value={textDecoration}
                  onChange={(e) => {
                    if (isTargetAnElement && e.target.value !== '') {
                      const newValue = e.target.value
                      moveableTarget.style.textDecoration = newValue
                      setTextDecoration(newValue)
                    }
                  }}
                  size="sm"
                >
                  <option selected value=""></option>
                  <option value="none">none</option>
                  <option value="underline">underline</option>
                  <option value="overline">overline</option>
                  <option value="line-through">line-through</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel fontSize={{ base: 'xs', md: 'md' }}>
                  font-style
                </FormLabel>
                <Select
                  value={fontStyle}
                  onChange={(e) => {
                    if (isTargetAnElement && e.target.value !== '') {
                      const newValue = e.target.value
                      moveableTarget.style.fontStyle = newValue
                      setFontStyle(newValue)
                    }
                  }}
                  size="sm"
                >
                  <option selected value=""></option>
                  <option value="normal">normal</option>
                  <option value="italic">italic</option>
                </Select>
              </FormControl>

              <FormControl>
                <FormLabel fontSize={{ base: 'xs', md: 'md' }}>
                  font-weight
                </FormLabel>
                <Select
                  value={fontWeight}
                  onChange={(e) => {
                    if (isTargetAnElement && e.target.value !== '') {
                      const newValue = e.target.value
                      moveableTarget.style.fontWeight = newValue
                      setFontWeight(newValue)
                    }
                  }}
                  size="sm"
                >
                  <option selected value=""></option>
                  <option value="200">200</option>
                  <option value="300">300</option>
                  <option value="400">400</option>
                  <option value="600">600</option>
                  <option value="700">700</option>
                </Select>
              </FormControl>
            </SimpleGrid>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Box>
  )
}
