import BlankSlide from "./components/SlideSideBar/Templates/BlankSlide";
import ImageTitleSlide from "./components/SlideSideBar/Templates/ImageTitleSlide";
import TitleImageSlide from "./components/SlideSideBar/Templates/TitleImageSlide";
import TitleSlide from "./components/SlideSideBar/Templates/TitleSlide";
import TitleSubtitleSlide from "./components/SlideSideBar/Templates/TitleSubtitleSlide";
import TwoColumnImageSlide from "./components/SlideSideBar/Templates/TwoColumnImageSlide";
import TwoColumnSlide from "./components/SlideSideBar/Templates/TwoColumnSlide";

interface Template {
  name: string;
  content: string;
  component: () => JSX.Element;
}

export const templates: Template[] = [
  {
    name: "Blank slide",
    content: "",
    component: BlankSlide,
  },
  {
    name: "Title slide",
    content: "<h2>Title text</h2>",
    component: TitleSlide,
  },
  {
    name: "Title-Subtitle slide",
    content: "<h2>TITLE TEXT</h2><h3>Subtitle</h3>",
    component: TitleSubtitleSlide,
  },
  {
    name: "Two-column slide",
    content: `<div class='two-column'><div class='col'><h2>Left column</h2><p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi
      perferendis amet minus minima nihil asperiores culpa autem.</p></div><div class='col'><h2>Right column</h2><p> Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi
      perferendis amet minus minima nihil asperiores culpa autem.</p></div></div>`,
    component: TwoColumnSlide,
  },
  {
    name: "Ttile image slide",
    content: `<h3>TITLE TEXT</h3><div></div><div class="media-container sample-image-container"><img class="fair-data" src="/images/sample.png" /></div>`,
    component: TitleImageSlide,
  },
  {
    name: "Image title slide",
    content: `<div class="media-container sample-image-container"><img class="fair-data" src="/images/sample.png" /></div><h3>TITLE TEXT</h3>`,
    component: ImageTitleSlide,
  },
  {
    name: "Two-column image slide",
    content: `<div class='two-column'><div class='col'><h2>Left column</h2><p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi
    perferendis amet minus minima.</p></div><div class='col'><div class="media-container sample-image-container"><img class="fair-data" src="/images/sample.png" /></div></div></div>`,
    component: TwoColumnImageSlide,
  },
];
