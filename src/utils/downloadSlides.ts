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
  const { h: currentSlideNumber } = deck.getIndices() as { h: number }

  const { presentationWidth, presentationHeight } =
    deck.getComputedSlideSize() as {
      width: number
      height: number
      presentationWidth: number
      presentationHeight: number
    }

  const doc = new jsPDF('landscape', 'px', [
    presentationWidth,
    presentationHeight,
  ])
  const totalSlides = deck.getTotalSlides() as number
  for (let i = 0; i < totalSlides; i++) {
    deck.slide(i)
    const currentSlide = deck.getRevealElement() as HTMLElement

    const image = await toJpeg(currentSlide, {
      filter: (node) => {
        return node.classList
          ? !node.classList.contains('controls') &&
              !node.classList.contains('progress')
          : true
      },
    })

    doc.addImage(image, 0, 0, presentationWidth, presentationHeight)
    if (i !== totalSlides - 1) doc.addPage()
  }

  deck.slide(currentSlideNumber)
  doc.save('slides.pdf')
}
