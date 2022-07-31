import type { NextPage } from "next";
import dynamic from "next/dynamic";
import {
  Center,
  HStack,
  Spinner,
  useColorModeValue,
  Text,
  Icon,
  useDisclosure,
} from "@chakra-ui/react";
import SideBar from "../components/SideBar/SideBar";
import { useAtom } from "jotai";
import { fdpAtom } from "../store";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { AiFillFileMarkdown } from "react-icons/ai";
import FileSelectModal from "../components/FileSelectModal/FileSelectModal";

const SlideShow = dynamic(() => import("../components/SlideShow"), {
  ssr: false,
});

const Home: NextPage = () => {
  const [fdp] = useAtom(fdpAtom);
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();

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
    <HStack h="91vh">
      <SideBar />
      <Center h="full" w="full">
        <HStack
          bg={useColorModeValue("latte-crust", "frappe-crust")}
          p={10}
          rounded="lg"
          fontSize="xl"
          cursor="pointer"
          _hover={{
            boxShadow: "lg",
          }}
          onClick={onOpen}
        >
          <Text>Select a Markdown file from Fairdrive.</Text>
          <Icon fontSize="4xl" as={AiFillFileMarkdown} />
        </HStack>

        <FileSelectModal isOpen={isOpen} onClose={onClose} />
      </Center>
    </HStack>
  );
};

export default Home;
