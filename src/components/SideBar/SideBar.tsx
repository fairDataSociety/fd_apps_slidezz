import { Box, useColorModeValue } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { slidesAtom } from "../../store";
import ImportFile from "../ImportFile/ImportFile";
import PresentationSettings from "../Settings/SlideShowSettings";
import StyleSettings from "../Settings/StyleSettings/StyleSettings";
import SideBarItem from "./SideBarItem";
import { BsMarkdown } from "react-icons/bs";
import AddImage from "../AddImage/AddImage";
import type { Data } from "@ethersphere/bee-js";
import AddVideo from "../AddVideo/AddVideo";

export default function SideBar() {
  const [_, setSlides] = useAtom(slidesAtom);

  return (
    <Box
      bg={useColorModeValue("latte-crust", "frappe-crust")}
      fontSize={{ base: "xl", md: "2xl" }}
      w="5rem"
      h="90%"
      my="auto"
      overflow="hidden"
    >
      <PresentationSettings />
      <StyleSettings />
      <ImportFile
        setData={(data: Data | undefined) => {
          if (data) setSlides(data.text());
        }}
        allowedExtensions={["md"]}
      >
        <SideBarItem label="Import a Markdown file" icon={BsMarkdown} />
      </ImportFile>

      <AddImage />

      <AddVideo />
    </Box>
  );
}
