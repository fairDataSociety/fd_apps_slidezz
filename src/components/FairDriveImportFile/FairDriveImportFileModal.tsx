import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Box,
  useToast,
  HStack,
  Text,
  useColorModeValue,
  IconButton,
  Tooltip,
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import SelectPod from './SelectPod'
import SelectPath from './SelectPath'
import { AiOutlineInbox } from 'react-icons/ai'
import { basename, extname } from 'path'
import { File } from '../../types'
import LoadingToast from '../Toast/LoadingToast'
import { fairDriveDownloadFile } from '../../utils/fairdrive'
import { useAtom } from 'jotai'
import { fdpAtom } from '../../store'

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
  const tooltipBg = useColorModeValue('latte-overlay1', 'frappe-overlay1')

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

      toast({
        duration: null,
        position: 'top-left',
        render: () => <LoadingToast label="Loading File" />,
      })

      fairDriveDownloadFile(pod, fullFilePath, fdp)
        .then((data) => {
          setFile({
            podName: pod,
            name: basename(fullFilePath),
            fullPath: fullFilePath,
            extension: extname(fullFilePath).slice(1),
            data,
          }).then(() => toast.closeAll())
        })
        .catch((error: any) => {
          toast.closeAll()

          toast({
            title: 'Failed to load file',
            description: error.message,
            status: 'error',
            duration: 9000,
            isClosable: true,
          })
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
      <ModalContent bg={useColorModeValue('latte-crust', 'frappe-crust')}>
        <ModalHeader>Select a {pod ? 'File' : 'Pod'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody my={2} overflowY="scroll">
          {pod && (
            <HStack mb={3}>
              {!initialPod && (
                <Tooltip bg={tooltipBg} hasArrow label="Select another pod">
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
