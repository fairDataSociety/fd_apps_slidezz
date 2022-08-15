import SideBarItem from "../SideBar/SideBarItem";
import { BsFillImageFill } from "react-icons/bs";
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
  Image,
  Tooltip,
  Button,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import {
  imageMediaAtom,
  mediaAtom,
  moveableTargetAtom,
  slidesDeckAtom,
} from "../../store";
import ImportFile from "../ImportFile/ImportFile";
import { File } from "../../types";
import { PlusSquareIcon } from "@chakra-ui/icons";

export default function AddImage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [media, setMedia] = useAtom(mediaAtom);
  const [images] = useAtom(imageMediaAtom);
  const [_, setMoveableTarget] = useAtom(moveableTargetAtom);
  const [deck] = useAtom(slidesDeckAtom);

  const addImageToCurrentSlide = (image: File) => {
    const currentSlideIndex = deck.getState().indexh;
    const slide = deck.getSlides()[currentSlideIndex];

    const imageElement = document.createElement("img");
    imageElement.src = URL.createObjectURL(new Blob([image.data.buffer]));
    imageElement.alt = image.name;

    imageElement.style.cursor = "pointer";

    imageElement.addEventListener("click", () => {
      setMoveableTarget(imageElement);
    });

    slide.appendChild(imageElement);
    deck.sync();
    deck.layout();
    onClose();
  };

  return (
    <>
      <SideBarItem icon={BsFillImageFill} label="Image" onClick={onOpen} />

      <Modal
        size={{ base: "sm", md: "2xl", lg: "4xl" }}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent h="600px">
          <ModalHeader>Select an image</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid
              overflowY="scroll"
              h="400px"
              columns={{ base: 1, md: 2, lg: 3 }}
              spacing={10}
            >
              {images.map((image) => {
                return (
                  <Tooltip label={image.name} hasArrow>
                    <Box
                      onClick={() => addImageToCurrentSlide(image)}
                      mx="auto"
                      cursor="pointer"
                      w="200px"
                      h="200px"
                    >
                      <Image
                        objectFit="cover"
                        src={URL.createObjectURL(new Blob([image.data.buffer]))}
                      />
                    </Box>
                  </Tooltip>
                );
              })}
            </SimpleGrid>
          </ModalBody>
          <ModalFooter flexDir="row-reverse">
            <ImportFile
              setFile={(file: File | undefined) => {
                if (file) setMedia([...media, file]);
              }}
              allowedExtensions={["png", "jpg", "jpeg", "gif", "svg"]}
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
