import {
  VStack,
  Container,
  Heading,
  Divider,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Center,
  Spinner,
  Wrap,
  WrapItem,
  Box,
  HStack,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import FairdriveIcon from '../Icons/FairdriveIcon'

import dynamic from 'next/dynamic'
import ImportFile from '../ImportFile/ImportFile'
import MySlideShows from './MySlideShows'
import { File } from '../../types'
import { useAtom } from 'jotai'
import { slidesAtom } from '../../store'
import GoogleDriveImportFile from '../GoogleDriveImportFile/GoogleDriveImportFile'

const PreviewSlideShow = dynamic(() => import('./TemplatePreview'), {
  ssr: false,
})

export default function SlideShowTemplates() {
  const [slides, setSlides] = useAtom(slidesAtom)

  return (
    <Container maxW="container.xl">
      <VStack gap={4} align="flex-start">
        <Heading fontSize={{ base: '2xl', md: '4xl' }}>
          Select a presentation template
        </Heading>
        <Divider />
        <Tabs w="full" isFitted variant="solid-rounded" colorScheme="surface1">
          <TabList mb={5}>
            <Tab>Templates</Tab>
            <Tab>My Slideshows</Tab>
            <Tab>Markdown</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Wrap justify="space-between" spacing="30px">
                <WrapItem>
                  <PreviewSlideShow
                    deckName="blank-slide"
                    title="Blank Slideshow"
                    slides="## Slide 1---## Slide 2"
                  />
                </WrapItem>
              </Wrap>
            </TabPanel>
            <TabPanel>
              <MySlideShows />
            </TabPanel>
            <TabPanel>
              <VStack gap={5}>
                <ImportFile
                  setFile={async (file: File | undefined) => {
                    if (file) setSlides({ data: await file.data.text() })
                  }}
                  allowedExtensions={['md']}
                >
                  <HStack
                    justify="space-between"
                    w="md"
                    cursor="pointer"
                    gap={2}
                    border="solid"
                    borderWidth={1}
                    p={6}
                    rounded="lg"
                    borderColor={useColorModeValue(
                      'latte-overlay0',
                      'frappe-overlay0'
                    )}
                    _hover={{
                      boxShadow: 'lg',
                    }}
                  >
                    <FairdriveIcon flex={1} />
                    <Box flex={2}>
                      <Text fontSize="lg" fontWeight="bold">
                        Fairdrive
                      </Text>
                      <Text variant="subtext">
                        Select a Markdown File from Fairdrive
                      </Text>
                    </Box>
                  </HStack>
                </ImportFile>
                <GoogleDriveImportFile />
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Container>
  )
}
