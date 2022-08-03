import { HStack, Link } from "@chakra-ui/react";
import ThemeToggleButton from "./ThemeToggleButton";
import { IoLogoGithub } from "react-icons/io5";

export default function NavBar() {
  return (
    <HStack fontSize="lg" gap={10} flexDir="row-reverse" py={4} px={10}>
      <ThemeToggleButton />
      <Link
        href="https://github.com/soheil555/fairdrive-apps-slideshow"
        isExternal
      >
        <HStack>
          <IoLogoGithub /> <span>Github</span>
        </HStack>
      </Link>
    </HStack>
  );
}
