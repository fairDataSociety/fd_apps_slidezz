import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { BiSlideshow } from 'react-icons/bi'

import {
  Center,
  Divider,
  Icon,
  Spinner,
  Text,
  VStack,
  Wrap,
  WrapItem,
  useToast,
} from '@chakra-ui/react'

import { openPod } from '../../api/fairos/pod'
import useColors from '../../hooks/useColors'
import {
  fdpAtom,
  loadingModalActionAtom,
  slidesAtom,
  slidesLogoAtom,
  userAtom,
} from '../../store'
import { hashCode, loadSlideshow } from '../../utils'
import { fairDriveDownloadFile } from '../../utils/fairdrive'
import { DirectoryItem, fairDriveLs } from '../../utils/fairdrive/ls'

export default function MySlideshows() {
  const toast = useToast()
  const [mySlideshows, setMySlideshows] = useState<DirectoryItem['files']>()
  const [user] = useAtom(userAtom)
  const [fdp] = useAtom(fdpAtom)
  const [, setSlides] = useAtom(slidesAtom)
  const [, setSlidesLogo] = useAtom(slidesLogoAtom)
  const { overlay0 } = useColors()
  const [, loadingModalAction] = useAtom(loadingModalActionAtom)

  const handleSetMyslideshows = async () => {
    if (!user) return

    try {
      const slidesPodName = process.env.NEXT_PUBLIC_SLIDES_POD!

      if (!fdp) {
        await openPod(slidesPodName, user.password)
        await openPod(
          `${slidesPodName}-${hashCode(user.username)}`,
          user.password
        )
      }

      const mySlideshows = await fairDriveLs(slidesPodName, '/', fdp)
      if (!fdp) {
        const sharedSlideshows = await fairDriveLs(
          `${slidesPodName}-${hashCode(user.username)}`,
          '/'
        )
        setMySlideshows([...mySlideshows.files, ...sharedSlideshows.files])
      } else {
        setMySlideshows(mySlideshows.files)
      }
    } catch (error) {
      console.log(error)
      setMySlideshows([])
    }
  }

  useEffect(() => {
    handleSetMyslideshows()
  }, [])

  if (!mySlideshows)
    return (
      <Center>
        <Spinner />
      </Center>
    )

  return (
    <Wrap justify="space-between" spacing="40px">
      {mySlideshows.map((slideshow) => {
        return (
          <WrapItem alignSelf="center" key={slideshow.name}>
            <VStack
              w="350px"
              gap={3}
              border="solid"
              borderWidth={1}
              borderColor={overlay0}
              _hover={{
                boxShadow: 'lg',
              }}
              cursor="pointer"
              p={3}
              rounded="lg"
              onClick={async () => {
                if (!user) return

                try {
                  loadingModalAction({
                    action: 'start',
                    message: 'Loading File',
                  })

                  const slideshowFile = await fairDriveDownloadFile(
                    process.env.NEXT_PUBLIC_SLIDES_POD!,
                    `/${slideshow.name}`,
                    fdp
                  )
                  await loadSlideshow(
                    { data: slideshowFile },
                    setSlides,
                    setSlidesLogo
                  )
                } catch (error: any) {
                  console.log(error)

                  toast({
                    title: 'Failed to load file',
                    description: error.message,
                    status: 'error',
                    duration: 9000,
                    isClosable: true,
                  })
                }

                loadingModalAction({
                  action: 'stop',
                })
              }}
            >
              <Icon fontSize="8xl" as={BiSlideshow} />

              <Divider />

              <Text alignSelf="flex-start" pl={2}>
                {slideshow.name}
              </Text>
            </VStack>
          </WrapItem>
        )
      })}
    </Wrap>
  )
}
