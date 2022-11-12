import { Formik } from 'formik'
import { useAtom } from 'jotai'
import { FiSettings } from 'react-icons/fi'

import {
  Box,
  Button,
  Checkbox,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormHelperText,
  FormLabel,
  Select,
  VStack,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'

import {
  checkBoxSettings,
  selectSettings,
} from '../../../../config/slide-settings'
import { slideshowSettingsAtom } from '../../../../store'
import SideBarItem from '../SidebarItem'

export default function SlideshowSettings() {
  const [slideshowSettings, setSlideshowSettings] = useAtom(
    slideshowSettingsAtom
  )
  const { isOpen, onOpen, onClose } = useDisclosure()
  const settingBg = useColorModeValue('latte-crust', 'frappe-crust')

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
            setSlideshowSettings(values)
            onClose()
          }}
          initialValues={slideshowSettings}
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
                      )
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
                      )
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
  )
}
