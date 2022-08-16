import { Box, IconButton } from "@chakra-ui/react";
import { BiPlus } from "react-icons/bi";

export default function NewSlide() {
  return (
    <Box position="absolute" bottom={4} right={-14}>
      <IconButton rounded="full" aria-label="plus" icon={<BiPlus />} />
    </Box>
  );
}
