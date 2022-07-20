import { Box, useColorModeValue } from "@chakra-ui/react";
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
      borderWidth="1px"
      borderColor={useColorModeValue("lavender.700", "lavender.100")}
      borderBottom="none"
      w={{ base: "80%", md: "70%", lg: "60%" }}
      h={{ base: "30%", md: "50%", lg: "70%" }}
    >
      <Box className="reveal">
        <Box className="slides">
          <section data-markdown="" data-separator="---">
            <textarea
              data-template
              defaultValue="
              ## Slide 1
              A paragraph with some text and a [link](http://hakim.se).
              ---
              ## Slide 2
              ---
              ## Slide 3
            "
            />
          </section>
        </Box>
      </Box>
    </Box>
  );
}
