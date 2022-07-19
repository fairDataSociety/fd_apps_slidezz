import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";

import "reveal.js/dist/reveal.css";
import "../styles/theme.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
