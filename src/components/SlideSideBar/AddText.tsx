import { Box } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { slidesDeckAtom, moveableTargetAtom } from "../../store";
import { addMoveableToElements } from "../../utils";

interface AddTextProps {
  children?: React.ReactNode;
}

export default function AddText({ children }: AddTextProps) {
  const [deck] = useAtom(slidesDeckAtom);
  const [moveableTarget, setMoveableTarget] = useAtom(moveableTargetAtom);

  const handleAddText = () => {
    const currentSlideIndex = deck.getState().indexh;
    const slide = deck.getSlides()[currentSlideIndex];

    const textElement = document.createElement("p");
    textElement.innerText = "text";
    textElement.classList.add("fair-text");

    slide.appendChild(textElement);

    addMoveableToElements([textElement], setMoveableTarget);
  };

  return <Box onClick={handleAddText}>{children}</Box>;
}
