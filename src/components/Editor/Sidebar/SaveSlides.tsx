import { useAtom } from 'jotai'
import { useState } from 'react'
import { FaSave } from 'react-icons/fa'

import {
  Button,
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
  const [fdp] = useAtom(fdpAtom)
  const toast = useToast()
  const loadingModalAction = useAtom(loadingModalActionAtom)[1]

  const handleSaveSlides = async () => {
    if (!slides || !deck || !user) return

    const fileNameTmp = fileName
    const shareSlidesTmp = shareSlides

    handleOnClose()

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

      const slidesPodName = process.env.NEXT_PUBLIC_SLIDES_POD!
      const pods = await fairDrivePods()
      const slidesPod = pods.find((pod) => pod === slidesPodName)

      if (!slidesPod) {
        await fairDriveCreatePod(
          {
            podName: slidesPodName,
            password: user.password,
          },
          fdp
        )
      }

      if (!fdp) {
        await openPod(slidesPodName, user.password)
      }

      const filePath = `/${fileNameTmp}.html`
      await fairDriveUploadFile(slidesPodName, filePath, div.innerHTML)

      let slidesShareRef: string | undefined = undefined
      if (shareSlidesTmp && fdp) {
        slidesShareRef = await fdp.file.share(slidesPodName, filePath)
      }

      setSlides({
        ...slides,
        name: fileNameTmp,
        sharedRef: slidesShareRef,
      })
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
    loadingModalAction({ action: 'stop' })
  }

  const handleOnClose = () => {
    setFileName('')
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
            <VStack>
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
              {fdp && (
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
              )}
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
