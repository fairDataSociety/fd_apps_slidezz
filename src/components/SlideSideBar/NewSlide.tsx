import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  SimpleGrid,
  Center,
} from '@chakra-ui/react'
import { useAtom } from 'jotai'
import { BiPlus } from 'react-icons/bi'
import { moveableTargetAtom, slidesDeckAtom } from '../../store'
import { templates } from '../../templates'
import { addMoveableToElements } from '../../utils'
import SlideSideBarItem from './SlideSideBarItem'

export default function NewSlide() {
  const [deck] = useAtom(slidesDeckAtom)
  const [moveableTarget, setMoveableTarget] = useAtom(moveableTargetAtom)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const addNewSlide = (content: string) => {
    const sectionElement = document.createElement('section')
    sectionElement.innerHTML = content

    const children = sectionElement.children as any

    addMoveableToElements(children, setMoveableTarget)

    const currentSlideIndex = deck.getState().indexh
    const currentSlide = deck.getCurrentSlide() as HTMLElement
    const slidesLen = deck.getTotalSlides()
    const slides = deck.getSlidesElement() as HTMLElement

    //append to the end
    if (currentSlideIndex === slidesLen - 1) {
      slides.appendChild(sectionElement)
    } else {
      slides.insertBefore(sectionElement, currentSlide.nextSibling)
    }

    deck.sync()
    deck.layout()
    deck.next()
    onClose()
  }

  return (
    <>
      <SlideSideBarItem onClick={onOpen} icon={BiPlus} label="Add new slide" />

      <Modal size="3xl" isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent h="600px">
          <ModalHeader>Select a template</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid
              overflowY="scroll"
              h="500px"
              columns={{ base: 1, md: 2 }}
              spacing={5}
            >
              {templates.map((template, i) => {
                return (
                  <Center
                    key={i}
                    onClick={() => addNewSlide(template.content)}
                    mx="auto"
                    cursor="pointer"
                    w="300px"
                    h="200px"
                    border="solid 1px #ccc"
                    _hover={{
                      borderColor: '#000',
                    }}
                  >
                    <template.component />
                  </Center>
                )
              })}
            </SimpleGrid>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}
