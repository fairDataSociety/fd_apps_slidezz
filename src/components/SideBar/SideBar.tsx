import { Box, HStack, useColorModeValue, useToast } from "@chakra-ui/react";
import { useAtom } from "jotai";
import {
  fdpAtom,
  slidesAtom,
  slidesDeckAtom,
  slidesLogoAtom,
} from "../../store";
import PresentationSettings from "../Settings/SlideShowSettings";
import StyleSettings from "../Settings/StyleSettings/StyleSettings";
import SideBarItem from "./SideBarItem";
import AddImage from "../AddImage/AddImage";
import { BsImageAlt } from "react-icons/bs";
import { FaPlay, FaSave } from "react-icons/fa";
import fscreen from "fscreen";
import SaveFile from "../SaveFile/SaveFile";
import { getSlidesHTML } from "../../utils";
import LoadingToast from "../Toast/LoadingToast";
import { useState } from "react";

export default function SideBar() {
  const [slidesLogo, setSlidesLogo] = useAtom(slidesLogoAtom);
  const [fdp] = useAtom(fdpAtom);
  const [deck] = useAtom(slidesDeckAtom);
  const [slides, setSlides] = useAtom(slidesAtom);
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

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
        onClick={async () => {
          fscreen.requestFullscreen(document.querySelector(".reveal")!);
        }}
      />

      <PresentationSettings />
      <StyleSettings />

      <AddImage handleAddImage={(image) => setSlidesLogo(image.data)}>
        <SideBarItem icon={BsImageAlt} label="Logo/Copyright image" />
      </AddImage>

      {deck && slides && !slides.podName ? (
        <SaveFile
          onDone={(podName, fullPath) => {
            setSlides({
              ...slides,
              podName,
              fullPath,
            });
          }}
          getData={() => getSlidesHTML(deck)}
          extension="html"
        >
          <SideBarItem icon={FaSave} label="Save to fairdrive" />
        </SaveFile>
      ) : null}

      {deck && slides && !!slides.podName && !!slides.fullPath ? (
        <SideBarItem
          onClick={async () => {
            if (!slides.podName || !slides.fullPath) return;

            setIsLoading(true);

            toast({
              duration: null,
              render: () => <LoadingToast label="Saving File" />,
            });

            try {
              await fdp.file.delete(slides.podName, slides.fullPath);
              await fdp.file.uploadData(
                slides.podName,
                slides.fullPath,
                slides.data
              );

              toast.closeAll();
            } catch (error: any) {
              toast.closeAll();

              toast({
                title: "Failed to save file",
                description: error.message,
                status: "error",
                duration: 9000,
                isClosable: true,
              });
            }

            setIsLoading(false);
          }}
          icon={FaSave}
          isLoading={isLoading}
          label="Click to save"
        />
      ) : null}
    </Box>
  );
}
