import { File } from '../types'
import { blobToBase64 } from '../utils'

export async function replaceImage(
  image: File,
  replaceImageElement: HTMLImageElement | undefined,
  setReplaceImageElement: (
    replaceImageElement: HTMLImageElement | undefined
  ) => void
) {
  if (!replaceImageElement) return

  replaceImageElement.src = await blobToBase64(image.data)
  replaceImageElement.alt = image.name

  setReplaceImageElement(undefined)
}
