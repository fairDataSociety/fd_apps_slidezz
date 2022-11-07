import { useAtom } from 'jotai'
import { BsShare } from 'react-icons/bs'

import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
} from '@chakra-ui/react'

import { slidesAtom } from '../../../../store'
import SideBarItem from '../SidebarItem'
import CopyPanel from './CopyPanel'
import EmbedCode from './EmbedCode'

export default function ShareSlides() {
  const [slides] = useAtom(slidesAtom)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const baseHref = document.querySelector('base')!.href
  const pageName =
    process.env.NODE_ENV === 'production'
      ? 'shared-slideshow.html'
      : 'shared-slideshow'
  const shareLink = `${baseHref}${pageName}?ref=${slides?.sharedRef}`

  return (
    <>
      {slides && slides.sharedRef ? (
        <>
          <SideBarItem onClick={onOpen} icon={BsShare} label="Share" />

          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Share slides</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Tabs colorScheme="surface1">
                  <TabList>
                    <Tab>Copy Link</Tab>
                    <Tab>Embed</Tab>
                  </TabList>

                  <TabPanels>
                    <TabPanel>
                      <CopyPanel label="Copy Link" text={shareLink} />
                    </TabPanel>
                    <TabPanel>
                      <EmbedCode />
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              </ModalBody>
            </ModalContent>
          </Modal>
        </>
      ) : null}
    </>
  )
}
