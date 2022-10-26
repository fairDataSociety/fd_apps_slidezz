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
  Wrap,
  WrapItem,
  Center,
} from '@chakra-ui/react'
import FairdriveIcon from '../Icons/FairdriveIcon'
import dynamic from 'next/dynamic'
import ImportFile from '../FairDriveImportFile/FairDriveImportFile'
import MySlideShows from './MySlideshows'
import { File } from '../../types'
import { useAtom } from 'jotai'
import { slidesAtom, userAtom } from '../../store'
import GoogleDriveImportFile from '../GoogleDriveImportFile/GoogleDriveImportFile'
import GoogleSlidesImport from '../GoogleSlidesImport/GoogleSlidesImport'
import GoogledriveIcon from '../Icons/GoogledriveIcon'
import { loadSlideshow } from '../../utils'
import ImportFileCard from '../Card/ImportFileCard'

const TemplatePreview = dynamic(() => import('./TemplatePreview'), {
  ssr: false,
})

export default function SlideshowTemplates() {
  const setSlides = useAtom(slidesAtom)[1]
  const [user] = useAtom(userAtom)

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
            <Tab>Google slides</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <Wrap justify="space-between" spacing="30px">
                <WrapItem>
                  <TemplatePreview
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
                  <ImportFileCard
                    title="Fairdrive"
                    description="Select a Markdown File from Fairdrive"
                    Icon={FairdriveIcon}
                  />
                </ImportFile>
                <GoogleDriveImportFile
                  mimeType="text/markdown"
                  callback={(data) => {
                    if (!user) return
                    loadSlideshow({ data: new Blob([data]) }, setSlides)
                  }}
                  downloadFile={true}
                >
                  <ImportFileCard
                    title="Google Drive"
                    description="Select a Markdown File from Google Drive"
                    Icon={GoogledriveIcon}
                  />
                </GoogleDriveImportFile>
              </VStack>
            </TabPanel>
            <TabPanel>
              <Center>
                <GoogleSlidesImport />
              </Center>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </VStack>
    </Container>
  )
}
