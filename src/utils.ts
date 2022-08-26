import type { FdpStorage } from "@fairdatasociety/fdp-storage";
import { File, Slides } from "./types";

export function addMoveableToElements(
  elements: HTMLElement[],
  setMoveableTarget: (target: HTMLElement | undefined) => void,
  setReplaceImageElement?: (target: HTMLImageElement | undefined) => void
) {
  elements.forEach((element: HTMLElement) => {
    if (
      element.tagName.toLowerCase() === "div" &&
      !element.classList.contains("iframe-wrapper") &&
      !element.classList.contains("media-container")
    ) {
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

    if (
      element.classList.contains("media-container") &&
      setReplaceImageElement
    ) {
      element.addEventListener("dblclick", () => {
        setReplaceImageElement(element.firstChild as HTMLImageElement);
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

  const imageContainer = document.createElement("div");
  imageContainer.classList.add("media-container");

  const imageElement = document.createElement("img");
  imageElement.src = URL.createObjectURL(new Blob([image.data.buffer]));
  imageElement.alt = image.name;
  imageElement.setAttribute("data-pod", image.podName);
  imageElement.setAttribute("data-path", image.fullPath);
  imageElement.classList.add("fair-data");
  imageContainer.style.cursor = "pointer";

  imageContainer.appendChild(imageElement);

  imageContainer.addEventListener("click", () => {
    setMoveableTarget(imageContainer);
  });

  slide.appendChild(imageContainer);
  deck.sync();
  deck.layout();
  deck.toggleOverview(true);
}

export function getSlidesHTML(deck: any) {
  const slides = deck.getSlides() as HTMLElement[];
  return slides.map((slide) => slide.outerHTML).join("\n");
}

export async function loadSlideshow(
  file: File | undefined,
  fdp: FdpStorage,
  setSlides: (slides: Slides) => void
) {
  if (!file) return;

  const template = document.createElement("template");
  template.innerHTML = file.data.text();

  const fairData = Array.from(template.content.querySelectorAll(".fair-data"));

  for await (const element of fairData) {
    const podName = element.getAttribute("data-pod");
    const path = element.getAttribute("data-path");

    if (podName && path) {
      try {
        const data = await fdp.file.downloadData(podName, path);
        //@ts-ignore
        element.src = URL.createObjectURL(new Blob([data.buffer]));
      } catch (error) {
        console.log(error);
      }
    }
  }

  setSlides({
    data: template.innerHTML,
  });
}

export function isHTML(data: string) {
  return /<\/?[a-z][\s\S]*>/i.test(data);
}
