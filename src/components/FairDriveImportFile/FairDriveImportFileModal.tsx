import { useAtom } from 'jotai'
import { basename, extname } from 'path'
import { useEffect, useState } from 'react'
import { AiOutlineInbox } from 'react-icons/ai'

import {
  Box,
  HStack,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Text,
  Tooltip,
  useToast,
} from '@chakra-ui/react'

import useColors from '../../hooks/useColors'
import { fdpAtom, loadingModalActionAtom } from '../../store'
import { File } from '../../types'
import { fairDriveDownloadFile } from '../../utils/fairdrive'
import SelectPath from './SelectPath'
import SelectPod from './SelectPod'

interface FairDriveImportFileModalProps {
  isOpen: boolean
  onClose: () => void
  setFile: (file: File | undefined) => Promise<void>
  allowedExtensions?: string[]
  initialPod?: string
}

export default function FairDriveImportFileModal({
  isOpen,
  onClose,
  setFile,
  allowedExtensions,
  initialPod,
}: FairDriveImportFileModalProps) {
  const toast = useToast()
  const [pod, setPod] = useState<string | undefined>(initialPod)
  const [filePath, setFilePath] = useState<string>()
  const [fdp] = useAtom(fdpAtom)
  const { overlay1, crust } = useColors()
  const [, loadingModalAction] = useAtom(loadingModalActionAtom)

  const handleModalClose = () => {
    setPod(undefined)
    setFilePath(undefined)
    onClose()
  }

  useEffect(() => {
    if (pod && filePath) {
      setFile(undefined)

      const fullFilePath = filePath
      handleModalClose()

      loadingModalAction({ action: 'start', message: 'Loading File' })

      fairDriveDownloadFile(pod, fullFilePath, fdp)
        .then((data) => {
          setFile({
            podName: pod,
            name: basename(fullFilePath),
            fullPath: fullFilePath,
            extension: extname(fullFilePath).slice(1),
            data,
          })
        })
        .catch((error: any) => {
          toast({
            title: 'Failed to load file',
            description: error.message,
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
        })
        .finally(() => {
          loadingModalAction({ action: 'stop' })
        })
    }
  }, [pod, filePath])

  return (
    <Modal
      closeOnOverlayClick={false}
      size={{ base: 'xs', sm: 'md', md: '2xl' }}
      isOpen={isOpen}
      onClose={handleModalClose}
    >
      <ModalOverlay />
      <ModalContent bg={crust}>
        <ModalHeader>Select a {pod ? 'File' : 'Pod'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody my={2} overflowY="scroll">
          {pod && (
            <HStack mb={3}>
              {!initialPod && (
                <Tooltip bg={overlay1} hasArrow label="Select another pod">
                  <IconButton
                    size="sm"
                    icon={<AiOutlineInbox />}
                    aria-label="pod"
                    onClick={() => setPod(undefined)}
                  />
                </Tooltip>
              )}
              <Text>Pod: {pod}</Text>
            </HStack>
          )}
          <Box h="300px">
            {pod ? (
              <SelectPath
                pod={pod}
                setPath={setFilePath}
                allowedExtensions={allowedExtensions}
              />
            ) : (
              <SelectPod setPod={setPod} />
            )}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
