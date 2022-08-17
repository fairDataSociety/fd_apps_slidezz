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
