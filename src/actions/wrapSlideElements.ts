export function wrapSlideElements(elements: HTMLElement[]) {
  for (const element of elements) {
    if (!element.classList.contains('container')) {
      const newElemet = `<div class="container">${element.outerHTML}</div>`
      element.outerHTML = newElemet
    }
  }
}
