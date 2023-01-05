import { useGoogleLogin } from '@react-oauth/google'
import { useAtom } from 'jotai'
import { useUpdateAtom } from 'jotai/utils'

import { Box, useDisclosure } from '@chakra-ui/react'

import { googleAccessTokenAtom } from '../../store'
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
  const setGoogleAccessToken = useUpdateAtom(googleAccessTokenAtom)
  const { isOpen, onOpen, onClose } = useDisclosure()
  const googleDriveLogin = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      setGoogleAccessToken(tokenResponse.access_token)
      onOpen()
    },
    onError: (errorResponse) => console.log(errorResponse),
    scope: 'https://www.googleapis.com/auth/drive.readonly',
  })

  return (
    <>
      <Box onClick={() => googleDriveLogin()}>{children}</Box>
      {isOpen && (
        <GoogleDriveImportFileModal
          isOpen={isOpen}
          onClose={onClose}
          mimeType={mimeType}
          callback={callback}
          downloadFile={downloadFile}
        />
      )}
    </>
  )
}
