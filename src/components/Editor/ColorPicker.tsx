import { useAtomValue } from 'jotai'
import { useEffect, useState } from 'react'

import { Button, Input, Wrap, WrapItem } from '@chakra-ui/react'

import { moveableTargetsAtom } from '../../store'
import { rgbToHex } from '../../utils'

export default function ColorPicker() {
  const moveableTargets = useAtomValue(moveableTargetsAtom)
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
    <Wrap>
      <WrapItem>
        <Input
          w="9rem"
          type="color"
          value={bgColor}
          onInput={(event: any) => {
            if (!moveableTarget) return
            const value = event.target.value
            setBgColor(value)
            moveableTarget.style.backgroundColor = value
          }}
          disabled={!moveableTarget}
        />
      </WrapItem>
      <WrapItem>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            if (!moveableTarget) return
            setBgColor('')
            moveableTarget.style.backgroundColor = ''
          }}
          disabled={!moveableTarget}
        >
          unsetBackground
        </Button>
      </WrapItem>
    </Wrap>
  )
}
