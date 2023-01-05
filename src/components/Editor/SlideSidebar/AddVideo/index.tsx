import { useAtom, useAtomValue } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'
import { FaVideo } from 'react-icons/fa'

import { PlusSquareIcon } from '@chakra-ui/icons'
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'

import { addVideoToCurrentSlide } from '../../../../actions/addVideoToCurrentSlide'
import {
  addHistoryActionAtom,
  mediaAtom,
  moveableTargetsAtom,
  slidesDeckAtom,
  videoMediaAtom,
} from '../../../../store'
import { File } from '../../../../types'
import ImportFile from '../../../FairDriveImportFile'
import ItemBox from '../../../FairDriveImportFile/ItemBox'
import SlideSideBarItem from '../SlideSidebarItem'
import AddYouTubeEmbedVideo from './AddYouTubeEmbedVideo'

export default function AddVideo() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [media, setMedia] = useAtom(mediaAtom)
  const videos = useAtomValue(videoMediaAtom)
  const setMoveableTargets = useUpdateAtom(moveableTargetsAtom)
  const deck = useAtomValue(slidesDeckAtom)
  const addHistoryAction = useUpdateAtom(addHistoryActionAtom)

  return (
    <>
      <SlideSideBarItem icon={FaVideo} label="Video" onClick={onOpen} />

      <Modal
        size={{ base: 'sm', md: '2xl', lg: '4xl' }}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent h="650px">
          <ModalHeader>Select an video</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <VStack align="stretch" gap={2}>
              <Box alignSelf="flex-end">
                <AddYouTubeEmbedVideo addVideoOnClose={onClose} />
              </Box>

              <VStack
                p={2}
                align="stretch"
                spacing={2}
                overflowY="scroll"
                h="400px"
              >
                {videos.map((video, i) => {
                  return (
                    <ItemBox
                      key={i}
                      icon={FaVideo}
                      text={video.name}
                      onClick={() => {
                        if (!deck) return
                        addVideoToCurrentSlide(
                          video,
                          deck,
                          setMoveableTargets,
                          addHistoryAction
                        )
                        onClose()
                      }}
                    />
                  )
                })}
              </VStack>
            </VStack>
          </ModalBody>
          <ModalFooter flexDir="row-reverse">
            <ImportFile
              setFile={async (file: File | undefined) => {
                if (file) setMedia([...media, file])
              }}
              allowedExtensions={['mp4', 'webm', 'ogg']}
            >
              <Button leftIcon={<PlusSquareIcon />}>
                Import from Fairdrive
              </Button>
            </ImportFile>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}
