import { Box, Image, useColorModeValue } from "@chakra-ui/react";
import { useAtom } from "jotai";
import React, { useEffect } from "react";
import Reveal from "reveal.js";
//@ts-ignore
import Markdown from "reveal.js/plugin/markdown/markdown";
import {
  slideShowSettingsAtom,
  styleSettingsAtom,
  slidesLogoAtom,
} from "../store";
import type { Data } from "@ethersphere/bee-js";

interface SlideShowProps {
  slides: Data;
}

export default function SlideShow({ slides }: SlideShowProps) {
  const [slideShowSettings] = useAtom(slideShowSettingsAtom);
  const [styleSettings] = useAtom(styleSettingsAtom);
  const [slidesLogo] = useAtom(slidesLogoAtom);

  useEffect(() => {
    document.body.setAttribute("data-theme", styleSettings.theme);
  }, [styleSettings]);

  const getLogoPosition = () => {
    const positions: Record<string, object> = {
      "top-left": {
        top: -2,
        left: 2,
      },
      "top-right": {
        top: -2,
        right: 2,
      },
      "bottom-left": {
        bottom: -2,
        left: 2,
      },
      "bottom-right": {
        bottom: -2,
        right: 2,
      },
    };

    return positions[slideShowSettings.slidesLogoPosition];
  };

  useEffect(() => {
    Reveal.initialize({
      embedded: true,
      keyboardCondition: "focused",
      plugins: [Markdown],
      ...slideShowSettings,
    });
  }, []);

  useEffect(() => {
    Reveal.configure(slideShowSettings);
  }, [slideShowSettings]);

  return (
    <Box
      borderWidth="1px"
      borderColor={useColorModeValue("latte-overlay0", "frappe-overlay0")}
      borderBottom="none"
      w={{ base: "80%", md: "70%", lg: "60%" }}
      h={{ base: "30%", md: "50%", lg: "70%" }}
    >
      <Box className="reveal">
        <Box className="slides">
          <section data-markdown="" data-separator="---">
            <textarea data-template defaultValue={slides.text()} />
          </section>
        </Box>
        {slidesLogo && (
          <Image
            position="absolute"
            {...getLogoPosition()}
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
