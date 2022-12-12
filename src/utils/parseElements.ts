export function parseElements(elements: HTMLElement[]) {
  for (const element of elements) {
    if (['img', 'video', 'iframe'].includes(element.tagName.toLowerCase())) {
      element.parentElement?.classList.add('container')
    }

    const textElements = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p']

    if (textElements.includes(element.tagName.toLowerCase())) {
      element.spellcheck = false
      element.contentEditable = 'false'

      element.addEventListener('blur', () => {
        element.contentEditable = 'false'
      })
    }

    parseElements(Array.from(element.children) as HTMLElement[])
  }
}
