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
  Text,
  useColorModeValue,
  IconButton,
  Tooltip,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { Pod } from "@fairdatasociety/fdp-storage/dist/pod/types";
import SelectPod from "../Select/SelectPod";
import SelectPath from "../Select/SelectPath";
import { useAtom } from "jotai";
import { fdpAtom } from "../../store";
import { AiOutlineInbox } from "react-icons/ai";
import SetFileNameModal from "./SetFileNameModal";
import { join } from "path";
import LoadingToast from "../Toast/LoadingToast";

interface SaveFileModalProps {
  isOpen: boolean;
  onClose: () => void;
  getData: () => string;
  onDone?: (podName: string, fullPath: string) => void;
  extension?: string;
}

export default function SaveFileModal({
  isOpen,
  onClose,
  getData,
  onDone,
  extension,
}: SaveFileModalProps) {
  const toast = useToast();
  const [fdp] = useAtom(fdpAtom);
  const [pod, setPod] = useState<Pod>();
  const [path, setPath] = useState<string>("/");
  const [fileName, setFileName] = useState("");
  const tooltipBg = useColorModeValue("latte-overlay1", "frappe-overlay1");
  const {
    isOpen: isSetNameOpen,
    onOpen: onSetNameOpen,
    onClose: onSetNameClose,
  } = useDisclosure();

  const handleModalClose = () => {
    setPod(undefined);
    setPath("/");
    setFileName("");
    onClose();
    onSetNameClose();
  };

  const handleSaveFile = () => {
    if (!pod) return;

    const fullPath = path;
    handleModalClose();

    toast({
      duration: null,
      render: () => <LoadingToast label="Uploading File" />,
    });

    const file = extension ? `${fileName}.${extension}` : fileName;

    const data = getData();

    fdp.file
      .uploadData(pod.name, join(fullPath, file), data)
      .then(() => {
        toast.closeAll();
        onDone && onDone(pod.name, join(fullPath, file));
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
              <Button onClick={onSetNameOpen} size="sm" colorScheme="green">
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
          <SetFileNameModal
            fileName={fileName}
            setFileName={setFileName}
            isOpen={isSetNameOpen}
            onClose={onSetNameClose}
            handleSaveFile={handleSaveFile}
            extension={extension}
          />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
