import axios from 'axios'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { AiOutlineFile } from 'react-icons/ai'

import {
  Box,
  Center,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Text,
  VStack,
  useToast,
} from '@chakra-ui/react'

import useColors from '../../hooks/useColors'
import { googleAccessTokenAtom, loadingModalSetActionAtom } from '../../store'
import ItemBox from '../FairDriveImportFile/ItemBox'

interface GoogleDriveImportFileModalProps {
  isOpen: boolean
  onClose: () => void
  mimeType?: string
  callback: (data: any) => void
  downloadFile?: boolean
}

export default function GoogleDriveImportFileModal({
  isOpen,
  onClose,
  mimeType,
  callback,
  downloadFile,
}: GoogleDriveImportFileModalProps) {
  const toast = useToast()
  const [files, setFiles] = useState<{ id: string; name: string }[]>()
  const [isLoading, setIsLoading] = useState(false)
  const [googleAccessToken] = useAtom(googleAccessTokenAtom)
  const [, loadingModalSetAction] = useAtom(loadingModalSetActionAtom)
  const { crust } = useColors()

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      try {
        const res = await axios.get(
          'https://www.googleapis.com/drive/v3/files',
          {
            params: mimeType
              ? {
                  q: `mimeType='${mimeType}'`,
                }
              : undefined,
            headers: {
              Authorization: `Bearer ${googleAccessToken}`,
            },
          }
        )
        setFiles(res.data.files)
      } catch (error) {
        console.log(error)
      }
      setIsLoading(false)
    })()
  }, [googleAccessToken])

  return (
    <Modal
      closeOnOverlayClick={false}
      size={{ base: 'xs', sm: 'md', md: '2xl' }}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent bg={crust}>
        <ModalHeader>Google Drive</ModalHeader>
        <ModalCloseButton />
        <ModalBody my={2} overflowY="scroll">
          <Box h="400px">
            {isLoading ? (
              <Center>
                <Spinner />
              </Center>
            ) : files ? (
              <VStack gap={2} align="stretch">
                {files.length === 0 && <Text>No {mimeType} file found.</Text>}
                {files.map((file) => {
                  return (
                    <ItemBox
                      key={file.id}
                      text={file.name}
                      icon={AiOutlineFile}
                      onClick={async () => {
                        loadingModalSetAction({
                          action: 'start',
                          message: 'Loading File',
                        })

                        onClose()

                        try {
                          const res = await axios.get(
                            `https://www.googleapis.com/drive/v3/files/${file.id}`,
                            {
                              params: {
                                alt: downloadFile ? 'media' : undefined,
                              },
                              headers: {
                                Authorization: `Bearer ${googleAccessToken}`,
                              },
                            }
                          )
                          callback(res.data)
                        } catch (error: any) {
                          console.log(error)

                          toast({
                            title: 'Failed to load file',
                            description: error.message,
                            status: 'error',
                            duration: 9000,
                            isClosable: true,
                          })
                        }
                        loadingModalSetAction({ action: 'stop' })
                      }}
                    />
                  )
                })}
              </VStack>
            ) : null}
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
