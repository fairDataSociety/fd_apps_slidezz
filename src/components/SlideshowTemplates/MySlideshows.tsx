import { useColors } from 'catppuccin-chakra-ui-theme'
import { useAtomValue } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'
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

import { importSlides } from '../../actions/importSlides'
import { openPod } from '../../api/fairos/pod'
import { fairDriveDownloadFile } from '../../fairdrive'
import { DirectoryItem, fairDriveLs } from '../../fairdrive/ls'
import {
  fdpAtom,
  loadingModalSetActionAtom,
  slidesAtom,
  slidesLogoAtom,
  userAtom,
} from '../../store'
import { hashCode } from '../../utils'

export default function MySlideshows() {
  const toast = useToast()
  const [mySlideshows, setMySlideshows] = useState<DirectoryItem['files']>()
  const user = useAtomValue(userAtom)
  const fdp = useAtomValue(fdpAtom)
  const setSlides = useUpdateAtom(slidesAtom)
  const setSlidesLogo = useUpdateAtom(slidesLogoAtom)
  const { overlay0 } = useColors()
  const loadingModalSetAction = useUpdateAtom(loadingModalSetActionAtom)

  const handleSetMyslideshows = async () => {
    if (!user) return

    try {
      const slidesPodName = process.env.NEXT_PUBLIC_SLIDES_POD as string

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
                  loadingModalSetAction({
                    action: 'start',
                    message: 'Loading File',
                  })

                  const slideshowFile = await fairDriveDownloadFile(
                    process.env.NEXT_PUBLIC_SLIDES_POD as string,
                    `/${slideshow.name}`,
                    fdp
                  )
                  await importSlides(
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

                loadingModalSetAction({
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
