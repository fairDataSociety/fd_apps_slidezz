import { Box, Image, useColorModeValue } from "@chakra-ui/react";
import { useAtom } from "jotai";
import React, { RefObject, useEffect, useRef, useState } from "react";
import { LogoPositions } from "../../config/logo-positions";

//@ts-ignore
import Reveal from "reveal.js";
//@ts-ignore
import Markdown from "reveal.js/plugin/markdown/markdown";
//@ts-ignore
import RevealHighlight from "reveal.js/plugin/highlight/highlight";

import {
  slideShowSettingsAtom,
  styleSettingsAtom,
  slidesLogoAtom,
} from "../../store";

interface SharedSlideShowProps {
  slides: string;
}

export default function SharedSlideShow({ slides }: SharedSlideShowProps) {
  const [slideShowSettings] = useAtom(slideShowSettingsAtom);
  const [styleSettings] = useAtom(styleSettingsAtom);
  const [slidesLogo] = useAtom(slidesLogoAtom);
  const slidesRef = useRef() as RefObject<HTMLDivElement>;
  const [deck, setDeck] = useState<any>();

  useEffect(() => {
    if (slidesRef.current) slidesRef.current.innerHTML = slides;
  }, [slidesRef]);

  useEffect(() => {
    document.body.setAttribute("data-theme", styleSettings.theme);
  }, [styleSettings]);

  useEffect(() => {
    //@ts-ignore
    const newDeck = Reveal(document.querySelector(`.reveal`), {
      embedded: true,
      keyboardCondition: "focused",
      plugins: [Markdown, RevealHighlight],
      ...slideShowSettings,
    });

    newDeck.initialize().then(() => {
      setDeck(newDeck);
      newDeck.layout();
      newDeck.sync();
    });

    return () => {
      newDeck.destroy();
    };
  }, []);

  useEffect(() => {
    if (deck) {
      deck.layout();
      deck.sync();
    }
  }, [deck]);

  useEffect(() => {
    if (deck) deck.configure(slideShowSettings);
  }, [slideShowSettings]);

  return (
    <Box
      className="slideshow"
      position="relative"
      borderWidth="1px"
      borderColor={useColorModeValue("latte-overlay0", "frappe-overlay0")}
      borderBottom="none"
      w="full"
      h="full"
    >
      <Box className="reveal">
        <Box ref={slidesRef} className="slides"></Box>
        {slidesLogo && (
          <Image
            position="absolute"
            {...LogoPositions[slideShowSettings.slidesLogoPosition]}
            h={{ base: "10px", sm: "20px", md: "30px", lg: "50px" }}
            w={{ base: "10px", sm: "20px", md: "30px", lg: "50px" }}
            objectFit="cover"
            src={URL.createObjectURL(new Blob([slidesLogo.buffer]))}
          />
        )}
      </Box>
    </Box>
  );
}
