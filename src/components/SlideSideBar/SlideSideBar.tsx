import { Box, useColorModeValue } from "@chakra-ui/react";
import AddImage from "../AddImage/AddImage";
import AddVideo from "../AddVideo/AddVideo";
import { BsFillImageFill } from "react-icons/bs";
import SideBarItem from "../SideBar/SideBarItem";
import { addImageToCurrentSlide } from "../../utils";
import { useAtom } from "jotai";
import { moveableTargetAtom, slidesDeckAtom } from "../../store";
import { AiFillDelete } from "react-icons/ai";
import AddText from "../AddText/AddText";
import { RiText } from "react-icons/ri";

export default function SlideSideBar() {
  const [deck] = useAtom(slidesDeckAtom);
  const [_, setMoveableTarget] = useAtom(moveableTargetAtom);

  return (
    <Box
      bg={useColorModeValue("latte-crust", "frappe-crust")}
      fontSize={{ base: "xs", md: "md" }}
      position="absolute"
      borderRadius="lg"
      overflow="hidden"
      top={0}
      right={-16}
    >
      <AddText>
        <SideBarItem icon={RiText} label="Text" />
      </AddText>

      <AddImage
        handleAddImage={(image) =>
          addImageToCurrentSlide(image, deck, setMoveableTarget)
        }
      >
        <SideBarItem icon={BsFillImageFill} label="Image" />
      </AddImage>
      <AddVideo />

      {/* TODO: disable remove button if only one slide was available */}
      <SideBarItem
        icon={AiFillDelete}
        label="Remove slide"
        onClick={() => {
          const slides = deck.getSlidesElement() as HTMLElement;
          const currentSlide = deck.getCurrentSlide() as HTMLElement;
          const currentSlideIndex = deck.getState().indexh;

          slides.removeChild(currentSlide);
          deck.sync();
          deck.layout();
          deck.slide(currentSlideIndex > 1 ? currentSlideIndex : 0);
        }}
      />
    </Box>
  );
}
