interface GoogleSlidesPageElement {
  objectId: string
  shape: {
    shapeType: string
    shapeProperties: {
      contentAlignment?: string
    }
    text?: object
    placeholder: {
      parentObjectId: string
    }
  }
}

interface GoogleSlides {
  slides: {
    pageElements: GoogleSlidesPageElement[]
    slideProperties: {
      layoutObjectId: string
      masterObjectId: string
    }
  }[]
  layouts: {
    objectId: string
    pageElements: GoogleSlidesPageElement[]
  }[]
  masters: {
    objectId: string
    pageElements: GoogleSlidesPageElement[]
  }[]
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
    const slideLayoutId =
      googleSlidesJSON.slides[i].slideProperties.layoutObjectId
    const slideMasterId =
      googleSlidesJSON.slides[i].slideProperties.masterObjectId

    const slideLayout = googleSlidesJSON.layouts.find(
      (layout) => layout.objectId === slideLayoutId
    )!

    const slideMaster = googleSlidesJSON.masters.find(
      (master) => master.objectId === slideMasterId
    )!

    // Get TEXT_BOX shapes inside slide
    const textShapes = googleSlidesJSON.slides[i].pageElements.filter(
      (pageElement) =>
        pageElement.shape &&
        pageElement.shape.shapeType === 'TEXT_BOX' &&
        pageElement.shape.text
    )

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

    let textShapesIndex = 0

    for (const shape of slideShapes) {
      let texts = Array.from(shape.querySelectorAll('p')) as HTMLElement[]
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

      // Set shape alignment If shape is a TEXT_BOX
      if (texts.length > 0) {
        let alignment =
          textShapes[textShapesIndex].shape.shapeProperties.contentAlignment

        // Check out the layout
        if (!alignment) {
          const layoutObject = slideLayout.pageElements.find(
            (pageElement) =>
              textShapes[textShapesIndex].shape.placeholder.parentObjectId ===
              pageElement.objectId
          )
          if (layoutObject) {
            alignment = layoutObject.shape.shapeProperties.contentAlignment
            if (!alignment) {
              // Check out the master
              const masterObject = slideMaster.pageElements.find(
                (pageElement) =>
                  layoutObject.shape.placeholder.parentObjectId ===
                  pageElement.objectId
              )
              if (masterObject) {
                alignment = masterObject.shape.shapeProperties.contentAlignment
              }
            }
          }
        }

        if (alignment) {
          shape.style.justifyContent = alignment.includes('TOP')
            ? 'flex-start'
            : alignment.includes('BOTTOM')
            ? 'flex-end'
            : 'center'
        }

        textShapesIndex += 1
      }
      // Change font-size type from 'pt' to 'px'
      for (const text of texts) {
        if (text.style.fontSize && text.style.fontSize.endsWith('pt')) {
          text.style.fontSize = `${
            (Number(text.style.fontSize.slice(0, -2)) * 4) / 3
          }px`
        }
      }
      revealSection.appendChild(shape)
    }
    revealSlides.content.appendChild(revealSection)
  }

  return { revealSlides: revealSlides.innerHTML, slidesHeight, slidesWidth }
}
