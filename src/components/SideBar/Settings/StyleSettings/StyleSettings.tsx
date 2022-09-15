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
  Box,
} from '@chakra-ui/react'
import { HiColorSwatch } from 'react-icons/hi'
import SideBarItem from '../../SideBarItem'
import { Formik } from 'formik'
import { useAtom } from 'jotai'
import { styleSettingsAtom } from '../../../../store'
import SelectColor from './SelectColor'

export default function PresentationSettings() {
  const [styleSettings, setStyleSettings] = useAtom(styleSettingsAtom)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const settingBg = useColorModeValue('latte-crust', 'frappe-crust')

  return (
    <>
      <SideBarItem label="Style" icon={HiColorSwatch} onClick={onOpen} />

      <Drawer size="sm" isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <Formik
          onSubmit={(values) => {
            setStyleSettings(values)
            onClose()
          }}
          initialValues={styleSettings}
        >
          {({ handleSubmit }) => (
            <Box>
              <DrawerContent bg={settingBg}>
                <DrawerCloseButton />
                <DrawerHeader as="h2">Style settings</DrawerHeader>
                <DrawerBody mt={5}>
                  <VStack align="stretch" gap={5}>
                    <SelectColor />
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
