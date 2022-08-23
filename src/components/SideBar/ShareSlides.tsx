import { useAtom } from "jotai";
import { BsShare } from "react-icons/bs";
import { fdpAtom, slidesAtom } from "../../store";
import {} from "@fairdatasociety/fdp-storage";
import SideBarItem from "./SideBarItem";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  Center,
} from "@chakra-ui/react";

export default function ShareSlides() {
  const [fdp] = useAtom(fdpAtom);
  const [slides] = useAtom(slidesAtom);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleShareSlides = () => {};

  return (
    <>
      {slides && !slides.podName ? (
        <>
          <SideBarItem
            onClick={async () => onOpen()}
            icon={BsShare}
            label="Share"
          />

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Share slides</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                {slides.isShared ? (
                  ""
                ) : (
                  <Center>
                    <Button onClick={handleShareSlides}>Share</Button>
                  </Center>
                )}
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      ) : null}
    </>
  );
}
