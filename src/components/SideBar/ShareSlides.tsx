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
  VStack,
  Text,
  Box,
  Badge,
  useClipboard,
} from "@chakra-ui/react";

export default function ShareSlides() {
  const [fdp] = useAtom(fdpAtom);
  const [deck] = useAtom(slidesDeckAtom);
  const [slides] = useAtom(slidesAtom);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const shareLink = `http://127.0.0.1:3000/shared-slideshow/${slides?.sharedRef}`;
  const { hasCopied, onCopy } = useClipboard(shareLink);

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
                      <VStack align="stretch">
                        <Text>Link URL</Text>
                        <Box w="full" border="1px" p={2}>
                          <Text cursor="text" mb={1}>
                            {shareLink}
                          </Text>
                          <Badge
                            fontSize="0.8rem"
                            cursor="pointer"
                            onClick={onCopy}
                          >
                            {hasCopied ? "copied" : "copy"}
                          </Badge>
                        </Box>
                      </VStack>
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
