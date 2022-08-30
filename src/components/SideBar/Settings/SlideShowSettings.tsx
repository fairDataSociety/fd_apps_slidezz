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
  Box,
} from "@chakra-ui/react";
import { FiSettings } from "react-icons/fi";
import SideBarItem from "../SideBarItem";
import { Formik } from "formik";
import { useAtom } from "jotai";
import { slideShowSettingsAtom } from "../../../store";
import {
  checkBoxSettings,
  selectSettings,
} from "../../../config/slide-settings";

export default function SlideShowSettings() {
  const [slideShowSettings, setSlideShowSettings] = useAtom(
    slideShowSettingsAtom
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const settingBg = useColorModeValue("latte-crust", "frappe-crust");

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
            <Box>
              <DrawerContent bg={settingBg}>
                <DrawerCloseButton />
                <DrawerHeader as="h2">Presentation settings</DrawerHeader>
                <DrawerBody mt={5}>
                  <VStack align="stretch" gap={5}>
                    {checkBoxSettings.map((item, i) => {
                      return (
                        <FormControl key={i}>
                          <Checkbox
                            id={item.name}
                            name={item.name}
                            onChange={handleChange}
                            isChecked={values[item.name]}
                          >
                            {item.label}
                          </Checkbox>
                          <FormHelperText>{item.description}</FormHelperText>
                        </FormControl>
                      );
                    })}

                    {selectSettings.map((item, i) => {
                      return (
                        <FormControl key={i}>
                          <FormLabel>{item.label}</FormLabel>
                          <Select
                            id={item.name}
                            name={item.name}
                            onChange={handleChange}
                            value={values[item.name]}
                          >
                            {item.options.map((option) => (
                              <option key={option} value={option}>
                                {option}
                              </option>
                            ))}
                          </Select>
                          <FormHelperText>{item.description}</FormHelperText>
                        </FormControl>
                      );
                    })}
                  </VStack>
                </DrawerBody>

                <DrawerFooter>
                  <Button variant="outline" mr={3} onClick={onClose}>
                    Cancel
                  </Button>
                  <Button onClick={() => handleSubmit()}>Save</Button>
                </DrawerFooter>
              </DrawerContent>
            </Box>
          )}
        </Formik>
      </Drawer>
    </>
  );
}
