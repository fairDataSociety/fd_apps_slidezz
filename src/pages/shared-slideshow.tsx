import { Box, Center, HStack, Spinner } from "@chakra-ui/react";
import { useAtom } from "jotai";
import type { NextPage } from "next";
import { useEffect, useState } from "react";
import { fdpAtom, slidesLogoAtom } from "../store";
import dynamic from "next/dynamic";
import SideBar from "../components/SideBar/SideBar";
import { useRouter } from "next/router";
import NavBar from "../components/NavBar/NavBar";

const SharedSlideShow = dynamic(
  () => import("../components/SharedSlideShow/SharedSlideShow"),
  {
    ssr: false,
    loading: () => (
      <Center h="full">
        <Spinner size="xl" />
      </Center>
    ),
  }
);

const EmbedSlideShow = dynamic(
  () => import("../components/EmbedSlideShow/EmbedSlideShow"),
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
  const [fdp] = useAtom(fdpAtom);
  const [slidesLogo, setSlidesLogo] = useAtom(slidesLogoAtom);
  const [slides, setSlides] = useState<string | undefined>();
  const [isEmbed, setIsEmbed] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      (async () => {
        const slidesShareRef = router.query.ref as string;
        const isEmbed = typeof router.query.embed === "string";

        setIsEmbed(isEmbed);

        const slidesHTML = (
          await fdp.file.downloadShared(slidesShareRef)
        ).text();

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

        const logoImageElement = div.querySelector(".logo-image");
        if (logoImageElement && setSlidesLogo) {
          const shareRef = logoImageElement.getAttribute("data-shareref")!;
          const data = await fdp.file.downloadShared(shareRef);

          setSlidesLogo({
            data,
          });

          div.removeChild(logoImageElement);
        }

        setSlides(div.innerHTML);
      })();
    }
  }, [router.isReady]);

  if (!slides)
    return (
      <Center h="100vh" w="full">
        <Spinner size="xl" />
      </Center>
    );

  if (isEmbed) return <EmbedSlideShow slides={slides} />;

  return (
    <>
      <NavBar />
      <HStack h="80vh">
        <SideBar isSlidesReadOnly={true} />
        <Center h="full" w="full">
          <Box
            w={{ base: "65%", md: "70%", lg: "60%" }}
            h={{ base: "30%", md: "50%", lg: "70%" }}
          >
            <SharedSlideShow slides={slides} />
          </Box>
        </Center>
      </HStack>
    </>
  );
};

export default SharedSlideshowPage;
