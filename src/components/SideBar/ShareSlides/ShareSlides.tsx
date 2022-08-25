import { useAtom } from "jotai";
import { BsShare } from "react-icons/bs";
import { slidesAtom } from "../../../store";
import SideBarItem from "../SideBarItem";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "@chakra-ui/react";
import CopyPanel from "./CopyPanel";
import EmbedCode from "./EmbedCode";

export default function ShareSlides() {
  const [slides] = useAtom(slidesAtom);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const shareLink = `${process.env.NEXT_PUBLIC_BASE_URL!}/shared-slideshow/${
    slides?.sharedRef
  }`;

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
  );
}
