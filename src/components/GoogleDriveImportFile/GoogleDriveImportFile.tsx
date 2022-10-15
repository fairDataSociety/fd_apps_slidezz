import {
  Box,
  HStack,
  Text,
  useColorModeValue,
  useDisclosure,
} from '@chakra-ui/react'
import { useGoogleLogin } from '@react-oauth/google'
import { useState } from 'react'
import GoogledriveIcon from '../Icons/GoogledriveIcon'
import GoogleDriveImportFileModal from './GoogleDriveImportFileModal'

export default function GoogleDriveImportFile() {
  const [accessToken, setAccessToken] = useState<string>()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const googleDriveLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      setAccessToken(tokenResponse.access_token)
      onOpen()
    },
    onError: (errorResponse) => console.log(errorResponse),
    scope: 'https://www.googleapis.com/auth/drive.readonly',
  })

  return (
    <>
      <HStack
        onClick={() => googleDriveLogin()}
        justify="space-between"
        w="md"
        cursor="pointer"
        gap={2}
        border="solid"
        borderWidth={1}
        p={6}
        rounded="lg"
        borderColor={useColorModeValue('latte-overlay0', 'frappe-overlay0')}
        _hover={{
          boxShadow: 'lg',
        }}
      >
        <GoogledriveIcon flex={1} />
        <Box flex={2}>
          <Text fontSize="lg" fontWeight="bold">
            Google Drive
          </Text>
          <Text variant="subtext">
            Select a Markdown File from Google Drive
          </Text>
        </Box>
      </HStack>
      {accessToken && (
        <GoogleDriveImportFileModal
          isOpen={isOpen}
          onClose={onClose}
          accessToken={accessToken}
        />
      )}
    </>
  )
}
