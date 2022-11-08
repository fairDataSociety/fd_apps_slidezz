import download from 'downloadjs'
import { toJpeg, toPng, toSvg } from 'html-to-image'

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
