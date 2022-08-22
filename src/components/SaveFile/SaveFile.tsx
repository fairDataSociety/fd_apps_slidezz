import { Box, useDisclosure } from "@chakra-ui/react";
import SaveFileModal from "./SaveFileModal";

interface SaveFileProps {
  getData: () => string;
  onDone?: (podName: string, fullPath: string) => void;
  children: React.ReactNode;
  extension?: string;
}

export default function SaveFile({
  getData,
  children,
  extension,
  onDone,
}: SaveFileProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box onClick={onOpen}>{children}</Box>
      <SaveFileModal
        getData={getData}
        extension={extension}
        isOpen={isOpen}
        onClose={onClose}
        onDone={onDone}
      />
    </>
  );
}
