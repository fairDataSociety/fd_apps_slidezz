import { Box, Center, Divider, HStack, Spinner } from "@chakra-ui/react";
import { useAtom } from "jotai";
import type { GetServerSideProps, NextPage } from "next";
import { useEffect, useState } from "react";
import { fdpAtom, slidesLogoAtom } from "../../store";
import dynamic from "next/dynamic";
import { FdpStorage } from "@fairdatasociety/fdp-storage";
import SideBar from "../../components/SideBar/SideBar";
import { useRouter } from "next/router";
import NavBar from "../../components/NavBar/NavBar";

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

const EmbedSlideShow = dynamic(
  () => import("../../components/EmbedSlideShow/EmbedSlideShow"),
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
  const options = context.params!.options as string[];
  const ref = options[0];

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
  const router = useRouter();
  const [fdp] = useAtom(fdpAtom);
  const [slidesLogo, setSlidesLogo] = useAtom(slidesLogoAtom);
  const [slides, setSlides] = useState<string | undefined>();
  const options = router.query.options as string[];
  const isEmbed = options.length > 1 && options[1] === "embed";

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
  };

  useEffect(() => {
    handleSetSlides();
  }, []);

  if (isEmbed && slides) return <EmbedSlideShow slides={slides} />;

  if (isEmbed && !slides)
    return (
      <Center h="100vh" w="full">
        <Spinner size="xl" />
      </Center>
    );

  return (
    <>
      <NavBar />
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
    </>
  );
};

export default SharedSlideshowPage;
