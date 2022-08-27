import type { NextPage } from "next";
import dynamic from "next/dynamic";
import {
  Center,
  HStack,
  Spinner,
  Text,
  Icon,
  Stack,
  Box,
} from "@chakra-ui/react";
import SideBar from "../components/SideBar/SideBar";
import { useAtom } from "jotai";
import { fdpAtom, slidesAtom, slidesDeckAtom, slidesLogoAtom } from "../store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { AiFillFileMarkdown, AiOutlinePlus } from "react-icons/ai";
import { MdSlideshow } from "react-icons/md";
import ImportFile from "../components/ImportFile/ImportFile";
import { File } from "../types";
import Card from "../components/Card/Card";
import { loadSlideshow } from "../utils";
import NavBar from "../components/NavBar/NavBar";

const SlideShow = dynamic(() => import("../components/SlideShow/SlideShow"), {
  ssr: false,
  loading: () => (
    <Center h="full">
      <Spinner size="xl" />
    </Center>
  ),
});

const Home: NextPage = () => {
  const [deck, setDeck] = useAtom(slidesDeckAtom);
  const [fdp] = useAtom(fdpAtom);
  const [slides, setSlides] = useAtom(slidesAtom);
  const [slidesLogo, setSlidesLogo] = useAtom(slidesLogoAtom);
  const router = useRouter();

  useEffect(() => {
    if (!fdp.account.wallet) {
      router.push("/login");
    }
  }, []);

  if (!fdp.account.wallet)
    return (
      <Center w="full" h="100vh">
        <Spinner size="xl" />
      </Center>
    );

  return (
    <>
      <NavBar />
      <HStack h="80vh">
        {slides && <SideBar />}

        <Center w="full" h="full">
          {slides ? (
            <Box
              w={{ base: "65%", md: "70%", lg: "60%" }}
              h={{ base: "30%", md: "50%", lg: "70%" }}
            >
              <SlideShow
                key={slides.data}
                deckName="mainDeck"
                deck={deck}
                setDeck={setDeck}
                slides={slides}
              />
            </Box>
          ) : (
            <Stack direction={{ base: "column", lg: "row" }}>
              <ImportFile
                setFile={async (file: File | undefined) => {
                  if (file) setSlides({ data: file.data.text() });
                }}
                allowedExtensions={["md"]}
              >
                <Card>
                  <Text>Generate a slideshow from a markdown file.</Text>
                  <Icon fontSize="4xl" as={AiFillFileMarkdown} />
                </Card>
              </ImportFile>

              <ImportFile
                setFile={async (file: File | undefined) => {
                  await loadSlideshow(file, fdp, setSlides, setSlidesLogo);
                }}
                allowedExtensions={["html"]}
                initialPod={process.env.NEXT_PUBLIC_SLIDES_POD}
              >
                <Card>
                  <Text>Generate a slideshow from an existing slides.</Text>
                  <Icon fontSize="4xl" as={MdSlideshow} />
                </Card>
              </ImportFile>

              <Box
                onClick={() => {
                  setSlides({ data: "## Slide 1" });
                }}
              >
                <Card>
                  <Text>New slideshow.</Text>
                  <Icon fontSize="4xl" as={AiOutlinePlus} />
                </Card>
              </Box>
            </Stack>
          )}
        </Center>
      </HStack>
    </>
  );
};

export default Home;
