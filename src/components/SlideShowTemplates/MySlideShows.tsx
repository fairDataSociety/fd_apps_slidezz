import {
  VStack,
  Box,
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
import { File } from '../../api/fs'
import { openPod } from '../../api/pod'
import { slidesAtom, userAtom } from '../../store'
import { loadSlideshow } from '../../utils'
import LoadingToast from '../Toast/LoadingToast'
import { BiSlideshow } from 'react-icons/bi'

export default function MySlideShows() {
  const toast = useToast()
  const [mySlideShows, setMySlideShows] = useState<File[]>()
  const [user] = useAtom(userAtom)
  const [slides, setSlides] = useAtom(slidesAtom)
  const borderColor = useColorModeValue('latte-overlay0', 'frappe-overlay0')

  useEffect(() => {
    ;(async () => {
      await openPod(process.env.NEXT_PUBLIC_SLIDES_POD!, user!.password)

      const mySlideShows = await getFilesAndDirs(
        process.env.NEXT_PUBLIC_SLIDES_POD!,
        '/'
      )
      setMySlideShows(mySlideShows.files)
    })()
  }, [])

  if (!mySlideShows)
    return (
      <Center>
        <Spinner />
      </Center>
    )

  return (
    <Wrap spacing="40px">
      {mySlideShows.map((slideShow) => {
        return (
          <WrapItem key={slideShow.name}>
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

                  const slideShowData = await downloadFile({
                    pod_name: process.env.NEXT_PUBLIC_SLIDES_POD!,
                    file_path: `/${slideShow.name}`,
                  })

                  await loadSlideshow(user!, { data: slideShowData }, setSlides)
                } catch (err) {
                  console.log(err)
                }
                toast.closeAll()
              }}
            >
              <Icon fontSize="8xl" as={BiSlideshow} />

              <Divider />

              <Text alignSelf="flex-start" pl={2}>
                {slideShow.name}
              </Text>
            </VStack>
          </WrapItem>
        )
      })}
    </Wrap>
  )
}
