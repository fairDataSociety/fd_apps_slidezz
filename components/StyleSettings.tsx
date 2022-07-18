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
  Select,
  VStack,
} from "@chakra-ui/react";
import { HiColorSwatch } from "react-icons/hi";
import SideBarItem from "./SideBarItem";
import { Formik, Form } from "formik";
import { useAtom } from "jotai";
import { styleSettingsAtom, themes } from "../store";

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
          {({ handleSubmit, handleChange, values }) => (
            <Form onSubmit={handleSubmit}>
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Presentation settings</DrawerHeader>
                <DrawerBody mt={5}>
                  <VStack align="stretch" gap={5}>
                    <Select
                      name="theme"
                      id="theme"
                      onChange={handleChange}
                      value={values.theme}
                      placeholder="Select theme"
                    >
                      {Object.keys(themes).map((theme) => (
                        <option key={theme} value={theme}>
                          {theme}
                        </option>
                      ))}
                    </Select>
                  </VStack>
                </DrawerBody>

                <DrawerFooter>
                  <Button variant="outline" mr={3} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button type="submit" colorScheme="blue">
                    Save
                  </Button>
                </DrawerFooter>
              </DrawerContent>
            </Form>
          )}
        </Formik>
      </Drawer>
    </>
  );
}
