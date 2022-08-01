import { Box, useDisclosure } from "@chakra-ui/react";
import ImportFileModal from "./ImportFileModal";
import type { Data } from "@ethersphere/bee-js";

interface ImportFileProps {
  setData: (data: Data) => void;
  children: React.ReactNode;
}

export default function ImportFile({ children, setData }: ImportFileProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box onClick={onOpen}>{children}</Box>
      <ImportFileModal setData={setData} isOpen={isOpen} onClose={onClose} />
    </>
  );
}
