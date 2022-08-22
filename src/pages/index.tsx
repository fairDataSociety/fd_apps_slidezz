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
import { fdpAtom, slidesAtom, slidesDeckAtom } from "../store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { AiFillFileMarkdown, AiOutlinePlus } from "react-icons/ai";
import { MdSlideshow } from "react-icons/md";
import ImportFile from "../components/ImportFile/ImportFile";
import { File } from "../types";
import Card from "../components/Card/Card";

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
  const router = useRouter();

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
              setFile={async (file: File | undefined) => {
                if (file) setSlides(file.data.text());
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
                if (file) {
                  const template = document.createElement("template");
                  template.innerHTML = file.data.text();

                  const fairData = Array.from(
                    template.content.querySelectorAll(".fair-data")
                  );

                  for await (const element of fairData) {
                    const podName = element.getAttribute("data-pod");
                    const path = element.getAttribute("data-path");

                    if (podName && path) {
                      try {
                        const data = await fdp.file.downloadData(podName, path);
                        //@ts-ignore
                        element.src = URL.createObjectURL(
                          new Blob([data.buffer])
                        );
                      } catch (error) {
                        console.log(error);
                      }
                    }
                  }

                  setSlides(template.innerHTML);
                }
              }}
              allowedExtensions={["html"]}
            >
              <Card>
                <Text>Load a slideshow.</Text>
                <Icon fontSize="4xl" as={MdSlideshow} />
              </Card>
            </ImportFile>

            <Box
              onClick={() => {
                setSlides("## Slide 1");
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
  );
};

export default Home;
