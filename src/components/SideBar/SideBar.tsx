import { Box, useColorModeValue } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { slidesAtom } from "../../store";
import ImportFile from "../ImportFile/ImportFile";
import PresentationSettings from "../Settings/SlideShowSettings";
import StyleSettings from "../Settings/StyleSettings/StyleSettings";
import SideBarItem from "./SideBarItem";
import { BsMarkdown } from "react-icons/bs";

export default function SideBar() {
  const [_, setSlides] = useAtom(slidesAtom);

  return (
    <Box
      bg={useColorModeValue("latte-crust", "frappe-crust")}
      fontSize="2xl"
      w="5rem"
      position="fixed"
      top={2}
      left={9}
      rounded="2xl"
      overflow="hidden"
    >
      <PresentationSettings />
      <StyleSettings />
      <ImportFile setData={setSlides} allowedExtensions={["md"]}>
        <SideBarItem label="Import a Markdown file" icon={BsMarkdown} />
      </ImportFile>
    </Box>
  );
}
