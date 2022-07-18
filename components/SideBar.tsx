import { VStack } from "@chakra-ui/react";
import PresentationSettings from "./PresentationSettings";
import StyleSettings from "./StyleSettings";

export default function SideBar() {
  return (
    <VStack fontSize="2xl" h="100vh" w="5rem" bg="gray.100">
      <PresentationSettings />
      <StyleSettings />
    </VStack>
  );
}
