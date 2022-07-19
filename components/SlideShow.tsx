import { Box } from "@chakra-ui/react";
import { useAtom } from "jotai";
import React, { useEffect } from "react";
import Reveal from "reveal.js";
//@ts-ignore
import Markdown from "reveal.js/plugin/markdown/markdown";
import { slideShowSettingsAtom, styleSettingsAtom } from "../store";

export default function SlideShow() {
  const [slideShowSettings] = useAtom(slideShowSettingsAtom);
  const [styleSettings] = useAtom(styleSettingsAtom);

  useEffect(() => {
    document.body.setAttribute("data-theme", styleSettings.theme);
  }, [styleSettings]);

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
      w={{ base: "80%", md: "70%", lg: "60%" }}
      h={{ base: "30%", md: "50%", lg: "70%" }}
      transition="all 0.2s"
      _hover={{
        transform: "scale(1.01)",
      }}
    >
      <Box className="reveal">
        <Box className="slides">
          <section data-markdown="test.md" data-separator="---"></section>
        </Box>
      </Box>
    </Box>
  );
}
