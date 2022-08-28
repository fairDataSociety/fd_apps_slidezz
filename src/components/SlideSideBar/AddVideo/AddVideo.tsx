import { FaVideo } from "react-icons/fa";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  useDisclosure,
  Box,
  Button,
  VStack,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import {
  mediaAtom,
  moveableTargetAtom,
  slidesDeckAtom,
  videoMediaAtom,
} from "../../../store";
import ImportFile from "../../ImportFile/ImportFile";
import { File } from "../../../types";
import { PlusSquareIcon } from "@chakra-ui/icons";
import AddYouTubeEmbedVideo from "./AddYouTubeEmbedVideo";
import ItemBox from "../../ImportFile/ItemBox";
import SlideSideBarItem from "../SlideSideBarItem";

export default function AddVideo() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [media, setMedia] = useAtom(mediaAtom);
  const [videos] = useAtom(videoMediaAtom);
  const [_, setMoveableTarget] = useAtom(moveableTargetAtom);
  const [deck] = useAtom(slidesDeckAtom);

  const addVideoToCurrentSlide = (video: File) => {
    const currentSlideIndex = deck.getState().indexh;
    const slide = deck.getSlides()[currentSlideIndex];

    const videoContainer = document.createElement("div");
    videoContainer.classList.add("media-container");

    const videoElement = document.createElement("video");
    const soruceElement = document.createElement("source");

    videoElement.controls = true;

    soruceElement.src = URL.createObjectURL(new Blob([video.data.buffer]));

    videoElement.appendChild(soruceElement);

    videoElement.setAttribute("data-pod", video.podName);
    videoElement.setAttribute("data-path", video.fullPath);
    videoElement.classList.add("fair-data");

    videoContainer.style.cursor = "pointer";

    videoContainer.addEventListener("click", () => {
      setMoveableTarget(videoContainer);
    });

    videoContainer.appendChild(videoElement);

    slide.appendChild(videoContainer);
    deck.sync();
    deck.layout();
    onClose();
  };

  return (
    <>
      <SlideSideBarItem icon={FaVideo} label="Video" onClick={onOpen} />

      <Modal
        size={{ base: "sm", md: "2xl", lg: "4xl" }}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent h="650px">
          <ModalHeader>Select an video</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack align="stretch" gap={2}>
              <Box alignSelf="flex-end">
                <AddYouTubeEmbedVideo addVideoOnClose={onClose} />
              </Box>

              <VStack
                p={2}
                align="stretch"
                spacing={2}
                overflowY="scroll"
                h="400px"
              >
                {videos.map((video, i) => {
                  return (
                    <ItemBox
                      key={i}
                      icon={FaVideo}
                      text={video.name}
                      onClick={() => {
                        addVideoToCurrentSlide(video);
                      }}
                    />
                  );
                })}
              </VStack>
            </VStack>
          </ModalBody>
          <ModalFooter flexDir="row-reverse">
            <ImportFile
              setFile={async (file: File | undefined) => {
                if (file) setMedia([...media, file]);
              }}
              allowedExtensions={["mp4", "webm", "ogg"]}
            >
              <Button leftIcon={<PlusSquareIcon />}>
                Import from Fairdrive
              </Button>
            </ImportFile>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
