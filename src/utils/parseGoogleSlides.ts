interface GoogleSlidesPageElement {
  objectId: string
  shape: {
    shapeType: string
    shapeProperties: {
      contentAlignment?: string
    }
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
    }
  }[]
  layouts: {
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
  const slides = Array.from(googleSlides.content.querySelectorAll('.slide'))
  for (const [i, slide] of slides.entries()) {
    const slideLayoutId =
      googleSlidesJSON.slides[i].slideProperties.layoutObjectId
    const slideLayout = googleSlidesJSON.layouts.find(
      (layout) => layout.objectId === slideLayoutId
    )!

    // Get TEXT_BOX shapes inside slide
    const textShapes = googleSlidesJSON.slides[i].pageElements.filter(
      (pageElement) =>
        pageElement.shape && pageElement.shape.shapeType === 'TEXT_BOX'
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
      const texts = Array.from(shape.querySelectorAll('p')) as HTMLElement[]
      // Set shape alignment If shape is a TEXT_BOX
      if (texts.length > 0) {
        let alignment =
          textShapes[textShapesIndex].shape.shapeProperties.contentAlignment
        if (!alignment) {
          const layoutObject = slideLayout.pageElements.find(
            (pageElement) =>
              textShapes[textShapesIndex].shape.placeholder.parentObjectId ===
              pageElement.objectId
          )
          if (layoutObject)
            alignment = layoutObject.shape.shapeProperties.contentAlignment
        }
        if (alignment) {
          shape.style.alignItems = alignment.includes('TOP')
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

  return revealSlides.innerHTML
}
