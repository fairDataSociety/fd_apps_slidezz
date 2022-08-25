import {
  Text,
  Box,
  useClipboard,
  HStack,
  IconButton,
  Tooltip,
  Textarea,
} from "@chakra-ui/react";
import { BiCopy } from "react-icons/bi";

interface CopyPanelProps {
  label: string;
  text: string;
}

export default function CopyPanel({ label, text }: CopyPanelProps) {
  const { hasCopied, onCopy } = useClipboard(text);

  return (
    <Box>
      <Text mb={1}>{label}</Text>

      <HStack align="flex-start">
        <Box w="full">
          <Textarea
            h="120px"
            fontSize="sm"
            isReadOnly
            value={text}
            resize="none"
          />
        </Box>

        <Tooltip
          closeOnClick={false}
          placement="right"
          hasArrow
          label={hasCopied ? "Copied" : "Copy to clipboard"}
        >
          <IconButton
            size="sm"
            variant="outline"
            aria-label="copy"
            icon={<BiCopy />}
            onClick={onCopy}
          />
        </Tooltip>
      </HStack>
    </Box>
  );
}
