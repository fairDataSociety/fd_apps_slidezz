import { Box, useColorModeValue } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { slidesAtom, slidesLogoAtom } from "../../store";
import ImportFile from "../ImportFile/ImportFile";
import PresentationSettings from "../Settings/SlideShowSettings";
import StyleSettings from "../Settings/StyleSettings/StyleSettings";
import SideBarItem from "./SideBarItem";
import { BsMarkdown } from "react-icons/bs";
import { File } from "../../types";
import AddImage from "../AddImage/AddImage";
import { BsImageAlt } from "react-icons/bs";
import { FaPlay, FaSave } from "react-icons/fa";
import fscreen from "fscreen";
import SaveFile from "../SaveFile/SaveFile";

export default function SideBar() {
  const [slidesLogo, setSlidesLogo] = useAtom(slidesLogoAtom);
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

      <SaveFile file="">
        <SideBarItem icon={FaSave} label="Save to fairdrive" />
      </SaveFile>

      {/* <ImportFile
        setFile={(file: File | undefined) => {
          if (file) setSlides(file.data.text());
        }}
        allowedExtensions={["md"]}
      >
        <SideBarItem
          label="Import markdown file from Fairdrive"
          icon={BsMarkdown}
        />
      </ImportFile> */}
    </Box>
  );
}
