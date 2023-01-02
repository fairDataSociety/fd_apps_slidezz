import { atom, useAtom } from 'jotai'
import { useEffect, useState } from 'react'

import { replaceImage } from '../../actions/replaceImage'
import { moveableTargetsAtom } from '../../store'
import AddImageModal from './SlideSidebar/AddImage/AddImageModal'

export const replaceImageElementAtom = atom<HTMLImageElement | undefined>(
  undefined
)

export function ReplaceImage() {
  const [isOpen, setIsOpen] = useState(true)
  const [, setMoveableTargets] = useAtom(moveableTargetsAtom)
  const [replaceImageElement, setReplaceImageElement] = useAtom(
    replaceImageElementAtom
  )

  useEffect(() => {
    setMoveableTargets([])
  }, [])

  return (
    <AddImageModal
      handleAddImage={(image) =>
        replaceImage(image, replaceImageElement, setReplaceImageElement)
      }
      isOpen={isOpen}
      onClose={() => {
        setReplaceImageElement(undefined)
        setIsOpen(false)
      }}
    />
  )
}
