import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import NavBar from "../components/NavBar/NavBar";
import theme from "../theme";

import "reveal.js/dist/reveal.css";
import "reveal.js/plugin/highlight/zenburn.css";
import "../styles/slide-themes.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
