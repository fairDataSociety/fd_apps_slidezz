import { Box, useColorModeValue } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { slidesAtom } from "../../store";
import ImportFile from "../ImportFile/ImportFile";
import PresentationSettings from "../Settings/SlideShowSettings";
import StyleSettings from "../Settings/StyleSettings/StyleSettings";
import SideBarItem from "./SideBarItem";
import { BsMarkdown } from "react-icons/bs";
import ImportImage from "../AddImage/AddImage";

export default function SideBar() {
  const [_, setSlides] = useAtom(slidesAtom);

  return (
    <Box
      bg={useColorModeValue("latte-crust", "frappe-crust")}
      fontSize="2xl"
      position="fixed"
      w="5rem"
      left={0}
      top={0}
      borderBottomRightRadius="lg"
      overflow="hidden"
    >
      <PresentationSettings />
      <StyleSettings />
      <ImportFile setData={setSlides} allowedExtensions={["md"]}>
        <SideBarItem label="Import a Markdown file" icon={BsMarkdown} />
      </ImportFile>

      <ImportImage />
    </Box>
  );
}
