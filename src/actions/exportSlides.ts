import download from 'downloadjs'
import { toJpeg, toPng, toSvg } from 'html-to-image'
import { jsPDF } from 'jspdf'
import Reveal from 'reveal.js'

import { LoadingModalSetAction, SlideshowSettings } from '../types'

export enum ExportType {
  JPEG,
  PNG,
  SVG,
}

const convetorFunction: {
  [exportType in ExportType]: typeof toJpeg | typeof toPng | typeof toSvg
} = {
  [ExportType.JPEG]: toJpeg,
  [ExportType.PNG]: toPng,
  [ExportType.SVG]: toSvg,
}

const extension: { [exportType in ExportType]: string } = {
  [ExportType.JPEG]: 'jpg',
  [ExportType.PNG]: 'png',
  [ExportType.SVG]: 'svg',
}

export async function currentSlideToImage(
  deck: Reveal.Api,
  exportType: ExportType,
  loadingModalSetAction: LoadingModalSetAction,
  slideshowSettings: SlideshowSettings
) {
  loadingModalSetAction({
    action: 'start',
    message: 'Converting current slide to image',
  })
  //@ts-ignore
  const { width, height } = deck.getComputedSlideSize()
  const tmpDeckElement = document.querySelector('.tmpDeck') as HTMLElement

  const tmpDeck = await generateTmpDeck(
    deck,
    tmpDeckElement,
    width,
    height,
    slideshowSettings
  )

  const currentSlide = tmpDeck.getRevealElement() as HTMLElement

  const convertor = convetorFunction[exportType]

  const image = await convertor(currentSlide, {
    filter: (node) => {
      return node.classList
        ? !node.classList.contains('controls') &&
            !node.classList.contains('progress')
        : true
    },
    width,
    height,
  })

  tmpDeckElement.style.display = 'none'
  download(image, `slide.${extension[exportType]}`)
  loadingModalSetAction({ action: 'stop' })
}

export async function slidesToPdf(
  deck: Reveal.Api,
  loadingModalSetAction: LoadingModalSetAction,
  slideshowSettings: SlideshowSettings
) {
  loadingModalSetAction({
    action: 'start',
    message: 'Converting slides to PDF document',
  })
  //@ts-ignore
  const { width, height } = deck.getComputedSlideSize()

  const currentSlide = deck.getIndices().h as number

  const tmpDeckElement = document.querySelector('.tmpDeck') as HTMLElement
  const tmpDeck = await generateTmpDeck(
    deck,
    tmpDeckElement,
    width,
    height,
    slideshowSettings
  )

  const doc = new jsPDF('landscape', 'px', [width, height])
  const totalSlides = tmpDeck.getTotalSlides() as number
  for (let i = 0; i < totalSlides; i++) {
    tmpDeck.slide(i)
    const currentSlide = tmpDeck.getRevealElement() as HTMLElement

    const slides = currentSlide.querySelector('.slides') as HTMLElement
    slides.style.transform = slides.style.transform.replace(/scale\(.*\)/, '')

    const image = await toJpeg(currentSlide, {
      filter: (node) => {
        return node.classList
          ? !node.classList.contains('controls') &&
              !node.classList.contains('progress')
          : true
      },
      width,
      height,
    })

    doc.addImage(image, 0, 0, width, height)
    if (i !== totalSlides - 1) doc.addPage()
  }
  tmpDeckElement.style.display = 'none'
  doc.save('slides.pdf')
  deck.slide(currentSlide)
  loadingModalSetAction({ action: 'stop' })
}

async function generateTmpDeck(
  deck: Reveal.Api,
  tmpDeckElement: HTMLElement,
  width: number,
  height: number,
  slideshowSettings: SlideshowSettings
) {
  const reveal = deck.getRevealElement()
  tmpDeckElement.style.display = 'block'
  tmpDeckElement.innerHTML = reveal.innerHTML

  const { default: Reveal } = await import('reveal.js')

  const { default: RevealHighlight } = await import(
    'reveal.js/plugin/highlight/highlight'
  )

  const { default: Markdown } = await import(
    'reveal.js/plugin/markdown/markdown'
  )

  const tmpDeck = new Reveal(tmpDeckElement, {
    embedded: true,
    center: false,
    history: false,
    keyboardCondition: 'focused',
    plugins: [Markdown, RevealHighlight],
    ...slideshowSettings,
    width,
    height,
  })

  await tmpDeck.initialize()
  tmpDeck.layout()
  tmpDeck.sync()

  return tmpDeck
}
