import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { moveableTargetAtom, replaceImageElementAtom } from '../../store'
import { File } from '../../types'
import AddImageModal from './SlideSidebar/AddImage/AddImageModal'

export function ReplaceImage() {
  const [isOpen, setIsOpen] = useState(true)
  const [_, setMoveableTarget] = useAtom(moveableTargetAtom)
  const [replaceImageElement, setReplaceImageElement] = useAtom(
    replaceImageElementAtom
  )

  const handleReplaceImage = (image: File) => {
    if (!replaceImageElement) return

    replaceImageElement.src = URL.createObjectURL(image.data)
    replaceImageElement.alt = image.name

    replaceImageElement.setAttribute('data-pod', image.podName)
    replaceImageElement.setAttribute('data-path', image.fullPath)
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
