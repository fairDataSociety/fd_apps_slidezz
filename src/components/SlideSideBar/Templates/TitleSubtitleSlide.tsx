import { Box, Heading } from "@chakra-ui/react";

export default function TitleSubtitleSlide() {
  return (
    <Box>
      <Heading mb={2} size="md" color="black">
        TITLE TEXT
      </Heading>
      <Heading size="sm" color="black" textAlign="center">
        SUBTITLE
      </Heading>
    </Box>
  );
}
