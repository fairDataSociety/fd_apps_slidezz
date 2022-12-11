export function addMoveableToElements(
  elements: HTMLElement[],
  setMoveableTarget: (target: HTMLElement | undefined) => void
) {
  elements.forEach((element: HTMLElement) => {
    if (
      element.tagName.toLowerCase() === 'div' &&
      !element.classList.contains('container')
    ) {
      return addMoveableToElements(
        Array.from(element.children) as HTMLElement[],
        setMoveableTarget
      )
    }

    const textElements = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p']

    if (textElements.includes(element.tagName.toLowerCase())) {
      element.spellcheck = false
    }

    element.addEventListener('click', () => {
      setMoveableTarget(element)
    })
  })
}
