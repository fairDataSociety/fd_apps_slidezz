import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { Center, HStack } from "@chakra-ui/react";
import SideBar from "../components/SideBar/SideBar";

const SlideShow = dynamic(() => import("../components/SlideShow"), {
  ssr: false,
});

const Home: NextPage = () => {
  return (
    <HStack h="100vh">
      <SideBar />
      <Center h="full" w="full">
        <SlideShow />
      </Center>
    </HStack>
  );
};

export default Home;
