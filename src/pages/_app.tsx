import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { GoogleOAuthProvider } from '@react-oauth/google'

import theme from '../theme'

import '@fontsource/source-sans-pro/200.css'
import '@fontsource/source-sans-pro/300.css'
import '@fontsource/source-sans-pro/400.css'
import '@fontsource/source-sans-pro/600.css'
import '@fontsource/source-sans-pro/700.css'

import 'reveal.js/dist/reveal.css'
import 'reveal.js/plugin/highlight/zenburn.css'
import '../styles/slide-themes.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_DRIVE_CLIENT_ID!}
    >
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </GoogleOAuthProvider>
  )
}

export default MyApp
