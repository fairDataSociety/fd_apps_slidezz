import { VStack } from "@chakra-ui/react";
import PresentationSettings from "../Settings/SlideShowSettings";
import StyleSettings from "../Settings/StyleSetting/StyleSettings";

export default function SideBar() {
  return (
    <VStack fontSize="2xl" h="full" w="5rem" bg="gray.100">
      <PresentationSettings />
      <StyleSettings />
    </VStack>
  );
}
