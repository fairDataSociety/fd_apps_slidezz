import {
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  InputGroup,
  InputRightAddon,
  useColorModeValue,
  useDisclosure,
  VStack,
  FormLabel,
  Switch,
  FormControl,
  useBoolean,
} from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { useState } from 'react'
import {
  slidesDeckAtom,
  slidesAtom,
  slidesLogoAtom,
  userAtom,
  fdpAtom,
} from '../../../store'
import { FaSave } from 'react-icons/fa'
import SideBarItem from './SidebarItem'
import LoadingToast from '../../Toast/LoadingToast'
import { getSlidesHTML } from '../../../utils'
import { openPod } from '../../../api/fairos/pod'
import {
  fairDriveCreatePod,
  fairDrivePods,
  fairDriveUploadFile,
} from '../../../utils/fairdrive'

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

  const handleSaveSlides = async () => {
    if (!slides || !deck || !user) return

    const fileNameTmp = fileName
    const shareSlidesTmp = shareSlides

    handleOnClose()

    try {
      toast({
        duration: null,
        position: 'top-left',
        render: () => <LoadingToast label="Saving slides" />,
      })

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

      toast.closeAll()
    } catch (error: any) {
      toast.closeAll()
      console.log(error)

      toast({
        title: 'Failed to upload file',
        description: error.message,
        status: 'error',
        duration: 9000,
        isClosable: true,
      })
    }
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
