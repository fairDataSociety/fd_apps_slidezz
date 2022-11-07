import { Box, useDisclosure } from '@chakra-ui/react'

import { File } from '../../types'
import ImportFileModal from './FairDriveImportFileModal'

interface FairDriveImportFileProps {
  setFile: (file: File | undefined) => Promise<void>
  children: React.ReactNode
  allowedExtensions?: string[]
  initialPod?: string
}

export default function FairDriveImportFile({
  children,
  setFile,
  allowedExtensions,
  initialPod,
}: FairDriveImportFileProps) {
  const { isOpen, onOpen, onClose } = useDisclosure()

  return (
    <>
      <Box onClick={onOpen}>{children}</Box>
      <ImportFileModal
        setFile={setFile}
        isOpen={isOpen}
        onClose={onClose}
        allowedExtensions={allowedExtensions}
        initialPod={initialPod}
      />
    </>
  )
}
