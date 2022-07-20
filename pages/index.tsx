import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { Center, HStack, VStack } from "@chakra-ui/react";
import SideBar from "../components/SideBar/SideBar";
import NavBar from "../components/NavBar/NavBar";

const SlideShow = dynamic(() => import("../components/SlideShow"), {
  ssr: false,
});

const Home: NextPage = () => {
  return (
    <HStack h="100vh">
      <SideBar />
      <VStack h="full" w="full">
        <NavBar />
        <Center h="full" w="full">
          <SlideShow />
        </Center>
      </VStack>
    </HStack>
  );
};

export default Home;
