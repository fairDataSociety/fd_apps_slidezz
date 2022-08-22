import { File } from "./types";

export function addMoveableToElements(
  elements: HTMLElement[],
  setMoveableTarget: (target: HTMLElement | undefined) => void,
  setReplaceImageElement?: (target: HTMLImageElement | undefined) => void
) {
  elements.forEach((element: HTMLElement) => {
    if (element.tagName.toLowerCase() === "div") {
      return addMoveableToElements(
        Array.from(element.children) as HTMLElement[],
        setMoveableTarget,
        setReplaceImageElement
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

    if (element.tagName.toLowerCase() === "img" && setReplaceImageElement) {
      element.addEventListener("dblclick", () => {
        setReplaceImageElement(element as HTMLImageElement);
      });
    }

    element.addEventListener("click", () => {
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
  imageElement.setAttribute("data-pod", image.podName);
  imageElement.setAttribute("data-path", image.fullPath);
  imageElement.classList.add("fair-data");

  imageElement.style.cursor = "pointer";

  imageElement.addEventListener("click", () => {
    setMoveableTarget(imageElement);
  });

  slide.appendChild(imageElement);
  deck.sync();
  deck.layout();
}

export function getSlidesHTML(deck: any) {
  const slides = deck.getSlides() as HTMLElement[];
  return slides.map((slide) => slide.outerHTML).join("\n");
}
