import { Center, Flex, Heading, Text, VStack } from '@chakra-ui/react'

export default function TwoColumnImageSlide() {
  return (
    <Flex w="full">
      <VStack flex={1}>
        <Heading fontSize="12px" color="black">
          LEFT COLUMN
        </Heading>
        <Text w="90px" fontSize="10px" color="black">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Excepturi
          perferendis amet minus minima.
        </Text>
      </VStack>
      <Flex align="center" justify="center" flex={1}>
        <Center bg="gray.900" objectFit="cover" h="full" w="80%">
          <Text>Sample Image</Text>
        </Center>
      </Flex>
    </Flex>
  )
}
