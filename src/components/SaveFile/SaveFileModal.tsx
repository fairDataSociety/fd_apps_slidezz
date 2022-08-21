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
  Button,
} from "@chakra-ui/react";
import { useState } from "react";
import { Pod } from "@fairdatasociety/fdp-storage/dist/pod/types";
import SelectPod from "../Select/SelectPod";
import SelectPath from "../Select/SelectPath";
import { useAtom } from "jotai";
import { fdpAtom } from "../../store";
import { AiOutlineInbox } from "react-icons/ai";
import { File } from "../../types";

interface SaveFileModalProps {
  isOpen: boolean;
  onClose: () => void;
  file: File;
}

export default function SaveFileModal({
  isOpen,
  onClose,
  file,
}: SaveFileModalProps) {
  const toast = useToast();
  const [fdp] = useAtom(fdpAtom);
  const [pod, setPod] = useState<Pod>();
  const [path, setPath] = useState<string>("/");
  const toastBg = useColorModeValue("latte-surface2", "frappe-surface2");
  const tooltipBg = useColorModeValue("latte-overlay1", "frappe-overlay1");

  const handleModalClose = () => {
    setPod(undefined);
    setPath("/");
    onClose();
  };

  const handleSaveFile = () => {
    if (!pod) return;

    const fullPath = path;
    handleModalClose();

    toast({
      duration: null,
      render: () => (
        <HStack fontSize="xl" bg={toastBg} p={3}>
          <Spinner size="sm" />
          <Text>Uploading File</Text>
        </HStack>
      ),
    });

    fdp.file
      .uploadData(pod.name, fullPath, file.data)
      .then(() => {
        toast.closeAll();
      })
      .catch((error: any) => {
        toast.closeAll();

        toast({
          title: "Failed to upload file",
          description: error.message,
          status: "error",
          duration: 9000,
          isClosable: true,
        });
      });
  };

  return (
    <Modal
      closeOnOverlayClick={false}
      size={{ base: "xs", sm: "md", md: "2xl" }}
      isOpen={isOpen}
      onClose={handleModalClose}
    >
      <ModalOverlay />
      <ModalContent bg={useColorModeValue("latte-crust", "frappe-crust")}>
        <ModalHeader>Select a {pod ? "Folder" : "Pod"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody my={2} overflowY="scroll">
          {pod && (
            <HStack justify="space-between" mb={3}>
              <HStack>
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
              <Button onClick={handleSaveFile} size="sm" colorScheme="green">
                Select
              </Button>
            </HStack>
          )}
          <Box h="300px">
            {pod ? (
              <SelectPath pod={pod} setPath={setPath} />
            ) : (
              <SelectPod setPod={setPod} />
            )}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
