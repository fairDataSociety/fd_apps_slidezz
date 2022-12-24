import BlankSlide from './components/Editor/SlideSidebar/SlideTemplates/BlankSlide'
import ImageTitleSlide from './components/Editor/SlideSidebar/SlideTemplates/ImageTitleSlide'
import TitleImageSlide from './components/Editor/SlideSidebar/SlideTemplates/TitleImageSlide'
import TitleSlide from './components/Editor/SlideSidebar/SlideTemplates/TitleSlide'
import TitleSubtitleSlide from './components/Editor/SlideSidebar/SlideTemplates/TitleSubtitleSlide'
import TwoColumnImageSlide from './components/Editor/SlideSidebar/SlideTemplates/TwoColumnImageSlide'
import TwoColumnSlide from './components/Editor/SlideSidebar/SlideTemplates/TwoColumnSlide'

interface Template {
  name: string
  content: string
  component: () => JSX.Element
}

export const templates: Template[] = [
  {
    name: 'Blank slide',
    content: '',
    component: BlankSlide,
  },
  {
    name: 'Title slide',
    content: '<div class="container"><h2>Title text</h2><div>',
    component: TitleSlide,
  },
  {
    name: 'Title-Subtitle slide',
    content:
      '<div class="container"><h2>TITLE TEXT</h2></div><div class="container"><h3>Subtitle</h3></div>',
    component: TitleSubtitleSlide,
  },
  {
    name: 'Two-column slide',
    content: `<div class='two-column'><div class='col'><div class="container"><h2>Left column</h2></div><div class="container"><p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi
      perferendis amet minus minima nihil asperiores culpa autem.</p></div></div><div class='col'><div class="container"><h2>Right column</h2></div><div class="container"><p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi
      perferendis amet minus minima nihil asperiores culpa autem.</p></div></div></div>`,
    component: TwoColumnSlide,
  },
  {
    name: 'Ttile image slide',
    content: `<div class="container"><h3>TITLE TEXT</h3></div><div class="container sample-image-container"><img class="sample-data" src="${window._detectedSiteType.basePath}/images/sample.png" /></div>`,
    component: TitleImageSlide,
  },
  {
    name: 'Image title slide',
    content: `<div class="container sample-image-container"><img class="sample-data" src="${window._detectedSiteType.basePath}/images/sample.png" /></div><div class="container"><h3>TITLE TEXT</h3></div>`,
    component: ImageTitleSlide,
  },
  {
    name: 'Two-column image slide',
    content: `<div class='two-column'><div class='col'><div class="container"><h2>Left column</h2></div><div class="container"><p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi
    perferendis amet minus minima.</p></div></div><div class='col'><div class="container sample-image-container"><img class="sample-data" src="${window._detectedSiteType.basePath}/images/sample.png" /></div></div></div>`,
    component: TwoColumnImageSlide,
  },
]
