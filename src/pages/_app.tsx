import '@fontsource/source-sans-pro/200.css'
import '@fontsource/source-sans-pro/300.css'
import '@fontsource/source-sans-pro/400.css'
import '@fontsource/source-sans-pro/600.css'
import '@fontsource/source-sans-pro/700.css'
import { GoogleOAuthProvider } from '@react-oauth/google'
import { useAtomValue } from 'jotai'
import type { AppProps } from 'next/app'
import 'reveal.js/dist/reveal.css'
import 'reveal.js/plugin/highlight/zenburn.css'

import { ChakraProvider } from '@chakra-ui/react'

import LoadingModal from '../components/LoadingModal'
import { loadingModalAtom } from '../store'
import '../styles/slides.css'
import { theme } from '../theme'

function MyApp({ Component, pageProps }: AppProps) {
  const loadingModal = useAtomValue(loadingModalAtom)

  const renderApp = () => (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
      <LoadingModal
        isOpen={loadingModal.isOpen}
        message={loadingModal.message}
      />
    </ChakraProvider>
  )

  if (Boolean(process.env.NEXT_PUBLIC_GOOGLE_DRIVE_CLIENT_ID)) {
    return (
      <GoogleOAuthProvider
        clientId={process.env.NEXT_PUBLIC_GOOGLE_DRIVE_CLIENT_ID as string}
      >
        {renderApp()}
      </GoogleOAuthProvider>
    )
  }

  return renderApp()
}

export default MyApp
