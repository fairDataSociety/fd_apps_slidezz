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
} from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { useState } from 'react'
import {
  slidesDeckAtom,
  slidesAtom,
  slidesLogoAtom,
  userAtom,
} from '../../store'
import { FaSave } from 'react-icons/fa'
import SideBarItem from './SideBarItem'
import LoadingToast from '../Toast/LoadingToast'
import { getSlidesHTML } from '../../utils'
import { createPod, getPods, openPod } from '../../api/pod'
import { uploadFile } from '../../api/fs'

export default function SaveSlides() {
  const [deck] = useAtom(slidesDeckAtom)
  const [slides, setSlides] = useAtom(slidesAtom)
  const [slidesLogo] = useAtom(slidesLogoAtom)
  const [user] = useAtom(userAtom)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [fileName, setFileName] = useState('')
  const toast = useToast()

  const handleSaveSlides = async () => {
    if (!slides || !deck || !user) return

    const fileNameTmp = fileName

    handleOnClose()

    try {
      toast({
        duration: null,
        render: () => <LoadingToast label="Saving slides" />,
      })

      const slidesHTML = getSlidesHTML(deck)
      const div = document.createElement('div')
      div.innerHTML = slidesHTML

      if (slidesLogo) {
        const logoElement = document.createElement('div')
        logoElement.style.display = 'none'
        logoElement.classList.add('logo-image')
        logoElement.setAttribute('data-pod', slidesLogo.podName!)
        logoElement.setAttribute('data-path', slidesLogo.fullPath!)

        div.append(logoElement)
      }

      const slidesPodName = process.env.NEXT_PUBLIC_SLIDES_POD!
      const pods = await getPods()
      const slidesPod = pods.pod_name.find((pod) => pod === slidesPodName)

      if (!slidesPod) {
        await createPod(slidesPodName, user.password)
      }

      try {
        await openPod(slidesPodName, user.password)
      } catch (error) {}

      const filePath = '/'
      const file = new File([div.innerHTML], `${fileNameTmp}.html`)

      await uploadFile({ pod_name: slidesPodName, dir_path: filePath, file })

      setSlides({
        ...slides,
        name: fileNameTmp,
      })

      toast.closeAll()
    } catch (error: any) {
      toast.closeAll()
      console.log(error)

      toast({
        title: 'Failed to upload file',
        description: error.response.data.message,
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
