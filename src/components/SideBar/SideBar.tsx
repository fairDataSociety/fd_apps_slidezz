import { Box, useColorModeValue } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { slidesDeckAtom, slidesLogoAtom } from "../../store";
import PresentationSettings from "../Settings/SlideShowSettings";
import StyleSettings from "../Settings/StyleSettings/StyleSettings";
import SideBarItem from "./SideBarItem";
import AddImage from "../AddImage/AddImage";
import { BsImageAlt } from "react-icons/bs";
import { FaPlay, FaSave } from "react-icons/fa";
import fscreen from "fscreen";
import SaveFile from "../SaveFile/SaveFile";
import { getSlidesHTML } from "../../utils";

export default function SideBar() {
  const [slidesLogo, setSlidesLogo] = useAtom(slidesLogoAtom);
  const [deck] = useAtom(slidesDeckAtom);

  return (
    <Box
      bg={useColorModeValue("latte-crust", "frappe-crust")}
      fontSize={{ base: "xl", md: "2xl" }}
      w="5rem"
      h="90%"
      my="auto"
      overflow="hidden"
    >
      <SideBarItem
        icon={FaPlay}
        label="Present"
        onClick={() => {
          fscreen.requestFullscreen(document.querySelector(".reveal")!);
        }}
      />

      <PresentationSettings />
      <StyleSettings />

      <AddImage handleAddImage={(image) => setSlidesLogo(image.data)}>
        <SideBarItem icon={BsImageAlt} label="Logo/Copyright image" />
      </AddImage>

      {deck && (
        <SaveFile getData={() => getSlidesHTML(deck)} extension="html">
          <SideBarItem icon={FaSave} label="Save to fairdrive" />
        </SaveFile>
      )}
    </Box>
  );
}
