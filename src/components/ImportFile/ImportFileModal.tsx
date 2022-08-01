import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
  useToast,
  HStack,
  Spinner,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Pod } from "@fairdatasociety/fdp-storage/dist/pod/types";
import SelectPod from "./SelectPod";
import SelectFile from "./SelectFile";
import { useAtom } from "jotai";
import { fdpAtom } from "../../store";
import type { Data } from "@ethersphere/bee-js";

interface ImportFileModalProps {
  isOpen: boolean;
  onClose: () => void;
  setData: (data: Data) => void;
}

export default function ImportFileModal({
  isOpen,
  onClose,
  setData,
}: ImportFileModalProps) {
  const toast = useToast();
  const [fdp] = useAtom(fdpAtom);
  const [pod, setPod] = useState<Pod>();
  const [filePath, setFilePath] = useState<string>();

  const handleClose = () => {
    setPod(undefined);
    setFilePath(undefined);
    onClose();
  };

  useEffect(() => {
    if (pod && filePath) {
      const fullFilePath = filePath;
      handleClose();

      toast({
        duration: null,
        render: () => (
          <HStack
            fontSize="xl"
            bg={useColorModeValue("latte-surface2", "frappe-surface2")}
            p={3}
          >
            <Spinner size="sm" />
            <Text>Loading File</Text>
          </HStack>
        ),
      });

      fdp.file
        .downloadData(pod.name, fullFilePath + "dewd")
        .then((data) => {
          setData(data);
          toast.closeAll();
        })
        .catch((error: any) => {
          toast.closeAll();

          toast({
            title: "Failed to load file",
            description: error.message,
            status: "error",
            duration: 9000,
            isClosable: true,
          });
        });
    }
  }, [pod, filePath]);

  return (
    <Modal size="2xl" isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent bg={useColorModeValue("latte-crust", "frappe-crust")}>
        <ModalHeader>Select a {pod ? "File" : "Pod"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody my={2} overflowY="scroll">
          {pod && <Text mb={3}>Pod: {pod.name}</Text>}
          <Box h="300px">
            {pod ? (
              <SelectFile pod={pod} setFilePath={setFilePath} />
            ) : (
              <SelectPod setPod={setPod} />
            )}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
