import SideBarItem from "../SideBar/SideBarItem";
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
  SimpleGrid,
  Box,
  Tooltip,
  Button,
  VStack,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import {
  mediaAtom,
  moveableTargetAtom,
  slidesDeckAtom,
  videoMediaAtom,
} from "../../store";
import ImportFile from "../ImportFile/ImportFile";
import { File } from "../../types";
import { PlusSquareIcon } from "@chakra-ui/icons";
import AddYouTubeEmbedVideo from "./AddYouTubeEmbedVideo";

export default function AddVideo() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [media, setMedia] = useAtom(mediaAtom);
  const [videos] = useAtom(videoMediaAtom);
  const [_, setMoveableTarget] = useAtom(moveableTargetAtom);
  const [deck] = useAtom(slidesDeckAtom);

  const addVideoToCurrentSlide = (video: File) => {
    const currentSlideIndex = deck.getState().indexh;
    const slide = deck.getSlides()[currentSlideIndex];
  };

  return (
    <>
      <SideBarItem icon={FaVideo} label="Video" onClick={onOpen} />

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

              <SimpleGrid
                overflowY="scroll"
                h="400px"
                columns={{ base: 1, md: 2, lg: 3 }}
                spacing={10}
              >
                {videos.map((video) => {
                  return (
                    <Tooltip label={video.name} hasArrow>
                      <Box
                        onClick={() => addVideoToCurrentSlide(video)}
                        mx="auto"
                        cursor="pointer"
                        w="200px"
                        h="200px"
                      ></Box>
                    </Tooltip>
                  );
                })}
              </SimpleGrid>
            </VStack>
          </ModalBody>
          <ModalFooter flexDir="row-reverse">
            <ImportFile
              setFile={(file: File | undefined) => {
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
