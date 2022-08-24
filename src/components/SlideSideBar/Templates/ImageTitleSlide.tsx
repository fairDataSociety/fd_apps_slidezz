import { Heading, Image, VStack } from "@chakra-ui/react";

export default function ImageTitleSlide() {
  return (
    <VStack>
      <Image objectFit="cover" w="200px" h="100px" src="/images/sample.png" />
      <Heading size="sm" color="black">
        TITLE TEXT
      </Heading>
    </VStack>
  );
}
