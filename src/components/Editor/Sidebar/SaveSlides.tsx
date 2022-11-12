import { useAtom } from 'jotai'
import { useState } from 'react'
import { FaSave } from 'react-icons/fa'

import {
  Button,
  Checkbox,
  Collapse,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Switch,
  Text,
  VStack,
  useBoolean,
  useColorModeValue,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'

import { openPod } from '../../../api/fairos/pod'
import {
  fdpAtom,
  loadingModalActionAtom,
  slidesAtom,
  slidesDeckAtom,
  slidesLogoAtom,
  userAtom,
} from '../../../store'
import { getSlidesHTML } from '../../../utils'
import {
  fairDriveCreatePod,
  fairDrivePods,
  fairDriveSharePod,
  fairDriveUploadFile,
} from '../../../utils/fairdrive'
import SideBarItem from './SidebarItem'

export default function SaveSlides() {
  const [deck] = useAtom(slidesDeckAtom)
  const [slides, setSlides] = useAtom(slidesAtom)
  const [slidesLogo] = useAtom(slidesLogoAtom)
  const [user] = useAtom(userAtom)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [fileName, setFileName] = useState('')
  const [shareSlides, setShareSlides] = useBoolean(false)
  const [allowDownloading, setAllowDownloading] = useBoolean(false)

  const [fdp] = useAtom(fdpAtom)
  const toast = useToast()
  const loadingModalAction = useAtom(loadingModalActionAtom)[1]

  const handleFairOSSaveSlides = async (slidesDiv: HTMLElement) => {
    if (!user || !slides) return

    //TODO: unique pod name
    const slidesPodName = shareSlides
      ? `${process.env.NEXT_PUBLIC_SLIDES_POD!}-sha`
      : process.env.NEXT_PUBLIC_SLIDES_POD!

    const pods = await fairDrivePods()
    const slidesPod = pods.pods.find((pod) => pod === slidesPodName)

    if (!slidesPod) {
      await fairDriveCreatePod({
        podName: slidesPodName,
        password: user.password,
      })
    }

    //TODO: check if pod is already shared
    const sharedRef = await fairDriveSharePod({
      podName: slidesPodName,
      password: user.password,
    })

    await openPod(slidesPodName, user.password)

    const filePath = `/${fileName}.html`
    await fairDriveUploadFile(slidesPodName, filePath, slidesDiv.innerHTML)

    setSlides({
      ...slides,
      name: fileName,
      sharingInfo: {
        sharedRef: `1${sharedRef}${fileName}`,
        allowDownloading: true,
      },
    })
  }

  const handleFDPSaveSlides = async (slidesDiv: HTMLElement) => {
    if (!user || !slides || !fdp) return

    const slidesPodName = process.env.NEXT_PUBLIC_SLIDES_POD!
    const pods = await fairDrivePods()
    const slidesPod = pods.pods.find((pod) => pod === slidesPodName)

    if (!slidesPod) {
      await fairDriveCreatePod(
        {
          podName: slidesPodName,
          password: user.password,
        },
        fdp
      )
    }

    const filePath = `/${fileName}.html`
    await fairDriveUploadFile(slidesPodName, filePath, slidesDiv.innerHTML)

    let slidesShareRef: string | undefined = undefined
    if (shareSlides) {
      slidesShareRef = await fdp.file.share(slidesPodName, filePath)
    }

    setSlides({
      ...slides,
      name: fileName,
      sharingInfo: {
        sharedRef: `0${slidesShareRef}`,
        allowDownloading: true,
      },
    })
  }

  const handleSaveSlides = async () => {
    if (!slides || !deck || !user) return

    try {
      loadingModalAction({ action: 'start', message: 'Saving slides' })

      const slidesHTML = getSlidesHTML(deck)
      const div = document.createElement('div')
      div.innerHTML = slidesHTML

      if (slidesLogo) {
        const logoElement = document.createElement('div')
        logoElement.classList.add('logo-image')
        logoElement.setAttribute('data-base64', slidesLogo.data)
        div.appendChild(logoElement)
      }

      if (shareSlides) {
        const sharingOptionsElement = document.createElement('div')
        sharingOptionsElement.classList.add('sharing-options')
        sharingOptionsElement.setAttribute(
          'data-allow-downloading',
          `${allowDownloading}`
        )
        div.appendChild(sharingOptionsElement)
      }

      if (fdp) await handleFDPSaveSlides(div)
      else await handleFairOSSaveSlides(div)
    } catch (error: any) {
      console.log(error)

      toast({
        title: 'Failed to upload file',
        description: error.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
    handleOnClose()
    loadingModalAction({ action: 'stop' })
  }

  const handleOnClose = () => {
    setFileName('')
    setShareSlides.off()
    setAllowDownloading.off()
    onClose()
  }

  return (
    <>
      <SideBarItem icon={FaSave} onClick={onOpen} label="Save slides" />
      <Modal isOpen={isOpen} onClose={handleOnClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Save Slides</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack align="stretch">
              <InputGroup>
                <Input
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  placeholder="Slideshow name"
                />

                <InputRightAddon bg={useColorModeValue('gray.200', 'gray.800')}>
                  .html
                </InputRightAddon>
              </InputGroup>

              <FormControl display="flex" alignItems="center">
                <FormLabel htmlFor="share-slides" mb="0">
                  Share slides?
                </FormLabel>
                <Switch
                  colorScheme="surface1"
                  isChecked={shareSlides}
                  id="share-slides"
                  onChange={setShareSlides.toggle}
                />
              </FormControl>

              <Collapse in={shareSlides}>
                <Text pt={2} color="gray.500" fontSize="sm">
                  Sharing options
                </Text>
                <VStack
                  align="stretch"
                  border="solid"
                  borderWidth={1}
                  p={2}
                  rounded="md"
                  borderColor={useColorModeValue(
                    'latte-overlay0',
                    'frappe-overlay0'
                  )}
                >
                  <Checkbox
                    isChecked={allowDownloading}
                    onChange={setAllowDownloading.toggle}
                  >
                    Allow downloading
                  </Checkbox>
                </VStack>
              </Collapse>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              isDisabled={fileName.length === 0}
              onClick={handleSaveSlides}
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
