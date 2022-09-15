import { Box, useDisclosure } from '@chakra-ui/react'
import ImportFileModal from './ImportFileModal'
import { File } from '../../types'

interface ImportFileProps {
  setFile: (file: File | undefined) => Promise<void>
  children: React.ReactNode
  allowedExtensions?: string[]
  initialPod?: string
}

export default function ImportFile({
  children,
  setFile,
  allowedExtensions,
  initialPod,
}: ImportFileProps) {
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
