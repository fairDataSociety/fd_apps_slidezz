import {
  CircularProgress,
  Modal,
  ModalBody,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
} from '@chakra-ui/react'

interface LoadingModalProps {
  isOpen: boolean
  message?: string
}

export default function LoadingModal({ isOpen, message }: LoadingModalProps) {
  return (
    <Modal isCentered isOpen={isOpen} onClose={() => {}}>
      <ModalOverlay />
      <ModalContent>
        <ModalBody>
          <VStack gap={3}>
            <Text textAlign="center" fontSize="2xl">
              {message}
            </Text>
            <CircularProgress isIndeterminate color="surface1.400" />
          </VStack>
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}
