import { Box, useColorModeValue } from "@chakra-ui/react";
import PresentationSettings from "../Settings/SlideShowSettings";
import StyleSettings from "../Settings/StyleSettings/StyleSettings";

export default function SideBar() {
  return (
    <Box
      bg={useColorModeValue("latte-crust", "frappe-crust")}
      fontSize="2xl"
      w="5rem"
      position="fixed"
      top={5}
      left={5}
      rounded="2xl"
      overflow="hidden"
    >
      <PresentationSettings />
      <StyleSettings />
    </Box>
  );
}
