interface GoogleSlidesPageElement {
  objectId: string
  shape?: {
    shapeType: string
    shapeProperties: {
      contentAlignment?: string
    }
    text?: {
      textElements: {
        paragraphMarker?: {
          style: GoogleSlidesTextStyle
        }
      }[]
    }
    placeholder?: {
      parentObjectId: string
    }
  }
  elementGroup?: {
    children: GoogleSlidesPageElement[]
  }
}

interface GoogleSlidesTextStyle {
  lineSpacing?: number
  spaceAbove?: {
    magnitude?: number
    unit: 'PT'
  }
  spaceBelow?: {
    magnitude?: number
    unit: 'PT'
  }
}

interface GoogleSlidesLayout {
  objectId: string
  pageElements: GoogleSlidesPageElement[]
}

interface GoogleSlidesMaster {
  objectId: string
  pageElements: GoogleSlidesPageElement[]
}

interface GoogleSlidesSlide {
  pageElements: GoogleSlidesPageElement[]
  slideProperties: {
    layoutObjectId: string
    masterObjectId: string
  }
}

interface GoogleSlides {
  slides: GoogleSlidesSlide[]
  layouts: GoogleSlidesLayout[]
  masters: GoogleSlidesMaster[]
}

export function parseGoogleSlides(
  googleSlidesHTML: string,
  googleSlidesJSON: GoogleSlides
) {
  const revealSlides = document.createElement('template')
  const googleSlides = document.createElement('template')
  googleSlides.innerHTML = googleSlidesHTML

  // Import fonts
  const fonts = Array.from(googleSlides.content.querySelectorAll('style')).find(
    (style) => style.innerHTML.includes('fonts.googleapis.com')
  )
  if (fonts) {
    document.body.prepend(fonts)
  }

  // Parse Google Slides
  const slides = Array.from(
    googleSlides.content.querySelectorAll('.slide')
  ) as HTMLElement[]

  // Slides Width and Height
  const firstSection = slides[0].querySelector('.slide-content') as HTMLElement
  const slidesHeight = Number(firstSection.style.height.slice(0, -2))
  const slidesWidth = Number(firstSection.style.width.slice(0, -2))

  for (const [i, slide] of slides.entries()) {
    const slideSection = slide.querySelector('section') as HTMLElement
    const revealSection = document.createElement('section')

    // Set Slide background
    const slideBg = slideSection.style.backgroundImage
    revealSection.classList.add('google-slide')
    revealSection.style.backgroundImage = slideBg
    revealSection.style.backgroundSize = 'cover'
    revealSection.style.backgroundPosition = 'center'

    // All shapes inside slide
    const slideShapes = Array.from(
      slideSection.querySelectorAll('.shape')
    ) as HTMLElement[]

    // Parse Slide texts
    parseTexts(googleSlidesJSON, i, slideShapes)

    const slideTables = Array.from(slideSection.querySelectorAll('.table'))

    slideShapes.forEach((shape) => revealSection.appendChild(shape))
    slideTables.forEach((table) => revealSection.appendChild(table))

    revealSlides.content.appendChild(revealSection)
  }

  return { revealSlides: revealSlides.innerHTML, slidesHeight, slidesWidth }
}

function parseTexts(
  googleSlidesJSON: GoogleSlides,
  slideIndex: number,
  slideShapes: HTMLElement[]
) {
  const slideLayoutId =
    googleSlidesJSON.slides[slideIndex].slideProperties.layoutObjectId
  const slideMasterId =
    googleSlidesJSON.slides[slideIndex].slideProperties.masterObjectId

  const slideLayout = googleSlidesJSON.layouts.find(
    (layout) => layout.objectId === slideLayoutId
  ) as GoogleSlidesLayout

  const slideMaster = googleSlidesJSON.masters.find(
    (master) => master.objectId === slideMasterId
  ) as GoogleSlidesMaster

  // Get TEXT_BOX shapes inside slide
  const textShapes = googleSlidesJSON.slides[slideIndex].pageElements.reduce(
    (textShapes, pageElement) => {
      const findTextShapes = (pageElements: GoogleSlidesPageElement[]) => {
        for (const pageElement of pageElements) {
          if (
            pageElement.shape &&
            pageElement.shape.shapeType === 'TEXT_BOX' &&
            pageElement.shape.text
          ) {
            textShapes.push(pageElement)
          }

          if (pageElement.elementGroup) {
            findTextShapes(pageElement.elementGroup.children)
          }
        }
      }

      findTextShapes([pageElement])
      return textShapes
    },
    [] as GoogleSlidesPageElement[]
  )

  let textShapesIndex = 0

  for (const shape of slideShapes) {
    let texts = Array.from(shape.querySelectorAll('p,ul')) as HTMLElement[]
    texts = texts.filter((text) => {
      const isZeroWidthSpace = (str: string) => {
        return str.charCodeAt(0) === 8203 && isNaN(str.charCodeAt(1))
      }
      if (isZeroWidthSpace(text.innerHTML)) {
        const lineBreak = document.createElement('br')
        text.replaceWith(lineBreak)
        return false
      }
      return true
    })

    if (texts.length === 0) continue

    const shapeObject = textShapes[textShapesIndex]

    const layoutObject = slideLayout.pageElements.find(
      (pageElement) =>
        textShapes[textShapesIndex].shape?.placeholder?.parentObjectId ===
        pageElement.objectId
    )

    const masterObject = slideMaster.pageElements.find(
      (pageElement) =>
        layoutObject?.shape?.placeholder?.parentObjectId ===
        pageElement.objectId
    )

    /////////// Set Alignment

    const alignment =
      shapeObject.shape?.shapeProperties.contentAlignment ||
      layoutObject?.shape?.shapeProperties.contentAlignment ||
      masterObject?.shape?.shapeProperties.contentAlignment

    if (alignment) {
      shape.style.justifyContent = alignment.includes('TOP')
        ? 'flex-start'
        : alignment.includes('BOTTOM')
        ? 'flex-end'
        : 'center'
    }

    // Change font-size type from 'pt' to 'px'
    const ptToPx = (texts: HTMLElement[]) => {
      if (texts.length === 0) return
      for (const text of texts) {
        if (text.style.fontSize && text.style.fontSize.endsWith('pt')) {
          text.style.fontSize = `${
            (Number(text.style.fontSize.slice(0, -2)) * 4) / 3
          }px`
        }
        ptToPx(Array.from(text.querySelectorAll('span,li')))
      }
    }
    ptToPx(texts)

    /////////// Set Line Height
    const paragraphsStyles = shapeObject.shape?.text!.textElements.reduce(
      (paragraphsStyles, textElement) => {
        if (textElement.paragraphMarker)
          paragraphsStyles.push(textElement.paragraphMarker.style)

        return paragraphsStyles
      },
      [] as GoogleSlidesTextStyle[]
    )

    let parentSpaceAbove: number | undefined
    let parentSpaceBelow: number | undefined
    let parentLineSpacing: number | undefined

    let textElements =
      layoutObject && layoutObject.shape
        ? [...layoutObject.shape.text!.textElements]
        : []

    textElements =
      masterObject && masterObject.shape
        ? [...textElements, ...masterObject.shape.text!.textElements]
        : textElements

    // Set line height for the shape
    for (const textElement of textElements) {
      const spaceAbove = textElement.paragraphMarker?.style.spaceAbove
      const spaceBelow = textElement.paragraphMarker?.style.spaceBelow

      if (!parentLineSpacing)
        parentLineSpacing = textElement.paragraphMarker?.style.lineSpacing

      if (!parentSpaceAbove && spaceAbove)
        parentSpaceAbove = spaceAbove.magnitude ? spaceAbove.magnitude : 0

      if (!parentSpaceBelow && spaceBelow)
        parentSpaceBelow = spaceBelow.magnitude ? spaceBelow?.magnitude : 0

      if (parentLineSpacing && parentSpaceAbove && parentSpaceBelow) break
    }

    if (parentLineSpacing) {
      shape.style.lineHeight = `${parentLineSpacing / 100}`
    }

    // Set line height for all paragraphs inside the shape
    for (const [i, text] of texts.entries()) {
      const lineSpacing = paragraphsStyles && paragraphsStyles[i].lineSpacing
      if (lineSpacing) text.style.lineHeight = `${lineSpacing / 100}`

      const spaceBelow = paragraphsStyles && paragraphsStyles[i].spaceBelow
      if (spaceBelow) {
        text.style.paddingBottom = spaceBelow.magnitude
          ? `${(spaceBelow.magnitude * 4) / 3}px`
          : '0px'
      } else if (parentSpaceBelow) {
        text.style.paddingBottom = `${(parentSpaceBelow * 4) / 3}px`
      }

      const spaceAbove = paragraphsStyles && paragraphsStyles[i].spaceAbove
      if (spaceAbove) {
        text.style.paddingTop = spaceAbove.magnitude
          ? `${(spaceAbove.magnitude * 4) / 3}px`
          : '0px'
      } else if (parentSpaceAbove) {
        text.style.paddingTop = `${(parentSpaceAbove * 4) / 3}px`
      }
    }

    textShapesIndex += 1
  }
}
