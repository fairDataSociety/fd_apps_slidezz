import {
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  InputGroup,
  InputRightAddon,
  useColorModeValue,
  useDisclosure,
  VStack,
  FormControl,
  FormLabel,
  Switch,
  useBoolean,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import { useState } from "react";
import { fdpAtom, slidesDeckAtom, slidesAtom } from "../../store";
import { FaSave } from "react-icons/fa";
import SideBarItem from "./SideBarItem";
import LoadingToast from "../Toast/LoadingToast";
import { getSlidesHTML } from "../../utils";

export default function SaveSlides() {
  const [fdp] = useAtom(fdpAtom);
  const [deck] = useAtom(slidesDeckAtom);
  const [slides, setSlides] = useAtom(slidesAtom);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [fileName, setFileName] = useState("");
  const [shareSlides, setShareSlides] = useBoolean(false);
  const toast = useToast();

  const handleSaveSlides = async () => {
    if (!slides || !deck) return;

    toast({
      duration: null,
      render: () => <LoadingToast label="Saving slides" />,
    });

    const slidesHTML = getSlidesHTML(deck);
    const div = document.createElement("div");
    div.innerHTML = slidesHTML;

    if (shareSlides) {
      const fairDataElements = Array.from(div.querySelectorAll(".fair-data"));

      for (const fairDataElement of fairDataElements) {
        const podName = fairDataElement.getAttribute("data-pod")!;
        const path = fairDataElement.getAttribute("data-path")!;

        const shareRef = await fdp.file.share(podName, path);

        fairDataElement.setAttribute("data-shareref", shareRef);
      }
    }

    const slidesPodName = process.env.NEXT_PUBLIC_SLIDES_POD!;
    const pods = await fdp.personalStorage.list();
    const slidesPod = pods.getPods().find((pod) => pod.name === slidesPodName);

    if (!slidesPod) {
      await fdp.personalStorage.create(slidesPodName);
    }

    const filePath = `/${fileName}.html`;
    await fdp.file.uploadData(slidesPodName, filePath, div.innerHTML);

    if (shareSlides) {
      const slidesShareRef = await fdp.file.share(slidesPodName, filePath);

      setSlides({
        ...slides,
        name: fileName,
        sharedRef: slidesShareRef,
      });
    } else {
      setSlides({
        ...slides,
        name: fileName,
      });
    }

    toast.closeAll();
  };

  return (
    <>
      <SideBarItem icon={FaSave} onClick={onOpen} label="Save slides" />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Save Slides</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack>
              <InputGroup>
                <Input
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  placeholder="Slideshow name"
                />

                <InputRightAddon
                  bg={useColorModeValue("gray.200", "gray.800")}
                  children={".html"}
                />
              </InputGroup>
              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="share-slides" mb="0">
                  Share slides?
                </FormLabel>
                <Switch
                  colorScheme="surface1"
                  isChecked={shareSlides}
                  id="share-slides"
                  onChange={setShareSlides.toggle}
                />
              </FormControl>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              isDisabled={fileName.length === 0}
              onClick={() => {
                onClose();
                handleSaveSlides();
              }}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
