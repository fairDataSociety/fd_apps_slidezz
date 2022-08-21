import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  InputGroup,
  InputRightAddon,
} from "@chakra-ui/react";

interface SetFileNameModalProps {
  fileName: string;
  setFileName: (fileName: string) => void;
  isOpen: boolean;
  onClose: () => void;
  handleSaveFile: () => void;
  extension?: string;
}

export default function SetFileNameModal({
  fileName,
  setFileName,
  isOpen,
  onClose,
  handleSaveFile,
  extension,
}: SetFileNameModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Save file</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <InputGroup>
            <Input
              value={fileName}
              onChange={(e) => setFileName(e.target.value)}
              placeholder="File name"
            />
            {extension && <InputRightAddon children={`.${extension}`} />}
          </InputGroup>
        </ModalBody>
        <ModalFooter>
          <Button variant="outline" mr={3} onClick={onClose}>
            Cancel
          </Button>
          <Button isDisabled={fileName.length === 0} onClick={handleSaveFile}>
            Save
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
