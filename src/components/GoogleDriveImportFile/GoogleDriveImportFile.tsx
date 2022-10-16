import { Box, useDisclosure } from '@chakra-ui/react'
import { useGoogleLogin } from '@react-oauth/google'
import { useState } from 'react'
import GoogleDriveImportFileModal from './GoogleDriveImportFileModal'

interface GoogleDriveImportFileProps {
  children: React.ReactNode
  mimeType?: string
  callback: (data: any) => void
  downloadFile?: boolean
}

export default function GoogleDriveImportFile({
  children,
  mimeType,
  callback,
  downloadFile,
}: GoogleDriveImportFileProps) {
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
      <Box onClick={() => googleDriveLogin()}>{children}</Box>

      {accessToken && (
        <GoogleDriveImportFileModal
          isOpen={isOpen}
          onClose={onClose}
          accessToken={accessToken}
          mimeType={mimeType}
          callback={callback}
          downloadFile={downloadFile}
        />
      )}
    </>
  )
}
