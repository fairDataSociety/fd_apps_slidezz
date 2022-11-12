import { useAtom } from 'jotai'
import { useState } from 'react'

import {
  FormControl,
  FormLabel,
  HStack,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Select,
  VStack,
} from '@chakra-ui/react'

import { slideThemes } from '../../../../config/slide-themes'
import { slidesAtom } from '../../../../store'
import CopyPanel from './CopyPanel'

export default function EmbedCode() {
  const [slides] = useAtom(slidesAtom)
  const [width, setWidth] = useState(576)
  const [height, setHeight] = useState(420)
  const [style, setStyle] = useState('white')

  const baseHref = document.querySelector('base')!.href
  const pageName =
    process.env.NODE_ENV === 'production'
      ? 'shared-slideshow.html'
      : 'shared-slideshow'
  const embedURL = `${baseHref}${pageName}?ref=${slides?.sharingInfo?.sharedRef}&embed=true&theme=${style}`
  const embedCode = `<iframe src="${embedURL}" width="${width}" height="${height}"></iframe>`

  return (
    <VStack align="stretch">
      <HStack gap={5}>
        <FormControl>
          <FormLabel>Width:</FormLabel>
          <NumberInput
            min={0}
            value={width}
            onChange={(_, value) => setWidth(value)}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>

        <FormControl>
          <FormLabel>Height:</FormLabel>
          <NumberInput
            min={0}
            value={height}
            onChange={(_, value) => setHeight(value)}
          >
            <NumberInputField />
            <NumberInputStepper>
              <NumberIncrementStepper />
              <NumberDecrementStepper />
            </NumberInputStepper>
          </NumberInput>
        </FormControl>
        <FormControl>
          <FormLabel>Style:</FormLabel>
          <Select
            onChange={(e) => {
              setStyle(e.target.value)
            }}
          >
            {Object.keys(slideThemes).map((theme, i) => (
              <option key={i} value={theme}>
                {theme}
              </option>
            ))}
          </Select>
        </FormControl>
      </HStack>

      <CopyPanel label="Embed Code" text={embedCode} />
    </VStack>
  )
}
