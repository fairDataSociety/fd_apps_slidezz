import type { NextPage } from "next";
import dynamic from "next/dynamic";
import { Center, HStack, Spinner, VStack } from "@chakra-ui/react";
import SideBar from "../components/SideBar/SideBar";
import { useAtom } from "jotai";
import { fdpAtom } from "../store";
import { useRouter } from "next/router";
import { useEffect } from "react";

const SlideShow = dynamic(() => import("../components/SlideShow"), {
  ssr: false,
});

const Home: NextPage = () => {
  const [fdp] = useAtom(fdpAtom);
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
    <HStack h="91vh">
      <SideBar />
      <Center h="full" w="full">
        <SlideShow />
      </Center>
    </HStack>
  );
};

export default Home;
