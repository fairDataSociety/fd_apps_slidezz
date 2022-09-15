import { Flex, Heading, Text, VStack, Image, Box } from '@chakra-ui/react'

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
        <Image
          w="80%"
          objectFit="cover"
          src={`${window._detectedSiteType.basePath}/images/sample.png`}
        />
      </Flex>
    </Flex>
  )
}
