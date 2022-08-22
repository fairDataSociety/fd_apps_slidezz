import { Box, useDisclosure } from "@chakra-ui/react";
import SaveFileModal from "./SaveFileModal";

interface SaveFileProps {
  getData: () => string;
  children: React.ReactNode;
  extension?: string;
}

export default function SaveFile({
  getData,
  children,
  extension,
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
      />
    </>
  );
}
