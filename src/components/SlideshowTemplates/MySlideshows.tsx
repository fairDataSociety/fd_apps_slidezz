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
import { downloadFile, getFilesAndDirs } from '../../api/fs'
import { File as FairOSFile } from '../../api/fs'
import { openPod } from '../../api/pod'
import { slidesAtom, userAtom } from '../../store'
import { loadSlideshow } from '../../utils'
import LoadingToast from '../Toast/LoadingToast'
import { BiSlideshow } from 'react-icons/bi'

export default function MySlideshows() {
  const toast = useToast()
  const [mySlideshows, setMySlideshows] = useState<FairOSFile[]>()
  const [user] = useAtom(userAtom)
  const setSlides = useAtom(slidesAtom)[1]
  const borderColor = useColorModeValue('latte-overlay0', 'frappe-overlay0')

  const handleSetMyslideshows = async () => {
    if (!user) return

    try {
      await openPod(process.env.NEXT_PUBLIC_SLIDES_POD!, user.password)

      const mySlideshows = await getFilesAndDirs(
        process.env.NEXT_PUBLIC_SLIDES_POD!,
        '/'
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
                    render: () => <LoadingToast label="Loading File" />,
                  })
                  const slideshowFile = await downloadFile({
                    pod_name: process.env.NEXT_PUBLIC_SLIDES_POD!,
                    file_path: `/${slideshow.name}`,
                  })
                  await loadSlideshow(user, { data: slideshowFile }, setSlides)
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
