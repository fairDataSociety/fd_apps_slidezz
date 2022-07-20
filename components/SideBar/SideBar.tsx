import { Box, useColorModeValue } from "@chakra-ui/react";
import PresentationSettings from "../Settings/SlideShowSettings";
import StyleSettings from "../Settings/StyleSettings/StyleSettings";

export default function SideBar() {
  return (
    <Box
      bg={useColorModeValue("crust.50", "crust.700")}
      fontSize="2xl"
      h="full"
      w="5rem"
    >
      <PresentationSettings />
      <StyleSettings />
    </Box>
  );
}
