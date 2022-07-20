import { useColorModeValue, VStack } from "@chakra-ui/react";
import PresentationSettings from "../Settings/SlideShowSettings";
import StyleSettings from "../Settings/StyleSettings/StyleSettings";

export default function SideBar() {
  return (
    <VStack
      fontSize="2xl"
      h="full"
      w="5rem"
      bg={useColorModeValue("gray.100", "gray.700")}
    >
      <PresentationSettings />
      <StyleSettings />
    </VStack>
  );
}
