export function addMoveableToElements(
  elements: HTMLElement[],
  setMoveableTarget: (target: HTMLElement | undefined) => void
) {
  elements.forEach((element: HTMLElement) => {
    if (
      element.tagName.toLowerCase() === 'div' &&
      !element.classList.contains('iframe-wrapper') &&
      !element.classList.contains('media-container') &&
      !element.classList.contains('sample-image-container') &&
      !element.classList.contains('shape')
    ) {
      return addMoveableToElements(
        Array.from(element.children) as HTMLElement[],
        setMoveableTarget
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
      element.spellcheck = false
    }

    element.addEventListener('click', () => {
      setMoveableTarget(element)
    })
  })
}
