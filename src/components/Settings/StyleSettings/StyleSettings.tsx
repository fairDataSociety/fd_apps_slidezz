import {
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  VStack,
  useColorModeValue,
} from "@chakra-ui/react";
import { HiColorSwatch } from "react-icons/hi";
import SideBarItem from "../../SideBar/SideBarItem";
import { Formik, Form } from "formik";
import { useAtom } from "jotai";
import { styleSettingsAtom } from "../../../store";
import ColorSelect from "./ColorSelect";

export default function PresentationSettings() {
  const [styleSettings, setStyleSettings] = useAtom(styleSettingsAtom);
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <SideBarItem label="Style" icon={HiColorSwatch} onClick={onOpen} />

      <Drawer size="sm" isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <Formik
          onSubmit={(values) => {
            setStyleSettings(values);
            onClose();
          }}
          initialValues={styleSettings}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <DrawerContent
                bg={useColorModeValue("latte-crust", "frappe-crust")}
              >
                <DrawerCloseButton />
                <DrawerHeader as="h2">Style settings</DrawerHeader>
                <DrawerBody mt={5}>
                  <VStack align="stretch" gap={5}>
                    <ColorSelect />
                  </VStack>
                </DrawerBody>

                <DrawerFooter>
                  <Button variant="outline" mr={3} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit">Save</Button>
                </DrawerFooter>
              </DrawerContent>
            </Form>
          )}
        </Formik>
      </Drawer>
    </>
  );
}