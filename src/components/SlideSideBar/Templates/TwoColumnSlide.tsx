import { Flex, Heading, Text, VStack } from "@chakra-ui/react";

export default function TwoColumnSlide() {
  return (
    <Flex w="full">
      <VStack flex={1}>
        <Heading fontSize="12px" color="black">
          LEFT COLUMN
        </Heading>
        <Text w="90px" fontSize="10px" color="black">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi
          perferendis amet minus minima nihil asperiores culpa autem.
        </Text>
      </VStack>
      <VStack flex={1}>
        <Heading fontSize="12px" color="black">
          RIGHT COLUMN
        </Heading>
        <Text w="90px" fontSize="10px" color="black">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi
          perferendis amet minus minima nihil asperiores culpa autem.
        </Text>
      </VStack>
    </Flex>
  );
}
