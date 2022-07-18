import { Box } from "@chakra-ui/react";
import { useAtom } from "jotai";
import React, { useEffect } from "react";
import Reveal from "reveal.js";
import "reveal.js/dist/reveal.css";
//@ts-ignore
import Markdown from "reveal.js/plugin/markdown/markdown";
import { presentationSettingsAtom, styleSettingsAtom } from "../store";

export default function SlideShow() {
  const [presentationSettings] = useAtom(presentationSettingsAtom);
  const [styleSettings] = useAtom(styleSettingsAtom);

  useEffect(() => {
    Reveal.initialize({
      embedded: true,
      keyboardCondition: "focused",
      plugins: [Markdown],
      ...presentationSettings,
    });
  }, []);

  useEffect(() => {
    Reveal.configure(presentationSettings);
  }, [presentationSettings]);

  return (
    <Box
      w={{ base: "80%", md: "70%", lg: "60%" }}
      h={{ base: "30%", md: "50%", lg: "70%" }}
    >
      <Box className="reveal">
        <Box className="slides">
          <section data-markdown="test.md" data-separator="---"></section>
        </Box>
      </Box>
    </Box>
  );
}
