import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useColorModeValue,
  Center,
  Spinner,
  VStack,
  Box,
  useToast,
  Text,
} from '@chakra-ui/react'
import axios from 'axios'
import { useAtom } from 'jotai'
import { useEffect, useState } from 'react'
import { AiOutlineFile } from 'react-icons/ai'
import { googleAccessTokenAtom } from '../../store'
import ItemBox from '../FairDriveImportFile/ItemBox'
import LoadingToast from '../Toast/LoadingToast'

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
      <ModalContent bg={useColorModeValue('latte-crust', 'frappe-crust')}>
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
                        toast({
                          duration: null,
                          render: () => <LoadingToast label="Loading File" />,
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
                        } catch (error) {
                          console.log(error)
                        }

                        toast.closeAll()
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
