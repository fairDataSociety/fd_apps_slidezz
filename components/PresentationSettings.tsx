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
  Checkbox,
  VStack,
} from "@chakra-ui/react";
import { FiSettings } from "react-icons/fi";
import SideBarItem from "./SideBarItem";
import { Formik, Form } from "formik";
import { useAtom } from "jotai";
import { presentationSettingsAtom } from "../store";

export default function PresentationSettings() {
  const [presentationSettings, setPresentationSettings] = useAtom(
    presentationSettingsAtom
  );
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <SideBarItem
        label="Presentation settings"
        icon={FiSettings}
        onClick={onOpen}
      />

      <Drawer size="sm" isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <Formik
          onSubmit={(values) => {
            setPresentationSettings(values);
            onClose();
          }}
          initialValues={presentationSettings}
        >
          {({ handleSubmit, handleChange, values }) => (
            <Form onSubmit={handleSubmit}>
              <DrawerContent>
                <DrawerCloseButton />
                <DrawerHeader>Presentation settings</DrawerHeader>
                <DrawerBody mt={5}>
                  <VStack align="stretch" gap={5}>
                    <Checkbox
                      id="controls"
                      name="controls"
                      onChange={handleChange}
                      isChecked={values.controls}
                    >
                      Display presentation control arrows
                    </Checkbox>

                    <Checkbox
                      id="progress"
                      name="progress"
                      onChange={handleChange}
                      isChecked={values.progress}
                    >
                      Display a presentation progress bar
                    </Checkbox>

                    <Checkbox
                      id="history"
                      name="history"
                      onChange={handleChange}
                      isChecked={values.history}
                    >
                      Push each slide change to the browser history
                    </Checkbox>

                    <Checkbox
                      id="center"
                      name="center"
                      onChange={handleChange}
                      isChecked={values.center}
                    >
                      Vertical centering of slides
                    </Checkbox>

                    <Checkbox
                      id="loop"
                      name="loop"
                      onChange={handleChange}
                      isChecked={values.loop}
                    >
                      Loop the presentation
                    </Checkbox>
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
