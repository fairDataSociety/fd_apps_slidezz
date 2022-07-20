import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import "reveal.js/dist/reveal.css";
import "../styles/slide-themes.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
