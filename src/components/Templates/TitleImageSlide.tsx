import { Box, Heading, Image, VStack } from "@chakra-ui/react";

export default function TitleImageSlide() {
  return (
    <VStack>
      <Heading size="sm" color="black">
        TITLE TEXT
      </Heading>
      <Image objectFit="cover" w="200px" h="100px" src="/images/sample.png" />
    </VStack>
  );
}
