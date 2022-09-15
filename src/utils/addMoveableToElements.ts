export function addMoveableToElements(
  elements: HTMLElement[],
  setMoveableTarget: (target: HTMLElement | undefined) => void,
  setReplaceImageElement?: (target: HTMLImageElement | undefined) => void
) {
  elements.forEach((element: HTMLElement) => {
    if (
      element.tagName.toLowerCase() === 'div' &&
      !element.classList.contains('iframe-wrapper') &&
      !element.classList.contains('media-container') &&
      !element.classList.contains('sample-image-container')
    ) {
      return addMoveableToElements(
        Array.from(element.children) as HTMLElement[],
        setMoveableTarget,
        setReplaceImageElement
      )
    }

    if (
      ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p'].includes(
        element.tagName.toLowerCase()
      )
    ) {
      element.addEventListener('mousedown', (e) => {
        e.preventDefault()
      })
      element.contentEditable = 'true'
    }

    if (element.tagName.toLowerCase() === 'img' && setReplaceImageElement) {
      element.addEventListener('dblclick', () => {
        setReplaceImageElement(element as HTMLImageElement)
      })
    }

    if (
      (element.classList.contains('media-container') ||
        element.classList.contains('sample-image-container')) &&
      setReplaceImageElement
    ) {
      element.addEventListener('dblclick', () => {
        setReplaceImageElement(element.firstChild as HTMLImageElement)
      })
    }

    element.addEventListener('click', () => {
      setMoveableTarget(element)
    })

    element.style.cursor = 'pointer'
  })
}
