import '@fontsource/source-sans-pro/200.css'
import '@fontsource/source-sans-pro/300.css'
import '@fontsource/source-sans-pro/400.css'
import '@fontsource/source-sans-pro/600.css'
import '@fontsource/source-sans-pro/700.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { useAtom } from 'jotai'
import type { AppProps } from 'next/app'
import 'reveal.js/dist/reveal.css'
import 'reveal.js/plugin/highlight/zenburn.css'

import { ChakraProvider } from '@chakra-ui/react'

import LoadingModal from '../components/LoadingModal'
import useFairOSCookieRenewal from '../hooks/useFairOSCookieRenewal'
import { loadingModalAtom } from '../store'
import '../styles/slides.css'
import theme from '../theme'

function MyApp({ Component, pageProps }: AppProps) {
  const [loadingModal] = useAtom(loadingModalAtom)
  useFairOSCookieRenewal()

  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_DRIVE_CLIENT_ID!}
    >
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
        <LoadingModal
          isOpen={loadingModal.isOpen}
          message={loadingModal.message}
        />
      </ChakraProvider>
    </GoogleOAuthProvider>
  )
}

export default MyApp
