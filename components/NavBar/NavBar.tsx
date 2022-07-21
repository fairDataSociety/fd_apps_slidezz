import { Heading, HStack, Link } from "@chakra-ui/react";
import ThemeToggleButton from "./ThemeToggleButton";

export default function NavBar() {
  return (
    <HStack gap={10} flexDir="row-reverse" py={4} px={10} w="full">
      <ThemeToggleButton />
      <Link
        href="https://github.com/soheil555/fairdrive-apps-slideshow"
        isExternal
      >
        Github
      </Link>
    </HStack>
  );
}
