import { File } from "./types";

export function addMoveableToElements(
  elements: HTMLElement[],
  setMoveableTarget: (target: HTMLElement | undefined) => void
) {
  elements.forEach((element: HTMLElement) => {
    if (element.tagName.toLowerCase() === "div") {
      return addMoveableToElements(
        Array.from(element.children) as HTMLElement[],
        setMoveableTarget
      );
    }

    if (
      ["h1", "h2", "h3", "h4", "h5", "h6", "p"].includes(
        element.tagName.toLowerCase()
      )
    ) {
      element.addEventListener("mousedown", (e) => {
        e.preventDefault();
      });
      element.contentEditable = "true";
    }

    element.addEventListener("click", (e) => {
      setMoveableTarget(element);
    });

    element.style.cursor = "pointer";
  });
}

export function addImageToCurrentSlide(
  image: File,
  deck: any,
  setMoveableTarget: (target: HTMLElement | undefined) => void
) {
  const currentSlideIndex = deck.getState().indexh;
  const slide = deck.getSlides()[currentSlideIndex];

  const imageElement = document.createElement("img");
  imageElement.src = URL.createObjectURL(new Blob([image.data.buffer]));
  imageElement.alt = image.name;

  imageElement.style.cursor = "pointer";

  imageElement.addEventListener("click", () => {
    setMoveableTarget(imageElement);
  });

  slide.appendChild(imageElement);
  deck.sync();
  deck.layout();
}
