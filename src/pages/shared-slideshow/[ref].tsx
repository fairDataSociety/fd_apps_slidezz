import { Box, Center, HStack, Spinner } from "@chakra-ui/react";
import { useAtom } from "jotai";
import type { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import { fdpAtom } from "../../store";
import dynamic from "next/dynamic";
import { FdpStorage } from "@fairdatasociety/fdp-storage";
import SideBar from "../../components/SideBar/SideBar";

const SharedSlideShow = dynamic(
  () => import("../../components/SharedSlideShow/SharedSlideShow"),
  {
    ssr: false,
    loading: () => (
      <Center h="full">
        <Spinner size="xl" />
      </Center>
    ),
  }
);

export const getServerSideProps: GetServerSideProps = async (context) => {
  const ref = context.params!.ref as string;

  const fdp = new FdpStorage(
    process.env.NEXT_PUBLIC_BEE_URL as string,
    process.env.NEXT_PUBLIC_BEE_DEBUG_URL as string,
    {
      ensOptions: {
        performChecks: true,
        rpcUrl: process.env.NEXT_PUBLIC_RPC_URL as string,
        contractAddresses: {
          fdsRegistrar: process.env.NEXT_PUBLIC_FDS_REGISTRAR as string,
          ensRegistry: process.env.NEXT_PUBLIC_ENS_REGISTRY as string,
          publicResolver: process.env.NEXT_PUBLIC_PUBLIC_RESOLVER as string,
        },
      },
      ensDomain: "fds",
    }
  );

  const data = await fdp.file.downloadShared(ref);

  return {
    props: { slidesHTML: data.text() },
  };
};

const SharedSlideshowPage: NextPage<{ slidesHTML: string }> = ({
  slidesHTML,
}) => {
  const [fdp] = useAtom(fdpAtom);
  const [slides, setSlides] = useState<string | undefined>();

  const handleSetSlides = async () => {
    const div = document.createElement("div");
    div.innerHTML = slidesHTML;

    const moveableElements = Array.from(
      div.querySelectorAll('[style*="cursor: pointer"]')
    ) as HTMLElement[];

    moveableElements.forEach((element) => {
      element.style.cursor = "auto";
      element.contentEditable = "false";
    });

    const fairDataElements = Array.from(div.querySelectorAll(".fair-data"));

    for (const fairDataElement of fairDataElements) {
      const shareRef = fairDataElement.getAttribute("data-shareref")!;
      const data = await fdp.file.downloadShared(shareRef);
      if (fairDataElement.tagName.toLowerCase() === "img") {
        //@ts-ignore
        fairDataElement.src = URL.createObjectURL(new Blob([data.buffer]));
      } else {
        // video element
        const sourceElement = fairDataElement.querySelector("source")!;
        sourceElement.src = URL.createObjectURL(new Blob([data.buffer]));
      }
    }
    setSlides(div.innerHTML);
  };

  useEffect(() => {
    handleSetSlides();
  }, []);

  return (
    <HStack h="80vh">
      {slides && <SideBar isSlidesReadOnly={true} />}
      <Center h="full" w="full">
        {slides ? (
          <Box
            w={{ base: "65%", md: "70%", lg: "60%" }}
            h={{ base: "30%", md: "50%", lg: "70%" }}
          >
            <SharedSlideShow slides={slides} />
          </Box>
        ) : (
          <Spinner size="xl" />
        )}
      </Center>
    </HStack>
  );
};

export default SharedSlideshowPage;
