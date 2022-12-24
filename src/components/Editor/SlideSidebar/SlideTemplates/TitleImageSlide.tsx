import { Center, Heading, Text, VStack } from '@chakra-ui/react'

export default function TitleImageSlide() {
  return (
    <VStack>
      <Heading size="sm" color="black">
        TITLE TEXT
      </Heading>
      <Center bg="gray.900" objectFit="cover" w="200px" h="100px">
        <Text>Sample Image</Text>
      </Center>
    </VStack>
  )
}
