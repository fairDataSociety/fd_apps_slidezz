import { Box } from "@chakra-ui/react";
import React, { RefObject, useEffect, useRef } from "react";

//@ts-ignore
import Reveal from "reveal.js";
//@ts-ignore
import Markdown from "reveal.js/plugin/markdown/markdown";
//@ts-ignore
import RevealHighlight from "reveal.js/plugin/highlight/highlight";
import { useRouter } from "next/router";

interface EmbedSlideShowProps {
  slides: string;
}

export default function EmbedSlideShow({ slides }: EmbedSlideShowProps) {
  const slidesRef = useRef() as RefObject<HTMLDivElement>;
  const router = useRouter();
  const query = router.query as { [key: string]: string | undefined };

  useEffect(() => {
    if (slidesRef.current) slidesRef.current.innerHTML = slides;
  }, [slidesRef]);

  useEffect(() => {
    if (query.theme) document.body.setAttribute("data-theme", query.theme);
  }, []);

  useEffect(() => {
    //@ts-ignore
    const newDeck = Reveal(document.querySelector(`.reveal`), {
      embedded: true,
      keyboardCondition: "focused",
      plugins: [Markdown, RevealHighlight],
      ...query,
    });

    newDeck.initialize().then(() => {
      newDeck.layout();
      newDeck.sync();
    });

    return () => {
      newDeck.destroy();
    };
  }, []);

  return (
    <Box className="slideshow" position="relative" w="100vw" h="100vh">
      <Box className="reveal">
        <Box ref={slidesRef} className="slides"></Box>
      </Box>
    </Box>
  );
}
