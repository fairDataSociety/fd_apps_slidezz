import { Box, useColorModeValue } from "@chakra-ui/react";
import PresentationSettings from "./Settings/SlideShowSettings";
import StyleSettings from "./Settings/StyleSettings/StyleSettings";
import SideBarItem from "./SideBarItem";
import { FaPlay } from "react-icons/fa";
import fscreen from "fscreen";
import SaveSlides from "./SaveSlides";
import AddLogoImage from "./AddLogoImage";
import ShareSlides from "./ShareSlides";

export default function SideBar() {
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
      <AddLogoImage />
      <SaveSlides />
      <ShareSlides />
    </Box>
  );
}
