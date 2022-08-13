import SideBarItem from "../SideBar/SideBarItem";
import { BsFillImageFill } from "react-icons/bs";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
} from "@chakra-ui/react";
import { useAtom } from "jotai";
import { mediaAtom } from "../../store";

export default function AddImage() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [media] = useAtom(mediaAtom);

  return (
    <>
      <SideBarItem icon={BsFillImageFill} label="Image" onClick={onOpen} />

      <Modal size="4xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Select an image</ModalHeader>
          <ModalCloseButton />
          <ModalBody></ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
}
