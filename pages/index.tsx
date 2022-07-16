import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { Box } from "@chakra-ui/react";

const SlideShow = dynamic(() => import("../components/SlideShow"), {
  ssr: false,
});

const Home: NextPage = () => {
  return (
    <Box w="100vw" h="100vh">
      <SlideShow />
    </Box>
  );
};

export default Home;
