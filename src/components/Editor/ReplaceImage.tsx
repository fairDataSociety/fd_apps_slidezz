import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'

import { moveableTargetAtom, replaceImageElementAtom } from '../../store'
import { File } from '../../types'
import { blobToBase64 } from '../../utils'
import AddImageModal from './SlideSidebar/AddImage/AddImageModal'

export function ReplaceImage() {
  const [isOpen, setIsOpen] = useState(true)
  const [_, setMoveableTarget] = useAtom(moveableTargetAtom)
  const [replaceImageElement, setReplaceImageElement] = useAtom(
    replaceImageElementAtom
  )

  const handleReplaceImage = async (image: File) => {
    if (!replaceImageElement) return

    replaceImageElement.src = await blobToBase64(image.data)
    replaceImageElement.alt = image.name
    replaceImageElement.classList.add('fair-data')

    setReplaceImageElement(undefined)
  }

  useEffect(() => {
    setMoveableTarget(undefined)
  }, [])

  return (
    <AddImageModal
      handleAddImage={(image) => handleReplaceImage(image)}
      isOpen={isOpen}
      onClose={() => {
        setReplaceImageElement(undefined)
        setIsOpen(false)
      }}
    />
  )
}
