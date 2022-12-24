import { Center, Heading, Text, VStack } from '@chakra-ui/react'

export default function ImageTitleSlide() {
  return (
    <VStack>
      <Center bg="gray.900" objectFit="cover" w="200px" h="100px">
        <Text>Sample Image</Text>
      </Center>
      <Heading size="sm" color="black">
        TITLE TEXT
      </Heading>
    </VStack>
  )
}
