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
} from "@chakra-ui/react";
import SideBar from "../components/SideBar/SideBar";
import { useAtom } from "jotai";
import { fdpAtom, slidesAtom } from "../store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { AiFillFileMarkdown } from "react-icons/ai";
import ImportFile from "../components/ImportFile/ImportFile";

const SlideShow = dynamic(() => import("../components/SlideShow"), {
  ssr: false,
});

const Home: NextPage = () => {
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
      <SideBar />
      <Center h="full" w="full">
        {slides ? (
          <SlideShow slides={slides} />
        ) : (
          <ImportFile setData={setSlides} allowedExtensions={["md"]}>
            <Stack
              direction={{ base: "column", md: "row" }}
              align="center"
              textAlign="center"
              bg={importFileBoxBg}
              p={{ base: 3, md: 10 }}
              w={{ base: "20rem", sm: "full" }}
              rounded="lg"
              fontSize="xl"
              cursor="pointer"
              _hover={{
                boxShadow: "dark-lg",
              }}
            >
              <Text>Select a Markdown file from Fairdrive.</Text>
              <Icon fontSize="4xl" as={AiFillFileMarkdown} />
            </Stack>
          </ImportFile>
        )}
      </Center>
    </HStack>
  );
};

export default Home;
