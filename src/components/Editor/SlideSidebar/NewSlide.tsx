import { useAtomValue } from 'jotai'
import { BiPlus } from 'react-icons/bi'

import {
  Button,
  Center,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  useDisclosure,
} from '@chakra-ui/react'

import { addNewSlide } from '../../../actions/addNewSlide'
import { templates } from '../../../config/templates'
import { slidesDeckAtom } from '../../../store'
import SlideSideBarItem from './SlideSidebarItem'

export default function NewSlide() {
  const deck = useAtomValue(slidesDeckAtom)
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <SlideSideBarItem onClick={onOpen} icon={BiPlus} label="Add new slide" />

      <Modal size={{ base: 'md', lg: '3xl' }} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent h="600px">
          <ModalHeader as={HStack} gap={5}>
            <Text>Select a template</Text>
            <Button
              size="sm"
              onClick={() => {
                if (!deck) return
                addNewSlide(deck)
                onClose()
              }}
            >
              Duplicate
            </Button>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SimpleGrid
              overflowY="scroll"
              h="500px"
              columns={{ base: 1, lg: 2 }}
              spacing={5}
            >
              {templates.map((template, i) => {
                return (
                  <Center
                    key={i}
                    onClick={() => {
                      if (!deck) return
                      addNewSlide(deck, template.content)
                      onClose()
                    }}
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
