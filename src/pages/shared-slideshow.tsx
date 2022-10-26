import { Box, Center, HStack, Spinner } from '@chakra-ui/react'
import { useAtom } from 'jotai'
import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { fdpAtom, slidesLogoAtom } from '../store'
import dynamic from 'next/dynamic'
import SideBar from '../components/Editor/Sidebar/Sidebar'
import { useRouter } from 'next/router'
import Layout from '../components/Layout/Layout'

const SharedSlideshow = dynamic(
  () => import('../components/SharedSlideshow/SharedSlideshow'),
  {
    ssr: false,
    loading: () => (
      <Center h="full">
        <Spinner size="xl" />
      </Center>
    ),
  }
)

const EmbedSlideshow = dynamic(
  () => import('../components/EmbedSlideshow/EmbedSlideshow'),
  {
    ssr: false,
    loading: () => (
      <Center h="full">
        <Spinner size="xl" />
      </Center>
    ),
  }
)

const SharedSlideshowPage: NextPage = () => {
  const router = useRouter()
  const [fdp] = useAtom(fdpAtom)
  const setSlidesLogo = useAtom(slidesLogoAtom)[1]
  const [slides, setSlides] = useState<string | undefined>()
  const [isEmbed, setIsEmbed] = useState(false)

  useEffect(() => {
    if (router.isReady && fdp) {
      ;(async () => {
        const slidesShareRef = router.query.ref as string
        const isEmbed = typeof router.query.embed === 'string'

        setIsEmbed(isEmbed)

        const slidesHTML = (
          await fdp.file.downloadShared(slidesShareRef)
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

        setSlides(div.innerHTML)
      })()
    }
  }, [router.isReady, fdp])

  if (!fdp) return <p>only available on fdp-storage</p>

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
