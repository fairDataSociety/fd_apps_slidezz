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
import { slideShowSettingsAtom } from "../../store";
import { checkBoxSettings, selectSettings } from "../../settings";

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
              <DrawerContent
                bg={useColorModeValue("latte-crust", "frappe-crust")}
              >
                <DrawerCloseButton />
                <DrawerHeader as="h2">Presentation settings</DrawerHeader>
                <DrawerBody mt={5}>
                  <VStack align="stretch" gap={5}>
                    {checkBoxSettings.map((item) => {
                      return (
                        <FormControl key={item.name}>
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

                    {selectSettings.map((item) => {
                      return (
                        <FormControl>
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