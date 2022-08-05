import { Box, useDisclosure } from "@chakra-ui/react";
import ImportFileModal from "./ImportFileModal";
import type { Data } from "@ethersphere/bee-js";

interface ImportFileProps {
  setData: (data: Data | undefined) => void;
  children: React.ReactNode;
  allowedExtensions?: string[];
}

export default function ImportFile({
  children,
  setData,
  allowedExtensions,
}: ImportFileProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box onClick={onOpen}>{children}</Box>
      <ImportFileModal
        setData={setData}
        isOpen={isOpen}
        onClose={onClose}
        allowedExtensions={allowedExtensions}
      />
    </>
  );
}
