import { File } from '../types'

export function addImageToCurrentSlide(
  image: File,
  deck: any,
  setMoveableTarget: (target: HTMLElement | undefined) => void,
  setReplaceImageElement?: (target: HTMLImageElement | undefined) => void
) {
  const currentSlideIndex = deck.getState().indexh
  const slide = deck.getSlides()[currentSlideIndex]

  const imageContainer = document.createElement('div')
  imageContainer.classList.add('media-container')

  const imageElement = document.createElement('img')
  imageElement.src = URL.createObjectURL(image.data)
  imageElement.alt = image.name
  imageElement.setAttribute('data-pod', image.podName)
  imageElement.setAttribute('data-path', image.fullPath)
  imageElement.classList.add('fair-data')
  imageContainer.style.cursor = 'pointer'

  imageContainer.appendChild(imageElement)

  imageContainer.addEventListener('click', () => {
    setMoveableTarget(imageContainer)
  })

  if (setReplaceImageElement) {
    imageContainer.addEventListener('dblclick', () => {
      setReplaceImageElement(imageElement)
    })
  }

  slide.appendChild(imageContainer)
  deck.sync()
  deck.layout()
  setMoveableTarget(imageContainer)
}
