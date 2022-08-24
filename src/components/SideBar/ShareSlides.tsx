import { useAtom } from "jotai";
import { BsShare } from "react-icons/bs";
import { fdpAtom, slidesAtom, slidesDeckAtom } from "../../store";
import SideBarItem from "./SideBarItem";
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

export default function ShareSlides() {
  const [fdp] = useAtom(fdpAtom);
  const [deck] = useAtom(slidesDeckAtom);
  const [slides] = useAtom(slidesAtom);
  const { isOpen, onOpen, onClose } = useDisclosure();

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
                <Tabs>
                  <TabList>
                    <Tab>Copy Link</Tab>
                    <Tab>Embed</Tab>
                  </TabList>

                  <TabPanels>
                    <TabPanel>
                      <p>one!</p>
                    </TabPanel>
                    <TabPanel>
                      <p>two!</p>
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
