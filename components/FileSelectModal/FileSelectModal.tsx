import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Pod } from "@fairdatasociety/fdp-storage/dist/pod/types";
import SelectPod from "./SelectPod";
import SelectFile from "./SelectFile";

interface FileSelectModalInterface {
  isOpen: boolean;
  onClose: () => void;
}

export default function FileSelectModal({
  isOpen,
  onClose,
}: FileSelectModalInterface) {
  const [pod, setPod] = useState<Pod>();
  const [file, setFile] = useState<string>();

  useEffect(() => {
    if (file) console.log(file);
  }, [file]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        setPod(undefined);
        setFile(undefined);
        onClose();
      }}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Select a {pod ? "File" : "Pod"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody my={2} overflowY="scroll">
          <Box h="300px">
            {pod ? (
              <SelectFile pod={pod} setFile={setFile} />
            ) : (
              <SelectPod setPod={setPod} />
            )}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
