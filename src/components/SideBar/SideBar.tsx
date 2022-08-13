import { Box, useColorModeValue } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { slidesAtom, mediaAtom } from "../../store";
import ImportFile from "../ImportFile/ImportFile";
import PresentationSettings from "../Settings/SlideShowSettings";
import StyleSettings from "../Settings/StyleSettings/StyleSettings";
import SideBarItem from "./SideBarItem";
import { BsMarkdown } from "react-icons/bs";
import { MdPermMedia } from "react-icons/md";
import { File } from "../../types";

export default function SideBar() {
  const [_, setSlides] = useAtom(slidesAtom);
  const [media, setMedia] = useAtom(mediaAtom);

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
        setFile={(file: File | undefined) => {
          if (file) setSlides(file.data.text());
        }}
        allowedExtensions={["md"]}
      >
        <SideBarItem
          label="Import markdown file from Fairdrive"
          icon={BsMarkdown}
        />
      </ImportFile>

      <ImportFile
        setFile={(file: File | undefined) => {
          if (file) setMedia([...media, file]);
        }}
        allowedExtensions={[
          "png",
          "jpg",
          "jpeg",
          "gif",
          "svg",
          "mp4",
          "webm",
          "ogg",
        ]}
      >
        <SideBarItem label="Import media from Fairdrive" icon={MdPermMedia} />
      </ImportFile>
    </Box>
  );
}
