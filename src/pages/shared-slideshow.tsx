import { useAtom } from 'jotai'
import type { NextPage } from 'next'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { Box, Center, HStack, Spinner } from '@chakra-ui/react'

import SideBar from '../components/Editor/Sidebar'
import Layout from '../components/Layout'
import Login from '../components/Login'
import { fdpAtom, slidesAtom, slidesLogoAtom, userAtom } from '../store'
import { fairDriveDownloadShared } from '../utils/fairdrive'

const SharedSlideshow = dynamic(() => import('../components/SharedSlideshow'), {
  ssr: false,
  loading: () => (
    <Center h="full">
      <Spinner size="xl" />
    </Center>
  ),
})

const EmbedSlideshow = dynamic(() => import('../components/EmbedSlideshow'), {
  ssr: false,
  loading: () => (
    <Center h="full">
      <Spinner size="xl" />
    </Center>
  ),
})

const SharedSlideshowPage: NextPage = () => {
  const router = useRouter()
  const [fdp] = useAtom(fdpAtom)
  const setSlidesLogo = useAtom(slidesLogoAtom)[1]
  const [slides, setSlides] = useAtom(slidesAtom)
  const [isEmbed, setIsEmbed] = useState(false)
  const [user] = useAtom(userAtom)

  useEffect(() => {
    if (router.isReady && (fdp || user)) {
      ;(async () => {
        const slidesShareRef = router.query.ref as string
        const isEmbed = typeof router.query.embed === 'string'

        setIsEmbed(isEmbed)

        const slidesHTML = await (
          await fairDriveDownloadShared(slidesShareRef, fdp, user?.password)
        ).text()

        const div = document.createElement('div')
        div.innerHTML = slidesHTML

        const moveableElements = Array.from(
          div.querySelectorAll('[style*="cursor: pointer"]')
        ) as HTMLElement[]

        moveableElements.forEach((element) => {
          element.style.cursor = 'auto'
          element.contentEditable = 'false'
        })

        const logoImageElement = div.querySelector('.logo-image')
        if (logoImageElement && setSlidesLogo) {
          const data = logoImageElement.getAttribute('data-base64')!
          setSlidesLogo({
            data,
          })
          div.removeChild(logoImageElement)
        }

        const firstSection = div.querySelector('section')
        const width = firstSection?.getAttribute('data-width')
        const height = firstSection?.getAttribute('data-height')

        setSlides({
          data: div.innerHTML,
          width: width ? Number(width) : undefined,
          height: height ? Number(height) : undefined,
        })
      })()
    }
  }, [router.isReady, fdp, user])

  if (!fdp && !user) return <Login />

  if (!slides)
    return (
      <Center h="100vh" w="full">
        <Spinner size="xl" />
      </Center>
    )

  if (isEmbed) return <EmbedSlideshow slides={slides} />

  return (
    <Layout>
      <HStack h="80vh">
        <SideBar isSlidesReadOnly={true} />
        <Center h="full" w="full">
          <Box
            w={{ base: '65%', md: '70%', lg: '60%' }}
            h={{ base: '30%', md: '50%', lg: '70%' }}
          >
            <SharedSlideshow slides={slides} />
          </Box>
        </Center>
      </HStack>
    </Layout>
  )
}

export default SharedSlideshowPage
