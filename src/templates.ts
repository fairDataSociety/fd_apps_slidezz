import TitleImageSlide from "./components/Templates/TitleImageSlide";
import TitleSlide from "./components/Templates/TitleSlide";
import TitleSubtitleSlide from "./components/Templates/TitleSubtitleSlide";
import TwoColumnSlide from "./components/Templates/TwoColumnSlide";

interface Template {
  name: string;
  content: string;
  component: () => JSX.Element;
}

export const templates: Template[] = [
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
    content: `<h3>TITLE TEXT</h3><img class="sample-image" src="/images/sample.png" />`,
    component: TitleImageSlide,
  },
];
