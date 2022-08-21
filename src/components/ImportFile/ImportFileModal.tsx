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
import SelectPod from "../Select/SelectPod";
import SelectPath from "../Select/SelectPath";
import { useAtom } from "jotai";
import { fdpAtom } from "../../store";
import { AiOutlineInbox } from "react-icons/ai";
import { basename, extname } from "path";
import { File } from "../../types";

interface ImportFileModalProps {
  isOpen: boolean;
  onClose: () => void;
  setFile: (file: File | undefined) => void;
  allowedExtensions?: string[];
}

export default function ImportFileModal({
  isOpen,
  onClose,
  setFile,
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
      setFile(undefined);

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
          setFile({
            podName: pod.name,
            name: basename(fullFilePath),
            fullPath: fullFilePath,
            extension: extname(fullFilePath).slice(1),
            data,
          });
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
      closeOnOverlayClick={false}
      size={{ base: "xs", sm: "md", md: "2xl" }}
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
              <SelectPath
                pod={pod}
                setPath={setFilePath}
                allowedExtensions={allowedExtensions}
                selectFile={true}
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
