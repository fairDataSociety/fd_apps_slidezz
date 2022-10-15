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
import { AiOutlineFileMarkdown } from 'react-icons/ai'
import { slidesAtom, userAtom } from '../../store'
import { loadSlideshow } from '../../utils'
import ItemBox from '../ImportFile/ItemBox'
import LoadingToast from '../Toast/LoadingToast'

interface GoogleDriveImportFileModalProps {
  isOpen: boolean
  onClose: () => void
  accessToken: string
}

export default function GoogleDriveImportFileModal({
  isOpen,
  onClose,
  accessToken,
}: GoogleDriveImportFileModalProps) {
  const toast = useToast()
  const [files, setFiles] = useState<{ id: string; name: string }[]>()
  const [isLoading, setIsLoading] = useState(false)
  const [user] = useAtom(userAtom)
  const [slides, setSlides] = useAtom(slidesAtom)

  useEffect(() => {
    ;(async () => {
      setIsLoading(true)
      try {
        const res = await axios.get(
          'https://www.googleapis.com/drive/v3/files',
          {
            params: {
              q: `mimeType='md'`,
            },
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        )
        setFiles(res.data.files)
        console.log(res)
      } catch (error) {
        console.log(error)
      }
      setIsLoading(false)
    })()
  }, [accessToken])

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
                {files.length === 0 && <Text>No Markdown file found.</Text>}
                {files.map((file) => {
                  return (
                    <ItemBox
                      key={file.id}
                      text={file.name}
                      icon={AiOutlineFileMarkdown}
                      onClick={async () => {
                        if (!user) return

                        toast({
                          duration: null,
                          render: () => <LoadingToast label="Loading File" />,
                        })

                        try {
                          const res = await axios.get(
                            `https://www.googleapis.com/drive/v3/files/${file.id}`,
                            {
                              params: {
                                alt: 'media',
                              },
                              headers: {
                                Authorization: `Bearer ${accessToken}`,
                              },
                            }
                          )

                          console.log(res)

                          loadSlideshow(
                            user,
                            { data: new Blob(res.data) },
                            setSlides
                          )
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
