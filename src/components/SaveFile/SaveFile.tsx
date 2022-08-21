import { Box, useDisclosure } from "@chakra-ui/react";
import SaveFileModal from "./SaveFileModal";
import { File } from "../../types";

interface SaveFileProps {
  file: File;
  children: React.ReactNode;
}

export default function SaveFile({ file, children }: SaveFileProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box onClick={onOpen}>{children}</Box>
      <SaveFileModal file={file} isOpen={isOpen} onClose={onClose} />
    </>
  );
}
