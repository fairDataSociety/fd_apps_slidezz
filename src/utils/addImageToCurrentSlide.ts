import { File } from '../types'
import { blobToBase64 } from './blobToBase64'

export async function addImageToCurrentSlide(
  image: File,
  deck: any,
  setMoveableTarget: (target: HTMLElement | undefined) => void
) {
  const currentSlideIndex = deck.getState().indexh
  const slide = deck.getSlides()[currentSlideIndex]

  const imageContainer = document.createElement('div')
  imageContainer.classList.add('media-container')

  const imageElement = document.createElement('img')
  imageElement.src = await blobToBase64(image.data)
  imageElement.alt = image.name
  imageElement.classList.add('fair-data')
  imageContainer.style.cursor = 'pointer'

  imageContainer.appendChild(imageElement)

  imageContainer.onclick = () => {
    setMoveableTarget(imageContainer)
  }

  slide.appendChild(imageContainer)
  deck.sync()
  deck.layout()
  setMoveableTarget(imageContainer)
}
