import { Box, useColorModeValue } from "@chakra-ui/react";
import AddImage from "../AddImage/AddImage";
import AddVideo from "../AddVideo/AddVideo";

export default function SlideSideBar() {
  return (
    <Box
      bg={useColorModeValue("latte-crust", "frappe-crust")}
      fontSize={{ base: "xs", md: "md" }}
      position="absolute"
      borderRadius="lg"
      overflow="hidden"
      top={0}
      right={-16}
    >
      <AddImage />
      <AddVideo />
    </Box>
  );
}
