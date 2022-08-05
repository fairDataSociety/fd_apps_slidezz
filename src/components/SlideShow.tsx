import { Box, Image, useColorModeValue, Textarea } from "@chakra-ui/react";
import { useAtom } from "jotai";
import React, { useEffect } from "react";
import { LogoPositions } from "../constants/logo-positions";

//@ts-ignore
import Reveal from "reveal.js";
//@ts-ignore
import Markdown from "reveal.js/plugin/markdown/markdown";

import {
  slideShowSettingsAtom,
  styleSettingsAtom,
  slidesLogoAtom,
} from "../store";

interface SlideShowProps {
  deckName: string;
  deck: any;
  setDeck: (deck: any) => void;
  slides: string;
}

export default function SlideShow({
  deckName,
  deck,
  setDeck,
  slides,
}: SlideShowProps) {
  const [slideShowSettings] = useAtom(slideShowSettingsAtom);
  const [styleSettings] = useAtom(styleSettingsAtom);
  const [slidesLogo] = useAtom(slidesLogoAtom);

  useEffect(() => {
    document.body.setAttribute("data-theme", styleSettings.theme);
  }, [styleSettings]);

  useEffect(() => {
    //@ts-ignore
    const newDeck = Reveal(document.querySelector(`.${deckName}`), {
      embedded: true,
      keyboardCondition: "focused",
      plugins: [Markdown],
      ...slideShowSettings,
    });
    newDeck.initialize().then(() => {
      newDeck.layout();
      newDeck.sync();
      setDeck(newDeck);
    });
  }, []);

  useEffect(() => {
    if (deck) deck.configure(slideShowSettings);
  }, [slideShowSettings]);

  return (
    <Box
      borderWidth="1px"
      borderColor={useColorModeValue("latte-overlay0", "frappe-overlay0")}
      borderBottom="none"
      w="full"
      h="full"
    >
      <Box className={`reveal ${deckName}`}>
        <Box className="slides">
          <section data-markdown="" data-separator="---">
            <Textarea data-template defaultValue={slides} />
          </section>
        </Box>
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
