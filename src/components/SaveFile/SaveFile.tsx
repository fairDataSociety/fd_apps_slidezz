import { Box, useDisclosure } from "@chakra-ui/react";
import SaveFileModal from "./SaveFileModal";

interface SaveFileProps {
  data: string;
  children: React.ReactNode;
  extension?: string;
}

export default function SaveFile({ data, children, extension }: SaveFileProps) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box onClick={onOpen}>{children}</Box>
      <SaveFileModal
        data={data}
        extension={extension}
        isOpen={isOpen}
        onClose={onClose}
      />
    </>
  );
}
