export function parseElements(elements: HTMLElement[]) {
  for (const element of elements) {
    if (['img', 'video', 'iframe'].includes(element.tagName.toLowerCase())) {
      element.parentElement?.classList.add('container')
    }
    parseElements(Array.from(element.children) as HTMLElement[])
  }
}
