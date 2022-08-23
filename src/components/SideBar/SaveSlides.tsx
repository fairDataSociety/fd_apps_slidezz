import { useToast } from "@chakra-ui/react";
import { useAtom } from "jotai";
import { useState } from "react";
import { FaSave } from "react-icons/fa";
import { fdpAtom, slidesDeckAtom, slidesAtom } from "../../store";
import { getSlidesHTML } from "../../utils";
import SaveFile from "../SaveFile/SaveFile";
import LoadingToast from "../Toast/LoadingToast";
import SideBarItem from "./SideBarItem";

export default function SaveSlides() {
  const [fdp] = useAtom(fdpAtom);
  const [deck] = useAtom(slidesDeckAtom);
  const [slides, setSlides] = useAtom(slidesAtom);
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
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
    </>
  );
}
