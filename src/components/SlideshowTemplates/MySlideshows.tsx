import {
  VStack,
  useColorModeValue,
  Spinner,
  Center,
  useToast,
  Wrap,
  WrapItem,
  Text,
  Icon,
  Divider,
} from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { openPod } from '../../api/fairos/pod'
import { fdpAtom, slidesAtom, slidesLogoAtom, userAtom } from '../../store'
import { loadSlideshow } from '../../utils'
import LoadingToast from '../Toast/LoadingToast'
import { BiSlideshow } from 'react-icons/bi'
import { fairDriveDownloadFile } from '../../utils/fairdrive'
import { DirectoryItem, fairDriveLs } from '../../utils/fairdrive/ls'

export default function MySlideshows() {
  const toast = useToast()
  const [mySlideshows, setMySlideshows] = useState<DirectoryItem['files']>()
  const [user] = useAtom(userAtom)
  const [fdp] = useAtom(fdpAtom)
  const setSlides = useAtom(slidesAtom)[1]
  const setSlidesLogo = useAtom(slidesLogoAtom)[1]
  const borderColor = useColorModeValue('latte-overlay0', 'frappe-overlay0')

  const handleSetMyslideshows = async () => {
    if (!user) return

    try {
      if (!fdp) {
        await openPod(process.env.NEXT_PUBLIC_SLIDES_POD!, user.password)
      }

      const mySlideshows = await fairDriveLs(
        process.env.NEXT_PUBLIC_SLIDES_POD!,
        '/',
        fdp
      )
      setMySlideshows(mySlideshows.files)
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
              borderColor={borderColor}
              _hover={{
                boxShadow: 'lg',
              }}
              cursor="pointer"
              p={3}
              rounded="lg"
              onClick={async () => {
                if (!user) return

                try {
                  toast({
                    duration: null,
                    position: 'top-left',
                    render: () => <LoadingToast label="Loading File" />,
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
                } catch (error) {
                  console.log(error)
                }

                toast.closeAll()
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
