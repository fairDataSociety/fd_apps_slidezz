import { Box } from "@chakra-ui/react";
import React, { useEffect } from "react";
//@ts-ignore
import Reveal from "reveal.js";
import "reveal.js/dist/reveal.css";
import "reveal.js/dist/theme/black.css";

export default function SlideShow() {
  useEffect(() => {
    const deck = new Reveal();

    deck.initialize({
      controls: true,
      progress: true,
      history: true,
      center: true,
      loop: true,
    });
  }, []);

  return (
    <Box className="reveal">
      <Box className="slides">
        <section>Slide 1</section>
        <section>Slide 2</section>
        <section>Slide 3</section>
      </Box>
    </Box>
  );
}
