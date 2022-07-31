import type { AppProps } from "next/app";
import { ChakraProvider, Box, HStack } from "@chakra-ui/react";
import NavBar from "../components/NavBar/NavBar";
import SideBar from "../components/SideBar/SideBar";
import theme from "../theme";

import "reveal.js/dist/reveal.css";
import "../styles/slide-themes.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <NavBar />
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
