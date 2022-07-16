import { Box } from "@chakra-ui/react";
import { useEffect } from "react";
import Reveal from "reveal.js";
import "reveal.js/dist/reveal.css";
import "reveal.js/dist/theme/moon.css";

//@ts-ignore
import Markdown from "reveal.js/plugin/markdown/markdown";

export default function SlideShow() {
  useEffect(() => {
    Reveal.initialize({
      embedded: true,
      keyboardCondition: "focused",
      controls: true,
      progress: true,
      history: true,
      center: true,
      loop: true,
      plugins: [Markdown],
    });
  }, []);

  return (
    <Box className="reveal">
      <Box className="slides">
        <section data-markdown="test.md" data-separator="---"></section>
      </Box>
    </Box>
  );
}
