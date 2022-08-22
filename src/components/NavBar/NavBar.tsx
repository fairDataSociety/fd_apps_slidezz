import { HStack, Link, IconButton } from "@chakra-ui/react";
import ThemeToggleButton from "./ThemeToggleButton";
import { IoLogoGithub } from "react-icons/io5";
import { ArrowBackIcon } from "@chakra-ui/icons";
import { useAtom } from "jotai";
import { slidesAtom, slidesDeckAtom } from "../../store";

export default function NavBar() {
  const [slides, setSlides] = useAtom(slidesAtom);
  const [deck, setDeck] = useAtom(slidesDeckAtom);

  return (
    <HStack
      justify="space-between"
      fontSize="lg"
      gap={10}
      flexDir="row-reverse"
      py={4}
      px={5}
    >
      <HStack gap={5}>
        <Link
          href="https://github.com/soheil555/fairdrive-apps-slideshow"
          isExternal
        >
          <HStack>
            <IoLogoGithub /> <span>Github</span>
          </HStack>
        </Link>
        <ThemeToggleButton />
      </HStack>

      {slides && (
        <IconButton
          onClick={() => {
            setSlides(undefined);
            setDeck(undefined);
          }}
          aria-label="back"
          icon={<ArrowBackIcon />}
        />
      )}
    </HStack>
  );
}
