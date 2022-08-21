import type { NextPage } from "next";
import dynamic from "next/dynamic";
import {
  Center,
  HStack,
  Spinner,
  useColorModeValue,
  Text,
  Icon,
  Stack,
  Box,
} from "@chakra-ui/react";
import SideBar from "../components/SideBar/SideBar";
import { useAtom } from "jotai";
import { fdpAtom, slidesAtom, slidesDeckAtom } from "../store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { AiFillFileMarkdown, AiOutlinePlus } from "react-icons/ai";
import { MdSlideshow } from "react-icons/md";
import ImportFile from "../components/ImportFile/ImportFile";
import { File } from "../types";

const SlideShow = dynamic(() => import("../components/SlideShow/SlideShow"), {
  ssr: false,
});

const Home: NextPage = () => {
  const [deck, setDeck] = useAtom(slidesDeckAtom);
  const [fdp] = useAtom(fdpAtom);
  const [slides, setSlides] = useAtom(slidesAtom);
  const router = useRouter();
  const importFileBoxBg = useColorModeValue("latte-crust", "frappe-crust");

  useEffect(() => {
    if (!fdp.account.wallet) {
      router.push("/login");
    }
  }, []);

  if (!fdp.account.wallet)
    return (
      <Center>
        <Spinner size="xl" />
      </Center>
    );

  return (
    <HStack h="80vh">
      {slides && <SideBar />}

      <Center w="full" h="full">
        {slides ? (
          <Box
            w={{ base: "65%", md: "70%", lg: "60%" }}
            h={{ base: "30%", md: "50%", lg: "70%" }}
          >
            <SlideShow
              key={slides}
              deckName="mainDeck"
              deck={deck}
              setDeck={setDeck}
              slides={slides}
            />
          </Box>
        ) : (
          <Stack direction={{ base: "column", lg: "row" }}>
            <ImportFile
              setFile={(file: File | undefined) => {
                if (file) setSlides(file.data.text());
              }}
              allowedExtensions={["md"]}
            >
              <HStack
                align="center"
                justify="space-between"
                textAlign="center"
                bg={importFileBoxBg}
                p={{ base: 3, md: 6 }}
                rounded="lg"
                fontSize="xl"
                cursor="pointer"
                _hover={{
                  boxShadow: "dark-lg",
                }}
                h="100px"
                w="300px"
              >
                <Text>Generate a slideshow from a markdown file.</Text>
                <Icon fontSize="4xl" as={AiFillFileMarkdown} />
              </HStack>
            </ImportFile>

            <ImportFile
              setFile={(file: File | undefined) => {
                if (file) setSlides(file.data.text());
              }}
              allowedExtensions={["md"]}
            >
              <HStack
                justify="space-between"
                align="center"
                textAlign="center"
                bg={importFileBoxBg}
                p={{ base: 3, md: 6 }}
                rounded="lg"
                fontSize="xl"
                cursor="pointer"
                _hover={{
                  boxShadow: "dark-lg",
                }}
                h="100px"
                w="300px"
              >
                <Text>Load a slideshow.</Text>
                <Icon fontSize="4xl" as={MdSlideshow} />
              </HStack>
            </ImportFile>

            <HStack
              justify="space-between"
              align="center"
              textAlign="center"
              bg={importFileBoxBg}
              p={{ base: 3, md: 6 }}
              rounded="lg"
              fontSize="xl"
              cursor="pointer"
              _hover={{
                boxShadow: "dark-lg",
              }}
              h="100px"
              w="300px"
            >
              <Text>New slideshow.</Text>
              <Icon fontSize="4xl" as={AiOutlinePlus} />
            </HStack>
          </Stack>
        )}
      </Center>
    </HStack>
  );
};

export default Home;
