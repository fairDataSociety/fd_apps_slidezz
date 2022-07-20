import { Flex } from "@chakra-ui/react";
import ThemeToggleButton from "./ThemeToggleButton";

export default function NavBar() {
  return (
    <Flex flexDir="row-reverse" py={4} px={10} w="full">
      <ThemeToggleButton />
    </Flex>
  );
}
