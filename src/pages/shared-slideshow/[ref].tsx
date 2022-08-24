import { Box, Center, Spinner } from "@chakra-ui/react";
import { useAtom } from "jotai";
import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { fdpAtom } from "../../store";
import dynamic from "next/dynamic";

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

const SharedSlideshowPage: NextPage = () => {
  const router = useRouter();
  const ref = router.query.ref as string;
  const [fdp] = useAtom(fdpAtom);
  const [slides, setSlides] = useState<string | undefined>();

  const handleSetSlides = async () => {
    const data = await fdp.file.downloadShared(ref);
    const div = document.createElement("div");
    div.innerHTML = data.text();

    const fairDataElements = Array.from(div.querySelectorAll(".fair-data"));

    for (const fairDataElement of fairDataElements) {
      const shareRef = fairDataElement.getAttribute("data-shareref")!;
      const data = await fdp.file.downloadShared(shareRef);
      if (fairDataElement.tagName.toLowerCase() === "img") {
        //@ts-ignore
        fairDataElement.src = URL.createObjectURL(new Blob([data.buffer]));
      } else {
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
    <Center h="80vh">
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
  );
};

export default SharedSlideshowPage;
