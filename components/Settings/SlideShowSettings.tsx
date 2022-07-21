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
  FormControl,
  FormLabel,
  FormHelperText,
  Select,
  useColorModeValue,
} from "@chakra-ui/react";
import { FiSettings } from "react-icons/fi";
import SideBarItem from "../SideBar/SideBarItem";
import { Formik, Form } from "formik";
import { useAtom } from "jotai";
import { slideShowSettingsAtom, controlsLayoutOptions } from "../../store";

export default function SlideShowSettings() {
  const [slideShowSettings, setSlideShowSettings] = useAtom(
    slideShowSettingsAtom
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
            setSlideShowSettings(values);
            onClose();
          }}
          initialValues={slideShowSettings}
        >
          {({ handleSubmit, handleChange, values }) => (
            <Form onSubmit={handleSubmit}>
              <DrawerContent bg={useColorModeValue("crust.50", "crust.700")}>
                <DrawerCloseButton />
                <DrawerHeader as="h2">Presentation settings</DrawerHeader>
                <DrawerBody mt={5}>
                  <VStack align="stretch" gap={5}>
                    <FormControl>
                      <Checkbox
                        id="controls"
                        name="controls"
                        onChange={handleChange}
                        isChecked={values.controls}
                      >
                        Controls
                      </Checkbox>
                      <FormHelperText>
                        Display presentation control arrows
                      </FormHelperText>
                    </FormControl>

                    <FormControl>
                      <Checkbox
                        id="progress"
                        name="progress"
                        onChange={handleChange}
                        isChecked={values.progress}
                      >
                        Progress
                      </Checkbox>
                      <FormHelperText>
                        Display a presentation progress bar
                      </FormHelperText>
                    </FormControl>

                    <FormControl>
                      <Checkbox
                        id="history"
                        name="history"
                        onChange={handleChange}
                        isChecked={values.history}
                      >
                        History
                      </Checkbox>

                      <FormHelperText>
                        Push each slide change to the browser history
                      </FormHelperText>
                    </FormControl>

                    <FormControl>
                      <Checkbox
                        id="center"
                        name="center"
                        onChange={handleChange}
                        isChecked={values.center}
                      >
                        Center
                      </Checkbox>
                      <FormHelperText>
                        Vertical centering of slides
                      </FormHelperText>
                    </FormControl>

                    <FormControl>
                      <Checkbox
                        id="loop"
                        name="loop"
                        onChange={handleChange}
                        isChecked={values.loop}
                      >
                        Loop
                      </Checkbox>
                      <FormHelperText>Loop the presentation</FormHelperText>
                    </FormControl>

                    <FormControl>
                      <FormLabel htmlFor="theme">Controls Layout</FormLabel>
                      <Select
                        id="controlsLayout"
                        name="controlsLayout"
                        onChange={handleChange}
                        value={values.controlsLayout}
                      >
                        {controlsLayoutOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </Select>
                      <FormHelperText>
                        Determines where controls appear
                      </FormHelperText>
                    </FormControl>
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
