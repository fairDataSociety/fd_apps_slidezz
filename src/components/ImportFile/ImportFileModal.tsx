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
  IconButton,
  Tooltip,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Pod } from "@fairdatasociety/fdp-storage/dist/pod/types";
import SelectPod from "./SelectPod";
import SelectFile from "./SelectFile";
import { useAtom } from "jotai";
import { fdpAtom } from "../../store";
import type { Data } from "@ethersphere/bee-js";
import { AiOutlineInbox } from "react-icons/ai";

interface ImportFileModalProps {
  isOpen: boolean;
  onClose: () => void;
  setData: (data: Data) => void;
  allowedExtensions?: string[];
}

export default function ImportFileModal({
  isOpen,
  onClose,
  setData,
  allowedExtensions,
}: ImportFileModalProps) {
  const toast = useToast();
  const [fdp] = useAtom(fdpAtom);
  const [pod, setPod] = useState<Pod>();
  const [filePath, setFilePath] = useState<string>();
  const toastBg = useColorModeValue("latte-surface2", "frappe-surface2");
  const tooltipBg = useColorModeValue("latte-overlay1", "frappe-overlay1");

  const handleModalClose = () => {
    setPod(undefined);
    setFilePath(undefined);
    onClose();
  };

  useEffect(() => {
    if (pod && filePath) {
      const fullFilePath = filePath;
      handleModalClose();

      toast({
        duration: null,
        render: () => (
          <HStack fontSize="xl" bg={toastBg} p={3}>
            <Spinner size="sm" />
            <Text>Loading File</Text>
          </HStack>
        ),
      });

      fdp.file
        .downloadData(pod.name, fullFilePath)
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
    <Modal
      size={{ sm: "md", md: "2xl" }}
      isOpen={isOpen}
      onClose={handleModalClose}
    >
      <ModalOverlay />
      <ModalContent bg={useColorModeValue("latte-crust", "frappe-crust")}>
        <ModalHeader>Select a {pod ? "File" : "Pod"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody my={2} overflowY="scroll">
          {pod && (
            <HStack mb={3}>
              <Tooltip bg={tooltipBg} hasArrow label="Select another pod">
                <IconButton
                  size="sm"
                  icon={<AiOutlineInbox />}
                  aria-label="pod"
                  onClick={() => setPod(undefined)}
                />
              </Tooltip>
              <Text>Pod: {pod.name}</Text>
            </HStack>
          )}
          <Box h="300px">
            {pod ? (
              <SelectFile
                pod={pod}
                setFilePath={setFilePath}
                allowedExtensions={allowedExtensions}
              />
            ) : (
              <SelectPod setPod={setPod} />
            )}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
