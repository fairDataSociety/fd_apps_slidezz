import download from 'downloadjs'
import { toJpeg, toPng, toSvg } from 'html-to-image'
import { jsPDF } from 'jspdf'

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

export async function currentSlideToImage(exportType: ExportType) {
  const currentSlide = document.querySelector('.reveal') as HTMLElement

  const convertor = convetorFunction[exportType]

  const image = await convertor(currentSlide, {
    filter: (node) => {
      return node.classList
        ? !node.classList.contains('controls') &&
            !node.classList.contains('progress')
        : true
    },
  })
  download(image, `slide.${extension[exportType]}`)
}

export async function slidesToPdf(deck: any) {
  const { width, height } = deck.getComputedSlideSize() as {
    width: number
    height: number
    presentationWidth: number
    presentationHeight: number
  }

  const reveal = document.querySelector('.reveal') as HTMLElement
  const tmpDeckElement = document.querySelector('.tmpDeck') as HTMLElement
  tmpDeckElement.style.display = 'block'
  tmpDeckElement.innerHTML = reveal.innerHTML

  //@ts-ignore
  const { default: Reveal } = await import('reveal.js')

  //@ts-ignore
  const tmpDeck = Reveal(tmpDeckElement, {
    embedded: true,
    center: false,
    // keyboardCondition: 'focused',
    // plugins: [Markdown, RevealHighlight],
    // ...slideShowSettings,
    width,
    height,
  })
  await tmpDeck.initialize()
  await tmpDeck.layout()
  await tmpDeck.sync()

  const doc = new jsPDF('landscape', 'px', [width, height])
  const totalSlides = tmpDeck.getTotalSlides() as number
  for (let i = 0; i < totalSlides; i++) {
    tmpDeck.slide(i)
    const currentSlide = tmpDeck.getRevealElement() as HTMLElement

    // const slides = currentSlide.querySelector('.slides') as HTMLElement
    // slides.style.transform = slides.style.transform.replace(/scale\(.*\)/, '')

    const image = await toJpeg(currentSlide, {
      filter: (node) => {
        return node.classList
          ? !node.classList.contains('controls') &&
              !node.classList.contains('progress')
          : true
      },
    })

    doc.addImage(image, 0, 0, width, height)
    if (i !== totalSlides - 1) doc.addPage()
  }
  tmpDeckElement.style.display = 'none'

  doc.save('slides.pdf')
}
